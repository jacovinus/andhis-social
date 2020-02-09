import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { FollowingComponent } from './following/following.component';
import { FollowedComponent } from './followed/followed.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users.routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PublicationsModule } from '../publications/publications.module';

@NgModule({
  declarations: [UsersComponent, 
    UserEditComponent, 
    RegisterComponent, 
    ProfileComponent,
    LoginComponent,
    FollowingComponent,
    FollowedComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    SharedModule,
    PublicationsModule
  ],
  exports: [
    UsersComponent, 
    UserEditComponent, 
    RegisterComponent, 
    ProfileComponent,
    LoginComponent,
    FollowingComponent,
    FollowedComponent,
    UsersRoutingModule
  ]
})
export class UsersModule { }
