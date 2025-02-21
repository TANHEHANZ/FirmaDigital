export interface loginPeyload {
  email: string;
  password: string;
}
export interface RegisterPeyload {
  is_active: string;
  name: string;
  password: string;
  ci: string;
  institucion: string;
  unidad: string;
  cargo: string;
  tipo_user: string;
  idRol: string | null;
}
