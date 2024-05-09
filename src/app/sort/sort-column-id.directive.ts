import {
  ContentChild,
  Directive,
  ElementRef,
  Input,
  OnInit,
} from "@angular/core";
import { Observable, fromEvent, map } from "rxjs";
import { SortColumnIconComponent } from "./sort-column-icon/sort-column-icon.component";

@Directive({
  selector: "[customSortColumnId]",
})
export class SortColumnIdDirective implements OnInit {
  click$: Observable<string>;

  @Input()
  customSortColumnId!: string;

  @ContentChild(SortColumnIconComponent)
  icon!: SortColumnIconComponent;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.click$ = fromEvent(this.el.nativeElement, "click").pipe(
      map(() => this.customSortColumnId)
    );
  }
}
