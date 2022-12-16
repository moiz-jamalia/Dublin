import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {PicturesService} from "../../../pictures.service";
import {Pictures} from "../../pictures.model";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  @ViewChild('Home') home: ElementRef | any;
  @ViewChild('Gallery_view') gallery: ElementRef | any;
  @ViewChild('Video') video: ElementRef | any;
  videoURL = 'https://www.youtube.com/embed/xm3YgoEiEDc';
  safeURL: SafeResourceUrl;
  isShownOriginalPic = false;
  isShownDescription = false;
  itemFocus: number = 0;
  pictures: Pictures[];

  constructor(private router: Router, private renderer: Renderer2, private sanitizer: DomSanitizer, private picService: PicturesService) {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
    this.pictures = this.picService.getPictures();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    // @ts-ignore
    const parent: HTMLElement = document.getElementById('gallery');
    const Offset: number = Math.round((window.scrollY - parent.offsetTop)  - (this.gallery.nativeElement.offsetHeight / 3 - (0.1 * this.gallery.nativeElement.offsetHeight / 4)));
    //console.log('height: ' + parent.offsetTop)
    console.log('Offset: ' + Offset);

    if (Offset >= 0 && Offset <= 2000) {
      this.highlight('anchor-Gallery', 'anchor-Home', 'anchor-Video');
      this.itemFocus = this.checkWhichGalleryItem(Offset);
      console.log(this.itemFocus);
      for (let i = 0; i < parent.children.length; i++) {
        this.renderer.setStyle(parent.children[i], 'position', 'fixed');
        this.renderer.setStyle(parent.children[i], 'top', '10vh');
        this.renderer.setStyle(parent.children[i], 'height', '57vh');
        this.renderer.setStyle(parent.children[i], 'left', (i * 100) - (Math.round(Offset / 10.25)) + '%');
      }
    } else if (Offset > 1900) {
      this.highlight('anchor-Video', 'anchor-Home', 'anchor-Gallery');
      this.renderer.setStyle(parent.children[parent.children.length - 1], 'left', 0);
      this.renderer.setStyle(parent.children[parent.children.length - 1], 'width', '100%');
    } else {
      this.highlight('anchor-Home', 'anchor-Gallery', 'anchor-Video');
      for (let i = 0; i < parent.children.length; i++) {
        this.renderer.setStyle(document.getElementById('Home'), 'visibility', 'visible');
        this.renderer.setStyle(parent.children[i], 'position', 'relative');
        this.renderer.removeStyle(parent.children[i], 'top');
        this.renderer.removeStyle(parent.children[i], 'left');
        this.renderer.setStyle(parent.children[i], 'height', '90vh');
        this.renderer.setStyle(parent.children[i], 'width', '100%');
      }
    }
  }

  checkWhichGalleryItem(galleryOffset: number): number {
    switch (true) {
      case galleryOffset >= 0 && galleryOffset <= 490: return 1;
      case galleryOffset >= 500 && galleryOffset <= 1080: return 2;
      case galleryOffset >= 1180 && galleryOffset <= 2420: return 3;
    }
    this.resetOptions();
    return 0;
  }

  resetOptions() {
    let reflections = document.querySelectorAll('.gallery-content-main-description');
    let originals = document.querySelectorAll('.original');
    let edits = document.querySelectorAll('.edited');
    for (let i = 0; i < reflections.length; i++) {
      this.renderer.removeStyle(reflections[i], 'opacity');
      this.renderer.removeStyle(originals[i], 'opacity');
      this.renderer.removeStyle(edits[i], 'opacity');
    }
    this.isShownDescription = false;
    this.isShownOriginalPic = false;
  }

  highlight(active: string, inactive: string, inactive1: string) {
    // @ts-ignore
    document.getElementById(active).classList.add('active')
    // @ts-ignore
    document.getElementById(inactive).classList.remove('active')
    // @ts-ignore
    document.getElementById(inactive1).classList.remove('active')
  }

  ngOnInit(): void {
    this.turnLogo(1, 'title-logo');
  }

  turnLogo(nb: number, id: string) {
    this.renderer.setStyle(document.getElementById(id), 'transform', 'rotate(' + nb * 360 + 'deg)');
  }

  unedited(showOriginal: boolean) {
    this.isShownOriginalPic = !showOriginal
    // @ts-ignore
    let elements = document.getElementById('gallery-item-' + this.itemFocus).querySelectorAll('.original');
    // @ts-ignore
    let descriptions = document.getElementById('gallery-item-' + this.itemFocus).querySelectorAll('.gallery-content-main-description');

    for (let i = 0; i < elements.length; i++) {
      if (!this.isShownOriginalPic) {
        this.renderer.setStyle(elements[i], 'opacity', '1');
        this.renderer.setStyle(descriptions[i], 'opacity', '0');
      } else {
        this.renderer.removeStyle(elements[i], 'opacity');
        this.renderer.removeStyle(descriptions[i], 'opacity');
      }
    }
    this.isShownOriginalPic = !this.isShownOriginalPic;
    console.log('unedited');
  }

  description(showReflection: boolean) {
    this.isShownDescription = showReflection;
    // @ts-ignore
    let descriptions = document.getElementById('gallery-item-' + this.itemFocus).querySelectorAll('.gallery-content-main-description');
    // @ts-ignore
    let images = document.getElementById('gallery-item-' + this.itemFocus).querySelectorAll('.edited');
    for (let i = 0; i < descriptions.length; i++) {
      if (!this.isShownDescription) {
        this.renderer.setStyle(descriptions[i], 'opacity', '1');
        this.renderer.setStyle(images[i], 'opacity', '0.3');
      } else {
        this.renderer.removeStyle(descriptions[i], 'opacity');
        this.renderer.removeStyle(images[i], 'opacity');
      }
    }
    this.isShownDescription = !this.isShownDescription;
    console.log('description');
  }

  onScrollTo(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }
}
