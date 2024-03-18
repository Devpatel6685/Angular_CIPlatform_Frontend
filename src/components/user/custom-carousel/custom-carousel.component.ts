import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-custom-carousel',
  standalone: true,
  imports: [  CarouselModule, NgOptimizedImage, CommonModule ],
  templateUrl: './custom-carousel.component.html',
  styleUrl: './custom-carousel.component.css'
})
export class CustomCarouselComponent {
 
}
