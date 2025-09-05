import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};
export default async function Page() {
  const session = await auth();
  const firstname = session.user.name.split(" ")[0];
  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-semibold text-accent-400 mb-4">
        Welcome, {firstname}
      </h1>
      <p className="text-base lg:text-lg text-primary-200">
        Manage your reservations and profile from the navigation above.
      </p>
    </div>
  );
}
