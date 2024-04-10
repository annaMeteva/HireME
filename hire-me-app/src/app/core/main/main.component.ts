import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  jobsCount: string = "(0)";
  appliesCount: string = "(0)";

  constructor(private userService: UserService, private router: Router, private apiService: ApiService) { }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.apiService.getAppliesByOwner(this.userService.user?._id!).subscribe((d) => {
        this.appliesCount = '(' + d.length.toString() + ')';
      });
      this.apiService.getJobsByOwner(this.userService.user?._id!).subscribe((d) => {
        this.jobsCount = '(' + d.length.toString() + ')';
      });
    }
  }
}
