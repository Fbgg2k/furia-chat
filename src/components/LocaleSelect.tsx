import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LocaleSelectProps {
  locale: string;
  onLocaleChange: (locale: string) => void;
}

export function LocaleSelect({ locale, onLocaleChange }: LocaleSelectProps) {
  return (
    <Select onValueChange={onLocaleChange} defaultValue={locale}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Locale" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pt-BR">pt-BR</SelectItem>
        <SelectItem value="en-US">en-US</SelectItem>
      </SelectContent>
    </Select>
  );
}