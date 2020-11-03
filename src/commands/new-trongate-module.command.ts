//@ts-nocheck
import * as _ from "lodash";
import * as mkdirp from "mkdirp";
import { dropDownList } from "./switch-frontend-snippet.comand";
import {
  itemOptions,
  quickPickOptions,
  inputPrompOptionForModuleName,
  inputPrompOptionForViewName,
} from "./new-trongate-module-dropdown-options";
import {
  getTrongateAssets,
  viewTemplate as tgViewTemplate,
  getTrongateModuleCss,
  getTongateControllerTemplate,
} from "./templates";

import { makeFirstLetterGoUpper, validateModuleName } from "./utils/helper";

import {
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
  const moduleName = await prompForInput(inputPrompOptionForModuleName);
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
  if (isViewTemplate === undefined) {
    window.showErrorMessage("Process cancelled, no new module created");
    return;
  }

  let viewFileName;
  if (isViewTemplate === "yes") {
    // promp window for a view file name
    viewFileName = await prompForInput(inputPrompOptionForViewName);
    if (_.isNil(viewFileName) || viewFileName.trim() === "") {
      window.showErrorMessage("The view file name must not be empty");
      return;
    }
    viewFileName = viewFileName.split(" ").join("_");
  }

  const genObj = {
    moduleName,
    targetDirectory,
    isViewTemplate,
    viewFileName,
  };
  try {
    await generateModuleCode(genObj);
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

function prompForInput(promotOptions): Thenable<string | undefined> {
  return window.showInputBox(promotOptions);
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

async function generateModuleCode({
  moduleName,
  targetDirectory,
  isViewTemplate,
  viewFileName,
}) {
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
      isViewTemplate,
      viewFileName
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
  isViewTemplate: string,
  viewFileName: string
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
    targetViewPath = `${targetDirectory}/views/${viewFileName}.php`;
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
      getTrongateModuleTemplate(moduleName, viewFileName),
      "utf8",
      (error) => {
        console.log(error);
      }
    ),
    // Write JS File
    isViewTemplate === "yes" &&
      writeFile(
        targetJSPath,
        "// Add your JavaScript here",
        "utf8",
        (error) => {
          console.log(error);
        }
      ),
    // Write View File
    isViewTemplate === "yes" &&
      writeFile(
        targetViewPath,
        getTrongateViewTemplate(moduleName),
        "utf8",
        (error) => {
          console.log(error);
        }
      ),
    // Write CSS File
    isViewTemplate === "yes" &&
      writeFile(targetCSSPath, getTrongateModuleCss(), "utf8", (error) => {
        console.log(error);
      }),

    // Write Assets file
    writeFile(targetApiPath, getTrongateAssets(moduleName), "utf8", (error) => {
      console.log(error);
    }),
  ]).catch((err) => {
    console.log(err);
  });
}

function getTrongateModuleTemplate(
  moduleName: string,
  viewFileName: string
): string {
  return getTongateControllerTemplate(moduleName, viewFileName);
}

function getTrongateViewTemplate(moduleName: string): string {
  const displayModuleName = validateModuleName(moduleName);
  return tgViewTemplate(displayModuleName);
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
