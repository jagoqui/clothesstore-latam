import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs/operators';
import { ProductSearchControlService } from '@appShared/services/product-search-control.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy, OnChanges {
  @Input() buttonQuery: string = '';
  search = new FormControl('');
  private destroy$ = new Subject<unknown>();

  constructor(private productSearchControlSvc: ProductSearchControlService) {
    this.onSearch();
  }

  onChange(key: string) {
    if (key === 'Backspace') {
      this.search.valueChanges
        .pipe(
          map((search) => search?.toLowerCase().trim()),
          debounceTime(300),
          filter((search) => search === ''),
          tap(() => this.onClear()),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }

  onClear(): void {
    this.search.reset();
    this.productSearchControlSvc.queryFilter = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  private onSearch(): void {
    this.search.valueChanges
      .pipe(
        map((search) => search?.toLowerCase().trim()),
        debounceTime(300),
        distinctUntilChanged(),
        filter((search) => search !== '' && search?.length > 2),
        tap((search) => {
          this.productSearchControlSvc.queryFilter = search;
          return true;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.search.patchValue(changes.buttonQuery.currentValue);
  }
}
