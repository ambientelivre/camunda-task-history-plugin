import { Component, Input, OnInit, TemplateRef } from "@angular/core";

@Component({
  selector: "custom-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  @Input()
  thead!: TemplateRef<void>;

  @Input()
  tbody!: TemplateRef<void>;

  constructor() {}

  ngOnInit(): void {}
}
