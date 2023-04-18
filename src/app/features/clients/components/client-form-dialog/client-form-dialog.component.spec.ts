import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ClientFormDialogComponent } from './client-form-dialog.component';

describe('ClientFormDialogComponent', () => {
  let component: ClientFormDialogComponent;
  let fixture: ComponentFixture<ClientFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientFormDialogComponent],
      imports: [MatDialogModule],
      providers: [
        FormBuilder,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: MatDialogRef,
          useValue: { close: () => {} },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog on clicking cancel button', () => {
    spyOn(component.dialogRef, 'close');
    component.onNoClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should close the dialog on submitting the form with valid data', () => {
    spyOn(component.dialogRef, 'close');
    component.clientForm.setValue({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '1234567890',
    });
    component.onSubmit();
    expect(component.dialogRef.close).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '1234567890',
    });
  });

  it('should not close the dialog on submitting the form with invalid data', () => {
    spyOn(component.dialogRef, 'close');
    component.clientForm.setValue({
      name: '',
      email: '',
      phone: '',
    });
    component.onSubmit();
    expect(component.dialogRef.close).not.toHaveBeenCalled();
  });

  it('should set form data on initializing the component with data', () => {
    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '1234567890',
    };
    component.data = data;
    component.ngOnInit();
    expect(component.clientForm.value).toEqual(data);
  });
});
