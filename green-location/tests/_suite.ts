import * as path from 'path';
import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';

describe('green location tests', function () {

    before( function() {

    });

    after(() => {

    });

    it('it should succeed when valid location is given', function(done: Mocha.Done) {
        this.timeout(5000);
    
        let tp = path.join(__dirname, 'validLocationTest.js');
        let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
    
        tr.run();
        console.log(tr.succeeded);
        assert.equal(tr.succeeded, true, 'should have succeeded');
        assert.equal(tr.warningIssues.length, 0, "should have no warnings");
        assert.equal(tr.errorIssues.length, 0, "should have no errors");
        console.log(tr.stdout);
        assert.equal(tr.stdout.indexOf('Best location to deploy now is') >= 0, true, "should display best location");
        done();
    });

    it('it should fail when invalid location is given', function(done: Mocha.Done) {
        this.timeout(5000);
    
        let tp = path.join(__dirname, 'invalidLocationTest.js');
        let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
    
        tr.run();
        console.log(tr.succeeded);
        assert.equal(tr.succeeded, false, 'should have failed');
        assert.equal(tr.warningIssues.length, 0, "should have no warnings");
        assert.equal(tr.errorIssues.length, 1, "should have 1 error issue");
        assert.equal(tr.errorIssues[0], 'Request failed with status code 400', 'API response should return Bad Request status');
        assert.equal(tr.stdout.indexOf('Best location to deploy now is'), -1, "Should not display best location");
    
        done();
    });
    
    it('it should fail when location is empty', function(done: Mocha.Done) {
        this.timeout(5000);
    
        let tp = path.join(__dirname, 'emptyLocationTest.js');
        let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
    
        tr.run();
        console.log(tr.succeeded);
        assert.equal(tr.succeeded, false, 'should have failed');
        assert.equal(tr.warningIssues.length, 0, "should have no warnings");
        assert.equal(tr.errorIssues.length, 1, "should have 1 error issue");
        assert.equal(tr.stdout.indexOf('No location was selected') >= 0, true,"Should display empty location error");
    
        done();
    });
});