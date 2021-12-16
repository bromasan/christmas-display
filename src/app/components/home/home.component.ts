import { Component, OnInit } from '@angular/core';
import { SayingsService } from 'src/app/services/sayings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sayings: any[] = [];
  saying: string = '';
  counter = 0;

  constructor(
    private sayingsService: SayingsService
  ) { }

  ngOnInit(): void {
    this.sayingsService.getActiveSayings('alliecat').subscribe((res: any) => {
      this.sayings = res;
      this.saying = this.sayings[this.counter].message.S;
      this.changeSaying();
    });
  }

  changeSaying() {
    const intervalId = setInterval(() => {
      if (this.counter < this.sayings?.length - 1) {
        this.counter++;
      } else {
        this.counter = 0;
      }
      this.saying = this.sayings[this.counter].message.S;
      this.sayingsService.getActiveSayings('alliecat').subscribe((res: any) => {
        this.sayings = res;
      });
    }, 5000);
  }

}
