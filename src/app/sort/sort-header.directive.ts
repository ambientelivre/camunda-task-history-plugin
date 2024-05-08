import {
  AfterContentInit,
  ContentChildren,
  Directive,
  EventEmitter,
  Output,
  QueryList,
} from "@angular/core";
import { SortByClickEvent } from "./sort-click-event";
import { SortHeaderIdDirective } from "./sort-header-id.directive";
import { SortHeaderIconComponent } from "./sort-header-icon/sort-header-icon.component";

@Directive({
  selector: "[customSortHeader]",
})
export class SortHeaderDirective implements AfterContentInit {
  id;
  sortBy = undefined;
  sortHeaderIcon?: SortHeaderIconComponent;

  @ContentChildren(SortHeaderIdDirective)
  sortHeaderId!: QueryList<SortHeaderIdDirective>;

  @Output()
  sortByClick = new EventEmitter<SortByClickEvent>();

  ngAfterContentInit(): void {
    this.sortHeaderId.forEach((el) => {
      el.click.asObservable().subscribe((id) => {
        if (this.sortHeaderIcon) {
          if (this.id !== id) {
            this.sortHeaderIcon.sortBy = undefined;
            this.sortBy = "desc";
          } else if (this.sortBy === "desc") {
            this.sortBy = "asc";
          } else if (this.sortBy === "asc") {
            this.sortBy = undefined;
          } else {
            this.sortBy = "desc";
          }
        } else {
          this.sortBy = "desc";
        }

        this.sortHeaderIcon = el.sortHeaderIcon;
        this.sortHeaderIcon.sortBy = this.sortBy;
        this.id = id;
        this.sortByClick.emit({ id, sortBy: this.sortBy });
      });
    });
  }
}
