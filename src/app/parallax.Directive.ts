import {Directive, ElementRef, HostListener, Input} from "@angular/core";

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {

  @Input('ratio') parallaxRatio: number = 1;
  initialTop: number = 0;

  constructor(private el: ElementRef) {
    this.initialTop = this.el.nativeElement.getBoundingClientRect().top;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.el.nativeElement.style.top = (this.initialTop - (window.scrollY * this.parallaxRatio)) + 'px';
  }
}
