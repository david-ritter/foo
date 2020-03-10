import { Component, OnInit, Input } from '@angular/core';
import { PostI } from 'src/app/shared/models/post.interface';
import { PostService } from '../post.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  image: any;
  imageOriginal: any;

  @Input() post:PostI;

  editPostForm = new FormGroup({
    id: new FormControl('', Validators.required),
    titlePost: new FormControl('', Validators.required),
    contentPost: new FormControl('', Validators.required),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required),
  });

  constructor(private postSvc: PostService) { }

  ngOnInit(): void {
    this.imageOriginal = this.post.imagePost;
    this.initValuesForm();
  }

  editPost(post: PostI) {
    if(!this.image){
      post.imagePost = this.imageOriginal;
      this.postSvc.updatePostById(post);
    }else {
      this.postSvc.updatePostById(post, this.image);
    }
  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
  }

  initValuesForm(): void{
    this.editPostForm.patchValue({
      id: this.post.id,
      titlePost: this.post.titlePost,
      contentPost: this.post.contentPost,
      tagsPost: this.post.tagsPost
    });
  }

}
