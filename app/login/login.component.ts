import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  login: AbstractControl;
  password: AbstractControl;
  messageState: boolean = true;

  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      login: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])]
    });
    this.login = this.myForm.controls.login;
    this.password = this.myForm.controls.password;
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.authService.login(this.myForm.value).subscribe(res => {
        if (res) {
          console.log('logged');
        } else {
          this.messageState = false;
          setTimeout(() => { this.messageState = true }, 10000);
          console.log('no such user');
        }
      });
      this.myForm.reset();
    } else {
      console.log('form is not valid');
    }
  }

}
