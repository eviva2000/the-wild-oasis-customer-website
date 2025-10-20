import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="border border-primary-800 overflow-hidden">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={`Cabin ${name}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute top-3 right-3">
            {isPast(new Date(startDate)) ? (
              <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                past
              </span>
            ) : (
              <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                upcoming
              </span>
            )}
          </div>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="text-lg font-semibold">
            {numNights} nights in Cabin {name}
          </h3>

          <p className="text-sm text-primary-300 leading-relaxed">
            {format(new Date(startDate), "EEE, MMM dd yyyy")} (
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}
            ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
          </p>

          <div className="flex flex-wrap gap-3 items-center">
            <p className="text-lg font-semibold text-accent-400">
              ${totalPrice}
            </p>
            <p className="text-primary-300">&bull;</p>
            <p className="text-sm text-primary-300">
              {numGuests} guest{numGuests > 1 && "s"}
            </p>
          </div>

          <p className="text-xs text-primary-400">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>

          {!isPast(startDate) && (
            <div className="flex gap-2 pt-2 border-t border-primary-800">
              <Link
                href={`/account/reservations/edit/${id}`}
                className="flex-1 group flex items-center justify-center gap-2 uppercase text-xs font-bold text-primary-300 py-3 px-4 hover:bg-accent-600 transition-colors hover:text-primary-900 border border-primary-700 rounded"
              >
                <PencilSquareIcon className="h-4 w-4 text-primary-600 group-hover:text-primary-800 transition-colors" />
                <span>Edit</span>
              </Link>
              <div className="flex-1">
                <DeleteReservation bookingId={id} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        <div className="relative h-32 aspect-square">
          <Image
            src={image}
            alt={`Cabin ${name}`}
            fill
            sizes="128px"
            className="object-cover border-r border-primary-800"
          />
        </div>

        <div className="flex-grow px-6 py-3 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {numNights} nights in Cabin {name}
            </h3>
            {isPast(new Date(startDate)) ? (
              <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                past
              </span>
            ) : (
              <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                upcoming
              </span>
            )}
          </div>

          <p className="text-lg text-primary-300">
            {format(new Date(startDate), "EEE, MMM dd yyyy")} (
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}
            ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
          </p>

          <div className="flex gap-5 mt-auto items-baseline">
            <p className="text-xl font-semibold text-accent-400">
              ${totalPrice}
            </p>
            <p className="text-primary-300">&bull;</p>
            <p className="text-lg text-primary-300">
              {numGuests} guest{numGuests > 1 && "s"}
            </p>
            <p className="ml-auto text-sm text-primary-400">
              Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
            </p>
          </div>
        </div>

        <div className="flex flex-col border-l border-primary-800 w-[100px]">
          {!isPast(startDate) ? (
            <>
              <Link
                href={`/account/reservations/edit/${id}`}
                className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
              >
                <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
                <span className="mt-1">Edit</span>
              </Link>
              <DeleteReservation bookingId={id} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ReservationCard;
