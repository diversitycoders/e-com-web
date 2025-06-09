import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../service/product-service.service';
import { products } from '../service/interface';

@Component({
  selector: 'app-seller-updateproduct',
  imports: [FormsModule],
  templateUrl: './seller-updateproduct.component.html',
  styleUrl: './seller-updateproduct.component.css'
})
export class SellerUpdateproductComponent {
  constructor(private route:ActivatedRoute,private productservice:ProductServiceService,private router:Router) { }
  upproduct: products | undefined;
  updateproductmessage : string| undefined;
  ngOnInit(){
   let productid = this.route.snapshot.paramMap.get('id');
   if(productid){
   this.productservice.getproduct(productid).subscribe((res:products)=>{
   this.upproduct=res;
   })
   }
  }
 updateproduct(updata:products){
  if(updata){
    if(this.upproduct){
      updata.id = this.upproduct.id;
    }
  this.productservice.upproduct(updata).subscribe(
      (res) => {
        this.updateproductmessage = "Product updated successfully";
      })
      setTimeout(()=>(this.updateproductmessage = undefined 
      ),3000);
 }}
}
