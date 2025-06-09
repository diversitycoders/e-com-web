import { Component } from '@angular/core';
import { AboutComponent } from "../about/about.component";
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../service/product-service.service';
import { cart, products } from '../service/interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [NgIf],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  quantity: number = 1;
  removecart = false;
  product: undefined | products;
  cardata :products|undefined;
  constructor(private router: ActivatedRoute, private productservice: ProductServiceService) { }

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');
    if (id) {
      this.productservice.getproduct(id).subscribe((result: products) => {
        this.product = result;
      })
    }
    let cart = localStorage.getItem('localcart')
    if (cart && id) {
      let items = JSON.parse(cart)
      items = items.filter((item: products) => item.id == id)
      if (items.length > 0) {
        this.removecart = true;
      }
      else {
        this.removecart = false;
      }
    }
    let user = localStorage.getItem('user');
    if (user) {
      let userid = user && JSON.parse(user)[0].id;
      this.productservice.getcartlist(userid);
      this.productservice.cartitem.subscribe((result) => {
        let item = result.filter((item: products) => id?.toString() === item.productid?.toString())
        if (item.length) {
          this.cardata = item[0];
          this.removecart = true
        }
      })
    }
  }


  handlequantity(decision: string) {
    if (this.quantity < 20 && decision == 'increase') {
      this.quantity++;
    }
    else if (this.quantity > 1 && decision == 'decrease') {
      this.quantity--;
    }
  }

  addToCart() {
    if (this.product) {
      let product = { ...this.product, quantity: this.quantity };
      if (!localStorage.getItem('user')) {
        this.productservice.localaddtocart(product);
        this.removecart = true;
      } else {
        let user = localStorage.getItem('user');
        let userid = user && JSON.parse(user)[0].id;
        let cartdata: cart = { ...product, userid, productid: product.id }
        delete cartdata.id;
        this.productservice.addtocart(cartdata).subscribe((result) => {
          if (result) {
            this.productservice.getcartlist(userid)
            alert('Product added to cart');
            this.removecart = true;
            this.quantity = 1
          }
        })
      }
    }
  }
  removetocart(productid: string) {
    if (!localStorage.getItem('user')) {
    this.productservice.localremovetocart(productid);
    this.removecart = false;
    this.quantity = 1;
    }else{
      let user = localStorage.getItem('user');
        let userid = user && JSON.parse(user)[0].id;
        this.cardata && this.productservice.loginremovetocart(this.cardata.id).subscribe((res)=>{
          if(res){
            this.productservice.getcartlist(userid)
          }
        })
    }
    this.removecart = false;
    this.quantity = 1;
  }
}
