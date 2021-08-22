import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemsByCategory } from '@appShared/models/items-by-category.model';
import { environment } from '@env/environment';
import { ParamsSearch } from '@appShared/models/shared/params-search.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsByCategoryService {
  constructor(private http: HttpClient) {}

  searchItemsInCategory(paramsSearch: ParamsSearch): Observable<ItemsByCategory> {
    const { q, limit, offset } = paramsSearch;
    const params = new HttpParams({
      fromObject: { q, limit: limit as unknown as string, offset: offset as unknown as string }
    });
    return this.http.get<ItemsByCategory>(`${environment.baseUrlCO}/search?category=${environment.categoryId}`, {
      params
    });
  }
}
