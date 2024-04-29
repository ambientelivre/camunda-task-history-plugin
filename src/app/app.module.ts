import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ActivityTableComponent } from './activity-table/activity-table.component';
import { HttpClientModule } from '@angular/common/http';
import { DurationFormatPipe } from './duration-format.pipe';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  declarations: [
    ActivityTableComponent,
    DurationFormatPipe,
  ],
  imports: [
    NgxJsonViewerModule,
    BrowserModule,
    HttpClientModule
  ],
  entryComponents: [
    ActivityTableComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(ActivityTableComponent, { injector: this.injector });

    customElements.define('activity-table', el);
  }
  ngDoBootstrap() { }
}
