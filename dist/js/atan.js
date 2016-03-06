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
  var conf, i, j, len, ref, results;
  if (this.isMultiConfs) {
    i = 0;
    ref = this.confs;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      conf = ref[j];
      i++;
      results.push(this.parseEvents(conf, i));
    }
    return results;
  } else {
    return this.parseEvent();
  }
};

Atan.prototype.parseEvent = function() {
  var j, len, ref, results, target;
  this.targets = document.querySelectorAll(this.confs.targets);
  this.event = this.confs.event;
  if (this.targets) {
    ref = this.targets;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      target = ref[j];
      results.push(this.intiEvent(target, this.event));
    }
    return results;
  }
};

Atan.prototype.parseEvents = function(conf, i) {
  var event, j, len, results, target, targets;
  targets = this.targets[i] = document.querySelectorAll(conf.targets);
  event = this.event[i] = conf.event;
  if (targets.length !== 0) {
    if (event.type === "scroll") {
      return this.loadAtScroll(targets, event, i);
    } else {
      results = [];
      for (j = 0, len = targets.length; j < len; j++) {
        target = targets[j];
        results.push(this.intiEvent(target, event, i));
      }
      return results;
    }
  }
};

Atan.prototype.loadAtScroll = function(targets, event, i) {
  var h, that;
  that = this;
  h = window.innerHeight || document.clientHeight;
  if (event.loadIfVisible) {
    this.loadAllVisible(targets, h, i);
  }
  return window.addEventListener("scroll", function(e) {
    var a, delay, dh, j, len, posY, results, target;
    dh = h + document.body.scrollTop;
    a = -1;
    delay = event.options.delay || false;
    results = [];
    for (j = 0, len = targets.length; j < len; j++) {
      target = targets[j];
      posY = target.getBoundingClientRect().top;
      if (dh >= posY) {
        results.push(that.loadImg(target, that, i));
      } else {
        results.push(void 0);
      }
    }
    return results;
  }, false);
};

Atan.prototype.loadAllVisible = function(targets, h, i) {
  var j, len, posY, results, target, that;
  that = this;
  results = [];
  for (j = 0, len = targets.length; j < len; j++) {
    target = targets[j];
    posY = target.offsetTop;
    if (h >= posY) {
      results.push(that.loadImg(target, that, i));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

Atan.prototype.intiEvent = function(target, event, i) {
  var fn, that, type;
  type = event.type || "load";
  fn = event["function"] || this.loadImg;
  that = this;
  i = i || false;
  return target.addEventListener(type, function(e) {
    return fn(e.target, that, i);
  }, false);
};

Atan.prototype.loadImg = function(target, that, i) {
  var src;
  src = that.getSource(target, i);
  return target.src = src;
};

Atan.prototype.getSource = function(target, i) {
  var conf, src;
  if (i) {
    conf = this.confs[i - 1];
  } else {
    conf = this.confs;
  }
  src = conf.source.replace("data-", "");
  if (src !== target.dataset[src]) {
    return target.dataset[src];
  }
  return false;
};
