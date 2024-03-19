import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Category } from 'src/app/types/category';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  categories: Category[] | null = [];
  // isLoading: boolean = true;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getCategories().subscribe((categories) => {
      this.categories = categories;
      // setTimeout(() => {
      //   this.isLoading = false;
      // }, 1000);
    });
  }
}
