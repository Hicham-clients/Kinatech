export const  imageSrc=(src:string):string=>{
    return `${process.env.NEXT_PUBLIC_API_URL}/storage/${src}`
}