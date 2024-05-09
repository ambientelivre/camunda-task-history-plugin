import { Component } from "@angular/core";

@Component({
  selector: "custom-searchbar-column",
  templateUrl: "./searchbar-column.component.html",
  styleUrls: ["./searchbar-column.component.css"],
})
export class SearchbarColumnComponent {
  search = "";
  placeholder = "";
}
