import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  constructor(private routeActive: ActivatedRoute) { }

  sources = [
    '/assets/imgGuest/img.jpg',
    '/assets/imgGuest/img1.jpg',
    '/assets/imgGuest/img2.jpg',
  ];

  nombre: string;
  description: string;
  address: string;
  fecha: string;
  hora: string;


  ngOnInit(): void {
    this.nombre = this.routeActive.snapshot.params.nombre;
    this.description = this.routeActive.snapshot.params.description;
    this.address = this.routeActive.snapshot.params.address;
    this.sources = this.routeActive.snapshot.params.sources.split(',');
    this.fecha = this.routeActive.snapshot.params.fecha;
    this.hora = this.routeActive.snapshot.params.hora;
  }

}
