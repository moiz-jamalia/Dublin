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
      'By walking around in the center of the city I saw this work of Art painted on a demolished wall. The special thing about the painting was that the person is depicted with matches. ',
      'Man of Matches Original',
      'Man of Matches Edited'
    ),
    new Pictures(
      'assets/Img/gallery/wellington_tower_original.png',
      'assets/Img/gallery/wellington_tower_edited.png',
      'We went to the Phoenix park and went to the wellington tower. When we arrived at the tower, we looked for a shady spot and stayed there for a while.',
      'wellington tower Original',
      'wellington tower Edited'
    )
  ];

  getPictures() {
    return [...this._pictures];
  }
}
