(self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || []).push([
	[8308], {
		1420: (e, s, a) => {
			"use strict";
			a.r(s), a.d(s, {
				default: () => h
			});
			var l = a(9196),
				t = a(7608),
				n = a.n(t),
				c = a(9307),
				i = a(4333);
			const r = (0, c.createContext)({
					hasContainerWidth: !1,
					containerClassName: "",
					isMobile: !1,
					isSmall: !1,
					isMedium: !1,
					isLarge: !1
				}),
				o = ({
					children: e,
					className: s = ""
				}) => {
					const [a, t] = (() => {
						const [e, {
							width: s
						}] = (0, i.useResizeObserver)();
						let a = "";
						return s > 700 ? a = "is-large" : s > 520 ? a = "is-medium" : s > 400 ? a = "is-small" : s && (a = "is-mobile"), [e, a]
					})(), c = {
						hasContainerWidth: "" !== t,
						containerClassName: t,
						isMobile: "is-mobile" === t,
						isSmall: "is-small" === t,
						isMedium: "is-medium" === t,
						isLarge: "is-large" === t
					};
					return (0, l.createElement)(r.Provider, {
						value: c
					}, (0, l.createElement)("div", {
						className: n()(s, t)
					}, a, e))
				};
			a(906);
			const m = ({
				children: e,
				className: s
			}) => (0, l.createElement)(o, {
				className: n()("wc-block-components-sidebar-layout", s)
			}, e);
			var d = a(9659),
				u = a(1729);
			const h = ({
				children: e,
				className: s
			}) => {
				const {
					cartItems: a,
					cartIsLoading: t
				} = (0, d.b)(), {
					hasDarkControls: c
				} = (0, u.l)();
				return t || a.length >= 1 ? (0, l.createElement)(m, {
					className: n()("wc-block-cart", s, {
						"has-dark-controls": c
					})
				}, e) : null
			}
		},
		906: () => {}
	}
]);