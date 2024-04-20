import { IconType } from "react-icons";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface SidebaritemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;

}

const Sidebaritem: React.FC<SidebaritemProps> = ({
    icon : Icon,
    label,
    active, 
    href
}) => {
    return(
        <Link
        href={href}
        className={twMerge(`
            flex
            flex-row
            h-auto
            items-center
            w-full 
            gap-x-4
            text-md
            font-medium
            cursor-pointer
            hover:text-white
            transition
            text-neutral-400
            py-1
        `,
            active && "text-white" /* && "bg-purple-600" */   //if active or user is in certain page make it active by making it white 
        )} //rounded-lg pl-5
        >
            <Icon size={26} />
            <p className="truncate w-full">{label}</p>
        </Link>
            
    );
}

export default Sidebaritem;