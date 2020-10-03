import * as _ from "lodash";
// import * as changeCase from "change-case";
import * as mkdirp from "mkdirp";

import { InputBoxOptions, OpenDialogOptions, Uri, window } from "vscode";
import { existsSync, lstatSync, writeFile } from "fs";

export const newModule = async (uri: Uri) => {
  const moduleName = await promptForModuleName();
  console.log(moduleName);
  if (_.isNil(moduleName) || moduleName.trim() === "") {
    window.showErrorMessage("The module name must not be empty");
    return;
  }

  let targetDirectory;
  if (_.isNil(_.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
    targetDirectory = await promptForTargetDirectory();
    if (_.isNil(targetDirectory)) {
      window.showErrorMessage("Please select a valid directory");
      return;
    }
  } else {
    targetDirectory = uri.fsPath;
  }
  //   console.log(targetDirectory); - works
  const pascalCaseBlocName = validateModuleName(moduleName); // implement this later - change all the space to underscore
  try {
    await generateModuleCode(moduleName, targetDirectory);
    window.showInformationMessage(
      `Successfully Generated ${pascalCaseBlocName} Module`
    );
  } catch (error) {
    window.showErrorMessage(
      `Error:
        ${error instanceof Error ? error.message : JSON.stringify(error)}`
    );
  }
};

function promptForModuleName(): Thenable<string | undefined> {
  const TrongateModuleNamePromptOptions: InputBoxOptions = {
    prompt: "Trongate Module Name",
    placeHolder: "counter",
  };
  return window.showInputBox(TrongateModuleNamePromptOptions);
}

async function promptForTargetDirectory(): Promise<string | undefined> {
  const options: OpenDialogOptions = {
    canSelectMany: false,
    openLabel: "Select a folder to create the module in",
    canSelectFolders: true,
  };

  return window.showOpenDialog(options).then((uri) => {
    if (_.isNil(uri) || _.isEmpty(uri)) {
      return undefined;
    }
    return uri[0].fsPath;
  });
}

async function generateModuleCode(moduleName: string, targetDirectory: string) {
  const validatedName = validateModuleName(moduleName);
  console.log(validatedName);
  const moduleDirectoryPath = `${targetDirectory}/${validatedName}`;
  if (!existsSync(moduleDirectoryPath)) {
    await createDirectory(moduleDirectoryPath);
  }

  await Promise.all([
    createTrongateModuleTemplate(validatedName, moduleDirectoryPath),
  ]);
}

function createDirectory(targetDirectory: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // TODO: handle this error in a proper way
    mkdirp(targetDirectory, (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}

async function createTrongateModuleTemplate(
  moduleName: string,
  targetDirectory: string
) {
  // The moduleName has been validated - this means no space and all lowercases

  /* upperModuleName is the name for controller php file,
   therefore the first letter needs to be uppercase */
  const upperModuleName = makeFirstLetterGoUpper(moduleName);
  await createDirectory(`${targetDirectory}/controllers`);
  await createDirectory(`${targetDirectory}/views`);
  await createDirectory(`${targetDirectory}/assets`);

  const targetControllerPath = `${targetDirectory}/controllers/${upperModuleName}.php`;
  const targetApiPath = `${targetDirectory}/assets/api.json`;
  if (existsSync(targetControllerPath)) {
    throw Error(`Module ${moduleName} already exists`);
  }
  await Promise.all([
    writeFile(
      targetControllerPath,
      getTrongateModuleTemplate(moduleName),
      "utf8",
      (error) => {
        console.log(error);
      }
    ),
    writeFile(targetApiPath, getTrongateAssets(moduleName), "utf8", (error) => {
      console.log(error);
    }),
  ]).catch((err) => {
    console.log(err);
  });
}

function getTrongateModuleTemplate(moduleName: string): string {
  const upperModuleName = makeFirstLetterGoUpper(moduleName);
  return `<?php
class ${upperModuleName} extends Trongate {

} `;
}

function makeFirstLetterGoUpper(name: string): string {
  const upperName = name.charAt(0).toUpperCase() + name.slice(1);
  return upperName;
}

function validateModuleName(name: string): string {
  /*** 
  1. module name should not have space - all spaces should be replaced with underscore
  
  2. module name should be all lower case - for the folder
  ***/

  let validatedStr = name.split(" ").join("_");
  validatedStr = validatedStr.toLowerCase();

  return validatedStr;
}

function getTrongateAssets(moduleName: string): string {
  return `{
    "Remember Positions": {
      "url_segments": "${moduleName}/remember_positions",
      "request_type": "POST",
      "description": "Remember positions of some child nodes",
      "enableParams": true,
      "authorization":{  
          "roles": [
              "admin"
          ]
      }
    },
    "Get": {
      "url_segments": "api/get/${moduleName}",
      "request_type": "GET",
      "description": "Fetch rows from table",
      "enableParams": true,
      "authorization":{  
          "roles": [
              "admin"
          ]
      }
    },
    "Get By Post": {
      "url_segments": "api/get/${moduleName}",
      "request_type": "POST",
      "description": "Fetch rows from table using POST request.",
      "enableParams": true,
      "authorization":{  
          "roles": [
              "admin"
          ]
      }
    },
    "Find One": {
      "url_segments": "api/get/${moduleName}/{id}",
      "request_type": "GET",
      "description": "Fetch one row",
      "required_fields": [
        {
          "name": "id",
          "label": "ID"
        }
      ]
    },
    "Exists": {
      "url_segments": "api/exists/${moduleName}/{id}",
      "request_type": "GET",
      "description": "Check if instance exists",
      "required_fields": [
        {
          "name": "id",
          "label": "ID"
        }
      ]
    },
    "Count": {
      "url_segments": "api/count/${moduleName}",
      "request_type": "GET",
      "description": "Count number of records",
      "enableParams": true
    },
    "Count By Post": {
      "url_segments": "api/count/${moduleName}",
      "request_type": "POST",
      "description": "Count number of records using POST request",
      "enableParams": true,
      "authorization":{  
          "roles": [
              "admin"
          ]
      }
    },
    "Create": {
      "url_segments": "api/create/${moduleName}",
      "request_type": "POST",
      "description": "Insert database record",
      "enableParams": true,
      "authorization":{  
          "roles": [
              "admin"
          ]
      },
      "beforeHook": "_prep_input",
      "afterHook": "_fetch_item_details"
    },
    "Insert Batch": {
      "url_segments": "api/batch/${moduleName}",
      "request_type": "POST",
      "description": "Insert multiple records",
      "enableParams": true
    },
    "Update": {
      "url_segments": "api/update/${moduleName}/{id}",
      "request_type": "PUT",
      "description": "Update a database record",
      "enableParams": true,
      "required_fields": [
        {
          "name": "id",
          "label": "ID"
        }
      ],
      "authorization":{  
          "roles": [
              "admin"
          ]
      },
      "beforeHook": "_prep_input",
      "afterHook": "_fetch_item_details"
    },
    "Destroy": {
      "url_segments": "api/destroy/${moduleName}",
      "request_type": "DELETE",
      "description": "Delete row or rows",
      "enableParams": true
    },
    "Delete One": {
      "url_segments": "api/delete/${moduleName}/{id}",
      "request_type": "DELETE",
      "description": "Delete one row",
      "required_fields": [
        {
          "name": "id",
          "label": "ID"
        }
      ],
      "authorization":{  
          "roles": [
              "admin"
          ]
      }
    }
  }`;
}
