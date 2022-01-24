import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
  .mapa-container{
    width:100%;
    height:100%;
  }

  .list-group {
    position:fixed;
    top:20px;
    right:20px;
    z-index: 99;
  }

  li {
    cursor:pointer
  }
`]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-0.5047720555716029, 38.381510624156654];

  //variable para guardar los marcadores
  marcadores: MarcadorColor[] = []

  constructor() { }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel // starting zoom
    });

    this.leerLocalStorage()

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo';


    // new mapboxgl.Marker(
    //   {
    //     element: markerHtml
    //   }
    // )
    //   .setLngLat(this.center)
    //   .addTo(this.mapa);
  }

  //metodo para añadir marcadores a nuestro mapa
  anadirMarcador() {

    //Este color devuelve un color hexadecimal aleatorio
    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));

    //Creamos nuestro marcador
    //Le ponemos en que posicion queremos que salga
    //Lo añadimos a nuestro mapa
    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat(this.center)
      .addTo(this.mapa)

    //Guardamos el marcador dentro de nuestra variable
    this.marcadores.push({
      color,
      marker: nuevoMarcador
    })

    //Guardamos el array dentro del local storage
    this.guardarMarcadoresLocalStorage()

    //indicamos que cuando se mueva el marcador se guarde en el local storage
    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage()
    })
  }

  irMarcador(marcador: mapboxgl.Marker) {
    this.mapa.flyTo({
      center: marcador.getLngLat()
    })
  }

  guardarMarcadoresLocalStorage() {

    //array temporal
    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach(m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [lng, lat]
      })
    });

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  leerLocalStorage() {

    //En el caso de que no hayan marcadores se sale de la funcion
    if (!localStorage.getItem('marcadores')) {
      return
    }

    //En este punto siempre tenemos el valor de marcadores porque previamente hemos comprobado que existe
    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!)

    lngLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat(m.centro!) //Llegados a este punto siempre existe
        .addTo(this.mapa);

      //rellenamos los marcadores que estaban previamente puestos
      this.marcadores.push({
        marker: newMarker,
        color: m.color
      });

      //Este listener se encarga de que cuando se mueva el markador se guarde en el local storage
      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage()
      })
    })
  }

  borrarMarcador(i: number) {
    this.marcadores[i].marker?.remove()
    this.marcadores.splice(i,1)
    this.guardarMarcadoresLocalStorage()
  }

}
