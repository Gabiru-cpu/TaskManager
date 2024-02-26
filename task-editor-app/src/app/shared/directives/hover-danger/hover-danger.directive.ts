import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverDanger]',
  standalone: true
})
export class HoverDangerDirective {

  constructor( private element: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter(){
    this.bg()
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.bg()
  }

  private bg() {
    if (this.element.nativeElement.classList.contains('text-danger')){
      this.element.nativeElement.classList.remove('text-danger')
    }else{
      this.element.nativeElement.classList.add('text-danger')
    }
  }

}

