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
import { VariableService } from "../history/variable/variable.service";
import { Variable } from "../history/variable/variable";

@Component({
  selector: "custom-activity-table",
  templateUrl: "./activity-table.component.html",
  styleUrls: ["./activity-table.component.css"],
})
export class ActivityTableComponent implements OnInit {
  keys = Object.keys;
  task$!: Observable<Task>;
  taskProcessInstance$: Observable<
    (Task & { variable: Record<string, Variable> })[]
  >;

  @Input()
  taskid!: string;

  constructor(
    private taskService: TaskService,
    private variableService: VariableService
  ) {}

  variableIsEmpty(variable: Record<string, Variable>) {
    return Object.keys(variable).length === 0;
  }

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
                  this.variableService
                    .findManyVariableByTaskId({ processInstanceId }, task.id)
                    .pipe(map((variable) => ({ ...task, variable })))
                ),
                toArray()
              )
          )
        )
      )
    );
  }
}
