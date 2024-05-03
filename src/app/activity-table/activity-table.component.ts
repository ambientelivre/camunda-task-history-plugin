import { Component, Input, OnInit } from "@angular/core";
import { setTheme } from "ngx-bootstrap/utils";
import {
  Observable,
  forkJoin,
  from,
  map,
  merge,
  mergeMap,
  of,
  shareReplay,
  switchMap,
  toArray,
} from "rxjs";
import { Detail } from "../history/process-instance/detail/detail";
import { DetailService } from "../history/process-instance/detail/detail.service";
import { History } from "../history/process-instance/history";
import { Task } from "../history/process-instance/task/task";
import { TaskService } from "../history/process-instance/task/task.service";
import { VariableService } from "../history/process-instance/variable/variable.service";
import { User } from "../user/user";
import { UserService } from "../user/user.service";

@Component({
  selector: "custom-activity-table[taskid]",
  templateUrl: "./activity-table.component.html",
  styleUrls: ["./activity-table.component.css"],
})
export class ActivityTableComponent implements OnInit {
  task$: Observable<Task>;
  taskProcessInstanceDetail$: Observable<
    (Task & { detail: Detail[]; user: User })[]
  >;
  processInstanceDetail$: Observable<History[]>;

  @Input()
  taskid!: string;

  constructor(
    private taskService: TaskService,
    private variableService: VariableService,
    private detailService: DetailService,
    private userService: UserService
  ) {
    setTheme("bs3");
  }

  ngOnInit(): void {
    this.task$ = this.taskService
      .findOneTaskById(this.taskid)
      .pipe(shareReplay(1));
    this.processInstanceDetail$ = this.task$.pipe(
      switchMap(({ processInstanceId }) =>
        merge(
          this.detailService
            .findManyProcessInstanceDetail({
              processInstanceId,
            })
            .pipe(
              switchMap((details) => from(details)),
              map(
                (detail) =>
                  new History(
                    detail?.variableName || detail.fieldId || "",
                    detail.value || detail.fieldValue || "",
                    detail.type,
                    detail.time,
                    detail.removalTime
                  )
              )
            ),
          this.variableService
            .findManyVariableByTaskId({ processInstanceId })
            .pipe(
              switchMap((variable) => from(variable)),
              map(
                (variable) =>
                  new History(
                    variable.name,
                    variable.value,
                    variable.state,
                    variable.createTime,
                    variable.removalTime
                  )
              )
            )
        )
      ),
      toArray(),
      map((history) =>
        history.sort(
          ({ startTime: asc }, { startTime: desc }) =>
            new Date(desc).getTime() - new Date(asc).getTime()
        )
      )
    );
    this.taskProcessInstanceDetail$ = this.task$.pipe(
      switchMap(({ processInstanceId }) =>
        this.taskService
          .findManyTask({
            processInstanceId,
            sortBy: "startTime",
            sortOrder: "desc",
          })
          .pipe(
            switchMap((task) => from(task)),
            mergeMap((task) =>
              forkJoin([
                this.detailService.findManyProcessInstanceDetail({
                  processInstanceId,
                  activityInstanceId: task.activityInstanceId,
                }),
                task.assignee
                  ? this.userService.findOneUserById(task.assignee)
                  : of(null),
              ]).pipe(map(([detail, user]) => ({ ...task, detail, user })))
            ),
            toArray()
          )
      )
    );
  }
}
