import { FontSizeDirective } from './font-size.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('FontSizeDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = {} as ElementRef;
    const rendererMock = {} as Renderer2;
    const directive = new FontSizeDirective(elementRefMock, rendererMock);
    expect(directive).toBeTruthy();
  });
});