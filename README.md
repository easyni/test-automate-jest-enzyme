# README

[![CircleCI](https://circleci.com/gh/easyni/test-automate-jest-enzyme/tree/master.svg?style=svg)](https://circleci.com/gh/easyni/test-automate-jest-enzyme/tree/master)

⚠️ ⚠️ ⚠️ 
this project is WIP.
⚠️ ⚠️ ⚠️ 
## Basic install & use
### node version 8

this project have the objective to create automatically test files with template bases.

### HOW TO USE

just install npx globaly

 
```bash 

npm install -g npx

```
and launch: 
 
```bash 

npx git+https://github.com/easyni/test-automate-jest-enzyme.git

```

you can add your own processors in addition to existing ones with an .testautomaterc

```json
{
  "tests": [
    {
      "name": "component",
      "label": "component (jest enzyme)",
      "processFile": "./lib/process/componentProcess.js"
    },
    {
      "name": "function",
      "label": "function (jest)",
      "processFile": "./lib/process/functionProcess.js"
    },
    {
      "name": "reducer",
      "label": "reducer (jest)",
      "processFile": "./lib/process/reducerProcess.js"
    },
    {
      "name": "action-redux",
      "label": "action redux (jest)",
      "processFile": "./lib/process/actionProcess.js"
    }
  ]
}
```

  **name** > must be an unique key
  
  **label** > label is displayed during the information collect
   
  **processFile** > the script will receive all the files, and generate your test file.

 ⚠️ ⚠️ ⚠️ 
 
 processFile must export a function named **processFiles** as 
 
 ```js

export const processFiles = ({filePath, fileName}) => {
    //... do what you want
}
 ```
 ## CURRENTLY AVAILABLE
 
| Process            | available|
|--------------------|----------|
|component           |   yes    |
|function            |    no    |
|reducer             |    no    |
|action redux        |    no    |

## ROAD MAP

| Version   |  description                                       |
|-----------|----------------------------------------------------|
| 0.0       | optimise the processing files system               |
| 0.1.0     | add possibility to override presets in the rc file |
| 0.1.1     | make the process for testing functions             |
| 0.1.2     | make the process for testing reducers              |
| 0.1.3     | make the process for testing actions redux         |

