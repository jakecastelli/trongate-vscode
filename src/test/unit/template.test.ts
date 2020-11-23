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