import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service'
import { Router } from '@angular/router';
import { Usuario } from '../interfaz/usuario'
import { correo } from '../interfaz/correo';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private usuarioService: UsersService, public router: Router) { }

  ngOnInit(): void {

  }

  usuarios: Usuario[] = [];
  correos:correo[];

  rut:string;
  nombre:string;
  apellido:string;
  direccion:string;
  correo:string;
  nom_usuario:string;
  clave:string;

  validacion:number = -1;

  agregarUsuario(rut:string, nombre:string, apellido:string,direccion:string,correo:string,nom_usuario:string,clave:string) {
    this.usuarioService.agregarUsuario({rut,nombre,apellido,direccion,correo,nom_usuario,clave} as Usuario)
    .subscribe(usu => {
      this.usuarios.push(usu)
      return alert("el usuario se ha creado con exito!")
    })
    
  }


  validarCorreo(correo:string){
    this.usuarioService
    .validarCorreo(correo)
    .subscribe(usu => {
      this.validacion = usu
    })
  }

}
