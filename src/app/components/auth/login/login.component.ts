import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authSrv: AuthService) {  }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    const user: UserI = {
      email: 'david@me.com',
      password: '123456'
    }

    this.authSrv.loginByEmail(user);
  }

  onLogin(user: UserI){
    this.authSrv.loginByEmail(user).then(
      res => {
        console.log('Succesfully: ', res)
        this.authSrv.userData = this.authSrv.state;
      }
    ).catch(
      err => console.log('Error: ', err)
    );
  }

}
