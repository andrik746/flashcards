import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ManagerService } from '../../services/manager.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-name',
  templateUrl: './edit-name.component.html',
  styleUrls: ['./edit-name.component.css']
})
export class EditNameComponent implements OnInit {
  myForm: FormGroup;
  newName: AbstractControl;
  id: string;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private managerService: ManagerService) { }

  ngOnInit() {
    this.getId();
    this.buildForm();
  }

  getId() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  buildForm() {
    this.myForm = this.fb.group({
      newName: ['', Validators.required]
    });
    this.newName = this.myForm.controls.newName;
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.managerService.updateCatName(this.newName.value, this.id).subscribe(name => {
        console.log('Category name has been changed');
      });
      this.myForm.reset();
    } else {
      console.log('form is not valid');
    }
  }

}
