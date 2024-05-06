import { Injector, NgModule } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { NgHttpCachingModule } from "ng-http-caching";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { TaskTableComponent } from "./task-table/task-table.component";
import { TableComponent } from "./components/table/table.component";
import { DurationFormatPipe } from "./duration-format.pipe";
import { ProcessTableComponent } from "./process-table/process-table.component";
import { HistoryTableComponent } from "./components/history-table/history-table.component";

@NgModule({
  schemas: [],
  declarations: [
    TaskTableComponent,
    ProcessTableComponent,
    DurationFormatPipe,
    TableComponent,
    HistoryTableComponent,
  ],
  providers:[],
  imports: [
    NgxJsonViewerModule,
    BrowserModule,
    HttpClientModule,
    NgHttpCachingModule.forRoot({ lifetime: 60_000 }),
  ],
  entryComponents: [TaskTableComponent, ProcessTableComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    customElements.define(
      "task-table",
      createCustomElement(TaskTableComponent, {
        injector: this.injector,
      })
    );

    customElements.define(
      "process-table",
      createCustomElement(ProcessTableComponent, {
        injector: this.injector,
      })
    );
  }

  ngDoBootstrap() {}
}
