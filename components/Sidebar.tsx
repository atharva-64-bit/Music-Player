"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box"
import Sidebaritem from "./Sidebaritem";
import Library from "./Library";
import { Song } from "@/types";

interface SidebarProps{       //prop = properties
    children: React.ReactNode;  //this is a typescript which represents node that can be rendered in react app (node = components/elements/strings)
    songs: Song[]
};

const Sidebar: React.FC<SidebarProps> = ({  //reactfc is used to define component
    children,  //children is a prop that allows components to accepts or reject content that can be rendered between op/closing tags
    songs
}) =>{         //usememo = use to increase performance by memorizing result avoiding recalculation of result every time it renders
    const pathname = usePathname();   // Route component renders some UI if the current location's path matches the route's path prop.
    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname !== '/search', //"Home" route is considered active when the current path is not the search page. in other words
            href: '/',  //if we are in home page, ie home page is active thus we can apply specific properties to active page
        },
        {
            icon: BiSearch,
            label: 'Search',
            active: pathname == '/search', //"Search" route is considered active when the current path is the search page.
            href: '/search',
        }
    ], [pathname]);  //empty and (dependency array = tells react which piece of code should rerun)or recalculate value if pathname changes 
    return(
        <div className="flex h-full">
            <div className="hidden
             md:flex
             flex-col
             gap-y-2
             bg-black
             h-full
             w-[300px]
             p-2">
               <Box>
                <div className="
                flex
                flex-col
                px-5
                py-4
                gap-y-4">
                    {routes.map((item)=> (  //maps or iterates over each item in array
                        <Sidebaritem     //for each item in routes array, it renders sidebaritem component
                             key={item.label} //used to efficientl;y update item com[ponents
                            {...item} //used to pass all properties of current item as individual props to sidebaritem component like icon label etc
                        />
                    ))}
                </div>
               </Box>
               <Box className="overflow-y-auto h-full">
               <Library songs={songs} />
               </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    );
}

export default Sidebar;