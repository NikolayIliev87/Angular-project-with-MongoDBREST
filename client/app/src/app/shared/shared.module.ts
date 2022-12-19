import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShortenDescriptionPipe } from './shorten-description.pipe';



@NgModule({
  declarations: [
    ShortenDescriptionPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ShortenDescriptionPipe,
  ]
})
export class SharedModule { }
