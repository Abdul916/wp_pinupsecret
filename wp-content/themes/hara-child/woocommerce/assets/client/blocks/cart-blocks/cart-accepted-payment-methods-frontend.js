(self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || []).push([
	[4058], {
		4570: (t, e, s) => {
			"use strict";
			s.d(e, {
				C: () => c
			});
			var a = s(8752);
			const n = [{
					id: "alipay",
					alt: "Alipay",
					src: a.td + "payment-methods/alipay.svg"
				}, {
					id: "amex",
					alt: "American Express",
					src: a.td + "payment-methods/amex.svg"
				}, {
					id: "bancontact",
					alt: "Bancontact",
					src: a.td + "payment-methods/bancontact.svg"
				}, {
					id: "diners",
					alt: "Diners Club",
					src: a.td + "payment-methods/diners.svg"
				}, {
					id: "discover",
					alt: "Discover",
					src: a.td + "payment-methods/discover.svg"
				}, {
					id: "eps",
					alt: "EPS",
					src: a.td + "payment-methods/eps.svg"
				}, {
					id: "giropay",
					alt: "Giropay",
					src: a.td + "payment-methods/giropay.svg"
				}, {
					id: "ideal",
					alt: "iDeal",
					src: a.td + "payment-methods/ideal.svg"
				}, {
					id: "jcb",
					alt: "JCB",
					src: a.td + "payment-methods/jcb.svg"
				}, {
					id: "laser",
					alt: "Laser",
					src: a.td + "payment-methods/laser.svg"
				}, {
					id: "maestro",
					alt: "Maestro",
					src: a.td + "payment-methods/maestro.svg"
				}, {
					id: "mastercard",
					alt: "Mastercard",
					src: a.td + "payment-methods/mastercard.svg"
				}, {
					id: "multibanco",
					alt: "Multibanco",
					src: a.td + "payment-methods/multibanco.svg"
				}, {
					id: "p24",
					alt: "Przelewy24",
					src: a.td + "payment-methods/p24.svg"
				}, {
					id: "sepa",
					alt: "Sepa",
					src: a.td + "payment-methods/sepa.svg"
				}, {
					id: "sofort",
					alt: "Sofort",
					src: a.td + "payment-methods/sofort.svg"
				}, {
					id: "unionpay",
					alt: "Union Pay",
					src: a.td + "payment-methods/unionpay.svg"
				}, {
					id: "visa",
					alt: "Visa",
					src: a.td + "payment-methods/visa.svg"
				}, {
					id: "wechat",
					alt: "WeChat",
					src: a.td + "payment-methods/wechat.svg"
				}],
				c = t => n.find((e => e.id === t)) || {}
		},
		2454: (t, e, s) => {
			"use strict";
			s.d(e, {
				Z: () => r
			});
			var a = s(9196),
				n = s(7608),
				c = s.n(n),
				d = s(1368),
				o = s(4570),
				i = s(8999);
			s(6391);
			const r = ({
				icons: t = [],
				align: e = "center",
				className: s
			}) => {
				const n = (0, i.L)(t);
				if (0 === n.length) return null;
				const r = c()("wc-block-components-payment-method-icons", {
					"wc-block-components-payment-method-icons--align-left": "left" === e,
					"wc-block-components-payment-method-icons--align-right": "right" === e
				}, s);
				return (0, a.createElement)("div", {
					className: r
				}, n.map((t => {
					const e = {
						...t,
						...(0, o.C)(t.id)
					};
					return (0, a.createElement)(d.Z, {
						key: "payment-method-icon-" + t.id,
						...e
					})
				})))
			}
		},
		1368: (t, e, s) => {
			"use strict";
			s.d(e, {
				Z: () => c
			});
			var a = s(9196);
			const n = t => `wc-block-components-payment-method-icon wc-block-components-payment-method-icon--${t}`,
				c = ({
					id: t,
					src: e = null,
					alt: s = ""
				}) => e ? (0, a.createElement)("img", {
					className: n(t),
					src: e,
					alt: s
				}) : null
		},
		8999: (t, e, s) => {
			"use strict";
			s.d(e, {
				L: () => n
			});
			var a = s(6946);
			const n = t => {
				const e = {};
				return t.forEach((t => {
					let s = {};
					"string" == typeof t && (s = {
						id: t,
						alt: t,
						src: null
					}), "object" == typeof t && (s = {
						id: t.id || "",
						alt: t.alt || "",
						src: t.src || null
					}), s.id && (0, a.isString)(s.id) && !e[s.id] && (e[s.id] = s)
				})), Object.values(e)
			}
		},
		4738: (t, e, s) => {
			"use strict";
			s.d(e, {
				E: () => i,
				X: () => r
			});
			var a = s(9530),
				n = s(4613),
				c = s(9818),
				d = s(4801);
			const o = (t = !1) => {
					const {
						paymentMethodsInitialized: e,
						expressPaymentMethodsInitialized: s,
						availablePaymentMethods: o,
						availableExpressPaymentMethods: i
					} = (0, c.useSelect)((t => {
						const e = t(d.PAYMENT_STORE_KEY);
						return {
							paymentMethodsInitialized: e.paymentMethodsInitialized(),
							expressPaymentMethodsInitialized: e.expressPaymentMethodsInitialized(),
							availableExpressPaymentMethods: e.getAvailableExpressPaymentMethods(),
							availablePaymentMethods: e.getAvailablePaymentMethods()
						}
					})), r = Object.values(o).map((({
						name: t
					}) => t)), l = Object.values(i).map((({
						name: t
					}) => t)), m = (0, n.getPaymentMethods)(), p = (0, n.getExpressPaymentMethods)(), y = Object.keys(m).reduce(((t, e) => (r.includes(e) && (t[e] = m[e]), t)), {}), h = Object.keys(p).reduce(((t, e) => (l.includes(e) && (t[e] = p[e]), t)), {}), u = (0, a.s)(y), v = (0, a.s)(h);
					return {
						paymentMethods: t ? v : u,
						isInitialized: t ? s : e
					}
				},
				i = () => o(!1),
				r = () => o(!0)
		},
		9530: (t, e, s) => {
			"use strict";
			s.d(e, {
				s: () => d
			});
			var a = s(9307),
				n = s(9127),
				c = s.n(n);

			function d(t) {
				const e = (0, a.useRef)(t);
				return c()(t, e.current) || (e.current = t), e.current
			}
		},
		1142: (t, e, s) => {
			"use strict";
			s.r(e), s.d(e, {
				default: () => o
			});
			var a = s(9196),
				n = s(2454),
				c = s(4738);
			const d = t => Object.values(t).reduce(((t, e) => (null !== e.icons && (t = t.concat(e.icons)), t)), []),
				o = ({
					className: t
				}) => {
					const {
						paymentMethods: e
					} = (0, c.E)();
					return (0, a.createElement)(n.Z, {
						className: t,
						icons: d(e)
					})
				}
		},
		6391: () => {}
	}
]);