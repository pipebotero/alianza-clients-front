import { NgModule } from '@angular/core';
import {
  AuthenticationRoutingModule,
  routedComponents,
} from './authentication-routing.module';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatNativeDateModule} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider'; 

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const matModules = [
  MatCardModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatPaginatorModule,
  MatTableModule,
  MatDialogModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDividerModule
];

@NgModule({
  declarations: [...routedComponents],
  imports: [
    AuthenticationRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...matModules,
    SharedModule,
  ],
})
export class AuthenticationModule {}
