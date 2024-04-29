export interface Task {
  id: string;
  processDefinitionId: string;
  processInstanceId: string;
  executionId: string;
  caseDefinitionId: string;
  caseInstanceId: string;
  caseExecutionId: string;
  activityInstanceId: string;
  name: string;
  description: string;
  deleteReason: string;
  owner: string;
  assignee: string;
  startTime: string;
  endTime: string;
  duration: number;
  taskDefinitionKey: string;
  priority: number;
  due: string;
  parentTaskId: string;
  "followUp:": string;
  tenantId: null;
  removalTime: string;
  rootProcessInstanceId: string;

}
