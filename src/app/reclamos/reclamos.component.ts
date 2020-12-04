import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { UsersService } from '../services/users.service'
import { Reclamos } from '../interfaz/reclamos';


export interface PeriodicElement {
  position:number;
  fecha: string;
  categoria: string;
  reclamo: string;
}




@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.css']
})
export class ReclamosComponent implements OnInit {

  constructor( private userService: UsersService) { }

  ngOnInit(): void {
    this.traerTablasporRut();
    this.traerComentario()
    this.borrarComentario()
  }
  columnas = ['num_reclamos', 'rut', 'fecha', 'categoria', 'reclamo','estado','acciones'];
  dataSource = null;



reclamo:Reclamos[];
   
  
   

  cerrar(){
    localStorage.clear();
  }

  traerTablasporRut(){
    this.userService
    .traerTablaporRut()
    .subscribe(
      res => {
        this.reclamo = res;
        this.dataSource = new MatTableDataSource<Reclamos>(this.reclamo)
        
      },
      err => {
       console.log(err)
      }
    )
    
  }


  obtenerNum(numero:number){
    localStorage.setItem('num', numero.toString())
    console.log(localStorage.getItem('num'))
  }

  comentario:string;

  agregarComentario(comentario: string) {
    this.userService 
      .agregarComentario(parseInt(localStorage.getItem('num')), comentario)
      .subscribe(
        res => {
          this.comentario = res;
          console.log('se agrego xd');
          window.location.reload();
        },
        err => {
          console.log(err)
        }
      )
  }

  comentarios:string;

  traerComentario() {
    this.userService.traerComentario(parseInt(localStorage.getItem('num'))).subscribe(
      res => {
        this.comentarios = res;
        console.log(this.comentario)
      },
      err => {
        console.log(err);
      }
    )
  }

  borrarComentario(){
    this.comentarios="";
  }

}


