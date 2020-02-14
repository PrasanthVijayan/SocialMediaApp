import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: string[];
  userId: string;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params.id;
    console.log('From message component, userid:', this.userId);
    this.dataService.getPosts(this.userId)
      .subscribe((data) => {
        console.log(data);
        this.messages = data;
      });
  }

}
