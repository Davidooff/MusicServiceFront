import { Component } from '@angular/core';
import { SearchSvgComponent } from '../search-svg/search-svg.component';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [SearchSvgComponent],
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
}
