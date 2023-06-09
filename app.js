!(function () {
  "use strict";
  var e = function (e, t) {
    var n,
      r =
        1 === (e.parent || e).nodeType
          ? e.parent || e
          : document.querySelector(e.parent || e),
      s = [].filter.call(
        "string" == typeof e.slides
          ? r.querySelectorAll(e.slides)
          : e.slides || r.children,
        function (e) {
          return "SCRIPT" !== e.nodeName;
        }
      ),
      a = {},
      i = function (e, t) {
        return ((t = t || {}).index = s.indexOf(e)), (t.slide = e), t;
      },
      o = function (e, t) {
        a[e] = (a[e] || []).filter(function (e) {
          return e !== t;
        });
      },
      l = function (e, t) {
        return (a[e] || []).reduce(function (e, n) {
          return e && !1 !== n(t);
        }, !0);
      },
      c = function (e, t) {
        s[e] &&
          (n && l("deactivate", i(n, t)), (n = s[e]), l("activate", i(n, t)));
      },
      d = function (e, t) {
        var r = s.indexOf(n) + e;
        l(e > 0 ? "next" : "prev", i(n, t)) && c(r, t);
      },
      u = {
        off: o,
        on: function (e, t) {
          return (a[e] || (a[e] = [])).push(t), o.bind(null, e, t);
        },
        fire: l,
        slide: function (e, t) {
          if (!arguments.length) return s.indexOf(n);
          l("slide", i(s[e], t)) && c(e, t);
        },
        next: d.bind(null, 1),
        prev: d.bind(null, -1),
        parent: r,
        slides: s,
        destroy: function (e) {
          l("destroy", i(n, e)), (a = {});
        },
      };
    return (
      (t || []).forEach(function (e) {
        e(u);
      }),
      n || c(0),
      u
    );
  };
  function t(e) {
    e.parent.classList.add("bespoke-marp-parent"),
      e.slides.forEach((e) => e.classList.add("bespoke-marp-slide")),
      e.on("activate", (t) => {
        const n = t.slide,
          r = !n.classList.contains("bespoke-marp-active");
        e.slides.forEach((e) => {
          e.classList.remove("bespoke-marp-active"),
            e.setAttribute("aria-hidden", "true");
        }),
          n.classList.add("bespoke-marp-active"),
          n.removeAttribute("aria-hidden"),
          r &&
            (n.classList.add("bespoke-marp-active-ready"),
            document.body.clientHeight,
            n.classList.remove("bespoke-marp-active-ready"));
      });
  }
  function n(e) {
    let t = 0,
      n = 0;
    Object.defineProperty(e, "fragments", {
      enumerable: !0,
      value: e.slides.map((e) => [
        null,
        ...e.querySelectorAll("[data-marpit-fragment]"),
      ]),
    });
    const r = (r) => void 0 !== e.fragments[t][n + r],
      s = (r, s) => {
        (t = r),
          (n = s),
          e.fragments.forEach((e, t) => {
            e.forEach((e, n) => {
              if (null == e) return;
              const a = t < r || (t === r && n <= s);
              e.setAttribute(
                "data-bespoke-marp-fragment",
                a ? "active" : "inactive"
              ),
                t === r && n === s
                  ? e.setAttribute(
                      "data-bespoke-marp-current-fragment",
                      "current"
                    )
                  : e.removeAttribute("data-bespoke-marp-current-fragment");
            });
          }),
          (e.fragmentIndex = s);
        const a = {
          slide: e.slides[r],
          index: r,
          fragments: e.fragments[r],
          fragmentIndex: s,
        };
        e.fire("fragment", a);
      };
    e.on("next", ({ fragment: a = !0 }) => {
      if (a) {
        if (r(1)) return s(t, n + 1), !1;
        const a = t + 1;
        e.fragments[a] && s(a, 0);
      } else {
        const r = e.fragments[t].length;
        if (n + 1 < r) return s(t, r - 1), !1;
        const a = e.fragments[t + 1];
        a && s(t + 1, a.length - 1);
      }
    }),
      e.on("prev", ({ fragment: a = !0 }) => {
        if (r(-1) && a) return s(t, n - 1), !1;
        const i = t - 1;
        e.fragments[i] && s(i, e.fragments[i].length - 1);
      }),
      e.on("slide", ({ index: t, fragment: n }) => {
        let r = 0;
        if (void 0 !== n) {
          const s = e.fragments[t];
          if (s) {
            const { length: e } = s;
            r = -1 === n ? e - 1 : Math.min(Math.max(n, 0), e - 1);
          }
        }
        s(t, r);
      }),
      s(0, 0);
  }
  /*!
   * screenfull
   * v5.1.0 - 2020-12-24
   * (c) Sindre Sorhus; MIT License
   */
  var r,
    s =
      ((function (e) {
        !(function () {
          var t =
              "undefined" != typeof window && void 0 !== window.document
                ? window.document
                : {},
            n = e.exports,
            r = (function () {
              for (
                var e,
                  n = [
                    [
                      "requestFullscreen",
                      "exitFullscreen",
                      "fullscreenElement",
                      "fullscreenEnabled",
                      "fullscreenchange",
                      "fullscreenerror",
                    ],
                    [
                      "webkitRequestFullscreen",
                      "webkitExitFullscreen",
                      "webkitFullscreenElement",
                      "webkitFullscreenEnabled",
                      "webkitfullscreenchange",
                      "webkitfullscreenerror",
                    ],
                    [
                      "webkitRequestFullScreen",
                      "webkitCancelFullScreen",
                      "webkitCurrentFullScreenElement",
                      "webkitCancelFullScreen",
                      "webkitfullscreenchange",
                      "webkitfullscreenerror",
                    ],
                    [
                      "mozRequestFullScreen",
                      "mozCancelFullScreen",
                      "mozFullScreenElement",
                      "mozFullScreenEnabled",
                      "mozfullscreenchange",
                      "mozfullscreenerror",
                    ],
                    [
                      "msRequestFullscreen",
                      "msExitFullscreen",
                      "msFullscreenElement",
                      "msFullscreenEnabled",
                      "MSFullscreenChange",
                      "MSFullscreenError",
                    ],
                  ],
                  r = 0,
                  s = n.length,
                  a = {};
                r < s;
                r++
              )
                if ((e = n[r]) && e[1] in t) {
                  for (r = 0; r < e.length; r++) a[n[0][r]] = e[r];
                  return a;
                }
              return !1;
            })(),
            s = { change: r.fullscreenchange, error: r.fullscreenerror },
            a = {
              request: function (e, n) {
                return new Promise(
                  function (s, a) {
                    var i = function () {
                      this.off("change", i), s();
                    }.bind(this);
                    this.on("change", i);
                    var o = (e = e || t.documentElement)[r.requestFullscreen](
                      n
                    );
                    o instanceof Promise && o.then(i).catch(a);
                  }.bind(this)
                );
              },
              exit: function () {
                return new Promise(
                  function (e, n) {
                    if (this.isFullscreen) {
                      var s = function () {
                        this.off("change", s), e();
                      }.bind(this);
                      this.on("change", s);
                      var a = t[r.exitFullscreen]();
                      a instanceof Promise && a.then(s).catch(n);
                    } else e();
                  }.bind(this)
                );
              },
              toggle: function (e, t) {
                return this.isFullscreen ? this.exit() : this.request(e, t);
              },
              onchange: function (e) {
                this.on("change", e);
              },
              onerror: function (e) {
                this.on("error", e);
              },
              on: function (e, n) {
                var r = s[e];
                r && t.addEventListener(r, n, !1);
              },
              off: function (e, n) {
                var r = s[e];
                r && t.removeEventListener(r, n, !1);
              },
              raw: r,
            };
          r
            ? (Object.defineProperties(a, {
                isFullscreen: {
                  get: function () {
                    return Boolean(t[r.fullscreenElement]);
                  },
                },
                element: {
                  enumerable: !0,
                  get: function () {
                    return t[r.fullscreenElement];
                  },
                },
                isEnabled: {
                  enumerable: !0,
                  get: function () {
                    return Boolean(t[r.fullscreenEnabled]);
                  },
                },
              }),
              n ? (e.exports = a) : (window.screenfull = a))
            : n
            ? (e.exports = { isEnabled: !1 })
            : (window.screenfull = { isEnabled: !1 });
        })();
      })((r = { exports: {} }), r.exports),
      r.exports);
  function a(e) {
    (e.fullscreen = () => {
      s.isEnabled && s.toggle(document.body);
    }),
      document.addEventListener("keydown", (t) => {
        (70 !== t.which && 122 !== t.which) ||
          t.altKey ||
          t.ctrlKey ||
          t.metaKey ||
          !s.isEnabled ||
          (e.fullscreen(), t.preventDefault());
      });
  }
  function i(e = 2e3) {
    return (t) => {
      let n;
      function r() {
        n && clearTimeout(n),
          (n = setTimeout(() => {
            t.parent.classList.add("bespoke-marp-inactive"),
              t.fire("marp-inactive");
          }, e)),
          t.parent.classList.contains("bespoke-marp-inactive") &&
            (t.parent.classList.remove("bespoke-marp-inactive"),
            t.fire("marp-active"));
      }
      document.addEventListener("mousedown", r),
        document.addEventListener("mousemove", r),
        document.addEventListener("touchend", r),
        setTimeout(r, 0);
    };
  }
  const o = ["AUDIO", "BUTTON", "INPUT", "SELECT", "TEXTAREA", "VIDEO"];
  function l(e) {
    e.parent.addEventListener("keydown", (e) => {
      if (!e.target) return;
      const t = e.target;
      (o.includes(t.nodeName) || "true" === t.contentEditable) &&
        e.stopPropagation();
    });
  }
  function c(e) {
    window.addEventListener("load", () => {
      for (const t of e.slides) {
        const e = t.querySelector("[data-marp-fitting]") ? "" : "hideable";
        t.setAttribute("data-bespoke-marp-load", e);
      }
    });
  }
  var d;
  function u({ interval: e = 200 } = {}) {
    return (t) => {
      document.addEventListener("keydown", (e) => {
        if (32 === e.which && e.shiftKey) t.prev();
        else if (33 === e.which || 37 === e.which || 38 === e.which)
          t.prev({ fragment: !e.shiftKey });
        else if (32 !== e.which || e.shiftKey)
          if (34 === e.which || 39 === e.which || 40 === e.which)
            t.next({ fragment: !e.shiftKey });
          else if (35 === e.which)
            t.slide(t.slides.length - 1, { fragment: -1 });
          else {
            if (36 !== e.which) return;
            t.slide(0);
          }
        else t.next();
        e.preventDefault();
      });
      let n,
        r,
        s = 0;
      t.parent.addEventListener("wheel", (a) => {
        let i = !1;
        const o = (e, t) => {
          e &&
            (i =
              i ||
              (function (e, t) {
                return (
                  (function (e, t) {
                    const n = t === d.X ? "Width" : "Height";
                    return e[`client${n}`] < e[`scroll${n}`];
                  })(e, t) &&
                  (function (e, t) {
                    const { overflow: n } = e,
                      r = e[`overflow${t}`];
                    return (
                      "auto" === n ||
                      "scroll" === n ||
                      "auto" === r ||
                      "scroll" === r
                    );
                  })(getComputedStyle(e), t)
                );
              })(e, t)),
            (null == e ? void 0 : e.parentElement) && o(e.parentElement, t);
        };
        if (
          (0 !== a.deltaX && o(a.target, d.X),
          0 !== a.deltaY && o(a.target, d.Y),
          i)
        )
          return;
        a.preventDefault(),
          r && clearTimeout(r),
          (r = setTimeout(() => {
            n = 0;
          }, e));
        const l = Date.now() - s < e,
          c = Math.sqrt(Math.pow(a.deltaX, 2) + Math.pow(a.deltaY, 2)),
          u = c <= n;
        if (((n = c), l || u)) return;
        let f;
        (a.deltaX > 0 || a.deltaY > 0) && (f = "next"),
          (a.deltaX < 0 || a.deltaY < 0) && (f = "prev"),
          f && (t[f](), (s = Date.now()));
      });
    };
  }
  !(function (e) {
    (e.X = "X"), (e.Y = "Y");
  })(d || (d = {}));
  const f = (...e) => history.replaceState(...e),
    m = "data-bespoke-view";
  var p;
  !(function (e) {
    (e.Normal = ""), (e.Presenter = "presenter"), (e.Next = "next");
  })(p || (p = {}));
  const h = (e, { protocol: t, host: n, pathname: r, hash: s } = location) => {
      const a = e.toString();
      return `${t}//${n}${r}${a ? "?" : ""}${a}${s}`;
    },
    g = () => {
      switch (document.body.getAttribute(m)) {
        case p.Normal:
          return p.Normal;
        case p.Presenter:
          return p.Presenter;
        case p.Next:
          return p.Next;
        default:
          throw new Error("View mode is not assigned.");
      }
    },
    v = (e) => new URLSearchParams(location.search).get(e),
    b = (e, t = {}) => {
      const n = Object.assign({ location: location, setter: f }, t),
        r = new URLSearchParams(n.location.search);
      for (const t of Object.keys(e)) {
        const n = e[t];
        "string" == typeof n ? r.set(t, n) : r.delete(t);
      }
      try {
        n.setter(null, document.title, h(r, n.location));
      } catch (e) {
        console.error(e);
      }
    },
    w = {
      available: (() => {
        try {
          return (
            localStorage.setItem("bespoke-marp", "bespoke-marp"),
            localStorage.removeItem("bespoke-marp"),
            !0
          );
        } catch (e) {
          return (
            console.warn(
              "Warning: Using localStorage is restricted in the current host so some features may not work."
            ),
            !1
          );
        }
      })(),
      get: (e) => {
        try {
          return localStorage.getItem(e);
        } catch (e) {
          return null;
        }
      },
      set: (e, t) => {
        try {
          return localStorage.setItem(e, t), !0;
        } catch (e) {
          return !1;
        }
      },
      remove: (e) => {
        try {
          return localStorage.removeItem(e), !0;
        } catch (e) {
          return !1;
        }
      },
    };
  function y(e = ".bespoke-marp-osc") {
    const t = document.querySelector(e);
    if (!t) return () => {};
    const n = (e, n) => {
      t.querySelectorAll(
        `[data-bespoke-marp-osc=${JSON.stringify(e)}]`
      ).forEach(n);
    };
    return (
      s.isEnabled || n("fullscreen", (e) => (e.style.display = "none")),
      w.available ||
        n("presenter", (e) => {
          (e.disabled = !0),
            (e.title =
              "Presenter view is disabled due to restricted localStorage.");
        }),
      (e) => {
        t.addEventListener("click", (t) => {
          if (t.target instanceof HTMLElement) {
            const { bespokeMarpOsc: n } = t.target.dataset;
            switch ((n && t.target.blur(), n)) {
              case "next":
                e.next({ fragment: !t.shiftKey });
                break;
              case "prev":
                e.prev({ fragment: !t.shiftKey });
                break;
              case "fullscreen":
                "function" == typeof e.fullscreen &&
                  s.isEnabled &&
                  e.fullscreen();
                break;
              case "presenter":
                e.openPresenterView();
            }
          }
        }),
          e.parent.appendChild(t),
          e.on("activate", ({ index: t }) => {
            n(
              "page",
              (n) => (n.textContent = `Page ${t + 1} of ${e.slides.length}`)
            );
          }),
          e.on("fragment", ({ index: t, fragments: r, fragmentIndex: s }) => {
            n("prev", (e) => (e.disabled = 0 === t && 0 === s)),
              n(
                "next",
                (n) =>
                  (n.disabled = t === e.slides.length - 1 && s === r.length - 1)
              );
          }),
          e.on("marp-active", () => t.removeAttribute("aria-hidden")),
          e.on("marp-inactive", () => t.setAttribute("aria-hidden", "true")),
          s.isEnabled &&
            s.onchange(() =>
              n("fullscreen", (e) =>
                e.classList.toggle("exit", s.isEnabled && s.isFullscreen)
              )
            );
      }
    );
  }
  function x() {
    const e = Math.max(Math.floor(0.85 * window.innerWidth), 640),
      t = Math.max(Math.floor(0.85 * window.innerHeight), 360);
    return window.open(
      this.presenterUrl,
      `bespoke-marp-presenter-${this.syncKey}`,
      `width=${e},height=${t},menubar=no,toolbar=no`
    );
  }
  function k() {
    const e = new URLSearchParams(location.search);
    return e.set("view", "presenter"), e.set("sync", this.syncKey), h(e);
  }
  var E = [
    "area",
    "base",
    "br",
    "col",
    "command",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
  ];
  let L = (e) => String(e).replace(/[&<>"']/g, (e) => `&${S[e]};`),
    S = { "&": "amp", "<": "lt", ">": "gt", '"': "quot", "'": "apos" },
    I = "dangerouslySetInnerHTML",
    P = { className: "class", htmlFor: "for" },
    M = {};
  function N(e, t) {
    let n = [],
      r = "";
    t = t || {};
    for (let e = arguments.length; e-- > 2; ) n.push(arguments[e]);
    if ("function" == typeof e) return (t.children = n.reverse()), e(t);
    if (e) {
      if (((r += "<" + e), t))
        for (let e in t)
          !1 !== t[e] &&
            null != t[e] &&
            e !== I &&
            (r += ` ${P[e] ? P[e] : L(e)}="${L(t[e])}"`);
      r += ">";
    }
    if (-1 === E.indexOf(e)) {
      if (t[I]) r += t[I].__html;
      else
        for (; n.length; ) {
          let e = n.pop();
          if (e)
            if (e.pop) for (let t = e.length; t--; ) n.push(e[t]);
            else r += !0 === M[e] ? e : L(e);
        }
      r += e ? `</${e}>` : "";
    }
    return (M[r] = !0), r;
  }
  const F = ({ children: e }) => N(null, null, ...e),
    $ = "bespoke-marp-presenter-container",
    O = "bespoke-marp-presenter-next",
    q = "bespoke-marp-presenter-next-container",
    C = "bespoke-marp-presenter-note-container",
    T = "bespoke-marp-presenter-info-container",
    A = "bespoke-marp-presenter-info-page",
    K = "bespoke-marp-presenter-info-page-text",
    j = "bespoke-marp-presenter-info-page-prev",
    R = "bespoke-marp-presenter-info-page-next",
    U = "bespoke-marp-presenter-info-time",
    D = "bespoke-marp-presenter-info-timer";
  function V(e) {
    const { title: t } = document;
    document.title = "[Presenter view]" + (t ? ` - ${t}` : "");
    const n = {},
      r = (e) => ((n[e] = n[e] || document.querySelector(`.${e}`)), n[e]);
    document.body.appendChild(
      ((e) => {
        const t = document.createElement("div");
        return (
          (t.className = $),
          t.appendChild(e),
          t.insertAdjacentHTML(
            "beforeend",
            N(
              F,
              null,
              N(
                "div",
                { class: q },
                N("iframe", { class: O, src: "?view=next" })
              ),
              N("div", { class: C }),
              N(
                "div",
                { class: T },
                N(
                  "div",
                  { class: A },
                  N(
                    "button",
                    { class: j, tabindex: "-1", title: "Previous" },
                    "Previous"
                  ),
                  N("span", { class: K }),
                  N(
                    "button",
                    { class: R, tabindex: "-1", title: "Next" },
                    "Next"
                  )
                ),
                N("time", { class: U, title: "Current time" }),
                N("div", { class: D })
              )
            )
          ),
          t
        );
      })(e.parent)
    ),
      ((e) => {
        r(q).addEventListener("click", () => e.next());
        const t = r(O),
          n =
            ((s = t),
            (e, t) => {
              var n;
              return null === (n = s.contentWindow) || void 0 === n
                ? void 0
                : n.postMessage(
                    `navigate:${e},${t}`,
                    "null" === window.origin ? "*" : window.origin
                  );
            });
        var s;
        t.addEventListener("load", () => {
          r(q).classList.add("active"),
            n(e.slide(), e.fragmentIndex),
            e.on("fragment", ({ index: e, fragmentIndex: t }) => n(e, t));
        });
        const a = document.querySelectorAll(".bespoke-marp-note");
        a.forEach((e) => {
          e.addEventListener("keydown", (e) => e.stopPropagation()),
            r(C).appendChild(e);
        }),
          e.on("activate", () =>
            a.forEach((t) =>
              t.classList.toggle("active", t.dataset.index == e.slide())
            )
          ),
          e.on("activate", ({ index: t }) => {
            r(K).textContent = `${t + 1} / ${e.slides.length}`;
          });
        const i = r(j),
          o = r(R);
        i.addEventListener("click", (t) => {
          i.blur(), e.prev({ fragment: !t.shiftKey });
        }),
          o.addEventListener("click", (t) => {
            o.blur(), e.next({ fragment: !t.shiftKey });
          }),
          e.on("fragment", ({ index: t, fragments: n, fragmentIndex: r }) => {
            (i.disabled = 0 === t && 0 === r),
              (o.disabled = t === e.slides.length - 1 && r === n.length - 1);
          });
        const l = () => (r(U).textContent = new Date().toLocaleTimeString());
        l(), setInterval(l, 250);
      })(e);
  }
  function X(e) {
    const t = g();
    return (
      t === p.Next && e.appendChild(document.createElement("span")),
      (e) => {
        t === p.Normal &&
          (function (e) {
            if (!((e) => e.syncKey && "string" == typeof e.syncKey)(e))
              throw new Error(
                "The current instance of Bespoke.js is invalid for Marp bespoke presenter plugin."
              );
            Object.defineProperties(e, {
              openPresenterView: { enumerable: !0, value: x },
              presenterUrl: { enumerable: !0, get: k },
            }),
              w.available &&
                document.addEventListener("keydown", (t) => {
                  80 !== t.which ||
                    t.altKey ||
                    t.ctrlKey ||
                    t.metaKey ||
                    (t.preventDefault(), e.openPresenterView());
                });
          })(e),
          t === p.Presenter && V(e),
          t === p.Next &&
            (function (e) {
              const t = (t) => {
                if (t.origin !== window.origin) return;
                const [n, r] = t.data.split(":");
                if ("navigate" === n) {
                  const [t, n] = r.split(",");
                  let s = Number.parseInt(t, 10),
                    a = Number.parseInt(n, 10) + 1;
                  a >= e.fragments[s].length && ((s += 1), (a = 0)),
                    e.slide(s, { fragment: a });
                }
              };
              window.addEventListener("message", t),
                e.on("destroy", () => window.removeEventListener("message", t));
            })(e);
      }
    );
  }
  function Y(e) {
    e.on("activate", (t) => {
      document
        .querySelectorAll(".bespoke-progress-parent > .bespoke-progress-bar")
        .forEach((n) => {
          n.style.flexBasis = (100 * t.index) / (e.slides.length - 1) + "%";
        });
    });
  }
  const B = (e) => {
    const t = Number.parseInt(e, 10);
    return Number.isNaN(t) ? null : t;
  };
  function z(e = {}) {
    const t = Object.assign({ history: !0 }, e);
    return (e) => {
      let n = !0;
      const r = (e) => {
          const t = n;
          try {
            return (n = !0), e();
          } finally {
            n = t;
          }
        },
        s = (t = { fragment: !0 }) => {
          ((t, n) => {
            const { fragments: r, slides: s } = e,
              a = Math.max(0, Math.min(t, s.length - 1)),
              i = Math.max(0, Math.min(n || 0, r[a].length - 1));
            (a === e.slide() && i === e.fragmentIndex) ||
              e.slide(a, { fragment: i });
          })(
            (B(location.hash.slice(1)) || 1) - 1,
            t.fragment ? B(v("f") || "") : null
          );
        };
      e.on("fragment", ({ index: e, fragmentIndex: r }) => {
        n ||
          b(
            { f: 0 === r || r.toString() },
            {
              location: Object.assign(Object.assign({}, location), {
                hash: `#${e + 1}`,
              }),
              setter: (...e) =>
                t.history
                  ? history.pushState(...e)
                  : history.replaceState(...e),
            }
          );
      }),
        setTimeout(() => {
          s(),
            window.addEventListener("hashchange", () =>
              r(() => {
                s({ fragment: !1 }), b({ f: void 0 });
              })
            ),
            window.addEventListener("popstate", () => {
              n || r(() => s());
            }),
            (n = !1);
        }, 0);
    };
  }
  let H;
  function W(e = {}) {
    const t =
        e.key ||
        ((e = 21) => {
          let t = "",
            n = crypto.getRandomValues(new Uint8Array(e));
          for (; e--; ) {
            let r = 63 & n[e];
            t +=
              r < 36
                ? r.toString(36)
                : r < 62
                ? (r - 26).toString(36).toUpperCase()
                : r < 63
                ? "_"
                : "-";
          }
          return t;
        })(),
      n = `bespoke-marp-sync-${t}`,
      r = () => {
        const e = w.get(n);
        return e ? JSON.parse(e) : Object.create(null);
      },
      s = (e) => {
        const t = r(),
          s = Object.assign(Object.assign({}, t), e(t));
        return w.set(n, JSON.stringify(s)), s;
      };
    return (
      s((e) => ({ reference: (e.reference || 0) + 1 })),
      (e) => {
        Object.defineProperty(e, "syncKey", { value: t, enumerable: !0 });
        let a = !0;
        setTimeout(() => {
          e.on("fragment", (e) => {
            a &&
              s(() => ({
                index: e.index,
                fragmentIndex: e.fragmentIndex,
              }));
          });
        }, 0),
          window.addEventListener("storage", (t) => {
            if (t.key === n && t.oldValue && t.newValue) {
              const n = JSON.parse(t.oldValue),
                r = JSON.parse(t.newValue);
              if (n.index !== r.index || n.fragmentIndex !== r.fragmentIndex)
                try {
                  (a = !1), e.slide(r.index, { fragment: r.fragmentIndex });
                } finally {
                  a = !0;
                }
            }
          }),
          e.on("destroy", () => {
            const { reference: e } = r();
            void 0 === e || e <= 1
              ? w.remove(n)
              : s(() => ({ reference: e - 1 }));
          });
      }
    );
  }
  function J({
    slope: e = Math.tan((-35 * Math.PI) / 180),
    swipeThreshold: t = 30,
  } = {}) {
    return (n) => {
      let r;
      const s = n.parent,
        a = (e) => {
          const t = s.getBoundingClientRect();
          return {
            x: e.pageX - (t.left + t.right) / 2,
            y: e.pageY - (t.top + t.bottom) / 2,
          };
        };
      s.addEventListener(
        "touchstart",
        (e) => {
          r = 1 === e.touches.length ? a(e.touches[0]) : void 0;
        },
        { passive: !0 }
      ),
        s.addEventListener("touchmove", (e) => {
          if (r)
            if (1 === e.touches.length) {
              e.preventDefault();
              const t = a(e.touches[0]),
                n = t.x - r.x,
                s = t.y - r.y;
              (r.delta = Math.sqrt(
                Math.pow(Math.abs(n), 2) + Math.pow(Math.abs(s), 2)
              )),
                (r.radian = Math.atan2(n, s));
            } else r = void 0;
        }),
        s.addEventListener(
          "touchend",
          (s) => {
            if (r) {
              if (r.delta && r.delta >= t && r.radian) {
                let t = r.radian - e;
                (t = ((t + Math.PI) % (2 * Math.PI)) - Math.PI),
                  n[t < 0 ? "next" : "prev"](),
                  s.stopPropagation();
              }
              r = void 0;
            }
          },
          { passive: !0 }
        );
    };
  }
  /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ function _(
    e,
    t,
    n,
    r
  ) {
    return new (n || (n = Promise))(function (s, a) {
      function i(e) {
        try {
          l(r.next(e));
        } catch (e) {
          a(e);
        }
      }
      function o(e) {
        try {
          l(r.throw(e));
        } catch (e) {
          a(e);
        }
      }
      function l(e) {
        var t;
        e.done
          ? s(e.value)
          : ((t = e.value),
            t instanceof n
              ? t
              : new n(function (e) {
                  e(t);
                })).then(i, o);
      }
      l((r = r.apply(e, t || [])).next());
    });
  }
  const G = () => (
      void 0 === H && (H = "wakeLock" in navigator && navigator.wakeLock), H
    ),
    Q = () =>
      _(void 0, void 0, void 0, function* () {
        const e = G();
        if (e)
          try {
            const t = yield e.request("screen");
            return (
              t.addEventListener("release", () => {
                console.debug("[Marp CLI] Wake Lock was released");
              }),
              console.debug("[Marp CLI] Wake Lock is active"),
              t
            );
          } catch (e) {
            console.warn(e);
          }
        return null;
      });
  function Z() {
    return _(this, void 0, void 0, function* () {
      if (!G()) return;
      let e;
      const t = () => {
        e && "visible" === document.visibilityState && Q();
      };
      return (
        document.addEventListener("visibilitychange", t),
        document.addEventListener("fullscreenchange", t),
        (e = yield Q()),
        e
      );
    });
  }
  const ee = [p.Normal, p.Presenter, p.Next];
  !(function (r = document.getElementById("p")) {
    document.body.setAttribute(
      m,
      (() => {
        switch (v("view")) {
          case "next":
            return p.Next;
          case "presenter":
            return p.Presenter;
          default:
            return p.Normal;
        }
      })()
    );
    const s =
        ((e) => {
          const t = v(e);
          return b({ [e]: void 0 }), t;
        })("sync") || void 0,
      o = !1,
      d = !0,
      f = e(
        r,
        ((...e) => {
          const t = ee.findIndex((e) => g() === e);
          if (t < 0) throw new Error("Invalid view");
          return e.map(([e, n]) => e[t] && n).filter((e) => e);
        })(
          [[d, d, o], W({ key: s })],
          [[d, d, d], X(r)],
          [[d, d, o], l],
          [[d, d, d], t],
          [[d, o, o], i()],
          [[d, d, d], c],
          [[d, d, d], z({ history: !1 })],
          [[d, d, o], u()],
          [[d, d, o], a],
          [[d, o, o], Y],
          [[d, d, o], J()],
          [[d, o, o], y()],
          [[d, d, d], n],
          [[d, d, o], Z]
        )
      );
    window.addEventListener("beforeunload", () => b({ sync: f.syncKey })),
      window.addEventListener("unload", () => f.destroy());
  })();
})();
