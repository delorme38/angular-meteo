import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MilitairePipe } from './militaire.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MeteoComponent } from './meteo/meteo.component';
import { Prev3joursComponent } from './prev3jours/prev3jours.component';
import { PrevHeuresComponent } from './prev-heures/prev-heures.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { PrevActuelleComponent } from './prev-actuelle/prev-actuelle.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MilitairePipe,
    MeteoComponent,
    Prev3joursComponent,
    PrevHeuresComponent,
    PrevActuelleComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
