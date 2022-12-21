import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { IArticle } from 'src/app/shared/interfaces/article';
import { IComment } from 'src/app/shared/interfaces/comment';
import { ArticleService } from '../services/article.service';

@Component({  
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  get isLoggedIn() {
    return this.tokenService.getUser().email!= undefined;
  }

  articleEditForm!: FormGroup
  addComment: any = false
  commentsList: IComment[] | null = null;
  isOwner: any = false
  isFollowed: any = false
  articleStatus: any = null

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private articleService: ArticleService, 
    private activatedRoute:ActivatedRoute,
    private tokenService: TokenStorageService
    ) { }

  ngOnInit(): void {
    
    this.articleEditForm = this.fb.group({
          _id: [''],
          title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
          description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
          category: ['', [Validators.required]],
          owner: [''],
          followers:[''],
          comments:[''],
          created_at:[''],
          updated_at:['']
        });
      
      this.activatedRoute.paramMap.subscribe(params => {
        const articleId = params.get('id')
        if (articleId) {
          this.getArticle(articleId);
        }
      })
  }

  getArticle(articleId: string) {
    this.articleService.detailsArticle(articleId).subscribe(
        (article: IArticle) => (
        this.editArticle(article),
        this.articleStatus = article.status,
        this.isOwner = article.owner._id == this.tokenService.getUser()._id,
        this.isFollowed = (article.followers as any).includes(this.tokenService.getUser()._id,),
        this.articleLoadComments(articleId)
      ),
      (err: any) => console.log(err)
    )
  }

  editArticle(article2: IArticle) {
    this.articleEditForm.patchValue({
      _id: article2._id,
      title: article2.title,
      description: article2.description,
      category: article2.category,
      owner: article2.owner.email,
      followers: article2.followers,
      created_at: formatDate(article2.created_at,'MMMM d,y','en'),
      updated_at: formatDate(article2.updated_at,'MMMM d,y','en')
    })
  }

  formSubmitHandler(): void {
    if (this.articleEditForm.valid) {
        this.articleService.updateArticle(this.articleEditForm.value._id!,{
          title: this.articleEditForm.value.title,
          description: this.articleEditForm.value.description,
          category: this.articleEditForm.value.category,
          status: this.articleStatus,
          updated_at: Date.now()
        }
        ).subscribe()
      this.articleEditForm.markAsPristine()
      this.router.navigate([`/articles/${this.articleEditForm.value._id}`])
    }
  }

  articleLoadComments(articleId: string): void {
    this.articleService.loadComments(articleId).subscribe({
      next: (value) => {
        this.commentsList = value
      }
    })
  }

  articlefollowHandler(): void {
    this.articleService.followArticle(this.articleEditForm.value._id).subscribe()
    this.isFollowed = !this.isFollowed
    this.router.navigate([`/articles/${this.articleEditForm.value._id}`])
  }

  articleunfollowHandler(): void {
    this.articleService.unfollowArticle(this.articleEditForm.value._id).subscribe()
    this.isFollowed = !this.isFollowed
    this.router.navigate([`/articles/${this.articleEditForm.value._id}`])
  }

  articleDeleteHandler(): void {
    this.articleService.deleteArticle(this.articleEditForm.value._id).subscribe()
    this.articleService.deleteComments(this.articleEditForm.value._id).subscribe()
    this.router.navigate(['/'])
  }

  addCommentHandler(): void {
    this.addComment = true
  }

  closeCommentHandler(): void {
    this.addComment = false
  }
  
  likeCommentHandler(comment: IComment): void {
    comment.like = !comment.like;
    this.articleService.likeComment(comment._id).subscribe(
      (article: IArticle) => (
        this.editArticleStatus(article._id)
    ))
  }

  editArticleStatus(articleId: string): void {
    this.articleService.loadComments(articleId).subscribe({
      next: (value) => {
        if (value.filter(v => v.like === true).length > 0) {
          this.articleStatus = true
          this.updateStatus(articleId)
        } else {
          this.articleStatus = false
          this.updateStatus(articleId)
        }
    }})
  }

  updateStatus(articleId: string): void {
    this.articleService.updateArticleStatus(articleId, {
      status: this.articleStatus
    }).subscribe()
  }
}
