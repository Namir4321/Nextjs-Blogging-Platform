"use client";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./theme-provider";
const DarkProvider = ({ children }) => {
  return (
    <>
      <Toaster />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
};

export default DarkProvider;
