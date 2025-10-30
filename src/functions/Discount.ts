export function calculNewPrice(discount:(number),oldPrice:number){
return Number((oldPrice-(oldPrice*(discount/100)))).toFixed(2).replace('.',',')

}export function PriceFormat(price:number){
return price.toFixed(2).replace('.',',')
}