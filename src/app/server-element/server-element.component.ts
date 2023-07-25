import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnDestroy {
  @Input('srvElement') element: { type: string, name: string, content: string };
  @Input() name: string;

  // constructor() {
  //   console.log('constructor called!');
  // }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('ngOnChanges called!');
  //   console.log(changes);
  // }

  // ngOnInit() {
  //   console.log('ngOnInit called!');
  // }

  // ngDoCheck(): void {
  //   console.log('ngDoCheck called!');
  // }

  // ngAfterContentChecked(): void {
  //   console.log('ngAfterContentChecked called!');
  // }

  // ngAfterViewInit(): void {
  //   console.log('ngAfterViewInit called!');
  // }

  // ngAfterViewChecked(): void {
  //   console.log('ngAfterViewChecked called!');
  // }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called!');
  }
}
