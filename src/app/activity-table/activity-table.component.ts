import { Component, Input, OnInit } from "@angular/core";
import {
  Observable,
  from,
  map,
  mergeMap,
  switchMap,
  timer,
  toArray,
} from "rxjs";
import { Task } from "../history/task/task";
import { TaskService } from "../history/task/task.service";
import { Variable } from "../history/variable/variable";
import { VariableService } from "../history/variable/variable.service";
import { Detail } from "../history/process-instance/detail/detail";
import { DetailService } from "../history/process-instance/detail/detail.service";

@Component({
  selector: "custom-activity-table",
  templateUrl: "./activity-table.component.html",
  styleUrls: ["./activity-table.component.css"],
})
export class ActivityTableComponent implements OnInit {
  refreshInterval$ = timer(0, 60_000);
  task$!: Observable<Task>;
  taskProcessInstance$: Observable<(Task & { detail: Detail[] })[]>;
  variableCreation$: Observable<Variable[]>;

  @Input()
  taskid!: string;

  constructor(
    private taskService: TaskService,
    private variableService: VariableService,
    private detailSerivce: DetailService
  ) {}

  ngOnInit(): void {
    this.task$ = this.taskService.findOneTaskById(this.taskid);
    this.taskProcessInstance$ = this.task$.pipe(
      switchMap(({ processInstanceId }) =>
        timer(0, 60_000).pipe(
          switchMap(() =>
            this.taskService
              .findManyTask({
                processInstanceId,
                sortBy: "startTime",
                sortOrder: "desc",
              })
              .pipe(
                switchMap((task) => from(task)),
                mergeMap((task) =>
                  this.detailSerivce
                    .findManyProcessInstanceDetail({ taskId: task.id })
                    .pipe(map((detail) => ({ ...task, detail })))
                ),
                toArray()
              )
          )
        )
      )
    );
    this.variableCreation$ = this.task$.pipe(
      switchMap(({ processInstanceId }) =>
        this.refreshInterval$.pipe(
          switchMap(() =>
            this.variableService.findManyVariableByTaskId({ processInstanceId })
          )
        )
      )
    );
  }
}
