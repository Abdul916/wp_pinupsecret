"use strict";
(self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || []).push([
	[5229], {
		240: (e, t, c) => {
			c.r(t), c.d(t, {
				default: () => r
			});
			var o = c(721),
				s = c(9196),
				a = c(7608),
				n = c.n(a);
			const l = {
					content: {
						type: "string",
						default: (0, c(5736).__)("Cart totals", "woocommerce")
					},
					lock: {
						type: "object",
						default: {
							remove: !1,
							move: !1
						}
					}
				},
				r = (0, o.withFilteredAttributes)(l)((({
					className: e,
					content: t = ""
				}) => (0, s.createElement)("span", {
					className: n()(e, "wc-block-cart__totals-title")
				}, t)))
		}
	}
]);