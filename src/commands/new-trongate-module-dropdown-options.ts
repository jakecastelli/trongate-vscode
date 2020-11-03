import { QuickPickOptions, InputBoxOptions } from "vscode";

// dropdown to ask user if needs a view template
export const itemOptions = {
  no: "(default)  this will give you a clean module to start",
  yes: "",
};
export const quickPickOptions: QuickPickOptions = {
  placeHolder: "Do you want a view template?",
  canPickMany: false,
};

export const inputPrompOptionForModuleName: InputBoxOptions = {
  prompt: "Trongate Module Name",
  placeHolder: "For example: store items",
};

export const inputPrompOptionForViewName: InputBoxOptions = {
  prompt: "View file name",
  placeHolder: "For example: display",
};