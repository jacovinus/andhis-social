import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/users/login/login.component";
import { RegisterComponent } from "./components/users/register/register.component";
import { HomeComponent } from "./components/shared/home/home.component";
import { UserEditComponent } from "./components/users/user-edit/user-edit.component";
import { UsersComponent } from "./components/users/users.component";
import { ProfileComponent } from "./components/users/profile/profile.component";
import { FollowingComponent } from './components/users/following/following.component';
import { FollowedComponent } from './components/users/followed/followed.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: HomeComponent },
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
export class AppRoutingModule {}
