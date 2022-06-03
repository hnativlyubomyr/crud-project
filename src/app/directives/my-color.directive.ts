import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appMyColor]'
})
export class MyColorDirective {
  @Input() appMyColor!: string;
  @HostBinding('style.color') styleColor: string;

  @HostListener('click',['$event']) changeColor(event: Event) {
    console.log(event);
    this.styleColor = this.styleColor === 'red' ? this.appMyColor : 'red';
  }

  constructor() {
    this.styleColor = 'red';
  }

}
