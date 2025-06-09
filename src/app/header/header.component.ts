import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from "@angular/common";
import { ProductServiceService } from '../service/product-service.service';
import { cart, products } from '../service/interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterLink , NgSwitch, NgSwitchCase ,NgFor ,FormsModule , RouterLinkActive ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private route:Router,private productservice:ProductServiceService){}
  autosuggestion:undefined|products[];
  sellername="..sellername"
  menutype:string = 'default';
  searchitem:undefined|string;
   username="..username" 
   cartitems=0;
   menu = false;

 
  ngOnInit(){
    this.route.events.subscribe((event:any)=>{
      console.log(event.url);
      if(event.url){
        if(localStorage.getItem('seller') && event.url.includes('seller')){
            this.menutype = 'seller'
           let sellerstore= localStorage.getItem('seller');
           let sellerdata = sellerstore && JSON.parse(sellerstore)[0];
          setTimeout(() => {
             this.sellername = sellerdata.name;
           }, 500);
        } else if (localStorage.getItem('user')){
            this.menutype = 'user'
           let userstore= localStorage.getItem('user');
           let userdata = userstore && JSON.parse(userstore)[0];
           setTimeout(() => {
             this.username = userdata.name;
           }, 500);
          
        }
        else {
          this.menutype = 'default';
        }
      }
    })
    let cartdata = localStorage.getItem('localcart');
    if(cartdata){
      let items = JSON.parse(cartdata);
      let validItems = items.filter((item: cart) => item && item.id && item.quantity > 0);
      this.cartitems = validItems.length;
    }
    this.productservice.cartitem.subscribe((result)=>{
      this.cartitems = result.length;
    })
  }

   men(){
    this.menu = !this.menu;
  }

  userlogout(){
    localStorage.removeItem('user');
    this.username="..username";
    this.route.navigate(['/'])
    this.productservice.cartitem.emit([]);
  }
  logout(){
    localStorage.removeItem('seller');
    this.sellername="..sellername";
    this.route.navigate(['/'])
  }
  suggestions(query:Event){
   if(query){
    const data = (query.target as HTMLInputElement).value;
    this.productservice.suggestion(data).subscribe((result:products[])=>{
      if(result.length>5){
        result.length=5;
      }
      this.autosuggestion = result
    })
   }
  }
  closesuggestion(){
    this.autosuggestion = undefined;
  }
  subsearch(query:string){
    this.route.navigate([`/search/${query}`]);
    this.searchitem = query;
  }
  cartcheck(){
    if(localStorage.getItem("user")){
      return true;
    } else{
      alert('Please Login to see your cart')
      this.route.navigate(['/sign']);
      return false;
    }
  }
}
