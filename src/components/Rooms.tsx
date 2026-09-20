import { Photo } from "./Photo";
import { RoomCard } from "./RoomCard";
import { roomAmenities, rooms, site } from "@/data/site";

export function Rooms() {
  return (
    <section id="acomodacoes" className="relative bg-cream-200 px-5 pb-28 pt-28 sm:px-10 lg:pb-40 lg:pt-40">
      <span className="scallop-top" style={{ ["--scallop" as string]: "var(--color-cream-200)" }} aria-hidden="true" />
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p data-reveal className="eyebrow mb-6 text-brick-600">
              Acomodações
            </p>
            <h2 data-split className="display text-[clamp(2.8rem,6.4vw,5.6rem)] text-navy-900">
              Quartos para descansar de verdade.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p data-reveal className="max-w-md text-navy-800/90">
              Todos os quartos têm banheiro privativo, TV, chaleira elétrica e Wi-Fi gratuito, com vista para o jardim.
            </p>
            <ul data-reveal className="mt-5 flex flex-wrap gap-2">
              {roomAmenities.map((a) => (
                <li key={a} className="rounded-full border border-navy-900/20 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.14em] text-navy-800">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:mt-24 lg:gap-x-12 lg:gap-y-16">
          {rooms.map((room, i) => (
            <div key={room.slot} data-reveal className={i % 2 === 1 ? "sm:mt-20" : ""}>
              <RoomCard index={i} name={room.name} beds={room.beds} text={room.text} href={site.booking}>
                <Photo slot={room.slot} scene={room.scene} alt={room.name} raised />
              </RoomCard>
            </div>
          ))}
        </div>

        <p data-reveal className="mx-auto mt-16 max-w-xl text-center text-sm text-navy-800/70">
          Valores e disponibilidade em tempo real, sempre pelos canais oficiais de reserva.
        </p>
        <div data-reveal className="mt-6 flex justify-center">
          <a href={site.booking} target="_blank" rel="noopener noreferrer" className="btn btn-ink" data-magnetic>
            Consultar datas e valores
          </a>
        </div>
      </div>
    </section>
  );
}
