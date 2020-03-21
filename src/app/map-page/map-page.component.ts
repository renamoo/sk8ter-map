import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { first } from 'rxjs/operators';
import { MapService, MarkerPosition, PlaceReview } from './../map.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  @ViewChild('toBeAdded', { static: false }) toBeAdded: MapMarker;
  // init setting
  center = { lat: 35.65809630288114, lng: 139.74755961751293 }; // Around Tokyo
  zoom = 10;
  markerOptions = { draggable: false };
  // dynamic variables
  markerPositions: MarkerPosition[] = [];
  display?: google.maps.LatLngLiteral;
  reviews: PlaceReview[];
  activeMarkerId: string;
  toBeAddedPosition: google.maps.LatLngLiteral;
  toBeAddedComment: FormControl = new FormControl();

  constructor(private service: MapService) { }

  ngOnInit(): void {
    this.service.getMarkerPositions().pipe(first()).subscribe(pos => {
      this.markerPositions = pos;
    });
  }

  openInfoWindow(markerPo: MarkerPosition, marker: MapMarker) {
    this.service.getReviews(markerPo.id).subscribe(reviews => {
      this.reviews = reviews;
      this.infoWindow.open(marker);
    });
  }

  addReview() {
    // No Marker Data without review
    const markerId = this.reviews[0].markerId;
  }

  promoteAddReview() {
    this.reviews = null;
    this.infoWindow.open(this.toBeAdded);
  }

  addMarker(event: google.maps.MouseEvent) {
    this.toBeAddedPosition = event.latLng.toJSON();
    this.promoteAddReview();
  }

  registerNewMarker() {
    if (!this.toBeAddedPosition || !this.toBeAddedComment.value) {
      console.error('No marker is selected or No review comment is added');
    } else {
      this.service.addNewMarker(this.toBeAddedPosition, this.toBeAddedComment.value)
        .pipe(first()).subscribe(() => {
          location.reload();
        });
    }
  }

  move(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
  }

  removeLastMarker() {
    this.markerPositions.pop();
  }

}
