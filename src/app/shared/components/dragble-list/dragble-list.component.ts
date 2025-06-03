import {
  Component,
  computed,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  signal,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { SongItemComponent } from '../song-item/song-item.component';
import { TrackData } from '../../../core/models/TrackData';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dragble-list',
  imports: [SongItemComponent, CommonModule],
  templateUrl: './dragble-list.component.html',
  styleUrl: './dragble-list.component.css',
})
export class DragbleListComponent implements OnChanges, OnDestroy {
  @Input({ required: true }) list!: TrackData[];
  @ViewChild('DragListWrapper') wrapper!: any;

  @Output() skipTo = new EventEmitter<number>();
  @Output() move = new EventEmitter<[number, number]>();

  dragState = signal<{ poss: { x: number; y: number }; index: number } | null>(
    null
  );
  wrapperO0 = { x: 0, y: 0, width: 0, height: 0 };
  grabOfset = { x: 0, y: 0 };
  isDragStarted = false;

  pointingOnIndex = computed<[number, 'top' | 'btm']>(() => {
    if (!this.dragState()) return [-1, 'top'];

    const result = {
      x: this.dragState()!.poss.x - this.wrapperO0.x,
      y: this.dragState()!.poss.y - this.wrapperO0.y,
    };

    if (
      result.x < 0 ||
      result.x > this.wrapperO0.width ||
      result.y > this.wrapperO0.height ||
      result.y < 0
    )
      return [-1, 'top'];

    let pointOn = result.y / (this.wrapperO0.height / this.list.length);

    let index = Math.floor(pointOn);

    if (index == this.dragState()!.index)
      if (index == Math.round(pointOn)) {
        return [index - 1, 'btm'];
      } else {
        return [index + 1, 'top'];
      }

    return [index, index == Math.round(pointOn) ? 'top' : 'btm'];
  });

  dragDisplayPossition = computed(() => {
    if (this.dragState() == null) return null;
    const result = {
      x: this.dragState()!.poss.x - this.wrapperO0.x - this.grabOfset.x,
      y: this.dragState()!.poss.y - this.wrapperO0.y - this.grabOfset.y,
    };

    return { result, index: this.dragState()!.index };
  });

  handleMouseMove = (event: MouseEvent) => {
    // check is there distance?
    if (!this.isDragStarted) {
      const { x, y } = this.dragState()!.poss;
      const distance = Math.sqrt(x * x + y * y);

      if (distance < 20) return;
    }

    this.isDragStarted = true;
    this.dragState.update((el) => {
      el!.poss = { x: event.clientX, y: event.clientY };

      return el ? { ...el } : null;
    });
  };

  handleResize() {
    this.wrapperO0 = this.wrapper.nativeElement.getBoundingClientRect();
  }

  onDragStart(event: MouseEvent, index: number) {
    this.grabOfset = { x: event.layerX, y: event.layerY };

    this.wrapperO0 = this.wrapper.nativeElement.getBoundingClientRect();
    this.dragState.set({ poss: { x: event.clientX, y: event.clientY }, index });
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('resize', this.handleResize);
  }

  onDragEnd(event: MouseEvent) {
    if (!this.isDragStarted) {
      this.onClick(
        this.pointingOnIndex()[1] == 'top'
          ? this.dragState()!.index
          : this.dragState()!.index + 1
      );
    } else {
      const moveTo = this.pointingOnIndex();

      if (this.dragState())
        this.move.emit([
          this.dragState()!.index,
          moveTo[1] == 'top' ? moveTo[0] : moveTo[0] + 1,
        ]);
    }

    this.dragState.set(null);
    this.cleanUp();
  }

  onClick(index: number) {
    this.skipTo.emit(index);
  }

  ngOnDestroy(): void {
    this.cleanUp();
  }

  ngOnChanges(): void {
    this.cleanUp();
  }

  cleanUp(): void {
    this.isDragStarted = false;
    this.dragState.set(null);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('resize', this.handleResize);
  }
}
