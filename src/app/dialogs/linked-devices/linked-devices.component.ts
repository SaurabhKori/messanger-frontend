import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-linked-devices',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>Linked Devices</h2>
    <mat-dialog-content>
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="font-medium">Active Sessions</h3>
          <button mat-button color="primary" (click)="refreshDevices()">
            <mat-icon>refresh</mat-icon>
            Refresh
          </button>
        </div>

        <div class="space-y-2">
          <div *ngFor="let device of devices">
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 class="font-medium">{{device.name}}</h4>
                <p class="text-sm text-gray-600">{{device.lastUsed}}</p>
              </div>
              <button mat-icon-button (click)="removeDevice(device.id)">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <button mat-button color="warn" (click)="logoutAll()">
            <mat-icon>logout</mat-icon>
            Logout from All Devices
          </button>
        </div>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `
})
export class LinkedDevicesDialogComponent {
  devices = [
    {
      id: 1,
      name: 'Desktop - Windows',
      lastUsed: '5 minutes ago'
    },
    {
      id: 2,
      name: 'Mobile - Android',
      lastUsed: '2 hours ago'
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<LinkedDevicesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  refreshDevices() {
    // TODO: Implement device refresh
  }

  removeDevice(deviceId: number) {
    // TODO: Implement device removal
  }

  logoutAll() {
    // TODO: Implement logout from all devices
  }
}
