import { Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.css']
})
export class SettingsModalComponent {
  @Input() name;

  settings: any;
  pomodoroTimeMin: number;
  breakTimeMin: number;

  constructor (
    public activeModal: NgbActiveModal,
    private settingsService: SettingsService
  ) {
    this.settings = this.settingsService.getSettings();
    this.pomodoroTimeMin = Math.floor(this.settings.pomodoroTime / 60);
    this.breakTimeMin = Math.floor(this.settings.breakTime / 60);
  }

  cancel() {
    this.activeModal.dismiss();
  }

  dataIsValid() {
    const valid = 
      this.pomodoroTimeMin && this.pomodoroTimeMin > 0 &&
      this.breakTimeMin && this.breakTimeMin > 0;
      
    return valid;
  }

  save() {
    if (this.dataIsValid()) {
      this.settings.pomodoroTime = this.pomodoroTimeMin * 60;
      this.settings.breakTIme = this.breakTimeMin * 60;
      this.settingsService.saveSettings(this.settings);
      this.activeModal.close();
    }
  }
}
