import React from 'react';
import Navbar from "@/app/components/Navbar";

export default function Layout({children}: Readonly<{children: React.ReactNode}>){
    return(
        <div>
         <Navbar />
            I am main Layout Page inside (root).
            {children}
        </div>
    )
}