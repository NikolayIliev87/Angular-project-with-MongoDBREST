import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCommentCreateComponent } from './article-comment-create.component';

describe('ArticleCommentCreateComponent', () => {
  let component: ArticleCommentCreateComponent;
  let fixture: ComponentFixture<ArticleCommentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleCommentCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleCommentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
