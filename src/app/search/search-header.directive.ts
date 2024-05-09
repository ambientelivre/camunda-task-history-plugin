import {
  AfterContentInit,
  ContentChildren,
  Directive,
  EventEmitter,
  OnDestroy,
  Output,
  QueryList,
} from "@angular/core";
import { SearchColumnIdDirective } from "./search-column-id.directive";
import { Subscription, from, mergeMap, tap } from "rxjs";
import { SearchbarColumnComponent } from "./searchbar-column/searchbar-column.component";

@Directive({
  selector: "[customSearchHeader]",
})
export class SearchHeaderDirective implements AfterContentInit, OnDestroy {
  id;
  search!: Subscription;
  searchbar?: SearchbarColumnComponent;

  @Output()
  searchChange = new EventEmitter<string>();

  @ContentChildren(SearchColumnIdDirective)
  columnId!: QueryList<SearchColumnIdDirective>;

  ngAfterContentInit(): void {
    this.search = from(this.columnId.toArray())
      .pipe(
        mergeMap((el) =>
          el.search$.pipe(
            tap((search) => {
              if (this.searchbar) {
                if (this.id !== el.customSearchColumnId) {
                  this.searchbar.search = "";
                  this.searchbar = el.searchbar;
                }
              } else {
                this.searchbar = el.searchbar;
              }

              this.id = search;
              this.searchChange.emit(this.searchbar.search);
            })
          )
        )
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.search.unsubscribe();
  }
}
