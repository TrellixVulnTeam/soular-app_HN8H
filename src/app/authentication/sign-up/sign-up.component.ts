import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signForm: FormGroup;
  constructor(
    private _router: Router, private FB: FormBuilder,
    private authService: AuthService 
  ) { 
    this.signForm = FB.group({
      firstName: [""],
      lastName: [""],
      email: [""],
      telephone: [""],
      password: [""],
      repeat_password: [""]
    });
  }

  userSignUp(user){
    // console.log(user);
    this.authService.signUpwithPassword(user);
  }

  ngOnInit() {
  }

}
