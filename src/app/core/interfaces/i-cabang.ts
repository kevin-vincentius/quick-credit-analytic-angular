import { IRegional } from "./i-regional";

export interface ICabang {
    idCabang: number; 
    namaCabang: string;
    idRegional: IRegional;
}