import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ManagerService } from './manager.service';
import { Item } from '../item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolveItemsService implements Resolve<Observable<Item[]> | Promise<Item[]> | boolean> {

  constructor(private managerService: ManagerService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Item[]> | Promise<Item[]> | boolean {
    let id = +route.params['id'];
    return this.managerService.fetchItems(id);
  }
}
