import { ICabang } from "./i-cabang";
import { IShowroom } from "./i-showroom";
import { IUser } from "./i-user";

export interface IMobileEntry { 
    namaKonsumen: string; 
    idCabang: ICabang; 
    idShowroom: IShowroom;
    idMarketingOfficer: IUser;
    pendapatan: number; 
    angsuran: number; 
    tabungan: number; 
    mid: number;
}