var atan;

atan = new Atan([
  {
    "targets": ".over",
    "event": {
      "type": "mouseover"
    },
    "source": "data-src",
    "showLoader": true
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
      "loadIfVisible": true
    },
    "source": "data-scroll",
    "showLoader": true
  }
]);
