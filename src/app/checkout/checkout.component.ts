import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule ,ReactiveFormsModule, Validators} from '@angular/forms';
import { ProductServiceService } from '../service/product-service.service';
import { cart, order, summary } from '../service/interface';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule,ReactiveFormsModule,NgFor, NgIf  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  cartdata:cart[]|undefined
  ordermsg:string|undefined
  productsummary:summary={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
  }
  constructor(private productservice: ProductServiceService, private router:Router) { }
  ngOnInit(){
     this.productservice.currentcart().subscribe((cart)=>{
    let price = 0;
    this.cartdata = cart;
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
  checkoutform = new FormGroup({
  deliveryAddress: new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[6-9]\\d{9}$') 
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    addressLine: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\d{6}$') // 6-digit PIN
    ]),
    state: new FormControl('', [Validators.required])
  }),
  payment: new FormGroup({
    paymentMethod: new FormControl('', [Validators.required])
  })
});

  form(){
    let user = localStorage.getItem('user');
    let userid = user && JSON.parse(user)[0].id;
    if(this.productsummary.total && this.checkoutform.valid){
         let orderdata:order = {
           totalprice:this.productsummary.total,
  userid:userid,
  id:undefined,
  name:this.checkoutform.value.deliveryAddress?.Name,
  email:this.checkoutform.value.deliveryAddress?.email,
  address:this.checkoutform.value.deliveryAddress?.addressLine,
  city:this.checkoutform.value.deliveryAddress?.city,
  state:this.checkoutform.value.deliveryAddress?.state,
  phone:this.checkoutform.value.deliveryAddress?.phoneNumber,
  paymentmethod:this.checkoutform.value.payment?.paymentMethod,
         }
         this.cartdata?.forEach((item)=>{
          setTimeout(() => {
           item.id && this.productservice.deletecartdata(item.id)
          }, 700);
         })
         this.productservice.orderpost(orderdata).subscribe((res)=>{
          if(res){
            this.ordermsg = "order placed successfully"
            setTimeout(() => {
              this.router.navigate(['myorder'])
              this.ordermsg = undefined
            }, 3000);
            
          }
         })
    }else{
      if(!this.checkoutform.valid){
        alert("please fill the form correctly")
      }else{
        alert("order not placed")
      }
    }
  }
}
