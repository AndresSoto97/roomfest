import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ValidatorsService } from 'src/app/util/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @ViewChild('correo') correo: ElementRef;
  @ViewChild('psw') psw: ElementRef;

  constructor(private authService: AuthService, private validate: ValidatorsService, private renderer: Renderer2, private router: Router) { }

  user: string = '';
  password: string = '';
  userValidateMsg: string;
  passwordValidateMsg: string;


  ngOnInit(): void {
  }

  validateLoginForm(email: string, password: string):boolean{
    if (this.validate.validateEmail(email, this.renderer, this.correo) === null
          && this.validate.validatePassword(password, this.renderer, this.psw) === null) {
      return true;
    } else{
      this.userValidateMsg = this.validate.validateEmail(email, this.renderer, this.correo);
      this.passwordValidateMsg = this.validate.validatePassword(password, this.renderer, this.psw);
      return false;
    }
  }

  onSignIn(){
    if (this.validateLoginForm(this.user, this.password)) {
      this.authService.loginWithEmail(this.user, this.password).then((result) => {
        Swal.fire({
          title: 'Cargando',
          allowEscapeKey: false,
          allowOutsideClick: false,
          timer: 2000,
          onOpen: () => {
            Swal.showLoading();
          }
        }).then(() => {
          this.router.navigate([localStorage.getItem('type') != 'proveedor'?
            (localStorage.getItem('type') == 'admin'? '/admin' : '/roompage'):'/proveedor']);
        });
      }).catch((error) => {
        console.log(error);
        if (error.code.includes('network-request-failed')) {
          Swal.fire({
            title: 'Error de conexión',
            icon: 'error',
            text: 'Verifique su conexion a internet'
          });
        }else{
          Swal.fire({
            title: 'Error al iniciar sesión',
            icon: 'error',
            text: 'Su correo o contraseña son incorrectos'
          });
        }
      });
    }
  }

}
