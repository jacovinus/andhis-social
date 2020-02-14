import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TimelineComponent } from './components/publications/timeline/timeline.component';
import { UserGuard } from './services/user-guard.service';

const routes: Routes = [
  { path: "", component:TimelineComponent,canActivate:[UserGuard]},
  { path: "home", component: TimelineComponent,canActivate:[UserGuard]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[UserGuard]
})
export class AppRoutingModule {}
