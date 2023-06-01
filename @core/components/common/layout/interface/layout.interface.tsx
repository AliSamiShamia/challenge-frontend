import { ReactNode } from "react";

export default interface LayoutInterface {
    head: string,
    page: string,
    children: ReactNode
}