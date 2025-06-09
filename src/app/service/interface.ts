export interface users {
  name:string,
  email: string,
  password: string
}
export interface seller {
  name: string,
  email: string,
  password: string
}
export interface products {
  productname: string,
  price: number,
  description: string,
  brand:string,
  category: string,
  photo:string,
  id: string
  quantity: number
  productid: undefined | string
}
export interface cart {
  productname: string,
  price: number,
  description: string,
  brand:string,
  category: string,
  photo:string,
  id: string | undefined
  quantity: number
  userid : string
  productid: string
}
export interface summary {
  price:number,
  discount:number,
  tax:number,
  delivery:number,
  total:number
}
export interface order {
  totalprice:number | null | undefined,
  userid:string | null | undefined,
  name:string | null | undefined,
  email:string | null | undefined,
  address:string | null | undefined,
  city:string | null | undefined,
  state:string | null | undefined,
  phone:string | null | undefined,
  paymentmethod:string | null | undefined,
  id:number | undefined
}
