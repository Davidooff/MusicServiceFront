import { Component } from '@angular/core';
import { SearchInputComponent } from '../search-input/search-input.component';
import { UserDropMenuComponent } from '../user-drop-menu/user-drop-menu.component';

@Component({
  selector: 'app-header',
  imports: [SearchInputComponent, UserDropMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
