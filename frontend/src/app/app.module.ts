import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'
import { FetchComponent } from './fetch/fetch.component'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthInterceptor } from 'src/interceptors/Auth.interceptor'
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'profil', pathMatch: 'full' },
  { path: 'profil', component: FetchComponent, canActivate: [AuthGuard]},
  { path: 'friends', component: FetchComponent, canActivate: [AuthGuard]},
  { path: 'login', component: FetchComponent},
  { path: 'signup', component: FetchComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    FetchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
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
