import { Component, OnInit, ViewChild } from '@angular/core';

import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnInit {
  pomodoroActive: boolean = true;

  /*pomodoroLength: number = 25*60;
  breakLength: number = 5*60;*/

  pomodoroLength: number = 4;
  breakLength: number = 3;

  timerSec: number = this.pomodoroLength;

  @ViewChild('timer')
  timer: TimerComponent;

  constructor() { }

  ngOnInit() {
  }

  timeUp() {
    if (this.pomodoroActive) {
      this.pomodoroActive = false;
      this.timerSec = this.breakLength;
      this.timer.startWith(this.timerSec);
    } else {
      this.pomodoroActive = true;
      this.timer.resetWith(this.pomodoroLength);
    }
  }

}
