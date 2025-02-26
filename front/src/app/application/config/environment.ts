// export const environment = {
//     production: false,
//     apiUrl: 'http://localhost:3000',
//     api: {
//       signed: '/api/signed',
//       signedHistory: '/api/signed/history'
//     }
//   };
//   declare const process: any;

// revisar como manejar de mejor forma el tema de las urls en el entorno de desarrollo y produccion
export const environment = {
  production: false,
  apiUrl: process.env['NG_APP_API_URL'] || 'http://localhost:3000',
  api: {
    signed: process.env['NG_APP_SIGNED_PATH'] || '/api/signed',
    signedHistory: process.env['NG_APP_HISTORY_PATH'] || '/api/signed/history',
    auth: process.env['NG_APP_AUTH_PATH'] || '/api/auth',
  },
};
