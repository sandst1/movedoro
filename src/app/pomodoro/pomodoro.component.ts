import { Component, OnInit, ViewChild } from '@angular/core';

import { PushNotificationsService } from 'angular2-notifications';

import { TimerComponent } from '../timer/timer.component';
import { BrowserTitleService } from '../browser-title.service';
import { BreakThoughtService } from '../break-thought.service';
import { SettingsService } from '../settings.service';

import { Howler, Howl } from 'howler';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnInit {
  defaultSuffix: string = 'Liikelaajentamo';
  pomodoroActive: boolean = true;
  settings: any;

  timerSec: number;
  breakThought: string = "";

  @ViewChild('timer')
  timer: TimerComponent;

  constructor(
    private titleService: BrowserTitleService,
    private thoughtService: BreakThoughtService,
    private settingsService: SettingsService,
    private pushNotifications: PushNotificationsService

  ) { 
    this.resetTimer = this.resetTimer.bind(this);

    this.settingsService
      .changedSettings
      .subscribe((settings) => {        
        if (settings && settings.pomodoroTime && settings.breakTime) {
          if (this.settings.notifications) {
          this.pushNotifications.requestPermission(); 
          }
          this.settings = settings;
          this.resetTimer();
        }
      });

    this.settings = Object.assign({}, this.settingsService.getSettings());
    this.timerSec = this.settings.pomodoroTime;
  }

  ngOnInit() {
    this.titleService.setSuffix(this.defaultSuffix);
  }

  timerStarted() {
    this.titleService.setSuffix(
      this.pomodoroActive ?
        'työskentely':
        'tauko'
    );
  }

  timeUp() {
    if (this.pomodoroActive) {
      this.pomodoroActive = false;
      this.breakThought = this.thoughtService.gimmeAThought();
      this.timerSec = this.settings.breakTime;
      this.timer.startWith(this.timerSec);
      this.showNotification('Tauko');
    } else {
      this.pomodoroActive = true;
      this.timer.resetWith(this.settings.pomodoroTime);
      this.titleService.setSuffix(this.defaultSuffix);
      this.titleService.setTitle('');
      this.showNotification('Tauko valmis');
    }
    this.timer.setBreak(!this.pomodoroActive);
    this.playBell();
  }

  resetTimer() {
    this.pomodoroActive = true;
    this.timer.resetWith(this.settings.pomodoroTime);
    this.titleService.setSuffix(this.defaultSuffix);
    this.titleService.setTitle('');    
  }

  playBell() {
    if (this.settings.soundOn) {
      if (Howler.ctx && Howler.ctx.state && Howler.ctx.state == "suspended") {
          Howler.ctx.resume().then(function() {
            this.doPlayBell();
          });
      } else {
        this.doPlayBell();
      }
    }
  }

  doPlayBell() {
    const sound = new Howl({
      src: './assets/bell.mp3',
      volume: this.settings.volume
    });

    sound.play();
  }

  showNotification(text: string) {
    if (this.pushNotifications.permission === 'granted' && this.settings.notifications) {
      this.pushNotifications
        .create('Liikelaajentamo Tauotin', {
          body: text,
          icon: './assets/icon.png'
        })
        .subscribe(
          res => res,
          err => err
        );
    }
  }
}
