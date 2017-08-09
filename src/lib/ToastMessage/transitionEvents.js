const endEvents = [];

const EVENTS = {
  transitionend: {
    transition: `transitionend`,
    WebkitTransition: `webkitTransitionEnd`,
    MozTransition: `mozTransitionEnd`,
    msTransition: `MSTransitionEnd`,
    OTransition: `oTransitionEnd`,
  },

  animationend: {
    animation: `animationend`,
    WebkitAnimation: `webkitAnimationEnd`,
    MozAnimation: `mozAnimationEnd`,
    msAnimation: `MSAnimationEnd`,
    OAnimation: `oAnimationEnd`,
  },
};

if (typeof window !== `undefined`) {
  const style = document.createElement(`div`).style;
  for (let eventType in EVENTS) {
    if (!EVENTS.hasOwnProperty(eventType)) {
      continue
    }
    const prefixes = EVENTS[eventType];
    for (let styleProp in prefixes) {
      if (prefixes.hasOwnProperty(styleProp) && styleProp in style) {
        endEvents.push(prefixes[styleProp]);
        break;
      }
    }
  }

}

const TransitionEvents = {
  addEndEventListener: function(node, eventListener) {
    if (endEvents.length === 0) {
      setTimeout(eventListener, 0);
      return;
    }
    endEvents.forEach(function(event) {
      node.addEventListener(event, eventListener, false);
    });
  },

  removeEndEventListener: function(node, eventListener) {
    if (endEvents.length === 0) {
      return;
    }
    endEvents.forEach(function(event) {
      node.removeEventListener(event, eventListener, false);
    });
  },
};


export default TransitionEvents;
