import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authSvc: AuthService, private route: Router){}

  canActivate(): Observable<boolean> {
    return this.authSvc.userData.pipe(
      map(user => {
        if(!user) {
          this.route.navigate(['login']);
          return false;
        }
        return true;
      })
    );
  }
  
}
