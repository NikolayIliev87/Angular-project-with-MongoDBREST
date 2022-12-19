import { Component, OnInit } from '@angular/core';
import { IArticle } from 'src/app/shared/interfaces/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  articleList: IArticle[] | null = null;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.loadArticles().subscribe({
      next: (value) => {
      this.articleList = value
    }})
  }

}
