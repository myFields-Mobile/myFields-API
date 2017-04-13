var authenticationTest = require('./Authentication/authentication');
var adminTest = require('./Admin/admin');
var appTest = require('./App/app');
var appDataTest = require('./AppData/appData');
var imagesTest = require('./Images/images');

/**
 * Authentication Tests
 */
describe('Authentication', function() {
    before(function (done) {
        done();
    });

    describe('Existing User', function () {
        it('should require post parameters', function (done) {
            authenticationTest.authenticateEmptyUser(done);
        });

        it('should authenticate an existing user', function (done) {
            authenticationTest.authenticateExistingUser(done);
        });

        it('should require a valid password', function (done) {
            authenticationTest.authenticateInvalidPassword(done);
        });
    });
});

// 2016-2017 Team's Tests start here

/**
 * Admin Tests
 */

describe('Admin', function () {
    before(function (done) {
        done();
    });
});

/**
 * App Tests
 */

describe('App', function () {
    before(function (done) {
        done();
    });
});

describe('List All Apps', function (done) {
    it('should list all of the apps', function (done) {
        appTest.listAllApps(done);
    });
});

describe('Create Invalid App', function (done) {
    it('should fail to create an app', function (done) {
        appTest.createInvalidApp(done);
    });
});

describe('Create Valid App', function (done) {
    it('should succeed to create an app', function (done) {
        appTest.createValidApp(done);
    });
});

/**
 * AppData Tests
 */
describe('AppData', function () {
    before(function (done) {
        done();
    });

    describe('List All AppData', function (done) {
        it('should list all of the appdata information', function (done) {
            appDataTest.listAllAppData(done);
        });
    });

    describe('List All AppData JSON Information', function (done) {
        it('should list all of JSONs within AppData', function (done) {
            appDataTest.listAllAppDataJSON(done);
        });
    });

    describe('Create Invalid AppData', function (done) {
        it('should fail to create an AppData entry', function (done) {
            appDataTest.createInvalidAppData(done);
        });
    });

    describe('Create Valid AppData', function (done) {
        it('should successfully create an AppData entry', function (done) {
            appDataTest.createValidAppData(done);
        });
    });

    describe('Remove AppData Fail', function (done) {
        it('should fail to remove an AppData entry', function (done) {
            appDataTest.removeAppDataFail(done);
        });
    });

    describe('Remove AppData Success', function (done) {
        it('should successfully remove an AppData entry', function (done) {
            appDataTest.removeAppDataSuccess(done);
        });
    });

    describe('Filter AppData by User', function (done) {
        it('should filter the app data by a specific user', function (done) {
            appDataTest.filterAppDataByUser(done);
        });
    });

    describe('Filter AppData by Location', function (done) {
        it('should filter the app data by a specific location', function (done) {
            appDataTest.filterAppDataByLocation(done);
        });
    });

    describe('Filter AppData by App', function (done) {
        it('should filter the app data by a specific app', function (done) {
            appDataTest.filterAppDataByApp(done);
        });
    });

    describe('Get All Images', function (done) {
        it('should get all images within AppData', function (done) {
            appDataTest.getAllImages(done);
        });
    });
});

/**
 * Images Tests
 */
describe('Images', function () {
    before(function (done) {
        done();
    });

    describe('List all blob info', function (done) {
        it('should list all blob information', function (done) {
            imagesTest.listBlobs(done);
        });
    });

    describe('Invalid blob addition', function (done) {
        it('should fail to add a blob', function (done) {
            imagesTest.addBlobFail(done);
        });
    });

    describe('Valid blob addition', function (done) {
        it('should succeed to upload a blob', function (done) {
            imagesTest.addBlobSuccess(done);
        });
    });

    describe('Invalid blob stream reading', function (done) {
        it('should fail to read a blob stream', function (done) {
            imagesTest.readBlobFail(done);
        });
    });

    describe('Valid blob stream reading', function (done) {
        it('should succeed to read a blob stream', function (done) {
            imagesTest.readBlobSuccess(done);
        });
    });

    describe('Invalid blob deletion', function (done) {
        it('should fail in deleting a blob', function (done) {
            imagesTest.deleteBlobFail(done);
        });
    });

    describe('Valid blob deletion', function (done) {
        it('should succeed in deleting a blob', function (done) {
            imagesTest.deleteBlobSuccess(done);
        });
    });
});
