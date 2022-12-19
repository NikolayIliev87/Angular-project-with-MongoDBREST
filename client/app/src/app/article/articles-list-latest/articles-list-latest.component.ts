import { Component, OnInit } from '@angular/core';
import { IArticle } from 'src/app/shared/interfaces/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-articles-list-latest',
  templateUrl: './articles-list-latest.component.html',
  styleUrls: ['./articles-list-latest.component.css']
})
export class ArticlesListLatestComponent implements OnInit {
  articleList: IArticle[] | null = null;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.loadLatestArticles().subscribe({
      next: (value) => {
      this.articleList = value
    }})
  }

}
