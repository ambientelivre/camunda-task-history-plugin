import { Component, Input, OnInit } from "@angular/core";
import { setTheme } from "ngx-bootstrap/utils";
import {
  Observable,
  forkJoin,
  from,
  map,
  mergeMap,
  of,
  shareReplay,
  switchMap,
  toArray
} from "rxjs";
import { Detail } from "../history/process-instance/detail/detail";
import { DetailService } from "../history/process-instance/detail/detail.service";
import { Task } from "../history/task/task";
import { TaskService } from "../history/task/task.service";
import { Variable } from "../history/variable/variable";
import { VariableService } from "../history/variable/variable.service";
import { User } from "../user/user";
import { UserService } from "../user/user.service";

@Component({
  selector: "custom-activity-table",
  templateUrl: "./activity-table.component.html",
  styleUrls: ["./activity-table.component.css"],
})
export class ActivityTableComponent implements OnInit {
  task$: Observable<Task>;
  taskProcessInstance$: Observable<(Task & { detail: Detail[]; user: User })[]>;
  variableCreation$: Observable<Variable[]>;
  processInstanceDetail$: Observable<Detail[]>;

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
    this.taskProcessInstance$ = this.task$.pipe(
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
    this.processInstanceDetail$ = this.task$.pipe(
      switchMap(({ processInstanceId }) =>
        this.detailService.findManyProcessInstanceDetail({ processInstanceId })
      )
    );
    this.variableCreation$ = this.task$.pipe(
      switchMap(({ processInstanceId }) =>
        this.variableService.findManyVariableByTaskId({ processInstanceId })
      )
    );
  }
}
