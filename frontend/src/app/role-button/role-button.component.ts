import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Role } from 'src/models/pangolin.model';

@Component({
  selector: 'role-button',
  templateUrl: './role-button.component.html',
  styleUrls: ['./role-button.component.css']
})
export class RoleButtonComponent implements OnInit {
  @Input() role: Role = "Guerrier";
  @Input() active: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  // Computed
  getIcon() {
    return `url(../../assets/icons/${this.role.toLowerCase()}.png)`
  }
}
