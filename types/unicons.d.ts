declare module "@iconscout/react-unicons/icons/*" {
  import type { ComponentType, SVGProps } from "react";

  const Icon: ComponentType<
    { color?: string; size?: number | string } & SVGProps<SVGSVGElement>
  >;
  export default Icon;
}
