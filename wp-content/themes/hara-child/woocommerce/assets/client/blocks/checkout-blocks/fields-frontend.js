"use strict";
(self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || []).push([
	[4986], {
		5572: (e, c, n) => {
			n.r(c), n.d(c, {
				default: () => k
			});
			var o = n(9196),
				s = n(7608),
				a = n.n(s),
				t = n(9307);
			const r = (0, t.forwardRef)((({
				children: e,
				className: c = ""
			}, n) => (0, o.createElement)("div", {
				ref: n,
				className: a()("wc-block-components-main", c)
			}, e)));
			var l = n(8360);
			const k = ({
				children: e,
				className: c
			}) => {
				const {
					dispatchCheckoutEvent: n
				} = (0, l.n)();
				return (0, t.useEffect)((() => {
					n("render-checkout-form")
				}), []), (0, o.createElement)(r, {
					className: a()("wc-block-checkout__main", c)
				}, (0, o.createElement)("form", {
					className: "wc-block-components-form wc-block-checkout__form"
				}, e))
			}
		}
	}
]);