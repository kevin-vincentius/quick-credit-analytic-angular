import { ICabang } from "./i-cabang";
import { IUser } from "./i-user";

export interface IFormPerubahan {
    idFormPerubahanBobotScore?: number;
    idCabang: any;
    newbobotTabThdAngs: number;
    newBobotAngsThdPdpt: number;
    newBobotStatusPekerjaan: number;
    newBobotStatusTempatTinggal: number;
    newBobotKondisiTempatTinggal: number;
    newBobotKarakter: number;
    newBobotHasilGetContact: number;
    newBobotHasilSLIK: number;
    createdAt?: Date;
    createdBy?: IUser;
    modifiedBy?: IUser | null;
    statusFormPerubahan?: string; 
}