"use strict";
(self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || []).push([
	[7906], {
		7486: (e, s, c) => {
			c.r(s), c.d(s, {
				default: () => o
			});
			var r = c(9196),
				a = c(711),
				t = c(4293),
				n = c(9659);
			const o = ({
				className: e = ""
			}) => {
				const {
					cartFees: s,
					cartTotals: c
				} = (0, n.b)(), o = (0, t.getCurrencyFromPriceResponse)(c);
				return (0, r.createElement)(a.TotalsWrapper, {
					className: e
				}, (0, r.createElement)(a.TotalsFees, {
					currency: o,
					cartFees: s
				}))
			}
		}
	}
]);