(self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || []).push([
	[2030], {
		4570: (e, t, s) => {
			"use strict";
			s.d(t, {
				C: () => a
			});
			var o = s(8752);
			const n = [{
					id: "alipay",
					alt: "Alipay",
					src: o.td + "payment-methods/alipay.svg"
				}, {
					id: "amex",
					alt: "American Express",
					src: o.td + "payment-methods/amex.svg"
				}, {
					id: "bancontact",
					alt: "Bancontact",
					src: o.td + "payment-methods/bancontact.svg"
				}, {
					id: "diners",
					alt: "Diners Club",
					src: o.td + "payment-methods/diners.svg"
				}, {
					id: "discover",
					alt: "Discover",
					src: o.td + "payment-methods/discover.svg"
				}, {
					id: "eps",
					alt: "EPS",
					src: o.td + "payment-methods/eps.svg"
				}, {
					id: "giropay",
					alt: "Giropay",
					src: o.td + "payment-methods/giropay.svg"
				}, {
					id: "ideal",
					alt: "iDeal",
					src: o.td + "payment-methods/ideal.svg"
				}, {
					id: "jcb",
					alt: "JCB",
					src: o.td + "payment-methods/jcb.svg"
				}, {
					id: "laser",
					alt: "Laser",
					src: o.td + "payment-methods/laser.svg"
				}, {
					id: "maestro",
					alt: "Maestro",
					src: o.td + "payment-methods/maestro.svg"
				}, {
					id: "mastercard",
					alt: "Mastercard",
					src: o.td + "payment-methods/mastercard.svg"
				}, {
					id: "multibanco",
					alt: "Multibanco",
					src: o.td + "payment-methods/multibanco.svg"
				}, {
					id: "p24",
					alt: "Przelewy24",
					src: o.td + "payment-methods/p24.svg"
				}, {
					id: "sepa",
					alt: "Sepa",
					src: o.td + "payment-methods/sepa.svg"
				}, {
					id: "sofort",
					alt: "Sofort",
					src: o.td + "payment-methods/sofort.svg"
				}, {
					id: "unionpay",
					alt: "Union Pay",
					src: o.td + "payment-methods/unionpay.svg"
				}, {
					id: "visa",
					alt: "Visa",
					src: o.td + "payment-methods/visa.svg"
				}, {
					id: "wechat",
					alt: "WeChat",
					src: o.td + "payment-methods/wechat.svg"
				}],
				a = e => n.find((t => t.id === e)) || {}
		},
		2454: (e, t, s) => {
			"use strict";
			s.d(t, {
				Z: () => l
			});
			var o = s(9196),
				n = s(7608),
				a = s.n(n),
				r = s(1368),
				c = s(4570),
				i = s(8999);
			s(6391);
			const l = ({
				icons: e = [],
				align: t = "center",
				className: s
			}) => {
				const n = (0, i.L)(e);
				if (0 === n.length) return null;
				const l = a()("wc-block-components-payment-method-icons", {
					"wc-block-components-payment-method-icons--align-left": "left" === t,
					"wc-block-components-payment-method-icons--align-right": "right" === t
				}, s);
				return (0, o.createElement)("div", {
					className: l
				}, n.map((e => {
					const t = {
						...e,
						...(0, c.C)(e.id)
					};
					return (0, o.createElement)(r.Z, {
						key: "payment-method-icon-" + e.id,
						...t
					})
				})))
			}
		},
		1368: (e, t, s) => {
			"use strict";
			s.d(t, {
				Z: () => a
			});
			var o = s(9196);
			const n = e => `wc-block-components-payment-method-icon wc-block-components-payment-method-icon--${e}`,
				a = ({
					id: e,
					src: t = null,
					alt: s = ""
				}) => t ? (0, o.createElement)("img", {
					className: n(e),
					src: t,
					alt: s
				}) : null
		},
		8999: (e, t, s) => {
			"use strict";
			s.d(t, {
				L: () => n
			});
			var o = s(6946);
			const n = e => {
				const t = {};
				return e.forEach((e => {
					let s = {};
					"string" == typeof e && (s = {
						id: e,
						alt: e,
						src: null
					}), "object" == typeof e && (s = {
						id: e.id || "",
						alt: e.alt || "",
						src: e.src || null
					}), s.id && (0, o.isString)(s.id) && !t[s.id] && (t[s.id] = s)
				})), Object.values(t)
			}
		},
		9095: (e, t, s) => {
			"use strict";
			s.d(t, {
				K: () => l
			});
			var o = s(5736),
				n = s(9818),
				a = s(4801),
				r = s(2629),
				c = s(3554),
				i = s(9659);
			const l = (e = "") => {
				const {
					cartCoupons: t,
					cartIsLoading: s
				} = (0, i.b)(), {
					createErrorNotice: l
				} = (0, n.useDispatch)("core/notices"), {
					createNotice: m
				} = (0, n.useDispatch)("core/notices"), {
					setValidationErrors: p
				} = (0, n.useDispatch)(a.VALIDATION_STORE_KEY), {
					isApplyingCoupon: d,
					isRemovingCoupon: u
				} = (0, n.useSelect)((e => {
					const t = e(a.CART_STORE_KEY);
					return {
						isApplyingCoupon: t.isApplyingCoupon(),
						isRemovingCoupon: t.isRemovingCoupon()
					}
				}), [l, m]), {
					applyCoupon: h,
					removeCoupon: g
				} = (0, n.useDispatch)(a.CART_STORE_KEY), y = (0, n.useSelect)((e => e(a.CHECKOUT_STORE_KEY).getOrderId()));
				return {
					appliedCoupons: t,
					isLoading: s,
					applyCoupon: t => h(t).then((() => ((0, c.applyCheckoutFilter)({
						filterName: "showApplyCouponNotice",
						defaultValue: !0,
						arg: {
							couponCode: t,
							context: e
						}
					}) && m("info", (0, o.sprintf)( /* translators: %s coupon code. */ /* translators: %s coupon code. */
						(0, o.__)('Coupon code "%s" has been applied to your cart.', "woocommerce"), t), {
						id: "coupon-form",
						type: "snackbar",
						context: e
					}), Promise.resolve(!0)))).catch((e => {
						const t = (e => {
							var t, s, o, n;
							return y && y > 0 && null != e && null !== (t = e.data) && void 0 !== t && null !== (s = t.details) && void 0 !== s && s.checkout ? e.data.details.checkout : null != e && null !== (o = e.data) && void 0 !== o && null !== (n = o.details) && void 0 !== n && n.cart ? e.data.details.cart : e.message
						})(e);
						return p({
							coupon: {
								message: (0, r.decodeEntities)(t),
								hidden: !1
							}
						}), Promise.resolve(!1)
					})),
					removeCoupon: t => g(t).then((() => ((0, c.applyCheckoutFilter)({
						filterName: "showRemoveCouponNotice",
						defaultValue: !0,
						arg: {
							couponCode: t,
							context: e
						}
					}) && m("info", (0, o.sprintf)( /* translators: %s coupon code. */ /* translators: %s coupon code. */
						(0, o.__)('Coupon code "%s" has been removed from your cart.', "woocommerce"), t), {
						id: "coupon-form",
						type: "snackbar",
						context: e
					}), Promise.resolve(!0)))).catch((t => (l(t.message, {
						id: "coupon-form",
						context: e
					}), Promise.resolve(!1)))),
					isApplyingCoupon: d,
					isRemovingCoupon: u
				}
			}
		},
		4738: (e, t, s) => {
			"use strict";
			s.d(t, {
				E: () => i,
				X: () => l
			});
			var o = s(9530),
				n = s(4613),
				a = s(9818),
				r = s(4801);
			const c = (e = !1) => {
					const {
						paymentMethodsInitialized: t,
						expressPaymentMethodsInitialized: s,
						availablePaymentMethods: c,
						availableExpressPaymentMethods: i
					} = (0, a.useSelect)((e => {
						const t = e(r.PAYMENT_STORE_KEY);
						return {
							paymentMethodsInitialized: t.paymentMethodsInitialized(),
							expressPaymentMethodsInitialized: t.expressPaymentMethodsInitialized(),
							availableExpressPaymentMethods: t.getAvailableExpressPaymentMethods(),
							availablePaymentMethods: t.getAvailablePaymentMethods()
						}
					})), l = Object.values(c).map((({
						name: e
					}) => e)), m = Object.values(i).map((({
						name: e
					}) => e)), p = (0, n.getPaymentMethods)(), d = (0, n.getExpressPaymentMethods)(), u = Object.keys(p).reduce(((e, t) => (l.includes(t) && (e[t] = p[t]), e)), {}), h = Object.keys(d).reduce(((e, t) => (m.includes(t) && (e[t] = d[t]), e)), {}), g = (0, o.s)(u), y = (0, o.s)(h);
					return {
						paymentMethods: e ? y : g,
						isInitialized: e ? s : t
					}
				},
				i = () => c(!1),
				l = () => c(!0)
		},
		9530: (e, t, s) => {
			"use strict";
			s.d(t, {
				s: () => r
			});
			var o = s(9307),
				n = s(9127),
				a = s.n(n);

			function r(e) {
				const t = (0, o.useRef)(e);
				return a()(e, t.current) || (t.current = e), t.current
			}
		},
		1538: (e, t, s) => {
			"use strict";
			s.r(t), s.d(t, {
				default: () => W
			});
			var o = s(9196),
				n = s(9659),
				a = s(7608),
				r = s.n(a),
				c = s(5736),
				i = s(4738),
				l = s(8027),
				m = s(711),
				p = s(6881),
				d = s(9818),
				u = s(4801),
				h = s(4293),
				g = s(9307),
				y = s(444);
			const E = (0, o.createElement)(y.SVG, {
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 24 24"
			}, (0, o.createElement)("g", {
				fill: "none",
				fillRule: "evenodd"
			}, (0, o.createElement)("path", {
				d: "M0 0h24v24H0z"
			}), (0, o.createElement)("path", {
				fill: "#000",
				fillRule: "nonzero",
				d: "M17.3 8v1c1 .2 1.4.9 1.4 1.7h-1c0-.6-.3-1-1-1-.8 0-1.3.4-1.3.9 0 .4.3.6 1.4 1 1 .2 2 .6 2 1.9 0 .9-.6 1.4-1.5 1.5v1H16v-1c-.9-.1-1.6-.7-1.7-1.7h1c0 .6.4 1 1.3 1 1 0 1.2-.5 1.2-.8 0-.4-.2-.8-1.3-1.1-1.3-.3-2.1-.8-2.1-1.8 0-.9.7-1.5 1.6-1.6V8h1.3zM12 10v1H6v-1h6zm2-2v1H6V8h8zM2 4v16h20V4H2zm2 14V6h16v12H4z"
			}), (0, o.createElement)("path", {
				stroke: "#000",
				strokeLinecap: "round",
				d: "M6 16c2.6 0 3.9-3 1.7-3-2 0-1 3 1.5 3 1 0 1-.8 2.8-.8"
			})));
			var v = s(214),
				P = s(1231),
				S = s(3326),
				b = s(2911),
				C = s(6946);
			s(3169);
			const _ = {
					bank: v.Z,
					bill: P.Z,
					card: S.Z,
					checkPayment: E
				},
				k = ({
					icon: e = "",
					text: t = ""
				}) => {
					const s = !!e,
						n = (0, g.useCallback)((e => s && (0, C.isString)(e) && (0, C.objectHasProp)(_, e)), [s]),
						a = r()("wc-block-components-payment-method-label", {
							"wc-block-components-payment-method-label--with-icon": s
						});
					return (0, o.createElement)("span", {
						className: a
					}, n(e) ? (0, o.createElement)(b.Z, {
						icon: _[e]
					}) : e, t)
				};
			var f = s(2454),
				w = s(4617),
				R = s(7180),
				M = s.n(R),
				x = s(9095),
				I = s(1715),
				T = s(6410),
				A = s(5576);
			const N = (e, t) => {
				const s = [],
					o = (t, s) => {
						const o = s + "_tax",
							n = (0, C.objectHasProp)(e, s) && (0, C.isString)(e[s]) ? parseInt(e[s], 10) : 0;
						return {
							key: s,
							label: t,
							value: n,
							valueWithTax: n + ((0, C.objectHasProp)(e, o) && (0, C.isString)(e[o]) ? parseInt(e[o], 10) : 0)
						}
					};
				return s.push(o((0, c.__)("Subtotal: Edit by Xl ", "woocommerce"), "total_items")), s.push(o((0, c.__)("Fees:", "woocommerce"), "total_fees")), s.push(o((0, c.__)("Discount:", "woocommerce"), "total_discount")), s.push({
					key: "total_tax",
					label: (0, c.__)("Taxes:", "woocommerce"),
					value: parseInt(e.total_tax, 10),
					valueWithTax: parseInt(e.total_tax, 10)
				}), t && s.push(o((0, c.__)("Shipping:", "woocommerce"), "total_shipping")), s
			};
			var O = s(3251),
				D = s(8449),
				F = s(7708);
			class V extends g.Component {
				constructor(...e) {
					super(...e), (0, F.Z)(this, "state", {
						errorMessage: "",
						hasError: !1
					})
				}
				static getDerivedStateFromError(e) {
					return {
						errorMessage: e.message,
						hasError: !0
					}
				}
				render() {
					const {
						hasError: e,
						errorMessage: t
					} = this.state, {
						isEditor: s
					} = this.props;
					if (e) {
						let e = (0, c.__)("We are experiencing difficulties with this payment method. Please contact us for assistance.", "woocommerce");
						(s || w.CURRENT_USER_IS_ADMIN) && (e = t || (0, c.__)("There was an error with this payment method. Please verify it's configured correctly.", "woocommerce"));
						const n = [{
							id: "0",
							content: e,
							isDismissible: !1,
							status: "error"
						}];
						return (0, o.createElement)(m.StoreNoticesContainer, {
							additionalNotices: n,
							context: l.n7.PAYMENTS
						})
					}
					return this.props.children
				}
			}
			const Y = V,
				K = "wc/store/payment",
				z = () => {
					const {
						isEditor: e
					} = (0, D._)(), {
						activePaymentMethod: t,
						paymentMethodData: s
					} = (0, d.useSelect)((e => {
						const t = e(K);
						return {
							activePaymentMethod: t.getActivePaymentMethod(),
							paymentMethodData: t.getPaymentMethodData()
						}
					})), {
						__internalSetActivePaymentMethod: a,
						__internalSetExpressPaymentStarted: r,
						__internalSetPaymentIdle: y,
						__internalSetPaymentError: E,
						__internalSetPaymentMethodData: v,
						__internalSetExpressPaymentError: P
					} = (0, d.useDispatch)(K), {
						paymentMethods: S
					} = (0, i.X)(), b = (() => {
						const {
							onCheckoutBeforeProcessing: e,
							onCheckoutValidationBeforeProcessing: t,
							onCheckoutAfterProcessingWithSuccess: s,
							onCheckoutAfterProcessingWithError: o,
							onSubmit: a,
							onCheckoutSuccess: r,
							onCheckoutFail: i,
							onCheckoutValidation: y
						} = (0, I.U)(), {
							isCalculating: E,
							isComplete: v,
							isIdle: P,
							isProcessing: S,
							customerId: b
						} = (0, d.useSelect)((e => {
							const t = e(u.CHECKOUT_STORE_KEY);
							return {
								isComplete: t.isComplete(),
								isIdle: t.isIdle(),
								isProcessing: t.isProcessing(),
								customerId: t.getCustomerId(),
								isCalculating: t.isCalculating()
							}
						})), {
							paymentStatus: C,
							activePaymentMethod: _,
							shouldSavePayment: R
						} = (0, d.useSelect)((e => {
							const t = e(u.PAYMENT_STORE_KEY);
							return {
								paymentStatus: {
									get isPristine() {
										return M()("isPristine", {
											since: "9.6.0",
											alternative: "isIdle",
											plugin: "WooCommerce Blocks",
											link: "https://github.com/woocommerce/woocommerce-blocks/pull/8110"
										}), t.isPaymentIdle()
									},
									isIdle: t.isPaymentIdle(),
									isStarted: t.isExpressPaymentStarted(),
									isProcessing: t.isPaymentProcessing(),
									get isFinished() {
										return M()("isFinished", {
											since: "9.6.0",
											plugin: "WooCommerce Blocks",
											link: "https://github.com/woocommerce/woocommerce-blocks/pull/8110"
										}), t.hasPaymentError() || t.isPaymentReady()
									},
									hasError: t.hasPaymentError(),
									get hasFailed() {
										return M()("hasFailed", {
											since: "9.6.0",
											plugin: "WooCommerce Blocks",
											link: "https://github.com/woocommerce/woocommerce-blocks/pull/8110"
										}), t.hasPaymentError()
									},
									get isSuccessful() {
										return M()("isSuccessful", {
											since: "9.6.0",
											plugin: "WooCommerce Blocks",
											link: "https://github.com/woocommerce/woocommerce-blocks/pull/8110"
										}), t.isPaymentReady()
									},
									isReady: t.isPaymentReady(),
									isDoingExpressPayment: t.isExpressPaymentMethodActive()
								},
								activePaymentMethod: t.getActivePaymentMethod(),
								shouldSavePayment: t.getShouldSavePaymentMethod()
							}
						})), {
							__internalSetExpressPaymentError: D
						} = (0, d.useDispatch)(u.PAYMENT_STORE_KEY), {
							onPaymentProcessing: F,
							onPaymentSetup: V
						} = (0, T.P)(), {
							shippingErrorStatus: Y,
							shippingErrorTypes: K,
							onShippingRateSuccess: z,
							onShippingRateFail: B,
							onShippingRateSelectSuccess: W,
							onShippingRateSelectFail: j
						} = (0, A.d)(), {
							shippingRates: H,
							isLoadingRates: L,
							selectedRates: Z,
							isSelectingRate: U,
							selectShippingRate: X,
							needsShipping: J
						} = (0, O.V)(), {
							billingAddress: G,
							shippingAddress: $
						} = (0, d.useSelect)((e => e(u.CART_STORE_KEY).getCustomerData())), {
							setShippingAddress: q
						} = (0, d.useDispatch)(u.CART_STORE_KEY), {
							cartItems: Q,
							cartFees: ee,
							cartTotals: te,
							extensions: se
						} = (0, n.b)(), {
							appliedCoupons: oe
						} = (0, x.K)(), ne = (0, g.useRef)(N(te, J)), ae = (0, g.useRef)({
							label: (0, c.__)("Total Edit by xl 1", "woocommerce"),
							value: parseInt(te.total_price, 10)
						});
						(0, g.useEffect)((() => {
							ne.current = N(te, J), ae.current = {
								label: (0, c.__)("Total Edit by xl 2", "woocommerce"),
								value: parseInt(te.total_price, 10)
							}
						}), [te, J]);
						const re = (0, g.useCallback)(((e = "") => {
							M()("setExpressPaymentError should only be used by Express Payment Methods (using the provided onError handler).", {
								alternative: "",
								plugin: "woocommerce-gutenberg-products-block",
								link: "https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/4228"
							}), D(e)
						}), [D]);
						return {
							activePaymentMethod: _,
							billing: {
								appliedCoupons: oe,
								billingAddress: G,
								billingData: G,
								cartTotal: ae.current,
								cartTotalItems: ne.current,
								currency: (0, h.getCurrencyFromPriceResponse)(te),
								customerId: b,
								displayPricesIncludingTax: (0, w.getSetting)("displayCartPricesIncludingTax", !1)
							},
							cartData: {
								cartItems: Q,
								cartFees: ee,
								extensions: se
							},
							checkoutStatus: {
								isCalculating: E,
								isComplete: v,
								isIdle: P,
								isProcessing: S
							},
							components: {
								LoadingMask: p.Z,
								PaymentMethodIcons: f.Z,
								PaymentMethodLabel: k,
								ValidationInputError: m.ValidationInputError
							},
							emitResponse: {
								noticeContexts: l.n7,
								responseTypes: l.dO
							},
							eventRegistration: {
								onCheckoutAfterProcessingWithError: o,
								onCheckoutAfterProcessingWithSuccess: s,
								onCheckoutBeforeProcessing: e,
								onCheckoutValidationBeforeProcessing: t,
								onCheckoutSuccess: r,
								onCheckoutFail: i,
								onCheckoutValidation: y,
								onPaymentProcessing: F,
								onPaymentSetup: V,
								onShippingRateFail: B,
								onShippingRateSelectFail: j,
								onShippingRateSelectSuccess: W,
								onShippingRateSuccess: z
							},
							onSubmit: a,
							paymentStatus: C,
							setExpressPaymentError: re,
							shippingData: {
								isSelectingRate: U,
								needsShipping: J,
								selectedRates: Z,
								setSelectedRates: X,
								setShippingAddress: q,
								shippingAddress: $,
								shippingRates: H,
								shippingRatesLoading: L
							},
							shippingStatus: {
								shippingErrorStatus: Y,
								shippingErrorTypes: K
							},
							shouldSavePayment: R
						}
					})(), C = (0, g.useRef)(t), _ = (0, g.useRef)(s), R = (0, g.useCallback)((e => () => {
						C.current = t, _.current = s, r(), a(e)
					}), [t, s, a, r]), F = (0, g.useCallback)((() => {
						y(), a(C.current, _.current)
					}), [a, y]), V = (0, g.useCallback)((e => {
						E(), v(e), P(e), a(C.current, _.current)
					}), [a, E, v, P]), z = (0, g.useCallback)(((e = "") => {
						M()("Express Payment Methods should use the provided onError handler instead.", {
							alternative: "onError",
							plugin: "woocommerce-gutenberg-products-block",
							link: "https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/4228"
						}), e ? V(e) : P("")
					}), [P, V]), B = Object.entries(S), W = B.length > 0 ? B.map((([t, s]) => {
						const n = e ? s.edit : s.content;
						return (0, g.isValidElement)(n) ? (0, o.createElement)("li", {
							key: t,
							id: `express-payment-method-${t}`
						}, (0, g.cloneElement)(n, {
							...b,
							onClick: R(t),
							onClose: F,
							onError: V,
							setExpressPaymentError: z
						})) : null
					})) : (0, o.createElement)("li", {
						key: "noneRegistered"
					}, (0, c.__)("No registered Payment Methods", "woocommerce"));
					return (0, o.createElement)(Y, {
						isEditor: e
					}, (0, o.createElement)("ul", {
						className: "wc-block-components-express-payment__event-buttons"
					}, W))
				};
			s(9660);
			const B = () => {
					const {
						paymentMethods: e,
						isInitialized: t
					} = (0, i.X)(), {
						isCalculating: s,
						isProcessing: n,
						isAfterProcessing: a,
						isBeforeProcessing: r,
						isComplete: h,
						hasError: g
					} = (0, d.useSelect)((e => {
						const t = e(u.CHECKOUT_STORE_KEY);
						return {
							isCalculating: t.isCalculating(),
							isProcessing: t.isProcessing(),
							isAfterProcessing: t.isAfterProcessing(),
							isBeforeProcessing: t.isBeforeProcessing(),
							isComplete: t.isComplete(),
							hasError: t.hasError()
						}
					})), y = (0, d.useSelect)((e => e(u.PAYMENT_STORE_KEY).isExpressPaymentMethodActive()));
					if (!t || t && 0 === Object.keys(e).length) return null;
					const E = n || a || r || h && !g;
					return (0, o.createElement)(o.Fragment, null, (0, o.createElement)(p.Z, {
						isLoading: s || E || y
					}, (0, o.createElement)("div", {
						className: "wc-block-components-express-payment wc-block-components-express-payment--cart"
					}, (0, o.createElement)("div", {
						className: "wc-block-components-express-payment__content"
					}, (0, o.createElement)(m.StoreNoticesContainer, {
						context: l.n7.EXPRESS_PAYMENTS
					}), (0, o.createElement)(z, null)))), (0, o.createElement)("div", {
						className: "wc-block-components-express-payment-continue-rule wc-block-components-express-payment-continue-rule--cart"
					}, (0, c.__)("Or", "woocommerce")))
				},
				W = ({
					className: e
				}) => {
					const {
						cartNeedsPayment: t
					} = (0, n.b)();
					return t ? (0, o.createElement)("div", {
						className: r()("wc-block-cart__payment-options", e)
					}, (0, o.createElement)(B, null)) : null
				}
		},
		6391: () => {},
		3169: () => {},
		9660: () => {}
	}
]);