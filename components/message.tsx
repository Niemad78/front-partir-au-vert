export function message(message: string): string {
  switch (message) {
    case "Unauthorized":
      return "Utilisateur ou mot de passe incorrect";
    default:
      return "Une erreur est survenue";
  }
}
