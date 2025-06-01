import { Component, inject } from '@angular/core';
import { SearchSvgComponent } from '../search-svg/search-svg.component';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PlatformService } from '../../../core/services/platform.service';

@Component({
  selector: 'app-search-input',
  imports: [SearchSvgComponent, FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css',
})
export class SearchInputComponent implements ControlValueAccessor {
  value: string = '';

  // Placeholders for the callbacks
  private onChange = (_: any) => {};
  private onTouched = () => {};

  // ControlValueAccessor implementation
  writeValue(obj: any): void {
    this.value = obj || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(value: Event) {
    this.value = (value.target as HTMLInputElement).value;
    this.onChange(value);
  }

  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly platform = inject(PlatformService);

  search(event: Event) {
    event.preventDefault();
    if (!this.value) return;

    this.router.navigate([
      'platform',
      this.platform.curentPlatform,
      'search',
      this.value,
    ]);
  }
}
