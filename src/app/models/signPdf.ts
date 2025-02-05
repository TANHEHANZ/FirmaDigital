export interface point {
  x: number;
  y: number;
}
export interface peyload_pdf {
  slot: number;
  pin: string;
  alias: string;
  bloquear?: boolean;
  pdf: string;
  point?: point;
  image?: string;
}
