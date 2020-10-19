import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../Model/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;
  userData: User;

  constructor(private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore, private userService:UserService) {
    this.firebaseAuth.authState.subscribe((auth =>{
      this.authState = auth;
    }))
    this.userData = new User;
  }

  registerWithEmail(email: string, password: string, username: string){
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password).then((user)=>{
      this.authState = user;
      this.firestore.collection('users').doc(user.user.uid).set({
        nombre: username,
        email: email,
        telefono: '',
        userType: 'anfitrion'
      });
      user.user.updateProfile({
        displayName: username
      });
    }).catch((error)=>{
      console.log(error);
      throw error;
    });
  }

  async loginWithEmail(email: string, password: string){
    return this.firebaseAuth.signInWithEmailAndPassword(email, password).then((user)=>{
      this.authState = user;
      localStorage.setItem('id', user.user.uid);
      localStorage.setItem('username', user.user.displayName);
      localStorage.setItem('email', user.user.email);
      this.userService.getUserData(localStorage.getItem('id')).subscribe((eventSnapshot)=>{
        localStorage.setItem('type', eventSnapshot.payload.data()['userType']);
      });
    }).catch((error)=>{
      /* console.log('error code:',error.code); */
      throw error;
    });
  }

}
