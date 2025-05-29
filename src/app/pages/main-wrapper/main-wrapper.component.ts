import { Component } from '@angular/core';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-wrapper',
  imports: [SideBarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './main-wrapper.component.html',
  styleUrl: './main-wrapper.component.css',
})
export class MainWrapperComponent {}
