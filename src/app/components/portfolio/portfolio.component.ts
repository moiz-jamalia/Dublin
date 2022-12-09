import {Component, Renderer2} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {

  constructor(private router : Router, private renderer : Renderer2, private sanitizer : DomSanitizer) {

  }

  turnLogo(nb : number) {
    this.renderer.setStyle(document.getElementById('logo-circle'), 'transform', 'rotate(' + nb * 360 + 'deg)')
  }

  onScrollTo(el : HTMLElement) {
    el.scrollIntoView({behavior : 'smooth'});
  }
}
