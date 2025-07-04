// // middleware.ts
// export function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;
  
//   if (pathname.startsWith('/healthcare')) {
//     // Vérifier si l'utilisateur est un professionnel de santé
//     return checkHealthcareRole(request);
//   }
  
//   if (pathname.startsWith('/citizen')) {
//     // Vérifier si l'utilisateur est un citoyen
//     return checkCitizenRole(request);
//   }
// }