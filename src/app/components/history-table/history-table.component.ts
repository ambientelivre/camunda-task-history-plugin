import { Component, Input } from "@angular/core";
import { History } from "../../history/process-instance/history";

@Component({
  selector: "custom-history-table[history]",
  templateUrl: "./history-table.component.html",
  styleUrls: ["./history-table.component.css"],
})
export class HistoryTableComponent {
  parse = JSON.parse;

  @Input()
  history!: History[];
}
