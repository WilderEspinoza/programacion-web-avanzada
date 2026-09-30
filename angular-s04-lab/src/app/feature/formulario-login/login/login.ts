import { Component } from '@angular/core';
import{ FormControl, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid){

    }
  }
   
}
