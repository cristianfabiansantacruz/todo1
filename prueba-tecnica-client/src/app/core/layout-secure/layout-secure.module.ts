import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutSecureRoutingModule } from './layout-secure-routing.module';
import { TemplateComponent } from './template/template.component';
import { MainComponent } from './components/main/main.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {  MatPaginatorModule } from '@angular/material/paginator';
import {  MatSortModule } from '@angular/material/sort';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { RegisterProductsComponent } from './components/register-products/register-products.component';


@NgModule({
  declarations: [
    TemplateComponent,
    MainComponent,
    ListProductsComponent,
    RegisterProductsComponent
  ],
  imports: [
    CommonModule,
    LayoutSecureRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class LayoutSecureModule { }
