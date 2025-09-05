import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";
export const metadata = {
  tilte: "Edit profile",
};

export default async function Page() {
  const session = await auth();
  const guest = await getGuest(session.user.email);

  return (
    <div>
      <h2 className="font-semibold text-xl lg:text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-base lg:text-lg mb-6 lg:mb-8 text-primary-200 leading-relaxed">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
      <UpdateProfileForm guest={guest}>
        {/* The way that we use server component inside client component is by using it as children or passing it as prop to the client compoentn */}
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-4 lg:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-base lg:text-lg"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
