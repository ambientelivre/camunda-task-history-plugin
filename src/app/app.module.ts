import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injector, NgModule } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { NgHttpCachingModule } from "ng-http-caching";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { CamundaTranslateLoader } from "./camunda-translate-loader";
import { LoadingComponent } from "./components/loading/loading.component";
import { TableComponent } from "./components/table/table.component";
import { VariableTableComponent } from "./components/variable-table/variable-table.component";
import { DurationFormatPipe } from "./duration-format.pipe";
import { ProcessTableComponent } from "./pages/process-table/process-table.component";
import { TaskTableComponent } from "./pages/task-table/task-table.component";
import { SortColumnIconComponent } from "./sort/sort-column-icon/sort-column-icon.component";
import { SortColumnIdDirective } from "./sort/sort-column-id.directive";
import { SortHeaderDirective } from "./sort/sort-header.directive";
import { SortPipe } from "./sort/sort.pipe";

@NgModule({
  schemas: [],
  declarations: [
    TaskTableComponent,
    ProcessTableComponent,
    DurationFormatPipe,
    TableComponent,
    VariableTableComponent,
    LoadingComponent,
    SortPipe,
    SortHeaderDirective,
    SortColumnIdDirective,
    SortColumnIconComponent,
  ],
  providers: [],
  imports: [
    NgxJsonViewerModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useClass: CamundaTranslateLoader,
        deps: [HttpClient],
      },
    }),
    NgHttpCachingModule.forRoot({ lifetime: 10_000 }),
  ],
  entryComponents: [TaskTableComponent, ProcessTableComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    customElements.define(
      "task-table",
      customElements.get("task-table") ||
        createCustomElement(TaskTableComponent, {
          injector: this.injector,
        })
    );

    customElements.define(
      "process-table",
      customElements.get("process-table") ||
        createCustomElement(ProcessTableComponent, {
          injector: this.injector,
        })
    );
  }

  ngDoBootstrap() {}
}
