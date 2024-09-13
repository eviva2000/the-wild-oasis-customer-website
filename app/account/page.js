import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};
export default async function Page() {
  const session = await auth();
  const firstname = session.user.name.split(" ")[0];
  return <h1>Welcome, {firstname}</h1>;
}
