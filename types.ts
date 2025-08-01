
export enum CheckStatus {
  UP = 'UP',
  DOWN = 'DOWN',
  CHECKING = 'CHECKING',
  IDLE = 'IDLE',
  ERROR = 'ERROR'
}

export interface CheckResult {
  status: CheckStatus;
  domain: string;
  ipAddress?: string;
  responseTime?: number;
  location?: string;
  timestamp: string;
  error?: string;
}
