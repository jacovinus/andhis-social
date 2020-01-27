import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PublicationDisplayComponent } from './publication/publication-display/publication-display.component';
import { TimelineComponent } from './timeline/timeline.component';
import { HotlistComponent } from './hotlist/hotlist.component';

const publicationsRoutes : Routes = [
    { path: "publications/:page", component: TimelineComponent },
    {path: "publication/:id",component: PublicationDisplayComponent},
    { path: "hotlist", component: HotlistComponent },
    { path: "hotlists", component: HotlistComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(publicationsRoutes)],
    exports: [RouterModule]
  })
  export class PublicationsRoutingModule {}