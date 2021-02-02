import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {


  noticias: Article[]=[];

  constructor( private storage: Storage , public toastController: ToastController ) {

    this.cargarFavoritos();

   }
   async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

  guardarNoticia(noticia: Article){


    const existe = this.noticias.find(noti => noti.title == noticia.title);

    if(!existe)
    {
      this.noticias.unshift(noticia);
      this.storage.set('Favoritos',this.noticias);
    }

    this.presentToast('Agregado a Favorito');
  }
  async cargarFavoritos(){
    const favoritos = await this.storage.get('Favoritos');
    //console.log('async await ', favoritos);
    if( favoritos ) {
      this.noticias = favoritos;
    }
    

  }
  borrarNoticia( noticia: Article ) {

    this.noticias = this.noticias.filter(noti => noti.title != noticia.title);
    this.storage.set('Favoritos',this.noticias);
    this.presentToast('Borrar de Favorito');

  }
}
