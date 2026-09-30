import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-email-control',
  imports: [ReactiveFormsModule],
  templateUrl: './email-control.html',
  styleUrl: './email-control.css',
})
export class EmailControl {
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  validar(){
    this.emailControl.markAsTouched
  }
}
