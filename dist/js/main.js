var atan;

atan = new Atan([
  {
    "targets": ".over",
    "event": {
      "type": "mouseover"
    },
    "source": "data-src"
  }, {
    "targets": ".click",
    "event": {
      "type": "click"
    },
    "source": "data-img"
  }, {
    "targets": ".scroll",
    "event": {
      "type": "scroll",
      "loadIfVisible": true,
      "options": {
        "delay": 1000
      }
    },
    "source": "data-scroll"
  }
]);
