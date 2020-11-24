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

import { makeFirstLetterGoUpper, validateModuleName, checkIsTrongateProject } from "./utils/helper";

import {
  OpenDialogOptions,
  workspace,
  Uri,
  window,
  Position,
  Selection,
} from "vscode";
import { existsSync, lstatSync, writeFile, readFileSync} from "fs";
import * as path from 'path'
import * as slash from 'slash'

// Entry point
export const newModule = async (uri: Uri) => {

    // check if it is a trongate project
    const GLOBAL_SETTINGS = {
      projectPath: '',
      isTrongateProject: false,
      config: {},
    }
    try {
      GLOBAL_SETTINGS['projectPath'] = workspace.workspaceFolders[0].uri.fsPath
      GLOBAL_SETTINGS['isTrongateProject'] = checkIsTrongateProject(GLOBAL_SETTINGS.projectPath)
      if (GLOBAL_SETTINGS['isTrongateProject']) {
        //read all the configs from config file
        const configFilePath = path.join(GLOBAL_SETTINGS['projectPath'], 'config', 'config.php')
        const configFileContent = readFileSync(configFilePath, { encoding: 'utf8' });
        const regexMatch = /define\(\s*('\w+'|"\w+"\1)\s*,\s*('\w+'|"\w+"\2)\s*\)/
        configFileContent.split('\n').map(item => {
          const match = item.match(regexMatch)
          if (match) {
            const configKey = match[1].split('').filter(item => item !== '\'' && item !== '"').join('')
            const configValue = match[2].split('').filter(item => item !== '\'' && item !== '"').join('')
            GLOBAL_SETTINGS['config'][configKey] = configValue
          }
        })
      }
    } catch (error) {
      console.log(error)
    }

    if (!GLOBAL_SETTINGS['isTrongateProject']) {
      window.showErrorMessage("The current workspace does not contain a valid Trongate Project");
      return
    }

  // console.log('===================')
  // console.log(uri) 
  // console.log(GLOBAL_SETTINGS) 
  // console.log('===================')

  /**
   * The function starts from here
   */
  const moduleName = await prompForInput(inputPrompOptionForModuleName);
  console.log(moduleName);
  if (_.isNil(moduleName) || moduleName.trim() === "") {
    window.showErrorMessage("The module name must not be empty");
    return;
  }

  // check if the module name contains the assets trigger phase
  const validName = validateModuleName(moduleName)
  if (validName.includes(GLOBAL_SETTINGS['config']['MODULE_ASSETS_TRIGGER'])) {
    window.showErrorMessage(`Your module name contained the MODULE_ASSETS_TRIGGER: ${GLOBAL_SETTINGS['config']['MODULE_ASSETS_TRIGGER']}, please rename your module`);
    return
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
    GLOBAL_SETTINGS
  };
  try {
    await generateModuleCode(genObj);
    // Open the controller file and put curosr at the correct position
    openEditorAndPutCursorAtGoodPosition(
      targetDirectory,
      moduleName,
      isViewTemplate
    );

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
  GLOBAL_SETTINGS
}) {
  const validatedName = validateModuleName(moduleName);

  targetDirectory = slash(targetDirectory)
  console.log(targetDirectory)
  if(targetDirectory.split('/').slice(-1)[0] === 'modules') {
    GLOBAL_SETTINGS['superModule'] = false;
    GLOBAL_SETTINGS['parentModuleName'] = 'modules'
  } else {
    GLOBAL_SETTINGS['superModule'] = true
    GLOBAL_SETTINGS['parentModuleName'] = targetDirectory.split('/').slice(-1)[0]
  }
  // console.log('============================>')
  // console.log(targetDirectory.split('/').slice(-1)[0])
  // console.log(GLOBAL_SETTINGS)
  // console.log('============================>')
  const moduleDirectoryPath = `${targetDirectory}/${validatedName}`;
  if (!existsSync(moduleDirectoryPath)) {
    await createDirectory(moduleDirectoryPath);
  }

  await Promise.all([
    createTrongateModuleTemplate(
      validatedName,
      moduleDirectoryPath,
      isViewTemplate,
      viewFileName,
      GLOBAL_SETTINGS
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
  viewFileName: string,
  GLOBAL_SETTINGS: any
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

  // const isSuperModule = GLOBAL_SETTINGS['superModule']

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
      getTongateControllerTemplate(GLOBAL_SETTINGS, moduleName, viewFileName),
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
        getTrongateViewTemplate(moduleName, GLOBAL_SETTINGS),
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

function getTrongateViewTemplate(moduleName: string, GLOBAL_SETTINGS): string {
  const displayModuleName = validateModuleName(moduleName);
  return tgViewTemplate(displayModuleName, GLOBAL_SETTINGS);
}

// Helper Function to open the controller file and place curosr at good position
function openEditorAndPutCursorAtGoodPosition(
  targetDirectory,
  moduleName,
  isViewTemplate
) {
  const validatedModuleName = validateModuleName(moduleName);
  const upperModuleName = makeFirstLetterGoUpper(validatedModuleName);
  const controllerLocation = `${targetDirectory}/${validatedModuleName}/controllers/${upperModuleName}.php`;
  var setting: vscode.Uri = Uri.file(controllerLocation);
  setting = setting.fsPath;
  workspace.openTextDocument(setting).then((document) =>
    window.showTextDocument(document).then((e) => {
      e.selections =
        isViewTemplate === "no"
          ? [new Selection(new Position(0, 5), new Position(0, 5))]
          : [new Selection(new Position(0, 5), new Position(0, 5))];
    })
  );
}
