import { Injectable } from "@angular/core";
import { Pictures } from "./app/pictures.model";

@Injectable({
  providedIn : 'root'
})
export class PicturesService {
  private _pictures : Pictures[] = [
    new Pictures(
      'assets/Img/gallery/Sea_original.png',
      'assets/Img/gallery/Sea_edited.png',
      'Sea'
    ),
    new Pictures(
      'assets/Img/gallery/Sea_original.png',
      'assets/Img/gallery/Sea_edited.png',
      'Sea2'
    ),
    new Pictures(
      'assets/Img/gallery/Sea_original.png',
      'assets/Img/gallery/Sea_edited.png',
      'Sea2'
    )
  ];

  getPictures() {
    return [...this._pictures];
  }

  constructor() { }
}
