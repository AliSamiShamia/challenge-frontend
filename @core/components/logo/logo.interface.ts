import { number } from "prop-types"

export default interface LogoInterface {
    active: string | "home",
    height: number,
    width: number,
    onClick: () => void,
    name: string
}
