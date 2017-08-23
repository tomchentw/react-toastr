"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var endEvents = [];

var EVENTS = {
  transitionend: {
    transition: "transitionend",
    WebkitTransition: "webkitTransitionEnd",
    MozTransition: "mozTransitionEnd",
    msTransition: "MSTransitionEnd",
    OTransition: "oTransitionEnd"
  },

  animationend: {
    animation: "animationend",
    WebkitAnimation: "webkitAnimationEnd",
    MozAnimation: "mozAnimationEnd",
    msAnimation: "MSAnimationEnd",
    OAnimation: "oAnimationEnd"
  }
};

if (typeof window !== "undefined") {
  var style = document.createElement("div").style;
  for (var eventType in EVENTS) {
    if (!EVENTS.hasOwnProperty(eventType)) {
      continue;
    }
    var prefixes = EVENTS[eventType];
    for (var styleProp in prefixes) {
      if (prefixes.hasOwnProperty(styleProp) && styleProp in style) {
        endEvents.push(prefixes[styleProp]);
        break;
      }
    }
  }
}

var TransitionEvents = {
  addEndEventListener: function addEndEventListener(node, eventListener) {
    if (endEvents.length === 0) {
      setTimeout(eventListener, 0);
      return;
    }
    endEvents.forEach(function (event) {
      node.addEventListener(event, eventListener, false);
    });
  },

  removeEndEventListener: function removeEndEventListener(node, eventListener) {
    if (endEvents.length === 0) {
      return;
    }
    endEvents.forEach(function (event) {
      node.removeEventListener(event, eventListener, false);
    });
  }
};

exports.default = TransitionEvents;