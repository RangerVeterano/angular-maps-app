import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { MapasRoutingModule } from './mapas-routing.module';
import { MarcadoresComponent } from './pages/marcadores/marcadores.component';
import { MiniMapaComponent } from './components/mini-mapa/mini-mapa.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';


@NgModule({
  declarations: [
    MiniMapaComponent,
    FullScreenComponent,
    MarcadoresComponent,
    ZoomRangeComponent,
    PropiedadesComponent
  ],
  imports: [
    CommonModule,
    MapasRoutingModule
  ]
})
export class MapasModule { }
