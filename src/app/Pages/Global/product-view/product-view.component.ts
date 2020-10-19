import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  productName: string;
  productDescription: string;
  productImg: any;
  productPrice: any;
  productAR: any;
  vumark: any;

  constructor(private routerActived:ActivatedRoute) { }

  ngOnInit(): void {
    this.productName = this.routerActived.snapshot.params.name;
    this.productDescription = this.routerActived.snapshot.params.description;
    this.productImg = this.routerActived.snapshot.params.img;
    this.productPrice = this.routerActived.snapshot.params.price;
    this.productAR = this.routerActived.snapshot.params.qr;
    this.vumark = this.routerActived.snapshot.params.vumark;

    console.log(this.productName);
  }

}
