import * as _ from "lodash";
// import * as changeCase from "change-case";
import {
  QuickPickItem,
  Uri,
  window,
  workspace,
  ExtensionContext,
} from "vscode";
import { copyFile } from "fs";

let items: QuickPickItem[] = [];
const cssFramework = {
  defiant: "Defiant Framework",
  materialize: "Google frontend framework",
};
const keys = Object.keys(cssFramework);
keys.forEach((key) => {
  items.push({
    label: key,
    description: cssFramework[key],
  });
});

export const switchSnippet = async (uri = "", context: ExtensionContext) => {
  console.log(uri + "11");
  const userOption = await window.showQuickPick(items);
  if (!userOption) {
    return;
  }

  //test out
  const pathArr = context.globalStorageUri.path.split("/");
  const pathStr = pathArr.slice(0, 6).join("/") + "/snippets";
  console.log(pathStr);

  console.log(userOption);
  window.showInformationMessage("The function is still under development.");
  // overWriteCurrentSnippet(userOption.label);
};

async function overWriteCurrentSnippet(labelFile: string) {
  console.log(workspace.workspaceFolders);
  //check .vscode fold exist?
  // const path = workspace.workspaceFolders[0];
  // console.log(path);
  // if (existsSync(path)) {
  //   // Do something
  //   console.log("hello!!!");
  // }
  // let arr = __dirname.split("/");
  // console.log(__dirname.split("/"));
  // const snippetSrc = arr.slice(0, arr.length - 2);
  // const snippetSrc1 = snippetSrc.join("/");
  // console.log(snippetSrc1);
  // console.log(snippetSrc1);
  // console.log(labelFile);
  copyFile(
    `${labelFile}/snippets/frontend-framework/${labelFile}.json`,
    `${labelFile}/.vscode/current.code-snippets`,
    (err: any) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("source snippet was copied to destination");
    }
  );
}
