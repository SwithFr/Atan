"use strict";

/*
    Init Atan with a simple conf object or array of objects
 */
var Atan;

Atan = function(confs) {
  this.targets = null;
  this.event = null;
  this.confs = confs;
  this.isMultiConfs = false;
  this.run();
  return this;
};

Atan.prototype.run = function() {
  if (Array.isArray(this.confs)) {
    this.targets = [];
    this.event = [];
    this.isMultiConfs = true;
  }
  return this.parseConf();
};

Atan.prototype.parseConf = function() {
  var conf, i, j, k, len, len1, ref, ref1, results, results1, target;
  if (this.isMultiConfs) {
    i = 0;
    ref = this.confs;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      conf = ref[j];
      i++;
      this.targets[i] = document.querySelectorAll(conf.targets);
      this.event[i] = conf.event;
      if (this.targets[i].length !== 0) {
        results.push((function() {
          var k, len1, ref1, results1;
          ref1 = this.targets[i];
          results1 = [];
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            target = ref1[k];
            results1.push(this.intiEvent(target, this.event[i], i));
          }
          return results1;
        }).call(this));
      } else {
        results.push(void 0);
      }
    }
    return results;
  } else {
    this.targets = document.querySelectorAll(this.confs.targets);
    this.event = this.confs.event;
    if (this.targets) {
      ref1 = this.targets;
      results1 = [];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        target = ref1[k];
        results1.push(this.intiEvent(target, this.event));
      }
      return results1;
    }
  }
};

Atan.prototype.intiEvent = function(target, event, i) {
  var fn, that, type;
  type = event.type || "load";
  fn = event["function"] || this.loadImg;
  that = this;
  i = i || false;
  return target.addEventListener(type, function(e) {
    return fn(e, that, i);
  }, false);
};

Atan.prototype.loadImg = function(event, that, i) {
  var src;
  src = that.getSource(event.target, i);
  return event.target.src = src;
};

Atan.prototype.getSource = function(target, i) {
  var conf, src;
  if (i) {
    conf = this.confs[i - 1];
  } else {
    conf = this.confs;
  }
  src = conf.source.replace("data-", "");
  if (src !== target.dataset.src) {
    return target.dataset.src;
  }
  return false;
};
