import { QuickPickItem, QuickPickOptions, window } from "vscode";

export const cssFramework = {
  Trongate: "Trongate CSS Framework",
  "Boostrap 4": "Boostrap 4 CSS Framework",
  Defiant: "Defiant CSS Framework",
  Milligram: "Milligram CSS Framework",
  Materialize: "Materialize CSS Framework",
  Skeleton: "Skeleton CSS Framework",
};

export const cssFrameworkQuickPickOptions: QuickPickOptions = {
    placeHolder: "Choose your CSS framework ",
    canPickMany: false
}

//@ts-ignore
export const dropDownList = async (itemOptions, quickPickOptions) => {
  let items: QuickPickItem[] = [];
  const keys = Object.keys(itemOptions);
  keys.forEach((key) => {
    items.push({
      label: key,
      //@ts-ignore
      description: itemOptions[key],
    });
  });

  const userOption = await window.showQuickPick(items, quickPickOptions);
  if (!userOption) {
    return;
  }
  console.log(userOption);

  //@ts-ignore
  return userOption.label;
};
