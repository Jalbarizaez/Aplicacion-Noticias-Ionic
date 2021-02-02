import { DataLocalService } from './../../services/data-local.service';
import { ActionSheetController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article ;
  @Input() i: number;
  @Input() enFavoritos ;

  constructor( private iab: InAppBrowser, private actionSheetCtrl: ActionSheetController,
     private socialSharing: SocialSharing, private datalocalService: DataLocalService) { }

  ngOnInit() {}

  abrirNoticia(){
    //console.log(this.noticia.url);
    const browser = this.iab.create(this.noticia.url,'_system');

  }
  async lanzarMenu(){

    let guardarBorrarBtn;
    if( this.enFavoritos)
    {
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass:'action-dark',
        handler: () => {
          console.log('Borrar de Favorito');
          this.datalocalService.borrarNoticia(this.noticia);
        }
      }

    }
    else{
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass:'action-dark',
        handler: () => {
          console.log('Favorito');
          this.datalocalService.guardarNoticia(this.noticia);
        }
      }
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [ {
        text: 'Compartir',
        icon: 'share',
        cssClass:'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,this.noticia.source.name,'',this.noticia.url
          );
        }
      },
      guardarBorrarBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass:'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
