import { Component, Input, OnInit } from "@angular/core";
import {
  Observable,
  switchMap,
  timer
} from "rxjs";
import { Task } from "../history/task/task";
import { TaskService } from "../history/task/task.service";
import { Variable } from "../history/variable/variable";
import { VariableService } from "../history/variable/variable.service";

@Component({
  selector: "custom-activity-table",
  templateUrl: "./activity-table.component.html",
  styleUrls: ["./activity-table.component.css"],
})
export class ActivityTableComponent implements OnInit {
  keys = Object.keys;
  task$!: Observable<Task>;
  taskProcessInstance$: Observable<Task[]>;
  variableCreation$: Observable<Record<string, Variable>>;

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
            this.taskService.findManyTask({
              processInstanceId,
              sortBy: "startTime",
              sortOrder: "desc",
            })
          )
        )
      )
    );
    this.variableCreation$ = this.task$.pipe(
      switchMap(({ processInstanceId }) =>
        this.variableService.findManyVariableByTaskId({ processInstanceId })
      )
    );
  }
}
