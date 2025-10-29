import PageDetail from "./_components/PageDetail"
export const generateMetadata=async({params}:{params:{slug:string}})=>{
  
return {
  title:params.slug.split('-').join(' ')
}
}
const Detail = () => {
  return (
<PageDetail/>  )
}
export default Detail