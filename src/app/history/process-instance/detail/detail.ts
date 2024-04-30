export interface Detail {
  type: string;
  id: string;
  processDefinitionKey: string;
  processDefinitionId: string;
  processInstanceId: string;
  activityInstanceId: string;
  executionId: string;
  caseDefinitionKey: null;
  caseDefinitionId: null;
  caseInstanceId: null;
  caseExecutionId: null;
  taskId: null | string;
  tenantId: null;
  userOperationId: string;
  time: string;
  removalTime: null;
  rootProcessInstanceId: string;
  variableName?: string;
  variableInstanceId?: string;
  variableType?: string;
  value?: any;
  valueInfo?: ValueInfo;
  initial?: boolean;
  revision?: number;
  errorMessage?: null;
  fieldId?: string;
  fieldValue?: string;
}

export interface ValueInfo {}
