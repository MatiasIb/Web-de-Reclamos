import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable} from "rxjs"
import { Reclamos } from "../interfaz/reclamos"
import { Usuario } from '../interfaz/usuario';
import { correo } from '../interfaz/correo';
import { antecedentes } from '../interfaz/antecedentes';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  apiURL = 'http://localhost:8080/api/tabla_reclamo/traerTodos/'
  apiURL2 = 'http://localhost:8080/api/traer/'
  apiURL3 = 'http://localhost:8080/api/traer/'
  apiURL4 = 'http://localhost:8080/api/registrar'
  apiURL5 = 'http://localhost:8080/api/tabla_reclamo/traerPorRut/'
  apiURL6 = 'http://localhost:8080/email/send/'
  apiURL7 = 'http://localhost:8080/api/tabla_reclamo/TraerAntecedentes/'
  apiURL8 = 'http://localhost:8080/api/tabla_reclamo/crear_reclamo/'
  apiURL9 = 'http://localhost:8080/api/tabla_reclamo/CambiarEstado/'
  apiURL10 = 'http://localhost:8080/api/tabla_reclamo/eliminarReclamo/'
  apiURL11 = 'http://localhost:8080/api/tabla_reclamo/agregarAntecedentes/'
  apiURL12 = 'http://localhost:8080/api/tabla_reclamo/TraerComentario/'
  apiURL13 = 'http://localhost:8080/api/tabla_reclamo/agregarComentarios/'
  apiURL14 = 'http://localhost:8080/api/modificar/'
  apiURL15 = 'http://localhost:8080/api/validar/'
  apiURL16 = 'http://localhost:8080/api/traerDatos/'
  httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

  };

 traerTablas(): Observable<Reclamos[]> {
   
   return this.http.get<Reclamos[]>(this.apiURL)
 }

validarUsuario(nom_usuario:string,clave:string): Observable<Usuario> {
  return this.http.get<Usuario>(this.apiURL2 + nom_usuario + "/" + clave);
}



traerDatos():Observable<Usuario>{
  return this.http.get<Usuario>(this.apiURL3 + localStorage.getItem('nom_usuario') + "/" + localStorage.getItem('clave'))

}

agregarUsuario(usuario:Usuario):Observable<Usuario> {
  return this.http.post<Usuario>(this.apiURL4, usuario, this.httpOptions)
}

traerTablaporRut(): Observable<Reclamos[]> {
  return this.http.get<Reclamos[]>(this.apiURL5 + localStorage.getItem('rut'), this.httpOptions)
}

traerAntecedente(num_reclamo:number):Observable<string> {
  return this.http.get(this.apiURL7 + num_reclamo, {responseType:'text'})
}


crearReclamo(reclamo:Reclamos):Observable<Reclamos>{
  return this.http.post<Reclamos>(this.apiURL8,reclamo, this.httpOptions)
}

cambiarEstado(num_reclamo:number):Observable<number>{
  return this.http.put<number>(this.apiURL9 + num_reclamo + "/", this.httpOptions)
}

borrarReclamo(num_reclamo:number):Observable<number>{
  return this.http.delete<number>(this.apiURL10 + num_reclamo + "/", this.httpOptions)
}

agregarAntecedente(num_reclamo:number, antecedente:string): Observable<string> {
  return this.http.put<string>(this.apiURL11 + num_reclamo + "/" + antecedente + "/", this.httpOptions)
}

traerComentario(num_reclamo:number):Observable<string> {
  return this.http.get(this.apiURL12 + num_reclamo, {responseType:'text'})
}

agregarComentario(num_reclamo:number, comentario:string): Observable<string> {
  return this.http.put<string>(this.apiURL13 + num_reclamo + "/" + comentario + "/", this.httpOptions)
}

modificarDatos(rut:string, usuario:Usuario):Observable<Usuario>{
  return this.http.put<Usuario>(this.apiURL14 + rut, usuario,this.httpOptions)
}

validarCorreo(correo:string) :Observable<number>{
  return this.http.get<number>(this.apiURL15 + correo,this.httpOptions)
}

TraerDatosPorRut() :Observable<Usuario>{
  return this.http.get<Usuario>(this.apiURL16 + localStorage.getItem('rut'))
}

}
