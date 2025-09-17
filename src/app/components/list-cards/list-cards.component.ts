import {
  Component,
  OnInit,
  inject,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  PLATFORM_ID, OnDestroy
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {register, SwiperContainer} from 'swiper/element/bundle';
import { Activity } from '../../core/types/Activity';
import { ActivityService } from '../../core/service/activity-service';
import { CardsComponent } from '../cards/cards.component';
import {Pagination} from '../../core/types/Pagination';
import {ActivityModal} from '../activity-modal/activity-modal';
import {catchError, map, Observable, of, startWith} from 'rxjs';
import {SwiperOptions} from 'swiper/types';

register();

interface ActivitiesState {
  loading: boolean;
  activities: Pagination<Activity> | null;
}

@Component({
  selector: 'app-list-cards',
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    CardsComponent,
    ActivityModal
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './list-cards.component.html',
  standalone: true,
  styleUrls: ['./list-cards.component.scss']
})
export class ListCardsComponent implements OnInit, OnDestroy {
  activitiesState$!: Observable<ActivitiesState>;

  private readonly platformId = inject(PLATFORM_ID);
  private assetService = inject(ActivityService);

  private swiperContainerEl: ElementRef<SwiperContainer> | undefined;
  @ViewChild('swiperContainer') set swiperContainer(el: ElementRef<SwiperContainer>) {
    if (el) {
      this.swiperContainerEl = el;
      this.initializeSwiper();
    }
  }

  isModalVisible = false;
  selectedActivity: Activity | null = null;

  ngOnInit(): void {
    this.loadActivities();
  }

  ngOnDestroy(): void {
    this.swiperContainerEl?.nativeElement?.swiper?.destroy(true, true);
  }

  loadActivities(): void {
    this.activitiesState$ = this.assetService.getAllActivities().pipe(
      map(data => ({ loading: false, activities: data })),
      startWith({ loading: true, activities: null }),
      catchError(() => of({ loading: false, activities: null }))
    );
  }

  initializeSwiper(): void {
    if (!isPlatformBrowser(this.platformId) || !this.swiperContainerEl?.nativeElement) {
      return;
    }

    const swiperEl = this.swiperContainerEl.nativeElement;
    if (swiperEl.swiper) return;

    const swiperOptions: SwiperOptions = {
      slidesPerView: 1,
      spaceBetween: 16,
      centeredSlides: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        769: {
          slidesPerView: 3,
          spaceBetween: 20,
          centeredSlides: false,
          pagination: false,
          navigation: { nextEl: '.carousel__nav-next', prevEl: '.carousel__nav-prev' },
        }
      },
    };

    Object.assign(swiperEl, swiperOptions);
    swiperEl.initialize();
  }

  showDetails(activity: Activity): void {
    this.selectedActivity = activity;
    this.isModalVisible = true;
  }

  hideDetails(): void {
    this.isModalVisible = false;
  }
}
