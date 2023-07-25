import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, ElementRef, ViewChild, ContentChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnChanges, OnInit, DoCheck, AfterContentChecked {
  @Input('srvElement') element: { type: string, name: string, content: string };
  @Input() name: string;

  @ViewChild('title', { static: true }) title: ElementRef;
  @ContentChild('contentParagraph', { static: true }) paragraph: ElementRef;

  constructor() {
    console.log('constructor called!');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called!');
    console.log(changes);
  }

  ngOnInit() {
    console.log('ngOnInit called!');
    // Does not work. Components have not been initialized at this time.
    // console.log('Text content: ' + this.title.nativeElement.textContent);
  }

  ngDoCheck(): void {
    console.log('ngDoCheck called!');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called!');
    console.log('Text content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called!');
    console.log('Text content: ' + this.title.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called!');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called!');
  }
}
