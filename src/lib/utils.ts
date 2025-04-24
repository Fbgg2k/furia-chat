import ptBR from "@/locales/pt-BR.json";
import enUS from "@/locales/en-US.json";

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAppTitle(locale: string): string {
    switch (locale) {
        case "pt-BR":
            return ptBR["app-title"];
        case "en-US":
            return enUS["app-title"];
        default:
            return enUS["app-title"];
    }
}
