import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FollowedComponent } from './followed/followed.component';
import { FollowingComponent } from './following/following.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "user-edit", component: UserEditComponent },
  { path: "users/:page", component: UsersComponent },
  { path: "users", component: UsersComponent },
  { path: "profile/:id", component: ProfileComponent },
  { path: "following/:id/:page", component: FollowingComponent },
  { path: "followed/:id/:page", component: FollowedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}