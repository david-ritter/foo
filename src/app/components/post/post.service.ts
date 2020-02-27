import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { PostI } from '../../shared/models/post.interface';
import { FileI } from 'src/app/shared/models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postCollection: AngularFirestoreCollection<PostI>;
  private filePath: any;
  private donwloadURL: Observable<string>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.postCollection = afs.collection<PostI>('posts');
  }

  getAllPost(): Observable<PostI[]>{
    return this.postCollection.snapshotChanges().pipe(
      map(actions => 
          actions.map(a => {
            const data = a.payload.doc.data() as PostI;
            const id = a.payload.doc.id;
            return {id, ...data};
          }
        )
      )
    );
  }

  getOnePost(id: PostI): Observable<PostI>{
    return this.afs.doc<PostI>(`posts/${id}`).valueChanges();
  }

  deletePostById(post: PostI) {
    return this.postCollection.doc(post.id).delete();
  }

  updatePostById(post: PostI) {
    return this.postCollection.doc(post.id).update(post);
  }

  private uploadImage(post: PostI, image: FileI) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe(urlImage => {
        this.donwloadURL = urlImage;
        this.savePost(post);
      });
    })).subscribe();
  }

  public preAddAndUpdatePost(post: PostI, image: FileI):void {
    this.uploadImage(post, image);
  }

  public savePost(post: PostI) {
    const postObj = {
      titlePost: post.titlePost,
      contentPost: post.contentPost,
      tagsPost: post.tagsPost,
      fileRef: this.filePath,
      imagePost: this.donwloadURL
    }
    this.postCollection.add(postObj);
  }

}
