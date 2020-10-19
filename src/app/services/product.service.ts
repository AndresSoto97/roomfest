import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({providedIn: 'root'})

export class ProductService {
  constructor(private firestore: AngularFirestore) { }

  public getProducts(){
    let ref = this.firestore.collection('productos').ref;
    return this.firestore.collection('productos', ref => ref.where('idProveedor','==',localStorage.getItem('id'))).snapshotChanges();
  }

  public getAllProducts(){
    return this.firestore.collection('productos').snapshotChanges();
  }

  public addProduct(data:any){
    return this.firestore.collection('productos').add(data);
  }

  public updateProductData(id:any,data:any){
    return this.firestore.collection('productos').doc(id).update(data);
  }

  public deleteProduct(id:any){
    return this.firestore.collection('productos').doc(id).delete();
  }

}
