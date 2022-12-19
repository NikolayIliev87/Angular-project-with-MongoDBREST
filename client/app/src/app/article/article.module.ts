import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { ArticlesListLatestComponent } from './articles-list-latest/articles-list-latest.component';
import { ArticleCommentCreateComponent } from './article-comment-create/article-comment-create.component';



@NgModule({
  declarations: [
    ArticlesListComponent,
    ArticleCreateComponent,
    ArticleDetailsComponent,
    MainComponent,
    ArticlesListLatestComponent,
    ArticleCommentCreateComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    ArticlesListLatestComponent
  ]
})
export class ArticleModule { }
