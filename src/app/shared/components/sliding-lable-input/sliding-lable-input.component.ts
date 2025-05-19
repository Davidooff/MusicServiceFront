import { NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, forwardRef, HostListener, Input, NgZone, signal, ViewChild } from '@angular/core';
import { PassEyeComponent } from "../pass-eye/pass-eye.component";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sliding-lable-input',
  imports: [NgIf, NgStyle, PassEyeComponent, ReactiveFormsModule],
  templateUrl: './sliding-lable-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlidingLableInputComponent),
      multi: true
    }
  ],
  styleUrl: './sliding-lable-input.component.css'
})
export class SlidingLableInputComponent implements ControlValueAccessor {
  value: string = '';

  constructor(private ngZone: NgZone) {}
  
  // State signals
  vallidationError = signal<null | string>(null);
  isVisible = signal(false);
  isLabelOpen = signal(false);
  
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

  onInput(value: string) {
    this.value = value;
    this.onChange(value);
  }

  // Input properties
  @Input({required: true}) formControlName!: string;
  @Input() label: string = 'Test';
  @Input() type: string = 'text';
  @Input() id: string = '123';
  @Input() borderRadius: number = 5;
  @Input() scale: number = 4;
  @Input() textSize: number = 18;
  @Input() smallTextSize: number = 14;
  @Input() displayErrors: boolean = false;

  @Input() set error(value: string | null) {
    this.vallidationError.set(value);
  }

  // ViewChild references
  @ViewChild('Canvas') canvasEl!: ElementRef<HTMLCanvasElement>;
  @ViewChild('Wrapper') wrapperEl!: ElementRef<HTMLDivElement>;
  @ViewChild('Label') labelEl!: ElementRef<HTMLLabelElement>;

  // Canvas related properties
  ctx!: CanvasRenderingContext2D;
  labelCenterX!: number;
  labelSize!: number;
  endOfAnimPopSize: number = 0;
  labelPadding: number = 5;
  animationId: ReturnType<typeof setInterval> | null = null;

  // Lifecycle methods
  ngAfterViewInit(): void {
    this.initializeLabelMetrics();
    this.initializeCanvas();
  }

  // Event handlers
  @HostListener('window:resize')
  resizeCanvas() {
    const canvas = this.canvasEl.nativeElement;
    const wrapper = this.wrapperEl.nativeElement;

    const newWidth = wrapper.clientWidth * this.scale;
    const newHeight = wrapper.clientHeight * this.scale;
    if (canvas.width !== newWidth || canvas.height !== newHeight) {
      canvas.width = newWidth;
      canvas.height = newHeight;
      this.drawBorder();
    }
  }

  onFocus() {
    this.clearAnimation();
    this.isLabelOpen.set(true);
    this.popBorder(this.labelCenterX, this.labelSize / 2 + this.labelPadding);
  }

  onBlur() {
    this.onTouched();

    if (this.value !== '') return;
    
    this.clearAnimation();
    this.isLabelOpen.set(false);
    this.closeBorder(this.labelCenterX);
  }

  // UI state methods
  toggleVisibility = () => this.isVisible.update(prev => !prev);

  // Canvas initialization and drawing methods
  private initializeCanvas() {
    const canvas = this.canvasEl.nativeElement;
    const wrapper = this.wrapperEl.nativeElement;

    canvas.width = wrapper.clientWidth * this.scale;
    canvas.height = wrapper.clientHeight * this.scale;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get 2D context');
    
    this.ctx = ctx;

    if (this.value !== '') {
      this.isLabelOpen.set(true);
      this.endOfAnimPopSize = (this.labelSize / 2 + this.labelPadding) * this.scale;
    }

    this.drawBorder();
  }

  private initializeLabelMetrics() {
    this.labelSize = this.labelEl.nativeElement.offsetWidth * this.smallTextSize / this.textSize;
    this.labelCenterX = this.labelEl.nativeElement.offsetLeft + this.labelSize / 2;
  }

  drawBorder() {
    const canvas = this.canvasEl.nativeElement;
    const ctx = this.ctx;
    const bR = this.borderRadius * this.scale;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#ABABAB";
    ctx.lineWidth = 2 * this.scale;

    // Draw corner arcs and lines 
    ctx.arc(bR, bR, bR, Math.PI, Math.PI * 1.5);
    ctx.arc(canvas.width - bR, bR, bR, Math.PI * 1.5, Math.PI * 2);
    ctx.arc(canvas.width - bR, canvas.height - bR, bR, 0, Math.PI * 0.5);
    ctx.arc(bR, canvas.height - bR, bR, Math.PI * 0.5, Math.PI);
    this.drawLine(0, canvas.height - bR, 0, 0 + bR);    
    ctx.stroke();
    
    // Clear the gap for the label
    ctx.clearRect(
      this.labelCenterX * this.scale - this.endOfAnimPopSize,
      0,
      this.endOfAnimPopSize * 2,
      2 * this.scale
    );
  }

  private drawLine(x1: number, y1: number, x2: number, y2: number) {
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
  }

  // Animation methods
  private clearAnimation() {
    if (this.animationId) {
      clearInterval(this.animationId);
      this.animationId = null;
    }
  }

  popBorder(centerX: number, halfLength: number) {
    centerX = centerX * this.scale;
    halfLength = halfLength * this.scale;
    
    let currentHalfGap = this.endOfAnimPopSize;
    this.ngZone.runOutsideAngular(() => {
      this.animationId = setInterval(() => {
        currentHalfGap += 3;
        if (currentHalfGap >= halfLength) {
          this.clearAnimation();
          return;
        }

        this.endOfAnimPopSize = currentHalfGap;
        this.drawBorder();
      }, 15);
    });
  }

  closeBorder(centerX: number) {
    centerX = centerX * this.scale;
    let halfLength = this.endOfAnimPopSize;

    this.ngZone.runOutsideAngular(() => {
      this.animationId = setInterval(() => {
        halfLength -= 3;
        if (halfLength < 0) {
          this.clearAnimation();
          this.endOfAnimPopSize = 0;
          this.drawBorder();
          return;
        }
        
        this.endOfAnimPopSize = halfLength;
        this.drawBorder();
      }, 15);
    });
  }
}

