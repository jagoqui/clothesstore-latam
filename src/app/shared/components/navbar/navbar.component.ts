import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() query: EventEmitter<String> = new EventEmitter<String>();

  onFilter(query: string) {
    this.query.emit(query);
  }
}
