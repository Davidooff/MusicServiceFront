import { Component, forwardRef, Input, signal, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-code-input',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeInputComponent),
      multi: true,
    },
  ],
  templateUrl: './code-input.component.html',
  styleUrl: './code-input.component.css',
})
export class CodeInputComponent implements ControlValueAccessor {
  value: string = '';

  isError = signal(false);
  isFull = signal(false);

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
    if (this.value.length === 1) {
      this.isFull.set(true);
      if (this.nextInputToFocus) this.nextInputToFocus.focus();
    } else {
      this.isFull.set(false);
    }
  }

  focus() {
    this.inputElement.nativeElement.focus();
  }

  @Input({ required: true }) set error(value: boolean) {
    this.isError.set(value);
  }

  @Input()
  nextInputToFocus?: CodeInputComponent;

  @ViewChild('input', { static: true }) inputElement!: any;
}
