import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrorMsgComponent } from './form-error-msg.component';

describe('FormErrorMsgComponent', () => {
  let component: FormErrorMsgComponent;
  let fixture: ComponentFixture<FormErrorMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormErrorMsgComponent ],
      providers: [ FormBuilder ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorMsgComponent);
    component = fixture.componentInstance;
    component.field = new FormGroup({ field: new FormGroup({}) });
    component.error = 'required';
    component.message = 'Field is required';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show the component when the field is pristine', () => {
    component.field.markAsPristine();
    fixture.detectChanges();
    expect(component.shouldShowComponent()).toBe(false);
  });

  it('should not show the component when the field is untouched', () => {
    component.field.markAsUntouched();
    fixture.detectChanges();
    expect(component.shouldShowComponent()).toBe(false);
  });

  it('should show the component when the field is touched and has the specified error', () => {
    component.field.markAsTouched();
    component.field.setErrors({ 'required': true });
    fixture.detectChanges();
    expect(component.shouldShowComponent()).toBe(true);
  });

  it('should show the component when the field is dirty and has the specified error', () => {
    component.field.markAsDirty();
    component.field.setErrors({ 'required': true });
    fixture.detectChanges();
    expect(component.shouldShowComponent()).toBe(true);
  });


  it('should not display the error message when the field does not have the specified error', () => {
    component.field.markAsTouched();
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeFalsy();
  });
});