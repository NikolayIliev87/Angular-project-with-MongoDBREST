import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article-comment-create',
  templateUrl: './article-comment-create.component.html',
  styleUrls: ['./article-comment-create.component.css']
})
export class ArticleCommentCreateComponent implements OnInit {
  articleId: any
  commentCreateForm = this.fb.group({
    comment: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private articleService: ArticleService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const articleId = params.get('id')
      if (articleId) {
        this.articleId = articleId;
      }
    })
  }

  formSubmitHandler(): void {
    if (this.commentCreateForm.valid) {
        this.articleService.createComment(
        this.commentCreateForm.value.comment!,
        this.articleId
        ).subscribe()

      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([`/articles/${this.articleId}`])
      })
    }
  }

}
