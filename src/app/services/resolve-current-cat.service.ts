import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ManagerService } from './manager.service';
import { Category } from '../category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolveCurrentCatService implements Resolve<Observable<Category> | boolean> {

  constructor(private managerService: ManagerService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Category> | boolean {
    let id = +route.params['id'];
    return this.managerService.fetchCurrentCat(id);
  }

}
