import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ValidatorsService } from 'src/app/util/validators.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  @ViewChild('userName') userName: ElementRef;
  @ViewChild('correo') correo: ElementRef;
  @ViewChild('psw') psw: ElementRef;
  @ViewChild('pswConf') pswConf: ElementRef;

  username: string = '';
  email: string = '';
  password: string = '';
  passwordConf: string = '';
  emailErrorMessage: string;
  passwordErrorMessage: string;
  passwordNotConfirm: string;
  userNameIncorrect: string;

  constructor(private authservice: AuthService, private router: Router, private validate: ValidatorsService, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  validateForm(email: string, password: string, passwordconf: string, username: string):boolean {
    if (this.validate.validateEmail(email, this.renderer, this.correo) === null
        && this.validate.validatePassword(password, this.renderer, this.psw) === null
          && this.validate.ValidatePasswordCoincided(password, passwordconf, this.renderer, this.pswConf) === null
            && this.validate.ValidateUserName(username, this.renderer, this.userName) === null) {
      return true
    }
    else{
      this.emailErrorMessage = this.validate.validateEmail(email, this.renderer, this.correo);
      this.passwordErrorMessage = this.validate.validatePassword(password, this.renderer, this.psw);
      this.passwordNotConfirm = this.validate.ValidatePasswordCoincided(password, passwordconf, this.renderer, this.pswConf);
      this.userNameIncorrect = this.validate.ValidateUserName(username, this.renderer, this.userName);
      return false;
    }
  }

  signUp(){
    if(this.validateForm(this.email, this.password, this.passwordConf, this.username)){
      this.authservice.registerWithEmail(this.email, this.password, this.username).then(() =>{
        /* this.router.navigate(['/homepage']); */
        Swal.fire({
          title: 'Registro completado',
          icon: 'success',
          text: 'Se ha registrado de manera exitosa'
        }).then(() => {
          this.router.navigate(['/homepage']);
        });
      }).catch((error)=>{
        Swal.fire({
          title: 'Error al registrar',
          icon: 'error',
          text: error
        });
      });
    }
  }

}
