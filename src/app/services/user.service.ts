import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  public getUserData(id:any){
    return this.firestore.collection('users').doc(id).snapshotChanges();
  }

  public updateUserData(data:any){
    return this.firestore.collection('users').doc(localStorage.getItem('id')).set(data);
  }

  public getUsers(){
    let ref = this.firestore.collection('users').ref;
    return this.firestore.collection('users', ref=>ref.where('userType','!=','admin')).snapshotChanges();
  }
}
