import { unstable_noStore as noStore } from "next/cache";
import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

async function CabinList({ filter }) {
  // By calling function noStore() we opt out from data caching. So it s uncached data fetching and it will be rendered dynamically.
  // noStore();
  const cabins = await getCabins();
  let dispalyedCabins;
  switch (filter) {
    case "small":
      dispalyedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 2);
      break;
    case "medium":
      dispalyedCabins = cabins.filter(
        (cabin) => cabin.maxCapacity > 2 && cabin.maxCapacity <= 4
      );
      break;
    case "large":
      dispalyedCabins = cabins.filter((cabin) => cabin.maxCapacity > 4);
      break;
    default:
      dispalyedCabins = cabins;
  }

  if (cabins.length === 0) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {dispalyedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
