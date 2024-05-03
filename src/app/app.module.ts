import { Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { TabsModule } from "ngx-bootstrap/tabs";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { ActivityTableComponent } from "./activity-table/activity-table.component";
import { DurationFormatPipe } from "./duration-format.pipe";
import { TableComponent } from './components/table/table.component';

@NgModule({
  schemas: [],
  declarations: [ActivityTableComponent, DurationFormatPipe, TableComponent],
  imports: [NgxJsonViewerModule, TabsModule, BrowserModule, HttpClientModule],
  entryComponents: [ActivityTableComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(ActivityTableComponent, {
      injector: this.injector,
    });

    customElements.define("activity-table", el);
  }
  ngDoBootstrap() {}
}
