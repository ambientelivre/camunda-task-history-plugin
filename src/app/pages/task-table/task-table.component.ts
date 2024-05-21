import { Component, Input, OnInit } from "@angular/core";
import {
  Observable,
  forkJoin,
  map,
  mergeMap,
  of,
  switchMap,
  toArray,
} from "rxjs";
import { Detail } from "src/app/process-instance/detail/detail";
import { SortEvent } from "src/app/sort/sort-event";
import { DetailService } from "../../process-instance/detail/detail.service";
import { Task } from "../../process-instance/task/task";
import { TaskService } from "../../process-instance/task/task.service";
import { User } from "../../user/user";
import { UserService } from "../../user/user.service";

@Component({
  selector: "custom-task-table[taskid]",
  templateUrl: "./task-table.component.html",
  styleUrls: ["./task-table.component.css"],
})
export class TaskTableComponent implements OnInit {
  sortBy = new SortEvent("time", "desc");
  subTableToggle = "";
  subTableToggleAll = false;
  taskProcessInstanceDetail$: Observable<
    (Task & { detail: Detail[]; user: User })[]
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
            switchMap((task) => task),
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
                  detail,
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
