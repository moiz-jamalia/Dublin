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
  videoURL = 'https://www.youtube.com/embed/3NaPhxiy8lY';
  safeURL: SafeResourceUrl;
  isShownOriginalPic = false;
  isShownDescription = false;
  itemFocus: number = 0;
  pictures: Pictures[];

  constructor(private router: Router, private renderer: Renderer2, private sanitizer: DomSanitizer, private picService: PicturesService) {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
    this.pictures = this.picService.getPictures();
  }

  ngOnInit(): void {
    this.turnLogo(1, 'title-logo');
    this.calculate_age();
  }

  calculate_age(): number {
    const birthday = new Date('11/21/2002').getTime();
    // @ts-ignore
    let timeDiff = new Date() - birthday;
    return Math.floor(((timeDiff / (1000 * 3600 * 24)) / 365.25));
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    // @ts-ignore
    const parent: HTMLElement = document.getElementById('gallery');
    const Offset: number = Math.round((window.scrollY - parent.offsetTop) - (this.gallery.nativeElement.offsetHeight / 3 - (0.11 * this.gallery.nativeElement.offsetHeight / 4)));
    console.log("Offset: " + Offset);
    if (Offset >= -65 && Offset <= 2000) {
      this.highlight('anchor-Gallery', 'anchor-Home', 'anchor-Video');
      this.itemFocus = this.checkWhichGalleryItem(Offset);
      for (let i = 0; i < parent.children.length; i++) {
        this.renderer.setStyle(parent.children[i], 'position', 'fixed');
        this.renderer.setStyle(parent.children[i], 'top', '8vh');
        this.renderer.setStyle(parent.children[i], 'height', '85vh');
        if (Offset <= -30) this.renderer.setStyle(parent.children[0], 'left', 0);
        else this.renderer.setStyle(parent.children[i], 'left', (i * 100) - (Math.round(Offset / 10)) + '%');
      }
    } else if (Offset > 2000) {
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
      case galleryOffset >= -65 && galleryOffset <= 490:
        return 1;
      case galleryOffset >= 500 && galleryOffset <= 1880:
        return 2;
      case galleryOffset >= 1900 && galleryOffset <= 2000:
        return 3;
    }
    this.resetOptions();
    return 0;
  }

  resetOptions() {
    let descriptions = document.querySelectorAll('.gallery-content-main-description');
    let originals = document.querySelectorAll('.original');
    let edits = document.querySelectorAll('.edited');
    for (let i = 0; i < descriptions.length; i++) {
      this.renderer.removeStyle(descriptions[i], 'opacity');
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

  turnLogo(nb: number, id: string) {
    this.renderer.setStyle(document.getElementById(id), 'transform', 'rotate(' + nb * 360 + 'deg)');
  }

  unedited(showOriginal: boolean) {
    if (this.itemFocus <= 0) return;
    this.isShownOriginalPic = !showOriginal
    // @ts-ignore
    let imageOriginal = document.getElementById('gallery-item-' + this.itemFocus).querySelectorAll('.original');
    // @ts-ignore
    let imageEdited = document.getElementById('gallery-item-' + this.itemFocus).querySelectorAll('.edited');
    // @ts-ignore
    let description = document.getElementById('gallery-item-' + this.itemFocus).querySelectorAll('.gallery-content-main-description');

    for (let i = 0; i < imageOriginal.length; i++) {
      if (!this.isShownOriginalPic) {
        this.renderer.setStyle(imageOriginal[i], 'opacity', '1');
        this.renderer.setStyle(imageEdited[i], 'opacity', '0');
        this.renderer.setStyle(description[i], 'opacity', '0');
      } else {
        this.renderer.removeStyle(imageOriginal[i], 'opacity');
        this.renderer.removeStyle(imageEdited[i], 'opacity');
        this.renderer.removeStyle(description[i], 'opacity');
      }
    }
    this.isShownOriginalPic = !this.isShownOriginalPic;
  }

  description(showReflection: boolean) {
    if (this.itemFocus <= 0) return;
    this.isShownDescription = !showReflection;
    // @ts-ignore
    let description = document.getElementById('gallery-item-' + this.itemFocus).querySelectorAll('.gallery-content-main-description');
    // @ts-ignore
    let image = document.getElementById('gallery-item-' + this.itemFocus).querySelectorAll('.edited');

    for (let i = 0; i < description.length; i++) {
      if (!this.isShownDescription) {
        this.renderer.setStyle(description[i], 'opacity', '1');
        this.renderer.setStyle(image[i], 'opacity', '0.3');
      } else {
        this.renderer.removeStyle(description[i], 'opacity');
        this.renderer.removeStyle(image[i], 'opacity');
      }
    }
    this.isShownDescription = !this.isShownDescription;
  }

  onScrollTo(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }
}
