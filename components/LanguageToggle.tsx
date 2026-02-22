"use client";

import { useI18n } from "@/lib/i18n";
import { Language } from "@/lib/types";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageToggle() {
  const { language, setLanguage } = useI18n();

  return (
    <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
      <SelectTrigger className="w-[120px] h-8 bg-zinc-900 border-zinc-800 text-zinc-300 focus:ring-0 focus:ring-offset-0">
        <div className="flex items-center">
          <Globe className="h-4 w-4 mr-2 text-zinc-400" />
          <SelectValue placeholder="Language" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300" position="popper" align="end" sideOffset={4}>
        <SelectItem value="en" className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer">English</SelectItem>
        <SelectItem value="zh" className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer">简体中文</SelectItem>
      </SelectContent>
    </Select>
  );
}
