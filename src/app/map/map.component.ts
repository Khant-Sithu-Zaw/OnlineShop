import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { icon, LatLng, latLng, latLngBounds, LatLngExpression, LatLngTuple, LeafletMouseEvent, map, Map, Marker, marker, tileLayer } from 'leaflet';
import { LocationService } from '../services/location/location.service';
import { Order } from '../shared/models/order';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input()
  currentOrder!: Order;

  private southWest = [-85, -180];
  private northEast = [85, 180];
  private bounds = latLngBounds(this.southWest as LatLngTuple, this.northEast as LatLngTuple);
  // static: true	The reference is available in ngOnInit()
  // static: false	The reference is available only in ngAfterViewInit()(most common use)
  @ViewChild('map', { static: false })
  mapRef!: ElementRef;

  @Output() locationNameChanged = new EventEmitter<string>();
  map!: Map;
  marker!: Marker;

  // Default coordinates for Bangkok, Thailand
  private DEFAULT_LATLNG: LatLng = latLng(21.842752, 42.1314816);
  private readonly MARKER_ZOOM_LEVEL = 18;
  private readonly MARKER_ICON = icon(
    {
      iconUrl: 'assets/icons/Marker.png',
      iconSize: [32, 35],
      iconAnchor: [21, 41],

    }
  )
  constructor(private locationService: LocationService, private http: HttpClient) { }
  ngAfterViewInit(): void {

    this.initilizeMap();
    this.findLocation();
  }
  ngOnInit(): void {

  }
  getLocationName(lat: number, lng: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const displayName = data.display_name || 'Unknown location';
        this.locationNameChanged.emit(displayName);
      })
      .catch(err => console.error('Reverse geocoding error:', err));
  }
  initilizeMap() {

    //set up map to div#map
    if (!this.map) {
      this.map = map((this.mapRef.nativeElement), {
        center: this.DEFAULT_LATLNG,
        attributionControl: false,
        maxBounds: this.bounds,
        maxBoundsViscosity: 1.0,
        // Makes it "stick" to bounds
      }).setView(this.DEFAULT_LATLNG, this.MARKER_ZOOM_LEVEL);

      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);
      setTimeout(() => {
        this.map.invalidateSize();
      }, 0);
      this.map.on('click', (e: LeafletMouseEvent) => {
        console.log('Map clicked at:', e.latlng);

        if (this.marker) {
          this.map.removeLayer(this.marker);
        }
        this.marker = marker(e.latlng, {
          icon: this.MARKER_ICON,
          draggable: true
        }).addTo(this.map);
        this.getLocationName(e.latlng.lat, e.latlng.lng);
        this.marker.on('dragend', (event: any) => {
          const newLatLng = event.target.getLatLng();
          console.log('Marker dragged to:', newLatLng);
          this.getLocationName(newLatLng.lat, newLatLng.lng);
        });
      });
    }
  }

  findLocation() {
    this.locationService.getCurrentLocation().subscribe({
      next: (location) => {
        console.log(location);
        const currentLatLng = latLng(location.lat, location.lng);
        this.getLocationName(location.lat, location.lng);
        this.map.setView(currentLatLng, this.MARKER_ZOOM_LEVEL);
        if (this.marker) {
          this.map.removeLayer(this.marker);
        }
        this.marker = marker(currentLatLng, {
          icon: this.MARKER_ICON,
          draggable: true
        }).addTo(this.map);
      }
    });
  }

}