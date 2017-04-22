import { Component, OnInit, ViewChild } from '@angular/core';

import { TimerComponent } from '../timer/timer.component';
import { BrowserTitleService } from '../browser-title.service';
import { BreakThoughtService } from '../break-thought.service';
import { SettingsService } from '../settings.service';
import { AudioAPIWrapper } from '../audio-wrapper';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnInit {
  defaultSuffix: string = 'Liikelaajentamo';
  pomodoroActive: boolean = true;

  pomodoroLength: number;
  breakLength: number;

  timerSec: number;
  breakThought: string = "";

  @ViewChild('timer')
  timer: TimerComponent;

  constructor(
    private titleService: BrowserTitleService,
    private thoughtService: BreakThoughtService,
    private settingsService: SettingsService,
    private audio: AudioAPIWrapper
  ) { 
    this.resetTimer = this.resetTimer.bind(this);

    this.settingsService
      .changedSettings
      .subscribe((settings) => {        
        if (settings && settings.pomodoroTime && settings.breakTime) {
          this.pomodoroLength = settings.pomodoroTime*60;
          this.breakLength = settings.breakTime*60;
          this.resetTimer();
        }
      });

    const settings = this.settingsService.getSettings();
    /*this.pomodoroLength = settings.pomodoroTime*60;
    this.breakLength = settings.breakTime*60;*/
    this.pomodoroLength=4;
    this.breakLength=3;
    this.timerSec = this.pomodoroLength;
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
      this.timerSec = this.breakLength;
      this.timer.startWith(this.timerSec);
    } else {
      this.pomodoroActive = true;
      this.timer.resetWith(this.pomodoroLength);
      this.titleService.setSuffix(this.defaultSuffix);
      this.titleService.setTitle('');
    }
    this.timer.setBreak(!this.pomodoroActive);
    this.audio.Load('./assets/bell.wav');
    this.audio.Play();
  }

  resetTimer() {
    this.pomodoroActive = true;
    this.timer.resetWith(this.pomodoroLength);
    this.titleService.setSuffix(this.defaultSuffix);
    this.titleService.setTitle('');    
  }
}
