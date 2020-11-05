import {makeFirstLetterGoUpper} from '../utils/helper'
export function getTongateControllerTemplate(
  moduleName: string,
  viewFileName: any
) {
  const upperModuleName = makeFirstLetterGoUpper(moduleName)
  return `<?php
class ${upperModuleName} extends Trongate {
  ${ viewFileName !== undefined
    ? `\n    function index () {
        $data['view_module'] = '${moduleName}';
        $this->view('${viewFileName}', $data);
        /* Uncomment the lines below, 
         * Change the template method name, 
         * Remove lines above, if you want to load to the template
         */
        //$data['view_module'] = '${moduleName}';
        //$data['view_file'] = '${viewFileName}';
        //$this->template('template method here', $data);
    }`
          : ""
      }  
}`;
}
