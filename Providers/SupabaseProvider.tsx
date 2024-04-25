"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { Database } from "@/types_db";

/* creating supabase connection */
interface SupabaseProviderProps {
  children: React.ReactNode;
};
/* establishing connection everytime a component is created */

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
  children
}) => {
    const [supabaseClient] = useState(() =>
    createClientComponentClient<Database>()
  );
/* sessionconteext keeps track of whether the user has logged in and lets component to use the info */
/* provides connection for all parts of apps wrapped inside the provider */
  return ( 
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
}
 
export default SupabaseProvider;