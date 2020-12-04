import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UsersService } from '../services/users.service'
import { Usuario } from '../interfaz/usuario'
import { Reclamos } from '../interfaz/reclamos'


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(public dialog: MatDialog,private userService: UsersService) { }

  ngOnInit(): void {
    this.obtenerDatos();
  }

  //localStorage.getItem('rut')
  
  usuarios:Usuario;
  reclamos:Reclamos;

  obtenerDatos() {
    this.userService
    .traerDatos()
    .subscribe(
      res => {
        this.usuarios=res;
        localStorage.setItem('rut',this.usuarios.rut);
      },
      err => {
        console.log(err)
      }
    )
  }



  cerrar(){
    localStorage.clear();
  }

  rut:string = localStorage.getItem('rut');
  fecha:string;
  categoria:string;
  reclamo:string;

  crearReclamo(fecha:string,categoria:string,reclamo:string ){
    this.userService
    .crearReclamo({rut: localStorage.getItem('rut'), fecha, categoria, reclamo } as unknown as Reclamos)
    .subscribe(
      res => {
        this.reclamos = res
  
        console.log(res)
        this.dialog.open(DialogElementsExampleDialog);
      },

      err => {
        console.log(err)
        console.log(localStorage.getItem('rut'))
      }
    )

  }

 

}



@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}
