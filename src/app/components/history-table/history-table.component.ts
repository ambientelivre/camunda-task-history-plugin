import { Component, Input, OnInit } from "@angular/core";
import { Observable, from, map, mergeMap, of, toArray } from "rxjs";
import { VariableService } from "src/app/history/process-instance/variable/variable.service";
import { History } from "../../history/process-instance/history";
import { SortByClickEvent } from "src/app/sort/sort-click-event";

@Component({
  selector: "custom-history-table[history]",
  templateUrl: "./history-table.component.html",
  styleUrls: ["./history-table.component.css"],
})
export class HistoryTableComponent implements OnInit {
  sortBy: SortByClickEvent = { id: "startTime", sortBy: "desc" };
  history$: Observable<History[]>;
  parse = JSON.parse;

  @Input()
  history!: History[];

  constructor(private variableService: VariableService) {}

  ngOnInit(): void {
    this.history$ = from(this.history).pipe(
      mergeMap((history) =>
        history.valueType === "Object" || history.valueType === "Array"
          ? this.variableService
              .findOneVariableById(history.id)
              .pipe(map(({ value }) => ({ ...history, value })))
          : of(history)
      ),
      toArray()
    );
  }
}
