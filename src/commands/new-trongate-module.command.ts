//@ts-nocheck
import * as _ from "lodash";
import * as mkdirp from "mkdirp";
import { dropDownList } from "./switch-frontend-snippet.comand";
import {itemOptions, quickPickOptions} from "./new-trongate-module-dropdown-options"

import {
  InputBoxOptions,
  OpenDialogOptions,
  workspace,
  Uri,
  window,
  Position,
  Selection,
} from "vscode";
import { existsSync, lstatSync, writeFile } from "fs";

// Entry point
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

  const isViewTemplate = await dropDownList(itemOptions, quickPickOptions);

  // There is a possibility that the user presses ESC then we cancel the process
  // and return an error message to the user
  if (isViewTemplate == undefined) {
    window.showErrorMessage("Process cancelled, no new module created");
    return;
  }

  try {
    await generateModuleCode(moduleName, targetDirectory, isViewTemplate);
    // Open the controller file and put curosr at the correct position
    openEditorAndPutCursorAtGoodPosition(targetDirectory, moduleName);

    const pascalCaseBlocName = validateModuleName(moduleName); // implement this later - change all the space to underscore
    window.showInformationMessage(
      `Successfully Generated ${pascalCaseBlocName} Module`
    );
  } catch (error) {
    window.showErrorMessage(
      `Error:
        ${error instanceof Error ? error.message : JSON.stringify(error)}`
    );
    console.log(error);
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

async function generateModuleCode(
  moduleName: string,
  targetDirectory: string,
  isViewTemplate: string
) {
  const validatedName = validateModuleName(moduleName);
  console.log(validatedName);
  const moduleDirectoryPath = `${targetDirectory}/${validatedName}`;
  if (!existsSync(moduleDirectoryPath)) {
    await createDirectory(moduleDirectoryPath);
  }

  await Promise.all([
    createTrongateModuleTemplate(
      validatedName,
      moduleDirectoryPath,
      isViewTemplate
    ),
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
  targetDirectory: string,
  isViewTemplate: string
) {
  // The moduleName has been validated - this means no space and all lowercases

  /* upperModuleName is the name for controller php file,
   therefore the first letter needs to be uppercase */
  const upperModuleName = makeFirstLetterGoUpper(moduleName);
  await createDirectory(`${targetDirectory}/controllers`);
  await createDirectory(`${targetDirectory}/views`);
  await createDirectory(`${targetDirectory}/assets`);

  const targetControllerPath = `${targetDirectory}/controllers/${upperModuleName}.php`;
  let targetViewPath;
  if (isViewTemplate == "yes") {
    targetViewPath = `${targetDirectory}/views/${moduleName}_view.php`;
  }
  const targetApiPath = `${targetDirectory}/assets/api.json`;
  if (existsSync(targetControllerPath)) {
    throw Error(`Module ${moduleName} already exists`);
  }
  await Promise.all([
    writeFile(
      targetControllerPath,
      getTrongateModuleTemplate(moduleName, isViewTemplate),
      "utf8",
      (error) => {
        console.log(error);
      }
    ),
    isViewTemplate === "yes" &&
      writeFile(
        targetViewPath,
        getTrongateViewTemplate(moduleName),
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

function getTrongateModuleTemplate(
  moduleName: string,
  viewTemplate: string = "no"
): string {
  const upperModuleName = makeFirstLetterGoUpper(moduleName);
  return `<?php
class ${upperModuleName} extends Trongate {
  ${
    viewTemplate === "yes"
      ? `\n  function index () {
    $data['view_module'] = '${moduleName}';
    $this->view('${moduleName}_view', $data);
    // Uncomment lines below change the method name, and remove lines above, if you want to load to the template
    //$data['view_module'] = '${moduleName}';
    //$ data['view_file] = '${moduleName}_view';
    //$this->template('template method here', $data);
  }`
      : ""
  }  
} `;
}

function getTrongateViewTemplate(moduleName: string): string {
  const displayModuleName = validateModuleName(moduleName);
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My new Trongate module</title>
  </head>
  <body>
      <h1>Hello from  ${displayModuleName} ?></h1>
      <p>This view was generated using Trongate Scaffold & Code Snippets!</p>
      <a href="https://github.com/jakecastelli/trongate-vscode">Keep updated here</a>
  </body>
  </html>`;
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

// Helper Function to open the controller file and place curosr at good position
function openEditorAndPutCursorAtGoodPosition(targetDirectory, moduleName) {
  const validatedModuleName = validateModuleName(moduleName);
  const upperModuleName = makeFirstLetterGoUpper(validatedModuleName);
  const controllerLocation = `${targetDirectory}/${validatedModuleName}/controllers/${upperModuleName}.php`;
  var setting: vscode.Uri = Uri.file(encodeURI(controllerLocation));
  workspace.openTextDocument(setting).then((document) =>
    window.showTextDocument(document).then((e) => {
      e.selections = [new Selection(new Position(2, 4), new Position(2, 4))];
    })
  );
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
