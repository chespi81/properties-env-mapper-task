import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

let taskPath = path.join(__dirname, '..', 'index.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tmr.setVariableName('JWT_SECRET_KEY', 'sEcREtKeY', true);
tmr.setVariableName('JWT_EXPIRATION_TIME', '3600000', true);
tmr.setInput('SOURCE_FILE', 'tests/sample-input.properties');
tmr.setInput('DEST_FILE', 'tests/sample-output.properties');

tmr.run();