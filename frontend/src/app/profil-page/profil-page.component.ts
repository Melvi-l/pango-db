import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import PangolinModel, { Role } from 'src/models/pangolin.model';
import AuthService from 'src/services/auth.service';
import PangolinService from 'src/services/pangolin.service';

const ROLE_LIST: Role[] = [
  "Guerrier", "Alchimiste", "Sorcier", "Espion", "Enchanteur"
]

@Component({
  selector: 'profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {

  pangolin?: PangolinModel
  roleList: Role[] = ROLE_LIST;

  constructor(private pagolinService: PangolinService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.fetchUserPangolin()
  }

  //API
  fetchUserPangolin() {
    this.pagolinService.findOnePangolin(this.authService.getUserId())
      .subscribe({
        next: (pangolin) => {
          console.log(pangolin)
          this.pangolin = pangolin
        }
      })
  }
  submit() {
    if (this.pangolin) {
      this.pagolinService.updatePangolin(this.authService.getUserId(), this.pangolin)
        .subscribe({
          next: (resBody) => {
            console.log(resBody.message)
            this.fetchUserPangolin()
          },
          error(error) {
            console.log(error)
          }
        })
    }
  }
  logOut() {
    this.authService.logOut()
    this.router.navigate(['/login'])
  }

  // Computed
  isLoading() {
    return this.pangolin == undefined
  }
  getBackground() {
    return `linear-gradient(0deg, black 10%, transparent 55%), url(../../assets/images/${this.pangolin?.role.toLowerCase()}.jpg)`
  }

  // Methods
  setRole(role: Role) {
    this.pangolin!.role = role
  }
}