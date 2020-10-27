import { QuickPickOptions } from "vscode";

  // dropdown to ask user if needs a view template
export const itemOptions = {
    no: "(default)",
    yes: "",
  };
export const quickPickOptions: QuickPickOptions = {
    placeHolder: "Do you want a view template?",
    canPickMany: false,
  };