import { getTongateControllerTemplate } from "../../commands/templates/index";

describe('getTongateControllerTemplate method exists', () => {
})

describe("make sure the controller template is generated correctly", () => {

    test('getTongateControllerTemplate method exists', () => {
        expect(typeof getTongateControllerTemplate).toEqual('function')
    })

    test("module name: store_items, view file: null", () => {
        const test_moduleName = "store_items";
        expect(getTongateControllerTemplate(test_moduleName, undefined)).toEqual(
`<?php
class Store_items extends Trongate {
    
}`);
    });

    test("module name: store_items, view file: display", () => {
        const test_moduleName = "store_items";
        const test_viewFileName = "display";
        expect(getTongateControllerTemplate(test_moduleName, test_viewFileName)).toEqual(result);
    });
});


let result = `<?php
class Store_items extends Trongate {
  
    function index () {
        $data['view_module'] = 'store_items';
        $this->view('display', $data);
        /* Uncomment the lines below, 
         * Change the template method name, 
         * Remove lines above, if you want to load to the template
         */
        //$data['view_module'] = 'store_items';
        //$data['view_file'] = 'display';
        //$this->template('template method here', $data);
    }  
}`