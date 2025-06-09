import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductServiceService } from '../service/product-service.service';
import { cart, order, summary } from '../service/interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [NgFor,NgIf,RouterLink ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartdata:cart[]|undefined;
  productsummary:summary = {
    delivery:0,
    price:0,
    total:0,
    tax:0,
    discount:0
  }
  cartlength = 0
  objectKeys = Object.keys;
  constructor(private productservice: ProductServiceService , private router:Router) { }
  ngOnInit() {
    this.localdetails()
  }
  checkout(){
    this.router.navigate(['/checkout'])
  }
  removecart(cartid:string | undefined){
    if (!localStorage.getItem('user')) {
   cartid && this.productservice.localremovetocart(cartid);
    }else{
        cartid && this.productservice.loginremovetocart(cartid).subscribe((res)=>{
          this.localdetails()
        })
    }
  }
  localdetails(){
     this.productservice.currentcart().subscribe((cart)=>{
      this.cartdata=cart
      this.cartlength = cart.length
    let price = 0;
    cart.forEach((item)=>{
      price += (item.price) * item.quantity;
    })
       this.productsummary.price = price
       this.productsummary.discount= price/10;
       this.productsummary.tax = price/20;
       if(this.productsummary.price > 1000){
       this.productsummary.delivery = 100;
       }
       this.productsummary.total = this.productsummary.price + this.productsummary.delivery + this.productsummary.tax - this.productsummary.discount
    })
  }
}
