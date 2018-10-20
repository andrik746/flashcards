import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Item } from '../item.model';
import { Category } from '../category.model';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BASE_URL } from '../base-url';


@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  baseUrl: string = BASE_URL;

  cats: Category[] = [];
  items: Item[] = [];
  recentlyAddedItemStream: Subject<Item> = new Subject<Item>();
  recentlyUpdatedCatNameStream: Subject<Category> = new Subject<Category>();
  updatingItemStream: Subject<Item> = new Subject<Item>();
  recentlyUpdatedItemStream: Subject<Item> = new Subject<Item>();

  constructor(private http: HttpClient) { }

  addCat(cat) {
    return this.http.post(`${this.baseUrl}api/add-cat`, { data: cat })
    .pipe(
      map((res) => {
        this.cats.push(res['data']);
        return res['data'];
      }),
      catchError(this.handleError)
    );
  }

  deleteCat(outcastCat) {
    const params = new HttpParams()
      .set('id', outcastCat.id.toString());

    return this.http.delete(`${this.baseUrl}api/delete-cat`, { params: params })
      .pipe(
        map(res => {
          const filteredCats = this.cats.filter((cat) => {
            return +cat['id'] !== +outcastCat.id;
          });
          this.cats = filteredCats;
          return this.cats;
        }),
        catchError(this.handleError)
      );
  }

  addItem(formValue, category_ref_id) {
    const data = {
      question: formValue.question,
      answer: formValue.answer,
      category_ref_id: category_ref_id
    };

    return this.http.post(`${this.baseUrl}api/add-item`, { data: data })
      .pipe(
        map((res) => {
          this.recentlyAddedItemStream.next(res['data']);
          return res['data'];
        }),
        catchError(this.handleError)
      );
  }

  deleteItem(id) {
    const params = new HttpParams()
      .set('id', id.toString());

    return this.http.delete(`${this.baseUrl}api/delete-item`, { params: params })
      .pipe(
        map(res => {
          return id;
        }),
        catchError(this.handleError)
      );
  }

  fetchCurrentCat(id) {
    const params = new HttpParams()
      .set('id', id.toString());

    return this.http.get(`${this.baseUrl}api/current-cat`, { params: params }).pipe(
      map(res => {
        return res['data'][0];
      })
    );
  }

  fetchCats(userId) {
    const params = new HttpParams()
      .set('id', userId);

    return this.http.get(`${this.baseUrl}api/categories`, { params: params }).pipe(
      map((res) => {
        this.cats = res['data'];
        return res['data'];
      }),
      catchError(this.handleError)
    );
  }

  fetchItems(id) {
    const params = new HttpParams()
      .set('id', id.toString());

    return this.http.get(`${this.baseUrl}api/items`, { params: params }).pipe(
      map((res) => {
        this.items = res['data'];
        return res['data'];
      }),
      catchError(this.handleError)
    );
  }

  updateCatName(name, id) {
    const data = {
      name: name,
      id: id
    };
    return this.http.put(`${this.baseUrl}api/update-cat-name`, { data: data })
      .pipe(
        map((res) => {
          this.recentlyUpdatedCatNameStream.next(data);
          return name;
        }),
        catchError(this.handleError)
      );
  }

  updateItem(formValues, id, categoryRefId) {
    const data = {
      question: formValues.question,
      answer: formValues.answer,
      id: id,
      category_ref_id: categoryRefId
    };
    return this.http.put(`${this.baseUrl}api/update-item`, { data: data })
      .pipe(
        map((res) => {
          this.recentlyUpdatedItemStream.next(res['data']);
          return res;
        }),
        catchError(this.handleError)
      );
  }

  boradcastUpdatingItem(item: Item) {
    this.updatingItemStream.next(item);
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Error! something went wrong.');
  }

}
