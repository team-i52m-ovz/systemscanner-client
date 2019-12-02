import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  @Input() set isLoaderShown(value: boolean) {
    this.isShown = value;
  }

  public isShown: boolean;

}
