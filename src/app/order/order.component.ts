import { Component } from '@angular/core';
import { ProductServiceService } from '../service/product-service.service';
import { NgFor, NgIf } from '@angular/common';
import { order } from '../service/interface';

@Component({
  selector: 'app-order',
  imports: [NgFor,NgIf],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  orderlist:order[]|undefined
  objectKeys = Object.keys;

   constructor(private productservice :ProductServiceService){}
   ngOnInit(){
    this.getorder()
   }
   cancelorder(id:number | undefined){
    this.productservice.deleteorder(id).subscribe((data)=>{
      this.getorder()
    })
   }
   getorder(){
    this.productservice.orderlist().subscribe((data)=>{
      this.orderlist=data
    })
   }
}
