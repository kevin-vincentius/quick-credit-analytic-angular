import { IMobileEntry } from "./i-mobile-entry";
import { IScore } from "./i-score";
import { IUser } from "./i-user";

export interface IFormQUCA { 
    idFormQUCA?: number;
    mid: any;
    idScore?: IScore;
    idMarketingOfficer?: string;
    statusQUCA?: string;
    tabThdAngs: number | null;
    angsThdPdpt: number | null;
    statusPekerjaan: number | null;
    statusTempatTinggal: number | null;
    kondisiTempatTinggal: number | null;
    karakterDiLingkungan: number | null;
    hasilGetContact: number | null;
    hasilSLIK: number | null;
    totalScore?: number | null;
    notes?: string | null;
    approvedBy?: string | null;
    createdAt?: Date | null;
    modifiedAt?: Date | null;
}