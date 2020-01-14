import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// Import components
import { MainComponent } from "./components/main/main.component";
import { AddComponent } from "./components/add/add.component";
import { ReceivedComponent } from "./components/received/received.component";
import { SentComponent } from "./components/sent/sent.component";

const messagesRoutes: Routes = [
  {
    path: "messages",
    component: MainComponent,
    children: [
      { path: "", component: ReceivedComponent },
      { path: "send", component: AddComponent },
      { path: "received", component: ReceivedComponent },
      { path: "received/:page", component: ReceivedComponent },
      { path: "sent", component: SentComponent },
      { path: "sent/:page", component: SentComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(messagesRoutes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule {}
