import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageModule } from 'angular-2-local-storage'; 
import { PushNotificationsModule } from 'angular2-notifications';

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { TimefmtPipe } from './timefmt.pipe';
import { PomodoroComponent } from './pomodoro/pomodoro.component';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';

import { BrowserTitleService} from './browser-title.service';
import { BreakThoughtService } from './break-thought.service';
import { SettingsService } from './settings.service';


import {enableProdMode} from '@angular/core';

enableProdMode();

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
    }),
    PushNotificationsModule
  ],
  entryComponents: [
    SettingsModalComponent
  ],
  providers: [
    BrowserTitleService,
    BreakThoughtService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
