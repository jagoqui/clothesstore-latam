import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchControlService {
  query = new BehaviorSubject<string>('');
  query$ = this.query.asObservable();

  set queryFilter(query: string) {
    this.query.next(query);
  }
}
