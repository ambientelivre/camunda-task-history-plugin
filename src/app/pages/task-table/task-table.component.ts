import { Component, Input, OnInit } from "@angular/core";
import {
  Observable,
  forkJoin,
  from,
  map,
  mergeMap,
  of,
  switchMap,
  toArray,
} from "rxjs";
import { DetailService } from "../../history/process-instance/detail/detail.service";
import { History } from "../../history/process-instance/history";
import { Task } from "../../history/process-instance/task/task";
import { TaskService } from "../../history/process-instance/task/task.service";
import { User } from "../../user/user";
import { UserService } from "../../user/user.service";

@Component({
  selector: "custom-task-table[taskid]",
  templateUrl: "./task-table.component.html",
  styleUrls: ["./task-table.component.css"],
})
export class TaskTableComponent implements OnInit {
  historyTable = "";
  taskProcessInstanceDetail$: Observable<
    (Task & { history: History[]; user: User })[]
  >;

  @Input()
  taskid!: string;

  constructor(
    private taskService: TaskService,
    private detailService: DetailService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.taskProcessInstanceDetail$ = this.taskService
      .findOneTaskById(this.taskid)
      .pipe(
        switchMap(({ processInstanceId }) =>
          this.taskService.findManyTask({ processInstanceId }).pipe(
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
              ]).pipe(
                map(([detail, user]) => ({
                  ...task,
                  history: detail.map(History.fromDetail),
                  user,
                }))
              )
            ),
            toArray(),
            map((processInstanceDetail) =>
              processInstanceDetail.sort(
                ({ startTime: asc }, { startTime: desc }) =>
                  new Date(desc).getTime() - new Date(asc).getTime()
              )
            )
          )
        )
      );
  }
}
