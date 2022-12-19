import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/article/services/article.service';
import { IArticle } from 'src/app/shared/interfaces/article';
import { IUser } from 'src/app/shared/interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileEditForm!: FormGroup

  articleListIds: any = null
  showOwnArticles: boolean = false
  filteredOwnArticleList: IArticle[] | null = null;

  articleFollowListIds: any = null
  showFollowedArticles: boolean = false
  filteredFollowedArticleList: IArticle[] | null = null;

  articleCommentsListIds: any = null
  showCommentedArticles: boolean = false
  filteredCommentedArticleList: IArticle[] | null = null;

  articleLikedCommentsListIds: any = null
  showLikedCommentsArticles: boolean = false
  filteredLikeCommentsArticleList: IArticle[] | null = null;

  commentsRate: any = null



  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService, 
    private articleService: ArticleService, 
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.profileEditForm = this.fb.group({
      _id: [''],
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      personalinfo: [''],
      created_at: [''],
    });
  
  this.activatedRoute.paramMap.subscribe(params => {
    const profileId = params.get('id')
    if (profileId) {
      this.getProfileData(profileId);
    }
  })
  }

  getProfileData(profileId: string) {
    this.authService.getProfile(profileId).subscribe({
      next: (profile: IUser) => {
        this.editProfileData(profile)
        this.loadArticleListIds(profile._id)
        this.loadArticleFollowListIds(profile._id)
        this.loadArticleCommentsIds(profile._id)
      }      
    })

    // this.authService.getProfile(profileId).subscribe(
    //   (profile: IUser) => (
    //     this.editProfileData(profile),
    //     this.articleService.getProfileArticles(profile._id).subscribe({
    //       next: (value) => {
    //         this.articleListIds = value.map(a => {return a._id})

    //       }}),
    //     this.articleService.getFollowerArticles(profile._id).subscribe({
    //       next: (value) => {
    //         this.articleFollowListIds = value.map(a => {return a._id})

    //       }}),
    //     this.articleService.getProfileComments(profile._id).subscribe({
    //       next: (value) => {
    //         this.articleCommentsListIds = value.map(a => {return a.article})

    //         this.articleLikedCommentsListIds = value.filter(c => c.like === true).map(a => {return a.article})
            
    //         if( this.articleLikedCommentsListIds.length === 0 ) {
    //           this.commentsRate = 0
    //         } else {
    //           this.commentsRate = Math.round((this.articleLikedCommentsListIds.length / this.articleCommentsListIds.length) * 100)
    //         }
    //       }})
    //   ),
    //   (err: any) => console.log(err)
    // )
  }

  editProfileData(profile: IUser) {
    this.profileEditForm.patchValue({
      _id: profile._id,
      email: profile.email,
      firstname: profile.firstname,
      lastname: profile.lastname,
      personalinfo: profile.personalinfo,
      created_at: formatDate(profile.created_at,'MMMM d,y','en'),
    })
  }

  formSubmitHandler(): void {
    if (this.profileEditForm.valid) {
        this.authService.updateProfile(this.profileEditForm.value._id!,{
          email: this.profileEditForm.value.email,
          firstname: this.profileEditForm.value.firstname,
          lastname: this.profileEditForm.value.lastname,
          personalinfo: this.profileEditForm.value.personalinfo,
          updated_at: Date.now()
        }
        ).subscribe()
        this.profileEditForm.markAsPending()

      this.router.navigate([`/auth/profile/${this.profileEditForm.value._id}`])
    }
  }

  loadArticleListIds (id: string) {
    this.articleService.getProfileArticles(id).subscribe({
      next: (value) => {
        this.articleListIds = value.map(a => {return a._id})

      }})
  }

  loadArticleFollowListIds (id: string) {
    this.articleService.getFollowerArticles(id).subscribe({
      next: (value) => {
        this.articleFollowListIds = value.map(a => {return a._id})
      }})
  }

  loadArticleCommentsIds (id: string) {
    this.articleService.getProfileComments(id).subscribe({
      next: (value) => {
        this.articleCommentsListIds = value.map(a => {return a.article})

        this.articleLikedCommentsListIds = value.filter(c => c.like === true).map(a => {return a.article})
        
        if( this.articleLikedCommentsListIds.length === 0 ) {
          this.commentsRate = 0
        } else {
          this.commentsRate = Math.round((this.articleLikedCommentsListIds.length / this.articleCommentsListIds.length) * 100)
        }
      }})
  }

  showOwnArticlesHandler() {
    this.showOwnArticles = true
    if (this.articleListIds.length > 0) {
      this.articleService.loadArticlesByList(this.articleListIds).subscribe({
        next : (value) => {
          this.filteredOwnArticleList = value
        }
      })
    }
  }

  hideOwnArticlesHandler() {
    this.showOwnArticles = false
  }

  showFollowedArticlesHandler() {
    this.showFollowedArticles = true
    if (this.articleFollowListIds.length > 0) {
      this.articleService.loadArticlesByList(this.articleFollowListIds).subscribe({
        next : (value) => {
          this.filteredFollowedArticleList = value
        }
      })
    }
  }

  hideFollowedArticlesHandler() {
    this.showFollowedArticles = false
  }

  showCommentedArticlesHandler() {
    this.showCommentedArticles = true
    if (this.articleCommentsListIds.length > 0) {
      this.articleService.loadArticlesByList(this.articleCommentsListIds).subscribe({
        next : (value) => {
          this.filteredCommentedArticleList = value
        }
      })
    }
  }

  hideCommentedArticlesHandler() {
    this.showCommentedArticles = false
  }

  showLikedCommentsArticleHandler() {
    this.showLikedCommentsArticles = true
    if (this.articleLikedCommentsListIds.length > 0) {
      this.articleService.loadArticlesByList(this.articleLikedCommentsListIds).subscribe({
        next : (value) => {
          this.filteredLikeCommentsArticleList = value
        }
      })
    }
  }

  hideLikedCommentsArticleHandler() {
    this.showLikedCommentsArticles = false
  }

}
