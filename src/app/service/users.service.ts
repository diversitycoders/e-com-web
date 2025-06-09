import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, inject, Injectable } from '@angular/core';
import { products, seller, users } from './interface';
import { Router } from '@angular/router';
import { BehaviorSubject, elementAt } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient, private router:Router) { }
  islogin = new BehaviorSubject<boolean>(false);
  iserrorlogin = new EventEmitter<boolean>(false);
  url = 'http://localhost:3000/users';
  sign(user:users){
     this.http.post<users>(this.url,user).subscribe((data)=>{
      console.log(data);
      this.islogin.next(true);
      this.router.navigate(['/']);
      localStorage.setItem('user',JSON.stringify(data));
    })
  }
  login(user:users){
    this.http.get<users>(`http://localhost:3000/users?email=${user.email}&password=${user.password}`,{observe:'response'}).subscribe((data:any)=>{
    if(data && data.body && data.body.length>0){
      this.islogin.next(true);
      localStorage.setItem('user',JSON.stringify(data.body));
      this.router.navigate(['/']);
      this.iserrorlogin.emit(false)
    }else{
     console.log("login failed");
       this.iserrorlogin.emit(true)
    }
    })
  }

  //page refresh 
  
  refresh(){
    if(localStorage.getItem('seller')){
      this.islogin.next(true);
      this.router.navigate(['/seller-home']);
    }else{
      this.router.navigate(['/seller']);
    }
    }
    
    //seller
     

    selurl = 'http://localhost:3000/sellers';
    sellersign(user:seller){
     this.http.post<seller>(this.selurl,user).subscribe((data)=>{
      console.log(data);
      this.islogin.next(true);
      this.router.navigate(['/seller-home']);
      localStorage.setItem('seller',JSON.stringify(data));
    })
  }
    sellogin(user:seller){
    this.http.get<seller>(`http://localhost:3000/sellers?email=${user.email}&password=${user.password}`,{observe:'response'}).subscribe((data:any)=>{
    console.log(data);
    if(data && data.body && data.body.length>0){
      this.islogin.next(true);
      localStorage.setItem('seller',JSON.stringify(data.body));
      this.router.navigate(['/seller-home']);
    }else{
     console.log("login failed");
       this.iserrorlogin.emit(true)
    }
    })
  }
  userauth(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
  }}
}
