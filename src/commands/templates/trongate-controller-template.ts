import {makeFirstLetterGoUpper} from '../utils/helper'
export function getTongateControllerTemplate(
  GLOBAL_SETTINGS: any,
  moduleName: string,
  viewFileName: any
) {
  const upperModuleName = makeFirstLetterGoUpper(moduleName)
  const isSuperModule = GLOBAL_SETTINGS['superModule']

  const controllerTemplate = 
`<?php
class ${upperModuleName} extends Trongate {
  ${isSuperModule ?
`\n    function __construct() {
        parent::__construct();
        $this->parent_module = '${GLOBAL_SETTINGS['parentModuleName']}';
        $this->child_module = '${moduleName}';
    }\n`: '' }
${ viewFileName !== undefined
? `    function index () {
        $data['view_module'] = '${isSuperModule?`${GLOBAL_SETTINGS['parentModuleName']}/${moduleName}`:moduleName}';
        $this->view('${viewFileName}', $data);
        /* Uncomment the lines below, 
         * Change the template method name, 
         * Remove lines above, if you want to load to the template
         */
        //$data['view_module'] = '${isSuperModule?`${GLOBAL_SETTINGS['parentModuleName']}/${moduleName}`:moduleName}';
        //$data['view_file'] = '${viewFileName}';
        //$this->template('template method here', $data);
    }`
          : ""
      }
  ${isSuperModule ?
`\n    function __destruct() {
        $this->parent_module = '';
        $this->child_module = '';
    }`: ''  
  }
}`;
  return controllerTemplate
}