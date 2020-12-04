import { Component, Input, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Reclamos } from '../interfaz/reclamos';
import { UsersService } from '../services/users.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { antecedentes } from '../interfaz/antecedentes';

export interface DialogData {
  antecedente: string;
}





@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  constructor(private userService: UsersService, public dialog: MatDialog) { }

  
  panelOpenState = false;

  ngOnInit(): void {
    this.traerTablas()
  }

  reclamo: Reclamos[] = [];

  efecito: string;

  antecedente: string;

  dataSource = null;
  columnas = ['num_reclamos', 'rut', 'fecha', 'categoria', 'reclamo', 'estado', 'acciones'];


  guardarNum(numero:number){
    localStorage.setItem('num', numero.toString())
    console.log(localStorage.getItem('num'))
  }



  



  openDialogAn(numero: number) {
    this.dialog.open(DialogMostrarAntecedentes);
    localStorage.setItem('num', numero.toString())
    console.log(localStorage.getItem('num'))

  }

  openDialogCo(numero:number) {
    this.dialog.open(DialogMostrarComentarios);
    localStorage.setItem('num', numero.toString())

    console.log(localStorage.getItem('num'))
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  traerTablas() {
    this.userService
      .traerTablas()
      .subscribe(
        res => {
          this.reclamo = res;
          this.dataSource = new MatTableDataSource<Reclamos>(this.reclamo);
        },
        err => {
          console.log(err)
        }
      )


  }
  num_reclamo: number;

  cambiarEstado(num_reclamo: number) {
    this.userService
      .cambiarEstado(num_reclamo)
      .subscribe(
        res => {
          this.num_reclamo = res
          console.log('cambio xd')
          window.location.reload();
        },
        err => {
          console.log(err)
        }
      )
  }

  borrarReclamo(num_reclamo: number) {
    this.userService
      .borrarReclamo(num_reclamo)
      .subscribe(
        res => {
          this.num_reclamo = res
          console.log('se borro xd')
          window.location.reload();
        },
        err => {
          console.log(err)
        }
      )
  }

  agregarAntecedente(antecedente: string) {
    this.userService 
      .agregarAntecedente(parseInt(localStorage.getItem('num')), antecedente)
      .subscribe(
        res => {
          this.antecedente = res;
          console.log('se agrego xd');
          window.location.reload();
        },
        err => {
          console.log(err)
        }
      )
  }

  cerrar(){
    localStorage.clear();
  }
}









@Component({
  selector: 'dialogo_mostrar_antecedentes',
  templateUrl: 'dialogo_mostrar_antecedentes.html',
})




export class DialogMostrarAntecedentes {
  constructor(private userService: UsersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.traerAntecedente()
  }

  antecedente: string;

  traerAntecedente() {
    this.userService.traerAntecedente(parseInt(localStorage.getItem('num'))).subscribe(
      res => {
        this.antecedente = res;
        console.log(this.antecedente)
      },
      err => {
        console.log(err);
      }
    )
  }
}




@Component({
  selector: 'dialogor_mostrar_comentarios',
  templateUrl: 'dialogo_mostrar_comentarios.html',
})
export class DialogMostrarComentarios {
  constructor(private userService: UsersService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.traerComentario()
  }

  comentario: string;

  traerComentario() {
    this.userService.traerComentario(parseInt(localStorage.getItem('num'))).subscribe(
      res => {
        this.comentario = res;
        console.log(this.comentario)
      },
      err => {
        console.log(err);
      }
    )
  }
}
