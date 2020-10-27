export function getTongateControllerTemplate(
  upperModuleName: string,
  moduleName: string,
  viewTemplate: string
) {
  return `<?php
class ${upperModuleName} extends Trongate {
      ${ viewTemplate === "yes"
    ? `\n    function index () {
        $data['view_module'] = '${moduleName}';
        $this->view('${moduleName}_view', $data);
        /* Uncomment the lines below, 
         * Change the template method name, 
         * Remove lines above, if you want to load to the template
         */
        //$data['view_module'] = '${moduleName}';
        //$ data['view_file] = '${moduleName}_view';
        //$this->template('template method here', $data);
    }`
          : ""
      }  
}`;
}
