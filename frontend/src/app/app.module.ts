import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'
import { FetchComponent } from './fetch/fetch.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthInterceptor } from 'src/interceptors/Auth.interceptor'
import { AuthGuard } from './auth.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { ProfilPageComponent } from './profil-page/profil-page.component';
import { RoleButtonComponent } from './role-button/role-button.component';
import { FriendListPageComponent } from './friend-list-page/friend-list-page.component';
import { LoadingButtonComponent } from './loading-button/loading-button.component';

const routes: Routes = [
  { path: '', redirectTo: 'profil', pathMatch: 'full' },
  { path: 'profil', component: ProfilPageComponent, canActivate: [AuthGuard]},
  { path: 'friends', component: FriendListPageComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginPageComponent},
  { path: 'signup', component: SignupPageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    FetchComponent,
    LoginPageComponent,
    SignupPageComponent,
    TopBarComponent,
    ProfilPageComponent,
    RoleButtonComponent,
    FriendListPageComponent,
    LoadingButtonComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
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
