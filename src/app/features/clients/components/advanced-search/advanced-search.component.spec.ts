import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { AdvancedSearchComponent } from './advanced-search.component';

describe('AdvancedSearchComponent', () => {
  let component: AdvancedSearchComponent;
  let fixture: ComponentFixture<AdvancedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedSearchComponent ],
      providers: [ FormBuilder ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event with search form value on submit', () => {
    spyOn(component.search, 'emit');
    component.searchForm.setValue({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      startDate: '2022-01-01',
      endDate: '2022-01-31',
    });
    component.onSubmit();
    expect(component.search.emit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      startDate: '2022-01-01',
      endDate: '2022-01-31',
    });
  });

});