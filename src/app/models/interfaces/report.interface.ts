export interface IReportResponse {
  isLast: boolean;
  pageNumber: number;
  reports: IReport[];
}

export interface IReport {
  createdAt: Date;
  id: string;
  scannerPid: string;
}
