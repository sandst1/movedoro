import { Injectable } from '@angular/core';

@Injectable()
export class BrowserTitleService {

  suffix: string = '';

  constructor() { 
    this.setTitle = this.setTitle.bind(this);
  }

  setTitle(text) {
    document.title = (text && text.length > 0) ? 
      `(${text}) ${this.suffix}` :
      this.suffix;
  }

  setSuffix(suffix) {
    this.suffix = suffix;
  }

}
