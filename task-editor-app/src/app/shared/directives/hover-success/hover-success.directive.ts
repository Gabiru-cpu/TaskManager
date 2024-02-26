import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverSuccess]',
  standalone: true
})
export class HoverSuccessDirective {

  constructor( private element: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter(){
    this.bg()
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.bg()
  }

  private bg() {
    if (this.element.nativeElement.classList.contains('text-success')){
      this.element.nativeElement.classList.remove('text-success')
    }else{
      this.element.nativeElement.classList.add('text-success')
    }
  }

}

