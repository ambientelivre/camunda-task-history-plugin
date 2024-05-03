import { Component, Input, OnInit } from "@angular/core";
import {
  Observable,
  forkJoin,
  from,
  map,
  mergeMap,
  of,
  shareReplay,
  switchMap,
  toArray,
} from "rxjs";
import { DetailService } from "../history/process-instance/detail/detail.service";
import { History } from "../history/process-instance/history";
import { Task } from "../history/process-instance/task/task";
import { TaskService } from "../history/process-instance/task/task.service";
import { User } from "../user/user";
import { UserService } from "../user/user.service";

@Component({
  selector: "custom-task-table[taskid]",
  templateUrl: "./task-table.component.html",
  styleUrls: ["./task-table.component.css"],
})
export class TaskTableComponent implements OnInit {
  task$: Observable<Task>;
  taskProcessInstanceDetail$: Observable<
    (Task & { history: History[]; user: User })[]
  >;
  processInstanceDetail$: Observable<History[]>;

  @Input()
  taskid!: string;

  constructor(
    private taskService: TaskService,
    private detailService: DetailService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.task$ = this.taskService
      .findOneTaskById(this.taskid)
      .pipe(shareReplay(1));

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
              ]).pipe(
                map(([detail, user]) => ({
                  ...task,
                  history: detail.map((detail) => History.fromDetail(detail)),
                  user,
                }))
              )
            ),
            toArray()
          )
      )
    );
  }
}
