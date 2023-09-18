import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-newscard',
  templateUrl: './newscard.component.html',
  styleUrls: ['./newscard.component.css']
})
export class NewsCardComponent implements OnInit {

  private _noticia: Article = {
    author: '',
    title: '',
    description: '',
    url: '',
    urlToImage: '',
    publishedAt: '',
    content: '',
    source: {
      name: ''
    }
  };

  public displayCard: boolean = true;

  @Input() 
  set noticia(value: Article) {
    this._noticia = { ...value };

    // Verificar si la noticia tiene imagen
    this.displayCard = !!this._noticia.urlToImage && this._noticia.urlToImage.trim() !== '';

    if (this._noticia.content && this._noticia.content.includes('<![CDATA[')) {
      this._noticia.content = this._noticia.content.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1');
    }
  }

  get noticia(): Article {
    return this._noticia;
  }

  constructor() { }

  ngOnInit(): void { }
}
