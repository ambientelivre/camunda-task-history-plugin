# Task History Plugin

Esse plugin exibe os históricos das tarefas completadas durante a execução do processo

![image](https://github.com/ambientelivre/camunda-task-history-plugin/assets/89039740/fcb06574-9673-43cc-a4a9-7f6ae9d9e268)

![image](https://github.com/ambientelivre/camunda-task-history-plugin/assets/89039740/1c66c71c-7d25-485d-841c-3224371c44eb)

## Funcionalidades
- Histórico de tarefas completadas
- Histórico de alteração de variáveis por tarefa
- Deserializar variáveis do tipo objetos Java
- Variáveis do tipo JSON

## Requisitos

- Camunda Platform 7.20

## Instalação

1. Download do plugin
1. Descompactar
1. Mover **task-history** **server/apache-tomcat-9.0.75/webapps/camunda/app/tasklist/scripts**
1. Modifique o arquivo config.js adicionando o local do plugin
   - customScripts: [ "scripts/task-history/plugin.js" ]
1. Reinicie o Tomcat
