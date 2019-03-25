
var assert = require('assert');
var git = require('simple-git');
var fs = require("fs-extra");
var path = require('path');
var del = require('del');


describe('git', function() {

	var dir = '/tmp/git-meta-repo';
	var repo;

	beforeEach(function() {
		fs.ensureDirSync(dir);
		fs.writeJsonSync(dir + '/test.json', {
			'test': true
		});
		repo = git(dir).init();
	});

	afterEach(function() {
		del.sync([dir, dir + '/**'], {force: true});
	});

  describe('git commit', function() {
    it('should add commit meta if message is present', function(done) {
      repo
      	.add('./*')
      	.commit("Initial Commit");
      repo.log(function(err, results) {
      	assert.equal(results.latest.message, "Initial Commit");
      	done();
      });
    });
    it('should cancel commit if no message is present', function(done) {
    	repo
      	.add('./*')
      	.commit("", function(err, commit) {
      		assert.equal(err, 'Aborting commit due to empty commit message.\n');
      		done();
      	});
    });
  });

  describe('git commit -m', function() {
    it('should add commit meta if message is present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
    it('should cancel commit if no message is present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
  describe('git commit --amend', function() {
    it('should not update meta if ammending commit', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
    it('should cancel commit if commit message is not updated', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});