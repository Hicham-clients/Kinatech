import { ArrowClockwise } from "phosphor-react"

const Refetch = ({onclick}:{onclick:()=>void}) => {
  return (
  <div className="text-center font-A tracking-wider text-xl text-[red] flex flex-col justify-center items-center gap-5">
<button onClick={onclick} className="text-main-hover text-main">     <ArrowClockwise size={'3rem'}/>
</button>
          </div>
)
}
export default Refetch