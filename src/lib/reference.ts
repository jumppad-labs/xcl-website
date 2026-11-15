// The shape of a language package's reference data, which the package's
// release generates and scripts/fetch-reference.mjs fetches before each build.
// Python and TypeScript share it; TypeScript adds `overloads`.

export interface ReferenceParameter {
  name: string;
  type?: string;
  default?: string;
  description?: string;
}

export interface ReferenceReturns {
  type?: string;
  description?: string;
}

export interface ReferenceRaises {
  type: string;
  description?: string;
}

/** One form of a name with two or more signatures, or a value and a type of one name. */
export interface ReferenceOverload {
  signature: string;
  description?: string;
  parameters?: ReferenceParameter[];
  returns?: ReferenceReturns;
  raises?: ReferenceRaises[];
}

export interface ReferenceEntry {
  id: string;
  name: string;
  kind: string;
  label?: string;
  signature?: string;
  description: string;
  parameters?: ReferenceParameter[];
  returns?: ReferenceReturns;
  raises?: ReferenceRaises[];
  inheritedFrom?: string;
  members?: ReferenceEntry[];
  overloads?: ReferenceOverload[];
}

export interface ReferenceSection {
  id: string;
  title: string;
  entries: ReferenceEntry[];
}

export interface Reference {
  schema: number;
  language: string;
  package: string;
  version: string;
  sections: ReferenceSection[];
}

/** The ids of every entry and member in `reference`. */
export function entryIds(reference: Reference): Set<string> {
  const ids = new Set<string>();
  const collect = (entry: ReferenceEntry): void => {
    ids.add(entry.id);
    entry.members?.forEach(collect);
  };
  reference.sections.forEach((section) => section.entries.forEach(collect));
  return ids;
}
