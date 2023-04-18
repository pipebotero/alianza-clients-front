import { NgModule } from '@angular/core';
import {
  ClientsRoutingModule,
  routedComponents,
} from './clients-routing.module';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { ClientFormDialogComponent } from './components/client-form-dialog/client-form-dialog.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';

const matModules = [
  MatCardModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatPaginatorModule,
  MatTableModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [...routedComponents, ClientsTableComponent, ClientFormDialogComponent, AdvancedSearchComponent],
  imports: [
    ClientsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...matModules,
    // SharedModule,
  ],
})
export class ClientsModule {}
