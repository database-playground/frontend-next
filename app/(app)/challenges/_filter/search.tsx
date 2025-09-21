import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export interface SearchFilterSectionProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchFilterSection({ value, onChange }: SearchFilterSectionProps) {
    return (
        <div className="space-y-2">
            <label className="flex items-center gap-2 font-bold">
                <SearchIcon className="size-4" />
                搜尋
            </label>
            <Input type="text" placeholder="搜尋" value={value} onChange={(e) => onChange(e.target.value)} />
            <p className="text-sm text-muted-foreground"> 
                可以搜尋題目標題、題幹內容，或者是類別。
            </p>
        </div>
    )
}
