"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";

import UploadModal from "@/components/UploadModal"; 



/* pop up windows will be displayed when component is fully loaded on browser
ismounted = finished loading */
const ModalProvider = ()=> {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
      
    </>
  );
}

export default ModalProvider;