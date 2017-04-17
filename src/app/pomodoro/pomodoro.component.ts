import { Component, OnInit, ViewChild } from '@angular/core';

import { TimerComponent } from '../timer/timer.component';
import { BrowserTitleService } from '../browser-title.service';
import { BreakThoughtService } from '../break-thought.service';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnInit {
  defaultSuffix: string = 'Liikelaajentamo';
  pomodoroActive: boolean = true;

  /*pomodoroLength: number = 25*60;
  breakLength: number = 5*60;*/

  pomodoroLength: number = 4;
  breakLength: number = 3;

  timerSec: number = this.pomodoroLength;
  breakThought: string = "";

  @ViewChild('timer')
  timer: TimerComponent;

  titleService: BrowserTitleService = null;
  thoughtService: BreakThoughtService = null

  constructor(
    titleService: BrowserTitleService,
    thoughtService: BreakThoughtService
  ) { 
    this.titleService = titleService;
    this.thoughtService = thoughtService;
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
  }

  resetTimer() {
    this.pomodoroActive = true;
    this.timer.resetWith(this.pomodoroLength);
    this.titleService.setSuffix(this.defaultSuffix);
    this.titleService.setTitle('');    
  }

}
