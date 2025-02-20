import { IAkses } from "./i-akses";
import { ICabang } from "./i-cabang";

export interface IUser { 
    idUser: string; 
    akses: IAkses; 
    namaLengkap: string; 
    password: string;
    listCabang: ICabang[]; 
    createdAt: Date;
}