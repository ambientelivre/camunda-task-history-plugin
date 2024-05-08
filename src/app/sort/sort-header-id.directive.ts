import {
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { SortHeaderIconComponent } from "./sort-header-icon/sort-header-icon.component";

@Directive({
  selector: "[customSortHeaderId]",
})
export class SortHeaderIdDirective {
  @Input()
  customSortHeaderId!: string;

  @Output()
  click = new EventEmitter<string>();

  @ContentChild(SortHeaderIconComponent)
  sortHeaderIcon!: SortHeaderIconComponent;

  constructor(private el: ElementRef<HTMLTableCellElement>) {
    this.el.nativeElement.addEventListener("click", () => {
      this.click.emit(this.customSortHeaderId);
    });
  }
}
