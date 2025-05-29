import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformService } from '../../core/services/platform.service';

@Component({
  selector: 'app-library',
  imports: [],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
})
export class LibraryComponent {
  private readonly router = inject(Router);
  private readonly platform = inject(PlatformService);
}
