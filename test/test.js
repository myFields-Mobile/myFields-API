var userTest = require('./User/user');
var authenticationTest = require('./Authentication/authentication');
var boundaryTest = require('./Boundary/boundary');
var cropTest = require('./Crop/crop');
var irrigationTest = require('./Irrigation/irrigation');
var tillageTest = require('./Tillage/tillage');
var fieldTest = require('./Field/field');
var inspectionTest = require('./Inspection/inspection');
var adminTest = require('./Admin/admin');
var appTest = require('./App/app');
var appDataTest = require('./AppData/appData');

/**
 * User Tests
 */
describe('User', function() {
  before(function(done) {
    done();
  });

  describe('New User', function() {
    it('should create new user and return user object', function(done) {
      userTest.createUser(done);
    });

    it('should not allow duplicate user emails', function(done) {
      userTest.createDuplicateUser(done);
    });
  });

  describe('Current User', function() {
    it('should require jwt header', function (done) {
      userTest.getCurrentUserRequiresJWT(done);
    });

    it('should return current user', function(done) {
      userTest.getCurrentUser(done);
    });
  });
});

/**
 * Authentication Tests
 */
describe('Authentication', function() {
  before(function(done) {
    done();
  });

  describe('Existing User', function() {
    it('should require post parameters', function (done) {
      authenticationTest.authenticateEmptyUser(done);
    });

    it('should authenticate an existing user', function(done) {
      authenticationTest.authenticateExistingUser(done);
    });

    it('should require a valid password', function(done) {
      authenticationTest.authenticateInvalidPassword(done);
    });
  });
});

/**
 * Boundary Tests
 */
describe('Boundaries', function() {
  before(function(done) {
    done();
  });

  describe('Create Boundary', function(done) {
    it('should require post params', function(done) {
      boundaryTest.createBoundaryWithoutParams(done);
    });


    it('should create boundary', function (done) {
      boundaryTest.createBoundary(done);
    });
  });

  describe('List Active Boundaries', function(done) {
    it('should list active boundaries', function(done) {
      boundaryTest.listActiveBoundaries(done);
    });
  });

  describe('Deactivate Boundary', function(done) {
    it('should deactivate given boundary', function(done) {
      boundaryTest.deactivateBoundary(done);
    });
  });

  describe('List Deactivated Boundaries', function(done) {
    it('should list deactive boundaries', function(done) {
      boundaryTest.listDeactiveBoundaries(done);
    });
  });
});

/**
 * Crop Tests
 */
describe('Crop', function() {
  before(function(done) {
    done();
  });

  describe('Create Crop', function(done) {
    it('should create a new crop', function(done) {
      cropTest.createCrop(done);
    });
    it('should not allow duplicate crops', function (done) {
      cropTest.createDuplicateCrop(done);
    });
  });

  describe('Listing Crops', function(done) {
    it('should list test crop', function(done) {
      cropTest.listTestCrop(done);
    });
    it('should list active crops', function(done) {
      cropTest.listActiveCrops(done);
    });
  });

  describe('Deactivate Crop', function(done) {
    it('should deactivate given crop', function(done) {
      cropTest.deactivateCrop(done);
    });
  });

  describe('Activate Crop', function(done) {
    it('should Activate given crop', function(done) {
      cropTest.activateCrop(done);
    });
  });
});

/**
 * Irrigation Tests
 */
describe('Irrigation', function() {
  before(function(done) {
    done();
  });

  describe('Create Irrigation', function(done) {
    it('should create a new irrigation', function(done) {
      irrigationTest.createIrrigation(done);
    });
    it('should not allow duplicate irrigations', function (done) {
      irrigationTest.createDuplicateIrrigation(done);
    });
  });

  describe('Listing Irrigations', function(done) {
    it('should list test irrigation', function(done) {
      irrigationTest.listTestIrrigation(done);
    });
    it('should list active irrigations', function(done) {
      irrigationTest.listActiveIrrigations(done);
    });
  });

  describe('Deactivate Irrigation', function(done) {
    it('should deactivate given irrigation', function(done) {
      irrigationTest.deactivateIrrigation(done);
    });
  });

  describe('Activate Irrigation', function(done) {
    it('should Activate given irrigation', function(done) {
      irrigationTest.activateIrrigation(done);
    });
  });
});

/**
 * Tillage Tests
 */
describe('Tillage', function() {
  before(function(done) {
    done();
  });

  describe('Create Tillage', function(done) {
    it('should create a new tillage', function(done) {
      tillageTest.createTillage(done);
    });
    it('should not allow duplicate tillages', function (done) {
      tillageTest.createDuplicateTillage(done);
    });
  });

  describe('Listing Tillages', function(done) {
    it('should list test tillage', function(done) {
      tillageTest.listTestTillage(done);
    });
    it('should list active tillages', function(done) {
      tillageTest.listActiveTillages(done);
    });
  });

  describe('Deactivate Tillage', function(done) {
    it('should deactivate given tillage', function(done) {
      tillageTest.deactivateTillage(done);
    });
  });

  describe('Activate Tillage', function(done) {
    it('should Activate given tillage', function(done) {
      tillageTest.activateTillage(done);
    });
  });
});

/**
 * Field Tests
 */
describe('Field', function() {
  before(function (done) {
    done();
  });

  describe('Create Field', function (done) {
    it('should create a new field', function (done) {
      fieldTest.createField(done);
    });
  });
});

/**
 * Inspection Tests
 */
describe('Inspection', function() {
  before(function (done) {
    done();
  });

  describe('Create Inspection', function(done) {
    it('should create a new inspection', function(done) {
      inspectionTest.createInspection(done);
    });
  });

  describe('Create Inspection without Params', function(done) {
    it('should fail to create inspection', function(done) {
      inspectionTest.createInspectionWithoutParams(done);
    });
  });

  describe('Add Inspector to Inspection', function(done) {
    it('should update the inspector id in inspection', function(done) {
      inspectionTest.assignInspection(done);
    });
  });

  describe('List Inspections', function(done) {
    it('should list the active inspections belonging to the user', function(done) {
      inspectionTest.listActiveInspection(done);
    });
  });

  describe('Grade Inspection', function(done) {
    it('should set the accepted property to true', function(done) {
      inspectionTest.gradeInspection(done);
    });
  });

  describe('Deactivate Inspection', function(done) {
    it('should deactivate the inspection', function(done) {
      inspectionTest.deactivateInspection(done);
    });
  });

  describe('List All Inspections', function(done) {
    it('should list all inspectoins including the deactive ones', function(done) {
      inspectionTest.listDeactiveInspections(done);
    });
  });

  // 2016-2017 Team's Tests start here

  /**
   * Admin Tests
   */

  describe('Admin', function() {
    before(function(done) {
      done();
    });
  });

   /**
   * App Tests
   */

   describe('App', function() {
    before(function(done) {
      done();
    });
  });

   /**
   * AppData Tests
   */

   describe('AppData', function() {
    before(function(done) {
      done();
    });
  });

});