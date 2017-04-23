import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs/Rx';

import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class SettingsService {

  public changedSettings: Subject<any> = new BehaviorSubject<any>(null);

  SETTINGS_KEY:string = 'settings';

  defaultSettings = {
    pomodoroTime: 25*60,
    breakTime: 5*60,
    soundOn: true,
    notifications: false,
    volume: 0.5
  };

  constructor(
    private localStorage: LocalStorageService
  ) {
  }

  getSettings() {
    const settingsJson:string  = this.localStorage.get(this.SETTINGS_KEY) as string;
    if (settingsJson) {
      return JSON.parse(settingsJson);
    }
    return this.defaultSettings;
  }

  saveSettings(settings:any) {
    this.localStorage.set(this.SETTINGS_KEY, JSON.stringify(settings));
    this.changedSettings.next(settings);
  }
}
