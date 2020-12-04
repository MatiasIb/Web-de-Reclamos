import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AdministradorComponent } from './administrador/administrador.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReclamosComponent } from './reclamos/reclamos.component';
import { RegistroComponent } from './registro/registro.component';
import { UsuarioComponent } from './usuario/usuario.component';


const routes: Routes = [
  {
    path:'',
    component:InicioComponent

  },

  {
    path:'login',
    component:LoginComponent

  },
  {
    path:'registro',
    component:RegistroComponent
  },

  {
    path:'user',
    component:UsuarioComponent,
    canActivate:[LoginGuard]
     
    },
    {
      path:'admin',
      component:AdministradorComponent,
      canActivate:[AdminGuard]
      
    },

    {
      path:'perfil',
      component:PerfilComponent,
      canActivate: [LoginGuard]
    },
    {
      path:'reclamos',
      component:ReclamosComponent,
      canActivate:[LoginGuard]

    }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
