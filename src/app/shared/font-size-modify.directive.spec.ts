import { FontSizeModifyDirective } from './font-size-modify.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('FontSizeModifyDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = {} as ElementRef;
    const rendererMock = {} as Renderer2;
    const directive = new FontSizeModifyDirective(elementRefMock, rendererMock);
    expect(directive).toBeTruthy();
  });
});
