import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment.prod';

const apiKey = environment.apiKey


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor( private http: HttpClient ) { }

  getTopHeadlines() {
    return this.http.get<RespuestaTopHeadlines>(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=45b41caef3304d178f4804887dc97ff3`);
  }
  getTopHeadlinesCategoria(){
    return this.http.get
  }
}
