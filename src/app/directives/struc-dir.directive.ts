import {Directive, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appStrucDir]'
})
export class StrucDirDirective implements OnInit{

  constructor(private template: TemplateRef<any>, private view: ViewContainerRef) {
  }

  ngOnInit() {
    setTimeout(()=> {
      this.view.createEmbeddedView(this.template);
    }, 1000);
  }

}
