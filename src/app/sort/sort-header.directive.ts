import {
  AfterContentInit,
  ContentChildren,
  Directive,
  EventEmitter,
  Output,
  QueryList,
} from "@angular/core";
import { SortEvent } from "./sort-event";
import { SortColumnIconComponent } from "./sort-column-icon/sort-column-icon.component";
import { SortColumnIdDirective } from "./sort-column-id.directive";

@Directive({
  selector: "[customSortHeader]",
})
export class SortHeaderDirective implements AfterContentInit {
  id;
  order;
  icon?: SortColumnIconComponent;

  @ContentChildren(SortColumnIdDirective)
  columnId!: QueryList<SortColumnIdDirective>;

  @Output()
  sortClick = new EventEmitter<SortEvent>();

  ngAfterContentInit(): void {
    this.columnId.forEach((el) => {
      el.click$.subscribe((id) => {
        console.log(id);

        if (this.icon) {
          if (this.id !== id) {
            this.icon.order = undefined;
            this.order = "desc";
          } else if (this.order === "desc") {
            this.order = "asc";
          } else if (this.order === "asc") {
            this.order = undefined;
          } else {
            this.order = "desc";
          }
        } else {
          this.order = "desc";
        }

        this.icon = el.icon;
        this.icon.order = this.order;
        this.id = id;
        this.sortClick.emit(new SortEvent(this.id, this.order));
      });
    });
  }
}
