import Image from "next/image";
import TextExpander from "./TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

function Cabin({ cabin }) {
  const { name, description, maxCapacity, image } = cabin;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-6 lg:gap-20 border border-primary-800 py-4 px-4 lg:py-3 lg:px-10 mb-12 lg:mb-24">
      {/* Image Section */}
      <div className="relative h-64 md:h-80 lg:h-auto lg:scale-[1.15] lg:-translate-x-3">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover rounded-lg lg:rounded-none"
        />
      </div>

      {/* Content Section */}
      <div className="lg:relative">
        <h3 className="text-accent-100 font-black text-4xl md:text-5xl lg:text-7xl mb-4 lg:mb-5 text-center lg:text-left lg:translate-x-[-254px] lg:bg-primary-950 lg:p-6 lg:pb-1 lg:w-[150%]">
          Cabin {name}
        </h3>

        <p className="text-base md:text-lg text-primary-300 mb-6 lg:mb-10 leading-relaxed">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-3 lg:gap-4 mb-6 lg:mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
            <span className="text-base md:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
            <span className="text-base md:text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
            <span className="text-base md:text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;
