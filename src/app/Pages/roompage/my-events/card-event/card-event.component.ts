import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.css']
})
export class CardEventComponent implements OnInit {

  @Input() titulo: string;
  @Input() description: string;
  @Input() address: string;
  @Input() day: string;
  @Input() hour: string;
  @Input() images = [];
  @Input() guests = [];
  @Input() idDoc: any;

  type = localStorage.getItem('type') == "anfitrion";

  constructor(private router: Router, private firestore: EventsService) { }

  ngOnInit(): void {
  }

  toEdit(){
    this.router.navigate([
      'roompage/edit-event',
      {
        titulo: this.titulo,
        description: this.description,
        address: this.address,
        day: this.day,
        hour: this.hour,
        guests: this.guests,
        images: this.images,
        type: 'editar',
        id: this.idDoc
      }
    ]);
  }

  viewEvent(){
    this.router.navigate(['/guest',{nombre: this.titulo, description: this.description, address: this.address, sources: this.images, fecha: this.day, hora: this.hour}])
  }

  deleteEvent(){
    Swal.fire({
      title: '¿Esta seguro de querer borrar este evento?',
      text: "El evento borrado no podra ser recuperado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.firestore.deleteEvent(this.idDoc).then(() => {
          Swal.fire({icon:'success',title:'Evento eliminado', text:'Su evento fue borrado con exito'});
        });
      }
    });
  }

}
