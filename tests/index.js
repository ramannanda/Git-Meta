
var assert = require('assert');
var git = require('simple-git');
var fs = require("fs-extra");
var path = require('path');
var del = require('del');
var tmp = require('tmp');

var exec = require('child_process').exec;

describe('git', function() {

  var tmpCommitFile;
  var tmpEmptyFile;
  var tmpMessageFile;
  var tmpAmendFile;

  beforeEach(function(done) {
    tmpCommitFile = tmp.fileSync();
    tmpEmptyFile = tmp.fileSync();
    tmpMessageFile = tmp.fileSync();
    tmpAmendFile = tmp.fileSync();

    fs.copySync('./tests/fixtures/1.txt', tmpCommitFile.name);
    fs.copySync('./tests/fixtures/Empty.txt', tmpEmptyFile.name);
    fs.copySync('./tests/fixtures/Message.txt', tmpMessageFile.name);
    fs.copySync('./tests/fixtures/Amend.txt', tmpAmendFile.name);
    done();
  });

  afterEach(function(done) {
    fs.removeSync(tmpCommitFile.name);
    fs.removeSync(tmpEmptyFile.name);
    fs.removeSync(tmpMessageFile.name);
    fs.removeSync(tmpAmendFile.name);

    done();
  });

  describe('prepare-commit-msg', function() {
    it('should do nothing if no arguments are passed', function(done) {
      var cmd = './prepare-commit-msg';
      exec(cmd, function(err, stdout, stderr) {
        assert.equal(err, null);
        assert.equal(stdout, "No arguments supplied!\n");
        assert.equal(stderr, "");

        assert.equal(
          fs.readFileSync(tmpCommitFile.name, "utf8"),
          fs.readFileSync('./tests/fixtures/1.txt', "utf8")
        );
        done();
      });
    });

    it('should add metadata on regular commit', function(done) {
      var cmd = './prepare-commit-msg ' + tmpCommitFile.name;
      exec(cmd, function(err, stdout, stderr) {
        assert.equal(err, null);
        assert.equal(stdout, "");
        assert.equal(stderr, "");

        assert.equal(
          fs.readFileSync(tmpCommitFile.name, "utf8"),
          fs.readFileSync('./tests/fixtures/1-Meta.txt', "utf8")
        );
        done();
      });
    });

    it('should add metadata when message is passed (-m) - empty', function(done) {
      var cmd = './prepare-commit-msg ' + tmpEmptyFile.name + ' message';
      exec(cmd, function(err, stdout, stderr) {
        assert.equal(err, null);
        assert.equal(stdout, "");
        assert.equal(stderr, "");

        assert.equal(
          fs.readFileSync(tmpEmptyFile.name, "utf8"),
          fs.readFileSync('./tests/fixtures/1-Empty.txt', "utf8")
        );
        done();
      });
    });

    it('should add metadata when message is passed (-m) - message', function(done) {
      var cmd = './prepare-commit-msg ' + tmpMessageFile.name + ' message';
      exec(cmd, function(err, stdout, stderr) {
        assert.equal(err, null);
        assert.equal(stdout, "");
        assert.equal(stderr, "");

        assert.equal(
          fs.readFileSync(tmpMessageFile.name, "utf8"),
          fs.readFileSync('./tests/fixtures/1-Message.txt', "utf8")
        );
        done();
      });
    });

    it('should recomment metadata on commit ammend (--amend) - commit', function(done) {
      var cmd = './prepare-commit-msg ' + tmpAmendFile.name + ' commit HASH';
      exec(cmd, function(err, stdout, stderr) {
        assert.equal(err, null);
        assert.equal(stdout, "");
        assert.equal(stderr, "");

        assert.equal(
          fs.readFileSync(tmpAmendFile.name, "utf8"),
          fs.readFileSync('./tests/fixtures/1-Amend.txt', "utf8")
        );
        done();
      });
    });

    it('should do nothing on merge', function(done) {
      done();
    });
  });

  describe('commit-msg', function() {
    it('should exit 1 if message is empty', function() {
    });
    it('should remove commits from meta', function() {
    });
  });
});