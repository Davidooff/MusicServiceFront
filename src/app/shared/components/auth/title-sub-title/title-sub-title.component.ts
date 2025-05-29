import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-sub-title',
  imports: [],
  templateUrl: './title-sub-title.component.html',
  styleUrl: './title-sub-title.component.css'
})
export class TitleSubTitleComponent {
  @Input() title: string = '';
  @Input() subTitle: string = '';
}
