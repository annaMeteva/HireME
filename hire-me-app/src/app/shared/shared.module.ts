import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCarouselComponent } from './carousel-animations/main-carousel/main-carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MainCarouselComponent,
    CategoriesListComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule
  ],
  exports: [
    MainCarouselComponent,
    CategoriesListComponent
  ]
})
export class SharedModule { }
