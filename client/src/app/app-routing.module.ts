import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { MeteoComponent } from './meteo/meteo.component';

const routes: Routes = [
  //On redirige / vers /weather
  {path:'',pathMatch:'full', redirectTo:'weather'},

  //canActivate: [AuthGuard] permet de bloquer 
  //une route si l'utilisateur n'est pas login
  {path:'weather', component: MeteoComponent, canActivate: [AuthGuard]},

  //Route pour la page d'authentification
  {path:'auth', component: AuthComponent },


  //Ajouter d'autres routes au besoin
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
