import {Component, signal, OnInit, PLATFORM_ID, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ToastContainer} from './components/toast-container/toast-container';
import {VlibrasWidget} from './components/vlibras-widget/vlibras-widget';
import {isPlatformBrowser} from '@angular/common';
import {AuthService} from './core/service/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastContainer, VlibrasWidget],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],

})
export class App implements OnInit {
  protected readonly title = signal('acadly');

  private platformId = inject(PLATFORM_ID);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {

      const script = document.createElement('script');
      script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
      script.onload = () => {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      };
      document.body.appendChild(script);

      this.authService.authInitialized().subscribe(() => {
        if (this.authService.isLogged()) {
          const userRole = this.authService.userRole();

          if (userRole === 'ADMIN' && !this.router.url.startsWith('/admin')) {
            this.router.navigate(['/admin']);
          } else if (userRole === 'EMPLOYEE' && !this.router.url.startsWith('/employee')) {
            this.router.navigate(['/employee']);
          }
        }
      });
    }
  }
}
