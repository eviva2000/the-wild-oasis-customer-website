import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";
import Cabin from "@/app/_components/Cabin";

export const generateMetadata = async ({ params }) => {
  const cabin = await getCabin(params.cabinId);

  return {
    title: `Cabin ${cabin.name}`,
    description: cabin.description,
  };
};

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
  return ids;
}

async function page({ params }) {
  const cabin = await getCabin(params.cabinId);

  const { name } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-4 md:mt-8 px-4 md:px-0">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-6 md:mb-10 text-accent-400 px-4">
          Reserve {name} today. Pay on arrival.
        </h2>
        {/* // in the meantime time that the data is comming into reservation /while the reservation is suspending we render the Spinner */}
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}

export default page;
