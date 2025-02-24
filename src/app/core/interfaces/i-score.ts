import { ICabang } from "./i-cabang";

export interface IScore {
    idScore?: number; 
    idCabang: ICabang; 
    bobotAngsThdPdpt: number; 
    bobotHasilGetContact: number; 
    bobotHasilSLIK: number; 
    bobotKarakter: number; 
    bobotKondisiTempatTinggal: number; 
    bobotStatusPekerjaan: number; 
    bobotStatusTempatTinggal: number;
    bobotTabThdAngs: number; 
    createdAt?: Date
    approvedBy?: string;
    modifiedAt?: Date
}