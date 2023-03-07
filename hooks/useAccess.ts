import { GlobalStateContext } from "@/contexts/global-state-context";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function useAccess() {
  const { authenticatedUser, isLoadingAuth } = useContext(GlobalStateContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoadingAuth) {
      return;
    }

    if (authenticatedUser && router.pathname === '/login') {
      router.push('/');
    } else if (!authenticatedUser && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [isLoadingAuth, authenticatedUser, router.pathname]);
}