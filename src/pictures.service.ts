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
      'A view from the coast of a little Village called Howth. On that day me and some Friends went to Howth and enjoy the beautiful view from the hill.',
      'Sea Original',
      'Sea Edited'
    ),
    new Pictures(
      'assets/Img/gallery/man_of_matches_original.png',
      'assets/Img/gallery/man_of_matches_edited.png',
      'A work of art depicting a man made of matches, painted on a demolished house wall.',
      'Man of Matches Original',
      'Man of Matches Edited'
    ),
    new Pictures(
      'assets/Img/gallery/wellington_tower_original.png',
      'assets/Img/gallery/wellington_tower_edited.png',
      'We went to the Phoenix park and chilled there near the tower',
      'wellington tower Original',
      'wellington tower Edited'
    )
  ];

  getPictures() {
    return [...this._pictures];
  }
}
