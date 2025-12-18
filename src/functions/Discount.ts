export function calculNewPrice(discount:(number),oldPrice:number){
return Number((oldPrice-(oldPrice*(discount/100)))).toFixed(2).replace('.',',')


}
export function PriceFormat(price: number) {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}