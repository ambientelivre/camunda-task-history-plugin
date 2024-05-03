import { Component, Input, OnInit } from "@angular/core";
import {
  Observable,
  from,
  map,
  merge,
  shareReplay,
  switchMap,
  toArray,
} from "rxjs";
import { DetailService } from "../history/process-instance/detail/detail.service";
import { History } from "../history/process-instance/history";
import { Task } from "../history/process-instance/task/task";
import { TaskService } from "../history/process-instance/task/task.service";
import { VariableService } from "../history/process-instance/variable/variable.service";

@Component({
  selector: "custom-process-table[taskid]",
  templateUrl: "./process-table.component.html",
  styleUrls: ["./process-table.component.css"],
})
export class ProcessTableComponent implements OnInit {
  task$: Observable<Task>;
  processInstanceDetail$: Observable<History[]>;

  @Input()
  taskid!: string;

  constructor(
    private taskService: TaskService,
    private variableService: VariableService,
    private detailService: DetailService
  ) {}

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
              map((detail) => History.fromDetail(detail))
            ),
          this.variableService
            .findManyVariableByTaskId({ processInstanceId })
            .pipe(
              switchMap((variable) => from(variable)),
              map((variable) => History.fromVariable(variable))
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
  }
}
