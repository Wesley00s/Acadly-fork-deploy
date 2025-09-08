import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Pagination, Navigation, Scrollbar, Keyboard } from 'swiper/modules';

interface Student {
  name: string;
  githubUrl?: string;
  linkedinUrl?: string;
  avatarUrl?: string;
}

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUs implements AfterViewInit {
  students: Student[] = [
    { name: 'Douglas', githubUrl: 'https://github.com/Doug16yanc', linkedinUrl: 'https://linkedin.com/in/douglas-holanda-113519269', avatarUrl: '/assets/avatars/douglas.png' },
    { name: 'Kaiane', githubUrl: 'https://github.com/KaianeSousa', linkedinUrl: 'https://linkedin.com/in/kaianem/', avatarUrl: '/assets/avatars/kaiane.png' },
    { name: 'Letícia', githubUrl: 'https://github.com/Leititcia', linkedinUrl: 'https://linkedin.com/in/leititciavale', avatarUrl: '/assets/avatars/leticia.png' },
    { name: 'Lívia Mota', githubUrl: 'https://github.com/Motaplivia', linkedinUrl: 'https://linkedin.com/in/motaplivia', avatarUrl: '/assets/avatars/livia-mota.png' },
    { name: 'Lívia Noronha', linkedinUrl: 'https://linkedin.com/in/livia-p-072244197', avatarUrl: '/assets/avatars/livia-noronha.png' },
    { name: 'Lucas', linkedinUrl: 'https://linkedin.com/in/lucasmew', avatarUrl: '/assets/avatars/lucas.jpg' },
    { name: 'Micaele', githubUrl: 'https://github.com/Micaelerodrigue', linkedinUrl: 'https://linkedin.com/in/micaele-rodrigues-b1042b270/', avatarUrl: '/assets/avatars/micaele.png' },
    { name: 'Wesley', githubUrl: 'https://github.com/Wesley00s', linkedinUrl: 'https://linkedin.com/in/wesley-rodrigues-de-sousa', avatarUrl: '/assets/avatars/wesley.png' },
  ];

  private swiperModules = [Pagination, Navigation, Scrollbar, Keyboard];

  ngAfterViewInit(): void {
    new Swiper('.swiper-container', {
      modules: this.swiperModules,
      slidesPerView: 'auto',
      spaceBetween: 20,
      loop: false,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
        hide: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        900: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
      a11y: {
        enabled: true,
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        firstSlideMessage: 'This is the first slide',
        lastSlideMessage: 'This is the last slide',
        paginationBulletMessage: 'Go to slide {{index}}',
      },
    });
  }

}
