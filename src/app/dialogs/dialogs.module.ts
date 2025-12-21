import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { EditProfileDialogComponent } from './edit-profile/edit-profile.component';
import { SettingsDialogComponent } from './settings/settings.component';
import { PrivacySettingsDialogComponent } from './privacy-settings/privacy-settings.component';
import { LinkedDevicesDialogComponent } from './linked-devices/linked-devices.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule,
    MatSlideToggleModule,
    EditProfileDialogComponent,
    SettingsDialogComponent,
    PrivacySettingsDialogComponent,
    LinkedDevicesDialogComponent
  ]
})
export class DialogsModule { }
