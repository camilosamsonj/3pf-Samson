import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFontSize]',
})
export class FontSizeDirective {
  @Input()  tamano: string = '20px';

  constructor(public elementRef: ElementRef, public renderer: Renderer2 ) { 
  }

  ngOnInit() {
    this.cambiarTamanoFuente(this.tamano);
  }

  public cambiarTamanoFuente(tamano: string) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', tamano)
  }
}
