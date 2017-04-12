import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { TimefmtPipe } from './timefmt.pipe';
import { PomodoroComponent } from './pomodoro/pomodoro.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    TimefmtPipe,
    PomodoroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
