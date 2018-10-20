import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ManagerService } from '../services/manager.service';
import { Category } from '../category.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  myForm: FormGroup;
  categoryName: AbstractControl;

  constructor(private fb: FormBuilder,
    private managerService: ManagerService,
    private authService: AuthService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      categoryName: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(250)
      ])]
    });
    this.categoryName = this.myForm.controls.categoryName;
  }

  onSubmit() {
    if (this.managerService.cats.length > 9) {
      alert('Sorry, but you can not create more categories.');
      this.managerService.fetchCats(this.authService.userId);
      return;
    } 
    if (this.myForm.valid) {
      let cat: Category = new Category(this.categoryName.value, this.authService.userId);
      this.managerService.addCat(cat).subscribe(cat => {
        console.log(`New cat ${cat.name} was added`);
      });
      this.myForm.reset();
    } else {
      console.log('form is not valid');
    }
  }
}
