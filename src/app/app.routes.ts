import { Routes } from '@angular/router';
import { authGuard } from './service/auth.guard';
import { Page404Component } from './page404/page404.component';


export const routes: Routes = [
    {path:'sign',loadComponent:()=>import('./signup/signup.component').then((c)=>c.SignupComponent),},
    {path:'',loadComponent:()=>import('./home/home.component').then((c)=>c.HomeComponent)},
    {path:'seller-help',loadComponent:()=>import('./helps/helps.component').then((c)=>c.HelpsComponent)},
    {path:'cart',loadComponent:()=>import('./cart/cart.component').then((c)=>c.CartComponent)},
    {path:'seller-contact',loadComponent:()=>import('./contact/contact.component').then((c)=>c.ContactComponent)},
    {path:'seller-about',loadComponent:()=>import('./about/about.component').then((c)=>c.AboutComponent)},
    {path:'seller',loadComponent:()=>import('./seller/seller.component').then((c)=>c.SellerComponent)},
    {path:"seller-home",loadComponent:()=>import('./seller-home/seller-home.component').then((c)=>c.SellerHomeComponent),canActivate:[authGuard]},
    {path:"seller-addproduct",loadComponent:()=>import('./seller-addproduct/seller-addproduct.component').then((c)=>c.SellerAddproductComponent),canActivate:[authGuard]},
    {path:"seller-updateproduct/:id",loadComponent:()=>import('./seller-updateproduct/seller-updateproduct.component').then((c)=>c.SellerUpdateproductComponent),canActivate:[authGuard]},
    {path:"search/:query",loadComponent:()=>import('./search/search.component').then((c)=>c.SearchComponent)},
    {path:"detail/:id",loadComponent:()=>import('./detail/detail.component').then((c)=>c.DetailComponent)},
    {path:"checkout",loadComponent:()=>import('./checkout/checkout.component').then((c)=>c.CheckoutComponent)},
    {path:"myorder",loadComponent:()=>import('./order/order.component').then((c)=>c.OrderComponent)},
    {path:'**',component:Page404Component}
];
