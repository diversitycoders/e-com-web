import { Component } from '@angular/core';
import { UsersService } from '../service/users.service';
import { ProductServiceService } from '../service/product-service.service';
import { cart, products } from '../service/interface';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ NgIf ,NgFor ,RouterLink] ,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  populatedproducts:products[]|undefined;
  trendyproducts:products[]|undefined;

  constructor(private user: UsersService , private productservice:ProductServiceService) {}
   ngOnInit(){
    this.productservice.populateproduct().subscribe((products)=>{
      this.populatedproducts=products;
    })
    this.productservice.trendproduct().subscribe((products)=>{
      this.trendyproducts=products;
    })
     let user = localStorage.getItem('user');
    if (user) {
      let userid = user && JSON.parse(user)[0].id;
      this.productservice.getcartlist(userid);
    }
    
  }
    addToCart(data: products) {
      let product = { ...data, quantity: 1 };
    if (data) {
      if (!localStorage.getItem('user')) {
        this.productservice.localaddtocart(product);
      }else{
          let user = localStorage.getItem('user');
               let userid = user && JSON.parse(user)[0].id;
               let cartdata: cart = { ...product, userid, productid: product.id }
               delete cartdata.id;
               this.productservice.addtocart(cartdata).subscribe((result) => {
                 if (result) {
                   this.productservice.getcartlist(userid)
                   alert('Product added to cart');
                 }})}
  }
}
}
