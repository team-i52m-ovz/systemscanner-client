import {INewInstance} from '../../models/interfaces/new-instanse.interface';
import {IReport, IReportResponse} from '../../models/interfaces/report.interface';
import {IComputerSystem, IDetailedReport, IHardware, IWin32Product} from '../../models/interfaces/detailed-report.interface';
import {IWin32Bios} from '../../models/interfaces/win32-bios.interface';
import {IWin32Baseboard} from '../../models/interfaces/win32-baseboard.interface';

export class Mapper {

  constructor() {
  }

  public static mapInstancesToAdminINewInstances(instances: any): INewInstance[] {
    return instances.map(el => this.mapInstancesToAdminINewInstances(el));
  }

  public static mapNewInstanceToINewInstance(newInstance: any): INewInstance {
    return <INewInstance>{
      pid: newInstance.pid,
      name: newInstance.name,
      users: newInstance.assignees
    };
  }

  public static mapReportResponseToIReportResponse(response: any): IReportResponse {
    return <IReportResponse>{
      isLast: response.last,
      pageNumber: response.pageable.pageNumber,
      reports: this.mapReportsToIReports(response.content)
    };
  }

  public static mapReportsToIReports(reports: { createdAt: string, id: string, scannerPid: string }[]): IReport[] {
    return reports.map(report => this.mapReportToIReport(report));
  }

  public static mapReportToIReport(report: { createdAt: string, id: string, scannerPid: string }): IReport {
    return <IReport>{
      createdAt: new Date(report.createdAt),
      id: report.id,
      scannerPid: report.scannerPid
    };
  }

  public static mapWin32BiosToIWin32Bios(winInfo: any): IWin32Bios {
    return <IWin32Bios>{
      BuildNumber: winInfo.BuildNumber || '',
      CodeSet: winInfo.CodeSet || '',
      CurrentLanguage: winInfo.CurrentLanguage || '',
      Description: winInfo.Description || '',
      EmbeddedControllerMajorVersion: winInfo.EmbeddedControllerMajorVersion || '',
      EmbeddedControllerMinorVersion: winInfo.EmbeddedControllerMinorVersion || '',
      InstallDate: winInfo.InstallDate || '',
      Manufacturer: winInfo.Manufacturer || '',
      Name: winInfo.Name || '',
      PrimaryBIOS: winInfo.PrimaryBIOS || '',
      SerialNumber: winInfo.SerialNumber || '',
      SoftwareElementID: winInfo.SoftwareElementID || '',
      SystemBiosMajorVersion: winInfo.SystemBiosMajorVersion || '',
      SystemBiosMinorVersion: winInfo.SystemBiosMinorVersion || '',
      TargetOperatingSystem: winInfo.TargetOperatingSystem || '',
      Version: winInfo.Version
    };
  }

  public static mapWin32BiosArrayToIWin32BiosArray(winInfoArray: any[]): IWin32Bios[] {
    return winInfoArray.map(winInfo => this.mapWin32BiosToIWin32Bios(winInfo));
  }

  public static mapWin32BaseboardToIWin32Baseboard(winInfo: any): IWin32Baseboard {
    return <IWin32Baseboard>{
      Depth: winInfo.Depth || '',
      Description: winInfo.Description || '',
      Height: winInfo.Height || '',
      HostingBoard: winInfo.HostingBoard || '',
      InstallDate: winInfo.InstallDate || '',
      Manufacturer: winInfo.Manufacturer || '',
      Model: winInfo.Model || '',
      Name: winInfo.Name || '',
      PartNumber: winInfo.PartNumber || '',
      PoweredOn: winInfo.PoweredOn || '',
      Product: winInfo.Product || '',
      Removable: winInfo.Removable || '',
      Replaceable: winInfo.Replaceable || '',
      RequirementsDescription: winInfo.RequirementsDescription || '',
      RequiresDaughterBoard: winInfo.RequiresDaughterBoard || '',
      SerialNumber: winInfo.SerialNumber || '',
      SpecialRequirements: winInfo.SpecialRequirements || '',
      Status: winInfo.Status || '',
      Weight: winInfo.Weight || '',
      Width: winInfo.Width || ''
    };
  }

  public static mapWin32BaseboardArrayToIWin32BaseboardArray(winInfoArray: IWin32Baseboard[]) {
    return winInfoArray.map(winInfo => this.mapWin32BaseboardToIWin32Baseboard(winInfo));
  }

  public static mapDetailedReportToIDetailedReport(report: any): IDetailedReport {
    return <IDetailedReport>{
      Hardware: {
        Win32_BIOS: this.mapWin32BiosArrayToIWin32BiosArray(report.Hardware.Win32_BIOS),
        Win32_BaseBoard: this.mapWin32BaseboardArrayToIWin32BaseboardArray(report.Hardware.Win32_BaseBoard)
      },
      operatingSystem: {
        Win32_ComputerSystem: report['Operating System'].Win32_ComputerSystem.map(el => <IComputerSystem>el)
      },
      installedSoftware: {
        Win32_Product: report['Installed Software'].Win32_Product.map(el => <IWin32Product>el)
      },
      createdAt: new Date(report.createdAt) || '',
      id: report.id || '',
      name: report.name || '',
      scannerPid: report.scannerPid || ''
    };
  }
}
