import { Injectable } from '@angular/core';
import { UserI } from '../models/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: Observable<firebase.User>
  state = null;

  constructor(private auth: AngularFireAuth) { this.state = this.auth.authState; }

  loginByEmail(user: UserI){
    const {email, password} = user;
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    this.auth.auth.signOut();
    this.userData = null;
  }

}
