// src/types/react-to-print.d.ts
import "react-to-print";

declare module "react-to-print" {
  interface UseReactToPrintOptions {
    content: () => React.ReactInstance | HTMLElement | null;
    documentTitle?: string;
    onAfterPrint?: () => void;
    onBeforePrint?: () => void;
    removeAfterPrint?: boolean;
  }
}
