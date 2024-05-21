import { Component, Input, OnInit } from "@angular/core";
import { Observable, from, map, mergeMap, of, toArray } from "rxjs";
import { Detail } from "src/app/process-instance/detail/detail";
import { VariableService } from "src/app/process-instance/variable/variable.service";
import { SortEvent } from "src/app/sort/sort-event";

@Component({
  selector: 'custom-variable-table[detail]',
  templateUrl: './variable-table.component.html',
  styleUrls: ['./variable-table.component.css'],
})
export class VariableTableComponent implements OnInit {
  sortBy = new SortEvent("startTime", "desc");
  detail$: Observable<Detail[]>;
  parse = JSON.parse;

  @Input()
  detail!: Detail[];

  constructor(private variableService: VariableService) {}

  ngOnInit(): void {
    this.detail$ = from(this.detail).pipe(
      mergeMap((detail) =>
        detail.variableType === "Object" || detail.variableType === "Array"
          ? this.variableService
              .findOneVariableById(detail.id)
              .pipe(map(({ value }) => ({ ...detail, value })))
          : of(detail)
      ),
      toArray()
    );
  }
}
