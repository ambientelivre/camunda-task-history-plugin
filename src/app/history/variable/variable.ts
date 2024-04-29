export interface Variable {
  id: string;
  name: string;
  type: string;
  value: string;
  valueInfo: ValueInfo;
  processDefinitionKey: string;
  processDefinitionId: string;
  processInstanceId: string;
  executionId: string;
  activityInstanceId: string;
  caseDefinitionKey: null;
  caseDefinitionId: null;
  caseInstanceId: null;
  caseExecutionId: null;
  taskId: null;
  tenantId: null;
  errorMessage: null;
  state: string;
  createTime: string;
  removalTime: string;
  rootProcessInstanceId: string;
}

export interface ValueInfo {}
