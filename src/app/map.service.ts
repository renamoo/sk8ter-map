import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  getMarkerPositions(): Observable<{ data: MarkerPosition[] }> {
    return this.http.get<{ data: MarkerPosition[] }>(`${env.hostUrl}/markerPositions`);
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
