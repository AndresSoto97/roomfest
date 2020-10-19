import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  constructor() { }

  sources = [
    '/assets/imgGuest/img.jpg',
    '/assets/imgGuest/img1.jpg',
    '/assets/imgGuest/img2.jpg',
  ];

  ngOnInit(): void {
    /* $(function(){
      SyntaxHighlighter.all();
    });
    $(window).load(function(){
      $('.flexslider').flexslider({
        animation: "slide",
        start: function(slider){
          $('body').removeClass('loading');
        }
      });
    });*/
  }

}
