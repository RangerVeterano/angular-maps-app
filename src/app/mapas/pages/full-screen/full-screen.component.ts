import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [`
  #mapa{
    width:100%;
    height:100%;
  }
  `]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    console.log('Full Screen');

    const map = new mapboxgl.Map({
      container: 'mapa', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-0.5047720555716029, 38.381510624156654], // starting position [lng, lat]
      zoom: 16 // starting zoom
    });
  }

}
