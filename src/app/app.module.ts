import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injector, NgModule } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { BrowserModule } from "@angular/platform-browser";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
import { NgHttpCachingModule } from "ng-http-caching";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { CamundaTranslateLoader } from "./camunda-translate-loader";
import { HistoryTableComponent } from "./components/history-table/history-table.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { TableComponent } from "./components/table/table.component";
import { DurationFormatPipe } from "./duration-format.pipe";
import { ProcessTableComponent } from "./pages/process-table/process-table.component";
import { TaskTableComponent } from "./pages/task-table/task-table.component";
import { SortPipe } from "./sort/sort.pipe";
import { SortHeaderDirective } from "./sort/sort-header.directive";
import { SortHeaderIdDirective } from "./sort/sort-header-id.directive";
import { SortHeaderIconComponent } from './sort/sort-header-icon/sort-header-icon.component';

@NgModule({
  schemas: [],
  declarations: [
    TaskTableComponent,
    ProcessTableComponent,
    DurationFormatPipe,
    TableComponent,
    HistoryTableComponent,
    LoadingComponent,
    SortPipe,
    SortHeaderDirective,
    SortHeaderIdDirective,
    SortHeaderIconComponent,
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
  constructor(
    private translateService: TranslateService,
    private injector: Injector
  ) {
    this.translateService.setDefaultLang(
      this.translateService.getBrowserCultureLang()
    );

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
