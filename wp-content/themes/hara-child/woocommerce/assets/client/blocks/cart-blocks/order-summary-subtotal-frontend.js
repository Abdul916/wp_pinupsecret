"use strict";
(self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || []).push([
	[7737], {
		4374: (e, c, s) => {
			s.r(c), s.d(c, {
				default: () => l
			});
			var a = s(9196),
				r = s(711),
				t = s(4293),
				n = s(9659);
			const l = ({
				className: e = ""
			}) => {
				const {
					cartTotals: c
				} = (0, n.b)(), s = (0, t.getCurrencyFromPriceResponse)(c);
				return (0, a.createElement)(r.TotalsWrapper, {
					className: e
				}, (0, a.createElement)(r.Subtotal, {
					currency: s,
					values: c
				}))
			}
		}
	}
]);