import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighLightDirective {
  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.color = 'white';
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}
