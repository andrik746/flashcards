import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../services/manager.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  loadingDisplay: string = 'none';
  constructor(public managerService: ManagerService, private authService: AuthService) { }

  ngOnInit() {
    this.fetchCats();
  }

  fetchCats() {
    this.loadingDisplay = 'block';
    this.managerService.fetchCats(this.authService.userId).subscribe(cats => {
      console.log('Cats has been fetched');
      this.loadingDisplay = 'none';
    });
  }

  onRemove(index) {
    let flag = confirm("Are you sure that you want to remove this category forever?");
    if (!flag) return;

    let outcastCat = this.managerService.cats[index];
    this.managerService.deleteCat(outcastCat).subscribe(cats => {
      console.log('Cats has been filtered');
    });
  }
}






