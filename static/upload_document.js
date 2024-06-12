var readerfiles,
  drop,
  fileCount,
  fileinput,
  backdrop,
  notify,
  list,
  listwait,
  image_preview,
  dt_allowed = !1,
  listsync = !1;
function init_elements() {
  (drop = document),
    (fileCount = document.getElementById("filecount")),
    (fileinput = document.getElementById("form-files")),
    (backdrop = document.getElementById("backdrop")),
    (list = document.getElementById("list")),
    (notify = document.getElementById("notify")),
    (image_preview = document.getElementById("image_preview")),
    previewClose();
}
function init_fileinput() {
  addEventHandler(fileinput, "change", function (t) {
    return cancelDefault(t), listsync || addFiles(fileinput.files), !1;
  });
}
function init_datatransfer() {
  (dt_allowed = !0),
    (readerfiles = new DataTransfer()),
    addEventHandler(drop, "dragover", function (t) {
      return cancelDefault(t), backdrop.classList.add("visible"), !1;
    }),
    addEventHandler(drop, "dragleave", function (t) {
      return cancelDefault(t), backdrop.classList.remove("visible"), !1;
    }),
    addEventHandler(drop, "dragenter", cancelDefault),
    addEventHandler(drop, "drop", function (t) {
      cancelDefault(t),
        backdrop.classList.remove("visible"),
        addFiles(t.dataTransfer.files);
    });
}
function cancelDefault(t) {
  return (t = t || window.event) && t.preventDefault && t.preventDefault(), !1;
}
function addEventHandler(t, e, i) {
  t.addEventListener
    ? t.addEventListener(e, i, !1)
    : t.attachEvent
    ? t.attachEvent("on" + e, i)
    : (t["on" + e] = i);
}
function clearFiles() {
  (fileinput.value = ""),
    dt_allowed && (readerfiles = new DataTransfer()),
    previewClose(),
    notify_msg("Files removed."),
    listFiles();
}
function addFiles(t) {
  files_text = "Files add:</br>";
  for (var e = 0, i = t.length; e < i; e++)
    (files_text += " " + t[e].name + "</br>"),
      dt_allowed && readerfiles.items.add(t[e]);
  notify_msg(files_text), listFiles();
}
function remFile(t) {
  dt_allowed &&
    (previewClose(),
    (t = parseInt(t)) < 0 ||
      readerfiles.files.length - 1 < t ||
      (notify_msg("File removed:</br>" + readerfiles.files[t].name),
      readerfiles.items.remove(t),
      listFiles()));
}
function listFiles(t = !0) {
  if (t || listwait)
    return (
      listwait && clearTimeout(listwait),
      void (listwait = setTimeout(function () {
        (listwait = null), listFiles(!1);
      }, 200))
    );
  var e = dt_allowed ? readerfiles : fileinput;
  (listsync = !0),
    (fileCount.innerHTML = e.files.length + " files: "),
    (list.innerHTML = "");
  for (var i = 0, n = e.files.length; i < n; i++) {
    var o = document.createElement("button");
    o.setAttribute("type", "button"),
      o.setAttribute("class", "close"),
      o.setAttribute("aria-label", "Close"),
      o.setAttribute("onclick", "remFile(" + i + ")");
    var r = document.createElement("span");
    r.setAttribute("aria-hidden", "true"),
      (r.textContent = "×"),
      o.appendChild(r),
      list.appendChild(o);
    var s = document.createElement("a");
    (s.innerHTML = e.files[i].name + " size " + e.files[i].size + "B"),
      s.setAttribute("href", "#"),
      s.setAttribute("onclick", "previewFile(" + i + ")"),
      list.appendChild(s),
      list.appendChild(document.createElement("br"));
  }
  dt_allowed && (fileinput.files = readerfiles.files), (listsync = !1);
}
function previewClose() {
  image_preview.parentElement.classList.add("invisible");
}
function previewFile(t) {
  if ((previewClose(), !dt_allowed)) return;
  if ((t = parseInt(t)) < 0 || readerfiles.files.length - 1 < t) return;
  const e = new FileReader();
  ["png", "svg", "gif", "jpg", "jpeg", "tiff"].includes(
    readerfiles.files[t].name.split(".", -1).pop().toLowerCase()
  ) &&
    (e.addEventListener(
      "load",
      function () {
        previewFileReader(e.result);
      },
      !1
    ),
    e.readAsDataURL(readerfiles.files[t]));
}
function previewFileReader(t) {
  (image_preview.src = t),
    image_preview.parentElement.classList.remove("invisible");
}
function notify_msg(t) {
  (notify.innerHTML = t), notify.parentElement.classList.remove("invisible");
}
addEventHandler(window, "load", function () {
  init_elements(),
    init_fileinput(),
    window.FileReader && window.DataTransfer
      ? init_datatransfer()
      : notify_msg(
          "Your browser does not support the HTML5 FileReader.<br/> Drag and drop is disabled."
        ),
    listFiles();
}),
  (function (t) {
    function e(n) {
      if (i[n]) return i[n].exports;
      var o = (i[n] = { i: n, l: !1, exports: {} });
      return t[n].call(o.exports, o, o.exports, e), (o.l = !0), o.exports;
    }
    var i = {};
    (e.m = t),
      (e.c = i),
      (e.d = function (t, i, n) {
        e.o(t, i) || Object.defineProperty(t, i, { enumerable: !0, get: n });
      }),
      (e.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (e.t = function (t, i) {
        if ((1 & i && (t = e(t)), 8 & i)) return t;
        if (4 & i && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (
          (e.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: t }),
          2 & i && "string" != typeof t)
        )
          for (var o in t)
            e.d(
              n,
              o,
              function (e) {
                return t[e];
              }.bind(null, o)
            );
        return n;
      }),
      (e.n = function (t) {
        var i =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return e.d(i, "a", i), i;
      }),
      (e.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (e.p = ""),
      e((e.s = 239));
  })([
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {
      t.exports = function (t) {};
    },
    function (t, e, i) {
      var n = i(73),
        o = i(68),
        r = i(20),
        s = i(5),
        l = i(87),
        a = [].push,
        u = function (t) {
          var e = 1 == t,
            i = 2 == t,
            u = 3 == t,
            f = 4 == t,
            c = 6 == t,
            p = 5 == t || c;
          return function (h, d, v, m) {
            for (
              var g,
                y,
                w = r(h),
                x = o(w),
                b = n(d, v, 3),
                E = s(x.length),
                F = 0,
                _ = m || l,
                T = e ? _(h, E) : i ? _(h, 0) : void 0;
              E > F;
              F++
            )
              if ((p || F in x) && ((y = b((g = x[F]), F, w)), t))
                if (e) T[F] = y;
                else if (y)
                  switch (t) {
                    case 3:
                      return !0;
                    case 5:
                      return g;
                    case 6:
                      return F;
                    case 2:
                      a.call(T, g);
                  }
                else if (f) return !1;
            return c ? -1 : u || f ? f : T;
          };
        };
      t.exports = {
        forEach: u(0),
        map: u(1),
        filter: u(2),
        some: u(3),
        every: u(4),
        find: u(5),
        findIndex: u(6),
      };
    },
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e) {},
    function (t, e) {
      var i = {}.hasOwnProperty;
      t.exports = function (t, e) {
        return i.call(t, e);
      };
    },
    function (t, e, i) {},
    function (t, e) {
      t.exports = function (t) {
        return e;
      };
    },
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {
      var n = i(65),
        o = i(113);
      n("inspectSource", function (t) {
        return o.call(t);
      }),
        (t.exports = function (t, e, i, n) {});
    },
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e) {
      var i = Math.ceil,
        n = Math.floor;
      t.exports = function (t) {
        return isNaN((t = +t)) ? 0 : (t > 0 ? n : i)(t);
      };
    },
    function (t, e, i) {},
    function (t, e) {
      t.exports = function (t) {
        if (null == t) throw TypeError("Can't call method on " + t);
        return t;
      };
    },
    function (t, e, i) {},
    function (t, e) {
      t.exports = function (t) {};
    },
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {
      t.exports = function (t, e) {};
    },
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {
      var n,
        o,
        r,
        s = i(145),
        l = i(1),
        a = i(15),
        u = i(26),
        f = i(25),
        c = i(75),
        p = i(76),
        h = l.WeakMap;
      if (s) {
        var d = new h(),
          v = d.get,
          m = d.has,
          g = d.set;
        (n = function (t, e) {
          return g.call(d, t, e), e;
        }),
          (o = function (t) {
            return v.call(d, t) || {};
          }),
          (r = function (t) {
            return m.call(d, t);
          });
      } else {
        var y = c("state");
        (p[y] = !0),
          (n = function (t, e) {
            return u(t, y, e), e;
          }),
          (o = function (t) {
            return f(t, y) ? t[y] : {};
          }),
          (r = function (t) {
            return f(t, y);
          });
      }
      t.exports = {
        set: n,
        get: o,
        has: r,
        enforce: function (t) {
          return r(t) ? o(t) : n(t, {});
        },
        getterFor: function (t) {
          return function (e) {
            var i;
            if (!a(e) || (i = o(e)).type !== t)
              throw TypeError("Incompatible receiver, " + t + " required");
            return i;
          };
        },
      };
    },
    function (t, e, i) {
      t.exports = function (t, e) {};
    },
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {
      var n = i(15);
      t.exports = function (t, e) {
        if (!n(t)) return t;
        var i, o;
        if (e && "function" == typeof (i = t.toString) && !n((o = i.call(t))))
          return o;
        if ("function" == typeof (i = t.valueOf) && !n((o = i.call(t))))
          return o;
        if (!e && "function" == typeof (i = t.toString) && !n((o = i.call(t))))
          return o;
        throw TypeError("Can't convert object to primitive value");
      };
    },
    function (t, e) {
      t.exports = function (t, e) {
        return {
          enumerable: !(1 & t),
          configurable: !(2 & t),
          writable: !(4 & t),
          value: e,
        };
      };
    },
    function (t, e, i) {
      t.exports = Array.isArray || function (t) {};
    },
    function (t, e) {
      t.exports = function (t) {};
    },
    function (t, e, i) {
      t.exports = function (t, e, i) {};
    },
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {
      var n = i(4),
        o = i(70),
        r = i(26),
        s = n("unscopables"),
        l = Array.prototype;
      null == l[s] && r(l, s, o(null)),
        (t.exports = function (t) {
          l[s][t] = !0;
        });
    },
    function (t, e) {},
    function (t, e, i) {
      var n = i(144);
      t.exports = function (t, e) {
        return n[t] || (n[t] = void 0 !== e ? e : {});
      };
    },
    function (t, e, i) {
      t.exports = function (t) {};
    },
    function (t, e) {},
    function (t, e, i) {
      var n = i(2),
        o = i(41),
        r = "".split;
      t.exports = n(function () {
        return !Object("z").propertyIsEnumerable(0);
      })
        ? function (t) {
            return "String" == o(t) ? r.call(t, "") : Object(t);
          }
        : Object;
    },
    function (t, e) {},
    function (t, e, i) {},
    function (t, e, i) {
      t.exports = Object.keys || function (t) {};
    },
    function (t, e, i) {},
    function (t, e, i) {
      var n = i(57);
      t.exports = function (t, e, i) {
        if ((n(t), void 0 === e)) return t;
        switch (i) {
          case 0:
            return function () {
              return t.call(e);
            };
          case 1:
            return function (i) {
              return t.call(e, i);
            };
          case 2:
            return function (i, n) {
              return t.call(e, i, n);
            };
          case 3:
            return function (i, n, o) {
              return t.call(e, i, n, o);
            };
        }
        return function () {
          return t.apply(e, arguments);
        };
      };
    },
    function (t, e, i) {},
    function (t, e, i) {
      var n = i(65),
        o = i(84),
        r = n("keys");
      t.exports = function (t) {
        return r[t] || (r[t] = o(t));
      };
    },
    function (t, e) {},
    function (t, e, i) {
      "use strict";
      var n = i(54),
        o = i(22),
        r = i(55);
      t.exports = function (t, e, i) {
        var s = n(e);
        s in t ? o.f(t, s, r(0, i)) : (t[s] = i);
      };
    },
    function (t, e, i) {},
    function (t, e) {},
    function (t, e, i) {
      "use strict";
      var n,
        o,
        r = i(95),
        s = RegExp.prototype.exec,
        l = String.prototype.replace,
        a = s,
        u =
          ((n = /a/),
          (o = /b*/g),
          s.call(n, "a"),
          s.call(o, "a"),
          0 !== n.lastIndex || 0 !== o.lastIndex),
        f = void 0 !== /()??/.exec("")[1];
      (u || f) &&
        (a = function (t) {
          var e,
            i,
            n,
            o,
            a = this;
          return (
            f && (i = new RegExp("^" + a.source + "$(?!\\s)", r.call(a))),
            u && (e = a.lastIndex),
            (n = s.call(a, t)),
            u && n && (a.lastIndex = a.global ? n.index + n[0].length : e),
            f &&
              n &&
              n.length > 1 &&
              l.call(n[0], i, function () {
                for (o = 1; o < arguments.length - 2; o++)
                  void 0 === arguments[o] && (n[o] = void 0);
              }),
            n
          );
        }),
        (t.exports = a);
    },
    function (t, e, i) {
      t.exports = function (t, e, i, n) {};
    },
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e) {
      t.exports = function (t) {};
    },
    function (t, e, i) {},
    function (t, e, i) {
      var n = i(2),
        o = /#|\.prototype\./,
        r = function (t, e) {
          var i = l[s(t)];
          return i == u || (i != a && ("function" == typeof e ? n(e) : !!e));
        },
        s = (r.normalize = function (t) {
          return String(t).replace(o, ".").toLowerCase();
        }),
        l = (r.data = {}),
        a = (r.NATIVE = "N"),
        u = (r.POLYFILL = "P");
      t.exports = r;
    },
    function (t, e, i) {
      var n = i(15),
        o = i(56),
        r = i(4)("species");
      t.exports = function (t, e) {
        var i;
        return (
          o(t) &&
            ("function" != typeof (i = t.constructor) ||
            (i !== Array && !o(i.prototype))
              ? n(i) && null === (i = i[r]) && (i = void 0)
              : (i = void 0)),
          new (void 0 === i ? Array : i)(0 === e ? 0 : e)
        );
      };
    },
    function (t, e, i) {
      var n = i(25),
        o = i(20),
        r = i(75),
        s = i(126),
        l = r("IE_PROTO"),
        a = Object.prototype;
      t.exports = s
        ? Object.getPrototypeOf
        : function (t) {
            return (
              (t = o(t)),
              n(t, l)
                ? t[l]
                : "function" == typeof t.constructor &&
                  t instanceof t.constructor
                ? t.constructor.prototype
                : t instanceof Object
                ? a
                : null
            );
          };
    },
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e) {},
    function (t, e, i) {},
    function (t, e, i) {
      t.exports = function (t, e) {};
    },
    function (t, e) {
      t.exports = "";
    },
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {
      t.exports = i(1);
    },
    function (t, e) {},
    function (t, e, i) {},
    function (t, e, i) {
      t.exports = function (t) {};
    },
    function (t, e) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {
      var n = i(98),
        o = i(25),
        r = i(117),
        s = i(22).f;
      t.exports = function (t) {
        var e = n.Symbol || (n.Symbol = {});
        o(e, t) || s(e, t, { value: r.f(t) });
      };
    },
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {
      "use strict";
      var n = i(0),
        o = i(147),
        r = i(88),
        s = i(74),
        l = i(58),
        a = i(26),
        u = i(34),
        f = i(4),
        c = i(69),
        p = i(67),
        h = i(119),
        d = h.IteratorPrototype,
        v = h.BUGGY_SAFARI_ITERATORS,
        m = f("iterator"),
        g = function () {
          return this;
        };
      t.exports = function (t, e, i, f, h, y, w) {
        o(i, e, f);
        var x,
          b,
          E,
          F = function (t) {
            if (t === h && S) return S;
            if (!v && t in C) return C[t];
            switch (t) {
              case "keys":
              case "values":
              case "entries":
                return function () {
                  return new i(this, t);
                };
            }
            return function () {
              return new i(this);
            };
          },
          _ = e + " Iterator",
          T = !1,
          C = t.prototype,
          I = C[m] || C["@@iterator"] || (h && C[h]),
          S = (!v && I) || F(h),
          A = ("Array" == e && C.entries) || I;
        if (
          (A &&
            ((x = r(A.call(new t()))),
            d !== Object.prototype &&
              x.next &&
              (c ||
                r(x) === d ||
                (s ? s(x, d) : "function" != typeof x[m] && a(x, m, g)),
              l(x, _, !0, !0),
              c && (p[_] = g))),
          "values" == h &&
            I &&
            "values" !== I.name &&
            ((T = !0),
            (S = function () {
              return I.call(this);
            })),
          (c && !w) || C[m] === S || a(C, m, S),
          (p[e] = S),
          h)
        )
          if (
            ((b = {
              values: F("values"),
              keys: y ? S : F("keys"),
              entries: F("entries"),
            }),
            w)
          )
            for (E in b) (!v && !T && E in C) || u(C, E, b[E]);
          else n({ target: e, proto: !0, forced: v || T }, b);
        return b;
      };
    },
    function (t, e, i) {
      "use strict";
      var n,
        o,
        r,
        s = i(88),
        l = i(26),
        a = i(25),
        u = i(4),
        f = i(69),
        c = u("iterator"),
        p = !1;
      [].keys &&
        ("next" in (r = [].keys())
          ? (o = s(s(r))) !== Object.prototype && (n = o)
          : (p = !0)),
        null == n && (n = {}),
        f ||
          a(n, c) ||
          l(n, c, function () {
            return this;
          }),
        (t.exports = { IteratorPrototype: n, BUGGY_SAFARI_ITERATORS: p });
    },
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {
      t.exports = function (t) {};
    },
    function (t, e, i) {},
    function (t, e) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e) {},
    function (t, e, i) {},
    function (t, e) {},
    function (t, e, i) {},
    function (t, e) {},
    function (t, e) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {
      var n = i(4)("match");
      t.exports = function (t) {
        var e = /./;
        try {
          "/./"[t](e);
        } catch (i) {
          try {
            return (e[n] = !1), "/./"[t](e);
          } catch (t) {}
        }
        return !1;
      };
    },
    function (t, e, i) {
      "use strict";
      i(36), i(6);
    },
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e) {},
    function (t, e) {},
    ,
    ,
    ,
    ,
    function (t, e, i) {
      "use strict";
      i.r(e),
        i(158),
        i(162),
        i(171),
        i(175),
        i(176),
        i(211),
        i(209),
        i(207),
        i(208),
        i(223),
        i(216),
        i(217),
        i(214),
        i(226),
        i(215),
        i(225),
        i(220),
        i(224),
        i(221),
        i(228),
        i(229),
        i(104),
        i(105),
        i(230),
        i(227),
        i(212),
        i(222),
        i(174),
        i(210),
        i(173),
        i(231),
        i(232),
        i(234);
    },
  ]);
var _typeof =
  "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
    ? function (t) {
        return typeof t;
      }
    : function (t) {
        return t &&
          "function" == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? "symbol"
          : typeof t;
      };
!(function (t, e) {
  "function" == typeof define && define.amd
    ? define(["jquery"], e)
    : "object" == typeof exports
    ? (module.exports = e(require("jquery")))
    : (t.file_upload = e(t.jQuery));
})(this, function (t) {
  function e(e, i) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      (this.element = e),
        (this.input = t(this.element)),
        (this.wrapper = null),
        (this.preview = null),
        (this.filenameWrapper = null),
        (this.settings = t.extend(
          !0,
          {
            defaultFile: "",
            maxFileSize: 0,
            minWidth: 0,
            maxWidth: 0,
            minHeight: 0,
            maxHeight: 0,
            showRemove: !0,
            showLoader: !0,
            showErrors: !0,
            errorTimeout: 3e3,
            errorsPosition: "overlay",
            imgFileExtensions: ["png", "jpg", "jpeg", "gif", "bmp"],
            maxFileSizePreview: "5M",
            allowedFormats: ["portrait", "square", "landscape"],
            allowedFileExtensions: ["*"],
            messages: {
              default: "Arrastra aqui el archivo o da click",
              replace: "Arrastra aqui el archivo o da click",
              remove: "Eliminar ",
              error: "Ooops, algo salió mal.",
            },
            error: {
              fileSize: "The file size is too big ({{ value }} max).",
              minWidth: "The image width is too small ({{ value }}}px min).",
              maxWidth: "The image width is too big ({{ value }}}px max).",
              minHeight: "The image height is too small ({{ value }}}px min).",
              maxHeight: "The image height is too big ({{ value }}px max).",
              imageFormat:
                "The image format is not allowed ({{ value }} only).",
              fileExtension: "The file is not allowed ({{ value }} only).",
            },
            tpl: {
              wrap: '<div class="card card-body view file-upload"></div>',
              loader: '<div class="mask rgba-stylish-slight"></div>',
              message:
                '<div class="card-text file-upload-message"><i class="fas fa-cloud-upload-alt"></i><p>{{ default }}</p></div>',
              preview:
                '<div class="file-upload-preview"><span class="file-upload-render"></span><div class="file-upload-infos"><div class="file-upload-infos-inner"><p class="file-upload-infos-message">{{ replace }}</p></div></div></div>',
              filename:
                '<p class="file-upload-filename"><span class="file-upload-filename-inner"></span></p>',
              clearButton:
                '<button type="button" class="btn btn-sm btn-danger">{{ remove }}<i class="far fa-trash-alt ml-1"></i></button>',
              errorLine: '<p class="file-upload-error">{{ error }}</p>',
              errorsContainer:
                '<div class="file-upload-errors-container"><ul></ul></div>',
            },
          },
          i,
          this.input.data()
        )),
        (this.errorsEvent = t.Event("file_upload.errors")),
        (this.isDisabled = !1),
        (this.isInit = !1),
        (this.file = {
          object: null,
          name: null,
          size: null,
          width: null,
          height: null,
          type: null,
        }),
        Array.isArray(this.settings.allowedFormats) ||
          (this.settings.allowedFormats =
            this.settings.allowedFormats.split(" ")),
        Array.isArray(this.settings.allowedFileExtensions) ||
          (this.settings.allowedFileExtensions =
            this.settings.allowedFileExtensions.split(" ")),
        (this.onChange = this.onChange.bind(this)),
        (this.clearElement = this.clearElement.bind(this)),
        (this.onFileReady = this.onFileReady.bind(this)),
        this.translateMessages(),
        this.createElements(),
        this.setContainerSize(),
        (this.errorsEvent.errors = []),
        this.input.on("change", this.onChange);
    }
  }
  var i = "file_upload";
  return (
    (e.prototype.onChange = function () {
      this.resetPreview(), this.readFile(this.element);
    }),
    (e.prototype.createElements = function () {
      (this.isInit = !0),
        this.input.wrap(t(this.settings.tpl.wrap)),
        (this.wrapper = this.input.parent());
      var e = t(this.settings.tpl.message).insertBefore(this.input);
      t(this.settings.tpl.errorLine).appendTo(e),
        !0 === this.isTouchDevice() && this.wrapper.addClass("touch-fallback"),
        this.input.attr("disabled") &&
          ((this.isDisabled = !0), this.wrapper.addClass("disabled")),
        !0 === this.settings.showLoader &&
          ((this.loader = t(this.settings.tpl.loader)),
          this.loader.insertBefore(this.input)),
        (this.preview = t(this.settings.tpl.preview)),
        this.preview.insertAfter(this.input),
        !1 === this.isDisabled &&
          !0 === this.settings.showRemove &&
          ((this.clearButton = t(this.settings.tpl.clearButton)),
          this.clearButton.insertAfter(this.input),
          this.clearButton.on("click", this.clearElement)),
        (this.filenameWrapper = t(this.settings.tpl.filename)),
        this.filenameWrapper.prependTo(
          this.preview.find(".file-upload-infos-inner")
        ),
        !0 === this.settings.showErrors &&
          ((this.errorsContainer = t(this.settings.tpl.errorsContainer)),
          "outside" === this.settings.errorsPosition
            ? this.errorsContainer.insertAfter(this.wrapper)
            : this.errorsContainer.insertBefore(this.input));
      var i = this.settings.defaultFile || "";
      "" !== i.trim() &&
        ((this.file.name = this.cleanFilename(i)),
        this.setPreview(this.isImage(), i));
    }),
    (e.prototype.readFile = function (e) {
      if (e.files && e.files[0]) {
        var i = new FileReader(),
          n = new Image(),
          o = e.files[0],
          r = null,
          s = this,
          l = t.Event("file_upload.fileReady");
        this.clearErrors(),
          this.showLoader(),
          this.setFileInformations(o),
          (this.errorsEvent.errors = []),
          this.checkFileSize(),
          this.isFileExtensionAllowed(),
          this.isImage() &&
          this.file.size < this.sizeToByte(this.settings.maxFileSizePreview)
            ? (this.input.on("file_upload.fileReady", this.onFileReady),
              i.readAsDataURL(o),
              (i.onload = function (t) {
                (r = t.target.result),
                  (n.src = t.target.result),
                  (n.onload = function () {
                    s.setFileDimensions(this.width, this.height),
                      s.validateImage(),
                      s.input.trigger(l, [!0, r]);
                  });
              }))
            : this.onFileReady(!1);
      }
    }),
    (e.prototype.onFileReady = function (t, e, i) {
      if (
        (this.input.off("file_upload.fileReady", this.onFileReady),
        0 === this.errorsEvent.errors.length)
      )
        this.setPreview(e, i);
      else {
        this.input.trigger(this.errorsEvent, [this]);
        for (var n = this.errorsEvent.errors.length - 1; n >= 0; n--) {
          var o = this.errorsEvent.errors[n].namespace.split(".").pop();
          this.showError(o);
        }
        if (void 0 !== this.errorsContainer) {
          this.errorsContainer.addClass("visible");
          var r = this.errorsContainer;
          setTimeout(function () {
            r.removeClass("visible");
          }, this.settings.errorTimeout);
        }
        this.wrapper.addClass("has-error"),
          this.resetPreview(),
          this.clearElement();
      }
    }),
    (e.prototype.setFileInformations = function (t) {
      (this.file.object = t),
        (this.file.name = t.name),
        (this.file.size = t.size),
        (this.file.type = t.type),
        (this.file.width = null),
        (this.file.height = null);
    }),
    (e.prototype.setFileDimensions = function (t, e) {
      (this.file.width = t), (this.file.height = e);
    }),
    (e.prototype.setPreview = function (e, i) {
      this.wrapper.removeClass("has-error").addClass("has-preview"),
        this.filenameWrapper
          .children(".file-upload-filename-inner")
          .html(this.file.name);
      var n = this.preview.children(".file-upload-render");
      if ((this.hideLoader(), !0 === e)) {
        var o = t('<img class="file-upload-preview-img" />').attr("src", i);
        this.settings.height && o.css("max-height", this.settings.height),
          o.appendTo(n);
      } else
        t("<i />").attr("class", "fas fa-file").appendTo(n),
          t('<span class="file-upload-extension" />')
            .html(this.getFileType())
            .appendTo(n);
      this.preview.fadeIn();
    }),
    (e.prototype.resetPreview = function () {
      this.wrapper.removeClass("has-preview");
      var t = this.preview.children(".file-upload-render");
      t.find(".file-upload-extension").remove(),
        t.find("i").remove(),
        t.find(".file-upload-preview-img").remove(),
        this.preview.hide(),
        this.showLoader();
    }),
    (e.prototype.cleanFilename = function (t) {
      var e = t.split("\\").pop();
      return e == t && (e = t.split("/").pop()), "" !== t ? e : "";
    }),
    (e.prototype.clearElement = function () {
      if (0 === this.errorsEvent.errors.length) {
        var e = t.Event("file_upload.beforeClear");
        this.input.trigger(e, [this]),
          !1 !== e.result &&
            (this.resetFile(),
            this.input.val(""),
            this.resetPreview(),
            this.input.trigger(t.Event("file_upload.afterClear"), [this]));
      } else this.resetFile(), this.input.val(""), this.resetPreview();
    }),
    (e.prototype.resetFile = function () {
      (this.file.object = null),
        (this.file.name = null),
        (this.file.size = null),
        (this.file.type = null),
        (this.file.width = null),
        (this.file.height = null);
    }),
    (e.prototype.setContainerSize = function () {
      this.settings.height && this.wrapper.height(this.settings.height);
    }),
    (e.prototype.isTouchDevice = function () {
      return (
        "ontouchstart" in window ||
        navigator.MaxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    }),
    (e.prototype.getFileType = function () {
      return this.file.name.split(".").pop().toLowerCase();
    }),
    (e.prototype.isImage = function () {
      return (
        "-1" != this.settings.imgFileExtensions.indexOf(this.getFileType())
      );
    }),
    (e.prototype.isFileExtensionAllowed = function () {
      return (
        "-1" != this.settings.allowedFileExtensions.indexOf("*") ||
        "-1" !=
          this.settings.allowedFileExtensions.indexOf(this.getFileType()) ||
        (this.pushError("fileExtension"), !1)
      );
    }),
    (e.prototype.translateMessages = function () {
      for (var t in this.settings.tpl)
        for (var e in this.settings.messages)
          this.settings.tpl[t] = this.settings.tpl[t].replace(
            "{{ " + e + " }}",
            this.settings.messages[e]
          );
    }),
    (e.prototype.checkFileSize = function () {
      0 !== this.sizeToByte(this.settings.maxFileSize) &&
        this.file.size > this.sizeToByte(this.settings.maxFileSize) &&
        this.pushError("fileSize");
    }),
    (e.prototype.sizeToByte = function (t) {
      var e = 0;
      if (0 !== t) {
        var i = t.slice(-1).toUpperCase(),
          n = 1048576;
        "K" === i
          ? (e = 1024 * parseFloat(t))
          : "M" === i
          ? (e = parseFloat(t) * n)
          : "G" === i && (e = 1073741824 * parseFloat(t));
      }
      return e;
    }),
    (e.prototype.validateImage = function () {
      0 !== this.settings.minWidth &&
        this.settings.minWidth >= this.file.width &&
        this.pushError("minWidth"),
        0 !== this.settings.maxWidth &&
          this.settings.maxWidth <= this.file.width &&
          this.pushError("maxWidth"),
        0 !== this.settings.minHeight &&
          this.settings.minHeight >= this.file.height &&
          this.pushError("minHeight"),
        0 !== this.settings.maxHeight &&
          this.settings.maxHeight <= this.file.height &&
          this.pushError("maxHeight"),
        "-1" == this.settings.allowedFormats.indexOf(this.getImageFormat()) &&
          this.pushError("imageFormat");
    }),
    (e.prototype.getImageFormat = function () {
      return this.file.width == this.file.height
        ? "square"
        : this.file.width < this.file.height
        ? "portrait"
        : this.file.width > this.file.height
        ? "landscape"
        : void 0;
    }),
    (e.prototype.pushError = function (e) {
      var i = t.Event("file_upload.error." + e);
      this.errorsEvent.errors.push(i), this.input.trigger(i, [this]);
    }),
    (e.prototype.clearErrors = function () {
      void 0 !== this.errorsContainer &&
        this.errorsContainer.children("ul").html("");
    }),
    (e.prototype.showError = function (t) {
      void 0 !== this.errorsContainer &&
        this.errorsContainer
          .children("ul")
          .append("<li>" + this.getError(t) + "</li>");
    }),
    (e.prototype.getError = function (t) {
      var e = this.settings.error[t],
        i = "";
      return (
        "fileSize" === t
          ? (i = this.settings.maxFileSize)
          : "minWidth" === t
          ? (i = this.settings.minWidth)
          : "maxWidth" === t
          ? (i = this.settings.maxWidth)
          : "minHeight" === t
          ? (i = this.settings.minHeight)
          : "maxHeight" === t
          ? (i = this.settings.maxHeight)
          : "imageFormat" === t
          ? (i = this.settings.allowedFormats.join(", "))
          : "fileExtension" === t &&
            (i = this.settings.allowedFileExtensions.join(", ")),
        "" !== i ? e.replace("{{ value }}", i) : e
      );
    }),
    (e.prototype.showLoader = function () {
      void 0 !== this.loader && this.loader.show();
    }),
    (e.prototype.hideLoader = function () {
      void 0 !== this.loader && this.loader.hide();
    }),
    (e.prototype.destroy = function () {
      this.input.siblings().remove(), this.input.unwrap(), (this.isInit = !1);
    }),
    (e.prototype.init = function () {
      this.createElements();
    }),
    (e.prototype.isDropified = function () {
      return this.isInit;
    }),
    (t.fn[i] = function (n) {
      return (
        this.each(function () {
          t.data(this, i) || t.data(this, i, new e(this, n));
        }),
        this
      );
    }),
    e
  );
}),
  $(".file_upload").file_upload();
