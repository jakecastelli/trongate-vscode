//@ts-nocheck
import * as vscode from "vscode";
import { newModule } from "./commands";
import { dropDownList } from "./commands";
import {cssFramework, cssFrameworkQuickPickOptions} from './commands/switch-frontend-snippet.comand';
import {checkIsTrongateProject} from './commands/utils/helper'
import * as path from 'path'
import {readFileSync} from 'fs'

export function activate(context: vscode.ExtensionContext) {
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "trongate" is now active!');

  // check if it is a trongate project
  const GLBOAL_SETTINGS = {
    projectPath: '',
    isTrongateProject: null,
    config: {},
  }
  try {
    GLBOAL_SETTINGS['projectPath'] = vscode.workspace.workspaceFolders[0].uri.fsPath
    GLBOAL_SETTINGS['isTrongateProject'] = checkIsTrongateProject(GLBOAL_SETTINGS.projectPath)
    if (GLBOAL_SETTINGS['isTrongateProject']) {
      //read all the configs from config file
      const configFilePath = path.join(GLBOAL_SETTINGS['projectPath'], 'config', 'config.php')
      const configFileContent = readFileSync(configFilePath, { encoding: 'utf8' });
      const regexMatch = /define\(\s*('\w+'|"\w+"\1)\s*,\s*('\w+'|"\w+"\2)\s*\)/
      configFileContent.split('\n').map(item => {
        const match = item.match(regexMatch)
        if (match) {
          const configKey = match[1].split('').filter(item => item !== '\'' && item !== '"').join('')
          const configValue = match[2].split('').filter(item => item !== '\'' && item !== '"').join('')
          GLBOAL_SETTINGS['config'][configKey] = configValue
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
  
  console.log(GLBOAL_SETTINGS)



  // Get the user's nitro framework option
  let userFrameworkOption = vscode.workspace.getConfiguration().get('trongate.userFrameworkOption');
  //@ts-ignore
  if (!Object.keys(cssFramework).includes(userFrameworkOption)) {
    // If the user messed with the settings, we put them back to default
    userFrameworkOption = "Bootstrap 4";
  }
  vscode.window.setStatusBarMessage(`${userFrameworkOption} in use`);

  let nitro = vscode.commands.registerCommand(
    "trongate.insertSnippet",
    (args) => {
      vscode.commands.executeCommand(`editor.action.insertSnippet`, {
        name: `${userFrameworkOption} ${args.name}`,
      });
    }
  );

  let newTrongate = vscode.commands.registerCommand(
    "trongate.newTrongate",
    (uri) => newModule(uri, GLBOAL_SETTINGS)
  );

  let selectSnippet = vscode.commands.registerCommand(
    "trongate.selectNitroFramework",
   () => {
      dropDownList(cssFramework, cssFrameworkQuickPickOptions).then(async (opt) => {
        if (!opt) {return;}
        //@ts-ignore
        userFrameworkOption = opt;
        vscode.window.showInformationMessage(
          `You have successfully selected ${userFrameworkOption} Framework`
        );
        await vscode.workspace.getConfiguration().update('trongate.userFrameworkOption', userFrameworkOption, vscode.ConfigurationTarget.Global)
        vscode.window.setStatusBarMessage(`${userFrameworkOption} in use`);
      });
    }
  );

  context.subscriptions.push(nitro, newTrongate, selectSnippet);
}

export function deactivate() {}
