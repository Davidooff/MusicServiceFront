import { Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-default-input',
  imports: [],
  templateUrl: './default-input.component.html',
  styleUrl: './default-input.component.css',
})
export class DefaultInputComponent implements ControlValueAccessor {
  @Input({ required: true }) title!: string;
  value: string = '';

  // Placeholders for the callbacks
  onChange = (_: any) => {};
  onTouched = () => {};

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
