import { Component, OnInit, ElementRef, Renderer2, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header-homepage',
  templateUrl: './header-homepage.component.html',
  styleUrls: ['./header-homepage.component.css']
})
export class HeaderHomepageComponent implements OnInit {

  @ViewChild('appbar') appbar: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  OnWindowScroll($event){
    if(document.documentElement.scrollTop > 30){
      this.renderer.addClass(this.appbar.nativeElement, 'fijo');
    } else {
      this.renderer.removeClass(this.appbar.nativeElement, 'fijo');
    }
  }

}
