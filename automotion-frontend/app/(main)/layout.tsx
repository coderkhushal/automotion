"use client"
import DeskTopNavigation from "@/components/web/navigation/desktop_navigation"




const MainLayout = ({ children }: { children: React.ReactNode }) => {
    
    return (
      

        <div className="flex h-full w-full  bg-primary ">
            <DeskTopNavigation />
           
            
                {children}
         
        </div>
   
    )
}
export default MainLayout