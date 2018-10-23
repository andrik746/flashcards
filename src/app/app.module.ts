import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { ManagerService } from './services/manager.service';
import { AuthService } from './services/auth.service';
import { ResolveItemsService } from './services/resolve-items.service';
import { ResolveCurrentCatService } from './services/resolve-current-cat.service';

import { LoginGuard } from './services/login.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';

import { ItemComponent } from './edit/item/item.component';
import { AddedItemsComponent } from './edit/added-items/added-items.component';
import { LearnComponent } from './learn/learn.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { EditComponent } from './edit/edit.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { EditNameComponent } from './edit/edit-name/edit-name.component';
import { EditItemComponent } from './edit/added-items/edit-item/edit-item.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewComponent,
    ItemComponent,
    AddedItemsComponent,
    LearnComponent,
    CategoryListComponent,
    EditComponent,
    NotFoundComponent,
    JumbotronComponent,
    NavComponent,
    FooterComponent,
    EditNameComponent,
    EditItemComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ManagerService,
    ResolveItemsService,
    ResolveCurrentCatService,
    AuthService,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
