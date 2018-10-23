import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ManagerService } from '../../../services/manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../../../item.model';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  myForm: FormGroup;
  question: AbstractControl;
  answer: AbstractControl;
  id: string;
  updatingItem: Item;
  qValue: string = '';
  aValue: string = '';
  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private managerService: ManagerService) { }

  ngOnInit() {
    this.getId();
    this.buildForm();
    this.subscribeForUpdatingItem();
  }

  getId() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  buildForm() {
    this.myForm = this.fb.group({
      question: [this.qValue, Validators.required],
      answer: [this.aValue, Validators.required]
    });
    this.question = this.myForm.controls.question;
    this.answer = this.myForm.controls.answer;
  }

  subscribeForUpdatingItem() {
    this.managerService.updatingItemStream.subscribe(item => {
      this.updatingItem = item;
      this.qValue = item.question;
      this.aValue = item.answer;
      this.buildForm();
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.managerService.updateItem(this.myForm.value, this.updatingItem.id, this.updatingItem.category_ref_id).subscribe(name => {
        console.log('Item has been changed');
      });
    } else {
      console.log('form is not valid');
    }
  }

}
