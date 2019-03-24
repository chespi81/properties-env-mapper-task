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
      let input: string = data.toString();
      let output: string = input;
      let result = null;
      while (result = this.expression.exec(input)) {
        let param: string = result[1];
        let value: string = this.task.getVariable(param);
        if (value == null) {
          value = '';
        }
        output = output.replace('${' + param + '}', value);
      }
      writeFile(this.destination, output, error => {
        if (error) {
          console.error('ERROR durante creacion de archivo:', error);
        }
      });
    });
  }
}