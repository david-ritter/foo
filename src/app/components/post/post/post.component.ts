import { Component, OnInit } from '@angular/core';
import { PostI } from '../../../shared/models/post.interface';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post$: Observable<PostI>;

  constructor(private route: ActivatedRoute, private postSrv: PostService) { }

  ngOnInit(): void {
    const idPost = this.route.snapshot.params.id;
    this.post$ = this.postSrv.getOnePost(idPost);
  }

}
