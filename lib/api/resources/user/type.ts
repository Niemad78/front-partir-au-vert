import { BaseResult } from "@/lib/api/type";

export type Utilisateur = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
};

export enum Role {
  Admin = "admin",
  SuperAdmin = "super_admin",
}

export type UtilisateurResponse = BaseResult<Utilisateur> & {
  user: Utilisateur;
};

export type RoleResponse = BaseResult<Role> & {
  role: Role;
};

export type UtilisateurListeResponse = BaseResult<Utilisateur[]> & {
  users: Utilisateur[];
};

export type ModificationPassword = Omit<
  Utilisateur,
  "nom" | "prenom" | "email"
>;
export type ModificationEmail = Omit<
  Utilisateur,
  "nom" | "prenom" | "password"
>;
export type ModificationInfo = Omit<Utilisateur, "email" | "password">;

export type NouvelUtilisateur = Omit<Utilisateur, "id">;
