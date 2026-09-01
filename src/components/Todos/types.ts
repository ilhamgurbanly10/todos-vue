import type { Orders } from "../../types/pagination";

export interface ModelReturn {
    handleOrder: (value: Orders) => void;
}