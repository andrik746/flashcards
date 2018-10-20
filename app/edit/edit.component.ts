import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../category.model';
import { ManagerService } from '../services/manager.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: string;
  currentCat: Category;
  currentCategoryItems: Item[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private managerService: ManagerService) { }

  ngOnInit() {
    this.getId();
    this.setCurrent();
    this.fetchItems();
    this.subscribeForCatNameUpdates();
  }

  getId() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  setCurrent() {
    this.route.data
      .subscribe((data: { currentCat: Category }) => {
        this.currentCat = data.currentCat;
      });
  }

  fetchItems() {
    this.route.data
      .subscribe((data: { items: Item[] }) => {
        this.currentCategoryItems = data.items;
      });
  }

  onLearn() {
    this.router.navigate(['learn', this.id]);
  }

  subscribeForCatNameUpdates() {
    this.managerService.recentlyUpdatedCatNameStream.subscribe(data => {
      if ( this.id !== String(data.id) ) return;
      this.currentCat.name = data.name;
    });
  }
}
