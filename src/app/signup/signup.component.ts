import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;
  login: AbstractControl;
  password: AbstractControl;
  email: AbstractControl;
  messageState: boolean = true;
  existMessageState: boolean = true;

  constructor(private fb: FormBuilder,
    public authService: AuthService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      login: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])]
    });
    this.login = this.myForm.controls.login;
    this.password = this.myForm.controls.password;
    this.email = this.myForm.controls.email;
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.authService.signup(this.myForm.value).subscribe(res => {
        if (res == 'existing user') {
          this.existMessageState = false;
          setTimeout(() => { this.existMessageState = true }, 10000);
          console.log('this username is already taken');
        } else if (res) {
          console.log('signed up');
        } else {
          this.messageState = false;
          setTimeout(() => { this.messageState = true }, 10000);
          console.log('something went wrong');
        }
      });
      this.myForm.reset();
    } else {
      console.log('form is not valid');
    }
  }

}
