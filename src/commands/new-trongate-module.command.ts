//@ts-nocheck
import * as _ from "lodash";
import * as mkdirp from "mkdirp";
import { dropDownList } from "./switch-frontend-snippet.comand";
import {
  itemOptions,
  quickPickOptions,
} from "./new-trongate-module-dropdown-options";
import {
  getTrongateAssets,
  viewTemplate as tgViewTemplate,
  getTrongateModuleCss,
  getTongateControllerTemplate,
} from "./templates";

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
  if (isViewTemplate == "yes") {
    await createDirectory(`${targetDirectory}/assets/css`);
    await createDirectory(`${targetDirectory}/assets/js`);
  }

  // 1. check workspace - engine/ config/ modules -> pass -> this is a trongate project
  // 2. trigger language server
  // 3. communicate

  const targetControllerPath = `${targetDirectory}/controllers/${upperModuleName}.php`;
  let targetViewPath;
  let targetCSSPath;
  let targetJSPath;
  if (isViewTemplate == "yes") {
    targetViewPath = `${targetDirectory}/views/${moduleName}_view.php`;
    targetCSSPath = `${targetDirectory}/assets/css/custom.css`;
    targetJSPath = `${targetDirectory}/assets/js/custom.js`;
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
        targetJSPath,
        "// Add your JavaScript here",
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
    isViewTemplate === "yes" &&
      writeFile(
        targetCSSPath,
        getTrongateModuleCss(),
        // getTrongateModuleTemplate(moduleName),
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
  return getTongateControllerTemplate(
    upperModuleName,
    moduleName,
    viewTemplate
  );
}

function getTrongateViewTemplate(moduleName: string): string {
  const displayModuleName = validateModuleName(moduleName);
  return tgViewTemplate(displayModuleName);
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
  var setting: vscode.Uri = Uri.file(controllerLocation);
  setting = setting.fsPath;
  workspace.openTextDocument(setting).then((document) =>
    window.showTextDocument(document).then((e) => {
      e.selections = [new Selection(new Position(2, 4), new Position(2, 4))];
    })
  );
}
