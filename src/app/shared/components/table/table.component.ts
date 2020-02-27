import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PostService } from 'src/app/components/post/post.service';
import { PostI } from '../../models/post.interface';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['titlePost', 'tagsPost', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeletePost(post: PostI){    
    Swal.fire({
      title: 'Are you sure?',
      text: `you won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(res => {
      if(res.value){
        this.postSvc.deletePostById(post).then(() => {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
        }).catch(err => {
          Swal.fire('Error!', 'There was an error deleting this post.', 'error')
        })        
      }
    })
  }

  onEditPost(post: PostI){
    console.log('Edited Post:', post);
  }

  onNewPost(){
    this.openDialog();
  }

  constructor(private postSvc: PostService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.postSvc.getAllPost().subscribe(posts => { this.dataSource.data = posts; });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
  }

  openDialog():void {
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe();
  }

}
