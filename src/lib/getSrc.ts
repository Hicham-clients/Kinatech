import { urlApi } from "./axios"

export const  imageSrc=(src:string):string=>{
    return `${urlApi}/${src}`
}
