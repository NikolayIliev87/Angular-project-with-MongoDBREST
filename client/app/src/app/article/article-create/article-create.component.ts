import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {

  articleCreateForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    category: ['', [Validators.required]],
  });
  // status = false
  // owner = this.tokenStorage.getUser()

  constructor(private fb: FormBuilder, private router: Router, private articleService: ArticleService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  formSubmitHandler(): void {
    if (this.articleCreateForm.valid) {
        this.articleService.createArticle(
        this.articleCreateForm.value.title!,
        this.articleCreateForm.value.description!,
        this.articleCreateForm.value.category!,
        ).subscribe()

      this.router.navigate(['/'])
    }
  }
}
