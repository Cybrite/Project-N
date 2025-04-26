import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './_components/Sidebar'

function MindeaseLayout({ children }: { children: React.ReactNode }) {

    return (
        // <SidebarProvider>
        //   <AppSidebar />
     
            
        //     <SidebarTrigger className='fixed mr-7 '/>
        
        //     <div className='cursor-default'>
              
        //       {children}
        //     </div>
        // </SidebarProvider>
        <div className='cursor-default'>
              
           {children}
        </div>
      )
  
}

export default MindeaseLayout