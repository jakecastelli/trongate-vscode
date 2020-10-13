// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { newModule } from "./commands";
import { switchSnippet } from "./commands";
import {cssFramework} from './commands/switch-frontend-snippet.comand';

export function activate(context: vscode.ExtensionContext) {
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "trongate" is now active!');
  // Get the user's nitro framework option
  let userFrameworkOption = vscode.workspace.getConfiguration().get('trongate.userFrameworkOption');
  //@ts-ignore
  if (!Object.keys(cssFramework).includes(userFrameworkOption)) {
    // If the user messed with the settings, we put them back to default
    userFrameworkOption = "Bootstrap 4";
  }
  vscode.window.setStatusBarMessage(`${userFrameworkOption} in use`);
  // console.log(vscode.workspace.getConfiguration().get('trongate.userFrameworkOption'))

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let nitro = vscode.commands.registerCommand(
    "trongate.selectFramework",
    (args) => {
      vscode.commands.executeCommand(`editor.action.insertSnippet`, {
        name: `${userFrameworkOption} ${args.name}`,
      });
      // The code you place here will be executed every time your command is executed
    }
  );

  let newTrongate = vscode.commands.registerCommand(
    "trongate.newTrongate",
    newModule
  );

  let selectSnippet = vscode.commands.registerCommand(
    "trongate.selectSnippet",
    // The code you place here will be executed every time your command is executed
   () => {
      //TODO: Implement the function
      //CURRENTLY:
      switchSnippet().then(async (opt) => {
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

// this method is called when your extension is deactivated
// After user deactivate the code, the scaffold function and snippet should be deactivated
export function deactivate() {}
