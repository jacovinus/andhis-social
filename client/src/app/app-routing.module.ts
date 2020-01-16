import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { UsersComponent } from "./components/users/users.component";
import { TimelineComponent } from "./components/timeline/timeline.component";
import { HotlistComponent } from "./components/hotlist/hotlist.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { FollowingComponent } from "./components/following/following.component";
import { MessagesRoutingModule } from "./components/messages/messages-routing.module";
import { PublicationDisplayComponent } from './components/publication/publication-display/publication-display.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: HomeComponent },
  { path: "user-edit", component: UserEditComponent },
  { path: "users/:page", component: UsersComponent },
  { path: "users", component: UsersComponent },
  { path: "publications/:page", component: TimelineComponent },
  {path: "publication/:id",component: PublicationDisplayComponent},
  { path: "hotlist", component: HotlistComponent },
  { path: "hotlists", component: HotlistComponent },
  { path: "profile/:id", component: ProfileComponent },
  { path: "following/:id/:page", component: FollowingComponent }
  //{ path: "**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
