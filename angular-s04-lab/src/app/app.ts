import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {EmailControl} from './feature/formulario-email/email-control/email-control';
import { Login } from './feature/formulario-login/login/login';

@Component({
  selector: 'app-root',
  imports: [ EmailControl, Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-s04-lab');
}
