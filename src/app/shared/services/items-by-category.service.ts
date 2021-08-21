import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemsByCategory } from '@appShared/models/items-by-category.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsByCategoryService {
  constructor(private http: HttpClient) {}

  searchItemsInCategory(q: string, limit: number, offset: number): Observable<ItemsByCategory> {
    const params = new HttpParams({ fromObject: { q, limit, offset } });
    return this.http.get<ItemsByCategory>(`${environment.baseUrlCO}/search?category=${environment.categoryId}`, {
      params
    });
  }
}
