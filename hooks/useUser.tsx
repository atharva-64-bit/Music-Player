import { useEffect, useState, createContext, useContext } from 'react'; //useState is a hook in React that allows functional components to have state variables.ex count const [count, setCount] = useState(0);
/* useEffect is a hook in React that lets you perform side effects in your components.
Side effects can be things like data fetching, subscriptions, or manually changing the DOM.
In simple terms, it's a way to say, "Hey React, do something after rendering." */
import {
  useUser as useSupaUser,
  useSessionContext,
  User
} from '@supabase/auth-helpers-react';

import { UserDetails, Subscription } from '@/types';

type UserContextType = {  /* properties */
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(  /* usercontext is created using createcontext */
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase
  } = useSessionContext();  /* useSessionContext hook is used to retrieve session information, loading status, and the Supabase client. */


  const user = useSupaUser();  /* The useSupaUser hook is used to get information about the authenticated user.
  The component initializes state variables for isLoadingData, userDetails, and subscription. */
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = () => supabase.from('users').select('*').single();
  const getSubscription = () =>
    supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {  /* This useEffect block is triggered when the component mounts or when user changes */  //if user is present data and subscription not loading
      setIsloadingData(true);  /* load data */
      Promise.allSettled([getUserDetails(), getSubscription()]).then(  /* fetches user details and subscriptions */
        (results) => {
          const userDetailsPromise = results[0];  //push in results
          const subscriptionPromise = results[1];

          if (userDetailsPromise.status === 'fulfilled')   //if status is fulfilled ie data is load set userdetails
            setUserDetails(userDetailsPromise.value.data as UserDetails);

          if (subscriptionPromise.status === 'fulfilled')
            setSubscription(subscriptionPromise.value.data as Subscription);

          setIsloadingData(false);  //stop loading data
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {  //if user ios not present
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription
  };

  return <UserContext.Provider value={value} {...props} />;
};  //line29

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};