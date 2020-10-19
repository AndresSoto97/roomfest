import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private firestore: AngularFirestore) { }

  public getSolicitudes(){
    let ref = this.firestore.collection('users').doc(localStorage.getItem('id')).collection('solicitudes').ref;
    return this.firestore.collection('users').doc(localStorage.getItem('id')).collection('solicitudes', ref=>ref.where('estado','==','en espera')).snapshotChanges();
  }

  public updateStatustoAccept(id:any){
    return this.firestore.collection('users').doc(localStorage.getItem('id')).collection('solicitudes').doc(id).update({
      estado: 'Aceptado'
    });
  }

  public updateStatustoDeny(id:any){
    return this.firestore.collection('users').doc(localStorage.getItem('id')).collection('solicitudes').doc(id).update({
      estado: 'Rechazado'
    });
  }

  public createRequest(id: string, data: any){
    return this.firestore.collection('users').doc(id).collection('solicitudes').add(data);
  }

  public updateRequest(id: any, idProduct: any, data: any){
    return this.firestore.collection('users').doc(id).collection('solicitudes').doc(idProduct).update(data);
  }

}
