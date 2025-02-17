export interface loginPeyload {
  email: string;
  password: string;
}
export interface RegisterPeyload {
  name: string;
  password: string;
  email: string;
  ci: string;
  tipo_user: 'Juridica' | 'Natural';
  idRol: string | null;
  idUnidad: string;
}
