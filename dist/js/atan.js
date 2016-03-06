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

Atan.prototype._getTargets = function(target) {
  return [].slice.call(document.querySelectorAll(target));
};

Atan.prototype.parseEvent = function() {
  var j, len, results, target, targets;
  targets = this.targets = this._getTargets(this.confs.targets);
  if (targets) {
    results = [];
    for (j = 0, len = targets.length; j < len; j++) {
      target = targets[j];
      results.push(this.intiEvent(target, this.confs.event));
    }
    return results;
  }
};

Atan.prototype.parseEvents = function(conf, i) {
  var event, j, len, results, target, targets;
  targets = this.targets[i] = this._getTargets(conf.targets);
  event = conf.event;
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
    this.loadAllVisible(targets, h, event, i);
  }
  return window.addEventListener("scroll", function(e) {
    var j, len, posY, results, target;
    results = [];
    for (j = 0, len = targets.length; j < len; j++) {
      target = targets[j];
      posY = target.getBoundingClientRect().top;
      if (posY < h) {
        results.push(that.runLoading(target, event, i));
      } else {
        results.push(void 0);
      }
    }
    return results;
  }, false);
};

Atan.prototype.runLoading = function(target, event, i) {
  var delay, that;
  delay = event.options && event.options.delay || false;
  that = this;
  if (delay) {
    return window.setTimeout(function() {
      return that.loadImg(target, that, i);
    }, delay);
  } else {
    return that.loadImg(target, that, i);
  }
};

Atan.prototype.loadAllVisible = function(targets, h, event, i) {
  var j, len, posY, results, target, that;
  that = this;
  results = [];
  for (j = 0, len = targets.length; j < len; j++) {
    target = targets[j];
    posY = target.getBoundingClientRect().top;
    if (posY < h) {
      results.push(that.runLoading(target, event, i));
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
  if (target.src !== src) {
    if (that.confs[i - 1].showLoader) {
      target.src = './img/Loading.gif';
      window.setTimeout(function() {
        return target.src = src;
      }, 200);
    } else {
      target.src = src;
    }
  }
  this.removeTarget(target, i);
  return console.log(this.targets);
};

Atan.prototype.removeTarget = function(target, i) {
  if (i) {
    return this.targets[i].splice(this.targets[i].indexOf(target, 1));
  } else {
    return this.targets.splice(this.targets.indexOf(target, 1));
  }
};

Atan.prototype.getSource = function(target, i) {
  var conf, src;
  if (i) {
    conf = this.confs[i - 1];
  } else {
    conf = this.confs;
  }
  src = conf.source.replace("data-", "");
  return target.dataset[src];
};
