import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, products } from './interface';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  cartitem = new EventEmitter<products[] | []>();
  constructor(private http: HttpClient) { }
  addproducts(product: products) {
    return this.http.post('http://localhost:3000/product', product)
  }
  //product list
  productlist() {
    return this.http.get<products[]>("http://localhost:3000/product")
  }
  // delete product
  deleteproduct(id: string) {
    return this.http.delete(`http://localhost:3000/product/${id}`)
  }
  getproduct(id: string) {
    return this.http.get<products>(`http://localhost:3000/product/${id}`)
  }
  upproduct(product: products) {
    return this.http.put<products>(`http://localhost:3000/product/${product.id}`, product)
  }
  populateproduct() {
    return this.http.get<products[]>("http://localhost:3000/product?_limit=5")
  }
  trendproduct() {
    return this.http.get<products[]>("http://localhost:3000/product?_limit=30")
  }
  suggestion(query: string) {
    return this.http.get<products[]>(`http://localhost:3000/product?q=${query}`)
  }
  localaddtocart(data: products) {
    let cartdata = []
    let localcart = localStorage.getItem('localcart')
    if (!localcart) {
      localStorage.setItem('localcart', JSON.stringify([data]));
      this.cartitem.emit([data])
      alert('product added to cart')
    } else {
      cartdata = JSON.parse(localcart);
      cartdata.push(data);
      localStorage.setItem('localcart', JSON.stringify(cartdata))
      if (cartdata.length >= 0) {
        alert('product added to cart')
      }
    }
    this.cartitem.emit(cartdata)
  }
  localremovetocart(productid: string) {
    let cartdata = localStorage.getItem('localcart')
    if (cartdata) {
      let items = JSON.parse(cartdata)
      items = items.filter((item: products) => item.id !== productid);
      localStorage.setItem('localcart', JSON.stringify(items));
      this.cartitem.emit(items)
    }
  }
  loginremovetocart(userid: string) {
    return this.http.delete('http://localhost:3000/cart/' + userid)
  }
  addtocart(cartdata: cart) {
    return this.http.post('http://localhost:3000/cart', cartdata)
  }
  getcartlist(userid: string) {
    return this.http.get<products[]>('http://localhost:3000/cart?userid=' + userid, { observe: 'response' }).subscribe((result) => {
      if (result && result.body) {
        this.cartitem.emit(result.body)
      }
    })
  }
  currentcart() {
    let userstore = localStorage.getItem('user');
    let userdata = userstore && JSON.parse(userstore)[0];
    return this.http.get<cart[]>('http://localhost:3000/cart?userid=' + userdata.id)
  }
  orderpost(order: order) {
    return this.http.post('http://localhost:3000/orders', order)
  }
  orderlist() {
    let user = localStorage.getItem('user');
    let userid = user && JSON.parse(user)[0].id;
    return this.http.get<order[]>('http://localhost:3000/orders?userid=' + userid)
  }
  deletecartdata(cartid: string) {
    return this.http.delete("http://localhost:3000/cart/" + cartid, { observe: 'response' }).subscribe((res) => {
      if (res) {
        this.cartitem.emit([])
      }
    })
  }
  deleteorder(orderid: number | undefined) {
    return this.http.delete('http://localhost:3000/orders/' + orderid)
  }
}
