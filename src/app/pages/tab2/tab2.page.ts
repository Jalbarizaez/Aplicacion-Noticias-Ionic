import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  categorias = ['business','entertainment' ,'general' ,'health' ,'science', 'sports' ,'technology'];

  @ViewChild(IonSegment) segment: IonSegment;

  
  ngAfterViewInit() {
    this.segment.value = this.categorias[0];
  }


}
