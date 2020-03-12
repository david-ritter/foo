import { Injectable } from '@angular/core';
import { UserI } from '../models/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { FileI } from '../models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: Observable<firebase.User>;
  filePath: string;
  //state = null;

  constructor(private auth: AngularFireAuth, private storage: AngularFireStorage) {
    this.userData = this.auth.authState;
  }

  loginByEmail(user: UserI) {
    const { email, password } = user;
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.auth.auth.signOut();
    //this.userData = null;
  }

  preSaveUserProfile(user: UserI, image: FileI): void {
    if(image){
      this.uploadImage(user, image);
    }else{
      this.saveUserProfile(user);
    }    
  }

  private uploadImage(user: UserI, image: FileI) {
    this.filePath = `image/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(
      finalize( () => {
        fileRef.getDownloadURL().subscribe( imageURL => {
          user.photoURL = imageURL;
          this.saveUserProfile(user);
        })
      })
    ).subscribe();
  }

  private saveUserProfile(user: UserI) {
    this.auth.auth.currentUser.updateProfile(user)
      .then()
      .catch(
        err => console.log(err)
      );
  }

}
