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

  collection.show = () => {
    collection.forEach(element => {
      element.style.display = '';
    })
  }

  collection.hide = () => {
    collection.forEach(element => {
      element.style.display = 'none'
    })
  }

  collection.toggle = () => {
    collection.forEach(element => {
      if (element.ownerDocument.defaultView.getComputedStyle(element, null).display === 'none') {
        element.style.display = '';
      } else {
        element.style.display = 'none';
      }
    })
  }

  collection.fadeIn = (ms = 300) => {
    collection.forEach(element => {
      element.style.transition = `opacity ${ms / 1000}s`;
      element.style.opacity = '1';
    })
  }
  collection.fadeOut = (ms = 300) => {
    collection.forEach(element => {
      element.style.transition = `opacity ${ms / 1000}s`;
      element.style.opacity = '0';
    })
  }

  collection.fadeToggle = (ms = 300) => {
    collection.forEach(el => {
      el.style.transition = `opacity ${ms / 1000}s`;
      const { opacity } = el.ownerDocument.defaultView.getComputedStyle(el, null);
      if (opacity === '1') {
        el.style.opacity = '0';
      } else {
        el.style.opacity = '1';
      }
    })
  }

  collection.slideUp = (ms = 300) => {
    collection.forEach(element => {
      const originHeight = element.getBoundingClientRect().height;
      element.style.transition = `height ${ms / 1000}s`;
      element.style.height = '0px';
    })
  }
  collection.slideDown = (ms = 300, originHeight = 50) => {
    collection.forEach(element => {
      element.style.transition = `height ${ms / 1000}s`;
      element.style.height = `${originHeight}px`;
    })
  }

  collection.slideToggle = (ms = 300, originHeight = 50) => {
    collection.forEach(element => {
      element.style.transition = `height ${ms / 1000}s`;
      const { height } = element.ownerDocument.defaultView.getComputedStyle(element, null);
      if (parseInt(height, 10) === 0) {
        element.style.height = `${originHeight}px`;
      }
      else {
        element.style.height = '0px';
      }
    })
  }

  collection.animate = (params = {}, speed = 300) => {
    const action = Object.keys(params);
    collection.forEach(el => {
      el.style.transition = `all ${speed / 1000}s`;
      action.forEach(key => {
        el.style[key] = params[key]
      })
    })
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

  collection.empty = () => {
    collection.forEach(element => {
      element.innerHTML = '';
    })
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

  collection.load = async (url, callback) => {
    try {
      const response = await fetch(url)
      const data = await response.text()
      collection.forEach(element => {
        element.innerHTML = data;
      })
      callback && callback(data)
    }
    catch (error) {

    }
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

$.isArray = (array) => {
  return Array.isArray(array);
}
$.isWindow = obj => {
  return obj !== null && obj !== undefined && obj === obj.window;
}
$.inArray = (item, array) => {
  return array.includes(item);;
}
$.isNumeric = n => {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
$.isFunction = item => {
  if (typeof item === 'function') {
    return true;
  }
  const type = Object.prototype.toString(item);
  return type === '[object Function]' || type === '[object GeneratorFunction]';
}
$.isEmptyObject = obj => {
  return Object.keys(obj).length === 0;
}

$.isPlainObject = obj => {
  if (typeof (obj) !== 'object' || obj.nodeType || obj !== null && obj !== undefined && obj === obj.window) {
    return false;
  }

  if (obj.constructor &&
    !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
    return false;
  }

  return true;
}

$.extend = (...args) => {
  return Object.assign(...args);
}
$.trim = (str) => {
  return str.trim();
}
$.type = obj => {
  const reTypeOf = /(?:^\[object\s(.*?)\]$)/;
  return Object.prototype.toString.call(obj)
    .replace(reTypeOf, '$1')
    .toLowerCase();
}
$.merge = (...args) => {
  return Array.from(new Set([].concat(...args)))
}
$.makeArray = arrayLike => {
  return Array.from(arrayLike);
}
$.parseHTML = htmlString => {
  const context = document.implementation.createHTMLDocument();
  const base = context.createElement('base');
  base.href = document.location.href;
  context.head.appendChild(base);

  context.body.innerHTML = htmlString;
  return context.body.children;
}

$.getJson = (url, success, fail) => {
  const request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      const data = JSON.parse(this.response)
      success && success(data)
    }
    else {
      fail && fail(this)
    }
  }

  request.onerror = function (error) {
    fail && fail(error)
  };

  request.send()
}

$.post = (url, data, success, fail) => {
  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      const data = JSON.parse(this.response)
      success && success(data)
    }
    else {
      fail && fail(this)
    }
  }

  request.onerror = function (error) {
    fail && fail(error)
  };
  request.send(data);
}
