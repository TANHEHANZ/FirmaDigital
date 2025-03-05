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

export interface Firma {
  noModificado: boolean;
  cadenaConfianza: boolean;
  firmadoDuranteVigencia: boolean;
  firmadoAntesRevocacion: boolean;
  versionado: boolean;
  timeStamp: boolean;
  fechaFirma: string;
  certificado: Certificado;
}

export interface Certificado {
  ci: string;
  nombreSignatario: string;
  cargoSignatario: string;
  organizacionSignatario: string;
  emailSignatario: string;
  nombreECA: string;
  descripcionECA: string;
  inicioValidez: string;
  finValidez: string;
  revocado: boolean | null;
  numeroSerie: string;
}

export interface DatosFirmas {
  firmas: Firma[];
}
