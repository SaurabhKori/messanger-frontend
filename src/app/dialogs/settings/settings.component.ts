import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [MatDialogModule, CommonModule, MatSlideToggleModule, MatButtonModule],
  selector: 'app-settings',
  template: `
    <h2 mat-dialog-title>Settings</h2>
    <mat-dialog-content>
      <div class="space-y-4">
        <h3 class="font-medium">Account</h3>
        <div class="space-y-2">
          <div>
            <mat-slide-toggle>Save to cloud</mat-slide-toggle>
          </div>
          <div>
            <mat-slide-toggle>Auto-download media</mat-slide-toggle>
          </div>
          <div>
            <mat-slide-toggle>Use data-saving mode</mat-slide-toggle>
          </div>
        </div>

        <h3 class="font-medium">Notifications</h3>
        <div class="space-y-2">
          <div>
            <mat-slide-toggle>Receive notifications</mat-slide-toggle>
          </div>
          <div>
            <mat-slide-toggle>Show preview</mat-slide-toggle>
          </div>
          <div>
            <mat-slide-toggle>Play sound</mat-slide-toggle>
          </div>
        </div>

        <h3 class="font-medium">Chat</h3>
        <div class="space-y-2">
          <div>
            <mat-slide-toggle>Send read receipts</mat-slide-toggle>
          </div>
          <div>
            <mat-slide-toggle>Double tap to reply</mat-slide-toggle>
          </div>
          <div>
            <mat-slide-toggle>Auto-delete messages</mat-slide-toggle>
          </div>
        </div>

        <h3 class="font-medium">About</h3>
        <div class="space-y-2">
          <div>
            <p>Version: 1.0.0</p>
          </div>
          <div>
            <p>Terms of Service</p>
          </div>
          <div>
            <p>Privacy Policy</p>
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
export class SettingsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  saveSettings() {
    // TODO: Implement saving settings
    this.dialogRef.close();
  }
}
