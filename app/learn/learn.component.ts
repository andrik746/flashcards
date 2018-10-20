import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../category.model';
import { Item } from '../item.model';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {
  id: string;
  currentCat: Category;
  currentCatItems: Item[] = [];
  currentCatItem: Item;
  index: number = 0;
  orderedItems: Item[];
  orderButtonVisibility: boolean = true;
  questionVisibility: boolean = false;
  answerVisibility: boolean = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.getId();
    this.setCurrentCat();
    this.fetchItems();
  }

  getId() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  setCurrentCat() {
    this.route.data
      .subscribe((data: { currentCat: Category }) => {
        this.currentCat = data.currentCat;
      });
  }

  fetchItems() {
    this.route.data
      .subscribe( (data: {items: Item[]}) => {
        this.currentCatItems = data.items;
        this.currentCatItem = this.currentCatItems[0];
        this.orderedItems = data.items.slice(0);
      });
  }

  onShuffle() {
    this.shuffleItems();
    this.index = 0;
    this.currentCatItem = this.currentCatItems[0];
    if (this.orderButtonVisibility === true) {
      this.orderButtonVisibility = false;
    }
  }

  shuffleItems() {
    let sampleToCompare = this.currentCatItems.slice(0);
    this.currentCatItems = this.currentCatItems.sort(() => {
      let random = Math.random();
      return 0.5 - random;
    });
    if (this.currentCatItems === sampleToCompare) {
      this.shuffleItems();
    }
    this.toggleToDefault();
  }

  onOrder() {
    if (this.currentCatItems === this.orderedItems) return;
    let ordered = this.orderedItems.slice(0);
    this.currentCatItems = ordered;
    this.index = 0;
    this.currentCatItem = this.currentCatItems[0];
    this.toggleToDefault();
  }

  next() {
    this.toggleToDefault();
    if (this.index < this.currentCatItems.length - 1) {
      this.index++;
    } else {
      this.index = 0;
    }
    this.currentCatItem = this.currentCatItems[this.index];
  }

  prev() {
    this.toggleToDefault();
    if (this.index !== 0) {
      this.index--;
    } else {
      this.index = this.currentCatItems.length - 1;
    }
    this.currentCatItem = this.currentCatItems[this.index];
  }

  toggleQ() {
    this.questionVisibility = true;
    this.answerVisibility = false;
  }

  toggleA() {
    this.questionVisibility = false;
    this.answerVisibility = true;
  }

  toggleToDefault() {
    this.questionVisibility = false;
    this.answerVisibility = true;
  }

}
