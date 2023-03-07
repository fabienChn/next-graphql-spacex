//TODO DELETE
import { useContext } from "react";
import { NextRequest, NextResponse } from "next/server";
import { GlobalStateContext } from "@/contexts/global-state-context";

export default function authMiddleware(req: NextRequest) {
  const { authenticatedUser } = useContext(GlobalStateContext);
  const { url } = req;
  
  if (!authenticatedUser && url !== '/auth') {
    return NextResponse.redirect('/auth');
  }

  if (authenticatedUser && url === '/auth') {
    return NextResponse.redirect('/');
  }
}