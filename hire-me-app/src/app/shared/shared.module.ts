import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCarouselComponent } from './carousel-animations/main-carousel/main-carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchBarComponent } from './search-bar/search-bar.component';



@NgModule({
  declarations: [
    MainCarouselComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    CarouselModule
  ],
  exports: [
    MainCarouselComponent,
    SearchBarComponent
  ]
})
export class SharedModule { }
