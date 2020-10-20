import { ElementRef, Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  validateEmail(email: string, renderer?: Renderer2, id?: ElementRef):string {
    let reg = /^(([a-zñÑ0-9._]+)+([@]+[a-z]+)+([.][a-z]+))*$/;

    if(email.length === 0){
      renderer.addClass(id.nativeElement, 'form-control-error');
      return "El campo no puede estar vacio.";
    }
    else{
      if(!reg.exec(email)){
        renderer.addClass(id.nativeElement, 'form-control-error');
        return 'Escriba un correo valido';
      }
      else{
        renderer.removeClass(id.nativeElement, 'form-control-error');
        return null;
      }
    }
  }

  validateProvEmail(email: string):string {
    let reg = /^(([a-zñÑ0-9._]+)+([@]+[a-z]+)+([.][a-z]+))*$/;

    if(email.length === 0){
      return "El campo no puede estar vacio.";
    }
    else{
      if(!reg.exec(email)){
        return 'Escriba un correo valido';
      }
      else{
        return null;
      }
    }
  }

  validatePassword(password: string, renderer?: Renderer2, id?: ElementRef):string{
    if(password.length === 0){
      renderer.addClass(id.nativeElement, 'form-control-error');
      return 'El campo no puede estar vacio';
    }
    else{
      if(password.length < 6){
        renderer.addClass(id.nativeElement, 'form-control-error');
        return 'La contraseña debe tener 6 caracteres';
      }
      else{
        renderer.removeClass(id.nativeElement, 'form-control-error');
        return null;
      }
    }
  }

  validateProvPassword(password: string):string{
    if(password.length === 0){
      return 'El campo no puede estar vacio';
    }
    else{
      if(password.length < 6){
        return 'La contraseña debe tener 6 caracteres';
      }
      else{
        return null;
      }
    }
  }

  ValidatePasswordCoincided(password: string, passwordconf: string, renderer: Renderer2, id: ElementRef):string{
    if(password !== passwordconf){
      renderer.addClass(id.nativeElement, 'form-control-error');
      return 'Las contraseñas no coinciden';
    }
    else{
      renderer.removeClass(id.nativeElement, 'form-control-error');
      return null;
    }
  }

  ValidateUserName(username: string, renderer: Renderer2, id: ElementRef):string{
    if(username.length === 0){
      renderer.addClass(id.nativeElement, 'form-control-error');
      return 'El campo no debe estar vacio';
    }
    else{
      renderer.removeClass(id.nativeElement, 'form-control-error');
      return null;
    }
  }

  ValidateNotEmpty(value:string){
    if(value == '')
      return '(el campo no puede estar vacio)';
    else
      return null;
  }

  validateGuest(value:string){
    let reg = /^(([a-zñÑ0-9._]+)+([@]+[a-z]+)+([.][a-z]+))*$/;

    if(value.length === 0)
      return "*El campo no puede estar vacio.";
    else
      if(!reg.exec(value))
        return '*El formaro de correo no es valido';
      else
        return null;
  }

  validateTelephone(value: any){
    if(value != null && value.toString().length < 10)
      return 'ingrese un numero valido'
    else
      return null;
  }

  validateNumber(value: number){
    if(value == null)
      return '*El campo no puede estar vacio'
    else
      if(value <= 0)
        return '*Debe agregar un valor mas grande';
      else
        return null
  }

}
