import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manga-events',
  templateUrl: './manga-events.component.html',
  styleUrls: ['./manga-events.component.css']
})
export class MangaEventsComponent implements OnInit {

  @ViewChild('anfitrion') anfitrion:ElementRef

  constructor(private userService: UserService, private eventService: EventsService) { }

  anfitriones =[];
  events = [];
  eventsSelected = [];

  ngOnInit(): void {
    this.userService.getUsers().subscribe((userSnapshot) =>{
      this.anfitriones = [];
      userSnapshot.forEach((userData)=>{
        if(userData.payload.doc.data()['userType'] == 'anfitrion'){
          this.anfitriones.push({
            id: userData.payload.doc.id,
            nombre: userData.payload.doc.data()['nombre']
          });
          this.eventService.getAllEvents(userData.payload.doc.id).subscribe((eventSnapshot)=>{
            this.events = [];
            eventSnapshot.forEach((eventData)=>{
              this.events.push({
                id: eventData.payload.doc.id,
                idAnf: userData.payload.doc.id,
                data: eventData.payload.doc.data()
              });
              console.log(this.events);
            });
          });
        }
      });
      console.log(this.anfitriones);
    });
  }

  getEvents(id:any){
    console.log(id);
    this.eventsSelected = [];
    this.events.forEach((eventData)=>{
      if(eventData.idAnf === id){
        this.eventsSelected.push({
          id: eventData.id,
          data: eventData.data
        });
      }
    });
  }

}
