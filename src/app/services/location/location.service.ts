import { Injectable } from '@angular/core';
import { LatLngLiteral } from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }
  getCurrentLocation(): Observable<LatLngLiteral> {
    return new Observable(observer => {
      if (!navigator.geolocation) {

        observer.error('Geolocation is not supported by your browser');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          observer.complete();  // Important to close the stream
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              observer.error('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              observer.error('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              observer.error('The request to get user location timed out.');
              break;
            default:
              observer.error('An unknown error occurred while retrieving location.');
          }
        },
        {
          enableHighAccuracy: true,   // Ask for the best GPS accuracy
          timeout: 10000,             // Timeout after 10 seconds
          maximumAge: 0               // Do not use cached location
        }
      );
    });

  }
}
