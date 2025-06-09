import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { ProductServiceService } from '../service/product-service.service';
import { products } from '../service/interface';


@Component({
  selector: 'app-seller-addproduct',
  imports: [ CommonModule, FormsModule],
  templateUrl: './seller-addproduct.component.html',
  styleUrl: './seller-addproduct.component.css'
})
export class SellerAddproductComponent {
constructor(private productservice : ProductServiceService) {}
  addproductmessage : string| undefined;
  addproduct(product: products){
    this.productservice.addproducts(product).subscribe(
      (res) => {
        console.log(res);
        this.addproductmessage = "Product added successfully";
      })
      setTimeout(()=>(this.addproductmessage = undefined),3000)
      
  }
}


