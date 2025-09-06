"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import Header from "@/components/common/Header";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Header />
            {children}
            <Toaster
              richColors
              position="top-center"
              theme="light"
              closeButton
            />
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
