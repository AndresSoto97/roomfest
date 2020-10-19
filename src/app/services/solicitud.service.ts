import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private firestore: AngularFirestore) { }

  public getSolicitudes(){
    let ref = this.firestore.collection('solicitudes').ref;
    return this.firestore.collection('solicitudes', ref=>ref.where('idProveedor','==',localStorage.getItem('id')).where('estado','==','en espera')).snapshotChanges();
  }

  public getAnfitrionSolicitudes(){
    let ref = this.firestore.collection('solicitudes').ref;
    return this.firestore.collection('solicitudes', ref=>ref.where('idCliente','==',localStorage.getItem('id'))).snapshotChanges();
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

  public createRequest(data: any){
    return this.firestore.collection('solicitudes').add(data);
  }

  public updateRequest(idProduct: any, data: any){
    return this.firestore.collection('solicitudes').doc(idProduct).update(data);
  }

}
