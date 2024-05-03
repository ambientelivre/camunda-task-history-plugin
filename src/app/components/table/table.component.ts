import { Component, Input, TemplateRef } from "@angular/core";

@Component({
  selector: "custom-table[thead][tbody]",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent {
  @Input()
  thead!: TemplateRef<void>;

  @Input()
  tbody!: TemplateRef<void>;
}
