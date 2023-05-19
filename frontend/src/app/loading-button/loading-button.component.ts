import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.css']
})
export class LoadingButtonComponent implements OnInit {
  @Input() isLoading: boolean = false;
  @Input() isDisabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
