import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesListLatestComponent } from './articles-list-latest.component';

describe('ArticlesListLatestComponent', () => {
  let component: ArticlesListLatestComponent;
  let fixture: ComponentFixture<ArticlesListLatestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesListLatestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesListLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
