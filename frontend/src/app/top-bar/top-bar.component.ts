import { Component, OnInit } from '@angular/core';
import AuthService from 'src/services/auth.service';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  
  // Computed
  isAuth() {
    return this.authService.isAuth()
  }  

}
