import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserI } from 'src/app/shared/models/user.interface';
import { FileI } from 'src/app/shared/models/file.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl({value: '', disabled: true}, Validators.required),
    photoURL: new FormControl('', Validators.required)
  });

  image: FileI;
  currentImage: String = "https://picsum.photos/200";

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.userData.subscribe(user => {
      this.initValueForm(user);
      //console.log('User ',user);
    });
  }

  private initValueForm(user: UserI): void {
    if(user.photoURL){
      this.currentImage = user.photoURL;
    }

    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    });
  }

  onSaveUser(user: UserI): void {
    this.auth.preSaveUserProfile(user, this.image);
  }

  handleImage(image: FileI){
    this.image = image;
  }

}
