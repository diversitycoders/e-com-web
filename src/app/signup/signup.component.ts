import { Component } from '@angular/core';
import { UsersService } from '../service/users.service';
import { Router } from '@angular/router';
import { cart, products, users } from '../service/interface';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ProductServiceService } from '../service/product-service.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule,NgIf ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private user:UsersService, private router:Router , private productservice:ProductServiceService) { }
  showsignup = false;
  errors:string="";
  ngOnInit(): void {
    this.user.userauth()
  }

  show(){
     this.showsignup=!this.showsignup
  }
    signup(gettingdata:users) {
        console.log(gettingdata);
        this.user.sign(gettingdata)
    }
    login(data:users){
      this.errors="";
      this.user.login(data)
      this.user.iserrorlogin.subscribe((res)=>{
        if(res){
          this.errors="please correct your email or password"
        }else{
          this.localcartremote()
        }
      })
    }
   localcartremote(){
    let data = localStorage.getItem("localcart");
    let user = localStorage.getItem("user")
    let userid = user && JSON.parse(user)[0].id;
    if(data){
      let cartdatalist:products[] = JSON.parse(data)
      
      cartdatalist.forEach((product:products,index)=>{
      let cartdata:cart = {
        ...product,
        userid,
        productid:product.id
      }
      delete cartdata.id;
      setTimeout(() => {
         this.productservice.addtocart(cartdata).subscribe((res)=>{
        if(res){
          console.log("item stored in db");
        }
        if(cartdatalist.length === index+1){
          localStorage.removeItem("localcart");
        }
       })
      }, 500);
      }) 
      };
      setTimeout(() => {
        this.productservice.getcartlist(userid)
      }, 1000);
    }
  }

