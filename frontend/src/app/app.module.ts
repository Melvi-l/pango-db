import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'
import { FetchComponent } from './fetch/fetch.component'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthInterceptor } from 'src/interceptors/Auth.interceptor'
import { AuthGuard } from './auth.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { SigupPageComponent } from './sigup-page/sigup-page.component';
import { TopBarComponent } from './top-bar/top-bar.component';

const routes: Routes = [
  { path: '', redirectTo: 'profil', pathMatch: 'full' },
  { path: 'profil', component: FetchComponent, canActivate: [AuthGuard]},
  { path: 'friends', component: FetchComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginPageComponent},
  { path: 'signup', component: SigupPageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    FetchComponent,
    LoginPageComponent,
    SigupPageComponent,
    TopBarComponent,
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
