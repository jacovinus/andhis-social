import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/shared/home/home.component";
import { TimelineComponent } from './components/publications/timeline/timeline.component';
const routes: Routes = [
  { path: "", component:TimelineComponent },
  { path: "home", component: TimelineComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
