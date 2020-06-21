export interface WorkerMessage {
  __messageId: string;
  __messageType?: 'DATA' | 'COMPLETE';
  userData: any;
}
