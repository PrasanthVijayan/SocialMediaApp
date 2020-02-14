import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: string;
  userprofile: User;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id:', this.id);
    this.getProfile();
  }

  getProfile(){
    this.dataService.getProfile(this.id)
      .subscribe((data) => {
        console.log(data)
        this.userprofile = data;
      });
  }

}
