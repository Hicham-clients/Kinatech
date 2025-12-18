export function calculNewPrice(discount:(number),oldPrice:number){
return Number((oldPrice-(oldPrice*(discount/100))))

}
export function PriceFormat(price: number|string) {
  return price.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}