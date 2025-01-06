import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBold]',
})
export class BoldDirective {
  constructor(private e: ElementRef) {
    // this.e.nativeElement.style.fontStyle = 'bold';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.bold('bold');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.bold('');
  }

  private bold(fontWeight: string) {
    this.e.nativeElement.style.fontWeight = fontWeight;
  }
}
