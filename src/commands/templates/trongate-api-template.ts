export function getTrongateAssets(moduleName: string): string {
  return `{
      "Remember Positions": {
        "url_segments": "${moduleName}/remember_positions",
        "request_type": "POST",
        "description": "Remember positions of some child nodes",
        "enableParams": true,
        "authorization":{  
            "roles": [
                "admin"
            ]
        }
      },
      "Get": {
        "url_segments": "api/get/${moduleName}",
        "request_type": "GET",
        "description": "Fetch rows from table",
        "enableParams": true,
        "authorization":{  
            "roles": [
                "admin"
            ]
        }
      },
      "Get By Post": {
        "url_segments": "api/get/${moduleName}",
        "request_type": "POST",
        "description": "Fetch rows from table using POST request.",
        "enableParams": true,
        "authorization":{  
            "roles": [
                "admin"
            ]
        }
      },
      "Find One": {
        "url_segments": "api/get/${moduleName}/{id}",
        "request_type": "GET",
        "description": "Fetch one row",
        "required_fields": [
          {
            "name": "id",
            "label": "ID"
          }
        ]
      },
      "Exists": {
        "url_segments": "api/exists/${moduleName}/{id}",
        "request_type": "GET",
        "description": "Check if instance exists",
        "required_fields": [
          {
            "name": "id",
            "label": "ID"
          }
        ]
      },
      "Count": {
        "url_segments": "api/count/${moduleName}",
        "request_type": "GET",
        "description": "Count number of records",
        "enableParams": true
      },
      "Count By Post": {
        "url_segments": "api/count/${moduleName}",
        "request_type": "POST",
        "description": "Count number of records using POST request",
        "enableParams": true,
        "authorization":{  
            "roles": [
                "admin"
            ]
        }
      },
      "Create": {
        "url_segments": "api/create/${moduleName}",
        "request_type": "POST",
        "description": "Insert database record",
        "enableParams": true,
        "authorization":{  
            "roles": [
                "admin"
            ]
        },
        "beforeHook": "_prep_input",
        "afterHook": "_fetch_item_details"
      },
      "Insert Batch": {
        "url_segments": "api/batch/${moduleName}",
        "request_type": "POST",
        "description": "Insert multiple records",
        "enableParams": true
      },
      "Update": {
        "url_segments": "api/update/${moduleName}/{id}",
        "request_type": "PUT",
        "description": "Update a database record",
        "enableParams": true,
        "required_fields": [
          {
            "name": "id",
            "label": "ID"
          }
        ],
        "authorization":{  
            "roles": [
                "admin"
            ]
        },
        "beforeHook": "_prep_input",
        "afterHook": "_fetch_item_details"
      },
      "Destroy": {
        "url_segments": "api/destroy/${moduleName}",
        "request_type": "DELETE",
        "description": "Delete row or rows",
        "enableParams": true
      },
      "Delete One": {
        "url_segments": "api/delete/${moduleName}/{id}",
        "request_type": "DELETE",
        "description": "Delete one row",
        "required_fields": [
          {
            "name": "id",
            "label": "ID"
          }
        ],
        "authorization":{  
            "roles": [
                "admin"
            ]
        }
      }
    }`;
}
