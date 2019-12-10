import {IWin32Bios} from './win32-bios.interface';
import {IWin32Baseboard} from './win32-baseboard.interface';

export interface IDetailedReport {
  Hardware: IHardware;
  'operatingSystem': {
    Win32_ComputerSystem: IComputerSystem[];
  };
  'installedSoftware': {
    Win32_Product: IWin32Product[]
  };
  name: string;
  createdAt: string;
  id: string;
}

export interface IWin32Product {
  InstallLocation: string;
  Name: string;
  Vendor: string;
  Version: string;
}

export interface IHardware {
  Win32_BaseBoard: IWin32Baseboard[];
  Win32_BIOS: IWin32Bios[];
}

export interface IComputerSystem {
  AdminPasswordStatus: string;
  BootupState: string;
  Caption: string;
  CreationClassName: string;
  DNSHostName: string;
  Domain: string;
  LastLoadInfo: string;
  Manufacturer: string;
  Model: string;
  Name: string;
  NetworkServerModeEnabled: string;
  NumberOfLogicalProcessors: string;
  NumberOfProcessors: string;
  PowerManagementSupported: string;
  PrimaryOwnerName: string;
  SystemFamily: string;
  UserName: string;
  WakeUpType: string;
  Workgroup: string;
  dnshostName: string;
}
