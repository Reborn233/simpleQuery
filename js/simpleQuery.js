const createCollection = collection => {

  collection.prev = () => {
    const el = collection[0].previousElementSibling;
    return $(el);
  }

  collection.next = () => {
    const el = collection[0].nextElementSibling;
    return $(el);
  }

  collection.css = (...args) => {
    if (args.length === 1) {
      if (typeof args[0] === 'string') {
        const win = collection[0].ownerDocument.defaultView;
        return win.getComputedStyle(collection[0], null)[args[0]];
      }
      else if (typeof args[0] === 'object') {
        const entries = Object.entries(args[0]);
        entries.forEach(([property, value]) => {
          collection.forEach(element => {
            element.style[property] = value;
          })
        })
      }
    }
    else {
      const [property, value] = args;
      collection.forEach(element => {
        element.style[property] = value;
      })
    }
  }

  collection.attr = (...args) => {
    if (args.length === 1) {
      const el = collection[0];
      return el.getAttribute(args[0]);
    }
    else {
      const [property, value] = args;
      collection.forEach(element => {
        element.setAttribute(property, value);
      })
    }
  }

  collection.data = (...args) => {
    if (args.length === 1) {
      const el = collection[0];
      return el.dataset[args[0]];
    }
  }

  collection.addClass = (className) => {
    collection.forEach(element => {
      element.classList.add(className)
    })
  }

  collection.removeClass = (className) => {
    collection.forEach(element => {
      element.classList.remove(className)
    })
  }

  collection.hasClass = (className) => {
    return collection[0].classList.contains(className)
  }

  collection.toggleClass = (className) => {
    collection.forEach(element => {
      element.classList.toggle(className)
    })
  }

  collection.width = (...args) => {
    if (args.length) {
      collection.forEach(element => {
        element.style.width = args[0];
      })
    }
    else {
      return collection[0].getBoundingClientRect().width;
    }
  }

  collection.height = (...args) => {
    if (args.length) {
      collection.forEach(element => {
        element.style.height = args[0];
      })
    }
    else {
      return collection[0].getBoundingClientRect().height;
    }
  }

  collection.position = () => {
    const el = collection[0];
    return {
      left: el.offsetLeft,
      top: el.offsetTop
    };
  }

  collection.offset = () => {
    const el = collection[0];
    const box = el.getBoundingClientRect();
    return {
      top: box.top + window.pageYOffset - document.documentElement.clientTop,
      left: box.left + window.pageXOffset - document.documentElement.clientLeft
    };
  }

  collection.html = (...args) => {
    if (args.length) {
      collection.forEach(element => {
        element.innerHTML = args[0];
      })
    }
    else {
      return collection[0].innerHTML;
    }
  }

  collection.text = (...args) => {
    if (args.length) {
      collection.forEach(element => {
        element.textContent = args[0];
      })
    }
    else {
      return collection[0].textContent;
    }
  }

  collection.val = (...args) => {
    if (args.length) {
      collection.forEach(element => {
        element.value = args[0];
      })
    }
    else {
      return collection[0].value;
    }
  }

  collection.append = ele => {
    if (ele instanceof HTMLElement) {
      collection.forEach(element => {
        element.appendChild(ele);
      })
    }
  }

  collection.prepend = ele => {
    if (ele instanceof HTMLElement) {
      collection.forEach(element => {
        element.insertBefore(ele, element.firstChild);
      })
    }
  }

  collection.insertBefore = ele => {
    if (ele instanceof HTMLElement) {
      collection.forEach(element => {
        if (element.parentNode) {
          element.parentNode.insertBefore(ele, element)
        }
      })
    }
  }

  collection.insertAfter = ele => {
    if (ele instanceof HTMLElement) {
      collection.forEach(element => {
        if (element.parentNode) {
          element.parentNode.insertBefore(ele, element.nextSibling)
        }
      })
    }
  }

  collection.clone = () => {
    return collection[0].cloneNode()
  }

  collection.each = (callback) => {
    collection.forEach((element, index) => {
      const bindFunc = callback.bind(element);
      bindFunc(index, element);
    })
  }

  collection.on = (eventName, callback) => {
    collection.forEach(element => {
      element.addEventListener(eventName, callback);
    })
  }

  collection.off = (eventName, callback) => {
    collection.forEach(element => {
      element.removeEventListener(eventName, callback);
    })
  }

  return collection;
}

const $ = (...args) => {
  if (typeof args[0] === 'function') {
    document.addEventListener('DOMContentLoaded', args[0]);
  }
  else if (typeof args[0] === 'string') {
    const collection = document.querySelectorAll(args[0]);
    return createCollection(collection);
  }
  else if (args[0] instanceof HTMLElement) {
    const collection = [args[0]];
    return createCollection(collection);
  }
};
