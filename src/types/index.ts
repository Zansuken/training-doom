import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type UserDetailsType = {
  birthDate: string;
  currentWeight: number;
  height: number;
  id?: string;
  nickname?: string;
};
