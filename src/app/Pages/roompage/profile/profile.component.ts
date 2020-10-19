import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ValidatorsService } from 'src/app/util/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private validate: ValidatorsService) { }

  names: string;
  lastName: string;
  email: string;
  telephone: string;

  inputNamesError: string;
  inputLastError: string;
  inputTelephoneError: string;

  ngOnInit(): void {
    this.userService.getUserData(localStorage.getItem('id')).subscribe((eventSnapshot)=>{
      this.email = eventSnapshot.payload.data()['email'];
      this.names = eventSnapshot.payload.data()['nombre'].split(' ').length < 4?
                    eventSnapshot.payload.data()['nombre'].split(' ')[0] :
                    eventSnapshot.payload.data()['nombre'].split(' ')[0] +' '+ eventSnapshot.payload.data()['nombre'].split(' ')[1];
      this.lastName = eventSnapshot.payload.data()['nombre'].split(' ').length < 4?
                      (eventSnapshot.payload.data()['nombre'].split(' ').length < 3?
                          eventSnapshot.payload.data()['nombre'].split(' ')[1] :
                          eventSnapshot.payload.data()['nombre'].split(' ')[1] +' '+ eventSnapshot.payload.data()['nombre'].split(' ')[2]) :
                      eventSnapshot.payload.data()['nombre'].split(' ')[2] +' '+ eventSnapshot.payload.data()['nombre'].split(' ')[3];
      this.telephone = eventSnapshot.payload.data()['telefono'];
    });
  }

  validateForm(){
    if(this.validate.ValidateNotEmpty(this.names) === null && this.validate.ValidateNotEmpty(this.lastName) === null
        && this.validate.validateTelephone(this.telephone.toString()) === null){
      this.inputNamesError = this.validate.ValidateNotEmpty(this.names);
      this.inputLastError = this.validate.ValidateNotEmpty(this.lastName);
      this.inputTelephoneError = this.validate.validateTelephone(this.telephone.toString());
      return true
    } else{
      this.inputNamesError = this.validate.ValidateNotEmpty(this.names);
      this.inputLastError = this.validate.ValidateNotEmpty(this.lastName);
      this.inputTelephoneError = this.validate.validateTelephone(this.telephone.toString());
      return false;
    }
  }

  updateData(){
    if(this.validateForm()){
      let data ={
        nombre: this.names +' '+ this.lastName,
        telefono: this.telephone,
        email: localStorage.getItem('email')
      }
      this.userService.updateUserData(data).then(() => {
        Swal.fire({icon:'success',title:'Información actualizada'});
      }).catch(() => {
        Swal.fire({icon:'error',title:'Error al actualizar información'});
      });
    }
  }

}
