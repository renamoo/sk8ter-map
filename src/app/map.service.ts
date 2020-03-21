import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from './../environments/environment';

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

  constructor(private http: HttpClient) { }

  // TODO: set range for marker
  // test data {"data":[{"id":1,"position":{"lat":35.65809630288114,"lng":139.74755961751293}},{"id":2,"position":{"lat":35.6956851121099,"lng":139.476334641927}}]}
  getMarkerPositions(): Observable<MarkerPosition[]> {
    return this.http.get<{ data: { id: string, lat: number, lng: number }[] }>(`${env.hostUrl}/markerPositions`).pipe(map(response => {
      return response.data.map(res => {
        return {
          ...res,
          position: { lat: res.lat, lng: res.lng }
        };
      });
    }));
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
