import { Component, OnInit } from '@angular/core';
import { EasingLogic } from 'ng2-page-scroll';
import { SolicitudService } from 'src/app/services/solicitud.service';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  requests = [];

  constructor(private solicitud: SolicitudService) { }

  ngOnInit(): void {
    this.solicitud.getSolicitudes().subscribe((requestsSnapshot)=>{
      this.requests = [];
      requestsSnapshot.forEach((requestData)=>{
        this.requests.push({
          nombre: requestData.payload.doc.data()['nombre'],
          fecha: requestData.payload.doc.data()['fecha'],
          direccion: requestData.payload.doc.data()['direccion'],
          producto: requestData.payload.doc.data()['producto'],
          estado: requestData.payload.doc.data()['estado'],
          id: requestData.payload.doc.id
        });
      });
    });
  }

  myEasing: EasingLogic = {
    ease: (t: number, b: number, c: number, d: number): number => {
        // easeInOutExpo easing
        if (t === 0) return b;
        if (t === d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  };

  updateStatus(id:any, type:string){
    if(type == 'Aceptar'){
      this.solicitud.updateStatustoAccept(id).then(() =>{
        Swal.fire({icon:'success', title:'La solicitud fue aceptada'});
      });
    } else{
      this.solicitud.updateStatustoDeny(id).then(() =>{
        Swal.fire({icon:'error', title:'La solicitud fue rechazada'});
      });
    }
  }

}
