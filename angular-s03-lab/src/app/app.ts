import { Component, signal } from '@angular/core';
import {Header} from './components/header/header';
import { Interpolacion } from './components/interpolacion/interpolacion';
import {Binding} from './components/binding/binding';
import { Ej05ControlFlow } from './components/ej05-control-flow/ej05-control-flow';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Interpolacion, Binding, Ej05ControlFlow],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-s03-lab');
}
