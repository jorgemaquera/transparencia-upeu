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
  { value: 'tutoria_academica', label: 'Tutoría académica' },
  { value: 'investigacion_e_innovacion', label: 'Investigación e innovación' },
  { value: 'vinculacion_con_el_medio', label: 'Vinculación con el medio' },
  { value: 'formacion_integral', label: 'Formación integral' },
  {
    value: 'plan_maestro_de_desarrollo_espiritual',
    label: 'Plan maestro de desarrollo espiritual',
  },
  {
    value: 'practicas_pre_profesionales',
    label: 'Prácticas Pre-Profesionales',
  },
  {
    value: 'diseno_y_evaluacion_curricular',
    label: 'Diseño y evaluación curricular',
  },
];

export const TYPES = [
  { value: 'acta', label: 'Acta' },
  { value: 'resolucion', label: 'Resolución' },
];
