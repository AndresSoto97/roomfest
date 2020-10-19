import { Component, OnInit } from '@angular/core';
import { Details } from './more_details';

@Component({
  selector: 'app-moreinfo',
  templateUrl: './moreinfo.component.html',
  styleUrls: ['./moreinfo.component.css']
})
export class MoreinfoComponent implements OnInit {

  constructor() { }

  details = [
    new Details('¿Prestas servicios a eventos?', 'Si ofreces algún servicio o producto que sea de demanda para la organización de eventos sociales, únete al equipo de Proveedores de ROOM FEST y descubre una manera fácil de realizar el proceso de venta ¡Contáctanos!'),
    new Details('Experiencia mejorada con Realidad Aumentada', 'La Realidad Aumentada es una tecnología emergente que permite visualizar parte del mundo real por medio de un dispositivo tecnológico, y es parte de ROOM FEST ¡Descúbrela al registrarte y organizar tu evento!'),
    new Details('Control de lista de invitados', 'Como anfitrión de tu evento, tienes la libertad de crear tu lista de invitados y tener un control de ella, para que no falten las personas que más amas ¡Será una increíble experiencia!'),
  ];

  ngOnInit(): void {
  }

}
