import tl = require('azure-pipelines-task-lib/task');
import { PropertiesVariableMapper } from './mapper/properties-variable-mapper';

async function run() {
  try {
    const sourceFile: string = tl.getInput('SOURCE_FILE', true);
    console.log('SOURCE_FILE', sourceFile);

    const destFile: string = tl.getInput('DEST_FILE', true);
    console.log('DEST_FILE', destFile);

    let mapper: PropertiesVariableMapper = new PropertiesVariableMapper(sourceFile, destFile, tl);
    mapper.replace();
  }
  catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();