import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PublicationDisplayComponent } from './publication/publication-display/publication-display.component';
import { HotlistComponent } from './hotlist/hotlist.component';
import { PublicationsListComponent } from './publications-list/publications-list.component';

const publicationsRoutes : Routes = [
    { path: "publications/:page", component:PublicationsListComponent },
    {path: "publication/:id",component: PublicationDisplayComponent},
    { path: "hotlist", component: HotlistComponent },
    { path: "hotlists", component: HotlistComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(publicationsRoutes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
  })
  export class PublicationsRoutingModule {}