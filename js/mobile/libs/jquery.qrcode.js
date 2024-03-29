/*! jQuery.qrcode 0.7.0 - //larsjung.de/qrcode - MIT License */ ! function(r) {
    "use strict";
    var t = function(r, t, e, n) {
        var o = y(e, t);
        o.addData(r), o.make(), n = n || 0;
        var i = o.getModuleCount(),
            a = o.getModuleCount() + 2 * n,
            u = function(r, t) {
                return r -= n, t -= n, 0 > r || r >= i || 0 > t || t >= i ? !1 : o.isDark(r, t)
            }, f = function(r, t, e, n) {
                var o = this.isDark,
                    i = 1 / a;
                this.isDark = function(a, u) {
                    var f = u * i,
                        l = a * i,
                        c = f + i,
                        g = l + i;
                    return o(a, u) && (r > c || f > e || t > g || l > n)
                }
            };
        this.text = r, this.level = t, this.version = e, this.moduleCount = a, this.isDark = u, this.addBlank = f
    }, e = function() {
            var r = document.createElement("canvas");
            return !(!r.getContext || !r.getContext("2d"))
        }(),
        n = "[object Opera]" !== Object.prototype.toString.call(window.opera),
        o = function(r, e, n, o, i) {
            n = Math.max(1, n || 1), o = Math.min(40, o || 40);
            for (var a = n; o >= a; a += 1) try {
                return new t(r, e, a, i)
            } catch (u) {}
        }, i = function(t, e, n) {
            var o = n.size,
                i = "bold " + n.mSize * o + "px " + n.fontname,
                a = r("<canvas/>")[0].getContext("2d");
            a.font = i;
            var u = a.measureText(n.label).width,
                f = n.mSize,
                l = u / o,
                c = (1 - l) * n.mPosX,
                g = (1 - f) * n.mPosY,
                s = c + l,
                h = g + f,
                v = .01;
            1 === n.mode ? t.addBlank(0, g - v, o, h + v) : t.addBlank(c - v, g - v, s + v, h + v), e.fillStyle = n.fontcolor, e.font = i, e.fillText(n.label, c * o, g * o + .75 * n.mSize * o)
        }, a = function(r, t, e) {
            var n = e.size,
                o = e.image.naturalWidth || 1,
                i = e.image.naturalHeight || 1,
                a = e.mSize,
                u = a * o / i,
                f = (1 - u) * e.mPosX,
                l = (1 - a) * e.mPosY,
                c = f + u,
                g = l + a,
                s = .01;
            3 === e.mode ? r.addBlank(0, l - s, n, g + s) : r.addBlank(f - s, l - s, c + s, g + s), t.drawImage(e.image, f * n, l * n, u * n, a * n)
        }, u = function(t, e, n) {
            r(n.background).is("img") ? e.drawImage(n.background, 0, 0, n.size, n.size) : n.background && (e.fillStyle = n.background, e.fillRect(n.left, n.top, n.size, n.size));
            var o = n.mode;
            1 === o || 2 === o ? i(t, e, n) : (3 === o || 4 === o) && a(t, e, n)
        }, f = function(r, t, e, n, o, i, a, u) {
            r.isDark(a, u) && t.rect(n, o, i, i)
        }, l = function(r, t, e, n, o, i, a, u, f, l) {
            a ? r.moveTo(t + i, e) : r.moveTo(t, e), u ? (r.lineTo(n - i, e), r.arcTo(n, e, n, o, i)) : r.lineTo(n, e), f ? (r.lineTo(n, o - i), r.arcTo(n, o, t, o, i)) : r.lineTo(n, o), l ? (r.lineTo(t + i, o), r.arcTo(t, o, t, e, i)) : r.lineTo(t, o), a ? (r.lineTo(t, e + i), r.arcTo(t, e, n, e, i)) : r.lineTo(t, e)
        }, c = function(r, t, e, n, o, i, a, u, f, l) {
            a && (r.moveTo(t + i, e), r.lineTo(t, e), r.lineTo(t, e + i), r.arcTo(t, e, t + i, e, i)), u && (r.moveTo(n - i, e), r.lineTo(n, e), r.lineTo(n, e + i), r.arcTo(n, e, n - i, e, i)), f && (r.moveTo(n - i, o), r.lineTo(n, o), r.lineTo(n, o - i), r.arcTo(n, o, n - i, o, i)), l && (r.moveTo(t + i, o), r.lineTo(t, o), r.lineTo(t, o - i), r.arcTo(t, o, t + i, o, i))
        }, g = function(r, t, e, n, o, i, a, u) {
            var f = r.isDark,
                g = n + i,
                s = o + i,
                h = e.radius * i,
                v = a - 1,
                d = a + 1,
                w = u - 1,
                m = u + 1,
                T = f(a, u),
                y = f(v, w),
                p = f(v, u),
                B = f(v, m),
                E = f(a, m),
                k = f(d, m),
                A = f(d, u),
                M = f(d, w),
                D = f(a, w);
            T ? l(t, n, o, g, s, h, !p && !D, !p && !E, !A && !E, !A && !D) : c(t, n, o, g, s, h, p && D && y, p && E && B, A && E && k, A && D && M)
        }, s = function(t, e, o) {
            var i, a, u = t.moduleCount,
                l = o.size / u,
                c = f;
            for (n && o.radius > 0 && o.radius <= .5 && (c = g), e.beginPath(), i = 0; u > i; i += 1)
                for (a = 0; u > a; a += 1) {
                    var s = o.left + a * l,
                        h = o.top + i * l,
                        v = l;
                    c(t, e, o, s, h, v, i, a)
                }
            if (r(o.fill).is("img")) {
                e.strokeStyle = "rgba(0,0,0,0.5)", e.lineWidth = 2, e.stroke();
                var d = e.globalCompositeOperation;
                e.globalCompositeOperation = "destination-out", e.fill(), e.globalCompositeOperation = d, e.clip(), e.drawImage(o.fill, 0, 0, o.size, o.size), e.restore()
            } else e.fillStyle = o.fill, e.fill()
        }, h = function(t, e) {
            var n = o(e.text, e.ecLevel, e.minVersion, e.maxVersion, e.quiet);
            if (!n) return null;
            var i = r(t).data("qrcode", n),
                a = i[0].getContext("2d");
            return u(n, a, e), s(n, a, e), i
        }, v = function(t) {
            var e = r("<canvas/>").attr("width", t.size).attr("height", t.size);
            return h(e, t)
        }, d = function(t) {
            return r("<img/>").attr("src", v(t)[0].toDataURL("image/png"))
        }, w = function(t) {
            var e = o(t.text, t.ecLevel, t.minVersion, t.maxVersion, t.quiet);
            if (!e) return null;
            var n, i, a = t.size,
                u = t.background,
                f = Math.floor,
                l = e.moduleCount,
                c = f(a / l),
                g = f(.5 * (a - c * l)),
                s = {
                    position: "relative",
                    left: 0,
                    top: 0,
                    padding: 0,
                    margin: 0,
                    width: a,
                    height: a
                }, h = {
                    position: "absolute",
                    padding: 0,
                    margin: 0,
                    width: c,
                    height: c,
                    "background-color": t.fill
                }, v = r("<div/>").data("qrcode", e).css(s);
            for (u && v.css("background-color", u), n = 0; l > n; n += 1)
                for (i = 0; l > i; i += 1) e.isDark(n, i) && r("<div/>").css(h).css({
                    left: g + i * c,
                    top: g + n * c
                }).appendTo(v);
            return v
        }, m = function(r) {
            return e && "canvas" === r.render ? v(r) : e && "image" === r.render ? d(r) : w(r)
        }, T = {
            render: "canvas",
            minVersion: 1,
            maxVersion: 40,
            ecLevel: "L",
            left: 0,
            top: 0,
            size: 200,
            fill: "#000",
            background: null,
            text: "no text",
            radius: 0,
            quiet: 0,
            mode: 0,
            mSize: .1,
            mPosX: .5,
            mPosY: .5,
            label: "no label",
            fontname: "sans",
            fontcolor: "#000",
            image: null
        };
    r.fn.qrcode = function(t) {
        var e = r.extend({}, T, t);
        return this.each(function() {
            "canvas" === this.nodeName.toLowerCase() ? h(this, e) : r(this).append(m(e))
        })
    };
    var y = function() {
        function r(t, e) {
            if ("undefined" == typeof t.length) throw new Error(t.length + "/" + e);
            var n = function() {
                for (var r = 0; r < t.length && 0 == t[r];) r += 1;
                for (var n = new Array(t.length - r + e), o = 0; o < t.length - r; o += 1) n[o] = t[o + r];
                return n
            }(),
                o = {};
            return o.get = function(r) {
                return n[r]
            }, o.getLength = function() {
                return n.length
            }, o.multiply = function(t) {
                for (var e = new Array(o.getLength() + t.getLength() - 1), n = 0; n < o.getLength(); n += 1)
                    for (var i = 0; i < t.getLength(); i += 1) e[n + i] ^= a.gexp(a.glog(o.get(n)) + a.glog(t.get(i)));
                return r(e, 0)
            }, o.mod = function(t) {
                if (o.getLength() - t.getLength() < 0) return o;
                for (var e = a.glog(o.get(0)) - a.glog(t.get(0)), n = new Array(o.getLength()), i = 0; i < o.getLength(); i += 1) n[i] = o.get(i);
                for (var i = 0; i < t.getLength(); i += 1) n[i] ^= a.gexp(a.glog(t.get(i)) + e);
                return r(n, 0).mod(t)
            }, o
        }
        var t = function(t, e) {
            var o = 236,
                a = 17,
                c = t,
                g = n[e],
                s = null,
                h = 0,
                d = null,
                w = new Array,
                m = {}, T = function(r, t) {
                    h = 4 * c + 17, s = function(r) {
                        for (var t = new Array(r), e = 0; r > e; e += 1) {
                            t[e] = new Array(r);
                            for (var n = 0; r > n; n += 1) t[e][n] = null
                        }
                        return t
                    }(h), y(0, 0), y(h - 7, 0), y(0, h - 7), E(), B(), A(r, t), c >= 7 && k(r), null == d && (d = C(c, g, w)), M(d, t)
                }, y = function(r, t) {
                    for (var e = -1; 7 >= e; e += 1)
                        if (!(-1 >= r + e || r + e >= h))
                            for (var n = -1; 7 >= n; n += 1) - 1 >= t + n || t + n >= h || (s[r + e][t + n] = e >= 0 && 6 >= e && (0 == n || 6 == n) || n >= 0 && 6 >= n && (0 == e || 6 == e) || e >= 2 && 4 >= e && n >= 2 && 4 >= n ? !0 : !1)
                }, p = function() {
                    for (var r = 0, t = 0, e = 0; 8 > e; e += 1) {
                        T(!0, e);
                        var n = i.getLostPoint(m);
                        (0 == e || r > n) && (r = n, t = e)
                    }
                    return t
                }, B = function() {
                    for (var r = 8; h - 8 > r; r += 1) null == s[r][6] && (s[r][6] = 0 == r % 2);
                    for (var t = 8; h - 8 > t; t += 1) null == s[6][t] && (s[6][t] = 0 == t % 2)
                }, E = function() {
                    for (var r = i.getPatternPosition(c), t = 0; t < r.length; t += 1)
                        for (var e = 0; e < r.length; e += 1) {
                            var n = r[t],
                                o = r[e];
                            if (null == s[n][o])
                                for (var a = -2; 2 >= a; a += 1)
                                    for (var u = -2; 2 >= u; u += 1) s[n + a][o + u] = -2 == a || 2 == a || -2 == u || 2 == u || 0 == a && 0 == u ? !0 : !1
                        }
                }, k = function(r) {
                    for (var t = i.getBCHTypeNumber(c), e = 0; 18 > e; e += 1) {
                        var n = !r && 1 == (1 & t >> e);
                        s[Math.floor(e / 3)][e % 3 + h - 8 - 3] = n
                    }
                    for (var e = 0; 18 > e; e += 1) {
                        var n = !r && 1 == (1 & t >> e);
                        s[e % 3 + h - 8 - 3][Math.floor(e / 3)] = n
                    }
                }, A = function(r, t) {
                    for (var e = g << 3 | t, n = i.getBCHTypeInfo(e), o = 0; 15 > o; o += 1) {
                        var a = !r && 1 == (1 & n >> o);
                        6 > o ? s[o][8] = a : 8 > o ? s[o + 1][8] = a : s[h - 15 + o][8] = a
                    }
                    for (var o = 0; 15 > o; o += 1) {
                        var a = !r && 1 == (1 & n >> o);
                        8 > o ? s[8][h - o - 1] = a : 9 > o ? s[8][15 - o - 1 + 1] = a : s[8][15 - o - 1] = a
                    }
                    s[h - 8][8] = !r
                }, M = function(r, t) {
                    for (var e = -1, n = h - 1, o = 7, a = 0, u = i.getMaskFunction(t), f = h - 1; f > 0; f -= 2)
                        for (6 == f && (f -= 1);;) {
                            for (var l = 0; 2 > l; l += 1)
                                if (null == s[n][f - l]) {
                                    var c = !1;
                                    a < r.length && (c = 1 == (1 & r[a] >>> o));
                                    var g = u(n, f - l);
                                    g && (c = !c), s[n][f - l] = c, o -= 1, -1 == o && (a += 1, o = 7)
                                }
                            if (n += e, 0 > n || n >= h) {
                                n -= e, e = -e;
                                break
                            }
                        }
                }, D = function(t, e) {
                    for (var n = 0, o = 0, a = 0, u = new Array(e.length), f = new Array(e.length), l = 0; l < e.length; l += 1) {
                        var c = e[l].dataCount,
                            g = e[l].totalCount - c;
                        o = Math.max(o, c), a = Math.max(a, g), u[l] = new Array(c);
                        for (var s = 0; s < u[l].length; s += 1) u[l][s] = 255 & t.getBuffer()[s + n];
                        n += c;
                        var h = i.getErrorCorrectPolynomial(g),
                            v = r(u[l], h.getLength() - 1),
                            d = v.mod(h);
                        f[l] = new Array(h.getLength() - 1);
                        for (var s = 0; s < f[l].length; s += 1) {
                            var w = s + d.getLength() - f[l].length;
                            f[l][s] = w >= 0 ? d.get(w) : 0
                        }
                    }
                    for (var m = 0, s = 0; s < e.length; s += 1) m += e[s].totalCount;
                    for (var T = new Array(m), y = 0, s = 0; o > s; s += 1)
                        for (var l = 0; l < e.length; l += 1) s < u[l].length && (T[y] = u[l][s], y += 1);
                    for (var s = 0; a > s; s += 1)
                        for (var l = 0; l < e.length; l += 1) s < f[l].length && (T[y] = f[l][s], y += 1);
                    return T
                }, C = function(r, t, e) {
                    for (var n = u.getRSBlocks(r, t), l = f(), c = 0; c < e.length; c += 1) {
                        var g = e[c];
                        l.put(g.getMode(), 4), l.put(g.getLength(), i.getLengthInBits(g.getMode(), r)), g.write(l)
                    }
                    for (var s = 0, c = 0; c < n.length; c += 1) s += n[c].dataCount;
                    if (l.getLengthInBits() > 8 * s) throw new Error("code length overflow. (" + l.getLengthInBits() + ">" + 8 * s + ")");
                    for (l.getLengthInBits() + 4 <= 8 * s && l.put(0, 4); 0 != l.getLengthInBits() % 8;) l.putBit(!1);
                    for (;;) {
                        if (l.getLengthInBits() >= 8 * s) break;
                        if (l.put(o, 8), l.getLengthInBits() >= 8 * s) break;
                        l.put(a, 8)
                    }
                    return D(l, n)
                };
            return m.addData = function(r) {
                var t = l(r);
                w.push(t), d = null
            }, m.isDark = function(r, t) {
                if (0 > r || r >= h || 0 > t || t >= h) throw new Error(r + "," + t);
                return s[r][t]
            }, m.getModuleCount = function() {
                return h
            }, m.make = function() {
                T(!1, p())
            }, m.createTableTag = function(r, t) {
                r = r || 2, t = "undefined" == typeof t ? 4 * r : t;
                var e = "";
                e += '<table style="', e += " border-width: 0px; border-style: none;", e += " border-collapse: collapse;", e += " padding: 0px; margin: " + t + "px;", e += '">', e += "<tbody>";
                for (var n = 0; n < m.getModuleCount(); n += 1) {
                    e += "<tr>";
                    for (var o = 0; o < m.getModuleCount(); o += 1) e += '<td style="', e += " border-width: 0px; border-style: none;", e += " border-collapse: collapse;", e += " padding: 0px; margin: 0px;", e += " width: " + r + "px;", e += " height: " + r + "px;", e += " background-color: ", e += m.isDark(n, o) ? "#000000" : "#ffffff", e += ";", e += '"/>';
                    e += "</tr>"
                }
                return e += "</tbody>", e += "</table>"
            }, m.createImgTag = function(r, t) {
                r = r || 2, t = "undefined" == typeof t ? 4 * r : t;
                var e = m.getModuleCount() * r + 2 * t,
                    n = t,
                    o = e - t;
                return v(e, e, function(t, e) {
                    if (t >= n && o > t && e >= n && o > e) {
                        var i = Math.floor((t - n) / r),
                            a = Math.floor((e - n) / r);
                        return m.isDark(a, i) ? 0 : 1
                    }
                    return 1
                })
            }, m
        };
        t.stringToBytes = function(r) {
            for (var t = new Array, e = 0; e < r.length; e += 1) {
                var n = r.charCodeAt(e);
                t.push(255 & n)
            }
            return t
        }, t.createStringToBytes = function(r, t) {
            var e = function() {
                for (var e = s(r), n = function() {
                        var r = e.read();
                        if (-1 == r) throw new Error;
                        return r
                    }, o = 0, i = {};;) {
                    var a = e.read();
                    if (-1 == a) break;
                    var u = n(),
                        f = n(),
                        l = n(),
                        c = String.fromCharCode(a << 8 | u),
                        g = f << 8 | l;
                    i[c] = g, o += 1
                }
                if (o != t) throw new Error(o + " != " + t);
                return i
            }(),
                n = "?".charCodeAt(0);
            return function(r) {
                for (var t = new Array, o = 0; o < r.length; o += 1) {
                    var i = r.charCodeAt(o);
                    if (128 > i) t.push(i);
                    else {
                        var a = e[r.charAt(o)];
                        "number" == typeof a ? (255 & a) == a ? t.push(a) : (t.push(a >>> 8), t.push(255 & a)) : t.push(n)
                    }
                }
                return t
            }
        };
        var e = {
            MODE_NUMBER: 1,
            MODE_ALPHA_NUM: 2,
            MODE_8BIT_BYTE: 4,
            MODE_KANJI: 8
        }, n = {
                L: 1,
                M: 0,
                Q: 3,
                H: 2
            }, o = {
                PATTERN000: 0,
                PATTERN001: 1,
                PATTERN010: 2,
                PATTERN011: 3,
                PATTERN100: 4,
                PATTERN101: 5,
                PATTERN110: 6,
                PATTERN111: 7
            }, i = function() {
                var t = [
                    [],
                    [6, 18],
                    [6, 22],
                    [6, 26],
                    [6, 30],
                    [6, 34],
                    [6, 22, 38],
                    [6, 24, 42],
                    [6, 26, 46],
                    [6, 28, 50],
                    [6, 30, 54],
                    [6, 32, 58],
                    [6, 34, 62],
                    [6, 26, 46, 66],
                    [6, 26, 48, 70],
                    [6, 26, 50, 74],
                    [6, 30, 54, 78],
                    [6, 30, 56, 82],
                    [6, 30, 58, 86],
                    [6, 34, 62, 90],
                    [6, 28, 50, 72, 94],
                    [6, 26, 50, 74, 98],
                    [6, 30, 54, 78, 102],
                    [6, 28, 54, 80, 106],
                    [6, 32, 58, 84, 110],
                    [6, 30, 58, 86, 114],
                    [6, 34, 62, 90, 118],
                    [6, 26, 50, 74, 98, 122],
                    [6, 30, 54, 78, 102, 126],
                    [6, 26, 52, 78, 104, 130],
                    [6, 30, 56, 82, 108, 134],
                    [6, 34, 60, 86, 112, 138],
                    [6, 30, 58, 86, 114, 142],
                    [6, 34, 62, 90, 118, 146],
                    [6, 30, 54, 78, 102, 126, 150],
                    [6, 24, 50, 76, 102, 128, 154],
                    [6, 28, 54, 80, 106, 132, 158],
                    [6, 32, 58, 84, 110, 136, 162],
                    [6, 26, 54, 82, 110, 138, 166],
                    [6, 30, 58, 86, 114, 142, 170]
                ],
                    n = 1335,
                    i = 7973,
                    u = 21522,
                    f = {}, l = function(r) {
                        for (var t = 0; 0 != r;) t += 1, r >>>= 1;
                        return t
                    };
                return f.getBCHTypeInfo = function(r) {
                    for (var t = r << 10; l(t) - l(n) >= 0;) t ^= n << l(t) - l(n);
                    return (r << 10 | t) ^ u
                }, f.getBCHTypeNumber = function(r) {
                    for (var t = r << 12; l(t) - l(i) >= 0;) t ^= i << l(t) - l(i);
                    return r << 12 | t
                }, f.getPatternPosition = function(r) {
                    return t[r - 1]
                }, f.getMaskFunction = function(r) {
                    switch (r) {
                        case o.PATTERN000:
                            return function(r, t) {
                                return 0 == (r + t) % 2
                            };
                        case o.PATTERN001:
                            return function(r) {
                                return 0 == r % 2
                            };
                        case o.PATTERN010:
                            return function(r, t) {
                                return 0 == t % 3
                            };
                        case o.PATTERN011:
                            return function(r, t) {
                                return 0 == (r + t) % 3
                            };
                        case o.PATTERN100:
                            return function(r, t) {
                                return 0 == (Math.floor(r / 2) + Math.floor(t / 3)) % 2
                            };
                        case o.PATTERN101:
                            return function(r, t) {
                                return 0 == r * t % 2 + r * t % 3
                            };
                        case o.PATTERN110:
                            return function(r, t) {
                                return 0 == (r * t % 2 + r * t % 3) % 2
                            };
                        case o.PATTERN111:
                            return function(r, t) {
                                return 0 == (r * t % 3 + (r + t) % 2) % 2
                            };
                        default:
                            throw new Error("bad maskPattern:" + r)
                    }
                }, f.getErrorCorrectPolynomial = function(t) {
                    for (var e = r([1], 0), n = 0; t > n; n += 1) e = e.multiply(r([1, a.gexp(n)], 0));
                    return e
                }, f.getLengthInBits = function(r, t) {
                    if (t >= 1 && 10 > t) switch (r) {
                        case e.MODE_NUMBER:
                            return 10;
                        case e.MODE_ALPHA_NUM:
                            return 9;
                        case e.MODE_8BIT_BYTE:
                            return 8;
                        case e.MODE_KANJI:
                            return 8;
                        default:
                            throw new Error("mode:" + r)
                    } else if (27 > t) switch (r) {
                        case e.MODE_NUMBER:
                            return 12;
                        case e.MODE_ALPHA_NUM:
                            return 11;
                        case e.MODE_8BIT_BYTE:
                            return 16;
                        case e.MODE_KANJI:
                            return 10;
                        default:
                            throw new Error("mode:" + r)
                    } else {
                        if (!(41 > t)) throw new Error("type:" + t);
                        switch (r) {
                            case e.MODE_NUMBER:
                                return 14;
                            case e.MODE_ALPHA_NUM:
                                return 13;
                            case e.MODE_8BIT_BYTE:
                                return 16;
                            case e.MODE_KANJI:
                                return 12;
                            default:
                                throw new Error("mode:" + r)
                        }
                    }
                }, f.getLostPoint = function(r) {
                    for (var t = r.getModuleCount(), e = 0, n = 0; t > n; n += 1)
                        for (var o = 0; t > o; o += 1) {
                            for (var i = 0, a = r.isDark(n, o), u = -1; 1 >= u; u += 1)
                                if (!(0 > n + u || n + u >= t))
                                    for (var f = -1; 1 >= f; f += 1) 0 > o + f || o + f >= t || (0 != u || 0 != f) && a == r.isDark(n + u, o + f) && (i += 1);
                            i > 5 && (e += 3 + i - 5)
                        }
                    for (var n = 0; t - 1 > n; n += 1)
                        for (var o = 0; t - 1 > o; o += 1) {
                            var l = 0;
                            r.isDark(n, o) && (l += 1), r.isDark(n + 1, o) && (l += 1), r.isDark(n, o + 1) && (l += 1), r.isDark(n + 1, o + 1) && (l += 1), (0 == l || 4 == l) && (e += 3)
                        }
                    for (var n = 0; t > n; n += 1)
                        for (var o = 0; t - 6 > o; o += 1) r.isDark(n, o) && !r.isDark(n, o + 1) && r.isDark(n, o + 2) && r.isDark(n, o + 3) && r.isDark(n, o + 4) && !r.isDark(n, o + 5) && r.isDark(n, o + 6) && (e += 40);
                    for (var o = 0; t > o; o += 1)
                        for (var n = 0; t - 6 > n; n += 1) r.isDark(n, o) && !r.isDark(n + 1, o) && r.isDark(n + 2, o) && r.isDark(n + 3, o) && r.isDark(n + 4, o) && !r.isDark(n + 5, o) && r.isDark(n + 6, o) && (e += 40);
                    for (var c = 0, o = 0; t > o; o += 1)
                        for (var n = 0; t > n; n += 1) r.isDark(n, o) && (c += 1);
                    var g = Math.abs(100 * c / t / t - 50) / 5;
                    return e += 10 * g
                }, f
            }(),
            a = function() {
                for (var r = new Array(256), t = new Array(256), e = 0; 8 > e; e += 1) r[e] = 1 << e;
                for (var e = 8; 256 > e; e += 1) r[e] = r[e - 4] ^ r[e - 5] ^ r[e - 6] ^ r[e - 8];
                for (var e = 0; 255 > e; e += 1) t[r[e]] = e;
                var n = {};
                return n.glog = function(r) {
                    if (1 > r) throw new Error("glog(" + r + ")");
                    return t[r]
                }, n.gexp = function(t) {
                    for (; 0 > t;) t += 255;
                    for (; t >= 256;) t -= 255;
                    return r[t]
                }, n
            }(),
            u = function() {
                var r = [
                    [1, 26, 19],
                    [1, 26, 16],
                    [1, 26, 13],
                    [1, 26, 9],
                    [1, 44, 34],
                    [1, 44, 28],
                    [1, 44, 22],
                    [1, 44, 16],
                    [1, 70, 55],
                    [1, 70, 44],
                    [2, 35, 17],
                    [2, 35, 13],
                    [1, 100, 80],
                    [2, 50, 32],
                    [2, 50, 24],
                    [4, 25, 9],
                    [1, 134, 108],
                    [2, 67, 43],
                    [2, 33, 15, 2, 34, 16],
                    [2, 33, 11, 2, 34, 12],
                    [2, 86, 68],
                    [4, 43, 27],
                    [4, 43, 19],
                    [4, 43, 15],
                    [2, 98, 78],
                    [4, 49, 31],
                    [2, 32, 14, 4, 33, 15],
                    [4, 39, 13, 1, 40, 14],
                    [2, 121, 97],
                    [2, 60, 38, 2, 61, 39],
                    [4, 40, 18, 2, 41, 19],
                    [4, 40, 14, 2, 41, 15],
                    [2, 146, 116],
                    [3, 58, 36, 2, 59, 37],
                    [4, 36, 16, 4, 37, 17],
                    [4, 36, 12, 4, 37, 13],
                    [2, 86, 68, 2, 87, 69],
                    [4, 69, 43, 1, 70, 44],
                    [6, 43, 19, 2, 44, 20],
                    [6, 43, 15, 2, 44, 16],
                    [4, 101, 81],
                    [1, 80, 50, 4, 81, 51],
                    [4, 50, 22, 4, 51, 23],
                    [3, 36, 12, 8, 37, 13],
                    [2, 116, 92, 2, 117, 93],
                    [6, 58, 36, 2, 59, 37],
                    [4, 46, 20, 6, 47, 21],
                    [7, 42, 14, 4, 43, 15],
                    [4, 133, 107],
                    [8, 59, 37, 1, 60, 38],
                    [8, 44, 20, 4, 45, 21],
                    [12, 33, 11, 4, 34, 12],
                    [3, 145, 115, 1, 146, 116],
                    [4, 64, 40, 5, 65, 41],
                    [11, 36, 16, 5, 37, 17],
                    [11, 36, 12, 5, 37, 13],
                    [5, 109, 87, 1, 110, 88],
                    [5, 65, 41, 5, 66, 42],
                    [5, 54, 24, 7, 55, 25],
                    [11, 36, 12],
                    [5, 122, 98, 1, 123, 99],
                    [7, 73, 45, 3, 74, 46],
                    [15, 43, 19, 2, 44, 20],
                    [3, 45, 15, 13, 46, 16],
                    [1, 135, 107, 5, 136, 108],
                    [10, 74, 46, 1, 75, 47],
                    [1, 50, 22, 15, 51, 23],
                    [2, 42, 14, 17, 43, 15],
                    [5, 150, 120, 1, 151, 121],
                    [9, 69, 43, 4, 70, 44],
                    [17, 50, 22, 1, 51, 23],
                    [2, 42, 14, 19, 43, 15],
                    [3, 141, 113, 4, 142, 114],
                    [3, 70, 44, 11, 71, 45],
                    [17, 47, 21, 4, 48, 22],
                    [9, 39, 13, 16, 40, 14],
                    [3, 135, 107, 5, 136, 108],
                    [3, 67, 41, 13, 68, 42],
                    [15, 54, 24, 5, 55, 25],
                    [15, 43, 15, 10, 44, 16],
                    [4, 144, 116, 4, 145, 117],
                    [17, 68, 42],
                    [17, 50, 22, 6, 51, 23],
                    [19, 46, 16, 6, 47, 17],
                    [2, 139, 111, 7, 140, 112],
                    [17, 74, 46],
                    [7, 54, 24, 16, 55, 25],
                    [34, 37, 13],
                    [4, 151, 121, 5, 152, 122],
                    [4, 75, 47, 14, 76, 48],
                    [11, 54, 24, 14, 55, 25],
                    [16, 45, 15, 14, 46, 16],
                    [6, 147, 117, 4, 148, 118],
                    [6, 73, 45, 14, 74, 46],
                    [11, 54, 24, 16, 55, 25],
                    [30, 46, 16, 2, 47, 17],
                    [8, 132, 106, 4, 133, 107],
                    [8, 75, 47, 13, 76, 48],
                    [7, 54, 24, 22, 55, 25],
                    [22, 45, 15, 13, 46, 16],
                    [10, 142, 114, 2, 143, 115],
                    [19, 74, 46, 4, 75, 47],
                    [28, 50, 22, 6, 51, 23],
                    [33, 46, 16, 4, 47, 17],
                    [8, 152, 122, 4, 153, 123],
                    [22, 73, 45, 3, 74, 46],
                    [8, 53, 23, 26, 54, 24],
                    [12, 45, 15, 28, 46, 16],
                    [3, 147, 117, 10, 148, 118],
                    [3, 73, 45, 23, 74, 46],
                    [4, 54, 24, 31, 55, 25],
                    [11, 45, 15, 31, 46, 16],
                    [7, 146, 116, 7, 147, 117],
                    [21, 73, 45, 7, 74, 46],
                    [1, 53, 23, 37, 54, 24],
                    [19, 45, 15, 26, 46, 16],
                    [5, 145, 115, 10, 146, 116],
                    [19, 75, 47, 10, 76, 48],
                    [15, 54, 24, 25, 55, 25],
                    [23, 45, 15, 25, 46, 16],
                    [13, 145, 115, 3, 146, 116],
                    [2, 74, 46, 29, 75, 47],
                    [42, 54, 24, 1, 55, 25],
                    [23, 45, 15, 28, 46, 16],
                    [17, 145, 115],
                    [10, 74, 46, 23, 75, 47],
                    [10, 54, 24, 35, 55, 25],
                    [19, 45, 15, 35, 46, 16],
                    [17, 145, 115, 1, 146, 116],
                    [14, 74, 46, 21, 75, 47],
                    [29, 54, 24, 19, 55, 25],
                    [11, 45, 15, 46, 46, 16],
                    [13, 145, 115, 6, 146, 116],
                    [14, 74, 46, 23, 75, 47],
                    [44, 54, 24, 7, 55, 25],
                    [59, 46, 16, 1, 47, 17],
                    [12, 151, 121, 7, 152, 122],
                    [12, 75, 47, 26, 76, 48],
                    [39, 54, 24, 14, 55, 25],
                    [22, 45, 15, 41, 46, 16],
                    [6, 151, 121, 14, 152, 122],
                    [6, 75, 47, 34, 76, 48],
                    [46, 54, 24, 10, 55, 25],
                    [2, 45, 15, 64, 46, 16],
                    [17, 152, 122, 4, 153, 123],
                    [29, 74, 46, 14, 75, 47],
                    [49, 54, 24, 10, 55, 25],
                    [24, 45, 15, 46, 46, 16],
                    [4, 152, 122, 18, 153, 123],
                    [13, 74, 46, 32, 75, 47],
                    [48, 54, 24, 14, 55, 25],
                    [42, 45, 15, 32, 46, 16],
                    [20, 147, 117, 4, 148, 118],
                    [40, 75, 47, 7, 76, 48],
                    [43, 54, 24, 22, 55, 25],
                    [10, 45, 15, 67, 46, 16],
                    [19, 148, 118, 6, 149, 119],
                    [18, 75, 47, 31, 76, 48],
                    [34, 54, 24, 34, 55, 25],
                    [20, 45, 15, 61, 46, 16]
                ],
                    t = function(r, t) {
                        var e = {};
                        return e.totalCount = r, e.dataCount = t, e
                    }, e = {}, o = function(t, e) {
                        switch (e) {
                            case n.L:
                                return r[4 * (t - 1) + 0];
                            case n.M:
                                return r[4 * (t - 1) + 1];
                            case n.Q:
                                return r[4 * (t - 1) + 2];
                            case n.H:
                                return r[4 * (t - 1) + 3];
                            default:
                                return void 0
                        }
                    };
                return e.getRSBlocks = function(r, e) {
                    var n = o(r, e);
                    if ("undefined" == typeof n) throw new Error("bad rs block @ typeNumber:" + r + "/errorCorrectLevel:" + e);
                    for (var i = n.length / 3, a = new Array, u = 0; i > u; u += 1)
                        for (var f = n[3 * u + 0], l = n[3 * u + 1], c = n[3 * u + 2], g = 0; f > g; g += 1) a.push(t(l, c));
                    return a
                }, e
            }(),
            f = function() {
                var r = new Array,
                    t = 0,
                    e = {};
                return e.getBuffer = function() {
                    return r
                }, e.get = function(t) {
                    var e = Math.floor(t / 8);
                    return 1 == (1 & r[e] >>> 7 - t % 8)
                }, e.put = function(r, t) {
                    for (var n = 0; t > n; n += 1) e.putBit(1 == (1 & r >>> t - n - 1))
                }, e.getLengthInBits = function() {
                    return t
                }, e.putBit = function(e) {
                    var n = Math.floor(t / 8);
                    r.length <= n && r.push(0), e && (r[n] |= 128 >>> t % 8), t += 1
                }, e
            }, l = function(r) {
                var n = e.MODE_8BIT_BYTE,
                    o = t.stringToBytes(r),
                    i = {};
                return i.getMode = function() {
                    return n
                }, i.getLength = function() {
                    return o.length
                }, i.write = function(r) {
                    for (var t = 0; t < o.length; t += 1) r.put(o[t], 8)
                }, i
            }, c = function() {
                var r = new Array,
                    t = {};
                return t.writeByte = function(t) {
                    r.push(255 & t)
                }, t.writeShort = function(r) {
                    t.writeByte(r), t.writeByte(r >>> 8)
                }, t.writeBytes = function(r, e, n) {
                    e = e || 0, n = n || r.length;
                    for (var o = 0; n > o; o += 1) t.writeByte(r[o + e])
                }, t.writeString = function(r) {
                    for (var e = 0; e < r.length; e += 1) t.writeByte(r.charCodeAt(e))
                }, t.toByteArray = function() {
                    return r
                }, t.toString = function() {
                    var t = "";
                    t += "[";
                    for (var e = 0; e < r.length; e += 1) e > 0 && (t += ","), t += r[e];
                    return t += "]"
                }, t
            }, g = function() {
                var r = 0,
                    t = 0,
                    e = 0,
                    n = "",
                    o = {}, i = function(r) {
                        n += String.fromCharCode(a(63 & r))
                    }, a = function(r) {
                        if (0 > r);
                        else {
                            if (26 > r) return 65 + r;
                            if (52 > r) return 97 + (r - 26);
                            if (62 > r) return 48 + (r - 52);
                            if (62 == r) return 43;
                            if (63 == r) return 47
                        }
                        throw new Error("n:" + r)
                    };
                return o.writeByte = function(n) {
                    for (r = r << 8 | 255 & n, t += 8, e += 1; t >= 6;) i(r >>> t - 6), t -= 6
                }, o.flush = function() {
                    if (t > 0 && (i(r << 6 - t), r = 0, t = 0), 0 != e % 3)
                        for (var o = 3 - e % 3, a = 0; o > a; a += 1) n += "="
                }, o.toString = function() {
                    return n
                }, o
            }, s = function(r) {
                var t = r,
                    e = 0,
                    n = 0,
                    o = 0,
                    i = {};
                i.read = function() {
                    for (; 8 > o;) {
                        if (e >= t.length) {
                            if (0 == o) return -1;
                            throw new Error("unexpected end of file./" + o)
                        }
                        var r = t.charAt(e);
                        if (e += 1, "=" == r) return o = 0, -1;
                        r.match(/^\s$/) || (n = n << 6 | a(r.charCodeAt(0)), o += 6)
                    }
                    var i = 255 & n >>> o - 8;
                    return o -= 8, i
                };
                var a = function(r) {
                    if (r >= 65 && 90 >= r) return r - 65;
                    if (r >= 97 && 122 >= r) return r - 97 + 26;
                    if (r >= 48 && 57 >= r) return r - 48 + 52;
                    if (43 == r) return 62;
                    if (47 == r) return 63;
                    throw new Error("c:" + r)
                };
                return i
            }, h = function(r, t) {
                var e = r,
                    n = t,
                    o = new Array(r * t),
                    i = {};
                i.setPixel = function(r, t, n) {
                    o[t * e + r] = n
                }, i.write = function(r) {
                    r.writeString("GIF87a"), r.writeShort(e), r.writeShort(n), r.writeByte(128), r.writeByte(0), r.writeByte(0), r.writeByte(0), r.writeByte(0), r.writeByte(0), r.writeByte(255), r.writeByte(255), r.writeByte(255), r.writeString(","), r.writeShort(0), r.writeShort(0), r.writeShort(e), r.writeShort(n), r.writeByte(0);
                    var t = 2,
                        o = u(t);
                    r.writeByte(t);
                    for (var i = 0; o.length - i > 255;) r.writeByte(255), r.writeBytes(o, i, 255), i += 255;
                    r.writeByte(o.length - i), r.writeBytes(o, i, o.length - i), r.writeByte(0), r.writeString(";")
                };
                var a = function(r) {
                    var t = r,
                        e = 0,
                        n = 0,
                        o = {};
                    return o.write = function(r, o) {
                        if (0 != r >>> o) throw new Error("length over");
                        for (; e + o >= 8;) t.writeByte(255 & (r << e | n)), o -= 8 - e, r >>>= 8 - e, n = 0, e = 0;
                        n = r << e | n, e += o
                    }, o.flush = function() {
                        e > 0 && t.writeByte(n)
                    }, o
                }, u = function(r) {
                        for (var t = 1 << r, e = (1 << r) + 1, n = r + 1, i = f(), u = 0; t > u; u += 1) i.add(String.fromCharCode(u));
                        i.add(String.fromCharCode(t)), i.add(String.fromCharCode(e));
                        var l = c(),
                            g = a(l);
                        g.write(t, n);
                        var s = 0,
                            h = String.fromCharCode(o[s]);
                        for (s += 1; s < o.length;) {
                            var v = String.fromCharCode(o[s]);
                            s += 1, i.contains(h + v) ? h += v : (g.write(i.indexOf(h), n), i.size() < 4095 && (i.size() == 1 << n && (n += 1), i.add(h + v)), h = v)
                        }
                        return g.write(i.indexOf(h), n), g.write(e, n), g.flush(), l.toByteArray()
                    }, f = function() {
                        var r = {}, t = 0,
                            e = {};
                        return e.add = function(n) {
                            if (e.contains(n)) throw new Error("dup key:" + n);
                            r[n] = t, t += 1
                        }, e.size = function() {
                            return t
                        }, e.indexOf = function(t) {
                            return r[t]
                        }, e.contains = function(t) {
                            return "undefined" != typeof r[t]
                        }, e
                    };
                return i
            }, v = function(r, t, e, n) {
                for (var o = h(r, t), i = 0; t > i; i += 1)
                    for (var a = 0; r > a; a += 1) o.setPixel(a, i, e(a, i));
                var u = c();
                o.write(u);
                for (var f = g(), l = u.toByteArray(), s = 0; s < l.length; s += 1) f.writeByte(l[s]);
                f.flush();
                var v = "";
                return v += "<img", v += ' src="', v += "data:image/gif;base64,", v += f, v += '"', v += ' width="', v += r, v += '"', v += ' height="', v += t, v += '"', n && (v += ' alt="', v += n, v += '"'), v += "/>"
            };
        return t
    }()
}(Zepto);