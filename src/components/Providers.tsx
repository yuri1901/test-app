"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { AuthProvider } from "@/context/ContextAuth";
import { store } from "@/store/store";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
