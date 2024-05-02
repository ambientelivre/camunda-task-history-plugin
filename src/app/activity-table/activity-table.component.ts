import { Component, Input, OnInit } from "@angular/core";
import { setTheme } from "ngx-bootstrap/utils";
import { Observable, from, map, mergeMap, switchMap, toArray } from "rxjs";
import { Detail } from "../history/process-instance/detail/detail";
import { DetailService } from "../history/process-instance/detail/detail.service";
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
  task$: Observable<Task>;
  taskProcessInstance$: Observable<(Task & { detail: Detail[] })[]>;
  variableCreation$: Observable<Variable[]>;

  @Input()
  taskid!: string;

  constructor(
    private taskService: TaskService,
    private variableService: VariableService,
    private detailService: DetailService
  ) {
    setTheme("bs3");
  }

  ngOnInit(): void {
    this.task$ = this.taskService.findOneTaskById(this.taskid);
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
              this.detailService
                .findManyProcessInstanceDetail({ taskId: task.id })
                .pipe(map((detail) => ({ ...task, detail })))
            ),
            toArray()
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
