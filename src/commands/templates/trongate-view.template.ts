export function viewTemplate(moduleName: string, GLOBAL_SETTINGS: any) {
  const assetsTriggerPhrase = GLOBAL_SETTINGS["config"]["MODULE_ASSETS_TRIGGER"];

  return `<h1>Hello from <span><i>${moduleName}</i></span> module</h1>
    <p>This view was generated using Trongate Scaffold & Code Snippets!</p>
        <div>
            <a href="https://github.com/jakecastelli/trongate-vscode" target="_blank">Keep updated here
            </a>
        </div>
    
        <div>
            <a href="https://trongate.io/" target="_blank">Trongate</a>
        </div>
<style>
    /* Link to the ${moduleName}/assets/css/custom.css */
    @import url('<?= BASE_URL ?>${
      GLOBAL_SETTINGS["superModule"]
        ? `${GLOBAL_SETTINGS["parentModuleName"]}-${moduleName}${assetsTriggerPhrase}`
        : `${moduleName}${assetsTriggerPhrase}`
    }/css/custom.css');

    body {
        background-color: rgb(251, 178, 165);
    }
</style>

<!-- Link to the assets/js/custom.js -->
<script src="<?= BASE_URL ?>${
    GLOBAL_SETTINGS["superModule"]
      ? `${GLOBAL_SETTINGS["parentModuleName"]}-${moduleName}${assetsTriggerPhrase}`
      : `${moduleName}${assetsTriggerPhrase}`
  }/js/custom.js"></script>`;
}

export function getTrongateModuleCss() {
  return `/* Put your css here */`;
}
