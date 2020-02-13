import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PublicationComponent } from "./publication/publication.component";
import { PublicationsComponent } from "./publications.component";
import { LikeComponent } from "./like/like.component";
import { MomentModule } from "angular2-moment";
import { TimelineComponent } from "./timeline/timeline.component";
import { HotlistComponent } from "./hotlist/hotlist.component";
import { HotlistitemComponent } from "./hotlist/hotlistitem/hotlistitem.component";
import { HotlistPopupComponent } from "./hotlist/hotlist-popup/hotlist-popup.component";
import { HostlistSidebarComponent } from "./hotlist/hostlist-sidebar/hostlist-sidebar.component";
import { TextPreviewPipe } from './publication/publication-display/text-preview.pipe';
import { RouterModule } from '@angular/router';
import { PublicationDisplayComponent } from './publication/publication-display/publication-display.component';
import { PublicationsListComponent } from './publications-list/publications-list.component';

@NgModule({
  declarations: [
    PublicationComponent,
    PublicationsComponent,
    PublicationDisplayComponent,
PublicationsListComponent,
    LikeComponent,
    HotlistComponent,
    HotlistitemComponent,
    HotlistPopupComponent,
    HostlistSidebarComponent,
    TimelineComponent,
    TextPreviewPipe,
  ],
  imports: [CommonModule, FormsModule, MomentModule, RouterModule],
  exports: [
    LikeComponent,
    PublicationsComponent,
    PublicationComponent,
    PublicationDisplayComponent,
    TimelineComponent,
    HotlistComponent,
    HotlistitemComponent,
    HotlistPopupComponent,
    HostlistSidebarComponent,
    TextPreviewPipe
  ]
})
export class PublicationsModule {}
