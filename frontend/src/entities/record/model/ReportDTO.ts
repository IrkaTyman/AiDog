import { UserDTO } from '@entities/user/model/UserDTO';

export type ReportDTO = {
    id: string;
    report: string;
    user: UserDTO;
};
