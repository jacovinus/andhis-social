import {Component, OnInit, DoCheck} from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
    public title;
    constructor(){
        this.title = 'Messages'
    }
    ngOnInit(){
        
    }
  
}