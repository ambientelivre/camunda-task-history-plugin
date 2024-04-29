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

@Component({
  selector: "custom-activity-table",
  templateUrl: "./activity-table.component.html",
  styleUrls: ["./activity-table.component.css"],
})
export class ActivityTableComponent implements OnInit {
  keys = Object.keys;
  task$!: Observable<Task>;
  taskProcessInstance$: Observable<
    (Task & { variable: Record<string, any> })[]
  >;

  @Input()
  taskid!: string;

  constructor(
    private taskService: TaskService,
    private variableService: VariableService
  ) {}

  ngOnInit(): void {
    this.task$ = this.taskService.findOneTaskById(this.taskid);
    this.taskProcessInstance$ = this.task$.pipe(
      switchMap(({ processInstanceId }) =>
        timer(0, 60_000).pipe(
          switchMap(() =>
            this.taskService
              .findManyTaskByProcessIntanceIdSortByStartDesc(processInstanceId)
              .pipe(
                switchMap((task) => from(task)),
                mergeMap((task) =>
                  this.variableService
                    .findOneVariableByTaskId(task.id)
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
