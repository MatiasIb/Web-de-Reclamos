import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service'
import { Usuario } from '../interfaz/usuario'
import { Router } from '@angular/router';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private userService: UsersService, public router:Router) { }

  ngOnInit(): void {
    this.usuarios = {
      nombre: "",
      apellido: "",
      nom_usuario:"",
      direccion:"",
      correo:"",
      clave:"",
      rut:"",
      rol:""
    }
    this.obtenerDatosUsuario()
  }


   usuarios: Usuario  ;



  obtenerDatosUsuario() {
    this.userService
    .TraerDatosPorRut()
    .subscribe(
      res => {
        this.usuarios=res;
        console.log(this.usuarios)
      },
      err => {
        console.log(err)
      }

      
    )
  }

  cerrar(){
    localStorage.clear();
  }


  nombre:string;
  apellido:string = "" ;
  usuario:string;
  direccion:string;
  correo:string;
  clave:string
  rut:string;
  
  t

  actualizarDatos(nombre:string,apellido:string , nom_usuario:string,direccion:string,correo:string,clave:string ){
    this.userService
    .modificarDatos(this.rut = localStorage.getItem('rut'),{apellido,nombre,nom_usuario,direccion,correo,clave} as unknown as Usuario)
    .subscribe(res => {
      this.usuarios = res;
      console.log("funciona")
      window.location.reload();

    },
    err => {
      console.log(err)
    }
    )

  }
}
