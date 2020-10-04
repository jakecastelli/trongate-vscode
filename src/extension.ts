// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { newModule } from "./commands";
import { switchSnippet } from "./commands";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "trongate" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "trongate.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      console.log();
      vscode.window.showInformationMessage("Hello World from Trongate!");
    }
  );

  let newTrongate = vscode.commands.registerCommand(
    "trongate.newTrongate",
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    //   vscode.window.showInformationMessage("Hello Trongate User!");
    //Works!
    newModule
  );

  let selectSnippet = vscode.commands.registerCommand(
    "trongate.selectSnippet",
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    //   vscode.window.showInformationMessage("Hello Trongate User!");
    //Works!
    () => {
      //TODO: Implement the function
      //CURRENTLY:
      // Passing the context to the function which can provide the user data file of VSCode
      switchSnippet("", context);
    }
  );

  context.subscriptions.push(disposable, newTrongate, selectSnippet);
}

// this method is called when your extension is deactivated
// After user deactivate the code, the scaffold function and snippet should be deactivated
export function deactivate() {}
