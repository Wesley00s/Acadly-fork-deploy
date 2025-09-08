import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { BannerComponent } from '../../components/banner/banner.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ListCardsComponent } from '../../components/list-cards/list-cards.component';
import { Guests } from '../../components/guests/guests';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    BannerComponent,
    HeroSectionComponent,
    ListCardsComponent,
    ListCardsComponent,
    Guests,
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

}
