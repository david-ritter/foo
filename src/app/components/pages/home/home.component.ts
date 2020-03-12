import { Component, OnInit } from '@angular/core';
import { PostI } from '../../../shared/models/post.interface';
import { PostService } from '../../post/post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts$: Observable<PostI[]>

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getAllPost();
  }

}
