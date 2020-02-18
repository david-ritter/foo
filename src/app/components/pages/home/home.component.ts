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

/*   posts: PostI[] = [
    {
      id: '1',
      titlePost: 'Post One',
      contentPost: `Quisque venenatis nunc aliquam velit hendrerit semper. Suspendisse sed mi in sapien consectetur mattis. Aenean justo massa, feugiat non ligula ut, congue condimentum est. In ac elit mauris. Nulla finibus suscipit tortor vitae aliquet. Duis ac vestibulum felis. Aenean non tortor euismod, consectetur dolor suscipit, blandit dolor.`,
      imagePost: 'https://picsum.photos/200',    
    },
    {
      id: '2',
      titlePost: 'Post Two',
      contentPost: `Praesent quis sapien accumsan, malesuada sapien in, convallis ligula. Nunc enim augue, rhoncus vitae enim non, bibendum varius erat. Donec in magna sit amet turpis interdum vulputate. Pellentesque eget urna felis. Donec feugiat commodo dolor in ornare. Sed posuere, nunc tincidunt pulvinar congue, urna nulla tristique sapien, eu blandit orci ipsum non enim. In eleifend a nulla ut sodales.`,
      imagePost: 'https://picsum.photos/200',    
    },
    {
      id: '3',
      titlePost: 'Post Three',
      contentPost: `Integer elementum molestie risus eget iaculis. Aliquam erat volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla varius, metus varius viverra laoreet, nibh dolor sollicitudin sem, commodo vestibulum orci tellus vulputate mauris. Nullam elementum hendrerit mi, sed dapibus ante. Nullam id vehicula est. Suspendisse a dolor vel nunc eleifend fringilla nec vel quam.`,
      imagePost: 'https://picsum.photos/200',    
    },
    {
      id: '4',
      titlePost: 'Post Four',
      contentPost: `Quisque in nisl lorem. In pellentesque interdum nibh lobortis ultrices. Sed tincidunt, elit sed lacinia lobortis, lectus nulla pretium elit, vitae iaculis nisi diam sit amet ex. In a nisl vitae eros elementum accumsan. Etiam eget augue ultricies, pharetra massa quis, tristique enim. Sed suscipit leo leo, quis facilisis turpis pharetra sed.`,
      imagePost: 'https://picsum.photos/200',    
    }
  ]; */

  posts$: Observable<PostI[]>

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    //this.postService.getAllPost().subscribe(res => console.log('Posts: ', res));
    this.posts$ = this.postService.getAllPost();
  }

}
