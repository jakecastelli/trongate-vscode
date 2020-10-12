import { QuickPickItem, window } from "vscode";

let items: QuickPickItem[] = [];
const cssFramework = {
  "Boostrap 4": "Boostrap 4 CSS Framework",
  Defiant: "Defiant Frontend Framework",
  Milligram: "Milligram Framework",
  Materialize: "Materialize Framework",
  Skeleton: "Skeleton Framework",
};
const keys = Object.keys(cssFramework);
keys.forEach((key) => {
  items.push({
    label: key,
    //@ts-ignore
    description: cssFramework[key],
  });
});

export const switchSnippet = async () => {
  const userOption = await window.showQuickPick(items);
  if (!userOption) {
    return;
  }
  console.log(userOption);
  // window.showInformationMessage("The function is still under development.");
  return userOption.label;
};
