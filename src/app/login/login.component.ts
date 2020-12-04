import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { UsersService } from '../services/users.service'
import { Usuario } from '../interfaz/usuario'
import { Router, RouterLink } from '@angular/router';
import { Key } from 'protractor';
import { UsuarioComponent } from '../usuario/usuario.component';
import { Console } from 'console';
import { validacion } from '../interfaz/validacion'
import { stringify } from 'querystring';


export class FormFieldErrorExample {
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarios: Usuario ;

  constructor(public usersService: UsersService, public router: Router) {
   }

  ngOnInit(): void {
  }

  nom_usuario: string;
  clave: string;
  

validar(nom_usuario: string, clave: string) {
  this.usersService.validarUsuario(nom_usuario, clave)
    .subscribe(
      res => {
        this.usuarios = res;
        if (this.usuarios.rol == 'usuario'){

          this.router.navigateByUrl('/user');

        }else if (this.usuarios.rol == 'admin'){
          this.router.navigateByUrl('/admin');
        }
        
        localStorage.setItem('nom_usuario',nom_usuario);
        localStorage.setItem('clave',clave);
        localStorage.setItem('rol',this.usuarios.rol);
        console.log(localStorage.getItem('rol'))
      },
      err => {
        console.log(err)
        alert('el nombre de usuario o la contraseña, son incorrectos intente nuevamente')
      }
    )
}

}
  




