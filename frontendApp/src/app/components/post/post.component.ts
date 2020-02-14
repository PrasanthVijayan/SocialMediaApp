import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post = {};
  token: string;
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  savePost() {
    console.log(this.post);
    this.dataService.savePost(this.post);
  }

}
