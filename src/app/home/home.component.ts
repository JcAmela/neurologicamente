import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'services/news.service';
import { Article, NewsResponse } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noticias: Article[] = [];

  constructor(private newsService: NewsService, private router: Router) { }

  ngOnInit(): void {
    this.newsService.getNews().subscribe((response: NewsResponse) => {
      this.noticias = response.articles.filter(article => article.urlToImage && article.title);
    });
  }

  navigateToNewsDetail(noticia: Article): void {
    window.open(noticia.url, "_blank");
  }
}
