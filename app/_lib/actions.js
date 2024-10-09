"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

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

export async function createReservation(initialBookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("Not authenticated, please login");

  // if we had many fields in in the form then instead of doing formData.get('') for each of them we wcould use the following code:
  // Object.entries(FormData.entry()).reduce((acc, [key, value]) => ({...acc, [key]: value}), {})

  const x = Object.entries(formData.entries()).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {}
  );

  const bookingData = {
    ...initialBookingData,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    guestId: session.user.guestId,
    extrasPrice: 0,
    totalPrice: initialBookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([bookingData]);

  if (error) throw new Error("Booking could not be created");
  revalidatePath(`/cabins/${initialBookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function updateReservation(formData) {
  // Authentication
  const session = await auth();
  if (!session) throw new Error("Not authenticated, please login");
  // Authorization
  const bookingId = Number(formData.get("bookingId"));
  const bookings = await getBookings(session.user.guestId);
  const bookingIds = bookings.map((booking) => booking.id);

  if (!bookingIds.includes(bookingId)) {
    throw new Error("You are not authorized to update this booking");
  }

  // Update data
  const updateData = {
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
  };

  // Mutation
  const { data, error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be updated");

  //Revalidateion and redirecting
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);
  const bookingIds = bookings.map((booking) => booking.id);

  // Dont allow user to delete booking that is not his, by doings some hack in the url
  if (!bookingIds.includes(bookingId)) {
    throw new Error("You are not authorized to delete this booking");
  }

  if (!session) throw new Error("Not authenticated, please login");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");
  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
