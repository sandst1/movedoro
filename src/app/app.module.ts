import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { TimefmtPipe } from './timefmt.pipe';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';

import { BrowserTitleService} from './browser-title.service';
import { BreakThoughtService } from './break-thought.service';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    TimefmtPipe,
    PomodoroComponent,
    SettingsModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  entryComponents: [
    SettingsModalComponent
  ],
  providers: [
    BrowserTitleService,
    BreakThoughtService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
