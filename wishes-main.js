!(function(t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : (t.onePageScroll = e());
})(this, function() {
  "use strict";
  const t = (t, e) => {
    let s = 0;
    return o => {
      const i = Date.now();
      s + e < i && ((s = i), t(o));
    };
  };
  let e = () => {
    const t = new Blob(
        [
          "body{overflow: hidden}.one-page-scroll--page{width: 100%;height: 100%;overflow: hidden;touch-action: none;position: absolute}"
        ],
        { type: "text/css" }
      ),
      s = document.createElement("link");
    s.setAttribute("rel", "stylesheet"),
      s.setAttribute("href", URL.createObjectURL(t)),
      document.head.appendChild(s),
      (e = () => {});
  };
  return class {
    constructor({
      el: s,
      time: o = 600,
      easing: i = "ease-out",
      loop: a = !1,
      throttling: h
    } = {}) {
      if ((e(), !s || !s.length)) throw new Error("el is undefined");
      (this.time = o),
        (this.easing = i),
        (this.loop = a),
        (this.pageTotal = s.length),
        (this.active = 1),
        (h = h || o),
        (this._el = [].slice.call(s)),
        this._el.forEach((t, e) => {
          t.classList.add("one-page-scroll--page"),
            (t.style.transform = `translateY(${100 * e}%)`);
        }),
        (this._hash = this._el.map((t, e) => t.getAttribute("name") || e + 1));
      const n = () =>
        "" === location.hash
          ? 1
          : this._hash.findIndex((t, e) => {
              if (["#" + t, "#" + (e + 1)].includes(location.hash)) return !0;
            }) + 1;
      this.goto(n());
      const c = t => this.goto(t);
      (this._goto = h ? t(c, h) : c),
        window.addEventListener("popstate", t => {
          const e = n();
          e && this.goto(e, !0);
        }),
        ["keydown", "mousewheel", "DOMMouseScroll", "touchstart"].map(t =>
          document.addEventListener(t, this)
        );
    }
    goto(t) {
      return (
        (t > this.pageTotal || t < 1) && (t = this.loop ? 1 : this.active),
        t !== this.active &&
          (this._el.forEach((e, s) => {
            const o = e.style;
            (o.transition = `transform ${this.time}ms ${this.easing}`),
              (o.transform = `translateY(${100 * (s - t + 1)}%)`);
          }),
          this._el[this.active - 1].dispatchEvent(new CustomEvent("outview")),
          this._el[t - 1].dispatchEvent(new CustomEvent("inview")),
          (this.active = t),
          !arguments[1] &&
            history.replaceState({}, "", "#" + this._hash[t - 1])),
        this
      );
    }
    next() {
      return this.goto(this.active + 1);
    }
    prev() {
      return this.goto(this.active - 1);
    }
    handleEvent(t) {
      const e = t => {
          switch (t.keyCode) {
            case 33:
            case 38:
              this._goto(this.active - 1);
              break;
            case 32:
            case 34:
            case 40:
              this._goto(this.active + 1);
              break;
            case 36:
              this._goto(1);
              break;
            case 35:
              this._goto(this.pageTotal);
          }
        },
        s = t => {
          Math.max(-1, Math.min(1, t.wheelDelta || -t.detail)) < 0
            ? this._goto(this.active + 1)
            : this._goto(this.active - 1);
        },
        o = t => {
          const e = t.touches;
          e &&
            e.length &&
            ((this._touchStartY = e[0].pageY),
            document.addEventListener("touchmove", this));
        },
        i = t => {
          const e = t.touches;
          if (e && e.length) {
            t.preventDefault();
            const s = this._touchStartY - e[0].pageY;
            s >= 50 && this._goto(this.active + 1),
              s <= -50 && this._goto(this.active - 1),
              Math.abs(s) >= 50 &&
                document.removeEventListener("touchmove", this);
          }
        };
      switch (t.type) {
        case "keydown":
          e(t);
          break;
        case "mousewheel":
        case "DOMMouseScroll":
          s(t);
          break;
        case "touchstart":
          o(t);
          break;
        case "touchmove":
          i(t);
      }
    }
  };
});

var el = document.querySelectorAll("section");
var app = new onePageScroll({
  el: el
});

var app = new onePageScroll({
  loop: false
});

var app = new onePageScroll({
  time: 1000
});

var app = new onePageScroll({
  easing: "ease-out"
});

var app = new onePageScroll({
  throttling: 300
});

el.addEventListener("inview", function(e) {
  // do something
});

el.addEventListener("outview", function(e) {
  // do something
});

// next
app.next();

// prev
app.prev();

// go to a specified page
app.goto(n);
