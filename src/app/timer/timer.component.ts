import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  OnInit 
} from '@angular/core';

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

  time:number = 0;
  running: boolean = false;
  intervalId = null;

  constructor() {
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
    this.intervalId = setInterval(() => {
        this.time--;
        document.title = this.formatTime(this.time);
        if (this.time < 0) {
          clearInterval(this.intervalId);
          this.running = false;
          this.time = 0;
          this.timeUp.emit();
        }
      }, 1000);
  }

  reset() {
    clearInterval(this.intervalId);
    this.running = false;
    this.time = this.amount;
  }

  startWith(newTime: number) {
    this.time = newTime;
    this.startTimer();
  }

  resetWith(newTime) {
    clearInterval(this.intervalId);
    this.running = false;
    this.time = newTime;    
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

}
