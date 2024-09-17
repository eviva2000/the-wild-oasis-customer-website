"use server";

import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function updateProfile(formData) {
  const session = await auth();
  console.log("session from actions @@@@@", session);
  // In server actions we dont use try catch block
  if (!session) throw new Error("Not authenticated, please login");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const nationalIdPattern = /^[a-zA-Z0-9]{6,12}$/;
  if (!nationalIdPattern.test(nationalID))
    throw new Error("Invalid national ID");
  const updateData = { nationalID, nationality, countryFlag };
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
