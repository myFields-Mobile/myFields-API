define({ "api": [
  {
    "type": "post",
    "url": "api/authenticate",
    "title": "Request authentication token.",
    "name": "Authenticate",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The users email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The users password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>A welcome message to the api.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The valid Json Web Token needed for authentication.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Authentication/authentication.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "api/",
    "title": "Request root of MyFields API",
    "name": "GetRoot",
    "group": "Authentication",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>A welcome message to the api.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "api/boundary/create",
    "title": "Create",
    "name": "CreateBoundary",
    "group": "Boundary",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the new boundary.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "points",
            "description": "<p>The boundary points of the new boundary.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "field",
            "description": "<p>The newly created boundary.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Boundary/boundary.js",
    "groupTitle": "Boundary"
  },
  {
    "type": "get",
    "url": "api/boundary/all",
    "title": "ListAll",
    "name": "ListAllBoundary",
    "group": "Boundary",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "object",
            "description": "<p>All boundaries.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Boundary/boundary.js",
    "groupTitle": "Boundary"
  },
  {
    "type": "get",
    "url": "api/boundary/",
    "title": "List",
    "name": "ListBoundary",
    "group": "Boundary",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "object",
            "description": "<p>All active boundaries.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Boundary/boundary.js",
    "groupTitle": "Boundary"
  },
  {
    "type": "post",
    "url": "api/boundary/{id}/update",
    "title": "Update",
    "name": "UpdateBoundary",
    "group": "Boundary",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Aconsole.log(&quot;get&quot;);ctive state of boundary.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "object",
            "description": "<p>Tillage type with provided id.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Boundary/boundary.js",
    "groupTitle": "Boundary"
  },
  {
    "type": "get",
    "url": "api/crop/",
    "title": "List",
    "name": "ListAllCrop",
    "group": "Crop",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "object",
            "description": "<p>All crop types.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Crop/crop.js",
    "groupTitle": "Crop"
  },
  {
    "type": "get",
    "url": "api/crop/{id}",
    "title": "Get",
    "name": "ListCrop",
    "group": "Crop",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "object",
            "description": "<p>Crop type with provided id.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Crop/crop.js",
    "groupTitle": "Crop"
  },
  {
    "type": "get",
    "url": "api/crop/all",
    "title": "List deactive crop",
    "name": "ListDeactiveCrop",
    "group": "Crop",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "object",
            "description": "<p>All crop types.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Crop/crop.js",
    "groupTitle": "Crop"
  },
  {
    "type": "get",
    "url": "api/field/{id}/activate",
    "title": "Activate",
    "name": "ActivateField",
    "group": "Field",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Field successfully activated.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Field/field.js",
    "groupTitle": "Field"
  },
  {
    "type": "post",
    "url": "api/field/create",
    "title": "Create",
    "name": "CreateField",
    "group": "Field",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the new field type.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "boundary_id",
            "description": "<p>The ID of the associated boundary.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "irrigation_id",
            "description": "<p>The ID of the associated irrigation.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tillage_id",
            "description": "<p>The ID of the associated tillage.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "crop_id",
            "description": "<p>The ID of the associated crop.b</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "field",
            "description": "<p>The newly created field.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Field/field.js",
    "groupTitle": "Field"
  },
  {
    "type": "get",
    "url": "api/field/{id}/deactivate",
    "title": "Deactivate",
    "name": "DeactiveField",
    "group": "Field",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Field successfully deactivated.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Field/field.js",
    "groupTitle": "Field"
  },
  {
    "type": "get",
    "url": "api/field",
    "title": "List",
    "name": "ListAllActiveFields",
    "group": "Field",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "object",
            "description": "<p>Returns all active fields.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Field/field.js",
    "groupTitle": "Field"
  },
  {
    "type": "get",
    "url": "api/field/all",
    "title": "ListAll",
    "name": "ListAllField",
    "group": "Field",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "object",
            "description": "<p>Returns all active and deactive fields.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Field/field.js",
    "groupTitle": "Field"
  },
  {
    "type": "get",
    "url": "api/field/me",
    "title": "List current user fields",
    "name": "ListFields",
    "group": "Field",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "object",
            "description": "<p>All activate and deactive fields associated with the current user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Field/field.js",
    "groupTitle": "Field"
  },
  {
    "type": "get",
    "url": "api/inspection/{id}/accept",
    "title": "Accept",
    "name": "AcceptInspection",
    "group": "Inspection",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Inspection successfully accepted.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Inspection/inspection.js",
    "groupTitle": "Inspection"
  },
  {
    "type": "get",
    "url": "api/inspection/{id}/activate",
    "title": "Activate",
    "name": "ActivateInspection",
    "group": "Inspection",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Inspection successfully activated.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Inspection/inspection.js",
    "groupTitle": "Inspection"
  },
  {
    "type": "post",
    "url": "api/inspection/create",
    "title": "Create",
    "name": "CreateInspection",
    "group": "Inspection",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "field",
            "description": "<p>The newly created inspection.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Inspection/inspection.js",
    "groupTitle": "Inspection"
  },
  {
    "type": "get",
    "url": "api/inspection/{id}/deactivate",
    "title": "Deactivate",
    "name": "DeactivateInspection",
    "group": "Inspection",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Inspection successfully deactivated.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Inspection/inspection.js",
    "groupTitle": "Inspection"
  },
  {
    "type": "get",
    "url": "api/inspection/{id}/decline",
    "title": "Decline",
    "name": "DeclineInspection",
    "group": "Inspection",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Inspection successfully declined.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Inspection/inspection.js",
    "groupTitle": "Inspection"
  },
  {
    "type": "get",
    "url": "api/inspection/me",
    "title": "List all inspections for the user",
    "name": "ListAllInspection",
    "group": "Inspection",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "object",
            "description": "<p>inspection types.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Inspection/inspection.js",
    "groupTitle": "Inspection"
  },
  {
    "type": "get",
    "url": "api/inspection/all",
    "title": "List all inspections",
    "name": "ListAllUsersInspection",
    "group": "Inspection",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "object",
            "description": "<p>All inspection types.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Inspection/inspection.js",
    "groupTitle": "Inspection"
  },
  {
    "type": "get",
    "url": "api/inspection/",
    "title": "List all active inspections for the user",
    "name": "ListInspection",
    "group": "Inspection",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "object",
            "description": "<p>inspection types.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Inspection/inspection.js",
    "groupTitle": "Inspection"
  },
  {
    "type": "get",
    "url": "api/inspection/{id}/assign",
    "title": "Assign",
    "name": "UpdateInspection",
    "group": "Inspection",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "inspector_id",
            "description": "<p>The id of the inspector being assigned.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "object",
            "description": "<p>Updated inspection type object.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Inspection/inspection.js",
    "groupTitle": "Inspection"
  },
  {
    "type": "get",
    "url": "api/irrigation/",
    "title": "List",
    "name": "ListAllIrrigation",
    "group": "Irrigation",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "object",
            "description": "<p>All irrigation types.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Irrigation/irrigation.js",
    "groupTitle": "Irrigation"
  },
  {
    "type": "get",
    "url": "api/irrigation/all",
    "title": "List deactive irrigation",
    "name": "ListDeactiveIrrigation",
    "group": "Irrigation",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "object",
            "description": "<p>All irrigation types.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Irrigation/irrigation.js",
    "groupTitle": "Irrigation"
  },
  {
    "type": "get",
    "url": "api/irrigation/{id}",
    "title": "Get",
    "name": "ListIrrigation",
    "group": "Irrigation",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "object",
            "description": "<p>Irrigation type with provided id.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Irrigation/irrigation.js",
    "groupTitle": "Irrigation"
  },
  {
    "type": "get",
    "url": "api/tillage/",
    "title": "List",
    "name": "ListAllTillage",
    "group": "Tillage",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "object",
            "description": "<p>All tillage types.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Tillage/tillage.js",
    "groupTitle": "Tillage"
  },
  {
    "type": "get",
    "url": "api/tillage/all",
    "title": "List deactive tillage",
    "name": "ListDeactiveTillage",
    "group": "Tillage",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "object",
            "description": "<p>All tillage types.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Tillage/tillage.js",
    "groupTitle": "Tillage"
  },
  {
    "type": "get",
    "url": "api/tillage/{id}",
    "title": "Get",
    "name": "ListTillage",
    "group": "Tillage",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "object",
            "description": "<p>Tillage type with provided id.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Tillage/tillage.js",
    "groupTitle": "Tillage"
  },
  {
    "type": "post",
    "url": "api/user/create",
    "title": "Create",
    "name": "CreateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The users email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The users password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>The users first name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>The users last name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>The users phone number.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>The new user object.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Users/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "api/user/me",
    "title": "Get Current User",
    "name": "GetCurrentUser",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Valid authentication JWT.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>The user object for the associated JWT.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Users/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "api/user/reset-password",
    "title": "Reset Password",
    "name": "ResetPassword",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "originalPassword",
            "description": "<p>The users original password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>The new password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "repeatedNewPassword",
            "description": "<p>The new password repeated.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>A success message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/Users/users.js",
    "groupTitle": "User"
  }
] });
