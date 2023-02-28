import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popUp: any;
  constructor() { 
   
  }
  closeOffer(){
    const $offerData:any = document.querySelector('.popupMsg');
    $offerData.close();
  }

  ngOnInit() {
    setTimeout(function pop(){
      const $offerData:any = document.querySelector('.popupMsg');
      $offerData.showModal();
    }, 5000);

  //   setInterval(() => {
  //     const $offerData:any = document.querySelector('.popupMsg');
  //      $offerData.showModal();
  //  }, 2000);
  }
}

