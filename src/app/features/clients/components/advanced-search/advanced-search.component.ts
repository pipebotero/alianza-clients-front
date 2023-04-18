import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ac-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {

  @Output() search = new EventEmitter();

  searchForm = this.fb.group({
    name: [''],
    email: [''],
    phone: [''],
    startDate: [''],
    endDate: [''],
  });

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(this.searchForm.valid) {
      this.search.emit(this.searchForm.value)
    }
  }

}
