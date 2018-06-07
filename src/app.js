import { questions } from './questions';
import { processFiles } from './processFiles';

function startApp() {
  questions()
    .then((answers) => {
      processFiles(answers)
    }).catch((error) => {
    if(error) {
      throw error;
    }
    startApp()
  });
}

startApp();
