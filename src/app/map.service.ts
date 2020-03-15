import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface MarkerPosition {
  id: string;
  position: google.maps.LatLngLiteral;
}

export interface PlaceReview {
  id: string;
  markerId: string;
  comment: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  getMarkerPositions(): Observable<MarkerPosition[]> {
    return of([{
      id: '1',
      position: { lat: 35.65809630288114, lng: 139.74755961751293 }
    },
    {
      id: '2',
      position: { lat: 35.6956851121099, lng: 139.476334641927 }
    }]);
  }

  getReviews(id: string): Observable<PlaceReview[]> {
    return of([
      {
        id: '1',
        markerId: '1',
        comment: '東京タワーが近いところです！'
      }
    ]);
  }

  addNewMarker(position: google.maps.LatLngLiteral, comment: string) {
    return of();
  }

}
