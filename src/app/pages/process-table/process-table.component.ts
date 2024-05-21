import { Component, Input, OnInit } from "@angular/core";
import { Observable, switchMap, toArray } from "rxjs";
import { Detail } from "src/app/process-instance/detail/detail";
import { DetailService } from "../../process-instance/detail/detail.service";
import { TaskService } from "../../process-instance/task/task.service";

@Component({
  selector: "custom-process-table[taskid]",
  templateUrl: "./process-table.component.html",
  styleUrls: ["./process-table.component.css"],
})
export class ProcessTableComponent implements OnInit {
  processInstanceDetail$: Observable<Detail[]>;

  @Input()
  taskid!: string;

  constructor(
    private taskService: TaskService,
    private detailService: DetailService
  ) {}

  ngOnInit(): void {
    this.processInstanceDetail$ = this.taskService
      .findOneTaskById(this.taskid)
      .pipe(
        switchMap(({ processInstanceId }) =>
          this.detailService
            .findManyProcessInstanceDetail({
              processInstanceId,
            })
            .pipe(switchMap((details) => details))
        ),
        toArray()
      );
  }
}
