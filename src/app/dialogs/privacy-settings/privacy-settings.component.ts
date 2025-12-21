import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  imports: [MatDialogModule, MatSlideToggleModule],
  standalone: true,
  selector: 'app-privacy-settings',
  template: `
    <h2 mat-dialog-title>Privacy Settings</h2>
    <mat-dialog-content>
      <div class="space-y-4">
        <h3 class="font-medium">Account Privacy</h3>
        <div class="space-y-2">
          <div>
            <mat-slide-toggle>Allow others to add me by phone number</mat-slide-toggle>
          </div>
          <div>
            <mat-slide-toggle>Allow others to find me by email</mat-slide-toggle>
          </div>
        </div>

        <h3 class="font-medium">Profile Privacy</h3>
        <div class="space-y-2">
          <div>
            <mat-slide-toggle>Allow others to see my profile photo</mat-slide-toggle>
          </div>
          <div>
            <mat-slide-toggle>Allow others to see my status</mat-slide-toggle>
          </div>
          <div>
            <mat-slide-toggle>Allow others to see my last seen</mat-slide-toggle>
          </div>
        </div>

        <h3 class="font-medium">Message Privacy</h3>
        <div class="space-y-2">
          <div>
            <mat-slide-toggle>Allow others to see my online status</mat-slide-toggle>
          </div>
          <div>
            <mat-slide-toggle>Allow others to see my typing indicator</mat-slide-toggle>
          </div>
        </div>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button color="primary" (click)="saveSettings()">Save</button>
    </mat-dialog-actions>
  `
})
export class PrivacySettingsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PrivacySettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  saveSettings() {
    // TODO: Implement saving privacy settings
    this.dialogRef.close();
  }
}
