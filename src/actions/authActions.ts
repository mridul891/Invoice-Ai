import { authClient } from "@/lib/auth-client";

export const handleSocialsignIn = async (provider: "google" | "github") => {
  await authClient.signIn.social({
    provider: provider,
    callbackURL: "/invoices/create",
  });
};

export const handleLogout = async () => {
  await authClient.signOut();
};

