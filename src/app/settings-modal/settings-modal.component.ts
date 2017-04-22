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

  constructor (
    public activeModal: NgbActiveModal,
    private settingsService: SettingsService
  ) {
    this.settings = this.settingsService.getSettings();
  }

  cancel() {
    this.activeModal.dismiss();
  }

  dataIsValid() {
    const valid = 
      this.settings.pomodoroTime && this.settings.pomodoroTime > 0 &&
      this.settings.breakTime && this.settings.breakTime > 0;
      
    return valid;
  }

  save() {
    if (this.dataIsValid()) {
      this.settingsService.saveSettings(this.settings);
      this.activeModal.close();
    }
  }
}
