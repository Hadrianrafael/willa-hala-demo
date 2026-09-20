import { photoSrc } from "@/lib/photos";
import type { Scene } from "@/data/site";
import { Media } from "./Media";

type Props = {
  slot: string;
  scene: Scene;
  alt: string;
  className?: string;
  priority?: boolean;
  showLabel?: boolean;
  raised?: boolean;
};

/** Componente de servidor: resolve, no build, se existe public/photos/<slot>.* */
export function Photo({ slot, ...rest }: Props) {
  return <Media src={photoSrc(slot)} {...rest} />;
}
