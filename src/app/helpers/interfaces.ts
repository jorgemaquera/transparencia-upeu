export interface SearchParams {
  index: string;
  orderBy?: string | null;
  order?: string | null;
  search: {
    page: number;
    hitsPerPage: number;
    query?: string | null;
    filters?: any[];
    filterComparator?: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export const AREAS = [
  { value: 'proyeccion_social', label: 'Proyección Social' },
  { value: 'investigacion', label: 'Investigación' },
];

export const TYPES = [
  { value: 'acta', label: 'Acta' },
  { value: 'resolucion', label: 'Resolución' },
  { value: 'acuerdo', label: 'Acuerdo' },
];
