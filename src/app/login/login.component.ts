import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage = 'Les informations ne correspondent pas.';
  fieldTextType: boolean;
  missedConnexion: boolean = false;
  returnUrl: string;
  loading = false;
  userId: number;
  currentUser: User;
  alert: string;
  loginForm?: FormGroup;
  
  constructor(
    private auth: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initConnexionForm();
  }

  initConnexionForm(): void {
    this.loginForm = this.fb.group({
      mail: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
      ])
    });
  }

  toggledEye(): void {
    this.fieldTextType = !this.fieldTextType;
  }
  
  onSubmit(): void {
    const user: User = {
      mail: this.loginForm.value.mail,
      password: this.loginForm.value.password,
    };
    this.auth.login(user);
    this.alert = this.auth.messageNotMatch;
    this.auth.messageActivate;
    if (this.alert != "") {
      this.missedConnexion = !this.missedConnexion;
    };
  }
}
