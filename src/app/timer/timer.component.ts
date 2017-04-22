import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  OnInit,
  ViewChild
} from '@angular/core';

import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';

import { BrowserTitleService } from '../browser-title.service';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  @Input()
  amount:number;

  @Output()
  timeUp = new EventEmitter();

  @Output()
  timerStarted = new EventEmitter();

  @Output()
  resetTimer = new EventEmitter();

  @ViewChild('infoWindow')
  infoWindow;

  time:number = 0;
  running: boolean = false;
  intervalId = null;
  breakActive: boolean = false;

  constructor(
    private titleService: BrowserTitleService,
    private modalService: NgbModal) {
    this.resetWith = this.resetWith.bind(this);
  }

  ngOnInit() {
    this.time = this.amount;
  }

  toggle() {
    this.running = !this.running;
    if (this.running) {
      this.startTimer();
    } else {
      clearInterval(this.intervalId);
    }
  }

  startTimer() {
    this.running = true;
    this.timerStarted.emit();
    this.intervalId = setInterval(() => {
        this.time--;
        if (this.time < 0) {
          clearInterval(this.intervalId);
          this.running = false;
          this.time = 0;
          this.timeUp.emit();
        } else {
          this.titleService.setTitle(this.formatTime(this.time));
        }
      }, 1000);
  }

  reset() {
    this.resetTimer.emit();
  }

  startWith(newTime: number) {
    this.time = newTime;
    this.startTimer();
  }

  resetWith(newTime) {
    this.breakActive = false;
    clearInterval(this.intervalId);
    this.running = false;
    this.time = newTime;
  }

  setBreak(breakActive) {
    this.breakActive = breakActive;
  }

  formatTime(seconds: number): any {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds - mins*60);

    let minStr = this.zeroPad(mins);
    let secStr = this.zeroPad(secs);

    const timeStr = `${minStr}:${secStr}`;

    return timeStr;
  }
  
  zeroPad(val: number) {
    if (val < 10) {
      return `0${val}`;
    }
    return val.toString();
  }

  openSettings() {
    this.modalService.open(
      SettingsModalComponent, {
        windowClass: 'settings-modal'
      });
  }

  openInfo() {
    this.modalService.open(this.infoWindow);
  }
}
