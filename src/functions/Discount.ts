export function calculNewPrice(discount:(number),oldPrice:number){
return Number((oldPrice-(oldPrice*(discount/100)))).toFixed(2).replace('.',',')
}