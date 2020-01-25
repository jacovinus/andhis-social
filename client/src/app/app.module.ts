import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoginComponent } from "./components/users/login/login.component";
import { RegisterComponent } from "./components/users/register/register.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./components/shared/home/home.component";
import { UserEditComponent } from "./components/users/user-edit/user-edit.component";
import { UsersComponent } from "./components/users/users.component";
import { SidebarComponent } from "./components/shared/sidebar/sidebar.component";
import { MomentModule } from "angular2-moment";
import { ProfileComponent } from "./components/users/profile/profile.component";
import { MessagesModule } from "./components/messages/messages.module";
import { MessagesRoutingModule } from "./components/messages/messages-routing.module";
import { PoliticsComponent } from "./components/shared/politics/politics.component";
import { FollowingComponent } from './components/users/following/following.component';
import { PublicationsModule } from './components/publications/publications.module';
import { PublicationsRoutingModule } from './components/publications/publications.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
    ProfileComponent,
    FollowingComponent,
    PoliticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MessagesRoutingModule,
    PublicationsRoutingModule,
    NgbModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    FormsModule,
    MomentModule,
    MessagesModule,
    PublicationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
