import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFontSizeModify]'
})
export class FontSizeModifyDirective {
  @Input() tamano: string = '16px';

  constructor(public el: ElementRef, public renderer: Renderer2) {}

  ngOnInit() {
    this.cambiarTamanoFuente(this.tamano);
  }

  public cambiarTamanoFuente(tamano: string) {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', tamano);
  }
}


