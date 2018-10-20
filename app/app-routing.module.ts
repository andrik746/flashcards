import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { LearnComponent } from './learn/learn.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResolveItemsService } from './services/resolve-items.service';
import { ResolveCurrentCatService } from './services/resolve-current-cat.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { LoginGuard } from './services/login.guard';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    resolve: {
      currentCat: ResolveCurrentCatService,
      items: ResolveItemsService
    },
    canActivate: [LoginGuard]
  },
  {
    path: 'learn/:id',
    component: LearnComponent,
    resolve: {
      currentCat: ResolveCurrentCatService,
      items: ResolveItemsService
    },
    canActivate: [ LoginGuard ]
  },
  {
    path: 'login', component: LoginComponent 
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: '404', component: NotFoundComponent
  },
  {
    path: '**', redirectTo: '/404'
  }
];

@NgModule({
  //imports: [RouterModule.forRoot(routes, { useHash: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
