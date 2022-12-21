import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IArticle } from 'src/app/shared/interfaces/article';
import { IComment } from 'src/app/shared/interfaces/comment';

const apiURL = environment.apiURL

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) { }

  loadArticles() {
    return this.httpClient.get<IArticle[]>(`${apiURL}/articles`)
  }

  loadLatestArticles() {
    return this.httpClient.get<IArticle[]>(`${apiURL}/articles/latest`)
  }

  createArticle(title: String, description: String, category: String) {
    return this.httpClient.post(`${apiURL}/articles`,{
      title,
      description,
      category,

    },httpOptions)
  }

  detailsArticle(articleId: string) {
    return this.httpClient.get<IArticle>(`${apiURL}/articles/${articleId}`)
  }

  updateArticle(articleId: number, article: object) {
    return this.httpClient.put(`${apiURL}/articles/${articleId}`,article, httpOptions)
  }

  updateArticleStatus(articleId: string, status: object) {
    return this.httpClient.put(`${apiURL}/articles/${articleId}/status`, status, httpOptions)
  }

  deleteArticle(articleId: string) {
    return this.httpClient.delete(`${apiURL}/articles/${articleId}`)
  }

  followArticle(articleId: number) {
    return this.httpClient.get(`${apiURL}/articles/${articleId}/follow`)
  }

  unfollowArticle(articleId: number) {
    return this.httpClient.get(`${apiURL}/articles/${articleId}/unfollow`)
  }

  createComment(comment: string, article: number) {
    return this.httpClient.post(`${apiURL}/comments`,{
      comment,
      article,
    }, httpOptions)
  }

  deleteComments(articleId: string) {
    return this.httpClient.delete(`${apiURL}/comments/${articleId}`)
  }

  loadComments(articleId: string) {
    return this.httpClient.get<IComment[]>(`${apiURL}/comments/article/${articleId}`)
  }

  likeComment(commentId: string) {
    return this.httpClient.get<IArticle>(`${apiURL}/comments/${commentId}/like`)
  }

  getProfileArticles(profileId: string) {
    return this.httpClient.get<IArticle[]>(`${apiURL}/articles/owner/${profileId}`)
  }

  getFollowerArticles(followerId: string) {
    return this.httpClient.get<IArticle[]>(`${apiURL}/articles/follower/${followerId}`)
  }

  getProfileComments(profileId: string) {
    return this.httpClient.get<IComment[]>(`${apiURL}/comments/owner/${profileId}`)
  }

  loadArticlesByList(articleIds: any) {
    return this.httpClient.get<IArticle[]>(`${apiURL}/articles/list/${articleIds}`)
  }

}
