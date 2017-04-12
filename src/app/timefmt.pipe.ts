import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timefmt'
})
export class TimefmtPipe implements PipeTransform {

  transform(seconds: number, args?: any): any {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds - mins*60);

    let minStr = this.zeroPad(mins);
    let secStr = this.zeroPad(secs);

    const timeStr = `${minStr}:${secStr}`;
    document.title = timeStr;

    return timeStr;
  }
  
  zeroPad(val: number) {
    if (val < 10) {
      return `0${val}`;
    }
    return val.toString();
  }
}
