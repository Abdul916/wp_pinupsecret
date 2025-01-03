"use strict";
(self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || []).push([
	[8806], {
		4738: (e, t, s) => {
			s.d(t, {
				E: () => c,
				X: () => l
			});
			var n = s(9530),
				a = s(4613),
				r = s(9818),
				o = s(4801);
			const i = (e = !1) => {
					const {
						paymentMethodsInitialized: t,
						expressPaymentMethodsInitialized: s,
						availablePaymentMethods: i,
						availableExpressPaymentMethods: c
					} = (0, r.useSelect)((e => {
						const t = e(o.PAYMENT_STORE_KEY);
						return {
							paymentMethodsInitialized: t.paymentMethodsInitialized(),
							expressPaymentMethodsInitialized: t.expressPaymentMethodsInitialized(),
							availableExpressPaymentMethods: t.getAvailableExpressPaymentMethods(),
							availablePaymentMethods: t.getAvailablePaymentMethods()
						}
					})), l = Object.values(i).map((({
						name: e
					}) => e)), d = Object.values(c).map((({
						name: e
					}) => e)), m = (0, a.getPaymentMethods)(), u = (0, a.getExpressPaymentMethods)(), h = Object.keys(m).reduce(((e, t) => (l.includes(t) && (e[t] = m[t]), e)), {}), p = Object.keys(u).reduce(((e, t) => (d.includes(t) && (e[t] = u[t]), e)), {}), y = (0, n.s)(h), P = (0, n.s)(p);
					return {
						paymentMethods: e ? P : y,
						isInitialized: e ? s : t
					}
				},
				c = () => i(!1),
				l = () => i(!0)
		},
		9732: (e, t, s) => {
			s.d(t, {
				P: () => i
			});
			var n = s(4801),
				a = s(9818),
				r = s(1715),
				o = s(4738);
			const i = () => {
				const {
					isCalculating: e,
					isBeforeProcessing: t,
					isProcessing: s,
					isAfterProcessing: i,
					isComplete: c,
					hasError: l
				} = (0, a.useSelect)((e => {
					const t = e(n.CHECKOUT_STORE_KEY);
					return {
						isCalculating: t.isCalculating(),
						isBeforeProcessing: t.isBeforeProcessing(),
						isProcessing: t.isProcessing(),
						isAfterProcessing: t.isAfterProcessing(),
						isComplete: t.isComplete(),
						hasError: t.hasError()
					}
				})), {
					activePaymentMethod: d,
					isExpressPaymentMethodActive: m
				} = (0, a.useSelect)((e => {
					const t = e(n.PAYMENT_STORE_KEY);
					return {
						activePaymentMethod: t.getActivePaymentMethod(),
						isExpressPaymentMethodActive: t.isExpressPaymentMethodActive()
					}
				})), {
					onSubmit: u
				} = (0, r.U)(), {
					paymentMethods: h = {}
				} = (0, o.E)(), p = s || i || t, y = c && !l;
				return {
					paymentMethodButtonLabel: (h[d] || {}).placeOrderButtonLabel,
					onSubmit: u,
					isCalculating: e,
					isDisabled: s || m,
					waitingForProcessing: p,
					waitingForRedirect: y
				}
			}
		},
		9530: (e, t, s) => {
			s.d(t, {
				s: () => o
			});
			var n = s(9307),
				a = s(9127),
				r = s.n(a);

			function o(e) {
				const t = (0, n.useRef)(e);
				return r()(e, t.current) || (t.current = e), t.current
			}
		},
		9701: (e, t, s) => {
			s.r(t), s.d(t, {
				default: () => _
			});
			var n = s(9196),
				a = s(5736),
				r = s(7608),
				o = s.n(r),
				i = s(9307),
				c = s(711),
				l = s(9732),
				d = s(4333),
				m = s(9818),
				u = s(4801),
				h = s(8752);
			const p = h.qy ? `<a href="${h.qy}" target="_blank">${(0,a.__)(" الأحكام والشروط  ","woocommerce")}</a>` : (0, a.__)(" الأحكام والشروط  ", "woocommerce"),
				y = h.Sb ? `<a href="${h.Sb}" target="_blank">${(0,a.__)(" سياسة الخصوصية  ","woocommerce")}</a>` : (0, a.__)(" سياسة الخصوصية  ", "woocommerce"),
				P = (0, a.sprintf)( /* translators: %1$s terms page link, %2$s privacy page link. */ /* translators: %1$s terms page link, %2$s privacy page link. */
					(0, a.__)("من خلال الاستمرار في عملية الشراء فإنك توافق على لدينا   %1$s و   %2$s", "woocommerce"), p, y),
				E = (0, a.sprintf)( /* translators: %1$s terms page link, %2$s privacy page link. */ /* translators: %1$s terms page link, %2$s privacy page link. */
					(0, a.__)("You must accept our %1$s و   %2$s لمواصلة عملية الشراء.", "woocommerce"), p, y),
				_ = (0, d.withInstanceId)((({
					text: e,
					checkbox: t,
					instanceId: s,
					className: r
				}) => {
					const [d, h] = (0, i.useState)(!1), {
						isDisabled: p
					} = (0, l.P)(), y = "terms-and-conditions-" + s, {
						setValidationErrors: _,
						clearValidationError: g
					} = (0, m.useDispatch)(u.VALIDATION_STORE_KEY), b = (0, m.useSelect)((e => e(u.VALIDATION_STORE_KEY).getValidationError(y))), M = !(null == b || !b.message || null != b && b.hidden);
					return (0, i.useEffect)((() => {
						if (t) return d ? g(y) : _({
							[y]: {
								message: (0, a.__)("يرجى قراءة الشروط والأحكام والموافقة عليها.", "woocommerce"),
								hidden: !0
							}
						}), () => {
							g(y)
						}
					}), [t, d, y, g, _]), (0, n.createElement)("div", {
						className: o()("wc-block-checkout__terms", {
							"wc-block-checkout__terms--disabled": p
						}, r)
					}, t ? (0, n.createElement)(n.Fragment, null, (0, n.createElement)(c.CheckboxControl, {
						id: "terms-and-conditions",
						checked: d,
						onChange: () => h((e => !e)),
						hasError: M,
						disabled: p
					}, (0, n.createElement)("span", {
						dangerouslySetInnerHTML: {
							__html: e || E
						}
					}))) : (0, n.createElement)("span", {
						dangerouslySetInnerHTML: {
							__html: e || P
						}
					}))
				}))
		}
	}
]);