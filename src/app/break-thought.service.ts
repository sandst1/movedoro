import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class BreakThoughtService {

  thoughts: Array<string> = null;
  thoughtsToUse: Array<string> = null;

  constructor(private http:Http) {
    this.http.get('/assets/thoughts.json')
      .subscribe(res => {
        const json = res.json();
        if (json && json.thoughts) {
          this.thoughts = json.thoughts;
          this.resetThoughts();
        }
      });
  }

  gimmeAThought() {
    if (!this.thoughtsToUse.length) {
      this.resetThoughts();
    }
    
    return this.thoughtsToUse.pop();
  }

  resetThoughts() {
    this.thoughtsToUse = [...this.thoughts];

    for (var i = this.thoughtsToUse.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.thoughtsToUse[i];
      this.thoughtsToUse[i] = this.thoughtsToUse[j];
      this.thoughtsToUse[j] = temp;
    }
  }
}
