import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MomentModule } from "angular2-moment";
import { MessagesModule } from "./components/messages/messages.module";
import { MessagesRoutingModule } from "./components/messages/messages-routing.module";
import { PublicationsModule } from './components/publications/publications.module';
import { PublicationsRoutingModule } from './components/publications/publications.routing.module';
import { SharedModule } from './components/shared/shared.module';
import { UsersModule } from './components/users/users.module';
import { UsersRoutingModule } from './components/users/users.routing.module';
import { AngularFontAwesomeModule } from "angular-font-awesome";
@NgModule({
  declarations: [
    AppComponent
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
    PublicationsModule,
    SharedModule,
    UsersModule,
    UsersRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
