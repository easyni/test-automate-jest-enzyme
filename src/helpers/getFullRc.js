import { existsSync, readFileSync } from "fs";

const testautomatercBase = JSON.parse(readFileSync(`${__dirname}/../../.testautomaterc`, 'utf8'));
const testautomaterc = (existsSync('./.testautomaterc') && JSON.parse(readFileSync('./.testautomaterc', 'utf8')) || null);

testautomatercBase.tests = testautomatercBase.tests.map((test) => ({
    ...test,
    processFile: `${__dirname}/../../${test.processFile}`
  })
);

export const fullRc = testautomaterc ? {...testautomatercBase, ...testautomaterc, tests: [...testautomatercBase.tests, ...testautomaterc.tests]}
  : {...testautomatercBase};

