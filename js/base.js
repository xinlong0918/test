/**
 * Created by fan.xinlong on 2017/5/23.
 */
;/*!/static/lib/require.js*/
var requirejs, require, define;
!function (global) {
    function isFunction(e) {
        return "[object Function]" === ostring.call(e)
    }

    function isArray(e) {
        return "[object Array]" === ostring.call(e)
    }

    function each(e, t) {
        if (e) {
            var i;
            for (i = 0; i < e.length && (!e[i] || !t(e[i], i, e)); i += 1);
        }
    }

    function eachReverse(e, t) {
        if (e) {
            var i;
            for (i = e.length - 1; i > -1 && (!e[i] || !t(e[i], i, e)); i -= 1);
        }
    }

    function hasProp(e, t) {
        return hasOwn.call(e, t)
    }

    function getOwn(e, t) {
        return hasProp(e, t) && e[t]
    }

    function eachProp(e, t) {
        var i;
        for (i in e)if (hasProp(e, i) && t(e[i], i))break
    }

    function mixin(e, t, i, r) {
        return t && eachProp(t, function (t, n) {
            (i || !hasProp(e, n)) && (!r || "object" != typeof t || !t || isArray(t) || isFunction(t) || t instanceof RegExp ? e[n] = t : (e[n] || (e[n] = {}), mixin(e[n], t, i, r)))
        }), e
    }

    function bind(e, t) {
        return function () {
            return t.apply(e, arguments)
        }
    }

    function scripts() {
        return document.getElementsByTagName("script")
    }

    function defaultOnError(e) {
        throw e
    }

    function getGlobal(e) {
        if (!e)return e;
        var t = global;
        return each(e.split("."), function (e) {
            t = t[e]
        }), t
    }

    function makeError(e, t, i, r) {
        var n = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
        return n.requireType = e, n.requireModules = r, i && (n.originalError = i), n
    }

    function newContext(e) {
        function t(e) {
            var t, i;
            for (t = 0; t < e.length; t++)if (i = e[t], "." === i) e.splice(t, 1), t -= 1; else if (".." === i) {
                if (0 === t || 1 === t && ".." === e[2] || ".." === e[t - 1])continue;
                t > 0 && (e.splice(t - 1, 2), t -= 2)
            }
        }

        function i(e, i, r) {
            var n, a, o, s, u, c, d, p, f, l, h, m, g = i && i.split("/"), v = y.map, x = v && v["*"];
            if (e && (e = e.split("/"), d = e.length - 1, y.nodeIdCompat && jsSuffixRegExp.test(e[d]) && (e[d] = e[d].replace(jsSuffixRegExp, "")), "." === e[0].charAt(0) && g && (m = g.slice(0, g.length - 1), e = m.concat(e)), t(e), e = e.join("/")), r && v && (g || x)) {
                o = e.split("/");
                e:for (s = o.length; s > 0; s -= 1) {
                    if (c = o.slice(0, s).join("/"), g)for (u = g.length; u > 0; u -= 1)if (a = getOwn(v, g.slice(0, u).join("/")), a && (a = getOwn(a, c))) {
                        p = a, f = s;
                        break e
                    }
                    !l && x && getOwn(x, c) && (l = getOwn(x, c), h = s)
                }
                !p && l && (p = l, f = h), p && (o.splice(0, f, p), e = o.join("/"))
            }
            return n = getOwn(y.pkgs, e), n ? n : e
        }

        function r(e) {
            isBrowser && each(scripts(), function (t) {
                return t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === q.contextName ? (t.parentNode.removeChild(t), !0) : void 0
            })
        }

        function n(e) {
            var t = getOwn(y.paths, e);
            return t && isArray(t) && t.length > 1 ? (t.shift(), q.require.undef(e), q.makeRequire(null, {skipMap: !0})([e]), !0) : void 0
        }

        function a(e) {
            var t, i = e ? e.indexOf("!") : -1;
            return i > -1 && (t = e.substring(0, i), e = e.substring(i + 1, e.length)), [t, e]
        }

        function o(e, t, r, n) {
            var o, s, u, c, d = null, p = t ? t.name : null, f = e, l = !0, h = "";
            return e || (l = !1, e = "_@r" + (A += 1)), c = a(e), d = c[0], e = c[1], d && (d = i(d, p, n), s = getOwn(j, d)), e && (d ? h = s && s.normalize ? s.normalize(e, function (e) {
                return i(e, p, n)
            }) : -1 === e.indexOf("!") ? i(e, p, n) : e : (h = i(e, p, n), c = a(h), d = c[0], h = c[1], r = !0, o = q.nameToUrl(h))), u = !d || s || r ? "" : "_unnormalized" + (T += 1), {
                prefix: d,
                name: h,
                parentMap: t,
                unnormalized: !!u,
                url: o,
                originalName: f,
                isDefine: l,
                id: (d ? d + "!" + h : h) + u
            }
        }

        function s(e) {
            var t = e.id, i = getOwn(S, t);
            return i || (i = S[t] = new q.Module(e)), i
        }

        function u(e, t, i) {
            var r = e.id, n = getOwn(S, r);
            !hasProp(j, r) || n && !n.defineEmitComplete ? (n = s(e), n.error && "error" === t ? i(n.error) : n.on(t, i)) : "defined" === t && i(j[r])
        }

        function c(e, t) {
            var i = e.requireModules, r = !1;
            t ? t(e) : (each(i, function (t) {
                var i = getOwn(S, t);
                i && (i.error = e, i.events.error && (r = !0, i.emit("error", e)))
            }), r || req.onError(e))
        }

        function d() {
            globalDefQueue.length && (each(globalDefQueue, function (e) {
                var t = e[0];
                "string" == typeof t && (q.defQueueMap[t] = !0), O.push(e)
            }), globalDefQueue = [])
        }

        function p(e) {
            delete S[e], delete k[e]
        }

        function f(e, t, i) {
            var r = e.map.id;
            e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps, function (r, n) {
                var a = r.id, o = getOwn(S, a);
                !o || e.depMatched[n] || i[a] || (getOwn(t, a) ? (e.defineDep(n, j[a]), e.check()) : f(o, t, i))
            }), i[r] = !0)
        }

        function l() {
            var e, t, i = 1e3 * y.waitSeconds, a = i && q.startTime + i < (new Date).getTime(), o = [], s = [], u = !1,
                d = !0;
            if (!x) {
                if (x = !0, eachProp(k, function (e) {
                        var i = e.map, c = i.id;
                        if (e.enabled && (i.isDefine || s.push(e), !e.error))if (!e.inited && a) n(c) ? (t = !0, u = !0) : (o.push(c), r(c)); else if (!e.inited && e.fetched && i.isDefine && (u = !0, !i.prefix))return d = !1
                    }), a && o.length)return e = makeError("timeout", "Load timeout for modules: " + o, null, o), e.contextName = q.contextName, c(e);
                d && each(s, function (e) {
                    f(e, {}, {})
                }), a && !t || !u || !isBrowser && !isWebWorker || w || (w = setTimeout(function () {
                    w = 0, l()
                }, 50)), x = !1
            }
        }

        function h(e) {
            hasProp(j, e[0]) || s(o(e[0], null, !0)).init(e[1], e[2])
        }

        function m(e, t, i, r) {
            e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(i, t, !1)
        }

        function g(e) {
            var t = e.currentTarget || e.srcElement;
            return m(t, q.onScriptLoad, "load", "onreadystatechange"), m(t, q.onScriptError, "error"), {
                node: t,
                id: t && t.getAttribute("data-requiremodule")
            }
        }

        function v() {
            var e;
            for (d(); O.length;) {
                if (e = O.shift(), null === e[0])return c(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
                h(e)
            }
            q.defQueueMap = {}
        }

        var x, b, q, E, w, y = {waitSeconds: 7, baseUrl: "./", paths: {}, bundles: {}, pkgs: {}, shim: {}, config: {}},
            S = {}, k = {}, M = {}, O = [], j = {}, P = {}, R = {}, A = 1, T = 1;
        return E = {
            require: function (e) {
                return e.require ? e.require : e.require = q.makeRequire(e.map)
            }, exports: function (e) {
                return e.usingExports = !0, e.map.isDefine ? e.exports ? j[e.map.id] = e.exports : e.exports = j[e.map.id] = {} : void 0
            }, module: function (e) {
                return e.module ? e.module : e.module = {
                    id: e.map.id, uri: e.map.url, config: function () {
                        return getOwn(y.config, e.map.id) || {}
                    }, exports: e.exports || (e.exports = {})
                }
            }
        }, b = function (e) {
            this.events = getOwn(M, e.id) || {}, this.map = e, this.shim = getOwn(y.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
        }, b.prototype = {
            init: function (e, t, i, r) {
                r = r || {}, this.inited || (this.factory = t, i ? this.on("error", i) : this.events.error && (i = bind(this, function (e) {
                        this.emit("error", e)
                    })), this.depMaps = e && e.slice(0), this.errback = i, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check())
            }, defineDep: function (e, t) {
                this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
            }, fetch: function () {
                if (!this.fetched) {
                    this.fetched = !0, q.startTime = (new Date).getTime();
                    var e = this.map;
                    return this.shim ? void q.makeRequire(this.map, {enableBuildCallback: !0})(this.shim.deps || [], bind(this, function () {
                        return e.prefix ? this.callPlugin() : this.load()
                    })) : e.prefix ? this.callPlugin() : this.load()
                }
            }, load: function () {
                var e = this.map.url;
                P[e] || (P[e] = !0, q.load(this.map.id, e))
            }, check: function () {
                if (this.enabled && !this.enabling) {
                    var e, t, i = this.map.id, r = this.depExports, n = this.exports, a = this.factory;
                    if (this.inited) {
                        if (this.error) this.emit("error", this.error); else if (!this.defining) {
                            if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                if (isFunction(a)) {
                                    if (this.events.error && this.map.isDefine || req.onError !== defaultOnError)try {
                                        n = q.execCb(i, a, r, n)
                                    } catch (o) {
                                        e = o
                                    } else n = q.execCb(i, a, r, n);
                                    if (this.map.isDefine && void 0 === n && (t = this.module, t ? n = t.exports : this.usingExports && (n = this.exports)), e)return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", c(this.error = e)
                                } else n = a;
                                this.exports = n, this.map.isDefine && !this.ignore && (j[i] = n, req.onResourceLoad && req.onResourceLoad(q, this.map, this.depMaps)), p(i), this.defined = !0
                            }
                            this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                        }
                    } else hasProp(q.defQueueMap, i) || this.fetch()
                }
            }, callPlugin: function () {
                var e = this.map, t = e.id, r = o(e.prefix);
                this.depMaps.push(r), u(r, "defined", bind(this, function (r) {
                    var n, a, d, f = getOwn(R, this.map.id), l = this.map.name,
                        h = this.map.parentMap ? this.map.parentMap.name : null,
                        m = q.makeRequire(e.parentMap, {enableBuildCallback: !0});
                    return this.map.unnormalized ? (r.normalize && (l = r.normalize(l, function (e) {
                            return i(e, h, !0)
                        }) || ""), a = o(e.prefix + "!" + l, this.map.parentMap), u(a, "defined", bind(this, function (e) {
                        this.init([], function () {
                            return e
                        }, null, {enabled: !0, ignore: !0})
                    })), d = getOwn(S, a.id), void(d && (this.depMaps.push(a), this.events.error && d.on("error", bind(this, function (e) {
                        this.emit("error", e)
                    })), d.enable()))) : f ? (this.map.url = q.nameToUrl(f), void this.load()) : (n = bind(this, function (e) {
                        this.init([], function () {
                            return e
                        }, null, {enabled: !0})
                    }), n.error = bind(this, function (e) {
                        this.inited = !0, this.error = e, e.requireModules = [t], eachProp(S, function (e) {
                            0 === e.map.id.indexOf(t + "_unnormalized") && p(e.map.id)
                        }), c(e)
                    }), n.fromText = bind(this, function (i, r) {
                        var a = e.name, u = o(a), d = useInteractive;
                        r && (i = r), d && (useInteractive = !1), s(u), hasProp(y.config, t) && (y.config[a] = y.config[t]);
                        try {
                            req.exec(i)
                        } catch (p) {
                            return c(makeError("fromtexteval", "fromText eval for " + t + " failed: " + p, p, [t]))
                        }
                        d && (useInteractive = !0), this.depMaps.push(u), q.completeLoad(a), m([a], n)
                    }), void r.load(e.name, m, n, y))
                })), q.enable(r, this), this.pluginMaps[r.id] = r
            }, enable: function () {
                k[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function (e, t) {
                    var i, r, n;
                    if ("string" == typeof e) {
                        if (e = o(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, n = getOwn(E, e.id))return void(this.depExports[t] = n(this));
                        this.depCount += 1, u(e, "defined", bind(this, function (e) {
                            this.undefed || (this.defineDep(t, e), this.check())
                        })), this.errback ? u(e, "error", bind(this, this.errback)) : this.events.error && u(e, "error", bind(this, function (e) {
                                this.emit("error", e)
                            }))
                    }
                    i = e.id, r = S[i], hasProp(E, i) || !r || r.enabled || q.enable(e, this)
                })), eachProp(this.pluginMaps, bind(this, function (e) {
                    var t = getOwn(S, e.id);
                    t && !t.enabled && q.enable(e, this)
                })), this.enabling = !1, this.check()
            }, on: function (e, t) {
                var i = this.events[e];
                i || (i = this.events[e] = []), i.push(t)
            }, emit: function (e, t) {
                each(this.events[e], function (e) {
                    e(t)
                }), "error" === e && delete this.events[e]
            }
        }, q = {
            config: y,
            contextName: e,
            registry: S,
            defined: j,
            urlFetched: P,
            defQueue: O,
            defQueueMap: {},
            Module: b,
            makeModuleMap: o,
            nextTick: req.nextTick,
            onError: c,
            configure: function (e) {
                e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/");
                var t = y.shim, i = {paths: !0, bundles: !0, config: !0, map: !0};
                eachProp(e, function (e, t) {
                    i[t] ? (y[t] || (y[t] = {}), mixin(y[t], e, !0, !0)) : y[t] = e
                }), e.bundles && eachProp(e.bundles, function (e, t) {
                    each(e, function (e) {
                        e !== t && (R[e] = t)
                    })
                }), e.shim && (eachProp(e.shim, function (e, i) {
                    isArray(e) && (e = {deps: e}), !e.exports && !e.init || e.exportsFn || (e.exportsFn = q.makeShimExports(e)), t[i] = e
                }), y.shim = t), e.packages && each(e.packages, function (e) {
                    var t, i;
                    e = "string" == typeof e ? {name: e} : e, i = e.name, t = e.location, t && (y.paths[i] = e.location), y.pkgs[i] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                }), eachProp(S, function (e, t) {
                    e.inited || e.map.unnormalized || (e.map = o(t, null, !0))
                }), (e.deps || e.callback) && q.require(e.deps || [], e.callback)
            },
            makeShimExports: function (e) {
                function t() {
                    var t;
                    return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports)
                }

                return t
            },
            makeRequire: function (t, n) {
                function a(i, r, u) {
                    var d, p, f;
                    return n.enableBuildCallback && r && isFunction(r) && (r.__requireJsBuild = !0), "string" == typeof i ? isFunction(r) ? c(makeError("requireargs", "Invalid require call"), u) : t && hasProp(E, i) ? E[i](S[t.id]) : req.get ? req.get(q, i, t, a) : (p = o(i, t, !1, !0), d = p.id, hasProp(j, d) ? j[d] : c(makeError("notloaded", 'Module name "' + d + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (v(), q.nextTick(function () {
                        v(), f = s(o(null, t)), f.skipMap = n.skipMap, f.init(i, r, u, {enabled: !0}), l()
                    }), a)
                }

                return n = n || {}, mixin(a, {
                    isBrowser: isBrowser, toUrl: function (e) {
                        var r, n = e.lastIndexOf("."), a = e.split("/")[0], o = "." === a || ".." === a;
                        return -1 !== n && (!o || n > 1) && (r = e.substring(n, e.length), e = e.substring(0, n)), q.nameToUrl(i(e, t && t.id, !0), r, !0)
                    }, defined: function (e) {
                        return hasProp(j, o(e, t, !1, !0).id)
                    }, specified: function (e) {
                        return e = o(e, t, !1, !0).id, hasProp(j, e) || hasProp(S, e)
                    }
                }), t || (a.undef = function (e) {
                    d();
                    var i = o(e, t, !0), n = getOwn(S, e);
                    n.undefed = !0, r(e), delete j[e], delete P[i.url], delete M[e], eachReverse(O, function (t, i) {
                        t[0] === e && O.splice(i, 1)
                    }), delete q.defQueueMap[e], n && (n.events.defined && (M[e] = n.events), p(e))
                }), a
            },
            enable: function (e) {
                var t = getOwn(S, e.id);
                t && s(e).enable()
            },
            completeLoad: function (e) {
                var t, i, r, a = getOwn(y.shim, e) || {}, o = a.exports;
                for (d(); O.length;) {
                    if (i = O.shift(), null === i[0]) {
                        if (i[0] = e, t)break;
                        t = !0
                    } else i[0] === e && (t = !0);
                    h(i)
                }
                if (q.defQueueMap = {}, r = getOwn(S, e), !t && !hasProp(j, e) && r && !r.inited) {
                    if (!(!y.enforceDefine || o && getGlobal(o)))return n(e) ? void 0 : c(makeError("nodefine", "No define call for " + e, null, [e]));
                    h([e, a.deps || [], a.exportsFn])
                }
                l()
            },
            nameToUrl: function (e, t, i) {
                var r, n, a, o, s, u, c, d = getOwn(y.pkgs, e);
                if (d && (e = d), c = getOwn(R, e))return q.nameToUrl(c, t, i);
                if (req.jsExtRegExp.test(e)) s = e + (t || ""); else {
                    for (r = y.paths, n = e.split("/"), a = n.length; a > 0; a -= 1)if (o = n.slice(0, a).join("/"), u = getOwn(r, o)) {
                        isArray(u) && (u = u[0]), n.splice(0, a, u);
                        break
                    }
                    s = n.join("/"), s += t || (/^data\:|\?/.test(s) || i ? "" : ".js"), s = ("/" === s.charAt(0) || s.match(/^[\w\+\.\-]+:/) ? "" : y.baseUrl) + s
                }
                return y.urlArgs ? s + ((-1 === s.indexOf("?") ? "?" : "&") + y.urlArgs) : s
            },
            load: function (e, t) {
                req.load(q, e, t)
            },
            execCb: function (e, t, i, r) {
                return t.apply(r, i)
            },
            onScriptLoad: function (e) {
                if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
                    interactiveScript = null;
                    var t = g(e);
                    q.completeLoad(t.id)
                }
            },
            onScriptError: function (e) {
                var t = g(e);
                return n(t.id) ? void 0 : c(makeError("scripterror", "Script error for: " + t.id, e, [t.id]))
            }
        }, q.require = q.makeRequire(), q
    }

    function getInteractiveScript() {
        return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function (e) {
            return "interactive" === e.readyState ? interactiveScript = e : void 0
        }), interactiveScript)
    }

    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath,
        version = "2.1.20", commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
        isWebWorker = !isBrowser && "undefined" != typeof importScripts,
        readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_", isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
        contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = !1;
    if ("undefined" == typeof define) {
        if ("undefined" != typeof requirejs) {
            if (isFunction(requirejs))return;
            cfg = requirejs, requirejs = void 0
        }
        "undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function (e, t, i, r) {
            var n, a, o = defContextName;
            return isArray(e) || "string" == typeof e || (a = e, isArray(t) ? (e = t, t = i, i = r) : e = []), a && a.context && (o = a.context), n = getOwn(contexts, o), n || (n = contexts[o] = req.s.newContext(o)), a && n.configure(a), n.require(e, t, i)
        }, req.config = function (e) {
            return req(e)
        }, req.nextTick = "undefined" != typeof setTimeout ? function (e) {
            setTimeout(e, 4)
        } : function (e) {
            e()
        }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
            contexts: contexts,
            newContext: newContext
        }, req({}), each(["toUrl", "undef", "defined", "specified"], function (e) {
            req[e] = function () {
                var t = contexts[defContextName];
                return t.require[e].apply(t, arguments)
            }
        }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function (e) {
            var t = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
            return t.type = e.scriptType || "text/javascript", t.charset = "utf-8", t.async = !0, t
        }, req.load = function (e, t, i) {
            var r, n = e && e.config || {};
            if (isBrowser)return r = req.createNode(n, t, i), n.onNodeCreated && n.onNodeCreated(r, n, t, i), r.setAttribute("data-requirecontext", e.contextName), r.setAttribute("data-requiremodule", t), !r.attachEvent || r.attachEvent.toString && r.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (r.addEventListener("load", e.onScriptLoad, !1), r.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, r.attachEvent("onreadystatechange", e.onScriptLoad)), r.src = i, currentlyAddingScript = r, baseElement ? head.insertBefore(r, baseElement) : head.appendChild(r), currentlyAddingScript = null, r;
            if (isWebWorker)try {
                importScripts(i), e.completeLoad(t)
            } catch (a) {
                e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + i, a, [t]))
            }
        }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function (e) {
            return head || (head = e.parentNode), dataMain = e.getAttribute("data-main"), dataMain ? (mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0) : void 0
        }), define = function (e, t, i) {
            var r, n;
            "string" != typeof e && (i = t, t = e, e = null), isArray(t) || (i = t, t = null), !t && isFunction(i) && (t = [], i.length && (i.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function (e, i) {
                t.push(i)
            }), t = (1 === i.length ? ["require"] : ["require", "exports", "module"]).concat(t))), useInteractive && (r = currentlyAddingScript || getInteractiveScript(), r && (e || (e = r.getAttribute("data-requiremodule")), n = contexts[r.getAttribute("data-requirecontext")])), n ? (n.defQueue.push([e, t, i]), n.defQueueMap[e] = !0) : globalDefQueue.push([e, t, i])
        }, define.amd = {jQuery: !0}, req.exec = function (text) {
            return eval(text)
        }, req(cfg)
    }
}(this);
;/*!/static/lib/jquery.js*/
!function (e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document)throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function (e, t) {
    function n(e) {
        var t = "length" in e && e.length, n = Z.type(e);
        return "function" === n || Z.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }

    function r(e, t, n) {
        if (Z.isFunction(t))return Z.grep(e, function (e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType)return Z.grep(e, function (e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (at.test(t))return Z.filter(t, e, n);
            t = Z.filter(t, e)
        }
        return Z.grep(e, function (e) {
            return U.call(t, e) >= 0 !== n
        })
    }

    function i(e, t) {
        for (; (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function o(e) {
        var t = ht[e] = {};
        return Z.each(e.match(dt) || [], function (e, n) {
            t[n] = !0
        }), t
    }

    function s() {
        J.removeEventListener("DOMContentLoaded", s, !1), e.removeEventListener("load", s, !1), Z.ready()
    }

    function a() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function () {
                return {}
            }
        }), this.expando = Z.expando + a.uid++
    }

    function u(e, t, n) {
        var r;
        if (void 0 === n && 1 === e.nodeType)if (r = "data-" + t.replace(bt, "-$1").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
            try {
                n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : xt.test(n) ? Z.parseJSON(n) : n
            } catch (i) {
            }
            yt.set(e, t, n)
        } else n = void 0;
        return n
    }

    function l() {
        return !0
    }

    function c() {
        return !1
    }

    function f() {
        try {
            return J.activeElement
        } catch (e) {
        }
    }

    function p(e, t) {
        return Z.nodeName(e, "table") && Z.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function d(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function h(e) {
        var t = Pt.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function g(e, t) {
        for (var n = 0, r = e.length; r > n; n++)vt.set(e[n], "globalEval", !t || vt.get(t[n], "globalEval"))
    }

    function m(e, t) {
        var n, r, i, o, s, a, u, l;
        if (1 === t.nodeType) {
            if (vt.hasData(e) && (o = vt.access(e), s = vt.set(t, o), l = o.events)) {
                delete s.handle, s.events = {};
                for (i in l)for (n = 0, r = l[i].length; r > n; n++)Z.event.add(t, i, l[i][n])
            }
            yt.hasData(e) && (a = yt.access(e), u = Z.extend({}, a), yt.set(t, u))
        }
    }

    function v(e, t) {
        var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && Z.nodeName(e, t) ? Z.merge([e], n) : n
    }

    function y(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && Nt.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
    }

    function x(t, n) {
        var r, i = Z(n.createElement(t)).appendTo(n.body),
            o = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(i[0])) ? r.display : Z.css(i[0], "display");
        return i.detach(), o
    }

    function b(e) {
        var t = J, n = $t[e];
        return n || (n = x(e, t), "none" !== n && n || (Wt = (Wt || Z("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = Wt[0].contentDocument, t.write(), t.close(), n = x(e, t), Wt.detach()), $t[e] = n), n
    }

    function w(e, t, n) {
        var r, i, o, s, a = e.style;
        return n = n || _t(e), n && (s = n.getPropertyValue(t) || n[t]), n && ("" !== s || Z.contains(e.ownerDocument, e) || (s = Z.style(e, t)), Bt.test(s) && It.test(t) && (r = a.width, i = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = r, a.minWidth = i, a.maxWidth = o)), void 0 !== s ? s + "" : s
    }

    function T(e, t) {
        return {
            get: function () {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function C(e, t) {
        if (t in e)return t;
        for (var n = t[0].toUpperCase() + t.slice(1), r = t, i = Gt.length; i--;)if (t = Gt[i] + n, t in e)return t;
        return r
    }

    function N(e, t, n) {
        var r = Xt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function k(e, t, n, r, i) {
        for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0,
                 s = 0; 4 > o; o += 2)"margin" === n && (s += Z.css(e, n + Tt[o], !0, i)), r ? ("content" === n && (s -= Z.css(e, "padding" + Tt[o], !0, i)), "margin" !== n && (s -= Z.css(e, "border" + Tt[o] + "Width", !0, i))) : (s += Z.css(e, "padding" + Tt[o], !0, i), "padding" !== n && (s += Z.css(e, "border" + Tt[o] + "Width", !0, i)));
        return s
    }

    function E(e, t, n) {
        var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, o = _t(e),
            s = "border-box" === Z.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = w(e, t, o), (0 > i || null == i) && (i = e.style[t]), Bt.test(i))return i;
            r = s && (Q.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + k(e, t, n || (s ? "border" : "content"), r, o) + "px"
    }

    function S(e, t) {
        for (var n, r, i, o = [], s = 0,
                 a = e.length; a > s; s++)r = e[s], r.style && (o[s] = vt.get(r, "olddisplay"), n = r.style.display, t ? (o[s] || "none" !== n || (r.style.display = ""), "" === r.style.display && Ct(r) && (o[s] = vt.access(r, "olddisplay", b(r.nodeName)))) : (i = Ct(r), "none" === n && i || vt.set(r, "olddisplay", i ? n : Z.css(r, "display"))));
        for (s = 0; a > s; s++)r = e[s], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[s] || "" : "none"));
        return e
    }

    function D(e, t, n, r, i) {
        return new D.prototype.init(e, t, n, r, i)
    }

    function j() {
        return setTimeout(function () {
            Qt = void 0
        }), Qt = Z.now()
    }

    function A(e, t) {
        var n, r = 0, i = {height: e};
        for (t = t ? 1 : 0; 4 > r; r += 2 - t)n = Tt[r], i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function L(e, t, n) {
        for (var r, i = (nn[t] || []).concat(nn["*"]), o = 0,
                 s = i.length; s > o; o++)if (r = i[o].call(n, t, e))return r
    }

    function q(e, t, n) {
        var r, i, o, s, a, u, l, c, f = this, p = {}, d = e.style, h = e.nodeType && Ct(e), g = vt.get(e, "fxshow");
        n.queue || (a = Z._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, u = a.empty.fire, a.empty.fire = function () {
            a.unqueued || u()
        }), a.unqueued++, f.always(function () {
            f.always(function () {
                a.unqueued--, Z.queue(e, "fx").length || a.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], l = Z.css(e, "display"), c = "none" === l ? vt.get(e, "olddisplay") || b(e.nodeName) : l, "inline" === c && "none" === Z.css(e, "float") && (d.display = "inline-block")), n.overflow && (d.overflow = "hidden", f.always(function () {
            d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
        }));
        for (r in t)if (i = t[r], Kt.exec(i)) {
            if (delete t[r], o = o || "toggle" === i, i === (h ? "hide" : "show")) {
                if ("show" !== i || !g || void 0 === g[r])continue;
                h = !0
            }
            p[r] = g && g[r] || Z.style(e, r)
        } else l = void 0;
        if (Z.isEmptyObject(p)) "inline" === ("none" === l ? b(e.nodeName) : l) && (d.display = l); else {
            g ? "hidden" in g && (h = g.hidden) : g = vt.access(e, "fxshow", {}), o && (g.hidden = !h), h ? Z(e).show() : f.done(function () {
                Z(e).hide()
            }), f.done(function () {
                var t;
                vt.remove(e, "fxshow");
                for (t in p)Z.style(e, t, p[t])
            });
            for (r in p)s = L(h ? g[r] : 0, r, f), r in g || (g[r] = s.start, h && (s.end = s.start, s.start = "width" === r || "height" === r ? 1 : 0))
        }
    }

    function H(e, t) {
        var n, r, i, o, s;
        for (n in e)if (r = Z.camelCase(n), i = t[r], o = e[n], Z.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), s = Z.cssHooks[r], s && "expand" in s) {
            o = s.expand(o), delete e[r];
            for (n in o)n in e || (e[n] = o[n], t[n] = i)
        } else t[r] = i
    }

    function O(e, t, n) {
        var r, i, o = 0, s = tn.length, a = Z.Deferred().always(function () {
            delete u.elem
        }), u = function () {
            if (i)return !1;
            for (var t = Qt || j(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r,
                     s = 0, u = l.tweens.length; u > s; s++)l.tweens[s].run(o);
            return a.notifyWith(e, [l, o, n]), 1 > o && u ? n : (a.resolveWith(e, [l]), !1)
        }, l = a.promise({
            elem: e,
            props: Z.extend({}, t),
            opts: Z.extend(!0, {specialEasing: {}}, n),
            originalProperties: t,
            originalOptions: n,
            startTime: Qt || j(),
            duration: n.duration,
            tweens: [],
            createTween: function (t, n) {
                var r = Z.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                return l.tweens.push(r), r
            },
            stop: function (t) {
                var n = 0, r = t ? l.tweens.length : 0;
                if (i)return this;
                for (i = !0; r > n; n++)l.tweens[n].run(1);
                return t ? a.resolveWith(e, [l, t]) : a.rejectWith(e, [l, t]), this
            }
        }), c = l.props;
        for (H(c, l.opts.specialEasing); s > o; o++)if (r = tn[o].call(l, e, c, l.opts))return r;
        return Z.map(c, L, l), Z.isFunction(l.opts.start) && l.opts.start.call(e, l), Z.fx.timer(Z.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function F(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0, o = t.toLowerCase().match(dt) || [];
            if (Z.isFunction(n))for (; r = o[i++];)"+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function P(e, t, n, r) {
        function i(a) {
            var u;
            return o[a] = !0, Z.each(e[a] || [], function (e, a) {
                var l = a(t, n, r);
                return "string" != typeof l || s || o[l] ? s ? !(u = l) : void 0 : (t.dataTypes.unshift(l), i(l), !1)
            }), u
        }

        var o = {}, s = e === bn;
        return i(t.dataTypes[0]) || !o["*"] && i("*")
    }

    function R(e, t) {
        var n, r, i = Z.ajaxSettings.flatOptions || {};
        for (n in t)void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && Z.extend(!0, e, r), e
    }

    function M(e, t, n) {
        for (var r, i, o, s, a = e.contents,
                 u = e.dataTypes; "*" === u[0];)u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)for (i in a)if (a[i] && a[i].test(r)) {
            u.unshift(i);
            break
        }
        if (u[0] in n) o = u[0]; else {
            for (i in n) {
                if (!u[0] || e.converters[i + " " + u[0]]) {
                    o = i;
                    break
                }
                s || (s = i)
            }
            o = o || s
        }
        return o ? (o !== u[0] && u.unshift(o), n[o]) : void 0
    }

    function W(e, t, n, r) {
        var i, o, s, a, u, l = {}, c = e.dataTypes.slice();
        if (c[1])for (s in e.converters)l[s.toLowerCase()] = e.converters[s];
        for (o = c.shift(); o;)if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())if ("*" === o) o = u; else if ("*" !== u && u !== o) {
            if (s = l[u + " " + o] || l["* " + o], !s)for (i in l)if (a = i.split(" "), a[1] === o && (s = l[u + " " + a[0]] || l["* " + a[0]])) {
                s === !0 ? s = l[i] : l[i] !== !0 && (o = a[0], c.unshift(a[1]));
                break
            }
            if (s !== !0)if (s && e["throws"]) t = s(t); else try {
                t = s(t)
            } catch (f) {
                return {state: "parsererror", error: s ? f : "No conversion from " + u + " to " + o}
            }
        }
        return {state: "success", data: t}
    }

    function $(e, t, n, r) {
        var i;
        if (Z.isArray(t)) Z.each(t, function (t, i) {
            n || kn.test(e) ? r(e, i) : $(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
        }); else if (n || "object" !== Z.type(t)) r(e, t); else for (i in t)$(e + "[" + i + "]", t[i], n, r)
    }

    function I(e) {
        return Z.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }

    var B = [], _ = B.slice, z = B.concat, X = B.push, U = B.indexOf, V = {}, Y = V.toString, G = V.hasOwnProperty,
        Q = {}, J = e.document, K = "2.1.4", Z = function (e, t) {
            return new Z.fn.init(e, t)
        }, et = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, tt = /^-ms-/, nt = /-([\da-z])/gi, rt = function (e, t) {
            return t.toUpperCase()
        };
    Z.fn = Z.prototype = {
        jquery: K, constructor: Z, selector: "", length: 0, toArray: function () {
            return _.call(this)
        }, get: function (e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : _.call(this)
        }, pushStack: function (e) {
            var t = Z.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        }, each: function (e, t) {
            return Z.each(this, e, t)
        }, map: function (e) {
            return this.pushStack(Z.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        }, slice: function () {
            return this.pushStack(_.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (e) {
            var t = this.length, n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: X, sort: B.sort, splice: B.splice
    }, Z.extend = Z.fn.extend = function () {
        var e, t, n, r, i, o, s = arguments[0] || {}, a = 1, u = arguments.length, l = !1;
        for ("boolean" == typeof s && (l = s, s = arguments[a] || {}, a++), "object" == typeof s || Z.isFunction(s) || (s = {}), a === u && (s = this, a--); u > a; a++)if (null != (e = arguments[a]))for (t in e)n = s[t], r = e[t], s !== r && (l && r && (Z.isPlainObject(r) || (i = Z.isArray(r))) ? (i ? (i = !1, o = n && Z.isArray(n) ? n : []) : o = n && Z.isPlainObject(n) ? n : {}, s[t] = Z.extend(l, o, r)) : void 0 !== r && (s[t] = r));
        return s
    }, Z.extend({
        expando: "jQuery" + (K + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
            throw new Error(e)
        }, noop: function () {
        }, isFunction: function (e) {
            return "function" === Z.type(e)
        }, isArray: Array.isArray, isWindow: function (e) {
            return null != e && e === e.window
        }, isNumeric: function (e) {
            return !Z.isArray(e) && e - parseFloat(e) + 1 >= 0
        }, isPlainObject: function (e) {
            return "object" !== Z.type(e) || e.nodeType || Z.isWindow(e) ? !1 : e.constructor && !G.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
        }, isEmptyObject: function (e) {
            var t;
            for (t in e)return !1;
            return !0
        }, type: function (e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? V[Y.call(e)] || "object" : typeof e
        }, globalEval: function (e) {
            var t, n = eval;
            e = Z.trim(e), e && (1 === e.indexOf("use strict") ? (t = J.createElement("script"), t.text = e, J.head.appendChild(t).parentNode.removeChild(t)) : n(e))
        }, camelCase: function (e) {
            return e.replace(tt, "ms-").replace(nt, rt)
        }, nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }, each: function (e, t, r) {
            var i, o = 0, s = e.length, a = n(e);
            if (r) {
                if (a)for (; s > o && (i = t.apply(e[o], r), i !== !1); o++); else for (o in e)if (i = t.apply(e[o], r), i === !1)break
            } else if (a)for (; s > o && (i = t.call(e[o], o, e[o]), i !== !1); o++); else for (o in e)if (i = t.call(e[o], o, e[o]), i === !1)break;
            return e
        }, trim: function (e) {
            return null == e ? "" : (e + "").replace(et, "")
        }, makeArray: function (e, t) {
            var r = t || [];
            return null != e && (n(Object(e)) ? Z.merge(r, "string" == typeof e ? [e] : e) : X.call(r, e)), r
        }, inArray: function (e, t, n) {
            return null == t ? -1 : U.call(t, e, n)
        }, merge: function (e, t) {
            for (var n = +t.length, r = 0, i = e.length; n > r; r++)e[i++] = t[r];
            return e.length = i, e
        }, grep: function (e, t, n) {
            for (var r, i = [], o = 0, s = e.length, a = !n; s > o; o++)r = !t(e[o], o), r !== a && i.push(e[o]);
            return i
        }, map: function (e, t, r) {
            var i, o = 0, s = e.length, a = n(e), u = [];
            if (a)for (; s > o; o++)i = t(e[o], o, r), null != i && u.push(i); else for (o in e)i = t(e[o], o, r), null != i && u.push(i);
            return z.apply([], u)
        }, guid: 1, proxy: function (e, t) {
            var n, r, i;
            return "string" == typeof t && (n = e[t], t = e, e = n), Z.isFunction(e) ? (r = _.call(arguments, 2), i = function () {
                return e.apply(t || this, r.concat(_.call(arguments)))
            }, i.guid = e.guid = e.guid || Z.guid++, i) : void 0
        }, now: Date.now, support: Q
    }), Z.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        V["[object " + t + "]"] = t.toLowerCase()
    });
    var it = function (e) {
        function t(e, t, n, r) {
            var i, o, s, a, u, l, f, d, h, g;
            if ((t ? t.ownerDocument || t : $) !== q && L(t), t = t || q, n = n || [], a = t.nodeType, "string" != typeof e || !e || 1 !== a && 9 !== a && 11 !== a)return n;
            if (!r && O) {
                if (11 !== a && (i = yt.exec(e)))if (s = i[1]) {
                    if (9 === a) {
                        if (o = t.getElementById(s), !o || !o.parentNode)return n;
                        if (o.id === s)return n.push(o), n
                    } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(s)) && M(t, o) && o.id === s)return n.push(o), n
                } else {
                    if (i[2])return K.apply(n, t.getElementsByTagName(e)), n;
                    if ((s = i[3]) && w.getElementsByClassName)return K.apply(n, t.getElementsByClassName(s)), n
                }
                if (w.qsa && (!F || !F.test(e))) {
                    if (d = f = W, h = t, g = 1 !== a && e, 1 === a && "object" !== t.nodeName.toLowerCase()) {
                        for (l = k(e), (f = t.getAttribute("id")) ? d = f.replace(bt, "\\$&") : t.setAttribute("id", d), d = "[id='" + d + "'] ", u = l.length; u--;)l[u] = d + p(l[u]);
                        h = xt.test(e) && c(t.parentNode) || t, g = l.join(",")
                    }
                    if (g)try {
                        return K.apply(n, h.querySelectorAll(g)), n
                    } catch (m) {
                    } finally {
                        f || t.removeAttribute("id")
                    }
                }
            }
            return S(e.replace(ut, "$1"), t, n, r)
        }

        function n() {
            function e(n, r) {
                return t.push(n + " ") > T.cacheLength && delete e[t.shift()], e[n + " "] = r
            }

            var t = [];
            return e
        }

        function r(e) {
            return e[W] = !0, e
        }

        function i(e) {
            var t = q.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function o(e, t) {
            for (var n = e.split("|"), r = e.length; r--;)T.attrHandle[n[r]] = t
        }

        function s(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || V) - (~e.sourceIndex || V);
            if (r)return r;
            if (n)for (; n = n.nextSibling;)if (n === t)return -1;
            return e ? 1 : -1
        }

        function a(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function u(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function l(e) {
            return r(function (t) {
                return t = +t, r(function (n, r) {
                    for (var i, o = e([], n.length, t), s = o.length; s--;)n[i = o[s]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function c(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }

        function f() {
        }

        function p(e) {
            for (var t = 0, n = e.length, r = ""; n > t; t++)r += e[t].value;
            return r
        }

        function d(e, t, n) {
            var r = t.dir, i = n && "parentNode" === r, o = B++;
            return t.first ? function (t, n, o) {
                for (; t = t[r];)if (1 === t.nodeType || i)return e(t, n, o)
            } : function (t, n, s) {
                var a, u, l = [I, o];
                if (s) {
                    for (; t = t[r];)if ((1 === t.nodeType || i) && e(t, n, s))return !0
                } else for (; t = t[r];)if (1 === t.nodeType || i) {
                    if (u = t[W] || (t[W] = {}), (a = u[r]) && a[0] === I && a[1] === o)return l[2] = a[2];
                    if (u[r] = l, l[2] = e(t, n, s))return !0
                }
            }
        }

        function h(e) {
            return e.length > 1 ? function (t, n, r) {
                for (var i = e.length; i--;)if (!e[i](t, n, r))return !1;
                return !0
            } : e[0]
        }

        function g(e, n, r) {
            for (var i = 0, o = n.length; o > i; i++)t(e, n[i], r);
            return r
        }

        function m(e, t, n, r, i) {
            for (var o, s = [], a = 0, u = e.length,
                     l = null != t; u > a; a++)(o = e[a]) && (!n || n(o, r, i)) && (s.push(o), l && t.push(a));
            return s
        }

        function v(e, t, n, i, o, s) {
            return i && !i[W] && (i = v(i)), o && !o[W] && (o = v(o, s)), r(function (r, s, a, u) {
                var l, c, f, p = [], d = [], h = s.length, v = r || g(t || "*", a.nodeType ? [a] : a, []),
                    y = !e || !r && t ? v : m(v, p, e, a, u), x = n ? o || (r ? e : h || i) ? [] : s : y;
                if (n && n(y, x, a, u), i)for (l = m(x, d), i(l, [], a, u), c = l.length; c--;)(f = l[c]) && (x[d[c]] = !(y[d[c]] = f));
                if (r) {
                    if (o || e) {
                        if (o) {
                            for (l = [], c = x.length; c--;)(f = x[c]) && l.push(y[c] = f);
                            o(null, x = [], l, u)
                        }
                        for (c = x.length; c--;)(f = x[c]) && (l = o ? et(r, f) : p[c]) > -1 && (r[l] = !(s[l] = f))
                    }
                } else x = m(x === s ? x.splice(h, x.length) : x), o ? o(null, s, x, u) : K.apply(s, x)
            })
        }

        function y(e) {
            for (var t, n, r, i = e.length, o = T.relative[e[0].type], s = o || T.relative[" "], a = o ? 1 : 0,
                     u = d(function (e) {
                         return e === t
                     }, s, !0), l = d(function (e) {
                    return et(t, e) > -1
                }, s, !0), c = [function (e, n, r) {
                    var i = !o && (r || n !== D) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r));
                    return t = null, i
                }]; i > a; a++)if (n = T.relative[e[a].type]) c = [d(h(c), n)]; else {
                if (n = T.filter[e[a].type].apply(null, e[a].matches), n[W]) {
                    for (r = ++a; i > r && !T.relative[e[r].type]; r++);
                    return v(a > 1 && h(c), a > 1 && p(e.slice(0, a - 1).concat({value: " " === e[a - 2].type ? "*" : ""})).replace(ut, "$1"), n, r > a && y(e.slice(a, r)), i > r && y(e = e.slice(r)), i > r && p(e))
                }
                c.push(n)
            }
            return h(c)
        }

        function x(e, n) {
            var i = n.length > 0, o = e.length > 0, s = function (r, s, a, u, l) {
                var c, f, p, d = 0, h = "0", g = r && [], v = [], y = D, x = r || o && T.find.TAG("*", l),
                    b = I += null == y ? 1 : Math.random() || .1, w = x.length;
                for (l && (D = s !== q && s); h !== w && null != (c = x[h]); h++) {
                    if (o && c) {
                        for (f = 0; p = e[f++];)if (p(c, s, a)) {
                            u.push(c);
                            break
                        }
                        l && (I = b)
                    }
                    i && ((c = !p && c) && d--, r && g.push(c))
                }
                if (d += h, i && h !== d) {
                    for (f = 0; p = n[f++];)p(g, v, s, a);
                    if (r) {
                        if (d > 0)for (; h--;)g[h] || v[h] || (v[h] = Q.call(u));
                        v = m(v)
                    }
                    K.apply(u, v), l && !r && v.length > 0 && d + n.length > 1 && t.uniqueSort(u)
                }
                return l && (I = b, D = y), g
            };
            return i ? r(s) : s
        }

        var b, w, T, C, N, k, E, S, D, j, A, L, q, H, O, F, P, R, M, W = "sizzle" + 1 * new Date, $ = e.document, I = 0,
            B = 0, _ = n(), z = n(), X = n(), U = function (e, t) {
                return e === t && (A = !0), 0
            }, V = 1 << 31, Y = {}.hasOwnProperty, G = [], Q = G.pop, J = G.push, K = G.push, Z = G.slice,
            et = function (e, t) {
                for (var n = 0, r = e.length; r > n; n++)if (e[n] === t)return n;
                return -1
            },
            tt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            nt = "[\\x20\\t\\r\\n\\f]", rt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", it = rt.replace("w", "w#"),
            ot = "\\[" + nt + "*(" + rt + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + it + "))|)" + nt + "*\\]",
            st = ":(" + rt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ot + ")*)|.*)\\)|)",
            at = new RegExp(nt + "+", "g"), ut = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$", "g"),
            lt = new RegExp("^" + nt + "*," + nt + "*"), ct = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"),
            ft = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]", "g"), pt = new RegExp(st),
            dt = new RegExp("^" + it + "$"), ht = {
                ID: new RegExp("^#(" + rt + ")"),
                CLASS: new RegExp("^\\.(" + rt + ")"),
                TAG: new RegExp("^(" + rt.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + ot),
                PSEUDO: new RegExp("^" + st),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + tt + ")$", "i"),
                needsContext: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)", "i")
            }, gt = /^(?:input|select|textarea|button)$/i, mt = /^h\d$/i, vt = /^[^{]+\{\s*\[native \w/,
            yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, xt = /[+~]/, bt = /'|\\/g,
            wt = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)", "ig"), Tt = function (e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            }, Ct = function () {
                L()
            };
        try {
            K.apply(G = Z.call($.childNodes), $.childNodes), G[$.childNodes.length].nodeType
        } catch (Nt) {
            K = {
                apply: G.length ? function (e, t) {
                    J.apply(e, Z.call(t))
                } : function (e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++];);
                    e.length = n - 1
                }
            }
        }
        w = t.support = {}, N = t.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, L = t.setDocument = function (e) {
            var t, n, r = e ? e.ownerDocument || e : $;
            return r !== q && 9 === r.nodeType && r.documentElement ? (q = r, H = r.documentElement, n = r.defaultView, n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", Ct, !1) : n.attachEvent && n.attachEvent("onunload", Ct)), O = !N(r), w.attributes = i(function (e) {
                return e.className = "i", !e.getAttribute("className")
            }), w.getElementsByTagName = i(function (e) {
                return e.appendChild(r.createComment("")), !e.getElementsByTagName("*").length
            }), w.getElementsByClassName = vt.test(r.getElementsByClassName), w.getById = i(function (e) {
                return H.appendChild(e).id = W, !r.getElementsByName || !r.getElementsByName(W).length
            }), w.getById ? (T.find.ID = function (e, t) {
                if ("undefined" != typeof t.getElementById && O) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, T.filter.ID = function (e) {
                var t = e.replace(wt, Tt);
                return function (e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete T.find.ID, T.filter.ID = function (e) {
                var t = e.replace(wt, Tt);
                return function (e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), T.find.TAG = w.getElementsByTagName ? function (e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0
            } : function (e, t) {
                var n, r = [], i = 0, o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[i++];)1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            }, T.find.CLASS = w.getElementsByClassName && function (e, t) {
                    return O ? t.getElementsByClassName(e) : void 0
                }, P = [], F = [], (w.qsa = vt.test(r.querySelectorAll)) && (i(function (e) {
                H.appendChild(e).innerHTML = "<a id='" + W + "'></a><select id='" + W + "-\f]' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && F.push("[*^$]=" + nt + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || F.push("\\[" + nt + "*(?:value|" + tt + ")"), e.querySelectorAll("[id~=" + W + "-]").length || F.push("~="), e.querySelectorAll(":checked").length || F.push(":checked"), e.querySelectorAll("a#" + W + "+*").length || F.push(".#.+[+~]")
            }), i(function (e) {
                var t = r.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && F.push("name" + nt + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || F.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), F.push(",.*:")
            })), (w.matchesSelector = vt.test(R = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && i(function (e) {
                w.disconnectedMatch = R.call(e, "div"), R.call(e, "[s!='']:x"), P.push("!=", st)
            }), F = F.length && new RegExp(F.join("|")), P = P.length && new RegExp(P.join("|")), t = vt.test(H.compareDocumentPosition), M = t || vt.test(H.contains) ? function (e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function (e, t) {
                if (t)for (; t = t.parentNode;)if (t === e)return !0;
                return !1
            }, U = t ? function (e, t) {
                if (e === t)return A = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !w.sortDetached && t.compareDocumentPosition(e) === n ? e === r || e.ownerDocument === $ && M($, e) ? -1 : t === r || t.ownerDocument === $ && M($, t) ? 1 : j ? et(j, e) - et(j, t) : 0 : 4 & n ? -1 : 1)
            } : function (e, t) {
                if (e === t)return A = !0, 0;
                var n, i = 0, o = e.parentNode, a = t.parentNode, u = [e], l = [t];
                if (!o || !a)return e === r ? -1 : t === r ? 1 : o ? -1 : a ? 1 : j ? et(j, e) - et(j, t) : 0;
                if (o === a)return s(e, t);
                for (n = e; n = n.parentNode;)u.unshift(n);
                for (n = t; n = n.parentNode;)l.unshift(n);
                for (; u[i] === l[i];)i++;
                return i ? s(u[i], l[i]) : u[i] === $ ? -1 : l[i] === $ ? 1 : 0
            }, r) : q
        }, t.matches = function (e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function (e, n) {
            if ((e.ownerDocument || e) !== q && L(e), n = n.replace(ft, "='$1']"), !(!w.matchesSelector || !O || P && P.test(n) || F && F.test(n)))try {
                var r = R.call(e, n);
                if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType)return r
            } catch (i) {
            }
            return t(n, q, null, [e]).length > 0
        }, t.contains = function (e, t) {
            return (e.ownerDocument || e) !== q && L(e), M(e, t)
        }, t.attr = function (e, t) {
            (e.ownerDocument || e) !== q && L(e);
            var n = T.attrHandle[t.toLowerCase()],
                r = n && Y.call(T.attrHandle, t.toLowerCase()) ? n(e, t, !O) : void 0;
            return void 0 !== r ? r : w.attributes || !O ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }, t.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function (e) {
            var t, n = [], r = 0, i = 0;
            if (A = !w.detectDuplicates, j = !w.sortStable && e.slice(0), e.sort(U), A) {
                for (; t = e[i++];)t === e[i] && (r = n.push(i));
                for (; r--;)e.splice(n[r], 1)
            }
            return j = null, e
        }, C = t.getText = function (e) {
            var t, n = "", r = 0, i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent)return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)n += C(e)
                } else if (3 === i || 4 === i)return e.nodeValue
            } else for (; t = e[r++];)n += C(t);
            return n
        }, T = t.selectors = {
            cacheLength: 50,
            createPseudo: r,
            match: ht,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (e) {
                    return e[1] = e[1].replace(wt, Tt), e[3] = (e[3] || e[4] || e[5] || "").replace(wt, Tt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                }, CHILD: function (e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                }, PSEUDO: function (e) {
                    var t, n = !e[6] && e[2];
                    return ht.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && pt.test(n) && (t = k(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function (e) {
                    var t = e.replace(wt, Tt).toLowerCase();
                    return "*" === e ? function () {
                        return !0
                    } : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                }, CLASS: function (e) {
                    var t = _[e + " "];
                    return t || (t = new RegExp("(^|" + nt + ")" + e + "(" + nt + "|$)")) && _(e, function (e) {
                            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                        })
                }, ATTR: function (e, n, r) {
                    return function (i) {
                        var o = t.attr(i, e);
                        return null == o ? "!=" === n : n ? (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(at, " ") + " ").indexOf(r) > -1 : "|=" === n ? o === r || o.slice(0, r.length + 1) === r + "-" : !1) : !0
                    }
                }, CHILD: function (e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3), s = "last" !== e.slice(-4), a = "of-type" === t;
                    return 1 === r && 0 === i ? function (e) {
                        return !!e.parentNode
                    } : function (t, n, u) {
                        var l, c, f, p, d, h, g = o !== s ? "nextSibling" : "previousSibling", m = t.parentNode,
                            v = a && t.nodeName.toLowerCase(), y = !u && !a;
                        if (m) {
                            if (o) {
                                for (; g;) {
                                    for (f = t; f = f[g];)if (a ? f.nodeName.toLowerCase() === v : 1 === f.nodeType)return !1;
                                    h = g = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [s ? m.firstChild : m.lastChild], s && y) {
                                for (c = m[W] || (m[W] = {}), l = c[e] || [], d = l[0] === I && l[1], p = l[0] === I && l[2], f = d && m.childNodes[d]; f = ++d && f && f[g] || (p = d = 0) || h.pop();)if (1 === f.nodeType && ++p && f === t) {
                                    c[e] = [I, d, p];
                                    break
                                }
                            } else if (y && (l = (t[W] || (t[W] = {}))[e]) && l[0] === I) p = l[1]; else for (; (f = ++d && f && f[g] || (p = d = 0) || h.pop()) && ((a ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++p || (y && ((f[W] || (f[W] = {}))[e] = [I, p]), f !== t)););
                            return p -= i, p === r || p % r === 0 && p / r >= 0
                        }
                    }
                }, PSEUDO: function (e, n) {
                    var i, o = T.pseudos[e] || T.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return o[W] ? o(n) : o.length > 1 ? (i = [e, e, "", n], T.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function (e, t) {
                        for (var r, i = o(e, n), s = i.length; s--;)r = et(e, i[s]), e[r] = !(t[r] = i[s])
                    }) : function (e) {
                        return o(e, 0, i)
                    }) : o
                }
            },
            pseudos: {
                not: r(function (e) {
                    var t = [], n = [], i = E(e.replace(ut, "$1"));
                    return i[W] ? r(function (e, t, n, r) {
                        for (var o, s = i(e, null, r, []), a = e.length; a--;)(o = s[a]) && (e[a] = !(t[a] = o))
                    }) : function (e, r, o) {
                        return t[0] = e, i(t, null, o, n), t[0] = null, !n.pop()
                    }
                }), has: r(function (e) {
                    return function (n) {
                        return t(e, n).length > 0
                    }
                }), contains: r(function (e) {
                    return e = e.replace(wt, Tt), function (t) {
                        return (t.textContent || t.innerText || C(t)).indexOf(e) > -1
                    }
                }), lang: r(function (e) {
                    return dt.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(wt, Tt).toLowerCase(), function (t) {
                        var n;
                        do if (n = O ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }), target: function (t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                }, root: function (e) {
                    return e === H
                }, focus: function (e) {
                    return e === q.activeElement && (!q.hasFocus || q.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                }, enabled: function (e) {
                    return e.disabled === !1
                }, disabled: function (e) {
                    return e.disabled === !0
                }, checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                }, selected: function (e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                }, empty: function (e) {
                    for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeType < 6)return !1;
                    return !0
                }, parent: function (e) {
                    return !T.pseudos.empty(e)
                }, header: function (e) {
                    return mt.test(e.nodeName)
                }, input: function (e) {
                    return gt.test(e.nodeName)
                }, button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                }, text: function (e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                }, first: l(function () {
                    return [0]
                }), last: l(function (e, t) {
                    return [t - 1]
                }), eq: l(function (e, t, n) {
                    return [0 > n ? n + t : n]
                }), even: l(function (e, t) {
                    for (var n = 0; t > n; n += 2)e.push(n);
                    return e
                }), odd: l(function (e, t) {
                    for (var n = 1; t > n; n += 2)e.push(n);
                    return e
                }), lt: l(function (e, t, n) {
                    for (var r = 0 > n ? n + t : n; --r >= 0;)e.push(r);
                    return e
                }), gt: l(function (e, t, n) {
                    for (var r = 0 > n ? n + t : n; ++r < t;)e.push(r);
                    return e
                })
            }
        }, T.pseudos.nth = T.pseudos.eq;
        for (b in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})T.pseudos[b] = a(b);
        for (b in{submit: !0, reset: !0})T.pseudos[b] = u(b);
        return f.prototype = T.filters = T.pseudos, T.setFilters = new f, k = t.tokenize = function (e, n) {
            var r, i, o, s, a, u, l, c = z[e + " "];
            if (c)return n ? 0 : c.slice(0);
            for (a = e, u = [], l = T.preFilter; a;) {
                (!r || (i = lt.exec(a))) && (i && (a = a.slice(i[0].length) || a), u.push(o = [])), r = !1, (i = ct.exec(a)) && (r = i.shift(), o.push({
                    value: r,
                    type: i[0].replace(ut, " ")
                }), a = a.slice(r.length));
                for (s in T.filter)!(i = ht[s].exec(a)) || l[s] && !(i = l[s](i)) || (r = i.shift(), o.push({
                    value: r,
                    type: s,
                    matches: i
                }), a = a.slice(r.length));
                if (!r)break
            }
            return n ? a.length : a ? t.error(e) : z(e, u).slice(0)
        }, E = t.compile = function (e, t) {
            var n, r = [], i = [], o = X[e + " "];
            if (!o) {
                for (t || (t = k(e)), n = t.length; n--;)o = y(t[n]), o[W] ? r.push(o) : i.push(o);
                o = X(e, x(i, r)), o.selector = e
            }
            return o
        }, S = t.select = function (e, t, n, r) {
            var i, o, s, a, u, l = "function" == typeof e && e, f = !r && k(e = l.selector || e);
            if (n = n || [], 1 === f.length) {
                if (o = f[0] = f[0].slice(0), o.length > 2 && "ID" === (s = o[0]).type && w.getById && 9 === t.nodeType && O && T.relative[o[1].type]) {
                    if (t = (T.find.ID(s.matches[0].replace(wt, Tt), t) || [])[0], !t)return n;
                    l && (t = t.parentNode), e = e.slice(o.shift().value.length)
                }
                for (i = ht.needsContext.test(e) ? 0 : o.length; i-- && (s = o[i], !T.relative[a = s.type]);)if ((u = T.find[a]) && (r = u(s.matches[0].replace(wt, Tt), xt.test(o[0].type) && c(t.parentNode) || t))) {
                    if (o.splice(i, 1), e = r.length && p(o), !e)return K.apply(n, r), n;
                    break
                }
            }
            return (l || E(e, f))(r, t, !O, n, xt.test(e) && c(t.parentNode) || t), n
        }, w.sortStable = W.split("").sort(U).join("") === W, w.detectDuplicates = !!A, L(), w.sortDetached = i(function (e) {
            return 1 & e.compareDocumentPosition(q.createElement("div"))
        }), i(function (e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function (e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), w.attributes && i(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || o("value", function (e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), i(function (e) {
            return null == e.getAttribute("disabled")
        }) || o(tt, function (e, t, n) {
            var r;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), t
    }(e);
    Z.find = it, Z.expr = it.selectors, Z.expr[":"] = Z.expr.pseudos, Z.unique = it.uniqueSort, Z.text = it.getText, Z.isXMLDoc = it.isXML, Z.contains = it.contains;
    var ot = Z.expr.match.needsContext, st = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, at = /^.[^:#\[\.,]*$/;
    Z.filter = function (e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? Z.find.matchesSelector(r, e) ? [r] : [] : Z.find.matches(e, Z.grep(t, function (e) {
            return 1 === e.nodeType
        }))
    }, Z.fn.extend({
        find: function (e) {
            var t, n = this.length, r = [], i = this;
            if ("string" != typeof e)return this.pushStack(Z(e).filter(function () {
                for (t = 0; n > t; t++)if (Z.contains(i[t], this))return !0
            }));
            for (t = 0; n > t; t++)Z.find(e, i[t], r);
            return r = this.pushStack(n > 1 ? Z.unique(r) : r), r.selector = this.selector ? this.selector + " " + e : e, r
        }, filter: function (e) {
            return this.pushStack(r(this, e || [], !1))
        }, not: function (e) {
            return this.pushStack(r(this, e || [], !0))
        }, is: function (e) {
            return !!r(this, "string" == typeof e && ot.test(e) ? Z(e) : e || [], !1).length
        }
    });
    var ut, lt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ct = Z.fn.init = function (e, t) {
        var n, r;
        if (!e)return this;
        if ("string" == typeof e) {
            if (n = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : lt.exec(e), !n || !n[1] && t)return !t || t.jquery ? (t || ut).find(e) : this.constructor(t).find(e);
            if (n[1]) {
                if (t = t instanceof Z ? t[0] : t, Z.merge(this, Z.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : J, !0)), st.test(n[1]) && Z.isPlainObject(t))for (n in t)Z.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                return this
            }
            return r = J.getElementById(n[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = J, this.selector = e, this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : Z.isFunction(e) ? "undefined" != typeof ut.ready ? ut.ready(e) : e(Z) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), Z.makeArray(e, this))
    };
    ct.prototype = Z.fn, ut = Z(J);
    var ft = /^(?:parents|prev(?:Until|All))/, pt = {children: !0, contents: !0, next: !0, prev: !0};
    Z.extend({
        dir: function (e, t, n) {
            for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;)if (1 === e.nodeType) {
                if (i && Z(e).is(n))break;
                r.push(e)
            }
            return r
        }, sibling: function (e, t) {
            for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    }), Z.fn.extend({
        has: function (e) {
            var t = Z(e, this), n = t.length;
            return this.filter(function () {
                for (var e = 0; n > e; e++)if (Z.contains(this, t[e]))return !0
            })
        }, closest: function (e, t) {
            for (var n, r = 0, i = this.length, o = [],
                     s = ot.test(e) || "string" != typeof e ? Z(e, t || this.context) : 0; i > r; r++)for (n = this[r]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && Z.find.matchesSelector(n, e))) {
                o.push(n);
                break
            }
            return this.pushStack(o.length > 1 ? Z.unique(o) : o)
        }, index: function (e) {
            return e ? "string" == typeof e ? U.call(Z(e), this[0]) : U.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (e, t) {
            return this.pushStack(Z.unique(Z.merge(this.get(), Z(e, t))))
        }, addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), Z.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        }, parents: function (e) {
            return Z.dir(e, "parentNode")
        }, parentsUntil: function (e, t, n) {
            return Z.dir(e, "parentNode", n)
        }, next: function (e) {
            return i(e, "nextSibling")
        }, prev: function (e) {
            return i(e, "previousSibling")
        }, nextAll: function (e) {
            return Z.dir(e, "nextSibling")
        }, prevAll: function (e) {
            return Z.dir(e, "previousSibling")
        }, nextUntil: function (e, t, n) {
            return Z.dir(e, "nextSibling", n)
        }, prevUntil: function (e, t, n) {
            return Z.dir(e, "previousSibling", n)
        }, siblings: function (e) {
            return Z.sibling((e.parentNode || {}).firstChild, e)
        }, children: function (e) {
            return Z.sibling(e.firstChild)
        }, contents: function (e) {
            return e.contentDocument || Z.merge([], e.childNodes)
        }
    }, function (e, t) {
        Z.fn[e] = function (n, r) {
            var i = Z.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = Z.filter(r, i)), this.length > 1 && (pt[e] || Z.unique(i), ft.test(e) && i.reverse()), this.pushStack(i)
        }
    });
    var dt = /\S+/g, ht = {};
    Z.Callbacks = function (e) {
        e = "string" == typeof e ? ht[e] || o(e) : Z.extend({}, e);
        var t, n, r, i, s, a, u = [], l = !e.once && [], c = function (o) {
            for (t = e.memory && o, n = !0, a = i || 0, i = 0, s = u.length, r = !0; u && s > a; a++)if (u[a].apply(o[0], o[1]) === !1 && e.stopOnFalse) {
                t = !1;
                break
            }
            r = !1, u && (l ? l.length && c(l.shift()) : t ? u = [] : f.disable())
        }, f = {
            add: function () {
                if (u) {
                    var n = u.length;
                    !function o(t) {
                        Z.each(t, function (t, n) {
                            var r = Z.type(n);
                            "function" === r ? e.unique && f.has(n) || u.push(n) : n && n.length && "string" !== r && o(n)
                        })
                    }(arguments), r ? s = u.length : t && (i = n, c(t))
                }
                return this
            }, remove: function () {
                return u && Z.each(arguments, function (e, t) {
                    for (var n; (n = Z.inArray(t, u, n)) > -1;)u.splice(n, 1), r && (s >= n && s--, a >= n && a--)
                }), this
            }, has: function (e) {
                return e ? Z.inArray(e, u) > -1 : !(!u || !u.length)
            }, empty: function () {
                return u = [], s = 0, this
            }, disable: function () {
                return u = l = t = void 0, this
            }, disabled: function () {
                return !u
            }, lock: function () {
                return l = void 0, t || f.disable(), this
            }, locked: function () {
                return !l
            }, fireWith: function (e, t) {
                return !u || n && !l || (t = t || [], t = [e, t.slice ? t.slice() : t], r ? l.push(t) : c(t)), this
            }, fire: function () {
                return f.fireWith(this, arguments), this
            }, fired: function () {
                return !!n
            }
        };
        return f
    }, Z.extend({
        Deferred: function (e) {
            var t = [["resolve", "done", Z.Callbacks("once memory"), "resolved"], ["reject", "fail", Z.Callbacks("once memory"), "rejected"], ["notify", "progress", Z.Callbacks("memory")]],
                n = "pending", r = {
                    state: function () {
                        return n
                    }, always: function () {
                        return i.done(arguments).fail(arguments), this
                    }, then: function () {
                        var e = arguments;
                        return Z.Deferred(function (n) {
                            Z.each(t, function (t, o) {
                                var s = Z.isFunction(e[t]) && e[t];
                                i[o[1]](function () {
                                    var e = s && s.apply(this, arguments);
                                    e && Z.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === r ? n.promise() : this, s ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    }, promise: function (e) {
                        return null != e ? Z.extend(e, r) : r
                    }
                }, i = {};
            return r.pipe = r.then, Z.each(t, function (e, o) {
                var s = o[2], a = o[3];
                r[o[1]] = s.add, a && s.add(function () {
                    n = a
                }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () {
                    return i[o[0] + "With"](this === i ? r : this, arguments), this
                }, i[o[0] + "With"] = s.fireWith
            }), r.promise(i), e && e.call(i, i), i
        }, when: function (e) {
            var t, n, r, i = 0, o = _.call(arguments), s = o.length,
                a = 1 !== s || e && Z.isFunction(e.promise) ? s : 0, u = 1 === a ? e : Z.Deferred(),
                l = function (e, n, r) {
                    return function (i) {
                        n[e] = this, r[e] = arguments.length > 1 ? _.call(arguments) : i, r === t ? u.notifyWith(n, r) : --a || u.resolveWith(n, r)
                    }
                };
            if (s > 1)for (t = new Array(s), n = new Array(s), r = new Array(s); s > i; i++)o[i] && Z.isFunction(o[i].promise) ? o[i].promise().done(l(i, r, o)).fail(u.reject).progress(l(i, n, t)) : --a;
            return a || u.resolveWith(r, o), u.promise()
        }
    });
    var gt;
    Z.fn.ready = function (e) {
        return Z.ready.promise().done(e), this
    }, Z.extend({
        isReady: !1, readyWait: 1, holdReady: function (e) {
            e ? Z.readyWait++ : Z.ready(!0)
        }, ready: function (e) {
            (e === !0 ? --Z.readyWait : Z.isReady) || (Z.isReady = !0, e !== !0 && --Z.readyWait > 0 || (gt.resolveWith(J, [Z]), Z.fn.triggerHandler && (Z(J).triggerHandler("ready"), Z(J).off("ready"))))
        }
    }), Z.ready.promise = function (t) {
        return gt || (gt = Z.Deferred(), "complete" === J.readyState ? setTimeout(Z.ready) : (J.addEventListener("DOMContentLoaded", s, !1), e.addEventListener("load", s, !1))), gt.promise(t)
    }, Z.ready.promise();
    var mt = Z.access = function (e, t, n, r, i, o, s) {
        var a = 0, u = e.length, l = null == n;
        if ("object" === Z.type(n)) {
            i = !0;
            for (a in n)Z.access(e, t, a, n[a], !0, o, s)
        } else if (void 0 !== r && (i = !0, Z.isFunction(r) || (s = !0), l && (s ? (t.call(e, r), t = null) : (l = t, t = function (e, t, n) {
                return l.call(Z(e), n)
            })), t))for (; u > a; a++)t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
        return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
    };
    Z.acceptData = function (e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    }, a.uid = 1, a.accepts = Z.acceptData, a.prototype = {
        key: function (e) {
            if (!a.accepts(e))return 0;
            var t = {}, n = e[this.expando];
            if (!n) {
                n = a.uid++;
                try {
                    t[this.expando] = {value: n}, Object.defineProperties(e, t)
                } catch (r) {
                    t[this.expando] = n, Z.extend(e, t)
                }
            }
            return this.cache[n] || (this.cache[n] = {}), n
        }, set: function (e, t, n) {
            var r, i = this.key(e), o = this.cache[i];
            if ("string" == typeof t) o[t] = n; else if (Z.isEmptyObject(o)) Z.extend(this.cache[i], t); else for (r in t)o[r] = t[r];
            return o
        }, get: function (e, t) {
            var n = this.cache[this.key(e)];
            return void 0 === t ? n : n[t]
        }, access: function (e, t, n) {
            var r;
            return void 0 === t || t && "string" == typeof t && void 0 === n ? (r = this.get(e, t), void 0 !== r ? r : this.get(e, Z.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t)
        }, remove: function (e, t) {
            var n, r, i, o = this.key(e), s = this.cache[o];
            if (void 0 === t) this.cache[o] = {}; else {
                Z.isArray(t) ? r = t.concat(t.map(Z.camelCase)) : (i = Z.camelCase(t), t in s ? r = [t, i] : (r = i, r = r in s ? [r] : r.match(dt) || [])), n = r.length;
                for (; n--;)delete s[r[n]]
            }
        }, hasData: function (e) {
            return !Z.isEmptyObject(this.cache[e[this.expando]] || {})
        }, discard: function (e) {
            e[this.expando] && delete this.cache[e[this.expando]]
        }
    };
    var vt = new a, yt = new a, xt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, bt = /([A-Z])/g;
    Z.extend({
        hasData: function (e) {
            return yt.hasData(e) || vt.hasData(e)
        }, data: function (e, t, n) {
            return yt.access(e, t, n)
        }, removeData: function (e, t) {
            yt.remove(e, t)
        }, _data: function (e, t, n) {
            return vt.access(e, t, n)
        }, _removeData: function (e, t) {
            vt.remove(e, t)
        }
    }), Z.fn.extend({
        data: function (e, t) {
            var n, r, i, o = this[0], s = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (i = yt.get(o), 1 === o.nodeType && !vt.get(o, "hasDataAttrs"))) {
                    for (n = s.length; n--;)s[n] && (r = s[n].name, 0 === r.indexOf("data-") && (r = Z.camelCase(r.slice(5)), u(o, r, i[r])));
                    vt.set(o, "hasDataAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function () {
                yt.set(this, e)
            }) : mt(this, function (t) {
                var n, r = Z.camelCase(e);
                if (o && void 0 === t) {
                    if (n = yt.get(o, e), void 0 !== n)return n;
                    if (n = yt.get(o, r), void 0 !== n)return n;
                    if (n = u(o, r, void 0), void 0 !== n)return n
                } else this.each(function () {
                    var n = yt.get(this, r);
                    yt.set(this, r, t), -1 !== e.indexOf("-") && void 0 !== n && yt.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        }, removeData: function (e) {
            return this.each(function () {
                yt.remove(this, e)
            })
        }
    }), Z.extend({
        queue: function (e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = vt.get(e, t), n && (!r || Z.isArray(n) ? r = vt.access(e, t, Z.makeArray(n)) : r.push(n)), r || []) : void 0
        }, dequeue: function (e, t) {
            t = t || "fx";
            var n = Z.queue(e, t), r = n.length, i = n.shift(), o = Z._queueHooks(e, t), s = function () {
                Z.dequeue(e, t)
            };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, s, o)), !r && o && o.empty.fire()
        }, _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return vt.get(e, n) || vt.access(e, n, {
                    empty: Z.Callbacks("once memory").add(function () {
                        vt.remove(e, [t + "queue", n])
                    })
                })
        }
    }), Z.fn.extend({
        queue: function (e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? Z.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                var n = Z.queue(this, e, t);
                Z._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && Z.dequeue(this, e)
            })
        }, dequeue: function (e) {
            return this.each(function () {
                Z.dequeue(this, e)
            })
        }, clearQueue: function (e) {
            return this.queue(e || "fx", [])
        }, promise: function (e, t) {
            var n, r = 1, i = Z.Deferred(), o = this, s = this.length, a = function () {
                --r || i.resolveWith(o, [o])
            };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;)n = vt.get(o[s], e + "queueHooks"), n && n.empty && (r++, n.empty.add(a));
            return a(), i.promise(t)
        }
    });
    var wt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Tt = ["Top", "Right", "Bottom", "Left"],
        Ct = function (e, t) {
            return e = t || e, "none" === Z.css(e, "display") || !Z.contains(e.ownerDocument, e)
        }, Nt = /^(?:checkbox|radio)$/i;
    !function () {
        var e = J.createDocumentFragment(), t = e.appendChild(J.createElement("div")), n = J.createElement("input");
        n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), Q.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", Q.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
    }();
    var kt = "undefined";
    Q.focusinBubbles = "onfocusin" in e;
    var Et = /^key/, St = /^(?:mouse|pointer|contextmenu)|click/, Dt = /^(?:focusinfocus|focusoutblur)$/,
        jt = /^([^.]*)(?:\.(.+)|)$/;
    Z.event = {
        global: {},
        add: function (e, t, n, r, i) {
            var o, s, a, u, l, c, f, p, d, h, g, m = vt.get(e);
            if (m)for (n.handler && (o = n, n = o.handler, i = o.selector), n.guid || (n.guid = Z.guid++), (u = m.events) || (u = m.events = {}), (s = m.handle) || (s = m.handle = function (t) {
                return typeof Z !== kt && Z.event.triggered !== t.type ? Z.event.dispatch.apply(e, arguments) : void 0
            }), t = (t || "").match(dt) || [""], l = t.length; l--;)a = jt.exec(t[l]) || [], d = g = a[1], h = (a[2] || "").split(".").sort(), d && (f = Z.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = Z.event.special[d] || {}, c = Z.extend({
                type: d,
                origType: g,
                data: r,
                handler: n,
                guid: n.guid,
                selector: i,
                needsContext: i && Z.expr.match.needsContext.test(i),
                namespace: h.join(".")
            }, o), (p = u[d]) || (p = u[d] = [], p.delegateCount = 0, f.setup && f.setup.call(e, r, h, s) !== !1 || e.addEventListener && e.addEventListener(d, s, !1)), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), Z.event.global[d] = !0)
        },
        remove: function (e, t, n, r, i) {
            var o, s, a, u, l, c, f, p, d, h, g, m = vt.hasData(e) && vt.get(e);
            if (m && (u = m.events)) {
                for (t = (t || "").match(dt) || [""], l = t.length; l--;)if (a = jt.exec(t[l]) || [], d = g = a[1], h = (a[2] || "").split(".").sort(), d) {
                    for (f = Z.event.special[d] || {}, d = (r ? f.delegateType : f.bindType) || d, p = u[d] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = p.length; o--;)c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
                    s && !p.length && (f.teardown && f.teardown.call(e, h, m.handle) !== !1 || Z.removeEvent(e, d, m.handle), delete u[d])
                } else for (d in u)Z.event.remove(e, d + t[l], n, r, !0);
                Z.isEmptyObject(u) && (delete m.handle, vt.remove(e, "events"))
            }
        },
        trigger: function (t, n, r, i) {
            var o, s, a, u, l, c, f, p = [r || J], d = G.call(t, "type") ? t.type : t,
                h = G.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = a = r = r || J, 3 !== r.nodeType && 8 !== r.nodeType && !Dt.test(d + Z.event.triggered) && (d.indexOf(".") >= 0 && (h = d.split("."), d = h.shift(), h.sort()), l = d.indexOf(":") < 0 && "on" + d, t = t[Z.expando] ? t : new Z.Event(d, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = h.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : Z.makeArray(n, [t]), f = Z.event.special[d] || {}, i || !f.trigger || f.trigger.apply(r, n) !== !1)) {
                if (!i && !f.noBubble && !Z.isWindow(r)) {
                    for (u = f.delegateType || d, Dt.test(u + d) || (s = s.parentNode); s; s = s.parentNode)p.push(s), a = s;
                    a === (r.ownerDocument || J) && p.push(a.defaultView || a.parentWindow || e)
                }
                for (o = 0; (s = p[o++]) && !t.isPropagationStopped();)t.type = o > 1 ? u : f.bindType || d, c = (vt.get(s, "events") || {})[t.type] && vt.get(s, "handle"), c && c.apply(s, n), c = l && s[l], c && c.apply && Z.acceptData(s) && (t.result = c.apply(s, n), t.result === !1 && t.preventDefault());
                return t.type = d, i || t.isDefaultPrevented() || f._default && f._default.apply(p.pop(), n) !== !1 || !Z.acceptData(r) || l && Z.isFunction(r[d]) && !Z.isWindow(r) && (a = r[l], a && (r[l] = null), Z.event.triggered = d, r[d](), Z.event.triggered = void 0, a && (r[l] = a)), t.result
            }
        },
        dispatch: function (e) {
            e = Z.event.fix(e);
            var t, n, r, i, o, s = [], a = _.call(arguments), u = (vt.get(this, "events") || {})[e.type] || [],
                l = Z.event.special[e.type] || {};
            if (a[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                for (s = Z.event.handlers.call(this, e, u), t = 0; (i = s[t++]) && !e.isPropagationStopped();)for (e.currentTarget = i.elem, n = 0; (o = i.handlers[n++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, r = ((Z.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, a), void 0 !== r && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, e), e.result
            }
        },
        handlers: function (e, t) {
            var n, r, i, o, s = [], a = t.delegateCount, u = e.target;
            if (a && u.nodeType && (!e.button || "click" !== e.type))for (; u !== this; u = u.parentNode || this)if (u.disabled !== !0 || "click" !== e.type) {
                for (r = [], n = 0; a > n; n++)o = t[n], i = o.selector + " ", void 0 === r[i] && (r[i] = o.needsContext ? Z(i, this).index(u) >= 0 : Z.find(i, this, null, [u]).length), r[i] && r.push(o);
                r.length && s.push({elem: u, handlers: r})
            }
            return a < t.length && s.push({elem: this, handlers: t.slice(a)}), s
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, t) {
                var n, r, i, o = t.button;
                return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || J, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
            }
        },
        fix: function (e) {
            if (e[Z.expando])return e;
            var t, n, r, i = e.type, o = e, s = this.fixHooks[i];
            for (s || (this.fixHooks[i] = s = St.test(i) ? this.mouseHooks : Et.test(i) ? this.keyHooks : {}), r = s.props ? this.props.concat(s.props) : this.props, e = new Z.Event(o), t = r.length; t--;)n = r[t], e[n] = o[n];
            return e.target || (e.target = J), 3 === e.target.nodeType && (e.target = e.target.parentNode), s.filter ? s.filter(e, o) : e
        },
        special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    return this !== f() && this.focus ? (this.focus(), !1) : void 0
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    return this === f() && this.blur ? (this.blur(), !1) : void 0
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    return "checkbox" === this.type && this.click && Z.nodeName(this, "input") ? (this.click(), !1) : void 0
                }, _default: function (e) {
                    return Z.nodeName(e.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function (e, t, n, r) {
            var i = Z.extend(new Z.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
            r ? Z.event.trigger(i, null, t) : Z.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, Z.removeEvent = function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    }, Z.Event = function (e, t) {
        return this instanceof Z.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? l : c) : this.type = e, t && Z.extend(this, t), this.timeStamp = e && e.timeStamp || Z.now(), void(this[Z.expando] = !0)) : new Z.Event(e, t)
    }, Z.Event.prototype = {
        isDefaultPrevented: c,
        isPropagationStopped: c,
        isImmediatePropagationStopped: c,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = l, e && e.preventDefault && e.preventDefault()
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = l, e && e.stopPropagation && e.stopPropagation()
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = l, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, Z.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (e, t) {
        Z.event.special[e] = {
            delegateType: t, bindType: t, handle: function (e) {
                var n, r = this, i = e.relatedTarget, o = e.handleObj;
                return (!i || i !== r && !Z.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), Q.focusinBubbles || Z.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        var n = function (e) {
            Z.event.simulate(t, e.target, Z.event.fix(e), !0)
        };
        Z.event.special[t] = {
            setup: function () {
                var r = this.ownerDocument || this, i = vt.access(r, t);
                i || r.addEventListener(e, n, !0), vt.access(r, t, (i || 0) + 1)
            }, teardown: function () {
                var r = this.ownerDocument || this, i = vt.access(r, t) - 1;
                i ? vt.access(r, t, i) : (r.removeEventListener(e, n, !0), vt.remove(r, t))
            }
        }
    }), Z.fn.extend({
        on: function (e, t, n, r, i) {
            var o, s;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t, t = void 0);
                for (s in e)this.on(s, t, n, e[s], i);
                return this
            }
            if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, n = void 0) : (r = n, n = t, t = void 0)), r === !1) r = c; else if (!r)return this;
            return 1 === i && (o = r, r = function (e) {
                return Z().off(e), o.apply(this, arguments)
            }, r.guid = o.guid || (o.guid = Z.guid++)), this.each(function () {
                Z.event.add(this, e, r, n, t)
            })
        }, one: function (e, t, n, r) {
            return this.on(e, t, n, r, 1)
        }, off: function (e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj)return r = e.handleObj, Z(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e)this.off(i, t, e[i]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = c), this.each(function () {
                Z.event.remove(this, e, n, t)
            })
        }, trigger: function (e, t) {
            return this.each(function () {
                Z.event.trigger(e, t, this)
            })
        }, triggerHandler: function (e, t) {
            var n = this[0];
            return n ? Z.event.trigger(e, t, n, !0) : void 0
        }
    });
    var At = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Lt = /<([\w:]+)/,
        qt = /<|&#?\w+;/, Ht = /<(?:script|style|link)/i, Ot = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Ft = /^$|\/(?:java|ecma)script/i, Pt = /^true\/(.*)/, Rt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Mt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    Mt.optgroup = Mt.option, Mt.tbody = Mt.tfoot = Mt.colgroup = Mt.caption = Mt.thead, Mt.th = Mt.td, Z.extend({
        clone: function (e, t, n) {
            var r, i, o, s, a = e.cloneNode(!0), u = Z.contains(e.ownerDocument, e);
            if (!(Q.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || Z.isXMLDoc(e)))for (s = v(a), o = v(e), r = 0, i = o.length; i > r; r++)y(o[r], s[r]);
            if (t)if (n)for (o = o || v(e), s = s || v(a), r = 0, i = o.length; i > r; r++)m(o[r], s[r]); else m(e, a);
            return s = v(a, "script"), s.length > 0 && g(s, !u && v(e, "script")), a
        }, buildFragment: function (e, t, n, r) {
            for (var i, o, s, a, u, l, c = t.createDocumentFragment(), f = [], p = 0,
                     d = e.length; d > p; p++)if (i = e[p], i || 0 === i)if ("object" === Z.type(i)) Z.merge(f, i.nodeType ? [i] : i); else if (qt.test(i)) {
                for (o = o || c.appendChild(t.createElement("div")), s = (Lt.exec(i) || ["", ""])[1].toLowerCase(), a = Mt[s] || Mt._default, o.innerHTML = a[1] + i.replace(At, "<$1></$2>") + a[2], l = a[0]; l--;)o = o.lastChild;
                Z.merge(f, o.childNodes), o = c.firstChild, o.textContent = ""
            } else f.push(t.createTextNode(i));
            for (c.textContent = "", p = 0; i = f[p++];)if ((!r || -1 === Z.inArray(i, r)) && (u = Z.contains(i.ownerDocument, i), o = v(c.appendChild(i), "script"), u && g(o), n))for (l = 0; i = o[l++];)Ft.test(i.type || "") && n.push(i);
            return c
        }, cleanData: function (e) {
            for (var t, n, r, i, o = Z.event.special, s = 0; void 0 !== (n = e[s]); s++) {
                if (Z.acceptData(n) && (i = n[vt.expando], i && (t = vt.cache[i]))) {
                    if (t.events)for (r in t.events)o[r] ? Z.event.remove(n, r) : Z.removeEvent(n, r, t.handle);
                    vt.cache[i] && delete vt.cache[i]
                }
                delete yt.cache[n[yt.expando]]
            }
        }
    }), Z.fn.extend({
        text: function (e) {
            return mt(this, function (e) {
                return void 0 === e ? Z.text(this) : this.empty().each(function () {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e)
                })
            }, null, e, arguments.length)
        }, append: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = p(this, e);
                    t.appendChild(e)
                }
            })
        }, prepend: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = p(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        }, before: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        }, after: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        }, remove: function (e, t) {
            for (var n, r = e ? Z.filter(e, this) : this,
                     i = 0; null != (n = r[i]); i++)t || 1 !== n.nodeType || Z.cleanData(v(n)), n.parentNode && (t && Z.contains(n.ownerDocument, n) && g(v(n, "script")), n.parentNode.removeChild(n));
            return this
        }, empty: function () {
            for (var e,
                     t = 0; null != (e = this[t]); t++)1 === e.nodeType && (Z.cleanData(v(e, !1)), e.textContent = "");
            return this
        }, clone: function (e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
                return Z.clone(this, e, t)
            })
        }, html: function (e) {
            return mt(this, function (e) {
                var t = this[0] || {}, n = 0, r = this.length;
                if (void 0 === e && 1 === t.nodeType)return t.innerHTML;
                if ("string" == typeof e && !Ht.test(e) && !Mt[(Lt.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(At, "<$1></$2>");
                    try {
                        for (; r > n; n++)t = this[n] || {}, 1 === t.nodeType && (Z.cleanData(v(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {
                    }
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        }, replaceWith: function () {
            var e = arguments[0];
            return this.domManip(arguments, function (t) {
                e = this.parentNode, Z.cleanData(v(this)), e && e.replaceChild(t, this)
            }), e && (e.length || e.nodeType) ? this : this.remove()
        }, detach: function (e) {
            return this.remove(e, !0)
        }, domManip: function (e, t) {
            e = z.apply([], e);
            var n, r, i, o, s, a, u = 0, l = this.length, c = this, f = l - 1, p = e[0], g = Z.isFunction(p);
            if (g || l > 1 && "string" == typeof p && !Q.checkClone && Ot.test(p))return this.each(function (n) {
                var r = c.eq(n);
                g && (e[0] = p.call(this, n, r.html())), r.domManip(e, t)
            });
            if (l && (n = Z.buildFragment(e, this[0].ownerDocument, !1, this), r = n.firstChild, 1 === n.childNodes.length && (n = r), r)) {
                for (i = Z.map(v(n, "script"), d), o = i.length; l > u; u++)s = n, u !== f && (s = Z.clone(s, !0, !0), o && Z.merge(i, v(s, "script"))), t.call(this[u], s, u);
                if (o)for (a = i[i.length - 1].ownerDocument, Z.map(i, h), u = 0; o > u; u++)s = i[u], Ft.test(s.type || "") && !vt.access(s, "globalEval") && Z.contains(a, s) && (s.src ? Z._evalUrl && Z._evalUrl(s.src) : Z.globalEval(s.textContent.replace(Rt, "")))
            }
            return this
        }
    }), Z.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        Z.fn[e] = function (e) {
            for (var n, r = [], i = Z(e), o = i.length - 1,
                     s = 0; o >= s; s++)n = s === o ? this : this.clone(!0), Z(i[s])[t](n), X.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var Wt, $t = {}, It = /^margin/, Bt = new RegExp("^(" + wt + ")(?!px)[a-z%]+$", "i"), _t = function (t) {
        return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null)
    };
    !function () {
        function t() {
            s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", s.innerHTML = "", i.appendChild(o);
            var t = e.getComputedStyle(s, null);
            n = "1%" !== t.top, r = "4px" === t.width, i.removeChild(o)
        }

        var n, r, i = J.documentElement, o = J.createElement("div"), s = J.createElement("div");
        s.style && (s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", Q.clearCloneStyle = "content-box" === s.style.backgroundClip, o.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", o.appendChild(s), e.getComputedStyle && Z.extend(Q, {
            pixelPosition: function () {
                return t(), n
            }, boxSizingReliable: function () {
                return null == r && t(), r
            }, reliableMarginRight: function () {
                var t, n = s.appendChild(J.createElement("div"));
                return n.style.cssText = s.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", s.style.width = "1px", i.appendChild(o), t = !parseFloat(e.getComputedStyle(n, null).marginRight), i.removeChild(o), s.removeChild(n), t
            }
        }))
    }(), Z.swap = function (e, t, n, r) {
        var i, o, s = {};
        for (o in t)s[o] = e.style[o], e.style[o] = t[o];
        i = n.apply(e, r || []);
        for (o in t)e.style[o] = s[o];
        return i
    };
    var zt = /^(none|table(?!-c[ea]).+)/, Xt = new RegExp("^(" + wt + ")(.*)$", "i"),
        Ut = new RegExp("^([+-])=(" + wt + ")", "i"),
        Vt = {position: "absolute", visibility: "hidden", display: "block"},
        Yt = {letterSpacing: "0", fontWeight: "400"}, Gt = ["Webkit", "O", "Moz", "ms"];
    Z.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = w(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": "cssFloat"},
        style: function (e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, s, a = Z.camelCase(t), u = e.style;
                return t = Z.cssProps[a] || (Z.cssProps[a] = C(u, a)), s = Z.cssHooks[t] || Z.cssHooks[a], void 0 === n ? s && "get" in s && void 0 !== (i = s.get(e, !1, r)) ? i : u[t] : (o = typeof n, "string" === o && (i = Ut.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(Z.css(e, t)), o = "number"), null != n && n === n && ("number" !== o || Z.cssNumber[a] || (n += "px"), Q.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), s && "set" in s && void 0 === (n = s.set(e, n, r)) || (u[t] = n)), void 0)
            }
        },
        css: function (e, t, n, r) {
            var i, o, s, a = Z.camelCase(t);
            return t = Z.cssProps[a] || (Z.cssProps[a] = C(e.style, a)), s = Z.cssHooks[t] || Z.cssHooks[a], s && "get" in s && (i = s.get(e, !0, n)), void 0 === i && (i = w(e, t, r)), "normal" === i && t in Yt && (i = Yt[t]), "" === n || n ? (o = parseFloat(i), n === !0 || Z.isNumeric(o) ? o || 0 : i) : i
        }
    }), Z.each(["height", "width"], function (e, t) {
        Z.cssHooks[t] = {
            get: function (e, n, r) {
                return n ? zt.test(Z.css(e, "display")) && 0 === e.offsetWidth ? Z.swap(e, Vt, function () {
                    return E(e, t, r)
                }) : E(e, t, r) : void 0
            }, set: function (e, n, r) {
                var i = r && _t(e);
                return N(e, n, r ? k(e, t, r, "border-box" === Z.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    }), Z.cssHooks.marginRight = T(Q.reliableMarginRight, function (e, t) {
        return t ? Z.swap(e, {display: "inline-block"}, w, [e, "marginRight"]) : void 0
    }), Z.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        Z.cssHooks[e + t] = {
            expand: function (n) {
                for (var r = 0, i = {},
                         o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++)i[e + Tt[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        }, It.test(e) || (Z.cssHooks[e + t].set = N)
    }), Z.fn.extend({
        css: function (e, t) {
            return mt(this, function (e, t, n) {
                var r, i, o = {}, s = 0;
                if (Z.isArray(t)) {
                    for (r = _t(e), i = t.length; i > s; s++)o[t[s]] = Z.css(e, t[s], !1, r);
                    return o
                }
                return void 0 !== n ? Z.style(e, t, n) : Z.css(e, t)
            }, e, t, arguments.length > 1)
        }, show: function () {
            return S(this, !0)
        }, hide: function () {
            return S(this)
        }, toggle: function (e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                Ct(this) ? Z(this).show() : Z(this).hide()
            })
        }
    }), Z.Tween = D, D.prototype = {
        constructor: D, init: function (e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (Z.cssNumber[n] ? "" : "px")
        }, cur: function () {
            var e = D.propHooks[this.prop];
            return e && e.get ? e.get(this) : D.propHooks._default.get(this)
        }, run: function (e) {
            var t, n = D.propHooks[this.prop];
            return this.pos = t = this.options.duration ? Z.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : D.propHooks._default.set(this), this
        }
    }, D.prototype.init.prototype = D.prototype, D.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = Z.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            }, set: function (e) {
                Z.fx.step[e.prop] ? Z.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[Z.cssProps[e.prop]] || Z.cssHooks[e.prop]) ? Z.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, D.propHooks.scrollTop = D.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, Z.easing = {
        linear: function (e) {
            return e
        }, swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, Z.fx = D.prototype.init, Z.fx.step = {};
    var Qt, Jt, Kt = /^(?:toggle|show|hide)$/, Zt = new RegExp("^(?:([+-])=|)(" + wt + ")([a-z%]*)$", "i"),
        en = /queueHooks$/, tn = [q], nn = {
            "*": [function (e, t) {
                var n = this.createTween(e, t), r = n.cur(), i = Zt.exec(t), o = i && i[3] || (Z.cssNumber[e] ? "" : "px"),
                    s = (Z.cssNumber[e] || "px" !== o && +r) && Zt.exec(Z.css(n.elem, e)), a = 1, u = 20;
                if (s && s[3] !== o) {
                    o = o || s[3], i = i || [], s = +r || 1;
                    do a = a || ".5", s /= a, Z.style(n.elem, e, s + o); while (a !== (a = n.cur() / r) && 1 !== a && --u)
                }
                return i && (s = n.start = +s || +r || 0, n.unit = o, n.end = i[1] ? s + (i[1] + 1) * i[2] : +i[2]), n
            }]
        };
    Z.Animation = Z.extend(O, {
        tweener: function (e, t) {
            Z.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var n, r = 0, i = e.length; i > r; r++)n = e[r], nn[n] = nn[n] || [], nn[n].unshift(t)
        }, prefilter: function (e, t) {
            t ? tn.unshift(e) : tn.push(e)
        }
    }), Z.speed = function (e, t, n) {
        var r = e && "object" == typeof e ? Z.extend({}, e) : {
            complete: n || !n && t || Z.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !Z.isFunction(t) && t
        };
        return r.duration = Z.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in Z.fx.speeds ? Z.fx.speeds[r.duration] : Z.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {
            Z.isFunction(r.old) && r.old.call(this), r.queue && Z.dequeue(this, r.queue)
        }, r
    }, Z.fn.extend({
        fadeTo: function (e, t, n, r) {
            return this.filter(Ct).css("opacity", 0).show().end().animate({opacity: t}, e, n, r)
        }, animate: function (e, t, n, r) {
            var i = Z.isEmptyObject(e), o = Z.speed(t, n, r), s = function () {
                var t = O(this, Z.extend({}, e), o);
                (i || vt.get(this, "finish")) && t.stop(!0)
            };
            return s.finish = s, i || o.queue === !1 ? this.each(s) : this.queue(o.queue, s)
        }, stop: function (e, t, n) {
            var r = function (e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                var t = !0, i = null != e && e + "queueHooks", o = Z.timers, s = vt.get(this);
                if (i) s[i] && s[i].stop && r(s[i]); else for (i in s)s[i] && s[i].stop && en.test(i) && r(s[i]);
                for (i = o.length; i--;)o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                (t || !n) && Z.dequeue(this, e)
            })
        }, finish: function (e) {
            return e !== !1 && (e = e || "fx"), this.each(function () {
                var t, n = vt.get(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = Z.timers,
                    s = r ? r.length : 0;
                for (n.finish = !0, Z.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;)o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                for (t = 0; s > t; t++)r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }), Z.each(["toggle", "show", "hide"], function (e, t) {
        var n = Z.fn[t];
        Z.fn[t] = function (e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(A(t, !0), e, r, i)
        }
    }), Z.each({
        slideDown: A("show"),
        slideUp: A("hide"),
        slideToggle: A("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (e, t) {
        Z.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), Z.timers = [], Z.fx.tick = function () {
        var e, t = 0, n = Z.timers;
        for (Qt = Z.now(); t < n.length; t++)e = n[t], e() || n[t] !== e || n.splice(t--, 1);
        n.length || Z.fx.stop(), Qt = void 0
    }, Z.fx.timer = function (e) {
        Z.timers.push(e), e() ? Z.fx.start() : Z.timers.pop()
    }, Z.fx.interval = 13, Z.fx.start = function () {
        Jt || (Jt = setInterval(Z.fx.tick, Z.fx.interval))
    }, Z.fx.stop = function () {
        clearInterval(Jt), Jt = null
    }, Z.fx.speeds = {slow: 600, fast: 200, _default: 400}, Z.fn.delay = function (e, t) {
        return e = Z.fx ? Z.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
            var r = setTimeout(t, e);
            n.stop = function () {
                clearTimeout(r)
            }
        })
    }, function () {
        var e = J.createElement("input"), t = J.createElement("select"), n = t.appendChild(J.createElement("option"));
        e.type = "checkbox", Q.checkOn = "" !== e.value, Q.optSelected = n.selected, t.disabled = !0, Q.optDisabled = !n.disabled, e = J.createElement("input"), e.value = "t", e.type = "radio", Q.radioValue = "t" === e.value
    }();
    var rn, on, sn = Z.expr.attrHandle;
    Z.fn.extend({
        attr: function (e, t) {
            return mt(this, Z.attr, e, t, arguments.length > 1)
        }, removeAttr: function (e) {
            return this.each(function () {
                Z.removeAttr(this, e)
            })
        }
    }), Z.extend({
        attr: function (e, t, n) {
            var r, i, o = e.nodeType;
            if (e && 3 !== o && 8 !== o && 2 !== o)return typeof e.getAttribute === kt ? Z.prop(e, t, n) : (1 === o && Z.isXMLDoc(e) || (t = t.toLowerCase(), r = Z.attrHooks[t] || (Z.expr.match.bool.test(t) ? on : rn)), void 0 === n ? r && "get" in r && null !== (i = r.get(e, t)) ? i : (i = Z.find.attr(e, t), null == i ? void 0 : i) : null !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : void Z.removeAttr(e, t))
        }, removeAttr: function (e, t) {
            var n, r, i = 0, o = t && t.match(dt);
            if (o && 1 === e.nodeType)for (; n = o[i++];)r = Z.propFix[n] || n, Z.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
        }, attrHooks: {
            type: {
                set: function (e, t) {
                    if (!Q.radioValue && "radio" === t && Z.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        }
    }), on = {
        set: function (e, t, n) {
            return t === !1 ? Z.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, Z.each(Z.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = sn[t] || Z.find.attr;
        sn[t] = function (e, t, r) {
            var i, o;
            return r || (o = sn[t], sn[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, sn[t] = o), i
        }
    });
    var an = /^(?:input|select|textarea|button)$/i;
    Z.fn.extend({
        prop: function (e, t) {
            return mt(this, Z.prop, e, t, arguments.length > 1)
        }, removeProp: function (e) {
            return this.each(function () {
                delete this[Z.propFix[e] || e]
            })
        }
    }), Z.extend({
        propFix: {"for": "htmlFor", "class": "className"}, prop: function (e, t, n) {
            var r, i, o, s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s)return o = 1 !== s || !Z.isXMLDoc(e), o && (t = Z.propFix[t] || t, i = Z.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        }, propHooks: {
            tabIndex: {
                get: function (e) {
                    return e.hasAttribute("tabindex") || an.test(e.nodeName) || e.href ? e.tabIndex : -1
                }
            }
        }
    }), Q.optSelected || (Z.propHooks.selected = {
        get: function (e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        }
    }), Z.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        Z.propFix[this.toLowerCase()] = this
    });
    var un = /[\t\r\n\f]/g;
    Z.fn.extend({
        addClass: function (e) {
            var t, n, r, i, o, s, a = "string" == typeof e && e, u = 0, l = this.length;
            if (Z.isFunction(e))return this.each(function (t) {
                Z(this).addClass(e.call(this, t, this.className))
            });
            if (a)for (t = (e || "").match(dt) || []; l > u; u++)if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(un, " ") : " ")) {
                for (o = 0; i = t[o++];)r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                s = Z.trim(r), n.className !== s && (n.className = s)
            }
            return this
        }, removeClass: function (e) {
            var t, n, r, i, o, s, a = 0 === arguments.length || "string" == typeof e && e, u = 0, l = this.length;
            if (Z.isFunction(e))return this.each(function (t) {
                Z(this).removeClass(e.call(this, t, this.className))
            });
            if (a)for (t = (e || "").match(dt) || []; l > u; u++)if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(un, " ") : "")) {
                for (o = 0; i = t[o++];)for (; r.indexOf(" " + i + " ") >= 0;)r = r.replace(" " + i + " ", " ");
                s = e ? Z.trim(r) : "", n.className !== s && (n.className = s)
            }
            return this
        }, toggleClass: function (e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(Z.isFunction(e) ? function (n) {
                Z(this).toggleClass(e.call(this, n, this.className, t), t)
            } : function () {
                if ("string" === n)for (var t, r = 0, i = Z(this),
                                            o = e.match(dt) || []; t = o[r++];)i.hasClass(t) ? i.removeClass(t) : i.addClass(t); else(n === kt || "boolean" === n) && (this.className && vt.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : vt.get(this, "__className__") || "")
            })
        }, hasClass: function (e) {
            for (var t = " " + e + " ", n = 0,
                     r = this.length; r > n; n++)if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(un, " ").indexOf(t) >= 0)return !0;
            return !1
        }
    });
    var ln = /\r/g;
    Z.fn.extend({
        val: function (e) {
            var t, n, r, i = this[0];
            {
                if (arguments.length)return r = Z.isFunction(e), this.each(function (n) {
                    var i;
                    1 === this.nodeType && (i = r ? e.call(this, n, Z(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : Z.isArray(i) && (i = Z.map(i, function (e) {
                            return null == e ? "" : e + ""
                        })), t = Z.valHooks[this.type] || Z.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                });
                if (i)return t = Z.valHooks[i.type] || Z.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(ln, "") : null == n ? "" : n)
            }
        }
    }), Z.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = Z.find.attr(e, "value");
                    return null != t ? t : Z.trim(Z.text(e))
                }
            }, select: {
                get: function (e) {
                    for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i,
                             s = o ? null : [], a = o ? i + 1 : r.length,
                             u = 0 > i ? a : o ? i : 0; a > u; u++)if (n = r[u], !(!n.selected && u !== i || (Q.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && Z.nodeName(n.parentNode, "optgroup"))) {
                        if (t = Z(n).val(), o)return t;
                        s.push(t)
                    }
                    return s
                }, set: function (e, t) {
                    for (var n, r, i = e.options, o = Z.makeArray(t),
                             s = i.length; s--;)r = i[s], (r.selected = Z.inArray(r.value, o) >= 0) && (n = !0);
                    return n || (e.selectedIndex = -1), o
                }
            }
        }
    }), Z.each(["radio", "checkbox"], function () {
        Z.valHooks[this] = {
            set: function (e, t) {
                return Z.isArray(t) ? e.checked = Z.inArray(Z(e).val(), t) >= 0 : void 0
            }
        }, Q.checkOn || (Z.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    }), Z.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        Z.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), Z.fn.extend({
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }, bind: function (e, t, n) {
            return this.on(e, null, t, n)
        }, unbind: function (e, t) {
            return this.off(e, null, t)
        }, delegate: function (e, t, n, r) {
            return this.on(t, e, n, r)
        }, undelegate: function (e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var cn = Z.now(), fn = /\?/;
    Z.parseJSON = function (e) {
        return JSON.parse(e + "")
    }, Z.parseXML = function (e) {
        var t, n;
        if (!e || "string" != typeof e)return null;
        try {
            n = new DOMParser, t = n.parseFromString(e, "text/xml")
        } catch (r) {
            t = void 0
        }
        return (!t || t.getElementsByTagName("parsererror").length) && Z.error("Invalid XML: " + e), t
    };
    var pn = /#.*$/, dn = /([?&])_=[^&]*/, hn = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        gn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, mn = /^(?:GET|HEAD)$/, vn = /^\/\//,
        yn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, xn = {}, bn = {}, wn = "*/".concat("*"),
        Tn = e.location.href, Cn = yn.exec(Tn.toLowerCase()) || [];
    Z.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Tn,
            type: "GET",
            isLocal: gn.test(Cn[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": wn,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": Z.parseJSON, "text xml": Z.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (e, t) {
            return t ? R(R(e, Z.ajaxSettings), t) : R(Z.ajaxSettings, e)
        },
        ajaxPrefilter: F(xn),
        ajaxTransport: F(bn),
        ajax: function (e, t) {
            function n(e, t, n, s) {
                var u, c, v, y, b, T = t;
                2 !== x && (x = 2, a && clearTimeout(a), r = void 0, o = s || "", w.readyState = e > 0 ? 4 : 0, u = e >= 200 && 300 > e || 304 === e, n && (y = M(f, w, n)), y = W(f, y, w, u), u ? (f.ifModified && (b = w.getResponseHeader("Last-Modified"), b && (Z.lastModified[i] = b), b = w.getResponseHeader("etag"), b && (Z.etag[i] = b)), 204 === e || "HEAD" === f.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = y.state, c = y.data, v = y.error, u = !v)) : (v = T, (e || !T) && (T = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (t || T) + "", u ? h.resolveWith(p, [c, T, w]) : h.rejectWith(p, [w, T, v]), w.statusCode(m), m = void 0, l && d.trigger(u ? "ajaxSuccess" : "ajaxError", [w, f, u ? c : v]), g.fireWith(p, [w, T]), l && (d.trigger("ajaxComplete", [w, f]), --Z.active || Z.event.trigger("ajaxStop")))
            }

            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var r, i, o, s, a, u, l, c, f = Z.ajaxSetup({}, t), p = f.context || f,
                d = f.context && (p.nodeType || p.jquery) ? Z(p) : Z.event, h = Z.Deferred(),
                g = Z.Callbacks("once memory"), m = f.statusCode || {}, v = {}, y = {}, x = 0, b = "canceled", w = {
                    readyState: 0, getResponseHeader: function (e) {
                        var t;
                        if (2 === x) {
                            if (!s)for (s = {}; t = hn.exec(o);)s[t[1].toLowerCase()] = t[2];
                            t = s[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    }, getAllResponseHeaders: function () {
                        return 2 === x ? o : null
                    }, setRequestHeader: function (e, t) {
                        var n = e.toLowerCase();
                        return x || (e = y[n] = y[n] || e, v[e] = t), this
                    }, overrideMimeType: function (e) {
                        return x || (f.mimeType = e), this
                    }, statusCode: function (e) {
                        var t;
                        if (e)if (2 > x)for (t in e)m[t] = [m[t], e[t]]; else w.always(e[w.status]);
                        return this
                    }, abort: function (e) {
                        var t = e || b;
                        return r && r.abort(t), n(0, t), this
                    }
                };
            if (h.promise(w).complete = g.add, w.success = w.done, w.error = w.fail, f.url = ((e || f.url || Tn) + "").replace(pn, "").replace(vn, Cn[1] + "//"), f.type = t.method || t.type || f.method || f.type, f.dataTypes = Z.trim(f.dataType || "*").toLowerCase().match(dt) || [""], null == f.crossDomain && (u = yn.exec(f.url.toLowerCase()), f.crossDomain = !(!u || u[1] === Cn[1] && u[2] === Cn[2] && (u[3] || ("http:" === u[1] ? "80" : "443")) === (Cn[3] || ("http:" === Cn[1] ? "80" : "443")))), f.data && f.processData && "string" != typeof f.data && (f.data = Z.param(f.data, f.traditional)), P(xn, f, t, w), 2 === x)return w;
            l = Z.event && f.global, l && 0 === Z.active++ && Z.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !mn.test(f.type), i = f.url, f.hasContent || (f.data && (i = f.url += (fn.test(i) ? "&" : "?") + f.data, delete f.data), f.cache === !1 && (f.url = dn.test(i) ? i.replace(dn, "$1_=" + cn++) : i + (fn.test(i) ? "&" : "?") + "_=" + cn++)), f.ifModified && (Z.lastModified[i] && w.setRequestHeader("If-Modified-Since", Z.lastModified[i]), Z.etag[i] && w.setRequestHeader("If-None-Match", Z.etag[i])), (f.data && f.hasContent && f.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", f.contentType), w.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + wn + "; q=0.01" : "") : f.accepts["*"]);
            for (c in f.headers)w.setRequestHeader(c, f.headers[c]);
            if (f.beforeSend && (f.beforeSend.call(p, w, f) === !1 || 2 === x))return w.abort();
            b = "abort";
            for (c in{success: 1, error: 1, complete: 1})w[c](f[c]);
            if (r = P(bn, f, t, w)) {
                w.readyState = 1, l && d.trigger("ajaxSend", [w, f]), f.async && f.timeout > 0 && (a = setTimeout(function () {
                    w.abort("timeout")
                }, f.timeout));
                try {
                    x = 1, r.send(v, n)
                } catch (T) {
                    if (!(2 > x))throw T;
                    n(-1, T)
                }
            } else n(-1, "No Transport");
            return w
        },
        getJSON: function (e, t, n) {
            return Z.get(e, t, n, "json")
        },
        getScript: function (e, t) {
            return Z.get(e, void 0, t, "script")
        }
    }), Z.each(["get", "post"], function (e, t) {
        Z[t] = function (e, n, r, i) {
            return Z.isFunction(n) && (i = i || r, r = n, n = void 0), Z.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            })
        }
    }), Z._evalUrl = function (e) {
        return Z.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    }, Z.fn.extend({
        wrapAll: function (e) {
            var t;
            return Z.isFunction(e) ? this.each(function (t) {
                Z(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = Z(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                for (var e = this; e.firstElementChild;)e = e.firstElementChild;
                return e
            }).append(this)), this)
        }, wrapInner: function (e) {
            return this.each(Z.isFunction(e) ? function (t) {
                Z(this).wrapInner(e.call(this, t))
            } : function () {
                var t = Z(this), n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        }, wrap: function (e) {
            var t = Z.isFunction(e);
            return this.each(function (n) {
                Z(this).wrapAll(t ? e.call(this, n) : e)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                Z.nodeName(this, "body") || Z(this).replaceWith(this.childNodes)
            }).end()
        }
    }), Z.expr.filters.hidden = function (e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0
    }, Z.expr.filters.visible = function (e) {
        return !Z.expr.filters.hidden(e)
    };
    var Nn = /%20/g, kn = /\[\]$/, En = /\r?\n/g, Sn = /^(?:submit|button|image|reset|file)$/i,
        Dn = /^(?:input|select|textarea|keygen)/i;
    Z.param = function (e, t) {
        var n, r = [], i = function (e, t) {
            t = Z.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (void 0 === t && (t = Z.ajaxSettings && Z.ajaxSettings.traditional), Z.isArray(e) || e.jquery && !Z.isPlainObject(e)) Z.each(e, function () {
            i(this.name, this.value)
        }); else for (n in e)$(n, e[n], t, i);
        return r.join("&").replace(Nn, "+")
    }, Z.fn.extend({
        serialize: function () {
            return Z.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var e = Z.prop(this, "elements");
                return e ? Z.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !Z(this).is(":disabled") && Dn.test(this.nodeName) && !Sn.test(e) && (this.checked || !Nt.test(e))
            }).map(function (e, t) {
                var n = Z(this).val();
                return null == n ? null : Z.isArray(n) ? Z.map(n, function (e) {
                    return {name: t.name, value: e.replace(En, "\r\n")}
                }) : {name: t.name, value: n.replace(En, "\r\n")}
            }).get()
        }
    }), Z.ajaxSettings.xhr = function () {
        try {
            return new XMLHttpRequest
        } catch (e) {
        }
    };
    var jn = 0, An = {}, Ln = {0: 200, 1223: 204}, qn = Z.ajaxSettings.xhr();
    e.attachEvent && e.attachEvent("onunload", function () {
        for (var e in An)An[e]()
    }), Q.cors = !!qn && "withCredentials" in qn, Q.ajax = qn = !!qn, Z.ajaxTransport(function (e) {
        var t;
        return Q.cors || qn && !e.crossDomain ? {
            send: function (n, r) {
                var i, o = e.xhr(), s = ++jn;
                if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)for (i in e.xhrFields)o[i] = e.xhrFields[i];
                e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                for (i in n)o.setRequestHeader(i, n[i]);
                t = function (e) {
                    return function () {
                        t && (delete An[s], t = o.onload = o.onerror = null, "abort" === e ? o.abort() : "error" === e ? r(o.status, o.statusText) : r(Ln[o.status] || o.status, o.statusText, "string" == typeof o.responseText ? {text: o.responseText} : void 0, o.getAllResponseHeaders()))
                    }
                }, o.onload = t(), o.onerror = t("error"), t = An[s] = t("abort");
                try {
                    o.send(e.hasContent && e.data || null)
                } catch (a) {
                    if (t)throw a
                }
            }, abort: function () {
                t && t()
            }
        } : void 0
    }), Z.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /(?:java|ecma)script/},
        converters: {
            "text script": function (e) {
                return Z.globalEval(e), e
            }
        }
    }), Z.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), Z.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function (r, i) {
                    t = Z("<script>").prop({
                        async: !0,
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function (e) {
                        t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                    }), J.head.appendChild(t[0])
                }, abort: function () {
                    n && n()
                }
            }
        }
    });
    var Hn = [], On = /(=)\?(?=&|$)|\?\?/;
    Z.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var e = Hn.pop() || Z.expando + "_" + cn++;
            return this[e] = !0, e
        }
    }), Z.ajaxPrefilter("json jsonp", function (t, n, r) {
        var i, o, s,
            a = t.jsonp !== !1 && (On.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && On.test(t.data) && "data");
        return a || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = Z.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(On, "$1" + i) : t.jsonp !== !1 && (t.url += (fn.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
            return s || Z.error(i + " was not called"), s[0]
        }, t.dataTypes[0] = "json", o = e[i], e[i] = function () {
            s = arguments
        }, r.always(function () {
            e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, Hn.push(i)), s && Z.isFunction(o) && o(s[0]), s = o = void 0
        }), "script") : void 0
    }), Z.parseHTML = function (e, t, n) {
        if (!e || "string" != typeof e)return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || J;
        var r = st.exec(e), i = !n && [];
        return r ? [t.createElement(r[1])] : (r = Z.buildFragment([e], t, i), i && i.length && Z(i).remove(), Z.merge([], r.childNodes))
    };
    var Fn = Z.fn.load;
    Z.fn.load = function (e, t, n) {
        if ("string" != typeof e && Fn)return Fn.apply(this, arguments);
        var r, i, o, s = this, a = e.indexOf(" ");
        return a >= 0 && (r = Z.trim(e.slice(a)), e = e.slice(0, a)), Z.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), s.length > 0 && Z.ajax({
            url: e,
            type: i,
            dataType: "html",
            data: t
        }).done(function (e) {
            o = arguments, s.html(r ? Z("<div>").append(Z.parseHTML(e)).find(r) : e)
        }).complete(n && function (e, t) {
                s.each(n, o || [e.responseText, t, e])
            }), this
    }, Z.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        Z.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), Z.expr.filters.animated = function (e) {
        return Z.grep(Z.timers, function (t) {
            return e === t.elem
        }).length
    };
    var Pn = e.document.documentElement;
    Z.offset = {
        setOffset: function (e, t, n) {
            var r, i, o, s, a, u, l, c = Z.css(e, "position"), f = Z(e), p = {};
            "static" === c && (e.style.position = "relative"), a = f.offset(), o = Z.css(e, "top"), u = Z.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1, l ? (r = f.position(), s = r.top, i = r.left) : (s = parseFloat(o) || 0, i = parseFloat(u) || 0), Z.isFunction(t) && (t = t.call(e, n, a)), null != t.top && (p.top = t.top - a.top + s), null != t.left && (p.left = t.left - a.left + i), "using" in t ? t.using.call(e, p) : f.css(p)
        }
    }, Z.fn.extend({
        offset: function (e) {
            if (arguments.length)return void 0 === e ? this : this.each(function (t) {
                Z.offset.setOffset(this, e, t)
            });
            var t, n, r = this[0], i = {top: 0, left: 0}, o = r && r.ownerDocument;
            if (o)return t = o.documentElement, Z.contains(t, r) ? (typeof r.getBoundingClientRect !== kt && (i = r.getBoundingClientRect()), n = I(o), {
                top: i.top + n.pageYOffset - t.clientTop,
                left: i.left + n.pageXOffset - t.clientLeft
            }) : i
        }, position: function () {
            if (this[0]) {
                var e, t, n = this[0], r = {top: 0, left: 0};
                return "fixed" === Z.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), Z.nodeName(e[0], "html") || (r = e.offset()), r.top += Z.css(e[0], "borderTopWidth", !0), r.left += Z.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - r.top - Z.css(n, "marginTop", !0),
                    left: t.left - r.left - Z.css(n, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var e = this.offsetParent || Pn; e && !Z.nodeName(e, "html") && "static" === Z.css(e, "position");)e = e.offsetParent;
                return e || Pn
            })
        }
    }), Z.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (t, n) {
        var r = "pageYOffset" === n;
        Z.fn[t] = function (i) {
            return mt(this, function (t, i, o) {
                var s = I(t);
                return void 0 === o ? s ? s[n] : t[i] : void(s ? s.scrollTo(r ? e.pageXOffset : o, r ? o : e.pageYOffset) : t[i] = o)
            }, t, i, arguments.length, null)
        }
    }), Z.each(["top", "left"], function (e, t) {
        Z.cssHooks[t] = T(Q.pixelPosition, function (e, n) {
            return n ? (n = w(e, t), Bt.test(n) ? Z(e).position()[t] + "px" : n) : void 0
        })
    }), Z.each({Height: "height", Width: "width"}, function (e, t) {
        Z.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, r) {
            Z.fn[r] = function (r, i) {
                var o = arguments.length && (n || "boolean" != typeof r),
                    s = n || (r === !0 || i === !0 ? "margin" : "border");
                return mt(this, function (t, n, r) {
                    var i;
                    return Z.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? Z.css(t, n, s) : Z.style(t, n, r, s)
                }, t, o ? r : void 0, o, null)
            }
        })
    }), Z.fn.size = function () {
        return this.length
    }, Z.fn.andSelf = Z.fn.addBack, "function" == typeof define && define.amd && define("static/lib/jquery", ["require"], function () {
        return Z
    });
    var Rn = e.jQuery, Mn = e.$;
    return Z.noConflict = function (t) {
        return e.$ === Z && (e.$ = Mn), t && e.jQuery === Z && (e.jQuery = Rn), Z
    }, typeof t === kt && (e.jQuery = e.$ = Z), Z
});
;/*!/static/tools/jquery.cookie.js*/
!function (e) {
    "function" == typeof define && define.amd ? define("static/tools/jquery.cookie", ["static/lib/jquery"], e) : e("object" == typeof exports ? require("static/lib/jquery") : jQuery)
}(function (e) {
    function o(e) {
        return u.raw ? e : encodeURIComponent(e)
    }

    function i(e) {
        return u.raw ? e : decodeURIComponent(e)
    }

    function n(e) {
        return o(u.json ? JSON.stringify(e) : String(e))
    }

    function t(e) {
        0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return e = decodeURIComponent(e.replace(c, " ")), u.json ? JSON.parse(e) : e
        } catch (o) {
        }
    }

    function r(o, i) {
        var n = u.raw ? o : t(o);
        return e.isFunction(i) ? i(n) : n
    }

    var c = /\+/g, u = e.cookie = function (t, c, a) {
        if (void 0 !== c && !e.isFunction(c)) {
            if (a = e.extend({}, u.defaults, a), "number" == typeof a.expires) {
                var s = a.expires, f = a.expires = new Date;
                f.setTime(+f + 864e5 * s)
            }
            return document.cookie = [o(t), "=", n(c), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("")
        }
        for (var d = t ? void 0 : {}, p = document.cookie ? document.cookie.split("; ") : [], m = 0,
                 l = p.length; l > m; m++) {
            var x = p[m].split("="), k = i(x.shift()), v = x.join("=");
            if (t && t === k) {
                d = r(v, c);
                break
            }
            t || void 0 === (v = r(v)) || (d[k] = v)
        }
        return d
    };
    u.defaults = {}, e.removeCookie = function (o, i) {
        return void 0 === e.cookie(o) ? !1 : (e.cookie(o, "", e.extend({}, i, {expires: -1})), !e.cookie(o))
    }
});
;/*!/static/tools/lazyload.js*/
!function (t) {
    "function" == typeof define && define.amd ? define("static/tools/lazyload", ["static/lib/jquery"], t) : t(window.jQuery || window.Zepto)
}(function (t) {
    function e() {
    }

    function a(t, e) {
        var a;
        return a = e._$container == _ ? ("innerHeight" in s ? s.innerHeight : _.height()) + _.scrollTop() : e._$container.offset().top + e._$container.height(), a <= t.offset().top - e.threshold
    }

    function r(e, a) {
        var r;
        return r = a._$container == _ ? _.width() + (t.fn.scrollLeft ? _.scrollLeft() : s.pageXOffset) : a._$container.offset().left + a._$container.width(), r <= e.offset().left - a.threshold
    }

    function n(t, e) {
        var a;
        return a = e._$container == _ ? _.scrollTop() : e._$container.offset().top, a >= t.offset().top + e.threshold + t.height()
    }

    function o(e, a) {
        var r;
        return r = a._$container == _ ? t.fn.scrollLeft ? _.scrollLeft() : s.pageXOffset : a._$container.offset().left, r >= e.offset().left + a.threshold + e.width()
    }

    function l(t, e) {
        var l = 0;
        t.each(function (i) {
            function c() {
                f.trigger("_lazyload_appear"), l = 0
            }

            var f = t.eq(i);
            if (!(f.width() <= 0 && f.height() <= 0 || "none" === f.css("display")))if (e.vertical_only)if (n(f, e)); else if (a(f, e)) {
                if (++l > e.failure_limit)return !1
            } else c(); else if (n(f, e) || o(f, e)); else if (a(f, e) || r(f, e)) {
                if (++l > e.failure_limit)return !1
            } else c()
        })
    }

    function i(t) {
        return t.filter(function (e) {
            return !t.eq(e)._lazyload_loadStarted
        })
    }

    function c(t, e) {
        function a() {
            l = 0, i = +new Date, o = t.apply(r, n), r = null, n = null
        }

        var r, n, o, l, i = 0;
        return function () {
            r = this, n = arguments;
            var t = new Date - i;
            return l || (t >= e ? a() : l = setTimeout(a, e - t)), o
        }
    }

    var f, s = window, _ = t(s), d = {
        threshold: 0,
        failure_limit: 0,
        event: "scroll",
        effect: "show",
        effect_params: null,
        container: s,
        data_attribute: "original",
        data_srcset_attribute: "original-srcset",
        skip_invisible: !0,
        appear: e,
        load: e,
        vertical_only: !1,
        check_appear_throttle_time: 300,
        url_rewriter_fn: e,
        no_fake_img_loader: !1,
        placeholder_data_img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",
        placeholder_real_img: "http://ditu.baidu.cn/yyfm/lazyload/0.0.1/img/placeholder.png"
    };
    f = function () {
        var t = Object.prototype.toString;
        return function (e) {
            return t.call(e).replace("[object ", "").replace("]", "")
        }
    }(), t.fn.hasOwnProperty("lazyload") || (t.fn.lazyload = function (a) {
        var r, n, o, u = this;
        return t.isPlainObject(a) || (a = {}), t.each(d, function (e, r) {
            -1 != t.inArray(e, ["threshold", "failure_limit", "check_appear_throttle_time"]) ? a[e] = "String" == f(a[e]) ? parseInt(a[e], 10) : r : "container" == e ? (a._$container = a.hasOwnProperty(e) ? a[e] == s || a[e] == document ? _ : t(a[e]) : _, delete a.container) : !d.hasOwnProperty(e) || a.hasOwnProperty(e) && f(a[e]) == f(d[e]) || (a[e] = r)
        }), r = "scroll" == a.event, o = 0 == a.check_appear_throttle_time ? l : c(l, a.check_appear_throttle_time), n = r || "scrollstart" == a.event || "scrollstop" == a.event, u.each(function (r) {
            var o = this, l = u.eq(r), c = l.attr("src"), f = l.attr("data-" + a.data_attribute),
                s = a.url_rewriter_fn == e ? f : a.url_rewriter_fn.call(o, l, f),
                _ = l.attr("data-" + a.data_srcset_attribute), d = l.is("img");
            return 1 == l._lazyload_loadStarted || c == s ? (l._lazyload_loadStarted = !0, void(u = i(u))) : (l._lazyload_loadStarted = !1, d && !c && l.one("error", function () {
                l.attr("src", a.placeholder_real_img)
            }).attr("src", a.placeholder_data_img), l.one("_lazyload_appear", function () {
                function r() {
                    n && l.hide(), d ? (_ && l.attr("srcset", _), s && l.attr("src", s)) : l.css("background-image", 'url("' + s + '")'), n && l[a.effect].apply(l, c ? a.effect_params : []), u = i(u)
                }

                var n, c = t.isArray(a.effect_params);
                l._lazyload_loadStarted || (n = "show" != a.effect && t.fn[a.effect] && (!a.effect_params || c && 0 == a.effect_params.length), a.appear != e && a.appear.call(o, l, u.length, a), l._lazyload_loadStarted = !0, a.no_fake_img_loader || _ ? (a.load != e && l.one("load", function () {
                    a.load.call(o, l, u.length, a)
                }), r()) : t("<img />").one("load", function () {
                    r(), a.load != e && a.load.call(o, u.length, a)
                }).attr("src", s))
            }), void(n || l.on(a.event, function () {
                l._lazyload_loadStarted || l.trigger("_lazyload_appear")
            })))
        }), n && a._$container.on(a.event, function () {
            o(u, a)
        }), _.on("resize load", function () {
            o(u, a)
        }), t(function () {
            o(u, a)
        }), this
    })
});
;/*!/common/config.js*/
var isOnline = !0, imgOnline = !0, _hmt = _hmt || [], _track_conf = _track_conf || [];
_track_conf.push(["_page_id", ""]), function () {
    var e = document.createElement("script");
    e.src = "//hm.baidu.com/hm.js?5ed88d1572598ff64031c34c83d0f9cd";
    var o = document.getElementsByTagName("script")[0];
    o.parentNode.insertBefore(e, o)
}();
var _alltrack_conf = _alltrack_conf || [];
_alltrack_conf.push(["_allpage_id", "M_ALL_PAGE_PV_0001"]), function () {
    setTimeout(function () {
        var e = document.createElement("script");
        e.type = "text/javascript";
        var o = imgOnline ? "//app.jyall.com/web-data/" : "//10.10.32.59/";
        e.src = o + "swagger/js/trackpv.js";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(e, s);
        var t = document.createElement("script");
        t.type = "text/javascript", t.src = "https://app.jyall.com/web-data/swagger/js/track.js", document.body.appendChild(t)
    }, 1800)
}(), define("common/config", ["static/tools/jquery.cookie", "static/tools/lazyload"], function () {
    var e = (/https/i.test(location.protocol) === !1 ? "//" : "//") + location.hostname,
        o = (/(A|a)ndroid/i.test(navigator.userAgent), isOnline ? e : "/api.php?jsApiUrl=http://10.10.32.81"),
        s = isOnline ? "?" : "&", t = imgOnline ? "//image1.jyall.com/v1/tfs/" : "//10.10.20.51/v1/tfs/",
        i = {trackURL: imgOnline ? "//app.jyall.com/web-data/" : "//10.10.32.59/"}, r = {
            http: function (e, o, s, t, i, r, a) {
                var n = {
                    type: "post",
                    dataType: "json",
                    url: e,
                    cache: !1,
                    data: o,
                    processData: !0,
                    beforeSend: function () {
                        t || ($("#ajaxloading").show(), $("body").on("mousewheel", function () {
                            return !1
                        }))
                    },
                    complete: function (e) {
                        if (t || ($("body").off("mousewheel"), $("#ajaxloading").hide()), 401 === e.status) window.location.href = "./login.html"; else if (403 === e.status)try {
                            throw"403 Forbidden!"
                        } catch (o) {
                        } else if (404 === e.status)try {
                            throw"404 Not Found!"
                        } catch (o) {
                        }
                        e = null
                    },
                    timeout: isOnline ? 2e4 : 0,
                    success: function (e) {
                        var e = e || {};
                        s(e)
                    },
                    error: function (e, o) {
                        if (console.log("http error:" + o), void 0 != i && null != i) {
                            if (i(), i = null, 1 == a)return !1
                        } else if ("undefined" == typeof a || 0 == a)return;
                        e = null
                    }
                };
                return $.ajax(n)
            }, loadContents: function (e, o, s, t, i, r) {
                var a = "", t = t || !1, n = "", o = o || {};
                n = localStorage.getItem("jyall-Token"), o.token = n, a = isOnline ? e : "/api.php?jsApiUrl=" + e, this.http(a, o, s, t, i, null, r)
            }
        }, a = function (e) {
            var o = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"), s = window.location.search.substr(1).match(o);
            return null != s ? unescape(s[2]) : ""
        }, n = {
            jumpURL: {
                1: "javascript:;",
                2: "index.html",
                3: "channel/appliance/index.html",
                4: "channel/furniture/index.html",
                5: "house/index.html",
                6: "channel/housekeeping/homeKeep.html",
                7: "channel/decoration/index.html",
                8: ["detail.html", "?skipId=8&ItemId="],
                9: ["detail.html", "?skipId=9&ItemId="],
                10: "javascript:;",
                11: "javascript:;",
                12: ["detail-zhuang.html", "?skipId=12&detailId="],
                13: ["yuy.html", "?skipId=13&showClassId="],
                14: ["applMoreList.html", "?skipId=14&moreId="],
                15: ["furnitMoreList.html", "?skipId=15&moreId="],
                16: "house/index.html",
                17: "channel/housekeeping/homeKeep.html",
                18: "javascript:;",
                19: ["", ""],
                20: "javascript:;",
                21: ["mofangNew.html", "?skipId=21&jmfId="],
                22: ["detail-house.html", "?skipId=22&type=new_house&houseId="],
                23: ["detail-house.html", "?skipId=23&type=second_house&houseId="],
                24: ["detail-house.html", "?skipId=24&type=rent_house&houseId="],
                25: "decoration.html",
                26: "siren.html",
                27: "javascript:;",
                28: "house/index.html?skipId=28&type=new_house",
                29: "house/index.html?skipId=29&type=second_house",
                30: "house/index.html?skipId=30&type=rent_house"
            }
        };
    $.extend($, n, i);
    var d = function () {
        return void 0 != $.cookie("jy_city") && null != $.cookie("jy_city") ? "CY" + $.cookie("jy_city").split(",")[0] : "CY110100000"
    }, c = {
        address: {
            province: o + "/common-city/v1/province/queryAllProvinces?containChilds=false",
            city: o + "/common-city/v1/city/queryCitys/"
        },
        dialog: {dialogUrl: o + "/jyshop-deco/v1/shop/ad/app/selectAdConfig" + s + "cityId=" + d().replace(/[^0-9]/gi, "") + "&fun="},
        detail: {
            detailUrl: o + "/jyshop-goods/v1/shop/goods/detail/" + a("ItemId"),
            reviewsUrl: o + "/jyshop-comment/v1/shop/comment/app/goods/commentlist/" + a("ItemId")
        },
        list: {listUrl: o + "/jyshop-goods/v1/shop/goods/list/listShowByGcId"},
        search: {
            searchUrlProdJiade: o + "/jyshop-goods/v1/shop/search/app/search/JIADE",
            searchUrlProdJiaju: o + "/jyshop-goods/v1/shop/search/app/search/JIAJU",
            searchUrlHouseNew: o + "/jyhouse-api/v1/newHouse/search",
            searchUrlHouseOld: o + "/jyhouse-api/v1/secondHouse/search",
            searchUrlHouseRental: o + "/jyhouse-api/v1/rentHouse/search"
        },
        house: {
            newHouseListUrl: o + "/jyhouse-api/v1/newHouse/getHouses",
            newHouseCondition: o + "/jyhouse-api/v1/basicCondition/getNewHouseCondition",
            newHouseProjectDynamic: o + "/jyhouse-api/v1/newHouse/getProjectDynamic",
            newHouseNearHouses: o + "/jyhouse-api/v1/newHouse/getNearHouses",
            newHouseSamePriceHouses: o + "/jyhouse-api/v1/newHouse/getSamePriceHouses",
            secondHouseListUrl: o + "/jyhouse-api/v1/secondHouse/getHouses",
            secondHouseCondition: o + "/jyhouse-api/v1/basicCondition/getSecondHouseCondition",
            secondHouseSameDistrictHouses: o + "/jyhouse-api/v1/secondHouse/getSameDistrictHouses",
            secondHouseSamePriceHouses: o + "/jyhouse-api/v1/secondHouse/getSamePriceHouses",
            rentHouseListUrl: o + "/jyhouse-api/v1/rentHouse/getHouses",
            rentHouseCondition: o + "/jyhouse-api/v1/basicCondition/getRentHouseCondition",
            rentHouseSameDistrictHouses: o + "/jyhouse-api/v1/rentHouse/getSameDistrictHouses",
            rentHouseSamePriceHouses: o + "/jyhouse-api/v1/rentHouse/getSamePriceHouses",
            areaCondition: o + "/jyhouse-api/v1/common/getCountys" + s,
            getBizs: o + "/jyhouse-api/v1/common/getBizs" + s,
            getMapCountyHouses: o + "/jyhouse-api/v1/newHouse/getMapCountyHouses" + s,
            getMapBizHouses: o + "/jyhouse-api/v1/newHouse/getMapBizHouses" + s,
            getMapDistrictHouses: o + "/jyhouse-api/v1/newHouse/getMapDistrictHouses" + s,
            getHousesByDistrictId: o + "/jyhouse-api/v1/newHouse/getHousesByDistrictId" + s,
            house_map_rentCountyHouses: o + "/jyhouse-api/v1/rentHouse/getMapCountyHouses" + s,
            house_map_rentBizHouses: o + "/jyhouse-api/v1/rentHouse/getMapBizHouses" + s,
            house_map_rentDistrictHouses: o + "/jyhouse-api/v1/rentHouse/getMapDistrictHouses" + s,
            house_map_rentDistrictId: o + "/jyhouse-api/v1/rentHouse/getHousesByDistrictId" + s,
            house_map_secondCountyHouses: o + "/jyhouse-api/v1/secondHouse/getMapCountyHouses" + s,
            house_map_secondBizHouses: o + "/jyhouse-api/v1/secondHouse/getMapBizHouses" + s,
            house_map_secondDistrictHouses: o + "/jyhouse-api/v1/secondHouse/getMapDistrictHouses" + s,
            house_map_secondByDistrictId: o + "/jyhouse-api/v1/secondHouse/getHousesByDistrictId" + s,
            newDetail: o + "/jyhouse-api/v1/newHouse/",
            secondDetail: o + "/jyhouse-api/v1/secondHouse/",
            rentDetail: o + "/jyhouse-api/v1/rentHouse/"
        },
        home: {
            indexUrl: o + "/jyshop-deco/v1/shop/decorate/index/INDEX/",
            reviewsUrl: o + "/jyshop-deco/v1/shop/decorate/index/INDEX/" + a("ItemId")
        },
        homeKeep: {
            homeKeepUrl: o + "/jyshop-deco/v1/shop/decorate/index/HOUSEKEEPING/",
            reviewsUrl: o + "/jyshop-deco/v1/shop/decorate/index/HOUSEKEEPING/" + a("ItemId")
        },
        homeKeepAll: {
            homeKeepAllUrl: o + "/jyshop-deco/v1/shop/decorate/jz/HOUSEKEEPINGMORE/",
            reviewsUrl: o + "/jyshop-deco/v1/shop/decorate/jz/HOUSEKEEPINGMORE/" + a("ItemId")
        },
        applMore: {applMoreUrl: o + "/jyshop-deco/v1/shop/activity/goods/"},
        furnitMore: {furnitMoreUrl: o + "/jyshop-deco/v1/shop/activity/goods/"},
        appliance: {indexUrl: o + "/jyshop-deco/v1/shop/decorate/index/APPLIANCES/"},
        furniture: {indexUrl: o + "/jyshop-deco/v1/shop/decorate/index/FURNITURE/"},
        appCate: {appCateUrl: o + "/jyshop-magic/v1/shop/show/class/list/appliance"},
        furintCate: {furintCateUrl: o + "/jyshop-magic/v1/shop/show/class/list/furniture"},
        decoration: {
            decorationUrl: o + "/jyshop-deco/v1/shop/decorate/index/SNN/",
            sirenUrl: o + "/jyshop-deco/v1/shop/decorate/index/CUSTOM/",
            reviewsUrl: o + "/jyshop-deco/v1/shop/decorate/index/SNN/" + a("ItemId")
        },
        decorationNew: {
            decorationNewUrl: o + "/jyshop-deco/v1/shop/decorate/index/DECORATE/",
            sirenUrl: o + "/jyshop-deco/v1/shop/decorate/index/CUSTOM/",
            reviewsUrl: o + "/jyshop-deco/v1/shop/decorate/index/SNN/" + a("ItemId")
        },
        mofangNew: {
            queryCategoryUrl: o + "/jyshop-magic/v1/shop/magic/getShopMagicList/",
            querySecondUrl: o + "/jyshop-magic/v1/shop/magic/getGoodsBrandInfoList/",
            queryInitDataUrl: o + "/jyshop-magic/v1/shop/magic/getGoodsInfoListByClassPage/",
            queryGoodsByConditionUrl: o + "/jyshop-magic/v1/shop/magic/getGoodsInfoList/",
            querySpecByIdUrl: o + "/jyshop-magic//v1/shop/magic/getGoodsSpecification/",
            queryPriceBySpecUrl: o + "/jyshop-magic/v1/shop/price/",
            queryDoPriceUrl: o + "/jyshop-deco/v1/shop/decorate/index/JIAMOFANGJSQ/"
        },
        siren: {
            sirenUrl: o + "/jyshop-deco/v1/shop/decorate/index/CUSTOM/",
            reviewsUrl: o + "/jyshop-deco/v1/shop/decorate/index/CUSTOM/" + a("ItemId")
        },
        mofang: {
            mofangUrl: o + "/jyshop-deco/v1/shop/decorate/index/JIAMOFANG/",
            reviewsUrl: o + "/jyshop-deco/v1/shop/decorate/index/JIAMOFANG/" + a("ItemId")
        },
        decorateList: {
            indexUrl: o + "/jyshop-deco/v1/shop/decorate/img/page/",
            screenUrl: o + "/jyshop-deco/v1/shop/decorate/scr",
            reviewsUrl: o + "/jyshop-deco/v1/shop/decorate/img/page/" + a("ItemId")
        },
        detailZhuang: {
            detailZhuangUrl: o + "/jyshop-deco/v1/shop/decorate/img/group/",
            reviewsUrl: o + "/jyshop-deco/v1/shop/decorate/img/group/" + a("ItemId")
        },
        designer: {
            designerUrl: o + "/jyshop-deco/v1/shop/decorate/img/group/design/",
            reviewsUrl: o + "/jyshop-deco/v1/shop/decorate/img/group/design/" + a("ItemId")
        },
        getCity: {getCityList: o + "/jyhouse-api/v1/common/getCitys" + s},
        yuy: {
            getPositionList: "//api.map.baidu.com/place/v2/suggestion",
            confirmYuy: o + "/jyall-workflow/v1/order/jzyuyue",
            identifyCode: o + "/common-api/v1/common/vcode/genRandCode/"
        },
        genero: {
            getgeneroUrl: o + "/jysteward-centerapipre/v1/goldenAssign/assignByAddress",
            secondRentUrl: o + "/jyhouse-golden/v1/goldencontroller/getgoldenByHousingId"
        },
        activity: {
            activity520Url: o + "/jyshop-deco/v1/shop/activity/520",
            checkExpire: o + "/jyall-market/v1/marketcenter/customer/checkExpire",
            checkRegistByMobile: o + "/user-api/v1/authcenter/app/checkRegistByMobile",
            getNickNamByUserId: o + "/user-api/v1/authcenter/app/getNickNamByUserId",
            addCustUserRelation: o + "/jyall-market/v1/marketcenter/customer/addCustUserRelation",
            getBeanCounts: o + "/jyall-market/v1/marketcenter/customer/getBeanCounts",
            insertCustomer: o + "/jyhouse-union/v1/provider/1.0/insertCustomer"
        },
        register: {
            imgCode: o + "/user-api/v1/authcenter/app/randomImage",
            checkCodeUrl: o + "/common-api/v1/common/vcode/checkRandomCode/",
            registerUrl: o + "/user-api/v1/authcenter/app/unionAddUser",
            identifyCode: o + "/user-api/v1/authcenter/app/smsCode/",
            voiceIdentifyCode: o + "/user-api/v1/authcenter/app/voiceCode/",
            activationUser: o + "/user-api/v1/authcenter/app/activate/"
        },
        card: {getCardUrl: o + "/user-employee/v1/employee/genero/"},
        steward: {stewardUrl: o + "/jygoods-api/v1/entrust/add/"},
        seckill: {
            seckillUrl: o + "/jysales-api/v1/seckill/getActivityList/",
            seckillTime: o + "/jysales-api/v1/seckill/getGroupBuyTimes/",
            seckillList: o + "/jysales-api/v1/seckill/getGroupBuySkus"
        },
        queryPrice: {
            queryPriceUrl: o + "/jygoods-api/v1/goods/skuList/",
            submitQueryUrl: o + "/jygoods-api/v1/entrust/add/11/"
        },
        borderList: {
            borderListUrl: o + "/common-push/v1/push",
            goldListUrl: o + "/jycms-api/v1/article/api/detailPageList" + s
        },
        carYue: {carYueUrl: o + "/jygoods-api/v1/entrust/add/8/"},
        bigdata: {
            queryTotalTradeCost: o + "/dw-h5/v1/order/total/queryTotalPayCost",
            queryOrderCostTop10ByCity: o + "/dw-h5/v1/order/yesterday/queryOrderCostTop10ByCity",
            queryOrderCostByIndustry: o + "/dw-h5/v1/order/yesterday/queryOrderCostByIndustry",
            queryWeb: o + "/dw-h5/v1/flow/queryWeb",
            queryM: o + "/dw-h5/v1/flow/queryM",
            queryIos: o + "/dw-h5/v1/flow/queryIos",
            queryAndroid: o + "/dw-h5/v1/flow/queryAndroid",
            queryNumTop10ByCity: o + "/dw-h5/v1/order/detail/queryNumTop10ByCity",
            queryNumByIndustry: o + "/dw-h5/v1/order/detail/queryNumByIndustry",
            queryHomeBeans: o + "/dw-h5/v1/order/detail/queryHomeBeans",
            queryDiscountAmount: o + "/dw-h5/v1/order/detail/queryDiscountAmount",
            queryPayCostNumDetail: o + "/dw-h5/v1/order/yesterday/queryPayCostNumDetail",
            queryOrderCostByHour: o + "/dw-h5/v1/order/yesterday/queryOrderCostByHour",
            queryOrderCostTop10City: o + "/dw-h5/v1/order/yesterday/queryOrderCostTop10City",
            queryDate: o + "/dw-h5/v1/order/queryDate/-1"
        },
        appoint: {
            querySku: o + "/jygoods-api/v1/sku/",
            appointUrl: o + "/jygoods-api/v1/dispatch/add/",
            appointPhoneCode: o + "/jyall-workflowV2/v1/order/yuyue/sendIdentifyCode/",
            appointSubmit: o + "/jyall-workflowV2/v1/order/yuyue/stateless"
        }
    }, u = function (e) {
        navigator.geolocation ? navigator.geolocation.getCurrentPosition(function (o) {
            var s = new BMap.Point(o.coords.longitude, o.coords.latitude);
            BMap.Convertor.translate(s, 0, function (o) {
                $.getJSON("//api.map.baidu.com/geocoder/v2/?ak=avCvjA6Ko601NmLCQDOKZcyB&callback=?&location=" + o.lat.toFixed(6) + "," + o.lng.toFixed(6) + "&output=json&pois=1", e)
            })
        }, function (o) {
            var s;
            switch (o.code) {
                case o.PERMISSION_DENIED:
                    s = "ç”¨æˆ·æ‹’ç»èŽ·å–";
                    break;
                case o.POSITION_UNAVAILABLE:
                    s = "æ— æ³•èŽ·å–å½“å‰ä½ç½®";
                    break;
                case o.TIMEOUT:
                    s = "è¯·æ±‚è¶…æ—¶";
                    break;
                case o.UNKNOWN_ERROR:
                    s = "æ— æ³•èŽ·å–é”™è¯¯ä¿¡æ¯"
            }
            e({error: "å®šä½å¤±è´¥ï¼"})
        }) : e({error: "å®šä½å¤±è´¥ï¼"})
    };
    return APPkey = a("APPkey") ? a("APPkey") : "b40538ab5bef1ffd18605efda7f820d9", {
        isLocalStorageNameSupported: function () {
            try {
                if ("localStorage" in window && window.localStorage)return localStorage.setItem("__JY_LOCALSTORAGETEST__", 1), !0
            } catch (e) {
                return !1
            }
        },
        wwwURL: e,
        wwwPATHNAME: location.pathname,
        wwwHASH: location.hash,
        wwwSEARCH: location.search,
        nick_name: $.cookie("b2b_nick_n"),
        buyer_lv: $.cookie("b2b_buyer_lv"),
        confURL: c,
        httpLoad: r,
        getQueryString: a,
        getPosition: u,
        cityID: d(),
        imgUrl: t,
        jumpListURL: n,
        APPkey: APPkey,
        trim: function (e) {
            return e.replace(/(^\s*)|(\s*$)/g, "")
        }
    }
});
;/*!/common/tip.js*/
define("common/tip", ["common/config"], function (e) {
    var t = {
        toast: function (e) {
            if (!$("#toast")[0]) {
                var t = document.createElement("div");
                t.id = "toast", t.className = "toast", t.innerHTML = "<div class = 'toast-out'><div class = 'toast-in' id = 'toast_content'></div></div>", document.body.appendChild(t), $("#toast")[0].addEventListener("webkitAnimationEnd", function () {
                    this.className = "toast"
                }, !1)
            }
            $("#toast_content")[0].innerHTML = e, $("#toast")[0].className += " toasts"
        }, confirm: function (e) {
            if ($("#tip_confirm")[0]) $("#tip_confirm")[0].style.display = "block", $("#mask")[0].style.display = "block"; else {
                var t = document.createElement("div");
                t.id = "tip_confirm", t.className = "tip-confirm", t.innerHTML = (e.title ? "<div class = 'confirm-title'><div>" + e.title + "</div></div>" : "") + "<div><div class = 'content'>" + e.content + "</div></div><div class = 'confirm-button' style='padding-bottom: 0'><span id = 'confirm_no'>" + (e.cancelText ? e.cancelText : "å–æ¶ˆ") + "</span><span id = 'confirm_yes'>" + (e.confirmText ? e.confirmText : "ç¡®å®š") + "</span></div>", document.body.appendChild(t), $("#mask")[0].style.display = "block", $("#tip_confirm")[0].addEventListener("click", function (t) {
                    return "confirm_no" == t.target.id ? ($("#tip_confirm")[0].style.display = "none", $("#mask")[0].style.display = "none", !1) : void("confirm_yes" == t.target.id && e.method && e.method())
                })
            }
        }, alert: function (e) {
            if ($("alert")) $("mask").style.display = "block", $("alert").style.display = "block"; else {
                var t = document.createElement("div");
                t.id = "alert", t.className = "alert", t.innerHTML = (e.title ? "<div class = 'alert-title'>" + (e.titleImg ? "<img src = '" + e.titleImg + "'/> &nbsp;" : "") + e.title + "</div>" : "") + "<div id = 'alert_content'>" + e.content + "</div><span id = 'alert_button' class = 'no-bg'>" + e.btnStr + "</span></div>", document.body.appendChild(t), $("mask").style.display = "block", t.addEventListener("click", function (t) {
                    "alert_button" == t.target.id && e.method && e.method()
                })
            }
        }, ajaxTip: function () {
            if (!$("#loadEffect")[0]) {
                var e = document.createElement("div");
                e.id = "loadEffect", e.className = "loadEffect", e.innerHTML = "<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>", document.body.appendChild(e)
            }
            $("#mask")[0].style.display = "block", $("#loadEffect")[0].style.display = "block"
        }, closeMask: function () {
            $("mask").style.display = "none", $("loadEffect").style.display = "none"
        }, explainTip: function () {
            if (!$("#explain_tip")[0]) {
                var e = document.createElement("div");
                e.className = "explain-tip", e.id = "explain_tip", e.innerHTML = "<span id='close_explain' style='cursor: pointer;'>+</span><div class='iframe'><iframe width='100%' scrolling='yes' height='100%' frameborder='0' name='' src='//m.jyall.com/popup/jydbonus.html'></iframe></div>", document.body.appendChild(e), $(document.body).on("click", "#explain_tip #close_explain", function () {
                    $("#explain_tip").css("display", "none"), $("#mask").css("display", "none")
                }), e.addEventListener("touchmove", function (e) {
                    e.preventDefault(), e.stopPropagation()
                }, !1), $("#mask")[0].addEventListener("touchmove", function (e) {
                    e.preventDefault(), e.stopPropagation()
                }, !1)
            }
            $("#explain_tip").css("display", "block"), $("#mask").css("display", "block")
        }, dialog: function (t, i, n) {
            var a = new Date;
            $.get(e.confURL.dialog.dialogUrl + i, function (e) {
                var i = e[0].path;
                if (a.setTime(a.getTime() + 1e4), $("#dialog")[0]) $("#dialog .tip-main").prop("src", i), $("#dialog")[0].className = "dialog", $("#mask2")[0].style.display = "none"; else {
                    var s = document.createElement("div");
                    s.id = "dialog", s.className = "dialog", s.innerHTML = "<div><img src = '" + i + "'  class = 'tip-main'/><img src = '" + n + "' class = 'close'/></div>", document.body.appendChild(s), console.log(e), $("#dialog .close")[0].addEventListener("click", function () {
                        $("#dialog")[0].className = "dialog", $("#mask2")[0].style.display = "none"
                    }, !1)
                }
                $.cookie(t, t, {
                    expires: 1,
                    path: "/",
                    domain: "jyall.com"
                }), $("#dialog")[0].className += " dialogs", $("#mask2")[0].style.display = "block"
            })
        }
    };
    return t
});
;/*!/common/downloadapp.js*/
define("common/downloadapp", ["common/config", "common/tip"], function () {
    return window.downLoadapp = {
        init: function () {
            var t = this;
            t.isHasApp = !0, t.timeout, t.t = 1e3, t.appandroidUrl = "http://appdownload.jyall.com/android/jyall/", t.linkDownloadApp = "https://itunes.apple.com/cn/app/jin-se-jia-yuan-wang/id1033724221?mt=8", t.downloadUrl = "//m.jyall.com/download.html", t.linkBtn = $(".j-downAppBtn"), t.linkApp = t.linkBtn.attr("data-href"), $("body").on("click", ".j-downAppBtn", function () {
                var n = $(".j-downAppBtn").attr("data-href");
                if ("MicroMessenger" != navigator.userAgent.match(/MicroMessenger/i))if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                    var e = new Date, o = document.createElement("a");
                    o.href = t.downloadUrl, document.body.appendChild(o);
                    var a = document.createEvent("HTMLEvents");
                    a.initEvent("click", !1, !0), window.setTimeout(function () {
                        var t = new Date;
                        5e3 > t - e ? o.dispatchEvent(a) : window.close()
                    }, 2e3), window.location = n
                } else if (navigator.userAgent.match(/android/i)) {
                    var i = null;
                    try {
                        i = document.createElement("iframe"), i.setAttribute("src", n), i.setAttribute("style", "display:none"), document.body.appendChild(i)
                    } catch (d) {
                    }
                    setTimeout(function () {
                        window.location = t.downloadUrl
                    }, 2e3)
                }
            })
        }, testApp: function () {
            var t = this, n = Date.now(), e = document.createElement("iframe");
            e.setAttribute("src", t.linkApp), e.setAttribute("style", "display:none"), document.body.appendChild(e), timeout = setTimeout(function () {
                var e = Date.now();
                (!n || e - n < t.t + 100) && (t.isHasApp = !1)
            }, t.t)
        }, isDownloadApp: function (t) {
            var n = this, e = Date.now();
            (!t || e - t < n.t + 100) && (n.isHasApp = !1)
        }
    }, downLoadapp
});
;/*!/static/lib/underscore.js*/
(function () {
    function n(n) {
        function t(t, r, e, u, i, o) {
            for (; i >= 0 && o > i; i += n) {
                var a = u ? u[i] : i;
                e = r(e, t[a], a, t)
            }
            return e
        }

        return function (r, e, u, i) {
            e = b(e, i, 4);
            var o = !k(r) && m.keys(r), a = (o || r).length, c = n > 0 ? 0 : a - 1;
            return arguments.length < 3 && (u = r[o ? o[c] : c], c += n), t(r, e, u, o, c, a)
        }
    }

    function t(n) {
        return function (t, r, e) {
            r = x(r, e);
            for (var u = O(t), i = n > 0 ? 0 : u - 1; i >= 0 && u > i; i += n)if (r(t[i], i, t))return i;
            return -1
        }
    }

    function r(n, t, r) {
        return function (e, u, i) {
            var o = 0, a = O(e);
            if ("number" == typeof i) n > 0 ? o = i >= 0 ? i : Math.max(i + a, o) : a = i >= 0 ? Math.min(i + 1, a) : i + a + 1; else if (r && i && a)return i = r(e, u), e[i] === u ? i : -1;
            if (u !== u)return i = t(l.call(e, o, a), m.isNaN), i >= 0 ? i + o : -1;
            for (i = n > 0 ? o : a - 1; i >= 0 && a > i; i += n)if (e[i] === u)return i;
            return -1
        }
    }

    function e(n, t) {
        var r = I.length, e = n.constructor, u = m.isFunction(e) && e.prototype || a, i = "constructor";
        for (m.has(n, i) && !m.contains(t, i) && t.push(i); r--;)i = I[r], i in n && n[i] !== u[i] && !m.contains(t, i) && t.push(i)
    }

    var u = this, i = u._, o = Array.prototype, a = Object.prototype, c = Function.prototype, f = o.push, l = o.slice,
        s = a.toString, p = a.hasOwnProperty, h = Array.isArray, v = Object.keys, g = c.bind, y = Object.create,
        d = function () {
        }, m = function (n) {
            return n instanceof m ? n : this instanceof m ? void(this._wrapped = n) : new m(n)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = m), exports._ = m) : u._ = m, m.VERSION = "1.8.3";
    var b = function (n, t, r) {
        if (void 0 === t)return n;
        switch (null == r ? 3 : r) {
            case 1:
                return function (r) {
                    return n.call(t, r)
                };
            case 2:
                return function (r, e) {
                    return n.call(t, r, e)
                };
            case 3:
                return function (r, e, u) {
                    return n.call(t, r, e, u)
                };
            case 4:
                return function (r, e, u, i) {
                    return n.call(t, r, e, u, i)
                }
        }
        return function () {
            return n.apply(t, arguments)
        }
    }, x = function (n, t, r) {
        return null == n ? m.identity : m.isFunction(n) ? b(n, t, r) : m.isObject(n) ? m.matcher(n) : m.property(n)
    };
    m.iteratee = function (n, t) {
        return x(n, t, 1 / 0)
    };
    var _ = function (n, t) {
        return function (r) {
            var e = arguments.length;
            if (2 > e || null == r)return r;
            for (var u = 1; e > u; u++)for (var i = arguments[u], o = n(i), a = o.length, c = 0; a > c; c++) {
                var f = o[c];
                t && void 0 !== r[f] || (r[f] = i[f])
            }
            return r
        }
    }, j = function (n) {
        if (!m.isObject(n))return {};
        if (y)return y(n);
        d.prototype = n;
        var t = new d;
        return d.prototype = null, t
    }, w = function (n) {
        return function (t) {
            return null == t ? void 0 : t[n]
        }
    }, A = Math.pow(2, 53) - 1, O = w("length"), k = function (n) {
        var t = O(n);
        return "number" == typeof t && t >= 0 && A >= t
    };
    m.each = m.forEach = function (n, t, r) {
        t = b(t, r);
        var e, u;
        if (k(n))for (e = 0, u = n.length; u > e; e++)t(n[e], e, n); else {
            var i = m.keys(n);
            for (e = 0, u = i.length; u > e; e++)t(n[i[e]], i[e], n)
        }
        return n
    }, m.map = m.collect = function (n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = Array(u), o = 0; u > o; o++) {
            var a = e ? e[o] : o;
            i[o] = t(n[a], a, n)
        }
        return i
    }, m.reduce = m.foldl = m.inject = n(1), m.reduceRight = m.foldr = n(-1), m.find = m.detect = function (n, t, r) {
        var e;
        return e = k(n) ? m.findIndex(n, t, r) : m.findKey(n, t, r), void 0 !== e && -1 !== e ? n[e] : void 0
    }, m.filter = m.select = function (n, t, r) {
        var e = [];
        return t = x(t, r), m.each(n, function (n, r, u) {
            t(n, r, u) && e.push(n)
        }), e
    }, m.reject = function (n, t, r) {
        return m.filter(n, m.negate(x(t)), r)
    }, m.every = m.all = function (n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
            var o = e ? e[i] : i;
            if (!t(n[o], o, n))return !1
        }
        return !0
    }, m.some = m.any = function (n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
            var o = e ? e[i] : i;
            if (t(n[o], o, n))return !0
        }
        return !1
    }, m.contains = m.includes = m.include = function (n, t, r, e) {
        return k(n) || (n = m.values(n)), ("number" != typeof r || e) && (r = 0), m.indexOf(n, t, r) >= 0
    }, m.invoke = function (n, t) {
        var r = l.call(arguments, 2), e = m.isFunction(t);
        return m.map(n, function (n) {
            var u = e ? t : n[t];
            return null == u ? u : u.apply(n, r)
        })
    }, m.pluck = function (n, t) {
        return m.map(n, m.property(t))
    }, m.where = function (n, t) {
        return m.filter(n, m.matcher(t))
    }, m.findWhere = function (n, t) {
        return m.find(n, m.matcher(t))
    }, m.max = function (n, t, r) {
        var e, u, i = -1 / 0, o = -1 / 0;
        if (null == t && null != n) {
            n = k(n) ? n : m.values(n);
            for (var a = 0, c = n.length; c > a; a++)e = n[a], e > i && (i = e)
        } else t = x(t, r), m.each(n, function (n, r, e) {
            u = t(n, r, e), (u > o || u === -1 / 0 && i === -1 / 0) && (i = n, o = u)
        });
        return i
    }, m.min = function (n, t, r) {
        var e, u, i = 1 / 0, o = 1 / 0;
        if (null == t && null != n) {
            n = k(n) ? n : m.values(n);
            for (var a = 0, c = n.length; c > a; a++)e = n[a], i > e && (i = e)
        } else t = x(t, r), m.each(n, function (n, r, e) {
            u = t(n, r, e), (o > u || 1 / 0 === u && 1 / 0 === i) && (i = n, o = u)
        });
        return i
    }, m.shuffle = function (n) {
        for (var t, r = k(n) ? n : m.values(n), e = r.length, u = Array(e),
                 i = 0; e > i; i++)t = m.random(0, i), t !== i && (u[i] = u[t]), u[t] = r[i];
        return u
    }, m.sample = function (n, t, r) {
        return null == t || r ? (k(n) || (n = m.values(n)), n[m.random(n.length - 1)]) : m.shuffle(n).slice(0, Math.max(0, t))
    }, m.sortBy = function (n, t, r) {
        return t = x(t, r), m.pluck(m.map(n, function (n, r, e) {
            return {value: n, index: r, criteria: t(n, r, e)}
        }).sort(function (n, t) {
            var r = n.criteria, e = t.criteria;
            if (r !== e) {
                if (r > e || void 0 === r)return 1;
                if (e > r || void 0 === e)return -1
            }
            return n.index - t.index
        }), "value")
    };
    var F = function (n) {
        return function (t, r, e) {
            var u = {};
            return r = x(r, e), m.each(t, function (e, i) {
                var o = r(e, i, t);
                n(u, e, o)
            }), u
        }
    };
    m.groupBy = F(function (n, t, r) {
        m.has(n, r) ? n[r].push(t) : n[r] = [t]
    }), m.indexBy = F(function (n, t, r) {
        n[r] = t
    }), m.countBy = F(function (n, t, r) {
        m.has(n, r) ? n[r]++ : n[r] = 1
    }), m.toArray = function (n) {
        return n ? m.isArray(n) ? l.call(n) : k(n) ? m.map(n, m.identity) : m.values(n) : []
    }, m.size = function (n) {
        return null == n ? 0 : k(n) ? n.length : m.keys(n).length
    }, m.partition = function (n, t, r) {
        t = x(t, r);
        var e = [], u = [];
        return m.each(n, function (n, r, i) {
            (t(n, r, i) ? e : u).push(n)
        }), [e, u]
    }, m.first = m.head = m.take = function (n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : m.initial(n, n.length - t)
    }, m.initial = function (n, t, r) {
        return l.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)))
    }, m.last = function (n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : m.rest(n, Math.max(0, n.length - t))
    }, m.rest = m.tail = m.drop = function (n, t, r) {
        return l.call(n, null == t || r ? 1 : t)
    }, m.compact = function (n) {
        return m.filter(n, m.identity)
    };
    var S = function (n, t, r, e) {
        for (var u = [], i = 0, o = e || 0, a = O(n); a > o; o++) {
            var c = n[o];
            if (k(c) && (m.isArray(c) || m.isArguments(c))) {
                t || (c = S(c, t, r));
                var f = 0, l = c.length;
                for (u.length += l; l > f;)u[i++] = c[f++]
            } else r || (u[i++] = c)
        }
        return u
    };
    m.flatten = function (n, t) {
        return S(n, t, !1)
    }, m.without = function (n) {
        return m.difference(n, l.call(arguments, 1))
    }, m.uniq = m.unique = function (n, t, r, e) {
        m.isBoolean(t) || (e = r, r = t, t = !1), null != r && (r = x(r, e));
        for (var u = [], i = [], o = 0, a = O(n); a > o; o++) {
            var c = n[o], f = r ? r(c, o, n) : c;
            t ? (o && i === f || u.push(c), i = f) : r ? m.contains(i, f) || (i.push(f), u.push(c)) : m.contains(u, c) || u.push(c)
        }
        return u
    }, m.union = function () {
        return m.uniq(S(arguments, !0, !0))
    }, m.intersection = function (n) {
        for (var t = [], r = arguments.length, e = 0, u = O(n); u > e; e++) {
            var i = n[e];
            if (!m.contains(t, i)) {
                for (var o = 1; r > o && m.contains(arguments[o], i); o++);
                o === r && t.push(i)
            }
        }
        return t
    }, m.difference = function (n) {
        var t = S(arguments, !0, !0, 1);
        return m.filter(n, function (n) {
            return !m.contains(t, n)
        })
    }, m.zip = function () {
        return m.unzip(arguments)
    }, m.unzip = function (n) {
        for (var t = n && m.max(n, O).length || 0, r = Array(t), e = 0; t > e; e++)r[e] = m.pluck(n, e);
        return r
    }, m.object = function (n, t) {
        for (var r = {}, e = 0, u = O(n); u > e; e++)t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r
    }, m.findIndex = t(1), m.findLastIndex = t(-1), m.sortedIndex = function (n, t, r, e) {
        r = x(r, e, 1);
        for (var u = r(t), i = 0, o = O(n); o > i;) {
            var a = Math.floor((i + o) / 2);
            r(n[a]) < u ? i = a + 1 : o = a
        }
        return i
    }, m.indexOf = r(1, m.findIndex, m.sortedIndex), m.lastIndexOf = r(-1, m.findLastIndex), m.range = function (n, t, r) {
        null == t && (t = n || 0, n = 0), r = r || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; e > i; i++, n += r)u[i] = n;
        return u
    };
    var E = function (n, t, r, e, u) {
        if (!(e instanceof t))return n.apply(r, u);
        var i = j(n.prototype), o = n.apply(i, u);
        return m.isObject(o) ? o : i
    };
    m.bind = function (n, t) {
        if (g && n.bind === g)return g.apply(n, l.call(arguments, 1));
        if (!m.isFunction(n))throw new TypeError("Bind must be called on a function");
        var r = l.call(arguments, 2), e = function () {
            return E(n, e, t, this, r.concat(l.call(arguments)))
        };
        return e
    }, m.partial = function (n) {
        var t = l.call(arguments, 1), r = function () {
            for (var e = 0, u = t.length, i = Array(u), o = 0; u > o; o++)i[o] = t[o] === m ? arguments[e++] : t[o];
            for (; e < arguments.length;)i.push(arguments[e++]);
            return E(n, r, this, this, i)
        };
        return r
    }, m.bindAll = function (n) {
        var t, r, e = arguments.length;
        if (1 >= e)throw new Error("bindAll must be passed function names");
        for (t = 1; e > t; t++)r = arguments[t], n[r] = m.bind(n[r], n);
        return n
    }, m.memoize = function (n, t) {
        var r = function (e) {
            var u = r.cache, i = "" + (t ? t.apply(this, arguments) : e);
            return m.has(u, i) || (u[i] = n.apply(this, arguments)), u[i]
        };
        return r.cache = {}, r
    }, m.delay = function (n, t) {
        var r = l.call(arguments, 2);
        return setTimeout(function () {
            return n.apply(null, r)
        }, t)
    }, m.defer = m.partial(m.delay, m, 1), m.throttle = function (n, t, r) {
        var e, u, i, o = null, a = 0;
        r || (r = {});
        var c = function () {
            a = r.leading === !1 ? 0 : m.now(), o = null, i = n.apply(e, u), o || (e = u = null)
        };
        return function () {
            var f = m.now();
            a || r.leading !== !1 || (a = f);
            var l = t - (f - a);
            return e = this, u = arguments, 0 >= l || l > t ? (o && (clearTimeout(o), o = null), a = f, i = n.apply(e, u), o || (e = u = null)) : o || r.trailing === !1 || (o = setTimeout(c, l)), i
        }
    }, m.debounce = function (n, t, r) {
        var e, u, i, o, a, c = function () {
            var f = m.now() - o;
            t > f && f >= 0 ? e = setTimeout(c, t - f) : (e = null, r || (a = n.apply(i, u), e || (i = u = null)))
        };
        return function () {
            i = this, u = arguments, o = m.now();
            var f = r && !e;
            return e || (e = setTimeout(c, t)), f && (a = n.apply(i, u), i = u = null), a
        }
    }, m.wrap = function (n, t) {
        return m.partial(t, n)
    }, m.negate = function (n) {
        return function () {
            return !n.apply(this, arguments)
        }
    }, m.compose = function () {
        var n = arguments, t = n.length - 1;
        return function () {
            for (var r = t, e = n[t].apply(this, arguments); r--;)e = n[r].call(this, e);
            return e
        }
    }, m.after = function (n, t) {
        return function () {
            return --n < 1 ? t.apply(this, arguments) : void 0
        }
    }, m.before = function (n, t) {
        var r;
        return function () {
            return --n > 0 && (r = t.apply(this, arguments)), 1 >= n && (t = null), r
        }
    }, m.once = m.partial(m.before, 2);
    var M = !{toString: null}.propertyIsEnumerable("toString"),
        I = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
    m.keys = function (n) {
        if (!m.isObject(n))return [];
        if (v)return v(n);
        var t = [];
        for (var r in n)m.has(n, r) && t.push(r);
        return M && e(n, t), t
    }, m.allKeys = function (n) {
        if (!m.isObject(n))return [];
        var t = [];
        for (var r in n)t.push(r);
        return M && e(n, t), t
    }, m.values = function (n) {
        for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++)e[u] = n[t[u]];
        return e
    }, m.mapObject = function (n, t, r) {
        t = x(t, r);
        for (var e, u = m.keys(n), i = u.length, o = {}, a = 0; i > a; a++)e = u[a], o[e] = t(n[e], e, n);
        return o
    }, m.pairs = function (n) {
        for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++)e[u] = [t[u], n[t[u]]];
        return e
    }, m.invert = function (n) {
        for (var t = {}, r = m.keys(n), e = 0, u = r.length; u > e; e++)t[n[r[e]]] = r[e];
        return t
    }, m.functions = m.methods = function (n) {
        var t = [];
        for (var r in n)m.isFunction(n[r]) && t.push(r);
        return t.sort()
    }, m.extend = _(m.allKeys), m.extendOwn = m.assign = _(m.keys), m.findKey = function (n, t, r) {
        t = x(t, r);
        for (var e, u = m.keys(n), i = 0, o = u.length; o > i; i++)if (e = u[i], t(n[e], e, n))return e
    }, m.pick = function (n, t, r) {
        var e, u, i = {}, o = n;
        if (null == o)return i;
        m.isFunction(t) ? (u = m.allKeys(o), e = b(t, r)) : (u = S(arguments, !1, !1, 1), e = function (n, t, r) {
            return t in r
        }, o = Object(o));
        for (var a = 0, c = u.length; c > a; a++) {
            var f = u[a], l = o[f];
            e(l, f, o) && (i[f] = l)
        }
        return i
    }, m.omit = function (n, t, r) {
        if (m.isFunction(t)) t = m.negate(t); else {
            var e = m.map(S(arguments, !1, !1, 1), String);
            t = function (n, t) {
                return !m.contains(e, t)
            }
        }
        return m.pick(n, t, r)
    }, m.defaults = _(m.allKeys, !0), m.create = function (n, t) {
        var r = j(n);
        return t && m.extendOwn(r, t), r
    }, m.clone = function (n) {
        return m.isObject(n) ? m.isArray(n) ? n.slice() : m.extend({}, n) : n
    }, m.tap = function (n, t) {
        return t(n), n
    }, m.isMatch = function (n, t) {
        var r = m.keys(t), e = r.length;
        if (null == n)return !e;
        for (var u = Object(n), i = 0; e > i; i++) {
            var o = r[i];
            if (t[o] !== u[o] || !(o in u))return !1
        }
        return !0
    };
    var N = function (n, t, r, e) {
        if (n === t)return 0 !== n || 1 / n === 1 / t;
        if (null == n || null == t)return n === t;
        n instanceof m && (n = n._wrapped), t instanceof m && (t = t._wrapped);
        var u = s.call(n);
        if (u !== s.call(t))return !1;
        switch (u) {
            case"[object RegExp]":
            case"[object String]":
                return "" + n == "" + t;
            case"[object Number]":
                return +n !== +n ? +t !== +t : 0 === +n ? 1 / +n === 1 / t : +n === +t;
            case"[object Date]":
            case"[object Boolean]":
                return +n === +t
        }
        var i = "[object Array]" === u;
        if (!i) {
            if ("object" != typeof n || "object" != typeof t)return !1;
            var o = n.constructor, a = t.constructor;
            if (o !== a && !(m.isFunction(o) && o instanceof o && m.isFunction(a) && a instanceof a) && "constructor" in n && "constructor" in t)return !1
        }
        r = r || [], e = e || [];
        for (var c = r.length; c--;)if (r[c] === n)return e[c] === t;
        if (r.push(n), e.push(t), i) {
            if (c = n.length, c !== t.length)return !1;
            for (; c--;)if (!N(n[c], t[c], r, e))return !1
        } else {
            var f, l = m.keys(n);
            if (c = l.length, m.keys(t).length !== c)return !1;
            for (; c--;)if (f = l[c], !m.has(t, f) || !N(n[f], t[f], r, e))return !1
        }
        return r.pop(), e.pop(), !0
    };
    m.isEqual = function (n, t) {
        return N(n, t)
    }, m.isEmpty = function (n) {
        return null == n ? !0 : k(n) && (m.isArray(n) || m.isString(n) || m.isArguments(n)) ? 0 === n.length : 0 === m.keys(n).length
    }, m.isElement = function (n) {
        return !(!n || 1 !== n.nodeType)
    }, m.isArray = h || function (n) {
            return "[object Array]" === s.call(n)
        }, m.isObject = function (n) {
        var t = typeof n;
        return "function" === t || "object" === t && !!n
    }, m.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function (n) {
        m["is" + n] = function (t) {
            return s.call(t) === "[object " + n + "]"
        }
    }), m.isArguments(arguments) || (m.isArguments = function (n) {
        return m.has(n, "callee")
    }), "function" != typeof/./ && "object" != typeof Int8Array && (m.isFunction = function (n) {
        return "function" == typeof n || !1
    }), m.isFinite = function (n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    }, m.isNaN = function (n) {
        return m.isNumber(n) && n !== +n
    }, m.isBoolean = function (n) {
        return n === !0 || n === !1 || "[object Boolean]" === s.call(n)
    }, m.isNull = function (n) {
        return null === n
    }, m.isUndefined = function (n) {
        return void 0 === n
    }, m.has = function (n, t) {
        return null != n && p.call(n, t)
    }, m.noConflict = function () {
        return u._ = i, this
    }, m.identity = function (n) {
        return n
    }, m.constant = function (n) {
        return function () {
            return n
        }
    }, m.noop = function () {
    }, m.property = w, m.propertyOf = function (n) {
        return null == n ? function () {
        } : function (t) {
            return n[t]
        }
    }, m.matcher = m.matches = function (n) {
        return n = m.extendOwn({}, n), function (t) {
            return m.isMatch(t, n)
        }
    }, m.times = function (n, t, r) {
        var e = Array(Math.max(0, n));
        t = b(t, r, 1);
        for (var u = 0; n > u; u++)e[u] = t(u);
        return e
    }, m.random = function (n, t) {
        return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
    }, m.now = Date.now || function () {
            return (new Date).getTime()
        };
    var B = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;"}, T = m.invert(B),
        q = function (n) {
            var t = function (t) {
                return n[t]
            }, r = "(?:" + m.keys(n).join("|") + ")", e = RegExp(r), u = RegExp(r, "g");
            return function (n) {
                return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, t) : n
            }
        };
    m.escape = q(B), m.unescape = q(T), m.result = function (n, t, r) {
        var e = null == n ? void 0 : n[t];
        return void 0 === e && (e = r), m.isFunction(e) ? e.call(n) : e
    };
    var R = 0;
    m.uniqueId = function (n) {
        var t = ++R + "";
        return n ? n + t : t
    }, m.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
    var K = /(.)^/, z = {"'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029"},
        D = /\\|'|\r|\n|\u2028|\u2029/g, L = function (n) {
            return "\\" + z[n]
        };
    m.template = function (n, t, r) {
        !t && r && (t = r), t = m.defaults({}, t, m.templateSettings);
        var e = RegExp([(t.escape || K).source, (t.interpolate || K).source, (t.evaluate || K).source].join("|") + "|$", "g"),
            u = 0, i = "__p+='";
        n.replace(e, function (t, r, e, o, a) {
            return i += n.slice(u, a).replace(D, L), u = a + t.length, r ? i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : o && (i += "';\n" + o + "\n__p+='"), t
        }), i += "';\n", t.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
        try {
            var o = new Function(t.variable || "obj", "_", i)
        } catch (a) {
            throw a.source = i, a
        }
        var c = function (n) {
            return o.call(this, n, m)
        }, f = t.variable || "obj";
        return c.source = "function(" + f + "){\n" + i + "}", c
    }, m.chain = function (n) {
        var t = m(n);
        return t._chain = !0, t
    };
    var P = function (n, t) {
        return n._chain ? m(t).chain() : t
    };
    m.mixin = function (n) {
        m.each(m.functions(n), function (t) {
            var r = m[t] = n[t];
            m.prototype[t] = function () {
                var n = [this._wrapped];
                return f.apply(n, arguments), P(this, r.apply(m, n))
            }
        })
    }, m.mixin(m), m.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (n) {
        var t = o[n];
        m.prototype[n] = function () {
            var r = this._wrapped;
            return t.apply(r, arguments), "shift" !== n && "splice" !== n || 0 !== r.length || delete r[0], P(this, r)
        }
    }), m.each(["concat", "join", "slice"], function (n) {
        var t = o[n];
        m.prototype[n] = function () {
            return P(this, t.apply(this._wrapped, arguments))
        }
    }), m.prototype.value = function () {
        return this._wrapped
    }, m.prototype.valueOf = m.prototype.toJSON = m.prototype.value, m.prototype.toString = function () {
        return "" + this._wrapped
    }, "function" == typeof define && define.amd && define("static/lib/underscore", ["require"], function () {
        return m
    })
}).call(this);
;/*!/static/lib/backbone.js*/
!function (t) {
    var e = "object" == typeof self && self.self == self && self || "object" == typeof global && global.global == global && global;
    if ("function" == typeof define && define.amd) define("static/lib/backbone", ["static/lib/underscore", "static/lib/jquery", "exports"], function (i, n, s) {
        e.Backbone = t(e, s, i, n)
    }); else if ("undefined" != typeof exports) {
        var i, n = require("static/lib/underscore");
        try {
            i = require("static/lib/jquery")
        } catch (s) {
        }
        t(e, exports, n, i)
    } else e.Backbone = t(e, {}, e._, e.jQuery || e.Zepto || e.ender || e.$)
}(function (t, e, i, n) {
    var s = t.Backbone, r = Array.prototype.slice;
    e.VERSION = "1.2.3", e.$ = n, e.noConflict = function () {
        return t.Backbone = s, this
    }, e.emulateHTTP = !1, e.emulateJSON = !1;
    var a = function (t, e, n) {
        switch (t) {
            case 1:
                return function () {
                    return i[e](this[n])
                };
            case 2:
                return function (t) {
                    return i[e](this[n], t)
                };
            case 3:
                return function (t, s) {
                    return i[e](this[n], h(t, this), s)
                };
            case 4:
                return function (t, s, r) {
                    return i[e](this[n], h(t, this), s, r)
                };
            default:
                return function () {
                    var t = r.call(arguments);
                    return t.unshift(this[n]), i[e].apply(i, t)
                }
        }
    }, o = function (t, e, n) {
        i.each(e, function (e, s) {
            i[s] && (t.prototype[s] = a(e, s, n))
        })
    }, h = function (t, e) {
        return i.isFunction(t) ? t : i.isObject(t) && !e._isModel(t) ? u(t) : i.isString(t) ? function (e) {
            return e.get(t)
        } : t
    }, u = function (t) {
        var e = i.matches(t);
        return function (t) {
            return e(t.attributes)
        }
    }, c = e.Events = {}, l = /\s+/, d = function (t, e, n, s, r) {
        var a, o = 0;
        if (n && "object" == typeof n) {
            void 0 !== s && "context" in r && void 0 === r.context && (r.context = s);
            for (a = i.keys(n); o < a.length; o++)e = d(t, e, a[o], n[a[o]], r)
        } else if (n && l.test(n))for (a = n.split(l); o < a.length; o++)e = t(e, a[o], s, r); else e = t(e, n, s, r);
        return e
    };
    c.on = function (t, e, i) {
        return f(this, t, e, i)
    };
    var f = function (t, e, i, n, s) {
        if (t._events = d(g, t._events || {}, e, i, {context: n, ctx: t, listening: s}), s) {
            var r = t._listeners || (t._listeners = {});
            r[s.id] = s
        }
        return t
    };
    c.listenTo = function (t, e, n) {
        if (!t)return this;
        var s = t._listenId || (t._listenId = i.uniqueId("l")), r = this._listeningTo || (this._listeningTo = {}),
            a = r[s];
        if (!a) {
            var o = this._listenId || (this._listenId = i.uniqueId("l"));
            a = r[s] = {obj: t, objId: s, id: o, listeningTo: r, count: 0}
        }
        return f(t, e, n, this, a), this
    };
    var g = function (t, e, i, n) {
        if (i) {
            var s = t[e] || (t[e] = []), r = n.context, a = n.ctx, o = n.listening;
            o && o.count++, s.push({callback: i, context: r, ctx: r || a, listening: o})
        }
        return t
    };
    c.off = function (t, e, i) {
        return this._events ? (this._events = d(v, this._events, t, e, {
            context: i,
            listeners: this._listeners
        }), this) : this
    }, c.stopListening = function (t, e, n) {
        var s = this._listeningTo;
        if (!s)return this;
        for (var r = t ? [t._listenId] : i.keys(s), a = 0; a < r.length; a++) {
            var o = s[r[a]];
            if (!o)break;
            o.obj.off(e, n, this)
        }
        return i.isEmpty(s) && (this._listeningTo = void 0), this
    };
    var v = function (t, e, n, s) {
        if (t) {
            var r, a = 0, o = s.context, h = s.listeners;
            if (e || n || o) {
                for (var u = e ? [e] : i.keys(t); a < u.length; a++) {
                    e = u[a];
                    var c = t[e];
                    if (!c)break;
                    for (var l = [], d = 0; d < c.length; d++) {
                        var f = c[d];
                        n && n !== f.callback && n !== f.callback._callback || o && o !== f.context ? l.push(f) : (r = f.listening, r && 0 === --r.count && (delete h[r.id], delete r.listeningTo[r.objId]))
                    }
                    l.length ? t[e] = l : delete t[e]
                }
                return i.size(t) ? t : void 0
            }
            for (var g = i.keys(h); a < g.length; a++)r = h[g[a]], delete h[r.id], delete r.listeningTo[r.objId]
        }
    };
    c.once = function (t, e, n) {
        var s = d(p, {}, t, e, i.bind(this.off, this));
        return this.on(s, void 0, n)
    }, c.listenToOnce = function (t, e, n) {
        var s = d(p, {}, e, n, i.bind(this.stopListening, this, t));
        return this.listenTo(t, s)
    };
    var p = function (t, e, n, s) {
        if (n) {
            var r = t[e] = i.once(function () {
                s(e, r), n.apply(this, arguments)
            });
            r._callback = n
        }
        return t
    };
    c.trigger = function (t) {
        if (!this._events)return this;
        for (var e = Math.max(0, arguments.length - 1), i = Array(e), n = 0; e > n; n++)i[n] = arguments[n + 1];
        return d(m, this._events, t, void 0, i), this
    };
    var m = function (t, e, i, n) {
        if (t) {
            var s = t[e], r = t.all;
            s && r && (r = r.slice()), s && _(s, n), r && _(r, [e].concat(n))
        }
        return t
    }, _ = function (t, e) {
        var i, n = -1, s = t.length, r = e[0], a = e[1], o = e[2];
        switch (e.length) {
            case 0:
                for (; ++n < s;)(i = t[n]).callback.call(i.ctx);
                return;
            case 1:
                for (; ++n < s;)(i = t[n]).callback.call(i.ctx, r);
                return;
            case 2:
                for (; ++n < s;)(i = t[n]).callback.call(i.ctx, r, a);
                return;
            case 3:
                for (; ++n < s;)(i = t[n]).callback.call(i.ctx, r, a, o);
                return;
            default:
                for (; ++n < s;)(i = t[n]).callback.apply(i.ctx, e);
                return
        }
    };
    c.bind = c.on, c.unbind = c.off, i.extend(e, c);
    var y = e.Model = function (t, e) {
        var n = t || {};
        e || (e = {}), this.cid = i.uniqueId(this.cidPrefix), this.attributes = {}, e.collection && (this.collection = e.collection), e.parse && (n = this.parse(n, e) || {}), n = i.defaults({}, n, i.result(this, "defaults")), this.set(n, e), this.changed = {}, this.initialize.apply(this, arguments)
    };
    i.extend(y.prototype, c, {
        changed: null,
        validationError: null,
        idAttribute: "id",
        cidPrefix: "c",
        initialize: function () {
        },
        toJSON: function () {
            return i.clone(this.attributes)
        },
        sync: function () {
            return e.sync.apply(this, arguments)
        },
        get: function (t) {
            return this.attributes[t]
        },
        escape: function (t) {
            return i.escape(this.get(t))
        },
        has: function (t) {
            return null != this.get(t)
        },
        matches: function (t) {
            return !!i.iteratee(t, this)(this.attributes)
        },
        set: function (t, e, n) {
            if (null == t)return this;
            var s;
            if ("object" == typeof t ? (s = t, n = e) : (s = {})[t] = e, n || (n = {}), !this._validate(s, n))return !1;
            var r = n.unset, a = n.silent, o = [], h = this._changing;
            this._changing = !0, h || (this._previousAttributes = i.clone(this.attributes), this.changed = {});
            var u = this.attributes, c = this.changed, l = this._previousAttributes;
            for (var d in s)e = s[d], i.isEqual(u[d], e) || o.push(d), i.isEqual(l[d], e) ? delete c[d] : c[d] = e, r ? delete u[d] : u[d] = e;
            if (this.id = this.get(this.idAttribute), !a) {
                o.length && (this._pending = n);
                for (var f = 0; f < o.length; f++)this.trigger("change:" + o[f], this, u[o[f]], n)
            }
            if (h)return this;
            if (!a)for (; this._pending;)n = this._pending, this._pending = !1, this.trigger("change", this, n);
            return this._pending = !1, this._changing = !1, this
        },
        unset: function (t, e) {
            return this.set(t, void 0, i.extend({}, e, {unset: !0}))
        },
        clear: function (t) {
            var e = {};
            for (var n in this.attributes)e[n] = void 0;
            return this.set(e, i.extend({}, t, {unset: !0}))
        },
        hasChanged: function (t) {
            return null == t ? !i.isEmpty(this.changed) : i.has(this.changed, t)
        },
        changedAttributes: function (t) {
            if (!t)return this.hasChanged() ? i.clone(this.changed) : !1;
            var e = this._changing ? this._previousAttributes : this.attributes, n = {};
            for (var s in t) {
                var r = t[s];
                i.isEqual(e[s], r) || (n[s] = r)
            }
            return i.size(n) ? n : !1
        },
        previous: function (t) {
            return null != t && this._previousAttributes ? this._previousAttributes[t] : null
        },
        previousAttributes: function () {
            return i.clone(this._previousAttributes)
        },
        fetch: function (t) {
            t = i.extend({parse: !0}, t);
            var e = this, n = t.success;
            return t.success = function (i) {
                var s = t.parse ? e.parse(i, t) : i;
                return e.set(s, t) ? (n && n.call(t.context, e, i, t), void e.trigger("sync", e, i, t)) : !1
            }, z(this, t), this.sync("read", this, t)
        },
        save: function (t, e, n) {
            var s;
            null == t || "object" == typeof t ? (s = t, n = e) : (s = {})[t] = e, n = i.extend({
                validate: !0,
                parse: !0
            }, n);
            var r = n.wait;
            if (s && !r) {
                if (!this.set(s, n))return !1
            } else if (!this._validate(s, n))return !1;
            var a = this, o = n.success, h = this.attributes;
            n.success = function (t) {
                a.attributes = h;
                var e = n.parse ? a.parse(t, n) : t;
                return r && (e = i.extend({}, s, e)), e && !a.set(e, n) ? !1 : (o && o.call(n.context, a, t, n), void a.trigger("sync", a, t, n))
            }, z(this, n), s && r && (this.attributes = i.extend({}, h, s));
            var u = this.isNew() ? "create" : n.patch ? "patch" : "update";
            "patch" !== u || n.attrs || (n.attrs = s);
            var c = this.sync(u, this, n);
            return this.attributes = h, c
        },
        destroy: function (t) {
            t = t ? i.clone(t) : {};
            var e = this, n = t.success, s = t.wait, r = function () {
                e.stopListening(), e.trigger("destroy", e, e.collection, t)
            };
            t.success = function (i) {
                s && r(), n && n.call(t.context, e, i, t), e.isNew() || e.trigger("sync", e, i, t)
            };
            var a = !1;
            return this.isNew() ? i.defer(t.success) : (z(this, t), a = this.sync("delete", this, t)), s || r(), a
        },
        url: function () {
            var t = i.result(this, "urlRoot") || i.result(this.collection, "url") || F();
            if (this.isNew())return t;
            var e = this.get(this.idAttribute);
            return t.replace(/[^\/]$/, "$&/") + encodeURIComponent(e)
        },
        parse: function (t) {
            return t
        },
        clone: function () {
            return new this.constructor(this.attributes)
        },
        isNew: function () {
            return !this.has(this.idAttribute)
        },
        isValid: function (t) {
            return this._validate({}, i.defaults({validate: !0}, t))
        },
        _validate: function (t, e) {
            if (!e.validate || !this.validate)return !0;
            t = i.extend({}, this.attributes, t);
            var n = this.validationError = this.validate(t, e) || null;
            return n ? (this.trigger("invalid", this, n, i.extend(e, {validationError: n})), !1) : !0
        }
    });
    var b = {keys: 1, values: 1, pairs: 1, invert: 1, pick: 0, omit: 0, chain: 1, isEmpty: 1};
    o(y, b, "attributes");
    var x = e.Collection = function (t, e) {
        e || (e = {}), e.model && (this.model = e.model), void 0 !== e.comparator && (this.comparator = e.comparator), this._reset(), this.initialize.apply(this, arguments), t && this.reset(t, i.extend({silent: !0}, e))
    }, w = {add: !0, remove: !0, merge: !0}, E = {add: !0, remove: !1}, k = function (t, e, i) {
        i = Math.min(Math.max(i, 0), t.length);
        for (var n = Array(t.length - i), s = e.length, r = 0; r < n.length; r++)n[r] = t[r + i];
        for (r = 0; s > r; r++)t[r + i] = e[r];
        for (r = 0; r < n.length; r++)t[r + s + i] = n[r]
    };
    i.extend(x.prototype, c, {
        model: y, initialize: function () {
        }, toJSON: function (t) {
            return this.map(function (e) {
                return e.toJSON(t)
            })
        }, sync: function () {
            return e.sync.apply(this, arguments)
        }, add: function (t, e) {
            return this.set(t, i.extend({merge: !1}, e, E))
        }, remove: function (t, e) {
            e = i.extend({}, e);
            var n = !i.isArray(t);
            t = n ? [t] : i.clone(t);
            var s = this._removeModels(t, e);
            return !e.silent && s && this.trigger("update", this, e), n ? s[0] : s
        }, set: function (t, e) {
            if (null != t) {
                e = i.defaults({}, e, w), e.parse && !this._isModel(t) && (t = this.parse(t, e));
                var n = !i.isArray(t);
                t = n ? [t] : t.slice();
                var s = e.at;
                null != s && (s = +s), 0 > s && (s += this.length + 1);
                for (var r, a = [], o = [], h = [], u = {}, c = e.add, l = e.merge, d = e.remove, f = !1,
                         g = this.comparator && null == s && e.sort !== !1,
                         v = i.isString(this.comparator) ? this.comparator : null, p = 0; p < t.length; p++) {
                    r = t[p];
                    var m = this.get(r);
                    if (m) {
                        if (l && r !== m) {
                            var _ = this._isModel(r) ? r.attributes : r;
                            e.parse && (_ = m.parse(_, e)), m.set(_, e), g && !f && (f = m.hasChanged(v))
                        }
                        u[m.cid] || (u[m.cid] = !0, a.push(m)), t[p] = m
                    } else c && (r = t[p] = this._prepareModel(r, e), r && (o.push(r), this._addReference(r, e), u[r.cid] = !0, a.push(r)))
                }
                if (d) {
                    for (p = 0; p < this.length; p++)r = this.models[p], u[r.cid] || h.push(r);
                    h.length && this._removeModels(h, e)
                }
                var y = !1, b = !g && c && d;
                if (a.length && b ? (y = this.length != a.length || i.some(this.models, function (t, e) {
                            return t !== a[e]
                        }), this.models.length = 0, k(this.models, a, 0), this.length = this.models.length) : o.length && (g && (f = !0), k(this.models, o, null == s ? this.length : s), this.length = this.models.length), f && this.sort({silent: !0}), !e.silent) {
                    for (p = 0; p < o.length; p++)null != s && (e.index = s + p), r = o[p], r.trigger("add", r, this, e);
                    (f || y) && this.trigger("sort", this, e), (o.length || h.length) && this.trigger("update", this, e)
                }
                return n ? t[0] : t
            }
        }, reset: function (t, e) {
            e = e ? i.clone(e) : {};
            for (var n = 0; n < this.models.length; n++)this._removeReference(this.models[n], e);
            return e.previousModels = this.models, this._reset(), t = this.add(t, i.extend({silent: !0}, e)), e.silent || this.trigger("reset", this, e), t
        }, push: function (t, e) {
            return this.add(t, i.extend({at: this.length}, e))
        }, pop: function (t) {
            var e = this.at(this.length - 1);
            return this.remove(e, t)
        }, unshift: function (t, e) {
            return this.add(t, i.extend({at: 0}, e))
        }, shift: function (t) {
            var e = this.at(0);
            return this.remove(e, t)
        }, slice: function () {
            return r.apply(this.models, arguments)
        }, get: function (t) {
            if (null == t)return void 0;
            var e = this.modelId(this._isModel(t) ? t.attributes : t);
            return this._byId[t] || this._byId[e] || this._byId[t.cid]
        }, at: function (t) {
            return 0 > t && (t += this.length), this.models[t]
        }, where: function (t, e) {
            return this[e ? "find" : "filter"](t)
        }, findWhere: function (t) {
            return this.where(t, !0)
        }, sort: function (t) {
            var e = this.comparator;
            if (!e)throw new Error("Cannot sort a set without a comparator");
            t || (t = {});
            var n = e.length;
            return i.isFunction(e) && (e = i.bind(e, this)), 1 === n || i.isString(e) ? this.models = this.sortBy(e) : this.models.sort(e), t.silent || this.trigger("sort", this, t), this
        }, pluck: function (t) {
            return i.invoke(this.models, "get", t)
        }, fetch: function (t) {
            t = i.extend({parse: !0}, t);
            var e = t.success, n = this;
            return t.success = function (i) {
                var s = t.reset ? "reset" : "set";
                n[s](i, t), e && e.call(t.context, n, i, t), n.trigger("sync", n, i, t)
            }, z(this, t), this.sync("read", this, t)
        }, create: function (t, e) {
            e = e ? i.clone(e) : {};
            var n = e.wait;
            if (t = this._prepareModel(t, e), !t)return !1;
            n || this.add(t, e);
            var s = this, r = e.success;
            return e.success = function (t, e, i) {
                n && s.add(t, i), r && r.call(i.context, t, e, i)
            }, t.save(null, e), t
        }, parse: function (t) {
            return t
        }, clone: function () {
            return new this.constructor(this.models, {model: this.model, comparator: this.comparator})
        }, modelId: function (t) {
            return t[this.model.prototype.idAttribute || "id"]
        }, _reset: function () {
            this.length = 0, this.models = [], this._byId = {}
        }, _prepareModel: function (t, e) {
            if (this._isModel(t))return t.collection || (t.collection = this), t;
            e = e ? i.clone(e) : {}, e.collection = this;
            var n = new this.model(t, e);
            return n.validationError ? (this.trigger("invalid", this, n.validationError, e), !1) : n
        }, _removeModels: function (t, e) {
            for (var i = [], n = 0; n < t.length; n++) {
                var s = this.get(t[n]);
                if (s) {
                    var r = this.indexOf(s);
                    this.models.splice(r, 1), this.length--, e.silent || (e.index = r, s.trigger("remove", s, this, e)), i.push(s), this._removeReference(s, e)
                }
            }
            return i.length ? i : !1
        }, _isModel: function (t) {
            return t instanceof y
        }, _addReference: function (t) {
            this._byId[t.cid] = t;
            var e = this.modelId(t.attributes);
            null != e && (this._byId[e] = t), t.on("all", this._onModelEvent, this)
        }, _removeReference: function (t) {
            delete this._byId[t.cid];
            var e = this.modelId(t.attributes);
            null != e && delete this._byId[e], this === t.collection && delete t.collection, t.off("all", this._onModelEvent, this)
        }, _onModelEvent: function (t, e, i, n) {
            if ("add" !== t && "remove" !== t || i === this) {
                if ("destroy" === t && this.remove(e, n), "change" === t) {
                    var s = this.modelId(e.previousAttributes()), r = this.modelId(e.attributes);
                    s !== r && (null != s && delete this._byId[s], null != r && (this._byId[r] = e))
                }
                this.trigger.apply(this, arguments)
            }
        }
    });
    var S = {
        forEach: 3,
        each: 3,
        map: 3,
        collect: 3,
        reduce: 4,
        foldl: 4,
        inject: 4,
        reduceRight: 4,
        foldr: 4,
        find: 3,
        detect: 3,
        filter: 3,
        select: 3,
        reject: 3,
        every: 3,
        all: 3,
        some: 3,
        any: 3,
        include: 3,
        includes: 3,
        contains: 3,
        invoke: 0,
        max: 3,
        min: 3,
        toArray: 1,
        size: 1,
        first: 3,
        head: 3,
        take: 3,
        initial: 3,
        rest: 3,
        tail: 3,
        drop: 3,
        last: 3,
        without: 0,
        difference: 0,
        indexOf: 3,
        shuffle: 1,
        lastIndexOf: 3,
        isEmpty: 1,
        chain: 1,
        sample: 3,
        partition: 3,
        groupBy: 3,
        countBy: 3,
        sortBy: 3,
        indexBy: 3
    };
    o(x, S, "models");
    var I = e.View = function (t) {
        this.cid = i.uniqueId("view"), i.extend(this, i.pick(t, P)), this._ensureElement(), this.initialize.apply(this, arguments)
    }, T = /^(\S+)\s*(.*)$/, P = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    i.extend(I.prototype, c, {
        tagName: "div", $: function (t) {
            return this.$el.find(t)
        }, initialize: function () {
        }, render: function () {
            return this
        }, remove: function () {
            return this._removeElement(), this.stopListening(), this
        }, _removeElement: function () {
            this.$el.remove()
        }, setElement: function (t) {
            return this.undelegateEvents(), this._setElement(t), this.delegateEvents(), this
        }, _setElement: function (t) {
            this.$el = t instanceof e.$ ? t : e.$(t), this.el = this.$el[0]
        }, delegateEvents: function (t) {
            if (t || (t = i.result(this, "events")), !t)return this;
            this.undelegateEvents();
            for (var e in t) {
                var n = t[e];
                if (i.isFunction(n) || (n = this[n]), n) {
                    var s = e.match(T);
                    this.delegate(s[1], s[2], i.bind(n, this))
                }
            }
            return this
        }, delegate: function (t, e, i) {
            return this.$el.on(t + ".delegateEvents" + this.cid, e, i), this
        }, undelegateEvents: function () {
            return this.$el && this.$el.off(".delegateEvents" + this.cid), this
        }, undelegate: function (t, e, i) {
            return this.$el.off(t + ".delegateEvents" + this.cid, e, i), this
        }, _createElement: function (t) {
            return document.createElement(t)
        }, _ensureElement: function () {
            if (this.el) this.setElement(i.result(this, "el")); else {
                var t = i.extend({}, i.result(this, "attributes"));
                this.id && (t.id = i.result(this, "id")), this.className && (t["class"] = i.result(this, "className")), this.setElement(this._createElement(i.result(this, "tagName"))), this._setAttributes(t)
            }
        }, _setAttributes: function (t) {
            this.$el.attr(t)
        }
    }), e.sync = function (t, n, s) {
        var r = H[t];
        i.defaults(s || (s = {}), {emulateHTTP: e.emulateHTTP, emulateJSON: e.emulateJSON});
        var a = {type: r, dataType: "json"};
        if (s.url || (a.url = i.result(n, "url") || F()), null != s.data || !n || "create" !== t && "update" !== t && "patch" !== t || (a.contentType = "application/json", a.data = JSON.stringify(s.attrs || n.toJSON(s))), s.emulateJSON && (a.contentType = "application/x-www-form-urlencoded", a.data = a.data ? {model: a.data} : {}), s.emulateHTTP && ("PUT" === r || "DELETE" === r || "PATCH" === r)) {
            a.type = "POST", s.emulateJSON && (a.data._method = r);
            var o = s.beforeSend;
            s.beforeSend = function (t) {
                return t.setRequestHeader("X-HTTP-Method-Override", r), o ? o.apply(this, arguments) : void 0
            }
        }
        "GET" === a.type || s.emulateJSON || (a.processData = !1);
        var h = s.error;
        s.error = function (t, e, i) {
            s.textStatus = e, s.errorThrown = i, h && h.call(s.context, t, e, i)
        };
        var u = s.xhr = e.ajax(i.extend(a, s));
        return n.trigger("request", n, u, s), u
    };
    var H = {create: "POST", update: "PUT", patch: "PATCH", "delete": "DELETE", read: "GET"};
    e.ajax = function () {
        return e.$.ajax.apply(e.$, arguments)
    };
    var $ = e.Router = function (t) {
        t || (t = {}), t.routes && (this.routes = t.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
    }, A = /\((.*?)\)/g, C = /(\(\?)?:\w+/g, R = /\*\w+/g, j = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    i.extend($.prototype, c, {
        initialize: function () {
        }, route: function (t, n, s) {
            i.isRegExp(t) || (t = this._routeToRegExp(t)), i.isFunction(n) && (s = n, n = ""), s || (s = this[n]);
            var r = this;
            return e.history.route(t, function (i) {
                var a = r._extractParameters(t, i);
                r.execute(s, a, n) !== !1 && (r.trigger.apply(r, ["route:" + n].concat(a)), r.trigger("route", n, a), e.history.trigger("route", r, n, a))
            }), this
        }, execute: function (t, e) {
            t && t.apply(this, e)
        }, navigate: function (t, i) {
            return e.history.navigate(t, i), this
        }, _bindRoutes: function () {
            if (this.routes) {
                this.routes = i.result(this, "routes");
                for (var t, e = i.keys(this.routes); null != (t = e.pop());)this.route(t, this.routes[t])
            }
        }, _routeToRegExp: function (t) {
            return t = t.replace(j, "\\$&").replace(A, "(?:$1)?").replace(C, function (t, e) {
                return e ? t : "([^/?]+)"
            }).replace(R, "([^?]*?)"), new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$")
        }, _extractParameters: function (t, e) {
            var n = t.exec(e).slice(1);
            return i.map(n, function (t, e) {
                return e === n.length - 1 ? t || null : t ? decodeURIComponent(t) : null
            })
        }
    });
    var M = e.History = function () {
        this.handlers = [], this.checkUrl = i.bind(this.checkUrl, this), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
    }, N = /^[#\/]|\s+$/g, O = /^\/+|\/+$/g, U = /#.*$/;
    M.started = !1, i.extend(M.prototype, c, {
        interval: 50, atRoot: function () {
            var t = this.location.pathname.replace(/[^\/]$/, "$&/");
            return t === this.root && !this.getSearch()
        }, matchRoot: function () {
            var t = this.decodeFragment(this.location.pathname), e = t.slice(0, this.root.length - 1) + "/";
            return e === this.root
        }, decodeFragment: function (t) {
            return decodeURI(t.replace(/%25/g, "%2525"))
        }, getSearch: function () {
            var t = this.location.href.replace(/#.*/, "").match(/\?.+/);
            return t ? t[0] : ""
        }, getHash: function (t) {
            var e = (t || this).location.href.match(/#(.*)$/);
            return e ? e[1] : ""
        }, getPath: function () {
            var t = this.decodeFragment(this.location.pathname + this.getSearch()).slice(this.root.length - 1);
            return "/" === t.charAt(0) ? t.slice(1) : t
        }, getFragment: function (t) {
            return null == t && (t = this._usePushState || !this._wantsHashChange ? this.getPath() : this.getHash()), t.replace(N, "")
        }, start: function (t) {
            if (M.started)throw new Error("Backbone.history has already been started");
            if (M.started = !0, this.options = i.extend({root: "/"}, this.options, t), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._hasHashChange = "onhashchange" in window && (void 0 === document.documentMode || document.documentMode > 7), this._useHashChange = this._wantsHashChange && this._hasHashChange, this._wantsPushState = !!this.options.pushState, this._hasPushState = !(!this.history || !this.history.pushState), this._usePushState = this._wantsPushState && this._hasPushState, this.fragment = this.getFragment(), this.root = ("/" + this.root + "/").replace(O, "/"), this._wantsHashChange && this._wantsPushState) {
                if (!this._hasPushState && !this.atRoot()) {
                    var e = this.root.slice(0, -1) || "/";
                    return this.location.replace(e + "#" + this.getPath()), !0
                }
                this._hasPushState && this.atRoot() && this.navigate(this.getHash(), {replace: !0})
            }
            if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
                this.iframe = document.createElement("iframe"), this.iframe.src = "javascript:0", this.iframe.style.display = "none", this.iframe.tabIndex = -1;
                var n = document.body, s = n.insertBefore(this.iframe, n.firstChild).contentWindow;
                s.document.open(), s.document.close(), s.location.hash = "#" + this.fragment
            }
            var r = window.addEventListener || function (t, e) {
                    return attachEvent("on" + t, e)
                };
            return this._usePushState ? r("popstate", this.checkUrl, !1) : this._useHashChange && !this.iframe ? r("hashchange", this.checkUrl, !1) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.options.silent ? void 0 : this.loadUrl()
        }, stop: function () {
            var t = window.removeEventListener || function (t, e) {
                    return detachEvent("on" + t, e)
                };
            this._usePushState ? t("popstate", this.checkUrl, !1) : this._useHashChange && !this.iframe && t("hashchange", this.checkUrl, !1), this.iframe && (document.body.removeChild(this.iframe), this.iframe = null), this._checkUrlInterval && clearInterval(this._checkUrlInterval), M.started = !1
        }, route: function (t, e) {
            this.handlers.unshift({route: t, callback: e})
        }, checkUrl: function () {
            var t = this.getFragment();
            return t === this.fragment && this.iframe && (t = this.getHash(this.iframe.contentWindow)), t === this.fragment ? !1 : (this.iframe && this.navigate(t), void this.loadUrl())
        }, loadUrl: function (t) {
            return this.matchRoot() ? (t = this.fragment = this.getFragment(t), i.some(this.handlers, function (e) {
                return e.route.test(t) ? (e.callback(t), !0) : void 0
            })) : !1
        }, navigate: function (t, e) {
            if (!M.started)return !1;
            e && e !== !0 || (e = {trigger: !!e}), t = this.getFragment(t || "");
            var i = this.root;
            ("" === t || "?" === t.charAt(0)) && (i = i.slice(0, -1) || "/");
            var n = i + t;
            if (t = this.decodeFragment(t.replace(U, "")), this.fragment !== t) {
                if (this.fragment = t, this._usePushState) this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, n); else {
                    if (!this._wantsHashChange)return this.location.assign(n);
                    if (this._updateHash(this.location, t, e.replace), this.iframe && t !== this.getHash(this.iframe.contentWindow)) {
                        var s = this.iframe.contentWindow;
                        e.replace || (s.document.open(), s.document.close()), this._updateHash(s.location, t, e.replace)
                    }
                }
                return e.trigger ? this.loadUrl(t) : void 0
            }
        }, _updateHash: function (t, e, i) {
            if (i) {
                var n = t.href.replace(/(javascript:|#).*$/, "");
                t.replace(n + "#" + e)
            } else t.hash = "#" + e
        }
    }), e.history = new M;
    var q = function (t, e) {
        var n, s = this;
        n = t && i.has(t, "constructor") ? t.constructor : function () {
            return s.apply(this, arguments)
        }, i.extend(n, s, e);
        var r = function () {
            this.constructor = n
        };
        return r.prototype = s.prototype, n.prototype = new r, t && i.extend(n.prototype, t), n.__super__ = s.prototype, n
    };
    y.extend = x.extend = $.extend = I.extend = M.extend = q;
    var F = function () {
        throw new Error('A "url" property or function must be specified')
    }, z = function (t, e) {
        var i = e.error;
        e.error = function (n) {
            i && i.call(e.context, t, n, e), t.trigger("error", t, n, e)
        }
    };
    return e
});
;/*!/static/lib/iscroll.js*/
!function (o, t) {
    function e(o) {
        return "" === n ? o : (o = o.charAt(0).toUpperCase() + o.substr(1), n + o)
    }

    var r = Math, l = t.createElement("div").style, n = function () {
            for (var o, t = "t,webkitT,MozT,msT,OT".split(","), e = 0,
                     r = t.length; r > e; e++)if (o = t[e] + "ransform", o in l)return t[e].substr(0, t[e].length - 1);
            return !1
        }(), s = n ? "-" + n.toLowerCase() + "-" : "", i = e("transform"), a = e("transitionProperty"),
        c = e("transitionDuration"), p = e("transformOrigin"), m = e("transitionTimingFunction"),
        h = e("transitionDelay"), u = /android/gi.test(navigator.appVersion),
        S = /iphone|ipad/gi.test(navigator.appVersion), d = /hp-tablet/gi.test(navigator.appVersion),
        b = e("perspective") in l, f = "ontouchstart" in o && !d, x = n !== !1, g = e("transition") in l,
        y = "onorientationchange" in o ? "orientationchange" : "resize", v = f ? "touchstart" : "mousedown",
        Y = f ? "touchmove" : "mousemove", T = f ? "touchend" : "mouseup", X = f ? "touchcancel" : "mouseup",
        w = function () {
            if (n === !1)return !1;
            var o = {
                "": "transitionend",
                webkit: "webkitTransitionEnd",
                Moz: "transitionend",
                O: "otransitionend",
                ms: "MSTransitionEnd"
            };
            return o[n]
        }(), _ = function () {
            return o.requestAnimationFrame || o.webkitRequestAnimationFrame || o.mozRequestAnimationFrame || o.oRequestAnimationFrame || o.msRequestAnimationFrame || function (o) {
                    return setTimeout(o, 1)
                }
        }(), z = function () {
            return o.cancelRequestAnimationFrame || o.webkitCancelAnimationFrame || o.webkitCancelRequestAnimationFrame || o.mozCancelRequestAnimationFrame || o.oCancelRequestAnimationFrame || o.msCancelRequestAnimationFrame || clearTimeout
        }(), M = b ? " translateZ(0)" : "", E = function (e, r) {
            var l, n = this;
            n.wrapper = "object" == typeof e ? e : t.getElementById(e), n.wrapper.style.overflow = "hidden", n.scroller = n.wrapper.children[0], n.options = {
                hScroll: !0,
                vScroll: !0,
                x: 0,
                y: 0,
                bounce: !0,
                bounceLock: !1,
                momentum: !0,
                lockDirection: !0,
                useTransform: !0,
                useTransition: !1,
                topOffset: 0,
                checkDOMChanges: !1,
                handleClick: !0,
                hScrollbar: !0,
                vScrollbar: !0,
                fixedScrollbar: u,
                hideScrollbar: S,
                fadeScrollbar: S && b,
                scrollbarClass: "",
                zoom: !1,
                zoomMin: 1,
                zoomMax: 4,
                doubleTapZoom: 2,
                wheelAction: "scroll",
                snap: !1,
                snapThreshold: 1,
                onRefresh: null,
                onBeforeScrollStart: function (o) {
                    o.preventDefault()
                },
                onScrollStart: null,
                onBeforeScrollMove: null,
                onScrollMove: null,
                onBeforeScrollEnd: null,
                onScrollEnd: null,
                onTouchEnd: null,
                onDestroy: null,
                onZoomStart: null,
                onZoom: null,
                onZoomEnd: null
            };
            for (l in r)n.options[l] = r[l];
            n.x = n.options.x, n.y = n.options.y, n.options.useTransform = x && n.options.useTransform, n.options.hScrollbar = n.options.hScroll && n.options.hScrollbar, n.options.vScrollbar = n.options.vScroll && n.options.vScrollbar, n.options.zoom = n.options.useTransform && n.options.zoom, n.options.useTransition = g && n.options.useTransition, n.options.zoom && u && (M = ""), n.scroller.style[a] = n.options.useTransform ? s + "transform" : "top left", n.scroller.style[c] = "0", n.scroller.style[p] = "0 0", n.options.useTransition && (n.scroller.style[m] = "cubic-bezier(0.33,0.66,0.66,1)"), n.options.useTransform ? n.scroller.style[i] = "translate(" + n.x + "px," + n.y + "px)" + M : n.scroller.style.cssText += ";position:absolute;top:" + n.y + "px;left:" + n.x + "px", n.options.useTransition && (n.options.fixedScrollbar = !0), n.refresh(), n._bind(y, o), n._bind(v), f || "none" != n.options.wheelAction && (n._bind("DOMMouseScroll"), n._bind("mousewheel")), n.options.checkDOMChanges && (n.checkDOMTime = setInterval(function () {
                n._checkDOMChanges()
            }, 500))
        };
    E.prototype = {
        enabled: !0,
        x: 0,
        y: 0,
        steps: [],
        scale: 1,
        currPageX: 0,
        currPageY: 0,
        pagesX: [],
        pagesY: [],
        aniTime: null,
        wheelZoomCount: 0,
        handleEvent: function (o) {
            var t = this;
            switch (o.type) {
                case v:
                    if (!f && 0 !== o.button)return;
                    t._start(o);
                    break;
                case Y:
                    t._move(o);
                    break;
                case T:
                case X:
                    t._end(o);
                    break;
                case y:
                    t._resize();
                    break;
                case"DOMMouseScroll":
                case"mousewheel":
                    t._wheel(o);
                    break;
                case w:
                    t._transitionEnd(o)
            }
        },
        _checkDOMChanges: function () {
            this.moved || this.zoomed || this.animating || this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale || this.refresh()
        },
        _scrollbar: function (o) {
            var e, l = this;
            return l[o + "Scrollbar"] ? (l[o + "ScrollbarWrapper"] || (e = t.createElement("div"), l.options.scrollbarClass ? e.className = l.options.scrollbarClass + o.toUpperCase() : e.style.cssText = "position:absolute;z-index:100;" + ("h" == o ? "height:7px;bottom:1px;left:2px;right:" + (l.vScrollbar ? "7" : "2") + "px" : "width:7px;bottom:" + (l.hScrollbar ? "7" : "2") + "px;top:2px;right:1px"), e.style.cssText += ";pointer-events:none;" + s + "transition-property:opacity;" + s + "transition-duration:" + (l.options.fadeScrollbar ? "350ms" : "0") + ";overflow:hidden;opacity:" + (l.options.hideScrollbar ? "0" : "1"), l.wrapper.appendChild(e), l[o + "ScrollbarWrapper"] = e, e = t.createElement("div"), l.options.scrollbarClass || (e.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + s + "background-clip:padding-box;" + s + "box-sizing:border-box;" + ("h" == o ? "height:100%" : "width:100%") + ";" + s + "border-radius:3px;border-radius:3px"), e.style.cssText += ";pointer-events:none;" + s + "transition-property:" + s + "transform;" + s + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + s + "transition-duration:0;" + s + "transform: translate(0,0)" + M, l.options.useTransition && (e.style.cssText += ";" + s + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"), l[o + "ScrollbarWrapper"].appendChild(e), l[o + "ScrollbarIndicator"] = e), "h" == o ? (l.hScrollbarSize = l.hScrollbarWrapper.clientWidth, l.hScrollbarIndicatorSize = r.max(r.round(l.hScrollbarSize * l.hScrollbarSize / l.scrollerW), 8), l.hScrollbarIndicator.style.width = l.hScrollbarIndicatorSize + "px", l.hScrollbarMaxScroll = l.hScrollbarSize - l.hScrollbarIndicatorSize, l.hScrollbarProp = l.hScrollbarMaxScroll / l.maxScrollX) : (l.vScrollbarSize = l.vScrollbarWrapper.clientHeight, l.vScrollbarIndicatorSize = r.max(r.round(l.vScrollbarSize * l.vScrollbarSize / l.scrollerH), 8), l.vScrollbarIndicator.style.height = l.vScrollbarIndicatorSize + "px", l.vScrollbarMaxScroll = l.vScrollbarSize - l.vScrollbarIndicatorSize, l.vScrollbarProp = l.vScrollbarMaxScroll / l.maxScrollY), void l._scrollbarPos(o, !0)) : void(l[o + "ScrollbarWrapper"] && (x && (l[o + "ScrollbarIndicator"].style[i] = ""), l[o + "ScrollbarWrapper"].parentNode.removeChild(l[o + "ScrollbarWrapper"]), l[o + "ScrollbarWrapper"] = null, l[o + "ScrollbarIndicator"] = null))
        },
        _resize: function () {
            var o = this;
            setTimeout(function () {
                o.refresh()
            }, u ? 200 : 0)
        },
        _pos: function (o, t) {
            this.zoomed || (o = this.hScroll ? o : 0, t = this.vScroll ? t : 0, this.options.useTransform ? this.scroller.style[i] = "translate(" + o + "px," + t + "px) scale(" + this.scale + ")" + M : (o = r.round(o), t = r.round(t), this.scroller.style.left = o + "px", this.scroller.style.top = t + "px"), this.x = o, this.y = t, this._scrollbarPos("h"), this._scrollbarPos("v"))
        },
        _scrollbarPos: function (o, t) {
            var e, l = this, n = "h" == o ? l.x : l.y;
            l[o + "Scrollbar"] && (n = l[o + "ScrollbarProp"] * n, 0 > n ? (l.options.fixedScrollbar || (e = l[o + "ScrollbarIndicatorSize"] + r.round(3 * n), 8 > e && (e = 8), l[o + "ScrollbarIndicator"].style["h" == o ? "width" : "height"] = e + "px"), n = 0) : n > l[o + "ScrollbarMaxScroll"] && (l.options.fixedScrollbar ? n = l[o + "ScrollbarMaxScroll"] : (e = l[o + "ScrollbarIndicatorSize"] - r.round(3 * (n - l[o + "ScrollbarMaxScroll"])), 8 > e && (e = 8), l[o + "ScrollbarIndicator"].style["h" == o ? "width" : "height"] = e + "px", n = l[o + "ScrollbarMaxScroll"] + (l[o + "ScrollbarIndicatorSize"] - e))), l[o + "ScrollbarWrapper"].style[h] = "0", l[o + "ScrollbarWrapper"].style.opacity = t && l.options.hideScrollbar ? "0" : "1", l[o + "ScrollbarIndicator"].style[i] = "translate(" + ("h" == o ? n + "px,0)" : "0," + n + "px)") + M)
        },
        _start: function (t) {
            var e, l, n, s, a, c = this, p = f ? t.touches[0] : t;
            c.enabled && (c.options.onBeforeScrollStart && c.options.onBeforeScrollStart.call(c, t), (c.options.useTransition || c.options.zoom) && c._transitionTime(0), c.moved = !1, c.animating = !1, c.zoomed = !1, c.distX = 0, c.distY = 0, c.absDistX = 0, c.absDistY = 0, c.dirX = 0, c.dirY = 0, c.options.zoom && f && t.touches.length > 1 && (s = r.abs(t.touches[0].pageX - t.touches[1].pageX), a = r.abs(t.touches[0].pageY - t.touches[1].pageY), c.touchesDistStart = r.sqrt(s * s + a * a), c.originX = r.abs(t.touches[0].pageX + t.touches[1].pageX - 2 * c.wrapperOffsetLeft) / 2 - c.x, c.originY = r.abs(t.touches[0].pageY + t.touches[1].pageY - 2 * c.wrapperOffsetTop) / 2 - c.y, c.options.onZoomStart && c.options.onZoomStart.call(c, t)), c.options.momentum && (c.options.useTransform ? (e = getComputedStyle(c.scroller, null)[i].replace(/[^0-9\-.,]/g, "").split(","), l = +(e[12] || e[4]), n = +(e[13] || e[5])) : (l = +getComputedStyle(c.scroller, null).left.replace(/[^0-9-]/g, ""), n = +getComputedStyle(c.scroller, null).top.replace(/[^0-9-]/g, "")), (l != c.x || n != c.y) && (c.options.useTransition ? c._unbind(w) : z(c.aniTime), c.steps = [], c._pos(l, n), c.options.onScrollEnd && c.options.onScrollEnd.call(c))), c.absStartX = c.x, c.absStartY = c.y, c.startX = c.x, c.startY = c.y, c.pointX = p.pageX, c.pointY = p.pageY, c.startTime = t.timeStamp || Date.now(), c.options.onScrollStart && c.options.onScrollStart.call(c, t), c._bind(Y, o), c._bind(T, o), c._bind(X, o))
        },
        _move: function (o) {
            var t, e, l, n = this, s = f ? o.touches[0] : o, a = s.pageX - n.pointX, c = s.pageY - n.pointY,
                p = n.x + a, m = n.y + c, h = o.timeStamp || Date.now();
            return n.options.onBeforeScrollMove && n.options.onBeforeScrollMove.call(n, o), n.options.zoom && f && o.touches.length > 1 ? (t = r.abs(o.touches[0].pageX - o.touches[1].pageX), e = r.abs(o.touches[0].pageY - o.touches[1].pageY), n.touchesDist = r.sqrt(t * t + e * e), n.zoomed = !0, l = 1 / n.touchesDistStart * n.touchesDist * this.scale, l < n.options.zoomMin ? l = .5 * n.options.zoomMin * Math.pow(2, l / n.options.zoomMin) : l > n.options.zoomMax && (l = 2 * n.options.zoomMax * Math.pow(.5, n.options.zoomMax / l)), n.lastScale = l / this.scale, p = this.originX - this.originX * n.lastScale + this.x, m = this.originY - this.originY * n.lastScale + this.y, this.scroller.style[i] = "translate(" + p + "px," + m + "px) scale(" + l + ")" + M, void(n.options.onZoom && n.options.onZoom.call(n, o))) : (n.pointX = s.pageX, n.pointY = s.pageY, (p > 0 || p < n.maxScrollX) && (p = n.options.bounce ? n.x + a / 2 : p >= 0 || n.maxScrollX >= 0 ? 0 : n.maxScrollX), (m > n.minScrollY || m < n.maxScrollY) && (m = n.options.bounce ? n.y + c / 2 : m >= n.minScrollY || n.maxScrollY >= 0 ? n.minScrollY : n.maxScrollY), n.distX += a, n.distY += c, n.absDistX = r.abs(n.distX), n.absDistY = r.abs(n.distY), void(n.absDistX < 6 && n.absDistY < 6 || (n.options.lockDirection && (n.absDistX > n.absDistY + 5 ? (m = n.y, c = 0) : n.absDistY > n.absDistX + 5 && (p = n.x, a = 0)), n.moved = !0, n._pos(p, m), n.dirX = a > 0 ? -1 : 0 > a ? 1 : 0, n.dirY = c > 0 ? -1 : 0 > c ? 1 : 0, h - n.startTime > 300 && (n.startTime = h, n.startX = n.x, n.startY = n.y), n.options.onScrollMove && n.options.onScrollMove.call(n, o))))
        },
        _end: function (e) {
            if (!f || 0 === e.touches.length) {
                var l, n, s, a, p, m, h, u = this, S = f ? e.changedTouches[0] : e, d = {dist: 0, time: 0},
                    b = {dist: 0, time: 0}, x = (e.timeStamp || Date.now()) - u.startTime, g = u.x, y = u.y;
                if (u._unbind(Y, o), u._unbind(T, o), u._unbind(X, o), u.options.onBeforeScrollEnd && u.options.onBeforeScrollEnd.call(u, e), u.zoomed)return h = u.scale * u.lastScale, h = Math.max(u.options.zoomMin, h), h = Math.min(u.options.zoomMax, h), u.lastScale = h / u.scale, u.scale = h, u.x = u.originX - u.originX * u.lastScale + u.x, u.y = u.originY - u.originY * u.lastScale + u.y, u.scroller.style[c] = "200ms", u.scroller.style[i] = "translate(" + u.x + "px," + u.y + "px) scale(" + u.scale + ")" + M, u.zoomed = !1, u.refresh(), void(u.options.onZoomEnd && u.options.onZoomEnd.call(u, e));
                if (!u.moved)return f && (u.doubleTapTimer && u.options.zoom ? (clearTimeout(u.doubleTapTimer), u.doubleTapTimer = null, u.options.onZoomStart && u.options.onZoomStart.call(u, e), u.zoom(u.pointX, u.pointY, 1 == u.scale ? u.options.doubleTapZoom : 1), u.options.onZoomEnd && setTimeout(function () {
                    u.options.onZoomEnd.call(u, e)
                }, 200)) : this.options.handleClick && (u.doubleTapTimer = setTimeout(function () {
                        for (u.doubleTapTimer = null, l = S.target; 1 != l.nodeType;)l = l.parentNode;
                        "SELECT" != l.tagName && "INPUT" != l.tagName && "TEXTAREA" != l.tagName && (n = t.createEvent("MouseEvents"), n.initMouseEvent("click", !0, !0, e.view, 1, S.screenX, S.screenY, S.clientX, S.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null), n._fake = !0, l.dispatchEvent(n))
                    }, u.options.zoom ? 250 : 0))), u._resetPos(400), void(u.options.onTouchEnd && u.options.onTouchEnd.call(u, e));
                if (300 > x && u.options.momentum && (d = g ? u._momentum(g - u.startX, x, -u.x, u.scrollerW - u.wrapperW + u.x, u.options.bounce ? u.wrapperW : 0) : d, b = y ? u._momentum(y - u.startY, x, -u.y, u.maxScrollY < 0 ? u.scrollerH - u.wrapperH + u.y - u.minScrollY : 0, u.options.bounce ? u.wrapperH : 0) : b, g = u.x + d.dist, y = u.y + b.dist, (u.x > 0 && g > 0 || u.x < u.maxScrollX && g < u.maxScrollX) && (d = {
                        dist: 0,
                        time: 0
                    }), (u.y > u.minScrollY && y > u.minScrollY || u.y < u.maxScrollY && y < u.maxScrollY) && (b = {
                        dist: 0,
                        time: 0
                    })), d.dist || b.dist)return p = r.max(r.max(d.time, b.time), 10), u.options.snap && (s = g - u.absStartX, a = y - u.absStartY, r.abs(s) < u.options.snapThreshold && r.abs(a) < u.options.snapThreshold ? u.scrollTo(u.absStartX, u.absStartY, 200) : (m = u._snap(g, y), g = m.x, y = m.y, p = r.max(m.time, p))), u.scrollTo(r.round(g), r.round(y), p), void(u.options.onTouchEnd && u.options.onTouchEnd.call(u, e));
                if (u.options.snap)return s = g - u.absStartX, a = y - u.absStartY, r.abs(s) < u.options.snapThreshold && r.abs(a) < u.options.snapThreshold ? u.scrollTo(u.absStartX, u.absStartY, 200) : (m = u._snap(u.x, u.y), (m.x != u.x || m.y != u.y) && u.scrollTo(m.x, m.y, m.time)), void(u.options.onTouchEnd && u.options.onTouchEnd.call(u, e));
                u._resetPos(200), u.options.onTouchEnd && u.options.onTouchEnd.call(u, e)
            }
        },
        _resetPos: function (o) {
            var t = this, e = t.x >= 0 ? 0 : t.x < t.maxScrollX ? t.maxScrollX : t.x,
                r = t.y >= t.minScrollY || t.maxScrollY > 0 ? t.minScrollY : t.y < t.maxScrollY ? t.maxScrollY : t.y;
            return e == t.x && r == t.y ? (t.moved && (t.moved = !1, t.options.onScrollEnd && t.options.onScrollEnd.call(t)), t.hScrollbar && t.options.hideScrollbar && ("webkit" == n && (t.hScrollbarWrapper.style[h] = "300ms"), t.hScrollbarWrapper.style.opacity = "0"), void(t.vScrollbar && t.options.hideScrollbar && ("webkit" == n && (t.vScrollbarWrapper.style[h] = "300ms"), t.vScrollbarWrapper.style.opacity = "0"))) : void t.scrollTo(e, r, o || 0)
        },
        _wheel: function (o) {
            var t, e, r, l, n, s = this;
            if ("wheelDeltaX" in o) t = o.wheelDeltaX / 12, e = o.wheelDeltaY / 12; else if ("wheelDelta" in o) t = e = o.wheelDelta / 12; else {
                if (!("detail" in o))return;
                t = e = 3 * -o.detail
            }
            return "zoom" == s.options.wheelAction ? (n = s.scale * Math.pow(2, 1 / 3 * (e ? e / Math.abs(e) : 0)), n < s.options.zoomMin && (n = s.options.zoomMin), n > s.options.zoomMax && (n = s.options.zoomMax), void(n != s.scale && (!s.wheelZoomCount && s.options.onZoomStart && s.options.onZoomStart.call(s, o), s.wheelZoomCount++, s.zoom(o.pageX, o.pageY, n, 400), setTimeout(function () {
                s.wheelZoomCount--, !s.wheelZoomCount && s.options.onZoomEnd && s.options.onZoomEnd.call(s, o)
            }, 400)))) : (r = s.x + t, l = s.y + e, r > 0 ? r = 0 : r < s.maxScrollX && (r = s.maxScrollX), l > s.minScrollY ? l = s.minScrollY : l < s.maxScrollY && (l = s.maxScrollY), void(s.maxScrollY < 0 && s.scrollTo(r, l, 0)))
        },
        _transitionEnd: function (o) {
            var t = this;
            o.target == t.scroller && (t._unbind(w), t._startAni())
        },
        _startAni: function () {
            var o, t, e, l = this, n = l.x, s = l.y, i = Date.now();
            if (!l.animating) {
                if (!l.steps.length)return void l._resetPos(400);
                if (o = l.steps.shift(), o.x == n && o.y == s && (o.time = 0), l.animating = !0, l.moved = !0, l.options.useTransition)return l._transitionTime(o.time), l._pos(o.x, o.y), l.animating = !1, void(o.time ? l._bind(w) : l._resetPos(0));
                e = function () {
                    var a, c, p = Date.now();
                    return p >= i + o.time ? (l._pos(o.x, o.y), l.animating = !1, l.options.onAnimationEnd && l.options.onAnimationEnd.call(l), void l._startAni()) : (p = (p - i) / o.time - 1, t = r.sqrt(1 - p * p), a = (o.x - n) * t + n, c = (o.y - s) * t + s, l._pos(a, c), void(l.animating && (l.aniTime = _(e))))
                }, e()
            }
        },
        _transitionTime: function (o) {
            o += "ms", this.scroller.style[c] = o, this.hScrollbar && (this.hScrollbarIndicator.style[c] = o), this.vScrollbar && (this.vScrollbarIndicator.style[c] = o)
        },
        _momentum: function (o, t, e, l, n) {
            var s = 6e-4, i = r.abs(o) / t, a = i * i / (2 * s), c = 0, p = 0;
            return o > 0 && a > e ? (p = n / (6 / (a / i * s)), e += p, i = i * e / a, a = e) : 0 > o && a > l && (p = n / (6 / (a / i * s)), l += p, i = i * l / a, a = l), a *= 0 > o ? -1 : 1, c = i / s, {
                dist: a,
                time: r.round(c)
            }
        },
        _offset: function (o) {
            for (var t = -o.offsetLeft, e = -o.offsetTop; o = o.offsetParent;)t -= o.offsetLeft, e -= o.offsetTop;
            return o != this.wrapper && (t *= this.scale, e *= this.scale), {left: t, top: e}
        },
        _snap: function (o, t) {
            var e, l, n, s, i, a, c = this;
            for (n = c.pagesX.length - 1, e = 0, l = c.pagesX.length; l > e; e++)if (o >= c.pagesX[e]) {
                n = e;
                break
            }
            for (n == c.currPageX && n > 0 && c.dirX < 0 && n--, o = c.pagesX[n], i = r.abs(o - c.pagesX[c.currPageX]), i = i ? r.abs(c.x - o) / i * 500 : 0, c.currPageX = n, n = c.pagesY.length - 1, e = 0; n > e; e++)if (t >= c.pagesY[e]) {
                n = e;
                break
            }
            return n == c.currPageY && n > 0 && c.dirY < 0 && n--, t = c.pagesY[n], a = r.abs(t - c.pagesY[c.currPageY]), a = a ? r.abs(c.y - t) / a * 500 : 0, c.currPageY = n, s = r.round(r.max(i, a)) || 200, {
                x: o,
                y: t,
                time: s
            }
        },
        _bind: function (o, t, e) {
            (t || this.scroller).addEventListener(o, this, !!e)
        },
        _unbind: function (o, t, e) {
            (t || this.scroller).removeEventListener(o, this, !!e)
        },
        destroy: function () {
            var t = this;
            t.scroller.style[i] = "", t.hScrollbar = !1, t.vScrollbar = !1, t._scrollbar("h"), t._scrollbar("v"), t._unbind(y, o), t._unbind(v), t._unbind(Y, o), t._unbind(T, o), t._unbind(X, o), t.options.hasTouch || (t._unbind("DOMMouseScroll"), t._unbind("mousewheel")), t.options.useTransition && t._unbind(w), t.options.checkDOMChanges && clearInterval(t.checkDOMTime), t.options.onDestroy && t.options.onDestroy.call(t)
        },
        refresh: function () {
            var o, t, e, l, n = this, s = 0, i = 0;
            if (n.scale < n.options.zoomMin && (n.scale = n.options.zoomMin), n.wrapperW = n.wrapper.clientWidth || 1, n.wrapperH = n.wrapper.clientHeight || 1, n.minScrollY = -n.options.topOffset || 0, n.scrollerW = r.round(n.scroller.offsetWidth * n.scale), n.scrollerH = r.round((n.scroller.offsetHeight + n.minScrollY) * n.scale), n.maxScrollX = n.wrapperW - n.scrollerW, n.maxScrollY = n.wrapperH - n.scrollerH + n.minScrollY, n.dirX = 0, n.dirY = 0, n.options.onRefresh && n.options.onRefresh.call(n), n.hScroll = n.options.hScroll && n.maxScrollX < 0, n.vScroll = n.options.vScroll && (!n.options.bounceLock && !n.hScroll || n.scrollerH > n.wrapperH), n.hScrollbar = n.hScroll && n.options.hScrollbar, n.vScrollbar = n.vScroll && n.options.vScrollbar && n.scrollerH > n.wrapperH, o = n._offset(n.wrapper), n.wrapperOffsetLeft = -o.left, n.wrapperOffsetTop = -o.top, "string" == typeof n.options.snap)for (n.pagesX = [], n.pagesY = [], l = n.scroller.querySelectorAll(n.options.snap), t = 0, e = l.length; e > t; t++)s = n._offset(l[t]), s.left += n.wrapperOffsetLeft, s.top += n.wrapperOffsetTop, n.pagesX[t] = s.left < n.maxScrollX ? n.maxScrollX : s.left * n.scale, n.pagesY[t] = s.top < n.maxScrollY ? n.maxScrollY : s.top * n.scale; else if (n.options.snap) {
                for (n.pagesX = []; s >= n.maxScrollX;)n.pagesX[i] = s, s -= n.wrapperW, i++;
                for (n.maxScrollX % n.wrapperW && (n.pagesX[n.pagesX.length] = n.maxScrollX - n.pagesX[n.pagesX.length - 1] + n.pagesX[n.pagesX.length - 1]), s = 0, i = 0, n.pagesY = []; s >= n.maxScrollY;)n.pagesY[i] = s, s -= n.wrapperH, i++;
                n.maxScrollY % n.wrapperH && (n.pagesY[n.pagesY.length] = n.maxScrollY - n.pagesY[n.pagesY.length - 1] + n.pagesY[n.pagesY.length - 1])
            }
            n._scrollbar("h"), n._scrollbar("v"), n.zoomed || (n.scroller.style[c] = "0", n._resetPos(400))
        },
        scrollTo: function (o, t, e, r) {
            var l, n, s = this, i = o;
            for (s.stop(), i.length || (i = [{
                x: o,
                y: t,
                time: e,
                relative: r
            }]), l = 0, n = i.length; n > l; l++)i[l].relative && (i[l].x = s.x - i[l].x, i[l].y = s.y - i[l].y), s.steps.push({
                x: i[l].x,
                y: i[l].y,
                time: i[l].time || 0
            });
            s._startAni()
        },
        scrollToElement: function (o, t) {
            var e, l = this;
            o = o.nodeType ? o : l.scroller.querySelector(o), o && (e = l._offset(o), e.left += l.wrapperOffsetLeft, e.top += l.wrapperOffsetTop, e.left = e.left > 0 ? 0 : e.left < l.maxScrollX ? l.maxScrollX : e.left, e.top = e.top > l.minScrollY ? l.minScrollY : e.top < l.maxScrollY ? l.maxScrollY : e.top, t = void 0 === t ? r.max(2 * r.abs(e.left), 2 * r.abs(e.top)) : t, l.scrollTo(e.left, e.top, t))
        },
        scrollToPage: function (o, t, e) {
            var r, l, n = this;
            e = void 0 === e ? 400 : e, n.options.onScrollStart && n.options.onScrollStart.call(n), n.options.snap ? (o = "next" == o ? n.currPageX + 1 : "prev" == o ? n.currPageX - 1 : o, t = "next" == t ? n.currPageY + 1 : "prev" == t ? n.currPageY - 1 : t, o = 0 > o ? 0 : o > n.pagesX.length - 1 ? n.pagesX.length - 1 : o, t = 0 > t ? 0 : t > n.pagesY.length - 1 ? n.pagesY.length - 1 : t, n.currPageX = o, n.currPageY = t, r = n.pagesX[o], l = n.pagesY[t]) : (r = -n.wrapperW * o, l = -n.wrapperH * t, r < n.maxScrollX && (r = n.maxScrollX), l < n.maxScrollY && (l = n.maxScrollY)), n.scrollTo(r, l, e)
        },
        disable: function () {
            this.stop(), this._resetPos(0), this.enabled = !1, this._unbind(Y, o), this._unbind(T, o), this._unbind(X, o)
        },
        enable: function () {
            this.enabled = !0
        },
        stop: function () {
            this.options.useTransition ? this._unbind(w) : z(this.aniTime), this.steps = [], this.moved = !1, this.animating = !1
        },
        zoom: function (o, t, e, r) {
            var l = this, n = e / l.scale;
            l.options.useTransform && (l.zoomed = !0, r = void 0 === r ? 200 : r, o = o - l.wrapperOffsetLeft - l.x, t = t - l.wrapperOffsetTop - l.y, l.x = o - o * n + l.x, l.y = t - t * n + l.y, l.scale = e, l.refresh(), l.x = l.x > 0 ? 0 : l.x < l.maxScrollX ? l.maxScrollX : l.x, l.y = l.y > l.minScrollY ? l.minScrollY : l.y < l.maxScrollY ? l.maxScrollY : l.y, l.scroller.style[c] = r + "ms", l.scroller.style[i] = "translate(" + l.x + "px," + l.y + "px) scale(" + e + ")" + M, l.zoomed = !1)
        },
        isReady: function () {
            return !this.moved && !this.zoomed && !this.animating
        }
    }, l = null, o.iScroll = E, "function" == typeof define && "object" == typeof define.amd && define.amd ? define("static/lib/iscroll", ["require"], function () {
        return E
    }) : "undefined" != typeof module && module.exports ? (module.exports = E, module.exports.iScroll = E) : o.iScroll = E
}(window, document);
;/*!/common/footer/footer.js*/
define("common/footer/footer", ["common/config"], function () {
    return {
        init: function () {
            $(".j-linkPC").on("click", function () {
                $.cookie("mobile_request", "full", {
                    expires: 1,
                    path: "/",
                    domain: "jyall.com"
                }), window.location = "http://www.jyall.com/index.html"
            })
        }
    }
});
;/*!/common/genero/getGeneroTpl.js*/
define("common/genero/getGeneroTpl", ["require"], function () {
    return {generoPop: ["<% var data = obj[0]; %>", '<div class="dialog-gold">', '<div class="gold-info">', '<p class="color-666">é‡‘ç®¡å®¶<span><%= data.empName %></span>å°†ä¸ºæ‚¨æœåŠ¡</p>', '<p class="color-999"><span><%= data.telPrefix %>,<%= data.telSuffix %></span></p>', '<a trackevtid="M_AN_JGJ_Y_0003" class="affirm1 affirm" href="tel:<%= data.telPrefix %>,<%= data.telSuffix %>">æ‹¨æ‰“ç”µè¯</a>', "</div>", '<div class="gold-intro">', '<a href="//m.jyall.com/app/goldHouseKeeper_H5/index.html?isM=yes" class="to-gold-intro">äº†è§£é‡‘ç®¡å®¶</a>', '<a class="close-gold j-getGeneroclose"></a>', "</div>", "</div>"]}
});
;/*!/common/cascadeSelect.js*/
define("common/cascadeSelect", ["static/lib/iscroll"], function () {
    var e = function (e) {
        return this.data = e, this.init(), this
    };
    return e.prototype = {
        init: function () {
            this.paint(), this.getProvince(), console.log(this.data);
            this.evt()
        }, ajax: function (e) {
            $.ajax({
                url: e.url,
                type: e.type,
                cache: !1,
                contentType: e.contentType ? e.contentType : "",
                success: function (t) {
                    e.method(t)
                },
                error: function () {
                }
            })
        }, paint: function () {
            $("body").append('<section id = "cascade_select" class = "cascade-select"><header>æ‰€åœ¨åœ°åŒº<span>+</span></header><div class="select-value" id="select_value"><span style="color: #ff6600" id="p_select">è¯·é€‰æ‹©</span></div><div class="select-scroll" id="select_scroll"><ul id="select_content"></ul></div></section>')
        }, getProvince: function () {
            var e = {
                url: this.data.urlList[0], type: "get", method: function (e) {
                    $("#select_content").html(""), $("#select_content")[0].className = "", $("#select0").remove(), $("#select1").remove();
                    var t = "";
                    e.forEach(function (e, a) {
                        t += "<li class='" + (0 == a ? "" : "") + "' data-val='" + e.id + "," + e.name + "'>" + e.name + "</li>"
                    }), $("#select_content").append(t), $("#select_content").addClass("province")
                }
            };
            this.ajax(e)
        }, evt: function () {
            var e = this;
            $(document.body).on("click", "#cascade_select header span", function () {
                $(".maskLoad").hide(), $("#cascade_select")[0].style.transform = "translate3d(0,2000px,0)", $("#cascade_select")[0].style.webkitTransform = "translate3d(0,2000px,0)", "calculator" == e.data.type && (document.body.style.overflow = ""), $("#mask").css("display", "none")
            }), $(document.body).on("click", ".maskLoad", function () {
                $(".maskLoad").hide(), $(".selectSku").removeClass("showSku"), $("#cascade_select header span").click()
            }), $(document.body).on("click", "#select_content li", function () {
                if ("province" == this.parentNode.className) {
                    var t = {
                        url: e.data.urlList[1] + this.dataset.val.split(",")[0], type: "get", method: function (e) {
                            $("#select_content").html("");
                            var t = "";
                            e.forEach(function (e, a) {
                                t += "<li class='" + (0 == a ? "" : "") + "' data-val='" + e.id + "," + e.name + "'>" + e.name + "</li>"
                            }), $("#select_content").append(t), $("#select_content").removeClass("province"), $("#select_content").addClass("city")
                        }
                    };
                    e.ajax(t), $("#select0").length > 0 && $("#select0").remove(), $("#select_value").prepend("<span class='select-result' id = 'select0' data-val='" + $(this).attr("data-val") + "'>" + this.innerText + "</span>")
                } else $("#select1").length > 0 && $("#select1").remove(), $("#select0").after("<span class='select-result' id = 'select1' data-val='" + $(this).attr("data-val") + "'>" + this.innerText + "</span>"), $("#area").attr("data-province", $("#select0").attr("data-val")), $("#area").attr("data-city", this.dataset.val), $("#area").val($("#select0").attr("data-val").split(",")[1] + this.dataset.val.split(",")[1]), $(".maskLoad").hide(), $("#cascade_select")[0].style.transform = "translate3d(0,2000px,0)", $("#cascade_select")[0].style.webkitTransform = "translate3d(0,2000px,0)", "calculator" == e.data.type && (document.body.style.overflow = ""), $("#mask").css("display", "none")
            }), $(document.body).on("click", "#select0", function () {
                var t = {
                    url: e.data.urlList[0], type: "get", method: function (e) {
                        $("#select_content").html(""), $("#select_content")[0].className = "", $("#select1").remove();
                        var t = "";
                        e.forEach(function (e, a) {
                            t += "<li class='" + (0 == a ? "" : "") + "' data-val='" + e.id + "," + e.name + "'>" + e.name + "</li>"
                        }), $("#select_content").append(t), $("#select_content").addClass("province"), $("#p_select").css("display", "inline")
                    }
                };
                e.ajax(t)
            })
        }
    }, e
});
;/*!/static/tools/fastclick.js*/
!function () {
    "use strict";
    function t(e, o) {
        function i(t, e) {
            return function () {
                return t.apply(e, arguments)
            }
        }

        var r;
        if (o = o || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = o.touchBoundary || 10, this.layer = e, this.tapDelay = o.tapDelay || 200, this.tapTimeout = o.tapTimeout || 700, !t.notNeeded(e)) {
            for (var a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], c = this,
                     s = 0, u = a.length; u > s; s++)c[a[s]] = i(c[a[s]], c);
            n && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function (t, n, o) {
                var i = Node.prototype.removeEventListener;
                "click" === t ? i.call(e, t, n.hijacked || n, o) : i.call(e, t, n, o)
            }, e.addEventListener = function (t, n, o) {
                var i = Node.prototype.addEventListener;
                "click" === t ? i.call(e, t, n.hijacked || (n.hijacked = function (t) {
                        t.propagationStopped || n(t)
                    }), o) : i.call(e, t, n, o)
            }), "function" == typeof e.onclick && (r = e.onclick, e.addEventListener("click", function (t) {
                r(t)
            }, !1), e.onclick = null)
        }
    }

    var e = navigator.userAgent.indexOf("Windows Phone") >= 0, n = navigator.userAgent.indexOf("Android") > 0 && !e,
        o = /iP(ad|hone|od)/.test(navigator.userAgent) && !e, i = o && /OS 4_\d(_\d)?/.test(navigator.userAgent),
        r = o && /OS [6-7]_\d/.test(navigator.userAgent), a = navigator.userAgent.indexOf("BB10") > 0;
    t.prototype.needsClick = function (t) {
        switch (t.nodeName.toLowerCase()) {
            case"button":
            case"select":
            case"textarea":
                if (t.disabled)return !0;
                break;
            case"input":
                if (o && "file" === t.type || t.disabled)return !0;
                break;
            case"label":
            case"iframe":
            case"video":
                return !0
        }
        return /\bneedsclick\b/.test(t.className)
    }, t.prototype.needsFocus = function (t) {
        switch (t.nodeName.toLowerCase()) {
            case"textarea":
                return !0;
            case"select":
                return !n;
            case"input":
                switch (t.type) {
                    case"button":
                    case"checkbox":
                    case"file":
                    case"image":
                    case"radio":
                    case"submit":
                        return !1
                }
                return !t.disabled && !t.readOnly;
            default:
                return /\bneedsfocus\b/.test(t.className)
        }
    }, t.prototype.sendClick = function (t, e) {
        var n, o;
        document.activeElement && document.activeElement !== t && document.activeElement.blur(), o = e.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, t.dispatchEvent(n)
    }, t.prototype.determineEventType = function (t) {
        return n && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
    }, t.prototype.focus = function (t) {
        var e;
        o && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
    }, t.prototype.updateScrollParent = function (t) {
        var e, n;
        if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
            n = t;
            do {
                if (n.scrollHeight > n.offsetHeight) {
                    e = n, t.fastClickScrollParent = n;
                    break
                }
                n = n.parentElement
            } while (n)
        }
        e && (e.fastClickLastScrollTop = e.scrollTop)
    }, t.prototype.getTargetElementFromEventTarget = function (t) {
        return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
    }, t.prototype.onTouchStart = function (t) {
        var e, n, r;
        if (t.targetTouches.length > 1)return !0;
        if (e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0], o) {
            if (r = window.getSelection(), r.rangeCount && !r.isCollapsed)return !0;
            if (!i) {
                if (n.identifier && n.identifier === this.lastTouchIdentifier)return t.preventDefault(), !1;
                this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e)
            }
        }
        return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = n.pageX, this.touchStartY = n.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
    }, t.prototype.touchHasMoved = function (t) {
        var e = t.changedTouches[0], n = this.touchBoundary;
        return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n ? !0 : !1
    }, t.prototype.onTouchMove = function (t) {
        return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
    }, t.prototype.findControl = function (t) {
        return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }, t.prototype.onTouchEnd = function (t) {
        var e, a, c, s, u, l = this.targetElement;
        if (!this.trackingClick)return !0;
        if (t.timeStamp - this.lastClickTime < this.tapDelay)return this.cancelNextClick = !0, !0;
        if (t.timeStamp - this.trackingClickStart > this.tapTimeout)return !0;
        if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, a = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, r && (u = t.changedTouches[0], l = document.elementFromPoint(u.pageX - window.pageXOffset, u.pageY - window.pageYOffset) || l, l.fastClickScrollParent = this.targetElement.fastClickScrollParent), c = l.tagName.toLowerCase(), "label" === c) {
            if (e = this.findControl(l)) {
                if (this.focus(l), n)return !1;
                l = e
            }
        } else if (this.needsFocus(l))return t.timeStamp - a > 100 || o && window.top !== window && "input" === c ? (this.targetElement = null, !1) : (this.focus(l), this.sendClick(l, t), o && "select" === c || (this.targetElement = null, t.preventDefault()), !1);
        return o && !i && (s = l.fastClickScrollParent, s && s.fastClickLastScrollTop !== s.scrollTop) ? !0 : (this.needsClick(l) || (t.preventDefault(), this.sendClick(l, t)), !1)
    }, t.prototype.onTouchCancel = function () {
        this.trackingClick = !1, this.targetElement = null
    }, t.prototype.onMouse = function (t) {
        return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1) : !0 : !0
    }, t.prototype.onClick = function (t) {
        var e;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t), e || (this.targetElement = null), e)
    }, t.prototype.destroy = function () {
        var t = this.layer;
        n && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }, t.notNeeded = function (t) {
        var e, o, i, r;
        if ("undefined" == typeof window.ontouchstart)return !0;
        if (o = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
            if (!n)return !0;
            if (e = document.querySelector("meta[name=viewport]")) {
                if (-1 !== e.content.indexOf("user-scalable=no"))return !0;
                if (o > 31 && document.documentElement.scrollWidth <= window.outerWidth)return !0
            }
        }
        if (a && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), i[1] >= 10 && i[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
            if (-1 !== e.content.indexOf("user-scalable=no"))return !0;
            if (document.documentElement.scrollWidth <= window.outerWidth)return !0
        }
        return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction ? !0 : (r = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], r >= 27 && (e = document.querySelector("meta[name=viewport]"), e && (-1 !== e.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === t.style.touchAction || "manipulation" === t.style.touchAction ? !0 : !1)
    }, t.attach = function (e, n) {
        return new t(e, n)
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define("static/tools/fastclick", ["require"], function () {
        return t
    }) : "undefined" != typeof module && module.exports ? (module.exports = t.attach, module.exports.FastClick = t) : window.FastClick = t
}();
;/*!/common/getGenero.js*/
define("common/getGenero", ["common/config", "static/lib/backbone", "common/genero/getGeneroTpl", "static/tools/fastclick"], function (t, e, o, n) {
    var i = e.Model.extend({}),
        s = e.Collection.extend({model: i, url: t.confURL.genero.getgeneroUrl + "?address=" + t.cityID});
    console.log("æœ¬åœ°home...");
    var r = e.View.extend({
        el: ".j-getGeneroPop",
        events: {"click .j-getGeneroBtn": "getGeneroFun", "click .j-getGeneroclose": "closeGeneroFun"},
        initialize: function (e) {
            e && e.houseId ? (this.url = t.confURL.genero.secondRentUrl, this.data = {
                housingId: e.houseId,
                houseType: e.second ? "used" : "leased",
                address: t.cityID,
                userId: ""
            }) : (this.url = t.confURL.genero.getgeneroUrl, this.data = {
                address: t.cityID,
                userId: ""
            }), this.setOptions(e), this.popWarpBox = this.options.popWarpBox, this.popOpenBtn = this.options.popOpenBtn, this.collection = this.options.collection, this.template = this.options.template, this.tpl = this.options.tpl, this.FastClick = this.options.FastClick, this.firstRender = !0, this.firstRender && this.collection.fetch({
                url: this.url + "?address=" + this.data.address + "&userId=",
                type: "post",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(this.data),
                reset: !0
            }), this.initElement(), this.initEvent()
        },
        setOptions: function (t) {
            this.options = {
                popWarpBox: ".j-popWarpBox",
                popOpenBtn: ".j-getGeneroBtn",
                collection: new s,
                template: _.template,
                tpl: o,
                FastClick: n
            }, $.extend(!0, this.options, t || {})
        },
        initEvent: function () {
            var t = this;
            this.$popOpenBtn.on("click", function (e) {
                t.getGeneroFun(e)
            }), this.listenTo(this.collection, "reset", this.render), this.listenTo(this.collection, "error", this.error)
        },
        initElement: function () {
            this.$popWarpBox = $(this.popWarpBox), this.$popOpenBtn = $(this.popOpenBtn)
        },
        render: function () {
            var t = this.collection.toJSON();
            console.log(t);
            var e = (this.tpl, this.template(this.tpl.generoPop.join(""))(t));
            this.$popWarpBox.html(e), this.firstRender = !1, this.initElement()
        },
        error: function () {
            try {
                throw"error() request error!!!"
            } catch (t) {
            }
        },
        getGeneroFun: function () {
            this.$el.show(), $("html,body").css("overflow", "hidden")
        },
        closeGeneroFun: function () {
            this.$el.hide(), $("html,body").css("overflow", "")
        }
    });
    return r
});
;/*!/common/gotop/gotop.js*/
define("common/gotop/gotop", ["require"], function () {
    return {
        init: function (o) {
            this.setOptions(o), this.goTop = this.options.goTop, this.initElement(), this.initEvent(), this.isShow()
        }, setOptions: function (o) {
            this.options = {goTop: ".j-goTop"}, $.extend(this.options, o || {})
        }, initElement: function () {
            this.$goTop = $(this.goTop)
        }, initEvent: function () {
            this.$goTop.on("click", "a", $.proxy(this.gotopFun, this)), $(window).bind("scroll", $.proxy(this.isShow, this))
        }, isShow: function () {
            this.$goTop.css(document.body.scrollTop > 200 ? {display: "block"} : {display: "none"})
        }, gotopFun: function (o) {
            $(o.currentTarget).css("cursor", "pointer"), setTimeout(function () {
                window.scroll(0, 0)
            }, 100)
        }
    }
});
;/*!/common/compatibleApp.js*/
define("common/compatibleApp", ["require"], function () {
    var o = function (o, e, t) {
        function n() {
            console.log(o), o && void 0 != s(o) && (s(o).style.display = "none"), e && void 0 != s(e) && (s(e).style.display = "none"), t && void 0 != s(t) && (s(t).style.paddingTop = "0", s(t).style.paddingBottom = "0")
        }

        var i = location.search.substring(1), s = function (o) {
            return document.getElementsByClassName(o)[0]
        };
        "app" == localStorage.source && n(), i && i.split("&").forEach(function (o) {
            if ("source" == o.split("=")[0] && "app" == o.split("=")[1]) {
                var e = o.split("=")[1];
                localStorage.setItem("source", e), n()
            }
        })
    };
    return o
});
;/*!/common/headerNavBar.js*/
require(["common/getGenero"], function () {
}), define("common/headerNavBar", ["common/config", "common/tip", "static/lib/backbone", "static/tools/fastclick"], function (o, t, e, i) {
    var s = {qq: {forbid: 0, lower: 1, higher: 2}, uc: {forbid: 0, allow: 1}}, n = navigator.appVersion,
        h = n.split("MQQBrowser/").length > 1 ? s.qq.higher : s.qq.forbid,
        a = n.split("UCBrowser/").length > 1 ? s.uc.allow : s.uc.forbid;
    return h || a || $(".j-shares").hide(), {
        init: function (t) {
            this.setOptions(t), this.dRoot = this.options.dRoot, this.goBack = this.options.goBack, this.headMenuTools = this.options.headMenuTools, this.headMenuToolsContent = this.options.headMenuToolsContent, this.popMark = this.options.popMark, this.template = this.options.template, this.FastClick = this.options.FastClick, this.initElement(), this.initEvent(), this.showShares();
            var e = o.getQueryString("source");
            e && "app" == e && ($("header").hide(), $("body").css("padding-top", "0px"), localStorage.isSourceApp = 1), localStorage.isSourceApp && 1 == localStorage.isSourceApp && ($("header").hide(), $("body").css("padding-top", "0px"), $("div.main").css("margin-top", "0px"), $(".j-listWarp .list-pag").css("top", "0px"))
        }, setOptions: function (o) {
            this.options = {
                dRoot: ".j-headerNavRoot",
                goBack: ".j-goBack",
                headMenuTools: ".j-headMenuTools",
                headMenuToolsContent: ".j-MenuToolsContent",
                popMark: ".j-markPop",
                template: _.template,
                FastClick: i
            }, $.extend(this.options, o || {})
        }, initElement: function () {
            this.$body = this.body || $("body"), this.$dRoot = this.$dRoot || $(this.dRoot), this.$goBack = $(this.goBack), this.$headMenuToolsContent = this.$headMenuToolsContent || $(this.headMenuToolsContent), this.$popMark = $(this.popMark)
        }, initEvent: function () {
            this.$dRoot.on("click", this.headMenuTools, $.proxy(this.showHeaderbar, this)), "hDetail" != this.options.pageId && this.$dRoot.on("click", this.goBack, $.proxy(this.goBackFun, this)), this.$body.on("click", this.popMark, $.proxy(this.hide, this))
        }, showShares: function () {
            $(".j-shares").on("touchstart", function (o) {
                var e, i = encodeURIComponent(location.href);
                return e = -1 != i.indexOf("decoration.html") ? $("header p").text() + "-ä»Žæ¯›å¯åˆ°ç²¾è£…çš„ä¸€ç«™å¼æœåŠ¡ï¼Œä¸ºæ‚¨æž„å»ºä¸€ä¸ªæ¸©é¦¨çš„å®¶" : -1 != i.indexOf("siren.html") ? $("header p").text() + "-ç§äººå®šåˆ¶ï¼Œé‡èº«æ‰“é€ å±žäºŽæ‚¨çš„ç§äººä¸“å±žè£…ä¿®é£Žæ ¼" : -1 != i.indexOf("detail-zhuang.html") ? $(".dat-name span").text() : -1 != i.indexOf("mofangNew.html") ? $("header p").text() + "-è¶…å€¼æ–½å·¥åŒ…+è‡ªä¸»æ­é…ä¸»æ+ç‰¹æƒ å®¶å…·å®¶ç”µåŒ…=è¶…å€¼å®Œç¾Žå®¶" : "å®¶å›­ç½‘ çœæ—¶ çœé’± çœåŠ›", h || a ? (location.href = "/channel/decoration/share.html?url=" + i + "&title=" + e, void o.stopPropagation()) : void t.toast("è¯·ä½¿ç”¨UCæˆ–è€…QQæµè§ˆå™¨è¿›è¡Œåˆ†äº«,æ‚¨ä¹Ÿå¯ä»¥å¤åˆ¶é“¾æŽ¥è¿›è¡Œåˆ†äº«~")
            })
        }, showHeaderbar: function () {
            this.$headMenuToolsContent.is(":hidden") ? (this.$popMark.show(), this.$headMenuToolsContent.show(), $("html,body").css("overflow", "hidden")) : (this.$popMark.hide(), this.$headMenuToolsContent.hide(), $("html,body").removeAttr("style"))
        }, hide: function () {
            this.$popMark.hide(), this.$headMenuToolsContent.hide(), $("html,body").removeAttr("style")
        }, goBackFun: function () {
            window.history.go(-1)
        }
    }
});
;/*!/static/page/search/searchTpl.js*/
define("static/page/search/searchTpl", ["common/config"], function (a) {
    var s = a.imgUrl;
    return {
        searchKeyList: ['<ul class="sar-list">', "<% var data = obj; %>", "<% for(var i=0 ; i< data.length; i++){ %>", "<li><%=data[i]%></li>", "<% } %>", "</ul>", '<div class="clearAll j-clearSearchKeyWord">æ¸…ç©ºæœ€è¿‘æœç´¢</div>'],
        searchKey: ['<div class="noOrder">è¿˜æ²¡æœ‰æœç´¢è®°å½•ï½ž</div>'],
        listNoVal: ['<div class="noOrder">åœ¨å½“å‰èŒƒå›´å†…æ²¡æ‰¾åˆ°ä½ æƒ³è¦çš„å•†å“,<br>å†è¯•è¯•å…¶ä»–çš„å§~</div>'],
        listProd: ["<% var dataProd = obj; %>", "<% for(var i=0,dataGoods = dataProd; i<dataGoods.length; i++){ %>", '<% var skipId =""; if(dataGoods[i].industryMark == "JIAJU"){ skipId = 15 }else if(dataGoods[i].industryMark == "JIADE"){ skipId = 14 } %>', '<a class="tanm" href="./detail.html?skipId=<%=skipId%>&ItemId=<%=dataGoods[i].id%>">', '<dl class="clearfix">', "<dt>", '<p><span><img src="<%=dataGoods[i].goodsMainPhotoPath%>"></span></p>', "</dt>", "<dd>", '<% var NameVal =""; if(dataGoods[i].goodsName.length>40){ NameVal = dataGoods[i].goodsName.substring(0,40)+"..."}else{ NameVal = dataGoods[i].goodsName} %>', "<p><%=NameVal%></p>", '<p class="price">Â¥ <%=dataGoods[i].goodsCurrentPrice%></p>', "</dd>", "</dl>", "</a>", "<% } %>"],
        listNewHouse: ["<%  var dataVal = obj; %>", '<ul class="house-list">', "<% for(var i=0,dataDatas = dataVal.data; i<dataDatas.length; i++){ %>", "<li>", '<a href="./detail-house.html?houseId=<%=dataDatas[i].houseId%>&type=new_house">', '<div class="hous-img"> <img src="' + s + '<%=dataDatas[i].realImg%>"></div>', '<div class="house-main">', '<p class="name"><%=dataDatas[i].title%></p>', '<p class="discrb"><%=dataDatas[i].position%><span>66-147ãŽ¡</span></p>', '<p class="hous-tab">', "<% for(var j=0,targs=dataDatas[i].tags; j<targs.length; j++){ %>", "<span><%=targs[j].tagName%></span>", "<% } %>", "</p>", '<p class="discout">', '<% if(dataDatas[i].ecCoorperate!=""){ %><span><b>æƒ </b><%=dataDatas[i].ecCoorperate%></span><% } %>', '<% if(dataDatas[i].privilege!=""){ %><span><b>å›¢</b><%=dataDatas[i].privilege%></span><% } %>', "</p>", '<div class="hous-pr">', '<p class="prix"><%=dataDatas[i].averagePrice%><span>å…ƒ/ãŽ¡</span></p>', "</div>", "</div>", , "</a>", "</li>", "<% } %>", "</ul>"],
        listOldHouse: ["<%  var dataVal = obj; %>", '<ul class="house-list">', "<% for(var i=0,dataDatas = dataVal.data; i<dataDatas.length; i++){ %>", "<li>", '<a href="./detail-house.html?houseId=<%=dataDatas[i].houseId%>&type=second_house">', '<div class="hous-img"> <img src="' + s + '<%=dataDatas[i].realImg%>"></div>', '<div class="house-main">', '<p class="name"><%=dataDatas[i].title%></p>', '<p class="discrb"><%=dataDatas[i].room%>å®¤<%=dataDatas[i].hall%>åŽ…ï¼<%=dataDatas[i].area%> ãŽ¡ï¼<%=dataDatas[i].floor%>/<%=dataDatas[i].floorsum%>å±‚</p>', '<p class="add"><%=dataDatas[i].position %></p>', '<p class="hous-tab">', "<% for(var j=0,targs=dataDatas[i].tags; j<targs.length; j++){ %>", "<span><%=targs[j].tagName%></span>", "<% } %>", "</p>", '<div class="hous-pr">', '<p class="prix"><%=dataDatas[i].amounts%>ä¸‡</p>', "<% var averagePrice = parseInt((parseInt(dataDatas[i].amounts)*10000)/(parseInt(dataDatas[i].area))); %>", '<p class="square"><%=averagePrice%>å…ƒï¼å¹³</p>', "</div>", "</div>", "</a>", "</li>", "<% } %>", "</ul>"],
        listRentalHouse: ["<%  var dataVal = obj; %>", '<ul class="house-list">', "<% for(var i=0,dataDatas = dataVal.data; i<dataDatas.length; i++){ %>", "<li>", '<a href="./detail-house.html?houseId=<%=dataDatas[i].houseId%>&type=rent_house">', '<div class="hous-img"> <img src="' + s + '<%=dataDatas[i].realImg%>"></div>', '<div class="house-main">', '<p class="name"><%=dataDatas[i].title%></p>', '<p class="discrb"><%=dataDatas[i].room%>å®¤<%=dataDatas[i].hall%>åŽ…ï¼<%=dataDatas[i].area%> ãŽ¡ï¼<%=dataDatas[i].floor%>/<%=dataDatas[i].floorsum%>å±‚</p>', '<p class="add"><%=dataDatas[i].position %></p>', '<p class="hous-tab">', "<% for(var j=0,targs=dataDatas[i].tags; j<targs.length; j++){ %>", "<span><%=targs[j].tagName%></span>", "<% } %>", "</p>", '<div class="hous-pr">', '<p class="prix"><%=parseInt(dataDatas[i].amounts)%><span>å…ƒ/ãŽ¡</span></p>', "</div>", "</div>", "</a>", "</li>", "<% } %>", "</ul>"]
    }
});
;/*!/common/recentKeyWord.js*/
define("common/recentKeyWord", ["common/config", "static/lib/backbone", "static/page/search/searchTpl", "static/tools/fastclick"], function (t, e, i, s) {
    var n = e.View.extend({
        el: ".j-searchKeyBox",
        events: {"click .j-clearSearchKeyWord": "clearItem"},
        initialize: function (t) {
            this.setOptions(t), this.localName = this.options.localName, this.localValue = this.getItem(this.localName), this.recentKeyList = this.options.recentKeyList, this.recentKeyNoList = this.options.recentKeyNoList, this.searchInput = this.options.searchInput, this.template = this.options.template, this.tpl = this.options.tpl, this.FastClick = this.options.FastClick, this.initElement(), this.initEvent(), this.render()
        },
        setOptions: function (t) {
            this.options = {
                localName: "JYMSearchData",
                recentKeyList: ".j-searchKeyWord",
                recentKeyNoList: ".j-noSearchKeyWord",
                searchInput: ".j-searchInput",
                template: _.template,
                tpl: i,
                FastClick: s
            }, $.extend(!0, this.options, t || {})
        },
        initEvent: function () {
            this.on("addItem", this.addItem, this), this.on("addItem", this.render), this.listenTo(this.localValue, "reset", this.render), this.listenTo(this.localValue, "error", this.error)
        },
        initElement: function () {
            this.$recentKeyList = $(this.recentKeyList), this.$recentKeyNoList = $(this.recentKeyNoList), this.$searchInput = $(this.searchInput)
        },
        render: function () {
            if (this.localValue) {
                var t = this.toArray(this.localValue), e = this.template(this.tpl.searchKeyList.join(""))(t);
                this.$recentKeyList.html(e), this.$recentKeyList.show(), this.$recentKeyNoList.hide()
            } else this.$recentKeyNoList.show();
            this.initElement()
        },
        toArray: function (t) {
            return "string" == typeof t ? _.uniq(t.match(/[^-]+/g) || []) : []
        },
        getItem: function (t) {
            return localStorage.getItem(t)
        },
        addItem: function (e) {
            var i = this.localName, s = this.toArray(this.getItem(i)), n = $.inArray($.trim(e), s);
            s.splice(n, n > -1 ? 1 : 0), s.unshift(e), s.length > 7 && s.splice(7), e = s.join("-"), t.isLocalStorageNameSupported() && (localStorage.setItem(i, e), this.localValue = this.getItem(this.localName))
        },
        clearItem: function () {
            delete this.localValue, localStorage.removeItem(this.localName), this.$recentKeyList.html("").hide(), this.$recentKeyNoList.show()
        }
    });
    return n
});
;/*!/widget/home/swiper/swiper.js*/
!function () {
    "use strict";
    function e(e) {
        e.fn.swiper = function (a) {
            var r;
            return e(this).each(function () {
                var e = new t(this, a);
                r || (r = e)
            }), r
        }
    }

    var a, t = function (e, i) {
        function s(e) {
            return Math.floor(e)
        }

        function n() {
            b.autoplayTimeoutId = setTimeout(function () {
                b.params.loop ? (b.fixLoop(), b._slideNext(), b.emit("onAutoplay", b)) : b.isEnd ? i.autoplayStopOnLast ? b.stopAutoplay() : (b._slideTo(0), b.emit("onAutoplay", b)) : (b._slideNext(), b.emit("onAutoplay", b))
            }, b.params.autoplay)
        }

        function o(e, t) {
            var r = a(e.target);
            if (!r.is(t))if ("string" == typeof t) r = r.parents(t); else if (t.nodeType) {
                var i;
                return r.parents().each(function (e, a) {
                    a === t && (i = t)
                }), i ? t : void 0
            }
            return 0 !== r.length ? r[0] : void 0
        }

        function l(e, a) {
            a = a || {};
            var t = window.MutationObserver || window.WebkitMutationObserver, r = new t(function (e) {
                e.forEach(function (e) {
                    b.onResize(!0), b.emit("onObserverUpdate", b, e)
                })
            });
            r.observe(e, {
                attributes: "undefined" == typeof a.attributes ? !0 : a.attributes,
                childList: "undefined" == typeof a.childList ? !0 : a.childList,
                characterData: "undefined" == typeof a.characterData ? !0 : a.characterData
            }), b.observers.push(r)
        }

        function p(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = e.keyCode || e.charCode;
            if (!b.params.allowSwipeToNext && (b.isHorizontal() && 39 === a || !b.isHorizontal() && 40 === a))return !1;
            if (!b.params.allowSwipeToPrev && (b.isHorizontal() && 37 === a || !b.isHorizontal() && 38 === a))return !1;
            if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === a || 39 === a || 38 === a || 40 === a) {
                    var t = !1;
                    if (b.container.parents(".swiper-slide").length > 0 && 0 === b.container.parents(".swiper-slide-active").length)return;
                    var r = {left: window.pageXOffset, top: window.pageYOffset}, i = window.innerWidth,
                        s = window.innerHeight, n = b.container.offset();
                    b.rtl && (n.left = n.left - b.container[0].scrollLeft);
                    for (var o = [[n.left, n.top], [n.left + b.width, n.top], [n.left, n.top + b.height], [n.left + b.width, n.top + b.height]],
                             l = 0; l < o.length; l++) {
                        var p = o[l];
                        p[0] >= r.left && p[0] <= r.left + i && p[1] >= r.top && p[1] <= r.top + s && (t = !0)
                    }
                    if (!t)return
                }
                b.isHorizontal() ? ((37 === a || 39 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !b.rtl || 37 === a && b.rtl) && b.slideNext(), (37 === a && !b.rtl || 39 === a && b.rtl) && b.slidePrev()) : ((38 === a || 40 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && b.slideNext(), 38 === a && b.slidePrev())
            }
        }

        function d(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = b.mousewheel.event, t = 0, r = b.rtl ? -1 : 1;
            if ("mousewheel" === a)if (b.params.mousewheelForceToAxis)if (b.isHorizontal()) {
                if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)))return;
                t = e.wheelDeltaX * r
            } else {
                if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX)))return;
                t = e.wheelDeltaY
            } else t = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) ? -e.wheelDeltaX * r : -e.wheelDeltaY; else if ("DOMMouseScroll" === a) t = -e.detail; else if ("wheel" === a)if (b.params.mousewheelForceToAxis)if (b.isHorizontal()) {
                if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY)))return;
                t = -e.deltaX * r
            } else {
                if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX)))return;
                t = -e.deltaY
            } else t = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX * r : -e.deltaY;
            if (0 !== t) {
                if (b.params.mousewheelInvert && (t = -t), b.params.freeMode) {
                    var i = b.getWrapperTranslate() + t * b.params.mousewheelSensitivity, s = b.isBeginning,
                        n = b.isEnd;
                    if (i >= b.minTranslate() && (i = b.minTranslate()), i <= b.maxTranslate() && (i = b.maxTranslate()), b.setWrapperTransition(0), b.setWrapperTranslate(i), b.updateProgress(), b.updateActiveIndex(), (!s && b.isBeginning || !n && b.isEnd) && b.updateClasses(), b.params.freeModeSticky ? (clearTimeout(b.mousewheel.timeout), b.mousewheel.timeout = setTimeout(function () {
                            b.slideReset()
                        }, 300)) : b.params.lazyLoading && b.lazy && b.lazy.load(), 0 === i || i === b.maxTranslate())return
                } else {
                    if ((new window.Date).getTime() - b.mousewheel.lastScrollTime > 60)if (0 > t)if (b.isEnd && !b.params.loop || b.animating) {
                        if (b.params.mousewheelReleaseOnEdges)return !0
                    } else b.slideNext(); else if (b.isBeginning && !b.params.loop || b.animating) {
                        if (b.params.mousewheelReleaseOnEdges)return !0
                    } else b.slidePrev();
                    b.mousewheel.lastScrollTime = (new window.Date).getTime()
                }
                return b.params.autoplay && b.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
            }
        }

        function u(e, t) {
            e = a(e);
            var r, i, s, n = b.rtl ? -1 : 1;
            r = e.attr("data-swiper-parallax") || "0", i = e.attr("data-swiper-parallax-x"), s = e.attr("data-swiper-parallax-y"), i || s ? (i = i || "0", s = s || "0") : b.isHorizontal() ? (i = r, s = "0") : (s = r, i = "0"), i = i.indexOf("%") >= 0 ? parseInt(i, 10) * t * n + "%" : i * t * n + "px", s = s.indexOf("%") >= 0 ? parseInt(s, 10) * t + "%" : s * t + "px", e.transform("translate3d(" + i + ", " + s + ",0px)")
        }

        function c(e) {
            return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
        }

        if (!(this instanceof t))return new t(e, i);
        var m = {
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            autoplay: !1,
            autoplayDisableOnInteraction: !0,
            autoplayStopOnLast: !1,
            iOSEdgeSwipeDetection: !1,
            iOSEdgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            coverflow: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0},
            flip: {slideShadows: !0, limitRotation: !0},
            cube: {slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94},
            fade: {crossFade: !1},
            parallax: !1,
            scrollbar: null,
            scrollbarHide: !0,
            scrollbarDraggable: !1,
            scrollbarSnapOnRelease: !1,
            keyboardControl: !1,
            mousewheelControl: !1,
            mousewheelReleaseOnEdges: !1,
            mousewheelInvert: !1,
            mousewheelForceToAxis: !1,
            mousewheelSensitivity: 1,
            hashnav: !1,
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            onlyExternal: !1,
            threshold: 0,
            touchMoveStopPropagation: !0,
            uniqueNavElements: !0,
            pagination: null,
            paginationElement: "span",
            paginationClickable: !1,
            paginationHide: !1,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: "bullets",
            resistance: !0,
            resistanceRatio: .85,
            nextButton: null,
            prevButton: null,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            lazyLoading: !1,
            lazyLoadingInPrevNext: !1,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            control: void 0,
            controlInverse: !1,
            controlBy: "slide",
            allowSwipeToPrev: !0,
            allowSwipeToNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            slideClass: "swiper-slide",
            slideActiveClass: "swiper-slide-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slidePrevClass: "swiper-slide-prev",
            wrapperClass: "swiper-wrapper",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            buttonDisabledClass: "swiper-button-disabled",
            paginationCurrentClass: "swiper-pagination-current",
            paginationTotalClass: "swiper-pagination-total",
            paginationHiddenClass: "swiper-pagination-hidden",
            paginationProgressbarClass: "swiper-pagination-progressbar",
            observer: !1,
            observeParents: !1,
            a11y: !1,
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            runCallbacksOnInit: !0
        }, h = i && i.virtualTranslate;
        i = i || {};
        var f = {};
        for (var g in i)if ("object" != typeof i[g] || null === i[g] || i[g].nodeType || i[g] === window || i[g] === document || "undefined" != typeof r && i[g] instanceof r || "undefined" != typeof jQuery && i[g] instanceof jQuery) f[g] = i[g]; else {
            f[g] = {};
            for (var v in i[g])f[g][v] = i[g][v]
        }
        for (var w in m)if ("undefined" == typeof i[w]) i[w] = m[w]; else if ("object" == typeof i[w])for (var y in m[w])"undefined" == typeof i[w][y] && (i[w][y] = m[w][y]);
        var b = this;
        if (b.params = i, b.originalParams = f, b.classNames = [], "undefined" != typeof a && "undefined" != typeof r && (a = r), ("undefined" != typeof a || (a = "undefined" == typeof r ? window.Dom7 || window.Zepto || window.jQuery : r)) && (b.$ = a, b.currentBreakpoint = void 0, b.getActiveBreakpoint = function () {
                if (!b.params.breakpoints)return !1;
                var e, a = !1, t = [];
                for (e in b.params.breakpoints)b.params.breakpoints.hasOwnProperty(e) && t.push(e);
                t.sort(function (e, a) {
                    return parseInt(e, 10) > parseInt(a, 10)
                });
                for (var r = 0; r < t.length; r++)e = t[r], e >= window.innerWidth && !a && (a = e);
                return a || "max"
            }, b.setBreakpoint = function () {
                var e = b.getActiveBreakpoint();
                if (e && b.currentBreakpoint !== e) {
                    var a = e in b.params.breakpoints ? b.params.breakpoints[e] : b.originalParams,
                        t = b.params.loop && a.slidesPerView !== b.params.slidesPerView;
                    for (var r in a)b.params[r] = a[r];
                    b.currentBreakpoint = e, t && b.destroyLoop && b.reLoop(!0)
                }
            }, b.params.breakpoints && b.setBreakpoint(), b.container = a(e), 0 !== b.container.length)) {
            if (b.container.length > 1) {
                var x = [];
                return b.container.each(function () {
                    x.push(new t(this, i))
                }), x
            }
            b.container[0].swiper = b, b.container.data("swiper", b), b.classNames.push("swiper-container-" + b.params.direction), b.params.freeMode && b.classNames.push("swiper-container-free-mode"), b.support.flexbox || (b.classNames.push("swiper-container-no-flexbox"), b.params.slidesPerColumn = 1), b.params.autoHeight && b.classNames.push("swiper-container-autoheight"), (b.params.parallax || b.params.watchSlidesVisibility) && (b.params.watchSlidesProgress = !0), ["cube", "coverflow", "flip"].indexOf(b.params.effect) >= 0 && (b.support.transforms3d ? (b.params.watchSlidesProgress = !0, b.classNames.push("swiper-container-3d")) : b.params.effect = "slide"), "slide" !== b.params.effect && b.classNames.push("swiper-container-" + b.params.effect), "cube" === b.params.effect && (b.params.resistanceRatio = 0, b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.centeredSlides = !1, b.params.spaceBetween = 0, b.params.virtualTranslate = !0, b.params.setWrapperSize = !1), ("fade" === b.params.effect || "flip" === b.params.effect) && (b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.watchSlidesProgress = !0, b.params.spaceBetween = 0, b.params.setWrapperSize = !1, "undefined" == typeof h && (b.params.virtualTranslate = !0)), b.params.grabCursor && b.support.touch && (b.params.grabCursor = !1), b.wrapper = b.container.children("." + b.params.wrapperClass), b.params.pagination && (b.paginationContainer = a(b.params.pagination), b.params.uniqueNavElements && "string" == typeof b.params.pagination && b.paginationContainer.length > 1 && 1 === b.container.find(b.params.pagination).length && (b.paginationContainer = b.container.find(b.params.pagination)), "bullets" === b.params.paginationType && b.params.paginationClickable ? b.paginationContainer.addClass("swiper-pagination-clickable") : b.params.paginationClickable = !1, b.paginationContainer.addClass("swiper-pagination-" + b.params.paginationType)), (b.params.nextButton || b.params.prevButton) && (b.params.nextButton && (b.nextButton = a(b.params.nextButton), b.params.uniqueNavElements && "string" == typeof b.params.nextButton && b.nextButton.length > 1 && 1 === b.container.find(b.params.nextButton).length && (b.nextButton = b.container.find(b.params.nextButton))), b.params.prevButton && (b.prevButton = a(b.params.prevButton), b.params.uniqueNavElements && "string" == typeof b.params.prevButton && b.prevButton.length > 1 && 1 === b.container.find(b.params.prevButton).length && (b.prevButton = b.container.find(b.params.prevButton)))), b.isHorizontal = function () {
                return "horizontal" === b.params.direction
            }, b.rtl = b.isHorizontal() && ("rtl" === b.container[0].dir.toLowerCase() || "rtl" === b.container.css("direction")), b.rtl && b.classNames.push("swiper-container-rtl"), b.rtl && (b.wrongRTL = "-webkit-box" === b.wrapper.css("display")), b.params.slidesPerColumn > 1 && b.classNames.push("swiper-container-multirow"), b.device.android && b.classNames.push("swiper-container-android"), b.container.addClass(b.classNames.join(" ")), b.translate = 0, b.progress = 0, b.velocity = 0, b.lockSwipeToNext = function () {
                b.params.allowSwipeToNext = !1
            }, b.lockSwipeToPrev = function () {
                b.params.allowSwipeToPrev = !1
            }, b.lockSwipes = function () {
                b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !1
            }, b.unlockSwipeToNext = function () {
                b.params.allowSwipeToNext = !0
            }, b.unlockSwipeToPrev = function () {
                b.params.allowSwipeToPrev = !0
            }, b.unlockSwipes = function () {
                b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !0
            }, b.params.grabCursor && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grab", b.container[0].style.cursor = "-moz-grab", b.container[0].style.cursor = "grab"), b.imagesToLoad = [], b.imagesLoaded = 0, b.loadImage = function (e, a, t, r, i) {
                function s() {
                    i && i()
                }

                var n;
                e.complete && r ? s() : a ? (n = new window.Image, n.onload = s, n.onerror = s, t && (n.srcset = t), a && (n.src = a)) : s()
            }, b.preloadImages = function () {
                function e() {
                    "undefined" != typeof b && null !== b && (void 0 !== b.imagesLoaded && b.imagesLoaded++, b.imagesLoaded === b.imagesToLoad.length && (b.params.updateOnImagesReady && b.update(), b.emit("onImagesReady", b)))
                }

                b.imagesToLoad = b.container.find("img");
                for (var a = 0; a < b.imagesToLoad.length; a++)b.loadImage(b.imagesToLoad[a], b.imagesToLoad[a].currentSrc || b.imagesToLoad[a].getAttribute("src"), b.imagesToLoad[a].srcset || b.imagesToLoad[a].getAttribute("srcset"), !0, e)
            }, b.autoplayTimeoutId = void 0, b.autoplaying = !1, b.autoplayPaused = !1, b.startAutoplay = function () {
                return "undefined" != typeof b.autoplayTimeoutId ? !1 : b.params.autoplay ? b.autoplaying ? !1 : (b.autoplaying = !0, b.emit("onAutoplayStart", b), void n()) : !1
            }, b.stopAutoplay = function () {
                b.autoplayTimeoutId && (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplaying = !1, b.autoplayTimeoutId = void 0, b.emit("onAutoplayStop", b))
            }, b.pauseAutoplay = function (e) {
                b.autoplayPaused || (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplayPaused = !0, 0 === e ? (b.autoplayPaused = !1, n()) : b.wrapper.transitionEnd(function () {
                    b && (b.autoplayPaused = !1, b.autoplaying ? n() : b.stopAutoplay())
                }))
            }, b.minTranslate = function () {
                return -b.snapGrid[0]
            }, b.maxTranslate = function () {
                return -b.snapGrid[b.snapGrid.length - 1]
            }, b.updateAutoHeight = function () {
                var e = b.slides.eq(b.activeIndex)[0];
                if ("undefined" != typeof e) {
                    var a = e.offsetHeight;
                    a && b.wrapper.css("height", a + "px")
                }
            }, b.updateContainerSize = function () {
                var e, a;
                e = "undefined" != typeof b.params.width ? b.params.width : b.container[0].clientWidth, a = "undefined" != typeof b.params.height ? b.params.height : b.container[0].clientHeight, 0 === e && b.isHorizontal() || 0 === a && !b.isHorizontal() || (e = e - parseInt(b.container.css("padding-left"), 10) - parseInt(b.container.css("padding-right"), 10), a = a - parseInt(b.container.css("padding-top"), 10) - parseInt(b.container.css("padding-bottom"), 10), b.width = e, b.height = a, b.size = b.isHorizontal() ? b.width : b.height)
            }, b.updateSlidesSize = function () {
                b.slides = b.wrapper.children("." + b.params.slideClass), b.snapGrid = [], b.slidesGrid = [], b.slidesSizesGrid = [];
                var e, a = b.params.spaceBetween, t = -b.params.slidesOffsetBefore, r = 0, i = 0;
                if ("undefined" != typeof b.size) {
                    "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * b.size), b.virtualSize = -a, b.slides.css(b.rtl ? {
                        marginLeft: "",
                        marginTop: ""
                    } : {marginRight: "", marginBottom: ""});
                    var n;
                    b.params.slidesPerColumn > 1 && (n = Math.floor(b.slides.length / b.params.slidesPerColumn) === b.slides.length / b.params.slidesPerColumn ? b.slides.length : Math.ceil(b.slides.length / b.params.slidesPerColumn) * b.params.slidesPerColumn, "auto" !== b.params.slidesPerView && "row" === b.params.slidesPerColumnFill && (n = Math.max(n, b.params.slidesPerView * b.params.slidesPerColumn)));
                    var o, l = b.params.slidesPerColumn, p = n / l,
                        d = p - (b.params.slidesPerColumn * p - b.slides.length);
                    for (e = 0; e < b.slides.length; e++) {
                        o = 0;
                        var u = b.slides.eq(e);
                        if (b.params.slidesPerColumn > 1) {
                            var c, m, h;
                            "column" === b.params.slidesPerColumnFill ? (m = Math.floor(e / l), h = e - m * l, (m > d || m === d && h === l - 1) && ++h >= l && (h = 0, m++), c = m + h * n / l, u.css({
                                "-webkit-box-ordinal-group": c,
                                "-moz-box-ordinal-group": c,
                                "-ms-flex-order": c,
                                "-webkit-order": c,
                                order: c
                            })) : (h = Math.floor(e / p), m = e - h * p), u.css({"margin-top": 0 !== h && b.params.spaceBetween && b.params.spaceBetween + "px"}).attr("data-swiper-column", m).attr("data-swiper-row", h)
                        }
                        "none" !== u.css("display") && ("auto" === b.params.slidesPerView ? (o = b.isHorizontal() ? u.outerWidth(!0) : u.outerHeight(!0), b.params.roundLengths && (o = s(o))) : (o = (b.size - (b.params.slidesPerView - 1) * a) / b.params.slidesPerView, b.params.roundLengths && (o = s(o)), b.isHorizontal() ? b.slides[e].style.width = o + "px" : b.slides[e].style.height = o + "px"), b.slides[e].swiperSlideSize = o, b.slidesSizesGrid.push(o), b.params.centeredSlides ? (t = t + o / 2 + r / 2 + a, 0 === e && (t = t - b.size / 2 - a), Math.abs(t) < .001 && (t = 0), i % b.params.slidesPerGroup === 0 && b.snapGrid.push(t), b.slidesGrid.push(t)) : (i % b.params.slidesPerGroup === 0 && b.snapGrid.push(t), b.slidesGrid.push(t), t = t + o + a), b.virtualSize += o + a, r = o, i++)
                    }
                    b.virtualSize = Math.max(b.virtualSize, b.size) + b.params.slidesOffsetAfter;
                    var f;
                    if (b.rtl && b.wrongRTL && ("slide" === b.params.effect || "coverflow" === b.params.effect) && b.wrapper.css({width: b.virtualSize + b.params.spaceBetween + "px"}), (!b.support.flexbox || b.params.setWrapperSize) && b.wrapper.css(b.isHorizontal() ? {width: b.virtualSize + b.params.spaceBetween + "px"} : {height: b.virtualSize + b.params.spaceBetween + "px"}), b.params.slidesPerColumn > 1 && (b.virtualSize = (o + b.params.spaceBetween) * n, b.virtualSize = Math.ceil(b.virtualSize / b.params.slidesPerColumn) - b.params.spaceBetween, b.wrapper.css({width: b.virtualSize + b.params.spaceBetween + "px"}), b.params.centeredSlides)) {
                        for (f = [], e = 0; e < b.snapGrid.length; e++)b.snapGrid[e] < b.virtualSize + b.snapGrid[0] && f.push(b.snapGrid[e]);
                        b.snapGrid = f
                    }
                    if (!b.params.centeredSlides) {
                        for (f = [], e = 0; e < b.snapGrid.length; e++)b.snapGrid[e] <= b.virtualSize - b.size && f.push(b.snapGrid[e]);
                        b.snapGrid = f, Math.floor(b.virtualSize - b.size) - Math.floor(b.snapGrid[b.snapGrid.length - 1]) > 1 && b.snapGrid.push(b.virtualSize - b.size)
                    }
                    0 === b.snapGrid.length && (b.snapGrid = [0]), 0 !== b.params.spaceBetween && b.slides.css(b.isHorizontal() ? b.rtl ? {marginLeft: a + "px"} : {marginRight: a + "px"} : {marginBottom: a + "px"}), b.params.watchSlidesProgress && b.updateSlidesOffset()
                }
            }, b.updateSlidesOffset = function () {
                for (var e = 0; e < b.slides.length; e++)b.slides[e].swiperSlideOffset = b.isHorizontal() ? b.slides[e].offsetLeft : b.slides[e].offsetTop
            }, b.updateSlidesProgress = function (e) {
                if ("undefined" == typeof e && (e = b.translate || 0), 0 !== b.slides.length) {
                    "undefined" == typeof b.slides[0].swiperSlideOffset && b.updateSlidesOffset();
                    var a = -e;
                    b.rtl && (a = e), b.slides.removeClass(b.params.slideVisibleClass);
                    for (var t = 0; t < b.slides.length; t++) {
                        var r = b.slides[t],
                            i = (a - r.swiperSlideOffset) / (r.swiperSlideSize + b.params.spaceBetween);
                        if (b.params.watchSlidesVisibility) {
                            var s = -(a - r.swiperSlideOffset), n = s + b.slidesSizesGrid[t],
                                o = s >= 0 && s < b.size || n > 0 && n <= b.size || 0 >= s && n >= b.size;
                            o && b.slides.eq(t).addClass(b.params.slideVisibleClass)
                        }
                        r.progress = b.rtl ? -i : i
                    }
                }
            }, b.updateProgress = function (e) {
                "undefined" == typeof e && (e = b.translate || 0);
                var a = b.maxTranslate() - b.minTranslate(), t = b.isBeginning, r = b.isEnd;
                0 === a ? (b.progress = 0, b.isBeginning = b.isEnd = !0) : (b.progress = (e - b.minTranslate()) / a, b.isBeginning = b.progress <= 0, b.isEnd = b.progress >= 1), b.isBeginning && !t && b.emit("onReachBeginning", b), b.isEnd && !r && b.emit("onReachEnd", b), b.params.watchSlidesProgress && b.updateSlidesProgress(e), b.emit("onProgress", b, b.progress)
            }, b.updateActiveIndex = function () {
                var e, a, t, r = b.rtl ? b.translate : -b.translate;
                for (a = 0; a < b.slidesGrid.length; a++)"undefined" != typeof b.slidesGrid[a + 1] ? r >= b.slidesGrid[a] && r < b.slidesGrid[a + 1] - (b.slidesGrid[a + 1] - b.slidesGrid[a]) / 2 ? e = a : r >= b.slidesGrid[a] && r < b.slidesGrid[a + 1] && (e = a + 1) : r >= b.slidesGrid[a] && (e = a);
                (0 > e || "undefined" == typeof e) && (e = 0), t = Math.floor(e / b.params.slidesPerGroup), t >= b.snapGrid.length && (t = b.snapGrid.length - 1), e !== b.activeIndex && (b.snapIndex = t, b.previousIndex = b.activeIndex, b.activeIndex = e, b.updateClasses())
            }, b.updateClasses = function () {
                b.slides.removeClass(b.params.slideActiveClass + " " + b.params.slideNextClass + " " + b.params.slidePrevClass);
                var e = b.slides.eq(b.activeIndex);
                e.addClass(b.params.slideActiveClass);
                var t = e.next("." + b.params.slideClass).addClass(b.params.slideNextClass);
                b.params.loop && 0 === t.length && b.slides.eq(0).addClass(b.params.slideNextClass);
                var r = e.prev("." + b.params.slideClass).addClass(b.params.slidePrevClass);
                if (b.params.loop && 0 === r.length && b.slides.eq(-1).addClass(b.params.slidePrevClass), b.paginationContainer && b.paginationContainer.length > 0) {
                    var i,
                        s = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length;
                    if (b.params.loop ? (i = Math.ceil((b.activeIndex - b.loopedSlides) / b.params.slidesPerGroup), i > b.slides.length - 1 - 2 * b.loopedSlides && (i -= b.slides.length - 2 * b.loopedSlides), i > s - 1 && (i -= s), 0 > i && "bullets" !== b.params.paginationType && (i = s + i)) : i = "undefined" != typeof b.snapIndex ? b.snapIndex : b.activeIndex || 0, "bullets" === b.params.paginationType && b.bullets && b.bullets.length > 0 && (b.bullets.removeClass(b.params.bulletActiveClass), b.paginationContainer.length > 1 ? b.bullets.each(function () {
                            a(this).index() === i && a(this).addClass(b.params.bulletActiveClass)
                        }) : b.bullets.eq(i).addClass(b.params.bulletActiveClass)), "fraction" === b.params.paginationType && (b.paginationContainer.find("." + b.params.paginationCurrentClass).text(i + 1), b.paginationContainer.find("." + b.params.paginationTotalClass).text(s)), "progress" === b.params.paginationType) {
                        var n = (i + 1) / s, o = n, l = 1;
                        b.isHorizontal() || (l = n, o = 1), b.paginationContainer.find("." + b.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + o + ") scaleY(" + l + ")").transition(b.params.speed)
                    }
                    "custom" === b.params.paginationType && b.params.paginationCustomRender && (b.paginationContainer.html(b.params.paginationCustomRender(b, i + 1, s)), b.emit("onPaginationRendered", b, b.paginationContainer[0]))
                }
                b.params.loop || (b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.isBeginning ? (b.prevButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.prevButton)) : (b.prevButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.prevButton))), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.isEnd ? (b.nextButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.nextButton)) : (b.nextButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.nextButton))))
            }, b.updatePagination = function () {
                if (b.params.pagination && b.paginationContainer && b.paginationContainer.length > 0) {
                    var e = "";
                    if ("bullets" === b.params.paginationType) {
                        for (var a = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length,
                                 t = 0; a > t; t++)e += b.params.paginationBulletRender ? b.params.paginationBulletRender(t, b.params.bulletClass) : "<" + b.params.paginationElement + ' class="' + b.params.bulletClass + '"></' + b.params.paginationElement + ">";
                        b.paginationContainer.html(e), b.bullets = b.paginationContainer.find("." + b.params.bulletClass), b.params.paginationClickable && b.params.a11y && b.a11y && b.a11y.initPagination()
                    }
                    "fraction" === b.params.paginationType && (e = b.params.paginationFractionRender ? b.params.paginationFractionRender(b, b.params.paginationCurrentClass, b.params.paginationTotalClass) : '<span class="' + b.params.paginationCurrentClass + '"></span> / <span class="' + b.params.paginationTotalClass + '"></span>', b.paginationContainer.html(e)), "progress" === b.params.paginationType && (e = b.params.paginationProgressRender ? b.params.paginationProgressRender(b, b.params.paginationProgressbarClass) : '<span class="' + b.params.paginationProgressbarClass + '"></span>', b.paginationContainer.html(e)), "custom" !== b.params.paginationType && b.emit("onPaginationRendered", b, b.paginationContainer[0])
                }
            }, b.update = function (e) {
                function a() {
                    r = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate()), b.setWrapperTranslate(r), b.updateActiveIndex(), b.updateClasses()
                }

                if (b.updateContainerSize(), b.updateSlidesSize(), b.updateProgress(), b.updatePagination(), b.updateClasses(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), e) {
                    var t, r;
                    b.controller && b.controller.spline && (b.controller.spline = void 0), b.params.freeMode ? (a(), b.params.autoHeight && b.updateAutoHeight()) : (t = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0), t || a())
                } else b.params.autoHeight && b.updateAutoHeight()
            }, b.onResize = function (e) {
                b.params.breakpoints && b.setBreakpoint();
                var a = b.params.allowSwipeToPrev, t = b.params.allowSwipeToNext;
                b.params.allowSwipeToPrev = b.params.allowSwipeToNext = !0, b.updateContainerSize(), b.updateSlidesSize(), ("auto" === b.params.slidesPerView || b.params.freeMode || e) && b.updatePagination(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), b.controller && b.controller.spline && (b.controller.spline = void 0);
                var r = !1;
                if (b.params.freeMode) {
                    var i = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate());
                    b.setWrapperTranslate(i), b.updateActiveIndex(), b.updateClasses(), b.params.autoHeight && b.updateAutoHeight()
                } else b.updateClasses(), r = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0);
                b.params.lazyLoading && !r && b.lazy && b.lazy.load(), b.params.allowSwipeToPrev = a, b.params.allowSwipeToNext = t
            };
            var T = ["mousedown", "mousemove", "mouseup"];
            window.navigator.pointerEnabled ? T = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (T = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), b.touchEvents = {
                start: b.support.touch || !b.params.simulateTouch ? "touchstart" : T[0],
                move: b.support.touch || !b.params.simulateTouch ? "touchmove" : T[1],
                end: b.support.touch || !b.params.simulateTouch ? "touchend" : T[2]
            }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === b.params.touchEventsTarget ? b.container : b.wrapper).addClass("swiper-wp8-" + b.params.direction), b.initEvents = function (e) {
                var a = e ? "off" : "on", t = e ? "removeEventListener" : "addEventListener",
                    r = "container" === b.params.touchEventsTarget ? b.container[0] : b.wrapper[0],
                    s = b.support.touch ? r : document, n = b.params.nested ? !0 : !1;
                b.browser.ie ? (r[t](b.touchEvents.start, b.onTouchStart, !1), s[t](b.touchEvents.move, b.onTouchMove, n), s[t](b.touchEvents.end, b.onTouchEnd, !1)) : (b.support.touch && (r[t](b.touchEvents.start, b.onTouchStart, !1), r[t](b.touchEvents.move, b.onTouchMove, n), r[t](b.touchEvents.end, b.onTouchEnd, !1)), !i.simulateTouch || b.device.ios || b.device.android || (r[t]("mousedown", b.onTouchStart, !1), document[t]("mousemove", b.onTouchMove, n), document[t]("mouseup", b.onTouchEnd, !1))), window[t]("resize", b.onResize), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.nextButton[a]("click", b.onClickNext), b.params.a11y && b.a11y && b.nextButton[a]("keydown", b.a11y.onEnterKey)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.prevButton[a]("click", b.onClickPrev), b.params.a11y && b.a11y && b.prevButton[a]("keydown", b.a11y.onEnterKey)), b.params.pagination && b.params.paginationClickable && (b.paginationContainer[a]("click", "." + b.params.bulletClass, b.onClickIndex), b.params.a11y && b.a11y && b.paginationContainer[a]("keydown", "." + b.params.bulletClass, b.a11y.onEnterKey)), (b.params.preventClicks || b.params.preventClicksPropagation) && r[t]("click", b.preventClicks, !0)
            }, b.attachEvents = function () {
                b.initEvents()
            }, b.detachEvents = function () {
                b.initEvents(!0)
            }, b.allowClick = !0, b.preventClicks = function (e) {
                b.allowClick || (b.params.preventClicks && e.preventDefault(), b.params.preventClicksPropagation && b.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
            }, b.onClickNext = function (e) {
                e.preventDefault(), (!b.isEnd || b.params.loop) && b.slideNext()
            }, b.onClickPrev = function (e) {
                e.preventDefault(), (!b.isBeginning || b.params.loop) && b.slidePrev()
            }, b.onClickIndex = function (e) {
                e.preventDefault();
                var t = a(this).index() * b.params.slidesPerGroup;
                b.params.loop && (t += b.loopedSlides), b.slideTo(t)
            }, b.updateClickedSlide = function (e) {
                var t = o(e, "." + b.params.slideClass), r = !1;
                if (t)for (var i = 0; i < b.slides.length; i++)b.slides[i] === t && (r = !0);
                if (!t || !r)return b.clickedSlide = void 0, void(b.clickedIndex = void 0);
                if (b.clickedSlide = t, b.clickedIndex = a(t).index(), b.params.slideToClickedSlide && void 0 !== b.clickedIndex && b.clickedIndex !== b.activeIndex) {
                    var s, n = b.clickedIndex;
                    if (b.params.loop) {
                        if (b.animating)return;
                        s = a(b.clickedSlide).attr("data-swiper-slide-index"), b.params.centeredSlides ? n < b.loopedSlides - b.params.slidesPerView / 2 || n > b.slides.length - b.loopedSlides + b.params.slidesPerView / 2 ? (b.fixLoop(), n = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
                            b.slideTo(n)
                        }, 0)) : b.slideTo(n) : n > b.slides.length - b.params.slidesPerView ? (b.fixLoop(), n = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
                            b.slideTo(n)
                        }, 0)) : b.slideTo(n)
                    } else b.slideTo(n)
                }
            };
            var S, C, z, M, E, P, k, I, L, B, D = "input, select, textarea, button", H = Date.now(), A = [];
            b.animating = !1, b.touches = {startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0};
            var G, O;
            if (b.onTouchStart = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), G = "touchstart" === e.type, G || !("which" in e) || 3 !== e.which) {
                        if (b.params.noSwiping && o(e, "." + b.params.noSwipingClass))return void(b.allowClick = !0);
                        if (!b.params.swipeHandler || o(e, b.params.swipeHandler)) {
                            var t = b.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                                r = b.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
                            if (!(b.device.ios && b.params.iOSEdgeSwipeDetection && t <= b.params.iOSEdgeSwipeThreshold)) {
                                if (S = !0, C = !1, z = !0, E = void 0, O = void 0, b.touches.startX = t, b.touches.startY = r, M = Date.now(), b.allowClick = !0, b.updateContainerSize(), b.swipeDirection = void 0, b.params.threshold > 0 && (I = !1), "touchstart" !== e.type) {
                                    var i = !0;
                                    a(e.target).is(D) && (i = !1), document.activeElement && a(document.activeElement).is(D) && document.activeElement.blur(), i && e.preventDefault()
                                }
                                b.emit("onTouchStart", b, e)
                            }
                        }
                    }
                }, b.onTouchMove = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), !G || "mousemove" !== e.type) {
                        if (e.preventedByNestedSwiper)return b.touches.startX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, void(b.touches.startY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY);
                        if (b.params.onlyExternal)return b.allowClick = !1, void(S && (b.touches.startX = b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.startY = b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, M = Date.now()));
                        if (G && document.activeElement && e.target === document.activeElement && a(e.target).is(D))return C = !0, void(b.allowClick = !1);
                        if (z && b.emit("onTouchMove", b, e), !(e.targetTouches && e.targetTouches.length > 1)) {
                            if (b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof E) {
                                var t = 180 * Math.atan2(Math.abs(b.touches.currentY - b.touches.startY), Math.abs(b.touches.currentX - b.touches.startX)) / Math.PI;
                                E = b.isHorizontal() ? t > b.params.touchAngle : 90 - t > b.params.touchAngle
                            }
                            if (E && b.emit("onTouchMoveOpposite", b, e), "undefined" == typeof O && b.browser.ieTouch && (b.touches.currentX !== b.touches.startX || b.touches.currentY !== b.touches.startY) && (O = !0), S) {
                                if (E)return void(S = !1);
                                if (O || !b.browser.ieTouch) {
                                    b.allowClick = !1, b.emit("onSliderMove", b, e), e.preventDefault(), b.params.touchMoveStopPropagation && !b.params.nested && e.stopPropagation(), C || (i.loop && b.fixLoop(), k = b.getWrapperTranslate(), b.setWrapperTransition(0), b.animating && b.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), b.params.autoplay && b.autoplaying && (b.params.autoplayDisableOnInteraction ? b.stopAutoplay() : b.pauseAutoplay()), B = !1, b.params.grabCursor && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grabbing", b.container[0].style.cursor = "-moz-grabbin", b.container[0].style.cursor = "grabbing")), C = !0;
                                    var r = b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY;
                                    r *= b.params.touchRatio, b.rtl && (r = -r), b.swipeDirection = r > 0 ? "prev" : "next", P = r + k;
                                    var s = !0;
                                    if (r > 0 && P > b.minTranslate() ? (s = !1, b.params.resistance && (P = b.minTranslate() - 1 + Math.pow(-b.minTranslate() + k + r, b.params.resistanceRatio))) : 0 > r && P < b.maxTranslate() && (s = !1, b.params.resistance && (P = b.maxTranslate() + 1 - Math.pow(b.maxTranslate() - k - r, b.params.resistanceRatio))), s && (e.preventedByNestedSwiper = !0), !b.params.allowSwipeToNext && "next" === b.swipeDirection && k > P && (P = k), !b.params.allowSwipeToPrev && "prev" === b.swipeDirection && P > k && (P = k), b.params.followFinger) {
                                        if (b.params.threshold > 0) {
                                            if (!(Math.abs(r) > b.params.threshold || I))return void(P = k);
                                            if (!I)return I = !0, b.touches.startX = b.touches.currentX, b.touches.startY = b.touches.currentY, P = k, void(b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY)
                                        }
                                        (b.params.freeMode || b.params.watchSlidesProgress) && b.updateActiveIndex(), b.params.freeMode && (0 === A.length && A.push({
                                            position: b.touches[b.isHorizontal() ? "startX" : "startY"],
                                            time: M
                                        }), A.push({
                                            position: b.touches[b.isHorizontal() ? "currentX" : "currentY"],
                                            time: (new window.Date).getTime()
                                        })), b.updateProgress(P), b.setWrapperTranslate(P)
                                    }
                                }
                            }
                        }
                    }
                }, b.onTouchEnd = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), z && b.emit("onTouchEnd", b, e), z = !1, S) {
                        b.params.grabCursor && C && S && (b.container[0].style.cursor = "move", b.container[0].style.cursor = "-webkit-grab", b.container[0].style.cursor = "-moz-grab", b.container[0].style.cursor = "grab");
                        var t = Date.now(), r = t - M;
                        if (b.allowClick && (b.updateClickedSlide(e), b.emit("onTap", b, e), 300 > r && t - H > 300 && (L && clearTimeout(L), L = setTimeout(function () {
                                b && (b.params.paginationHide && b.paginationContainer.length > 0 && !a(e.target).hasClass(b.params.bulletClass) && b.paginationContainer.toggleClass(b.params.paginationHiddenClass), b.emit("onClick", b, e))
                            }, 300)), 300 > r && 300 > t - H && (L && clearTimeout(L), b.emit("onDoubleTap", b, e))), H = Date.now(), setTimeout(function () {
                                b && (b.allowClick = !0)
                            }, 0), !S || !C || !b.swipeDirection || 0 === b.touches.diff || P === k)return void(S = C = !1);
                        S = C = !1;
                        var i;
                        if (i = b.params.followFinger ? b.rtl ? b.translate : -b.translate : -P, b.params.freeMode) {
                            if (i < -b.minTranslate())return void b.slideTo(b.activeIndex);
                            if (i > -b.maxTranslate())return void b.slideTo(b.slides.length < b.snapGrid.length ? b.snapGrid.length - 1 : b.slides.length - 1);
                            if (b.params.freeModeMomentum) {
                                if (A.length > 1) {
                                    var s = A.pop(), n = A.pop(), o = s.position - n.position, l = s.time - n.time;
                                    b.velocity = o / l, b.velocity = b.velocity / 2, Math.abs(b.velocity) < b.params.freeModeMinimumVelocity && (b.velocity = 0), (l > 150 || (new window.Date).getTime() - s.time > 300) && (b.velocity = 0)
                                } else b.velocity = 0;
                                A.length = 0;
                                var p = 1e3 * b.params.freeModeMomentumRatio, d = b.velocity * p, u = b.translate + d;
                                b.rtl && (u = -u);
                                var c, m = !1, h = 20 * Math.abs(b.velocity) * b.params.freeModeMomentumBounceRatio;
                                if (u < b.maxTranslate()) b.params.freeModeMomentumBounce ? (u + b.maxTranslate() < -h && (u = b.maxTranslate() - h), c = b.maxTranslate(), m = !0, B = !0) : u = b.maxTranslate(); else if (u > b.minTranslate()) b.params.freeModeMomentumBounce ? (u - b.minTranslate() > h && (u = b.minTranslate() + h), c = b.minTranslate(), m = !0, B = !0) : u = b.minTranslate(); else if (b.params.freeModeSticky) {
                                    var f, g = 0;
                                    for (g = 0; g < b.snapGrid.length; g += 1)if (b.snapGrid[g] > -u) {
                                        f = g;
                                        break
                                    }
                                    u = Math.abs(b.snapGrid[f] - u) < Math.abs(b.snapGrid[f - 1] - u) || "next" === b.swipeDirection ? b.snapGrid[f] : b.snapGrid[f - 1], b.rtl || (u = -u)
                                }
                                if (0 !== b.velocity) p = Math.abs(b.rtl ? (-u - b.translate) / b.velocity : (u - b.translate) / b.velocity); else if (b.params.freeModeSticky)return void b.slideReset();
                                b.params.freeModeMomentumBounce && m ? (b.updateProgress(c), b.setWrapperTransition(p), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating = !0, b.wrapper.transitionEnd(function () {
                                    b && B && (b.emit("onMomentumBounce", b), b.setWrapperTransition(b.params.speed), b.setWrapperTranslate(c), b.wrapper.transitionEnd(function () {
                                        b && b.onTransitionEnd()
                                    }))
                                })) : b.velocity ? (b.updateProgress(u), b.setWrapperTransition(p), b.setWrapperTranslate(u), b.onTransitionStart(), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function () {
                                    b && b.onTransitionEnd()
                                }))) : b.updateProgress(u), b.updateActiveIndex()
                            }
                            return void((!b.params.freeModeMomentum || r >= b.params.longSwipesMs) && (b.updateProgress(), b.updateActiveIndex()))
                        }
                        var v, w = 0, y = b.slidesSizesGrid[0];
                        for (v = 0; v < b.slidesGrid.length; v += b.params.slidesPerGroup)"undefined" != typeof b.slidesGrid[v + b.params.slidesPerGroup] ? i >= b.slidesGrid[v] && i < b.slidesGrid[v + b.params.slidesPerGroup] && (w = v, y = b.slidesGrid[v + b.params.slidesPerGroup] - b.slidesGrid[v]) : i >= b.slidesGrid[v] && (w = v, y = b.slidesGrid[b.slidesGrid.length - 1] - b.slidesGrid[b.slidesGrid.length - 2]);
                        var x = (i - b.slidesGrid[w]) / y;
                        if (r > b.params.longSwipesMs) {
                            if (!b.params.longSwipes)return void b.slideTo(b.activeIndex);
                            "next" === b.swipeDirection && b.slideTo(x >= b.params.longSwipesRatio ? w + b.params.slidesPerGroup : w), "prev" === b.swipeDirection && b.slideTo(x > 1 - b.params.longSwipesRatio ? w + b.params.slidesPerGroup : w)
                        } else {
                            if (!b.params.shortSwipes)return void b.slideTo(b.activeIndex);
                            "next" === b.swipeDirection && b.slideTo(w + b.params.slidesPerGroup), "prev" === b.swipeDirection && b.slideTo(w)
                        }
                    }
                }, b._slideTo = function (e, a) {
                    return b.slideTo(e, a, !0, !0)
                }, b.slideTo = function (e, a, t, r) {
                    "undefined" == typeof t && (t = !0), "undefined" == typeof e && (e = 0), 0 > e && (e = 0), b.snapIndex = Math.floor(e / b.params.slidesPerGroup), b.snapIndex >= b.snapGrid.length && (b.snapIndex = b.snapGrid.length - 1);
                    var i = -b.snapGrid[b.snapIndex];
                    b.params.autoplay && b.autoplaying && (r || !b.params.autoplayDisableOnInteraction ? b.pauseAutoplay(a) : b.stopAutoplay()), b.updateProgress(i);
                    for (var s = 0; s < b.slidesGrid.length; s++)-Math.floor(100 * i) >= Math.floor(100 * b.slidesGrid[s]) && (e = s);
                    return !b.params.allowSwipeToNext && i < b.translate && i < b.minTranslate() ? !1 : !b.params.allowSwipeToPrev && i > b.translate && i > b.maxTranslate() && (b.activeIndex || 0) !== e ? !1 : ("undefined" == typeof a && (a = b.params.speed), b.previousIndex = b.activeIndex || 0, b.activeIndex = e, b.rtl && -i === b.translate || !b.rtl && i === b.translate ? (b.params.autoHeight && b.updateAutoHeight(), b.updateClasses(), "slide" !== b.params.effect && b.setWrapperTranslate(i), !1) : (b.updateClasses(), b.onTransitionStart(t), 0 === a ? (b.setWrapperTranslate(i), b.setWrapperTransition(0), b.onTransitionEnd(t)) : (b.setWrapperTranslate(i), b.setWrapperTransition(a), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function () {
                        b && b.onTransitionEnd(t)
                    }))), !0))
                }, b.onTransitionStart = function (e) {
                    "undefined" == typeof e && (e = !0), b.params.autoHeight && b.updateAutoHeight(), b.lazy && b.lazy.onTransitionStart(), e && (b.emit("onTransitionStart", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeStart", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextStart", b) : b.emit("onSlidePrevStart", b)))
                }, b.onTransitionEnd = function (e) {
                    b.animating = !1, b.setWrapperTransition(0), "undefined" == typeof e && (e = !0), b.lazy && b.lazy.onTransitionEnd(), e && (b.emit("onTransitionEnd", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeEnd", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextEnd", b) : b.emit("onSlidePrevEnd", b))), b.params.hashnav && b.hashnav && b.hashnav.setHash()
                }, b.slideNext = function (e, a, t) {
                    return b.params.loop ? b.animating ? !1 : (b.fixLoop(), b.container[0].clientLeft, b.slideTo(b.activeIndex + b.params.slidesPerGroup, a, e, t)) : b.slideTo(b.activeIndex + b.params.slidesPerGroup, a, e, t)
                }, b._slideNext = function (e) {
                    return b.slideNext(!0, e, !0)
                }, b.slidePrev = function (e, a, t) {
                    return b.params.loop ? b.animating ? !1 : (b.fixLoop(), b.container[0].clientLeft, b.slideTo(b.activeIndex - 1, a, e, t)) : b.slideTo(b.activeIndex - 1, a, e, t)
                }, b._slidePrev = function (e) {
                    return b.slidePrev(!0, e, !0)
                }, b.slideReset = function (e, a) {
                    return b.slideTo(b.activeIndex, a, e)
                }, b.setWrapperTransition = function (e, a) {
                    b.wrapper.transition(e), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTransition(e), b.params.parallax && b.parallax && b.parallax.setTransition(e), b.params.scrollbar && b.scrollbar && b.scrollbar.setTransition(e), b.params.control && b.controller && b.controller.setTransition(e, a), b.emit("onSetTransition", b, e)
                }, b.setWrapperTranslate = function (e, a, t) {
                    var r = 0, i = 0, n = 0;
                    b.isHorizontal() ? r = b.rtl ? -e : e : i = e, b.params.roundLengths && (r = s(r), i = s(i)), b.params.virtualTranslate || b.wrapper.transform(b.support.transforms3d ? "translate3d(" + r + "px, " + i + "px, " + n + "px)" : "translate(" + r + "px, " + i + "px)"), b.translate = b.isHorizontal() ? r : i;
                    var o, l = b.maxTranslate() - b.minTranslate();
                    o = 0 === l ? 0 : (e - b.minTranslate()) / l, o !== b.progress && b.updateProgress(e), a && b.updateActiveIndex(), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTranslate(b.translate), b.params.parallax && b.parallax && b.parallax.setTranslate(b.translate), b.params.scrollbar && b.scrollbar && b.scrollbar.setTranslate(b.translate), b.params.control && b.controller && b.controller.setTranslate(b.translate, t), b.emit("onSetTranslate", b, b.translate)
                }, b.getTranslate = function (e, a) {
                    var t, r, i, s;
                    return "undefined" == typeof a && (a = "x"), b.params.virtualTranslate ? b.rtl ? -b.translate : b.translate : (i = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (r = i.transform || i.webkitTransform, r.split(",").length > 6 && (r = r.split(", ").map(function (e) {
                        return e.replace(",", ".")
                    }).join(", ")), s = new window.WebKitCSSMatrix("none" === r ? "" : r)) : (s = i.MozTransform || i.OTransform || i.MsTransform || i.msTransform || i.transform || i.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = s.toString().split(",")), "x" === a && (r = window.WebKitCSSMatrix ? s.m41 : parseFloat(16 === t.length ? t[12] : t[4])), "y" === a && (r = window.WebKitCSSMatrix ? s.m42 : parseFloat(16 === t.length ? t[13] : t[5])), b.rtl && r && (r = -r), r || 0)
                }, b.getWrapperTranslate = function (e) {
                    return "undefined" == typeof e && (e = b.isHorizontal() ? "x" : "y"), b.getTranslate(b.wrapper[0], e)
                }, b.observers = [], b.initObservers = function () {
                    if (b.params.observeParents)for (var e = b.container.parents(), a = 0; a < e.length; a++)l(e[a]);
                    l(b.container[0], {childList: !1}), l(b.wrapper[0], {attributes: !1})
                }, b.disconnectObservers = function () {
                    for (var e = 0; e < b.observers.length; e++)b.observers[e].disconnect();
                    b.observers = []
                }, b.createLoop = function () {
                    b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove();
                    var e = b.wrapper.children("." + b.params.slideClass);
                    "auto" !== b.params.slidesPerView || b.params.loopedSlides || (b.params.loopedSlides = e.length), b.loopedSlides = parseInt(b.params.loopedSlides || b.params.slidesPerView, 10), b.loopedSlides = b.loopedSlides + b.params.loopAdditionalSlides, b.loopedSlides > e.length && (b.loopedSlides = e.length);
                    var t, r = [], i = [];
                    for (e.each(function (t, s) {
                        var n = a(this);
                        t < b.loopedSlides && i.push(s), t < e.length && t >= e.length - b.loopedSlides && r.push(s), n.attr("data-swiper-slide-index", t)
                    }), t = 0; t < i.length; t++)b.wrapper.append(a(i[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass));
                    for (t = r.length - 1; t >= 0; t--)b.wrapper.prepend(a(r[t].cloneNode(!0)).addClass(b.params.slideDuplicateClass))
                }, b.destroyLoop = function () {
                    b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove(), b.slides.removeAttr("data-swiper-slide-index")
                }, b.reLoop = function (e) {
                    var a = b.activeIndex - b.loopedSlides;
                    b.destroyLoop(), b.createLoop(), b.updateSlidesSize(), e && b.slideTo(a + b.loopedSlides, 0, !1)
                }, b.fixLoop = function () {
                    var e;
                    b.activeIndex < b.loopedSlides ? (e = b.slides.length - 3 * b.loopedSlides + b.activeIndex, e += b.loopedSlides, b.slideTo(e, 0, !1, !0)) : ("auto" === b.params.slidesPerView && b.activeIndex >= 2 * b.loopedSlides || b.activeIndex > b.slides.length - 2 * b.params.slidesPerView) && (e = -b.slides.length + b.activeIndex + b.loopedSlides, e += b.loopedSlides, b.slideTo(e, 0, !1, !0))
                }, b.appendSlide = function (e) {
                    if (b.params.loop && b.destroyLoop(), "object" == typeof e && e.length)for (var a = 0; a < e.length; a++)e[a] && b.wrapper.append(e[a]); else b.wrapper.append(e);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0)
                }, b.prependSlide = function (e) {
                    b.params.loop && b.destroyLoop();
                    var a = b.activeIndex + 1;
                    if ("object" == typeof e && e.length) {
                        for (var t = 0; t < e.length; t++)e[t] && b.wrapper.prepend(e[t]);
                        a = b.activeIndex + e.length
                    } else b.wrapper.prepend(e);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.slideTo(a, 0, !1)
                }, b.removeSlide = function (e) {
                    b.params.loop && (b.destroyLoop(), b.slides = b.wrapper.children("." + b.params.slideClass));
                    var a, t = b.activeIndex;
                    if ("object" == typeof e && e.length) {
                        for (var r = 0; r < e.length; r++)a = e[r], b.slides[a] && b.slides.eq(a).remove(), t > a && t--;
                        t = Math.max(t, 0)
                    } else a = e, b.slides[a] && b.slides.eq(a).remove(), t > a && t--, t = Math.max(t, 0);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.params.loop ? b.slideTo(t + b.loopedSlides, 0, !1) : b.slideTo(t, 0, !1)
                }, b.removeAllSlides = function () {
                    for (var e = [], a = 0; a < b.slides.length; a++)e.push(a);
                    b.removeSlide(e)
                }, b.effects = {
                    fade: {
                        setTranslate: function () {
                            for (var e = 0; e < b.slides.length; e++) {
                                var a = b.slides.eq(e), t = a[0].swiperSlideOffset, r = -t;
                                b.params.virtualTranslate || (r -= b.translate);
                                var i = 0;
                                b.isHorizontal() || (i = r, r = 0);
                                var s = b.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                                a.css({opacity: s}).transform("translate3d(" + r + "px, " + i + "px, 0px)")
                            }
                        }, setTransition: function (e) {
                            if (b.slides.transition(e), b.params.virtualTranslate && 0 !== e) {
                                var a = !1;
                                b.slides.transitionEnd(function () {
                                    if (!a && b) {
                                        a = !0, b.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                                                 t = 0; t < e.length; t++)b.wrapper.trigger(e[t])
                                    }
                                })
                            }
                        }
                    }, flip: {
                        setTranslate: function () {
                            for (var e = 0; e < b.slides.length; e++) {
                                var t = b.slides.eq(e), r = t[0].progress;
                                b.params.flip.limitRotation && (r = Math.max(Math.min(t[0].progress, 1), -1));
                                var i = t[0].swiperSlideOffset, s = -180 * r, n = s, o = 0, l = -i, p = 0;
                                if (b.isHorizontal() ? b.rtl && (n = -n) : (p = l, l = 0, o = -n, n = 0), t[0].style.zIndex = -Math.abs(Math.round(r)) + b.slides.length, b.params.flip.slideShadows) {
                                    var d = t.find(b.isHorizontal() ? ".swiper-slide-shadow-left" : ".swiper-slide-shadow-top"),
                                        u = t.find(b.isHorizontal() ? ".swiper-slide-shadow-right" : ".swiper-slide-shadow-bottom");
                                    0 === d.length && (d = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), t.append(d)), 0 === u.length && (u = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(u)), d.length && (d[0].style.opacity = Math.max(-r, 0)), u.length && (u[0].style.opacity = Math.max(r, 0))
                                }
                                t.transform("translate3d(" + l + "px, " + p + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
                            }
                        }, setTransition: function (e) {
                            if (b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.virtualTranslate && 0 !== e) {
                                var t = !1;
                                b.slides.eq(b.activeIndex).transitionEnd(function () {
                                    if (!t && b && a(this).hasClass(b.params.slideActiveClass)) {
                                        t = !0, b.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                                                 r = 0; r < e.length; r++)b.wrapper.trigger(e[r])
                                    }
                                })
                            }
                        }
                    }, cube: {
                        setTranslate: function () {
                            var e, t = 0;
                            b.params.cube.shadow && (b.isHorizontal() ? (e = b.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), b.wrapper.append(e)), e.css({height: b.width + "px"})) : (e = b.container.find(".swiper-cube-shadow"), 0 === e.length && (e = a('<div class="swiper-cube-shadow"></div>'), b.container.append(e))));
                            for (var r = 0; r < b.slides.length; r++) {
                                var i = b.slides.eq(r), s = 90 * r, n = Math.floor(s / 360);
                                b.rtl && (s = -s, n = Math.floor(-s / 360));
                                var o = Math.max(Math.min(i[0].progress, 1), -1), l = 0, p = 0, d = 0;
                                r % 4 === 0 ? (l = 4 * -n * b.size, d = 0) : (r - 1) % 4 === 0 ? (l = 0, d = 4 * -n * b.size) : (r - 2) % 4 === 0 ? (l = b.size + 4 * n * b.size, d = b.size) : (r - 3) % 4 === 0 && (l = -b.size, d = 3 * b.size + 4 * b.size * n), b.rtl && (l = -l), b.isHorizontal() || (p = l, l = 0);
                                var u = "rotateX(" + (b.isHorizontal() ? 0 : -s) + "deg) rotateY(" + (b.isHorizontal() ? s : 0) + "deg) translate3d(" + l + "px, " + p + "px, " + d + "px)";
                                if (1 >= o && o > -1 && (t = 90 * r + 90 * o, b.rtl && (t = 90 * -r - 90 * o)), i.transform(u), b.params.cube.slideShadows) {
                                    var c = i.find(b.isHorizontal() ? ".swiper-slide-shadow-left" : ".swiper-slide-shadow-top"),
                                        m = i.find(b.isHorizontal() ? ".swiper-slide-shadow-right" : ".swiper-slide-shadow-bottom");
                                    0 === c.length && (c = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), i.append(c)), 0 === m.length && (m = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), i.append(m)), c.length && (c[0].style.opacity = Math.max(-o, 0)), m.length && (m[0].style.opacity = Math.max(o, 0))
                                }
                            }
                            if (b.wrapper.css({
                                    "-webkit-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "-moz-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "-ms-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "transform-origin": "50% 50% -" + b.size / 2 + "px"
                                }), b.params.cube.shadow)if (b.isHorizontal()) e.transform("translate3d(0px, " + (b.width / 2 + b.params.cube.shadowOffset) + "px, " + -b.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + b.params.cube.shadowScale + ")"); else {
                                var h = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                                    f = 1.5 - (Math.sin(2 * h * Math.PI / 360) / 2 + Math.cos(2 * h * Math.PI / 360) / 2),
                                    g = b.params.cube.shadowScale, v = b.params.cube.shadowScale / f,
                                    w = b.params.cube.shadowOffset;
                                e.transform("scale3d(" + g + ", 1, " + v + ") translate3d(0px, " + (b.height / 2 + w) + "px, " + -b.height / 2 / v + "px) rotateX(-90deg)")
                            }
                            var y = b.isSafari || b.isUiWebView ? -b.size / 2 : 0;
                            b.wrapper.transform("translate3d(0px,0," + y + "px) rotateX(" + (b.isHorizontal() ? 0 : t) + "deg) rotateY(" + (b.isHorizontal() ? -t : 0) + "deg)")
                        }, setTransition: function (e) {
                            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.cube.shadow && !b.isHorizontal() && b.container.find(".swiper-cube-shadow").transition(e)
                        }
                    }, coverflow: {
                        setTranslate: function () {
                            for (var e = b.translate, t = b.isHorizontal() ? -e + b.width / 2 : -e + b.height / 2,
                                     r = b.isHorizontal() ? b.params.coverflow.rotate : -b.params.coverflow.rotate,
                                     i = b.params.coverflow.depth, s = 0, n = b.slides.length; n > s; s++) {
                                var o = b.slides.eq(s), l = b.slidesSizesGrid[s], p = o[0].swiperSlideOffset,
                                    d = (t - p - l / 2) / l * b.params.coverflow.modifier,
                                    u = b.isHorizontal() ? r * d : 0, c = b.isHorizontal() ? 0 : r * d,
                                    m = -i * Math.abs(d), h = b.isHorizontal() ? 0 : b.params.coverflow.stretch * d,
                                    f = b.isHorizontal() ? b.params.coverflow.stretch * d : 0;
                                Math.abs(f) < .001 && (f = 0), Math.abs(h) < .001 && (h = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) < .001 && (u = 0), Math.abs(c) < .001 && (c = 0);
                                var g = "translate3d(" + f + "px," + h + "px," + m + "px)  rotateX(" + c + "deg) rotateY(" + u + "deg)";
                                if (o.transform(g), o[0].style.zIndex = -Math.abs(Math.round(d)) + 1, b.params.coverflow.slideShadows) {
                                    var v = o.find(b.isHorizontal() ? ".swiper-slide-shadow-left" : ".swiper-slide-shadow-top"),
                                        w = o.find(b.isHorizontal() ? ".swiper-slide-shadow-right" : ".swiper-slide-shadow-bottom");
                                    0 === v.length && (v = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), o.append(v)), 0 === w.length && (w = a('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(w)), v.length && (v[0].style.opacity = d > 0 ? d : 0), w.length && (w[0].style.opacity = -d > 0 ? -d : 0)
                                }
                            }
                            if (b.browser.ie) {
                                var y = b.wrapper[0].style;
                                y.perspectiveOrigin = t + "px 50%"
                            }
                        }, setTransition: function (e) {
                            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
                        }
                    }
                }, b.lazy = {
                    initialImageLoaded: !1, loadImageInSlide: function (e, t) {
                        if ("undefined" != typeof e && ("undefined" == typeof t && (t = !0), 0 !== b.slides.length)) {
                            var r = b.slides.eq(e),
                                i = r.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
                            !r.hasClass("swiper-lazy") || r.hasClass("swiper-lazy-loaded") || r.hasClass("swiper-lazy-loading") || (i = i.add(r[0])), 0 !== i.length && i.each(function () {
                                var e = a(this);
                                e.addClass("swiper-lazy-loading");
                                var i = e.attr("data-background"), s = e.attr("data-src"), n = e.attr("data-srcset");
                                b.loadImage(e[0], s || i, n, !1, function () {
                                    if (i ? (e.css("background-image", 'url("' + i + '")'), e.removeAttr("data-background")) : (n && (e.attr("srcset", n), e.removeAttr("data-srcset")), s && (e.attr("src", s), e.removeAttr("data-src"))), e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), r.find(".swiper-lazy-preloader, .preloader").remove(), b.params.loop && t) {
                                        var a = r.attr("data-swiper-slide-index");
                                        if (r.hasClass(b.params.slideDuplicateClass)) {
                                            var o = b.wrapper.children('[data-swiper-slide-index="' + a + '"]:not(.' + b.params.slideDuplicateClass + ")");
                                            b.lazy.loadImageInSlide(o.index(), !1)
                                        } else {
                                            var l = b.wrapper.children("." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + a + '"]');
                                            b.lazy.loadImageInSlide(l.index(), !1)
                                        }
                                    }
                                    b.emit("onLazyImageReady", b, r[0], e[0])
                                }), b.emit("onLazyImageLoad", b, r[0], e[0])
                            })
                        }
                    }, load: function () {
                        var e;
                        if (b.params.watchSlidesVisibility) b.wrapper.children("." + b.params.slideVisibleClass).each(function () {
                            b.lazy.loadImageInSlide(a(this).index())
                        }); else if (b.params.slidesPerView > 1)for (e = b.activeIndex; e < b.activeIndex + b.params.slidesPerView; e++)b.slides[e] && b.lazy.loadImageInSlide(e); else b.lazy.loadImageInSlide(b.activeIndex);
                        if (b.params.lazyLoadingInPrevNext)if (b.params.slidesPerView > 1 || b.params.lazyLoadingInPrevNextAmount && b.params.lazyLoadingInPrevNextAmount > 1) {
                            var t = b.params.lazyLoadingInPrevNextAmount, r = b.params.slidesPerView,
                                i = Math.min(b.activeIndex + r + Math.max(t, r), b.slides.length),
                                s = Math.max(b.activeIndex - Math.max(r, t), 0);
                            for (e = b.activeIndex + b.params.slidesPerView; i > e; e++)b.slides[e] && b.lazy.loadImageInSlide(e);
                            for (e = s; e < b.activeIndex; e++)b.slides[e] && b.lazy.loadImageInSlide(e)
                        } else {
                            var n = b.wrapper.children("." + b.params.slideNextClass);
                            n.length > 0 && b.lazy.loadImageInSlide(n.index());
                            var o = b.wrapper.children("." + b.params.slidePrevClass);
                            o.length > 0 && b.lazy.loadImageInSlide(o.index())
                        }
                    }, onTransitionStart: function () {
                        b.params.lazyLoading && (b.params.lazyLoadingOnTransitionStart || !b.params.lazyLoadingOnTransitionStart && !b.lazy.initialImageLoaded) && b.lazy.load()
                    }, onTransitionEnd: function () {
                        b.params.lazyLoading && !b.params.lazyLoadingOnTransitionStart && b.lazy.load()
                    }
                }, b.scrollbar = {
                    isTouched: !1, setDragPosition: function (e) {
                        var a = b.scrollbar,
                            t = b.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
                            r = t - a.track.offset()[b.isHorizontal() ? "left" : "top"] - a.dragSize / 2,
                            i = -b.minTranslate() * a.moveDivider, s = -b.maxTranslate() * a.moveDivider;
                        i > r ? r = i : r > s && (r = s), r = -r / a.moveDivider, b.updateProgress(r), b.setWrapperTranslate(r, !0)
                    }, dragStart: function (e) {
                        var a = b.scrollbar;
                        a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a.dragTimeout), a.track.transition(0), b.params.scrollbarHide && a.track.css("opacity", 1), b.wrapper.transition(100), a.drag.transition(100), b.emit("onScrollbarDragStart", b)
                    }, dragMove: function (e) {
                        var a = b.scrollbar;
                        a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), b.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), b.emit("onScrollbarDragMove", b))
                    }, dragEnd: function () {
                        var e = b.scrollbar;
                        e.isTouched && (e.isTouched = !1, b.params.scrollbarHide && (clearTimeout(e.dragTimeout), e.dragTimeout = setTimeout(function () {
                            e.track.css("opacity", 0), e.track.transition(400)
                        }, 1e3)), b.emit("onScrollbarDragEnd", b), b.params.scrollbarSnapOnRelease && b.slideReset())
                    }, enableDraggable: function () {
                        var e = b.scrollbar, t = b.support.touch ? e.track : document;
                        a(e.track).on(b.touchEvents.start, e.dragStart), a(t).on(b.touchEvents.move, e.dragMove), a(t).on(b.touchEvents.end, e.dragEnd)
                    }, disableDraggable: function () {
                        var e = b.scrollbar, t = b.support.touch ? e.track : document;
                        a(e.track).off(b.touchEvents.start, e.dragStart), a(t).off(b.touchEvents.move, e.dragMove), a(t).off(b.touchEvents.end, e.dragEnd)
                    }, set: function () {
                        if (b.params.scrollbar) {
                            var e = b.scrollbar;
                            e.track = a(b.params.scrollbar), b.params.uniqueNavElements && "string" == typeof b.params.scrollbar && e.track.length > 1 && 1 === b.container.find(b.params.scrollbar).length && (e.track = b.container.find(b.params.scrollbar)), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = a('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = b.isHorizontal() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = b.size / b.virtualSize, e.moveDivider = e.divider * (e.trackSize / b.size), e.dragSize = e.trackSize * e.divider, b.isHorizontal() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.track[0].style.display = e.divider >= 1 ? "none" : "", b.params.scrollbarHide && (e.track[0].style.opacity = 0)
                        }
                    }, setTranslate: function () {
                        if (b.params.scrollbar) {
                            var e, a = b.scrollbar, t = (b.translate || 0, a.dragSize);
                            e = (a.trackSize - a.dragSize) * b.progress, b.rtl && b.isHorizontal() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : 0 > e ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), b.isHorizontal() ? (a.drag.transform(b.support.transforms3d ? "translate3d(" + e + "px, 0, 0)" : "translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (a.drag.transform(b.support.transforms3d ? "translate3d(0px, " + e + "px, 0)" : "translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), b.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function () {
                                a.track[0].style.opacity = 0, a.track.transition(400)
                            }, 1e3))
                        }
                    }, setTransition: function (e) {
                        b.params.scrollbar && b.scrollbar.drag.transition(e)
                    }
                }, b.controller = {
                    LinearSpline: function (e, a) {
                        this.x = e, this.y = a, this.lastIndex = e.length - 1;
                        var t, r;
                        this.x.length, this.interpolate = function (e) {
                            return e ? (r = i(this.x, e), t = r - 1, (e - this.x[t]) * (this.y[r] - this.y[t]) / (this.x[r] - this.x[t]) + this.y[t]) : 0
                        };
                        var i = function () {
                            var e, a, t;
                            return function (r, i) {
                                for (a = -1, e = r.length; e - a > 1;)r[t = e + a >> 1] <= i ? a = t : e = t;
                                return e
                            }
                        }()
                    }, getInterpolateFunction: function (e) {
                        b.controller.spline || (b.controller.spline = b.params.loop ? new b.controller.LinearSpline(b.slidesGrid, e.slidesGrid) : new b.controller.LinearSpline(b.snapGrid, e.snapGrid))
                    }, setTranslate: function (e, a) {
                        function r(a) {
                            e = a.rtl && "horizontal" === a.params.direction ? -b.translate : b.translate, "slide" === b.params.controlBy && (b.controller.getInterpolateFunction(a), s = -b.controller.spline.interpolate(-e)), s && "container" !== b.params.controlBy || (i = (a.maxTranslate() - a.minTranslate()) / (b.maxTranslate() - b.minTranslate()), s = (e - b.minTranslate()) * i + a.minTranslate()), b.params.controlInverse && (s = a.maxTranslate() - s), a.updateProgress(s), a.setWrapperTranslate(s, !1, b), a.updateActiveIndex()
                        }

                        var i, s, n = b.params.control;
                        if (b.isArray(n))for (var o = 0; o < n.length; o++)n[o] !== a && n[o] instanceof t && r(n[o]); else n instanceof t && a !== n && r(n)
                    }, setTransition: function (e, a) {
                        function r(a) {
                            a.setWrapperTransition(e, b), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function () {
                                s && (a.params.loop && "slide" === b.params.controlBy && a.fixLoop(), a.onTransitionEnd())
                            }))
                        }

                        var i, s = b.params.control;
                        if (b.isArray(s))for (i = 0; i < s.length; i++)s[i] !== a && s[i] instanceof t && r(s[i]); else s instanceof t && a !== s && r(s)
                    }
                }, b.hashnav = {
                    init: function () {
                        if (b.params.hashnav) {
                            b.hashnav.initialized = !0;
                            var e = document.location.hash.replace("#", "");
                            if (e)for (var a = 0, t = 0, r = b.slides.length; r > t; t++) {
                                var i = b.slides.eq(t), s = i.attr("data-hash");
                                if (s === e && !i.hasClass(b.params.slideDuplicateClass)) {
                                    var n = i.index();
                                    b.slideTo(n, a, b.params.runCallbacksOnInit, !0)
                                }
                            }
                        }
                    }, setHash: function () {
                        b.hashnav.initialized && b.params.hashnav && (document.location.hash = b.slides.eq(b.activeIndex).attr("data-hash") || "")
                    }
                }, b.disableKeyboardControl = function () {
                    b.params.keyboardControl = !1, a(document).off("keydown", p)
                }, b.enableKeyboardControl = function () {
                    b.params.keyboardControl = !0, a(document).on("keydown", p)
                }, b.mousewheel = {
                    event: !1,
                    lastScrollTime: (new window.Date).getTime()
                }, b.params.mousewheelControl) {
                try {
                    new window.WheelEvent("wheel"), b.mousewheel.event = "wheel"
                } catch (N) {
                    (window.WheelEvent || b.container[0] && "wheel" in b.container[0]) && (b.mousewheel.event = "wheel")
                }
                !b.mousewheel.event && window.WheelEvent, b.mousewheel.event || void 0 === document.onmousewheel || (b.mousewheel.event = "mousewheel"), b.mousewheel.event || (b.mousewheel.event = "DOMMouseScroll")
            }
            b.disableMousewheelControl = function () {
                return b.mousewheel.event ? (b.container.off(b.mousewheel.event, d), !0) : !1
            }, b.enableMousewheelControl = function () {
                return b.mousewheel.event ? (b.container.on(b.mousewheel.event, d), !0) : !1
            }, b.parallax = {
                setTranslate: function () {
                    b.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                        u(this, b.progress)
                    }), b.slides.each(function () {
                        var e = a(this);
                        e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                            var a = Math.min(Math.max(e[0].progress, -1), 1);
                            u(this, a)
                        })
                    })
                }, setTransition: function (e) {
                    "undefined" == typeof e && (e = b.params.speed), b.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                        var t = a(this), r = parseInt(t.attr("data-swiper-parallax-duration"), 10) || e;
                        0 === e && (r = 0), t.transition(r)
                    })
                }
            }, b._plugins = [];
            for (var R in b.plugins) {
                var W = b.plugins[R](b, b.params[R]);
                W && b._plugins.push(W)
            }
            return b.callPlugins = function (e) {
                for (var a = 0; a < b._plugins.length; a++)e in b._plugins[a] && b._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, b.emitterEventListeners = {}, b.emit = function (e) {
                b.params[e] && b.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                var a;
                if (b.emitterEventListeners[e])for (a = 0; a < b.emitterEventListeners[e].length; a++)b.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                b.callPlugins && b.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, b.on = function (e, a) {
                return e = c(e), b.emitterEventListeners[e] || (b.emitterEventListeners[e] = []), b.emitterEventListeners[e].push(a), b
            }, b.off = function (e, a) {
                var t;
                if (e = c(e), "undefined" == typeof a)return b.emitterEventListeners[e] = [], b;
                if (b.emitterEventListeners[e] && 0 !== b.emitterEventListeners[e].length) {
                    for (t = 0; t < b.emitterEventListeners[e].length; t++)b.emitterEventListeners[e][t] === a && b.emitterEventListeners[e].splice(t, 1);
                    return b
                }
            }, b.once = function (e, a) {
                e = c(e);
                var t = function () {
                    a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), b.off(e, t)
                };
                return b.on(e, t), b
            }, b.a11y = {
                makeFocusable: function (e) {
                    return e.attr("tabIndex", "0"), e
                },
                addRole: function (e, a) {
                    return e.attr("role", a), e
                },
                addLabel: function (e, a) {
                    return e.attr("aria-label", a), e
                },
                disable: function (e) {
                    return e.attr("aria-disabled", !0), e
                },
                enable: function (e) {
                    return e.attr("aria-disabled", !1), e
                },
                onEnterKey: function (e) {
                    13 === e.keyCode && (a(e.target).is(b.params.nextButton) ? (b.onClickNext(e), b.a11y.notify(b.isEnd ? b.params.lastSlideMessage : b.params.nextSlideMessage)) : a(e.target).is(b.params.prevButton) && (b.onClickPrev(e), b.a11y.notify(b.isBeginning ? b.params.firstSlideMessage : b.params.prevSlideMessage)), a(e.target).is("." + b.params.bulletClass) && a(e.target)[0].click())
                },
                liveRegion: a('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function (e) {
                    var a = b.a11y.liveRegion;
                    0 !== a.length && (a.html(""), a.html(e))
                },
                init: function () {
                    b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.a11y.makeFocusable(b.nextButton), b.a11y.addRole(b.nextButton, "button"), b.a11y.addLabel(b.nextButton, b.params.nextSlideMessage)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.a11y.makeFocusable(b.prevButton), b.a11y.addRole(b.prevButton, "button"), b.a11y.addLabel(b.prevButton, b.params.prevSlideMessage)), a(b.container).append(b.a11y.liveRegion)
                },
                initPagination: function () {
                    b.params.pagination && b.params.paginationClickable && b.bullets && b.bullets.length && b.bullets.each(function () {
                        var e = a(this);
                        b.a11y.makeFocusable(e), b.a11y.addRole(e, "button"), b.a11y.addLabel(e, b.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1))
                    })
                },
                destroy: function () {
                    b.a11y.liveRegion && b.a11y.liveRegion.length > 0 && b.a11y.liveRegion.remove()
                }
            }, b.init = function () {
                b.params.loop && b.createLoop(), b.updateContainerSize(), b.updateSlidesSize(), b.updatePagination(), b.params.scrollbar && b.scrollbar && (b.scrollbar.set(), b.params.scrollbarDraggable && b.scrollbar.enableDraggable()), "slide" !== b.params.effect && b.effects[b.params.effect] && (b.params.loop || b.updateProgress(), b.effects[b.params.effect].setTranslate()), b.params.loop ? b.slideTo(b.params.initialSlide + b.loopedSlides, 0, b.params.runCallbacksOnInit) : (b.slideTo(b.params.initialSlide, 0, b.params.runCallbacksOnInit), 0 === b.params.initialSlide && (b.parallax && b.params.parallax && b.parallax.setTranslate(), b.lazy && b.params.lazyLoading && (b.lazy.load(), b.lazy.initialImageLoaded = !0))), b.attachEvents(), b.params.observer && b.support.observer && b.initObservers(), b.params.preloadImages && !b.params.lazyLoading && b.preloadImages(), b.params.autoplay && b.startAutoplay(), b.params.keyboardControl && b.enableKeyboardControl && b.enableKeyboardControl(), b.params.mousewheelControl && b.enableMousewheelControl && b.enableMousewheelControl(), b.params.hashnav && b.hashnav && b.hashnav.init(), b.params.a11y && b.a11y && b.a11y.init(), b.emit("onInit", b)
            }, b.cleanupStyles = function () {
                b.container.removeClass(b.classNames.join(" ")).removeAttr("style"), b.wrapper.removeAttr("style"), b.slides && b.slides.length && b.slides.removeClass([b.params.slideVisibleClass, b.params.slideActiveClass, b.params.slideNextClass, b.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), b.paginationContainer && b.paginationContainer.length && b.paginationContainer.removeClass(b.params.paginationHiddenClass), b.bullets && b.bullets.length && b.bullets.removeClass(b.params.bulletActiveClass), b.params.prevButton && a(b.params.prevButton).removeClass(b.params.buttonDisabledClass), b.params.nextButton && a(b.params.nextButton).removeClass(b.params.buttonDisabledClass), b.params.scrollbar && b.scrollbar && (b.scrollbar.track && b.scrollbar.track.length && b.scrollbar.track.removeAttr("style"), b.scrollbar.drag && b.scrollbar.drag.length && b.scrollbar.drag.removeAttr("style"))
            }, b.destroy = function (e, a) {
                b.detachEvents(), b.stopAutoplay(), b.params.scrollbar && b.scrollbar && b.params.scrollbarDraggable && b.scrollbar.disableDraggable(), b.params.loop && b.destroyLoop(), a && b.cleanupStyles(), b.disconnectObservers(), b.params.keyboardControl && b.disableKeyboardControl && b.disableKeyboardControl(), b.params.mousewheelControl && b.disableMousewheelControl && b.disableMousewheelControl(), b.params.a11y && b.a11y && b.a11y.destroy(), b.emit("onDestroy"), e !== !1 && (b = null)
            }, b.init(), b
        }
    };
    t.prototype = {
        isSafari: function () {
            var e = navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function (e) {
            return "[object Array]" === Object.prototype.toString.apply(e)
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1
        },
        device: function () {
            var e = navigator.userAgent, a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                t = e.match(/(iPad).*OS\s([\d_]+)/), r = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                i = !t && e.match(/(iPhone\sOS)\s([\d_]+)/);
            return {ios: t || i || r, android: a}
        }(),
        support: {
            touch: window.Modernizr && Modernizr.touch === !0 || function () {
                return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
            }(), transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function () {
                var e = document.createElement("div").style;
                return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
            }(), flexbox: function () {
                for (var e = document.createElement("div").style,
                         a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "),
                         t = 0; t < a.length; t++)if (a[t] in e)return !0
            }(), observer: function () {
                return "MutationObserver" in window || "WebkitMutationObserver" in window
            }()
        },
        plugins: {}
    };
    for (var r = (function () {
        var e = function (e) {
            var a = this, t = 0;
            for (t = 0; t < e.length; t++)a[t] = e[t];
            return a.length = e.length, this
        }, a = function (a, t) {
            var r = [], i = 0;
            if (a && !t && a instanceof e)return a;
            if (a)if ("string" == typeof a) {
                var s, n, o = a.trim();
                if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
                    var l = "div";
                    for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), (0 === o.indexOf("<td") || 0 === o.indexOf("<th")) && (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), n = document.createElement(l), n.innerHTML = a, i = 0; i < n.childNodes.length; i++)r.push(n.childNodes[i])
                } else for (s = t || "#" !== a[0] || a.match(/[ .<>:~]/) ? (t || document).querySelectorAll(a) : [document.getElementById(a.split("#")[1])], i = 0; i < s.length; i++)s[i] && r.push(s[i])
            } else if (a.nodeType || a === window || a === document) r.push(a); else if (a.length > 0 && a[0].nodeType)for (i = 0; i < a.length; i++)r.push(a[i]);
            return new e(r)
        };
        return e.prototype = {
            addClass: function (e) {
                if ("undefined" == typeof e)return this;
                for (var a = e.split(" "),
                         t = 0; t < a.length; t++)for (var r = 0; r < this.length; r++)this[r].classList.add(a[t]);
                return this
            }, removeClass: function (e) {
                for (var a = e.split(" "),
                         t = 0; t < a.length; t++)for (var r = 0; r < this.length; r++)this[r].classList.remove(a[t]);
                return this
            }, hasClass: function (e) {
                return this[0] ? this[0].classList.contains(e) : !1
            }, toggleClass: function (e) {
                for (var a = e.split(" "),
                         t = 0; t < a.length; t++)for (var r = 0; r < this.length; r++)this[r].classList.toggle(a[t]);
                return this
            }, attr: function (e, a) {
                if (1 === arguments.length && "string" == typeof e)return this[0] ? this[0].getAttribute(e) : void 0;
                for (var t = 0; t < this.length; t++)if (2 === arguments.length) this[t].setAttribute(e, a); else for (var r in e)this[t][r] = e[r], this[t].setAttribute(r, e[r]);
                return this
            }, removeAttr: function (e) {
                for (var a = 0; a < this.length; a++)this[a].removeAttribute(e);
                return this
            }, data: function (e, a) {
                if ("undefined" != typeof a) {
                    for (var t = 0; t < this.length; t++) {
                        var r = this[t];
                        r.dom7ElementDataStorage || (r.dom7ElementDataStorage = {}), r.dom7ElementDataStorage[e] = a
                    }
                    return this
                }
                if (this[0]) {
                    var i = this[0].getAttribute("data-" + e);
                    return i ? i : this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0
                }
            }, transform: function (e) {
                for (var a = 0; a < this.length; a++) {
                    var t = this[a].style;
                    t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
                }
                return this
            }, transition: function (e) {
                "string" != typeof e && (e += "ms");
                for (var a = 0; a < this.length; a++) {
                    var t = this[a].style;
                    t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
                }
                return this
            }, on: function (e, t, r, i) {
                function s(e) {
                    var i = e.target;
                    if (a(i).is(t)) r.call(i, e); else for (var s = a(i).parents(),
                                                                n = 0; n < s.length; n++)a(s[n]).is(t) && r.call(s[n], e)
                }

                var n, o, l = e.split(" ");
                for (n = 0; n < this.length; n++)if ("function" == typeof t || t === !1)for ("function" == typeof t && (r = arguments[1], i = arguments[2] || !1), o = 0; o < l.length; o++)this[n].addEventListener(l[o], r, i); else for (o = 0; o < l.length; o++)this[n].dom7LiveListeners || (this[n].dom7LiveListeners = []), this[n].dom7LiveListeners.push({
                    listener: r,
                    liveListener: s
                }), this[n].addEventListener(l[o], s, i);
                return this
            }, off: function (e, a, t, r) {
                for (var i = e.split(" "),
                         s = 0; s < i.length; s++)for (var n = 0; n < this.length; n++)if ("function" == typeof a || a === !1) "function" == typeof a && (t = arguments[1], r = arguments[2] || !1), this[n].removeEventListener(i[s], t, r); else if (this[n].dom7LiveListeners)for (var o = 0; o < this[n].dom7LiveListeners.length; o++)this[n].dom7LiveListeners[o].listener === t && this[n].removeEventListener(i[s], this[n].dom7LiveListeners[o].liveListener, r);
                return this
            }, once: function (e, a, t, r) {
                function i(n) {
                    t(n), s.off(e, a, i, r)
                }

                var s = this;
                "function" == typeof a && (a = !1, t = arguments[1], r = arguments[2]), s.on(e, a, i, r)
            }, trigger: function (e, a) {
                for (var t = 0; t < this.length; t++) {
                    var r;
                    try {
                        r = new window.CustomEvent(e, {detail: a, bubbles: !0, cancelable: !0})
                    } catch (i) {
                        r = document.createEvent("Event"), r.initEvent(e, !0, !0), r.detail = a
                    }
                    this[t].dispatchEvent(r)
                }
                return this
            }, transitionEnd: function (e) {
                function a(s) {
                    if (s.target === this)for (e.call(this, s), t = 0; t < r.length; t++)i.off(r[t], a)
                }

                var t,
                    r = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                    i = this;
                if (e)for (t = 0; t < r.length; t++)i.on(r[t], a);
                return this
            }, width: function () {
                return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
            }, outerWidth: function (e) {
                return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
            }, height: function () {
                return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null
            }, outerHeight: function (e) {
                return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
            }, offset: function () {
                if (this.length > 0) {
                    var e = this[0], a = e.getBoundingClientRect(), t = document.body,
                        r = e.clientTop || t.clientTop || 0, i = e.clientLeft || t.clientLeft || 0,
                        s = window.pageYOffset || e.scrollTop, n = window.pageXOffset || e.scrollLeft;
                    return {top: a.top + s - r, left: a.left + n - i}
                }
                return null
            }, css: function (e, a) {
                var t;
                if (1 === arguments.length) {
                    if ("string" != typeof e) {
                        for (t = 0; t < this.length; t++)for (var r in e)this[t].style[r] = e[r];
                        return this
                    }
                    if (this[0])return window.getComputedStyle(this[0], null).getPropertyValue(e)
                }
                if (2 === arguments.length && "string" == typeof e) {
                    for (t = 0; t < this.length; t++)this[t].style[e] = a;
                    return this
                }
                return this
            }, each: function (e) {
                for (var a = 0; a < this.length; a++)e.call(this[a], a, this[a]);
                return this
            }, html: function (e) {
                if ("undefined" == typeof e)return this[0] ? this[0].innerHTML : void 0;
                for (var a = 0; a < this.length; a++)this[a].innerHTML = e;
                return this
            }, text: function (e) {
                if ("undefined" == typeof e)return this[0] ? this[0].textContent.trim() : null;
                for (var a = 0; a < this.length; a++)this[a].textContent = e;
                return this
            }, is: function (t) {
                if (!this[0])return !1;
                var r, i;
                if ("string" == typeof t) {
                    var s = this[0];
                    if (s === document)return t === document;
                    if (s === window)return t === window;
                    if (s.matches)return s.matches(t);
                    if (s.webkitMatchesSelector)return s.webkitMatchesSelector(t);
                    if (s.mozMatchesSelector)return s.mozMatchesSelector(t);
                    if (s.msMatchesSelector)return s.msMatchesSelector(t);
                    for (r = a(t), i = 0; i < r.length; i++)if (r[i] === this[0])return !0;
                    return !1
                }
                if (t === document)return this[0] === document;
                if (t === window)return this[0] === window;
                if (t.nodeType || t instanceof e) {
                    for (r = t.nodeType ? [t] : t, i = 0; i < r.length; i++)if (r[i] === this[0])return !0;
                    return !1
                }
                return !1
            }, index: function () {
                if (this[0]) {
                    for (var e = this[0], a = 0; null !== (e = e.previousSibling);)1 === e.nodeType && a++;
                    return a
                }
            }, eq: function (a) {
                if ("undefined" == typeof a)return this;
                var t, r = this.length;
                return a > r - 1 ? new e([]) : 0 > a ? (t = r + a, new e(0 > t ? [] : [this[t]])) : new e([this[a]])
            }, append: function (a) {
                var t, r;
                for (t = 0; t < this.length; t++)if ("string" == typeof a) {
                    var i = document.createElement("div");
                    for (i.innerHTML = a; i.firstChild;)this[t].appendChild(i.firstChild)
                } else if (a instanceof e)for (r = 0; r < a.length; r++)this[t].appendChild(a[r]); else this[t].appendChild(a);
                return this
            }, prepend: function (a) {
                var t, r;
                for (t = 0; t < this.length; t++)if ("string" == typeof a) {
                    var i = document.createElement("div");
                    for (i.innerHTML = a, r = i.childNodes.length - 1; r >= 0; r--)this[t].insertBefore(i.childNodes[r], this[t].childNodes[0])
                } else if (a instanceof e)for (r = 0; r < a.length; r++)this[t].insertBefore(a[r], this[t].childNodes[0]); else this[t].insertBefore(a, this[t].childNodes[0]);
                return this
            }, insertBefore: function (e) {
                for (var t = a(e),
                         r = 0; r < this.length; r++)if (1 === t.length) t[0].parentNode.insertBefore(this[r], t[0]); else if (t.length > 1)for (var i = 0; i < t.length; i++)t[i].parentNode.insertBefore(this[r].cloneNode(!0), t[i])
            }, insertAfter: function (e) {
                for (var t = a(e),
                         r = 0; r < this.length; r++)if (1 === t.length) t[0].parentNode.insertBefore(this[r], t[0].nextSibling); else if (t.length > 1)for (var i = 0; i < t.length; i++)t[i].parentNode.insertBefore(this[r].cloneNode(!0), t[i].nextSibling)
            }, next: function (t) {
                return new e(this.length > 0 ? t ? this[0].nextElementSibling && a(this[0].nextElementSibling).is(t) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
            }, nextAll: function (t) {
                var r = [], i = this[0];
                if (!i)return new e([]);
                for (; i.nextElementSibling;) {
                    var s = i.nextElementSibling;
                    t ? a(s).is(t) && r.push(s) : r.push(s), i = s
                }
                return new e(r)
            }, prev: function (t) {
                return new e(this.length > 0 ? t ? this[0].previousElementSibling && a(this[0].previousElementSibling).is(t) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : [])
            }, prevAll: function (t) {
                var r = [], i = this[0];
                if (!i)return new e([]);
                for (; i.previousElementSibling;) {
                    var s = i.previousElementSibling;
                    t ? a(s).is(t) && r.push(s) : r.push(s), i = s
                }
                return new e(r)
            }, parent: function (e) {
                for (var t = [],
                         r = 0; r < this.length; r++)e ? a(this[r].parentNode).is(e) && t.push(this[r].parentNode) : t.push(this[r].parentNode);
                return a(a.unique(t))
            }, parents: function (e) {
                for (var t = [],
                         r = 0; r < this.length; r++)for (var i = this[r].parentNode; i;)e ? a(i).is(e) && t.push(i) : t.push(i), i = i.parentNode;
                return a(a.unique(t))
            }, find: function (a) {
                for (var t = [], r = 0; r < this.length; r++)for (var i = this[r].querySelectorAll(a),
                                                                      s = 0; s < i.length; s++)t.push(i[s]);
                return new e(t)
            }, children: function (t) {
                for (var r = [], i = 0; i < this.length; i++)for (var s = this[i].childNodes,
                                                                      n = 0; n < s.length; n++)t ? 1 === s[n].nodeType && a(s[n]).is(t) && r.push(s[n]) : 1 === s[n].nodeType && r.push(s[n]);
                return new e(a.unique(r))
            }, remove: function () {
                for (var e = 0; e < this.length; e++)this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                return this
            }, add: function () {
                var e, t, r = this;
                for (e = 0; e < arguments.length; e++) {
                    var i = a(arguments[e]);
                    for (t = 0; t < i.length; t++)r[r.length] = i[t], r.length++
                }
                return r
            }
        }, a.fn = e.prototype, a.unique = function (e) {
            for (var a = [], t = 0; t < e.length; t++)-1 === a.indexOf(e[t]) && a.push(e[t]);
            return a
        }, a
    }()), i = ["jQuery", "Zepto", "Dom7"], s = 0; s < i.length; s++)window[i[s]] && e(window[i[s]]);
    var n;
    n = "undefined" == typeof r ? window.Dom7 || window.Zepto || window.jQuery : r, n && ("transitionEnd" in n.fn || (n.fn.transitionEnd = function (e) {
        function a(s) {
            if (s.target === this)for (e.call(this, s), t = 0; t < r.length; t++)i.off(r[t], a)
        }

        var t, r = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            i = this;
        if (e)for (t = 0; t < r.length; t++)i.on(r[t], a);
        return this
    }), "transform" in n.fn || (n.fn.transform = function (e) {
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
        }
        return this
    }), "transition" in n.fn || (n.fn.transition = function (e) {
        "string" != typeof e && (e += "ms");
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
        }
        return this
    })), window.Swiper = t
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define("widget/home/swiper/swiper", ["require"], function () {
        "use strict";
        return window.Swiper
    });
;/*!/static/lib/jquery.range.js*/
!function (t, i, s, o) {
    "use strict";
    var e = function () {
        return this.init.apply(this, arguments)
    };
    e.prototype = {
        defaults: {
            onstatechange: function () {
            },
            ondragend: function () {
            },
            onbarclicked: function () {
            },
            isRange: !1,
            showLabels: !0,
            showScale: !0,
            step: 1,
            format: "%s",
            theme: "theme-green",
            width: 300,
            disable: !1,
            snap: !1
        },
        template: '<div class="slider-container">			<div class="back-bar">                <div class="selected-bar"></div>                <div class="pointer low"></div><div class="pointer-label low">123456</div>                <div class="pointer high"></div><div class="pointer-label high">456789</div>                <div class="clickable-dummy"></div>            </div>            <div class="scale"></div>		</div>',
        init: function (i, s) {
            this.options = t.extend({}, this.defaults, s), this.inputNode = t(i), this.options.value = this.inputNode.val() || (this.options.isRange ? this.options.from + "," + this.options.from : this.options.from), this.domNode = t(this.template), this.domNode.addClass(this.options.theme), this.inputNode.after(this.domNode), this.domNode.on("change", this.onChange), this.pointers = t(".pointer", this.domNode), this.lowPointer = this.pointers.first(), this.highPointer = this.pointers.last(), this.labels = t(".pointer-label", this.domNode), this.lowLabel = this.labels.first(), this.highLabel = this.labels.last(), this.scale = t(".scale", this.domNode), this.bar = t(".selected-bar", this.domNode), this.clickableBar = this.domNode.find(".clickable-dummy"), this.interval = this.options.to - this.options.from, this.render()
        },
        render: function () {
            return 0 !== this.inputNode.width() || this.options.width ? (this.options.width = this.options.width || this.inputNode.width(), this.domNode.width(this.options.width), this.inputNode.hide(), this.isSingle() && (this.lowPointer.hide(), this.lowLabel.hide()), this.options.showLabels || this.labels.hide(), this.attachEvents(), this.options.showScale && this.renderScale(), void this.setValue(this.options.value)) : void console.log("jRange : no width found, returning")
        },
        isSingle: function () {
            return "number" == typeof this.options.value ? !0 : -1 !== this.options.value.indexOf(",") || this.options.isRange ? !1 : !0
        },
        attachEvents: function () {
            this.clickableBar.click(t.proxy(this.barClicked, this)), this.pointers.on("mousedown touchstart", t.proxy(this.onDragStart, this)), this.pointers.bind("dragstart", function (t) {
                t.preventDefault()
            })
        },
        onDragStart: function (i) {
            if (!(this.options.disable || "mousedown" === i.type && 1 !== i.which)) {
                i.stopPropagation(), i.preventDefault();
                var o = t(i.target);
                this.pointers.removeClass("last-active"), o.addClass("focused last-active"), this[(o.hasClass("low") ? "low" : "high") + "Label"].addClass("focused"), t(s).on("mousemove.slider touchmove.slider", t.proxy(this.onDrag, this, o)), t(s).on("mouseup.slider touchend.slider touchcancel.slider", t.proxy(this.onDragEnd, this))
            }
        },
        onDrag: function (t, i) {
            i.stopPropagation(), i.preventDefault(), i.originalEvent.touches && i.originalEvent.touches.length ? i = i.originalEvent.touches[0] : i.originalEvent.changedTouches && i.originalEvent.changedTouches.length && (i = i.originalEvent.changedTouches[0]);
            var s = i.clientX - this.domNode.offset().left;
            this.domNode.trigger("change", [this, t, s])
        },
        onDragEnd: function () {
            this.pointers.removeClass("focused").trigger("rangeslideend"), this.labels.removeClass("focused"), t(s).off(".slider"), this.options.ondragend.call(this, this.options.value)
        },
        barClicked: function (t) {
            if (!this.options.disable) {
                var i = t.pageX - this.clickableBar.offset().left;
                if (this.isSingle()) this.setPosition(this.pointers.last(), i, !0, !0); else {
                    var s, o = Math.abs(parseFloat(this.pointers.first().css("left"), 10)),
                        e = this.pointers.first().width() / 2,
                        n = Math.abs(parseFloat(this.pointers.last().css("left"), 10)),
                        a = this.pointers.first().width() / 2, h = Math.abs(o - i + e), r = Math.abs(n - i + a);
                    s = h == r ? o > i ? this.pointers.first() : this.pointers.last() : r > h ? this.pointers.first() : this.pointers.last(), this.setPosition(s, i, !0, !0)
                }
                this.options.onbarclicked.call(this, this.options.value)
            }
        },
        onChange: function (t, i, s, o) {
            var e, n;
            e = 0, n = i.domNode.width(), i.isSingle() || (e = s.hasClass("high") ? parseFloat(i.lowPointer.css("left")) + i.lowPointer.width() / 2 : 0, n = s.hasClass("low") ? parseFloat(i.highPointer.css("left")) + i.highPointer.width() / 2 : i.domNode.width());
            var a = Math.min(Math.max(o, e), n);
            i.setPosition(s, a, !0)
        },
        setPosition: function (t, i, s, o) {
            var e, n, a = parseFloat(this.lowPointer.css("left")), h = parseFloat(this.highPointer.css("left")) || 0,
                r = this.highPointer.width() / 2;
            if (s || (i = this.prcToPx(i)), this.options.snap) {
                var l = this.correctPositionForSnap(i);
                if (-1 === l)return;
                i = l
            }
            t[0] === this.highPointer[0] ? h = Math.round(i - r) : a = Math.round(i - r), t[o ? "animate" : "css"]({left: Math.round(i - r)}), this.isSingle() ? e = 0 : (e = a + r, n = h + r);
            var d = Math.round(h + r - e);
            this.bar[o ? "animate" : "css"]({
                width: Math.abs(d),
                left: d > 0 ? e : e + d
            }), this.showPointerValue(t, i, o), this.isReadonly()
        },
        correctPositionForSnap: function (t) {
            var i = this.positionToValue(t) - this.options.from,
                s = this.options.width / (this.interval / this.options.step), o = i / this.options.step * s;
            return o + s / 2 >= t && t >= o - s / 2 ? o : -1
        },
        setValue: function (t) {
            var i = t.toString().split(",");
            i[0] = Math.min(Math.max(i[0], this.options.from), this.options.to) + "", i.length > 1 && (i[1] = Math.min(Math.max(i[1], this.options.from), this.options.to) + ""), this.options.value = t;
            var s = this.valuesToPrc(2 === i.length ? i : [0, i[0]]);
            this.isSingle() ? this.setPosition(this.highPointer, s[1]) : (this.setPosition(this.lowPointer, s[0]), this.setPosition(this.highPointer, s[1]))
        },
        renderScale: function () {
            for (var i = this.options.scale || [this.options.from, this.options.to],
                     s = Math.round(100 / (i.length - 1) * 10) / 10, o = "",
                     e = 0; e < i.length; e++)o += '<span style="left: ' + e * s + '%">' + ("|" != i[e] ? "<ins>" + i[e] + "</ins>" : "") + "</span>";
            this.scale.html(o), t("ins", this.scale).each(function () {
                t(this).css({marginLeft: -t(this).outerWidth() / 2})
            })
        },
        getBarWidth: function () {
            var t = this.options.value.split(",");
            return t.length > 1 ? parseFloat(t[1]) - parseFloat(t[0]) : parseFloat(t[0])
        },
        showPointerValue: function (i, s, e) {
            var n, a = t(".pointer-label", this.domNode)[i.hasClass("low") ? "first" : "last"](),
                h = this.positionToValue(s);
            if (t.isFunction(this.options.format)) {
                var r = this.isSingle() ? o : i.hasClass("low") ? "low" : "high";
                n = this.options.format(h, r)
            } else n = this.options.format.replace("%s", h);
            var l = a.html(n).width(), d = s - l / 2;
            d = Math.min(Math.max(d, 0), this.options.width - l), a[e ? "animate" : "css"]({left: d}), this.setInputValue(i, h)
        },
        valuesToPrc: function (t) {
            var i = 100 * (parseFloat(t[0]) - parseFloat(this.options.from)) / this.interval,
                s = 100 * (parseFloat(t[1]) - parseFloat(this.options.from)) / this.interval;
            return [i, s]
        },
        prcToPx: function (t) {
            return this.domNode.width() * t / 100
        },
        isDecimal: function () {
            return -1 === (this.options.value + this.options.from + this.options.to).indexOf(".") ? !1 : !0
        },
        positionToValue: function (t) {
            var i = t / this.domNode.width() * this.interval;
            if (i = parseFloat(i, 10) + parseFloat(this.options.from, 10), this.isDecimal()) {
                var s = Math.round(Math.round(i / this.options.step) * this.options.step * 100) / 100;
                if (0 !== s)for (s = "" + s, -1 === s.indexOf(".") && (s += "."); s.length - s.indexOf(".") < 3;)s += "0"; else s = "0.00";
                return s
            }
            return Math.round(i / this.options.step) * this.options.step
        },
        setInputValue: function (t, i) {
            if (this.isSingle()) this.options.value = i.toString(); else {
                var s = this.options.value.split(",");
                this.options.value = t.hasClass("low") ? i + "," + s[1] : s[0] + "," + i
            }
            this.inputNode.val() !== this.options.value && (this.inputNode.val(this.options.value).trigger("change"), this.options.onstatechange.call(this, this.options.value))
        },
        getValue: function () {
            return this.options.value
        },
        getOptions: function () {
            return this.options
        },
        getRange: function () {
            return this.options.from + "," + this.options.to
        },
        isReadonly: function () {
            this.domNode.toggleClass("slider-readonly", this.options.disable)
        },
        disable: function () {
            this.options.disable = !0, this.isReadonly()
        },
        enable: function () {
            this.options.disable = !1, this.isReadonly()
        },
        toggleDisable: function () {
            this.options.disable = !this.options.disable, this.isReadonly()
        },
        updateRange: function (t, i) {
            var s = t.toString().split(",");
            this.interval = parseInt(s[1]) - parseInt(s[0]), this.setValue(i ? i : this.getValue())
        }
    };
    var n = "jRange";
    t.fn[n] = function (s) {
        var o, a = arguments;
        return this.each(function () {
            var h = t(this), r = t.data(this, "plugin_" + n), l = "object" == typeof s && s;
            r || (h.data("plugin_" + n, r = new e(this, l)), t(i).resize(function () {
                r.setValue(r.getValue())
            })), "string" == typeof s && (o = r[s].apply(r, Array.prototype.slice.call(a, 1)))
        }), o || this
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define("static/lib/jquery.range", ["require"], function () {
        return e
    }) : "undefined" != typeof module && module.exports ? (module.exports = e, module.exports.jRange = e) : i.jRange = e
}(jQuery, window, document);