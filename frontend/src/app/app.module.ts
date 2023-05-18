import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { FetchComponent } from './fetch/fetch.component'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthInterceptor } from 'src/interceptors/Auth.interceptor'
import AuthService from 'src/services/Auth.service'

@NgModule({
  declarations: [
    AppComponent,
    FetchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
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
