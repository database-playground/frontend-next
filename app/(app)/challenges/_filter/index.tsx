"use client";

import SearchFilterSection from "./search";
import TagFilterSection, { type TagState } from "./tag";

export interface FilterSectionProps {
  search: string;
  setSearch: (search: string) => void;
  tags: TagState;
  setTags: (tags: TagState) => void;
}

export default function FilterSection({
  search,
  setSearch,
  tags,
  setTags,
}: FilterSectionProps) {
  return (
    <aside
      className={`
        flex flex-col gap-8 rounded bg-gray-100 p-6
        lg:min-h-[50dvh] lg:w-[25%]
      `}
    >
      <SearchFilterSection value={search} onChange={setSearch} />
      <TagFilterSection value={tags} onChange={setTags} />
    </aside>
  );
}
