import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagerService } from '../../services/manager.service';
import { Category } from '../../category.model';
import { Item } from '../../item.model';

@Component({
  selector: 'app-added-items',
  templateUrl: './added-items.component.html',
  styleUrls: ['./added-items.component.css']
})
export class AddedItemsComponent implements OnInit {
  id: string;
  currentCat: Category;
  currentCategoryItems: Item[] = [];
  constructor(private route: ActivatedRoute,
    private managerService: ManagerService) { }

  ngOnInit() {
    this.getId();
    this.setCurrent();
    this.fetchItems();
    this.fetchRecentlyAddedItem();
    this.subscribeForItemUpdate();
  }

  getId() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  onClick(item: Item) {
    this.managerService.deleteItem(item.id).subscribe(id => {
      let filteredItems: Item[] = this.currentCategoryItems.filter(item => {
        return +item.id !== +id;
      });
      this.currentCategoryItems = filteredItems;
      console.log('Item has been removed');
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

  fetchRecentlyAddedItem() {
    this.managerService.recentlyAddedItemStream.subscribe(item => {
      if (String(item.category_ref_id) !== this.id) return;
      this.currentCategoryItems.push(item);
    });
  }

  onUpdateItem(item:Item) {
    this.managerService.boradcastUpdatingItem(item);
  }

  subscribeForItemUpdate() {
    this.managerService.recentlyUpdatedItemStream.subscribe(item => {
      let updatedItem = this.currentCategoryItems.filter((existingItem) => {
        return existingItem.id === item.id;
      })[0];
      if (updatedItem) {
        updatedItem.question = item.question;
        updatedItem.answer = item.answer;
      }
    });
  }
}
