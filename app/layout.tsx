import "./globals.css";
import React from "react";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";
import {Roboto} from "next/font/google";
import {ThemeProvider} from "@mui/material/styles";
import theme from "@/theme/theme";
import Navbar from "@/components/Navbar/Navbar";
import {Metadata} from "next";
import {Container} from "@mui/material";

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
});

export const metadata: Metadata = {
    title: 'vZDC RVM',
    description: 'vZDC RVM',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
    <body className={roboto.variable}>
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <Navbar />
                <Container maxWidth="lg" sx={{ mt: 2, }}>
                    {children}
                </Container>
            </ThemeProvider>
        </AppRouterCacheProvider>
    </body>
    </html>
  );
}
