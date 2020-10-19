import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EasingLogic, PageScrollConfig } from 'ng2-page-scroll';
import { UserService } from 'src/app/services/user.service';
import { ValidatorsService } from 'src/app/util/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-proveedor',
  templateUrl: './perfil-proveedor.component.html',
  styleUrls: ['./perfil-proveedor.component.css']
})
export class PerfilProveedorComponent implements OnInit {

  dataNombre: string;
  dataEmail: string;
  dataTelefono: string;
  dataDireccion: string;

  name: string = '';
  telephone: number;
  address: string = '';
  description: string = '';

  nameValidateMsg: string;
  telValidateMsg: string;
  addValidateMsg: string;
  descValidateMsg: string;

  constructor(private router: Router, private userService: UserService, private validate: ValidatorsService) {
  }

  ngOnInit(): void {
    this.userService.getUserData(localStorage.getItem('id')).subscribe((eventSnapshot)=>{
      this.dataNombre = eventSnapshot.payload.data()['nombre'];
      this.dataEmail = eventSnapshot.payload.data()['email'];
      this.dataTelefono = eventSnapshot.payload.data()['telefono'];
      this.dataDireccion = eventSnapshot.payload.data()['direccion']
    });
  }

  myEasing: EasingLogic = {
    ease: (t: number, b: number, c: number, d: number): number => {
        // easeInOutExpo easing
        if (t === 0) return b;
        if (t === d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  };

  validateForm():boolean{
    this.nameValidateMsg = this.validate.ValidateNotEmpty(this.name);
    this.addValidateMsg = this.validate.ValidateNotEmpty(this.address);
    this.descValidateMsg = this.validate.ValidateNotEmpty(this.description);
    this.telValidateMsg = this.validate.validateTelephone(this.telephone);
    if(this.validate.ValidateNotEmpty(this.name) === null && this.validate.ValidateNotEmpty(this.address) === null
        && this.validate.ValidateNotEmpty(this.description) === null && this.validate.validateTelephone(this.telephone) === null){

      return true;
    } else{

      return false;
    }
  }

  updateData(){
    if(this.validateForm()){
      let data = {
        nombre: this.name,
        telefono: this.telephone != null? this.telephone : this.dataTelefono,
        direccion: this.address,
        description: this.description,
        email: localStorage.getItem('email'),
        userType: localStorage.getItem('type'),
      }
      this.userService.updateUserData(data).then(() => {
        this.resetForm();
        Swal.fire({icon:'success',title:'Información actualizada'});
      }).catch(() => {
        Swal.fire({icon:'error',title:'Error al actualizar información'});
      });
    }
  }

  resetForm(){
    this.name = '';
    this.address = '';
    this.description = '';
    this.telephone = null;
  }

  logout(){
    Swal.fire({
      title: '¿Esta seguro de querer cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('type');
        this.router.navigate(['homepage']);
      }
    });
  }

}
