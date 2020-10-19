import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor(private storage: AngularFireStorage) { }

  public upToStorage(name: string, data: any){
    return this.storage.upload(name, data);
  }

  public reference(name: string){
    return this.storage.ref(name);
  }

}
