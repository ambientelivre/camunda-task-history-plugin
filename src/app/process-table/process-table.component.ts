import { Component, Input, OnInit } from "@angular/core";
import { Observable, from, map, merge, switchMap, toArray } from "rxjs";
import { DetailService } from "../history/process-instance/detail/detail.service";
import { History } from "../history/process-instance/history";
import { TaskService } from "../history/process-instance/task/task.service";
import { VariableService } from "../history/process-instance/variable/variable.service";

@Component({
  selector: "custom-process-table[taskid]",
  templateUrl: "./process-table.component.html",
  styleUrls: ["./process-table.component.css"],
})
export class ProcessTableComponent implements OnInit {
  processInstanceDetail$: Observable<History[]>;

  @Input()
  taskid!: string;

  constructor(
    private taskService: TaskService,
    private variableService: VariableService,
    private detailService: DetailService
  ) {}

  ngOnInit(): void {
    this.processInstanceDetail$ = this.taskService
      .findOneTaskById(this.taskid)
      .pipe(
        switchMap(({ processInstanceId }) =>
          merge(
            this.detailService
              .findManyProcessInstanceDetail({
                processInstanceId,
              })
              .pipe(
                switchMap((details) => from(details)),
                map(History.fromDetail)
              ),
            this.variableService
              .findManyVariableByTaskId({ processInstanceId })
              .pipe(
                switchMap((variable) => from(variable)),
                map(History.fromVariable)
              )
          )
        ),
        toArray(),
        map(History.sortByStartTimeDesc
        )
      );
  }
}
