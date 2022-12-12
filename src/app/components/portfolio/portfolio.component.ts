import {Component, ElementRef, HostListener, Renderer2, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {PicturesService} from "../../../pictures.service";
import {Pictures} from "../../pictures.model";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {

  @ViewChild('Home') home : ElementRef | any;
  @ViewChild('Gallery_view') gallery : ElementRef | any;
  @ViewChild('Video') video : ElementRef | any;
  videoURL = 'https://www.youtube.com/embed/xm3YgoEiEDc';
  safeURL: SafeResourceUrl;
  isShownOriginalPic = false;
  isShownDescription = false;
  itemFocus = 0;
 pictures : Pictures[];

  constructor(private router: Router, private renderer: Renderer2, private sanitizer: DomSanitizer, private picService : PicturesService) {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
    this.pictures = this.picService.getPictures();
  }

  turnLogo(nb: number) {
    this.renderer.setStyle(document.getElementById('logo-circle'), 'transform', 'rotate(' + nb * 360 + 'deg)')
  }
/*
  @HostListener('window:scroll', ['$event'])
  onScroll(event : any) : void {
    // @ts-ignore
    const parent : HTMLElement = document.getElementById('gallery');
    const galleryOffSet = Math.round(window.pageYOffset - (this.gallery.nativeElement.offsetHeight / 4 - (0.11 * this.gallery.nativeElement.offsetHeight / 5)));

    if (galleryOffSet >= 0 && galleryOffSet <= 24000) {
      this.hightlight('gallery-link', 'home-link', 'video-link')
      this.itemFocus = this.checkWhichGalleryItem(galleryOffSet);
      for (let i = 0; i < parent.children.length; i++) {
        this.renderer.setStyle(parent.children[i], 'position', 'fixed');
        this.renderer.setStyle(parent.children[i], 'top', '11vh');
        this.renderer.setStyle(parent.children[i], 'height', '89vh');
        this.renderer.setStyle(parent.children[i], 'left', ((i * 100) - (Math.round(galleryOffSet / 6))) + '%');
      }
    } else if (galleryOffSet > 2400) {
      this.hightlight('video-link', 'home-link', 'gallery-link');
      this.renderer.setStyle(parent.children[parent.children.length - 1], 'left', '0');
    } else {
      this.hightlight('home-link', 'gallery-link', 'video-link');
      for (let i = 0; i < parent.children.length; i++) {
        this.renderer.setStyle(document.getElementById('landing'), 'visibility', 'visible');
        this.renderer.setStyle(parent.children[i], 'position', 'relative');
        this.renderer.removeStyle(parent.children[i], 'top');
        this.renderer.removeStyle(parent.children[i], 'left');
        this.renderer.setStyle(parent.children[i], 'height', '90vh');
      }
    }
  }

  unedited(showOriginal : boolean) {
    if (this.itemFocus <= 0) return
    this.isShownOriginalPic = !showOriginal
    // @ts-ignore
    let elements = document.getElementById('gallery-item-'+this.giInFocus).querySelectorAll('.original')
    for (let i = 0; i < elements.length; i++) {
      if(!this.isShownOriginalPic) {
        this.renderer.setStyle(elements[i], 'opacity', '1');
      }
      else {
        this.renderer.removeStyle(elements[i], 'opacity');
      }
    }
    this.isShownOriginalPic = !this.isShownOriginalPic;
  }

  description(showReflection : boolean) {
    if (this.itemFocus <= 0) return
    this.isShownDescription = !showReflection
    // @ts-ignore
    let descriptions = document.getElementById('gallery-item-'+this.giInFocus).querySelectorAll('.gallery-content-main-reflection')
    // @ts-ignore
    let images = document.getElementById('gallery-item-'+this.giInFocus).querySelectorAll('.edited')
    for (let i = 0; i < descriptions.length; i++) {
      if(!this.isShownDescription) {
        this.renderer.setStyle(descriptions[i], 'opacity', '1');
        this.renderer.setStyle(images[i], 'opacity', '0.3');
      }
      else {
        this.renderer.removeStyle(descriptions[i], 'opacity');
        this.renderer.removeStyle(images[i], 'opacity');
      }
    }
    this.isShownDescription = !this.isShownDescription;
  }

  checkWhichGalleryItem(galleryOffset: number) : number {
    switch (true) {
      case galleryOffset >= -20 && galleryOffset <= 20: {
        return 1;
      }
      case galleryOffset >= 580 && galleryOffset <= 620: {
        return 2;
      }
      case galleryOffset >= 1180 && galleryOffset <= 1220: {
        return 3;
      }
      case galleryOffset >= 1780 && galleryOffset <= 1820: {
        return 4;
      }
      case galleryOffset >= 2380 && galleryOffset <= 2420: {
        return 5;
      }
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
  hightlight(active : string, inactive : string, inactive2 : string) {
    //@ts-ignore
    document.getElementById(active).classList.add('active');
    //@ts-ignore
    document.getElementById(inactive).classList.remove('active');
    //@ts-ignore
    document.getElementById(inactive2).classList.remove('active');
  }

 */

  onScrollTo(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }
}
