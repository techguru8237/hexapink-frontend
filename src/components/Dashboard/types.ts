import { JSX } from "react";

interface SidebarItemType {
  type: string;
  label: string;
  link: string;
  icon: JSX.Element;
  selectedIcon: JSX.Element;
}

export type { SidebarItemType };
