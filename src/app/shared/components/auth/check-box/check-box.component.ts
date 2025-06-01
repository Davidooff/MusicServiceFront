import {
  Component,
  Input,
  ViewChild,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-check-box',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './check-box.component.html',
  styleUrl: './check-box.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckBoxComponent),
      multi: true,
    },
  ],
})
export class CheckBoxComponent implements ControlValueAccessor {
  @ViewChild('Checkbox') checkbox!: HTMLInputElement;

  @Input() label: string = 'Test';
  @Input() id: string = 'checkbox';
  @Input() name: string = 'checkbox';
  @Input({ required: true }) formControlName!: string;

  checked = signal(false);
  disabled: boolean = false;

  // ControlValueAccessor implementation
  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(checked: boolean): void {
    this.checked.set(checked);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onCheckboxChange(): void {
    this.checked.update((prev) => !prev);
    this.onChange(this.checked);
    this.onTouched();
  }
}
