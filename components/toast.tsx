"use client";

import React, { createContext, useContext, useMemo, useRef } from "react";
import { Toast } from "primereact/toast";
import type { ToastMessage } from "primereact/toast";

type ToastAPI = {
  show: (message: ToastMessage | ToastMessage[]) => void;
  clear: () => void;
};

const ToastContext = createContext<ToastAPI | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<Toast>(null);

  const api = useMemo<ToastAPI>(
    () => ({
      show: (message) => ref.current?.show(message as any),
      clear: () => ref.current?.clear(),
    }),
    [],
  );

  return (
    <ToastContext.Provider value={api}>
      <Toast ref={ref} />
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within <ToastProvider>");
  }
  return ctx;
}
