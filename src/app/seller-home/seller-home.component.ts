import { Component } from '@angular/core';
import { UsersService } from '../service/users.service';
import { products } from '../service/interface';
import { ProductServiceService } from '../service/product-service.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-seller-home',
  imports: [ NgFor , RouterLink ],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  productlist:undefined | products[];
  productmessage:string | undefined;
  constructor(private list:ProductServiceService) { }
 
  ngOnInit(){
    this.getlist()
  }
  deleteproduct(id:string){
    console.log('delete');
    this.list.deleteproduct(id).subscribe((res)=>{
      if(res){
    this.productmessage="Product Deleted";
    this.getlist()
    }})
    setTimeout(() => {
      this.productmessage=undefined
    }, 3000);
  }
  getlist(){
    this.list.productlist().subscribe((plist)=>{
      if(plist){
      this.productlist=plist;
      }
    })
  }
}
