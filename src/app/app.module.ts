import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { TimefmtPipe } from './timefmt.pipe';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';

import { BrowserTitleService} from './browser-title.service';
import { BreakThoughtService } from './break-thought.service';
import { SettingsService } from './settings.service';
import { AudioAPIWrapper } from './audio-wrapper';


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
    NgbModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: 'tauotin',
      storageType: 'localStorage'
    })    
  ],
  entryComponents: [
    SettingsModalComponent
  ],
  providers: [
    BrowserTitleService,
    BreakThoughtService,
    SettingsService,
    AudioAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
