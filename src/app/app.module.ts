import { Injector, NgModule } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { BrowserModule } from "@angular/platform-browser";
import { TabsModule } from "ngx-bootstrap/tabs";

import { HttpClientModule } from "@angular/common/http";
import { NgHttpCachingModule } from "ng-http-caching";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { ActivityTableComponent } from "./activity-table/activity-table.component";
import { TableComponent } from "./components/table/table.component";
import { DurationFormatPipe } from "./duration-format.pipe";

@NgModule({
  schemas: [],
  declarations: [ActivityTableComponent, DurationFormatPipe, TableComponent],
  imports: [
    NgxJsonViewerModule,
    TabsModule,
    BrowserModule,
    HttpClientModule,
    NgHttpCachingModule.forRoot({ lifetime: 1000 * 60 }),
  ],
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
