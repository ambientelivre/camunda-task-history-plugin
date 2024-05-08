import {
  AfterContentInit,
  ContentChildren,
  Directive,
  EventEmitter,
  OnDestroy,
  Output,
  QueryList,
} from "@angular/core";
import { Subscription, from, mergeMap, tap } from "rxjs";
import { SortColumnIconComponent } from "./sort-column-icon/sort-column-icon.component";
import { SortColumnIdDirective } from "./sort-column-id.directive";
import { SortEvent } from "./sort-event";

@Directive({
  selector: "[customSortHeader]",
})
export class SortHeaderDirective implements AfterContentInit, OnDestroy {
  id;
  icon?: SortColumnIconComponent;
  click: Subscription;

  @ContentChildren(SortColumnIdDirective)
  columnId!: QueryList<SortColumnIdDirective>;

  @Output()
  sortClick = new EventEmitter<SortEvent>();

  ngAfterContentInit(): void {
    this.click = from(this.columnId.toArray())
      .pipe(
        mergeMap((el) =>
          el.click$.pipe(
            tap((id) => {
              if (this.icon) {
                if (this.id !== id) {
                  this.icon.order = undefined;
                  this.icon = el.icon;
                  this.icon.order = "desc";
                } else if (this.icon.order === "desc") {
                  this.icon.order = "asc";
                } else if (this.icon.order === "asc") {
                  this.icon.order = undefined;
                } else {
                  this.icon.order = "desc";
                }
              } else {
                this.icon = el.icon;
                this.icon.order = "desc";
              }

              this.id = id;
              this.sortClick.emit(new SortEvent(this.id, this.icon.order));
            })
          )
        )
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.click.unsubscribe();
  }
}
