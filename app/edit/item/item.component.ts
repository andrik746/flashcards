import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ManagerService } from '../../services/manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../../item.model';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  myForm: FormGroup;
  question: AbstractControl;
  answer: AbstractControl;
  id: string;
  currentCategoryItems: Item[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private managerService: ManagerService) { }

  ngOnInit() {
    this.getId();
    this.fetchItems();
    this.buildForm();
  }

  getId() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  fetchItems() {
    this.route.data
      .subscribe((data: { items: Item[] }) => {
        this.currentCategoryItems = data.items;
      });
  }

  buildForm() {
    this.myForm = this.fb.group({
      question: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(65535)
      ])],
      answer: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(65535)
      ])]
    });
    this.question = this.myForm.controls.question;
    this.answer = this.myForm.controls.answer;
  }

  onSubmit() {
    if (this.currentCategoryItems.length > 49) {
      alert('Sorry, but you can not add more items');
      this.fetchItems();
      return;
    }
    if (this.myForm.valid) {
      this.managerService.addItem(this.myForm.value, this.id).subscribe(res => {
        console.log('New item has been added');
      });
      this.myForm.reset();
    } else {
      console.log('form is not valid');
    }
  }

}
