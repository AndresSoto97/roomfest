import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

  public events = [];

  constructor(private firestoreService: EventsService) { }

  ngOnInit(): void {
    this.firestoreService.getEvents().subscribe((eventsSnapshot)=>{
      this.events = [];
      eventsSnapshot.forEach((eventData)=>{
        this.events.push({
          id: eventData.payload.doc.id,
          data: eventData.payload.doc.data()
        });
      })
    });
  }

}
