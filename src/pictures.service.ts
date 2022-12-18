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
      'A view From the coast of a little Village called Howth. On that day me and some Friends went to Howth and enjoy the beautiful view from the hill.',
      'Sea Original',
      'Sea Edited'
    ),
    new Pictures(
      'assets/Img/gallery/Sea_original.png',
      'assets/Img/gallery/Sea_edited.png',
      'Sea2',
      'Sea Original',
      'Sea Edited'
    ),
    new Pictures(
      'assets/Img/gallery/Sea_original.png',
      'assets/Img/gallery/Sea_edited.png',
      'Sea3',
    'Sea Original',
    'Sea Edited'
    )
  ];

  getPictures() {
    return [...this._pictures];
  }

  constructor() { }
}
