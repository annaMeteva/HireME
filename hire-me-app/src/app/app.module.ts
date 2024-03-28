import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UserModule,
    JobModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
