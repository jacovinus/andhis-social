import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PoliticsComponent } from './politics/politics.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PublicationsModule } from '../publications/publications.module';

@NgModule({
  declarations: [HomeComponent, NavbarComponent, PoliticsComponent, SidebarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    PublicationsModule
  ],
  exports: [HomeComponent, NavbarComponent, PoliticsComponent, SidebarComponent]
})
export class SharedModule { }
