import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductServiceService } from '../service/product-service.service';
import { cart, products } from '../service/interface';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [ NgFor ,NgIf , RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor(private route:ActivatedRoute , private productservice:ProductServiceService) { }
 productlist:undefined|products[]
 noresult:boolean=true;
  ngOnInit(){
    this.search()
  }
  search(){
    const query = this.route.snapshot.paramMap.get('query')
    if(query){
      this.productservice.suggestion(query).subscribe((result:products[])=>{
        if(result.length==0){
        this.noresult=false;
        }else{
        this.productlist=result;
      }})
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

