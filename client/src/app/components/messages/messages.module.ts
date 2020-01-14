// Modulos
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
//Routes
import { MessagesRoutingModule } from "./messages-routing.module";
// Import components
import { MainComponent } from "./components/main/main.component";
import { AddComponent } from "./components/add/add.component";
import { ReceivedComponent } from "./components/received/received.component";
import { SentComponent } from "./components/sent/sent.component";
import { MomentModule } from "angular2-moment";

@NgModule({
  declarations: [MainComponent, AddComponent, ReceivedComponent, SentComponent],
  imports: [CommonModule, FormsModule, MessagesRoutingModule, MomentModule],
  exports: [MainComponent, AddComponent, ReceivedComponent, SentComponent],
  providers: []
})
export class MessagesModule {}
