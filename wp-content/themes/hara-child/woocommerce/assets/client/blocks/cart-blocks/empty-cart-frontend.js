(self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || []).push([
	[320], {
		5353: (e, c, n) => {
			"use strict";
			n.r(c), n.d(c, {
				default: () => r
			});
			var t = n(9196),
				s = n(9659),
				o = n(9307),
				l = n(2592);
			n(2800);
			const r = ({
				children: e,
				className: c
			}) => {
				const {
					cartItems: n,
					cartIsLoading: r
				} = (0, s.b)();
				return (0, o.useEffect)((() => {
					0 !== n.length || r || (0, l.Nu)("wc-blocks_render_blocks_frontend", {
						element: document.body.querySelector(".wp-block-woocommerce-cart")
					})
				}), [r, n]), r || 0 !== n.length ? null : (0, t.createElement)("div", {
					className: c
				}, e)
			}
		},
		2800: () => {}
	}
]);