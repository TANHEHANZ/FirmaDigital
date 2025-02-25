export interface resJacubitus<T> {
  finalizado: boolean;
  mensaje: string;
  datos: T;
}
export interface datosList {
  connected: boolean;
  tokens: dataToken[];
}

interface dataToken {
  alias: string;
  slot: string;
  name: string;
  model: string;
  token: string;
}
export interface dataPdf {
  pdf_firmado: string;
}
