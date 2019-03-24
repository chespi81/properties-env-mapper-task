import { readFile, writeFile } from "fs";

export class PropertiesVariableMapper {

  private expression: RegExp;

  constructor(private source: string, private destination: string, private task: any, exp?: RegExp) {
    if (exp != null) {
      this.expression = exp;
    } else {
      this.expression = /\$\{([\w_]+)\}/gm;
    }
  }

  public replace(): void {
    readFile(this.source, (err, data: Buffer) => {
      if (err) {
        console.error('ERROR durante lectura de archivo:', err);
        this.task.setResult(this.task.TaskResult.Failed, err.message);
      } else {
        let input: string = data.toString();
        let output: string = input;
        let result = null;
        while (result = this.expression.exec(input)) {
          let param: string = result[1];
          let value: string = this.task.getVariable(param);
          if (value == null) {
            this.task.warning('Variable ' + param + ' not found.');
            value = '';
          }
          output = output.replace('${' + param + '}', value);
        }
        writeFile(this.destination, output, err => {
          if (err) {
            console.error('ERROR durante creacion de archivo:', err);
            this.task.setResult(this.task.TaskResult.Failed, err.message);
          }
        });
      }
    });
  }
}