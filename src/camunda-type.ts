export enum CAMUNDA_TYPES {
  CAMUNDA7 = "camunda",
  OPERATON = "operaton",
}

export const ACTIVE_CAMUNDA_TYPE: CAMUNDA_TYPES =
  location.pathname.search("operaton/app/tasklist") === 1
    ? CAMUNDA_TYPES.OPERATON
    : CAMUNDA_TYPES.CAMUNDA7;
