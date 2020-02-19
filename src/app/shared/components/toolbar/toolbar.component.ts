import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  appName: string = "ngBlog";

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  onlogout(): void {
    this.auth.logout();
  }

}
