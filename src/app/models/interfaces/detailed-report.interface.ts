import {IWin32Bios} from './win32-bios.interface';
import {IWin32Baseboard} from './win32-baseboard.interface';

export interface IDetailedReport {
  Win32_BIOS: IWin32Bios[];
  Win32_Baseboard: IWin32Baseboard[];
  Win32_ComputerSystem: string;
  createdAt: string;
  id: string;
}
