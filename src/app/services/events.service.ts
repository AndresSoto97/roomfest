import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private firestore: AngularFirestore) { }

  public getEvents(){
    return this.firestore.collection('users').doc(localStorage.getItem('id')).collection('eventos').snapshotChanges();
  }

  public createEvent(data:any){
    return this.firestore.collection('users').doc(localStorage.getItem('id')).collection('eventos').add(data);
  }

  public updateEvent(data:any, docId:any){
    return this.firestore.collection('users').doc(localStorage.getItem('id')).collection('eventos').doc(docId).update(data);
  }

  public deleteEvent(docId:any){
    return this.firestore.collection('users').doc(localStorage.getItem('id')).collection('eventos').doc(docId).delete();
  }

  public getAllEvents(id:any){
    return this.firestore.collection('users').doc(id).collection('eventos').snapshotChanges();
  }
}
