import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ValidatorsService } from 'src/app/util/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  constructor(private userService: UserService, private validate: ValidatorsService, private authService: AuthService) { }

  usuarios = [];

  name: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  nameValidMsg: string;
  lastValidMsg: string;
  emailValidMsg: string;
  passValidMsg: string;

  ngOnInit(): void {
    this.userService.getUsers().subscribe((userSnapshot) => {
      this.usuarios = [];
      userSnapshot.forEach((userData)=>{
        this.usuarios.push({
          email: userData.payload.doc.data()['email'],
          nombre: userData.payload.doc.data()['nombre'],
          telefono: userData.payload.doc.data()['telefono'],
          tipo: userData.payload.doc.data()['userType']
        });
      });
    });
  }

  validateForm(){
    this.nameValidMsg=this.validate.ValidateNotEmpty(this.name);
    this.lastValidMsg=this.validate.ValidateNotEmpty(this.lastName);
    this.emailValidMsg=this.validate.validateProvEmail(this.email);
    this.passValidMsg=this.validate.validateProvPassword(this.password);
    if(this.validate.ValidateNotEmpty(this.name) === null && this.validate.ValidateNotEmpty(this.lastName) === null
        && this.validate.validateProvEmail(this.email) === null && this.validate.validateProvPassword(this.password) === null){
      return true;
    } else {
      return false;
    }
  }

  registrarUsuario(){
    if(this.validateForm()){
      Swal.fire({
        title: 'Cargando',
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 2000,
        onOpen: () => {
          Swal.showLoading();
          this.authService.registerWithEmail(this.email, this.password, this.name+' '+this.lastName);
          this.resetForm();
        }
      }).then(() => {
        Swal.fire({icon: 'success', title: 'Usuario registrado de manera exitosa'});
      }).catch(() => {
        Swal.fire({icon: 'error', title: 'Error al registrar usuario'});
      });
    }
  }

  resetForm(){
    this.email = '';
    this.lastName= '';
    this.name = '';
    this.password = '';
  }



}
