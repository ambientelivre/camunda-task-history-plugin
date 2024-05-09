import {
  ContentChild,
  Directive,
  ElementRef,
  Input,
  OnInit,
} from "@angular/core";
import { Observable, fromEvent, map } from "rxjs";
import { SearchbarColumnComponent } from "./searchbar-column/searchbar-column.component";

@Directive({
  selector: "[customSearchColumnId]",
})
export class SearchColumnIdDirective implements OnInit {
  search$: Observable<string>;

  @Input()
  customSearchColumnId!: string;

  @ContentChild(SearchbarColumnComponent) searchbar!: SearchbarColumnComponent;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  ngOnInit(): void {
    this.search$ = fromEvent(this.el.nativeElement, "change").pipe(
      map(() => this.customSearchColumnId)
    );
  }
}
