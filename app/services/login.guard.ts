import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ManagerService } from './manager.service';
import { Category } from '../category.model';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService,
    public router: Router,
    private managerService: ManagerService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (next.params.id !== undefined) {
      let currentCatCheck: Category = this.managerService.cats.filter(cat => {
        return +cat.id == next.params.id;
      })[0];
      if (!currentCatCheck) {
        this.router.navigate(['home']);
        return false;
      }
    }

    return this.authService.isLoggedIn().pipe(
      map((res) => {
        if (res === true) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      }),
      catchError(this.managerService.handleError)
    );

  }
}
