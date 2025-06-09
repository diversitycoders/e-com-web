import { Component } from '@angular/core';
import { UsersService } from '../service/users.service';
import { Router } from '@angular/router';
import { seller, users } from '../service/interface';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-seller',
  imports: [FormsModule,NgIf],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css'
})
export class SellerComponent {
 constructor(private user:UsersService, private router:Router) { }
  showsignup = false;
  errors:string="";
  ngOnInit(){
    this.user.refresh()
  }
  show(){
     this.showsignup=!this.showsignup
  }
    signup(gettingdata:seller) {
        console.log(gettingdata);
        this.user.sellersign(gettingdata)
    }
    login(data:seller){
      this.errors="";
      console.log(data);
      this.user.sellogin(data)
      this.user.iserrorlogin.subscribe((res)=>{
        if(res){
          this.errors="please correct your email or password"
        }
      })
    }
}
