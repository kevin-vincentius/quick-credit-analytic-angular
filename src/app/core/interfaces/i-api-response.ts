export interface IApiResponse<T = any> {
  success: boolean;
  status: number;
  message: string;
  timestamp: Date;
  data: T | null;
}
