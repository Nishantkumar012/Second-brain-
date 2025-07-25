import { SideBarItem } from "./SideBarItem";
import {X} from "../../icons/X"
import { Youtube } from "../../icons/Youtube";
import {Logo} from "../../icons/Logo"

export function Sidebar() {
  return (
    <div className="h-screen bg-white  w-72 fixed 
    left-0 top-0  pl-6">
        <div className="flex text-2xl pt-8 items-center
        ">
           <div className="pr-2 text-purple-600">
             <Logo size="lg"/>
            </div>
            BraiNo
        </div>
        <div className="pt-4 ">
            <SideBarItem  icon={<X size={"lg"}/>} text="X" />
            <SideBarItem  icon={<Youtube size={"lg"}/>} text="Youtube" />
            
        </div>
    </div>
  )
}
