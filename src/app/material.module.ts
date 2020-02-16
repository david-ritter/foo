import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule }  from '@angular/material/card';
import { MatButtonModule }  from '@angular/material/button';
import { MatMenuModule }  from '@angular/material/menu';
import { MatToolbarModule }  from '@angular/material/toolbar';
import { MatIconModule }  from '@angular/material/icon';
import { MatSidenavModule }  from '@angular/material/sidenav';
import { MatListModule }  from '@angular/material/list';

const modules = [
  MatCardModule, 
  MatButtonModule, 
  MatMenuModule, 
  MatToolbarModule, 
  MatIconModule, 
  MatSidenavModule, 
  MatListModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules
  ],
  exports: [modules]
})
export class MaterialModule { }
