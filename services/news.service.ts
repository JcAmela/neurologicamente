import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private readonly API_URL = 'https://newsapi.org/v2/everything?language=es';
  private readonly apiKey = '68ab62940a1b47df94e2d5a8f7cde0cc';    

  constructor(private http: HttpClient, private dataService: DataService) { }

  getNews(fromDate?: string, toDate?: string, query: string = 'terapia'): Observable<any> {
    fromDate = fromDate ? fromDate : this.dataService.getYesterday();
    toDate = toDate ? toDate : this.dataService.getToday();
    const fullUrl = `${this.API_URL}&from=${fromDate}&to=${toDate}&q=${query}&apiKey=${this.apiKey}`;
    return this.http.get(fullUrl);
  }
}
