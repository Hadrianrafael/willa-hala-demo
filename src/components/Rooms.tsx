import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { TiltFrame } from "./RoomCard";
import { roomAmenities, rooms, site } from "@/data/site";

export function Rooms() {
  return (
    <section id="acomodacoes" className="bg-white px-5 py-28 sm:px-10 lg:py-40">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <p data-reveal className="label">
              02 · Acomodações
            </p>
            <h2 data-split className="display mt-8 text-[clamp(3rem,6.6vw,6rem)] leading-[0.98]">
              Quartos para descansar de verdade.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p data-reveal className="text-ink">
              Todos os quartos têm banheiro privativo, TV, chaleira elétrica e Wi-Fi gratuito, com vista para o jardim.
            </p>
            <ul data-reveal className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[0.72rem] uppercase tracking-[0.14em] text-mute">
              {roomAmenities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          {rooms.map((room, i) => (
            <article key={room.slot} className="grid items-center gap-8 border-t border-line py-12 lg:grid-cols-12 lg:gap-x-10 lg:py-20">
              <div data-reveal className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-2 lg:col-start-6" : ""}`}>
                <TiltFrame className="aspect-[5/4] w-full">
                  <Photo slot={room.slot} scene={room.scene} alt={room.name} />
                </TiltFrame>
              </div>
              <div data-reveal className={`lg:col-span-4 ${i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`}>
                <p className="small-caps text-mute">
                  {String(i + 1).padStart(2, "0")} / {String(rooms.length).padStart(2, "0")}
                </p>
                <h3 className="display mt-4 text-[clamp(2.2rem,3.6vw,3.4rem)] leading-[1.02]">{room.name}</h3>
                <p className="mt-3 small-caps text-navy-800">{room.beds}</p>
                <p className="mt-5 max-w-sm text-ink">{room.text}</p>
                <a href={site.booking} target="_blank" rel="noopener noreferrer" className="link-line mt-8">
                  Ver disponibilidade <Icon name="arrow" className="h-4 w-4" />
                  <span className="sr-only"> — {room.name}, abre o Booking.com em nova aba</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
