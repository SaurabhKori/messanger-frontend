import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <h2 mat-dialog-title>Edit Profile</h2>
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <div class="space-y-4">
          <div>
            <mat-form-field appearance="outline">
              <mat-label>Name</mat-label>
              <input matInput formControlName="name" />
            </mat-form-field>
          </div>
          
          <div>
            <mat-form-field appearance="outline">
              <mat-label>Status</mat-label>
              <input matInput formControlName="status" />
            </mat-form-field>
          </div>

          <div>
            <mat-form-field appearance="outline">
              <mat-label>Profile Picture</mat-label>
              <input matInput formControlName="profilePic" />
            </mat-form-field>
          </div>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close>Cancel</button>
        <button mat-button color="primary" [disabled]="!profileForm.valid" type="submit">Save</button>
      </mat-dialog-actions>
    </form>
  `
})
export class EditProfileDialogComponent {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: any }
  ) {
    this.profileForm = this.fb.group({
      name: [data.user.name || '', Validators.required],
      status: [data.user.status || 'Available'],
      profilePic: [data.user.profilePic || '']
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.dialogRef.close(this.profileForm.value);
    }
  }
}
