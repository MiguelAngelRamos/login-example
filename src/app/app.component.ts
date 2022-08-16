import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAuth } from './interface/IAuth';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  forma!: FormGroup;
  messageError: String = '';

  constructor( private router: Router,
               private fb: FormBuilder,
               private authService: AuthService ) { 

                this.crearFormulario();
               }

  ngOnInit(): void {
  }

  get correoNoValido(): boolean {
    // let email = this.forma.get('email')!.invalid;
    // let touched = this.forma.get('email')!.touched;
    // return email && touched;
    return this.forma.get('email')!.invalid && this.forma.get('email')!.touched;
  }

  get passNoValido(): boolean {
    return this.forma.get('password')!.invalid && this.forma.get('password')!.touched;
  }

  crearFormulario(): void {
    this.forma = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    const user:IAuth = {
      email: this.forma.value.email,
      password: this.forma.value.password,
    }
    this.authService.login(user).subscribe(resp => {
     console.log(resp);
    })
  }

}
