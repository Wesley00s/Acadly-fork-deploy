import {Component, signal, OnInit, PLATFORM_ID, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ToastContainer} from './components/toast-container/toast-container';
import {VlibrasWidget} from './components/vlibras-widget/vlibras-widget';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastContainer, VlibrasWidget],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  protected readonly title = signal('acadly');

  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {

      const script = document.createElement('script');
      script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
      script.onload = () => {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      };
      document.body.appendChild(script);
    }
  }
}
