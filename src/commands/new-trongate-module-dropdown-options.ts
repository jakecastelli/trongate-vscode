import { QuickPickOptions, InputBoxOptions } from "vscode";

  // dropdown to ask user if needs a view template
export const itemOptions = {
    no: "(default)",
    yes: "",
  };
export const quickPickOptions: QuickPickOptions = {
    placeHolder: "Do you want a view template?",
    canPickMany: false,
  };

export const inputPrompOptionForModuleName: InputBoxOptions = {
     prompt: "Trongate Module Name",
     placeHolder: "counter",
}

export const inputPrompOptionForViewName: InputBoxOptions = {
  prompt: "View file name",
  placeHolder: "counter",
}