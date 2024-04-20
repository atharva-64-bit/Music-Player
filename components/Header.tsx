"use client";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const authModal = useAuthModal();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      toast.error(error.message);
    }
  };

  const handleSearchIconClick = () => {
    router.push("/search"); // Navigate to the search page
  };

  const handleHomeIconClick = () => {
    router.push("/"); // Navigate to the search page
  };

  return (
    <div
      className={twMerge(`
        h-fit
        bg-gradient-to-b
        from-emerald-800
        p-6
      `, className)}
    >
      <div className="
        w-full
        mb-4
        flex
        items-center
        justify-between
      ">
        <div className="
          hidden
          md:flex
          gap-x-2
          items-center
        ">
          <button
            onClick={() => router.back()}
            className="
              rounded-full
              bg-black
              flex
              items-center
              justify-center
              hover-opacity-75
              transition
            "
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>

          <button
            onClick={() => router.forward()}
            className="
              rounded-full
              bg-black
              flex
              items-center
              justify-center
              hover-opacity-75
              transition
            "
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>

        <div className="flex md:hidden gap-x-2 items-center">
          <button
            onClick={handleHomeIconClick}
            className="
              rounded-full
              p-2
              bg-white
              flex
              items-center
              justify-center
              hover-opacity-75
              transition
            "
          >
            <HiHome className="text-black" size={20} />
          </button>

          <button
            onClick={handleSearchIconClick} // Handle search icon click
            className="
              rounded-full
              p-2
              bg-white
              flex
              items-center
              justify-center
              hover-opacity-75
              transition
            "
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>

        <div className="
          flex
          justify-between
          items-center
          gap-x-4
        ">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button
                onClick={handleLogout}
                className="bg-white px-6 py-2 text-neutral-900"
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="
                    bg-transparent
                    text-neutral-100
                    font-medium
                  "
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="
                    bg-white
                    text-neutral-900
                    px-6
                    py-2
                  "
                >
                  Log In
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;


//bg-purple-100-600