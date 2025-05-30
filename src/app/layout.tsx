import type { Metadata } from "next";  
import { Geist, Geist_Mono } from "next/font/google";  
import "./globals.css";  
import { getAppTitle } from "@/lib/utils";  


const geistSans = Geist({  
  variable: "--font-geist-sans",  
  subsets: ["latin"],  
  display: "swap",  
});  

const geistMono = Geist_Mono({  
  variable: "--font-geist-mono",  
  subsets: ["latin"],  
  display: "swap",  
});  

export const metadata: Metadata = {  
  title: getAppTitle('pt-BR'),  
  description: "The ultimate fan experience for FURIA CS:GO team.",  
  icons: [{ url: "/furia-logo.png" }],  
};  

export default function RootLayout({  
  children,  
}: Readonly<{  
  children: React.ReactNode;  
}>) {  
  return (  
    <html lang="en" suppressHydrationWarning>  
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>  
          {children}  
      </body>  
    </html>  
  );  
}  