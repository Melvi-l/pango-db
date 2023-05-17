import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'console';

@Component({
  selector: 'fetch',
  templateUrl: './fetch.component.html',
  styleUrls: ['./fetch.component.css']
})
export class FetchComponent implements OnInit {

  message: string;

  constructor(private http: HttpClient) { 
    this.message = "fetching..."
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    console.log("fetching")
    this.http.get<any>("http://localhost:8080/")
      .subscribe({
        next: (json) => {
          this.message = json.message
        },
        error(error) {
          console.log(error)
        },
        complete() {
          console.log("fetched")
        }
      })
  }

}
