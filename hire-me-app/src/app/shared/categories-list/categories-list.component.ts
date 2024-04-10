import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Category } from 'src/app/types/category';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] | null = [];
  // isLoading: boolean = true;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
