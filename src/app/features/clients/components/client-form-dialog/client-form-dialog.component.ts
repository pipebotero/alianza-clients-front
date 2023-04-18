import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-form-dialog',
  templateUrl: './client-form-dialog.component.html',
  styleUrls: ['./client-form-dialog.component.scss']
})
export class ClientFormDialogComponent implements OnInit {

  clientForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<ClientFormDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (Object.keys(this.data).length > 0) {
      this.clientForm.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if(this.clientForm.valid) {
      this.dialogRef.close(this.clientForm.value);
    }
  }

}
