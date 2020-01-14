import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./components/home/home.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { UsersComponent } from "./components/users/users.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { PublicationComponent } from "./components/publication/publication.component";
import { TimelineComponent } from "./components/timeline/timeline.component";
import { MomentModule } from "angular2-moment";
import { HotlistComponent } from "./components/hotlist/hotlist.component";
import { HotlistitemComponent } from "./components/hotlistitem/hotlistitem.component";
import { PublicationsComponent } from "./components/publications/publications.component";
import { LikeComponent } from "./components/like/like.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { FollowingComponent } from "./components/following/following.component";

// Messaging Module
//import { MessagesRoutingModule } from './components/messages/messages-routing.module';
import { MessagesModule } from './components/messages/messages.module';
import { MessagesRoutingModule } from './components/messages/messages-routing.module';
import { HostlistSidebarComponent } from './hostlist-sidebar/hostlist-sidebar.component';
import { HotlistPopupComponent } from './hotlist-popup/hotlist-popup.component';
import { PoliticsComponent } from './components/politics/politics.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
    PublicationComponent,
    TimelineComponent,
    HotlistComponent,
    HotlistitemComponent,
    PublicationsComponent,
    LikeComponent,
    ProfileComponent,
    FollowingComponent,
    HostlistSidebarComponent,
    HotlistPopupComponent,
    PoliticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MessagesRoutingModule,
    NgbModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    FormsModule,
    MomentModule,
    MessagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
