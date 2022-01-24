import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
    .mapa-container{
      width:100%;
      height:100%;
    }
    .row {
      background-color:white;
      position:fixed;
      bottom:50px;
      left:50px;
      padding:10px;
      border-radius: 5px;
      z-index: 999;
      width:400px;
    }
  `]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  //Nos permite ver un elemento del html
  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;
  zoomLevel: number = 14;
  center: [number, number] = [-0.5047720555716029, 38.381510624156654];

  constructor() { }

  //Cuando el elemento de destruya tenemos que quitar todos los eventos escucha
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => { }) //destruimos el escucha del zoom
    this.mapa.off('zoomend', () => { }) //destruimos el escucha del zoom maximo
    this.mapa.off('move', () => { }) //destruimos el escucha de la obtencion de las coordenadas centrales
  }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel // starting zoom
    });

    //Creaciones de listeners

    //actualizamos el valor del zoom
    this.mapa.on('zoom', (ev) => {
      const zoomActual = this.mapa.getZoom();
      this.zoomLevel = zoomActual;
    });

    //restringimos el uso del zoom a solo 18 como mucho
    this.mapa.on('zoomend', (ev) => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18)
      }
    });

    //movimiento del mapa
    this.mapa.on('move', (ev) => {
      const target = ev.target; //recogemos las coordenas centrales
      //Desestructuramos la constante del centro
      const { lng, lat } = target.getCenter();
      //Guardamos la desestructuracion como las nuevas coordenadas que se vana mostrar
      this.center = [lng, lat]
    });

  }

  zoomOut() {
    this.mapa.zoomOut()

  }

  zoomIn() {
    this.mapa.zoomIn()
  }

  zoomCambio(valor: String) {
    this.mapa.zoomTo(Number(valor))
  }

}
