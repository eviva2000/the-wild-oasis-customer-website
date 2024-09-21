"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function updateProfile(formData) {
  const session = await auth();

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
  //built-in function in Next.js to revalidate the data
  revalidatePath("/account/profile"); // if we use /account all sub-pages of /account will be revalidated but we don't need it here. We only need /account/profile to be revalidated
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
