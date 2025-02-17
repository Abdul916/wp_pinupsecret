(self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || []).push([
	[1370], {
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
		7673: (e, t, s) => {
			"use strict";
			s.d(t, {
				Z: () => h
			});
			var o = s(9196),
				n = s(7608),
				a = s.n(n),
				r = s(6574),
				c = s(214),
				i = s(1231),
				l = s(3326),
				m = s(2911),
				p = s(6946),
				d = s(9307);
			s(3169);
			const u = {
					bank: c.Z,
					bill: i.Z,
					card: l.Z,
					checkPayment: r.Z
				},
				h = ({
					icon: e = "",
					text: t = ""
				}) => {
					const s = !!e,
						n = (0, d.useCallback)((e => s && (0, p.isString)(e) && (0, p.objectHasProp)(u, e)), [s]),
						r = a()("wc-block-components-payment-method-label", {
							"wc-block-components-payment-method-label--with-icon": s
						});
					return (0, o.createElement)("span", {
						className: r
					}, n(e) ? (0, o.createElement)(m.Z, {
						icon: u[e]
					}) : e, t)
				}
		},
		6881: (e, t, s) => {
			"use strict";
			s.d(t, {
				Z: () => i
			});
			var o = s(9196),
				n = s(5736),
				a = s(7608),
				r = s.n(a),
				c = s(711);
			s(991);
			const i = ({
				children: e,
				className: t,
				screenReaderLabel: s,
				showSpinner: a = !1,
				isLoading: i = !0
			}) => (0, o.createElement)("div", {
				className: r()(t, {
					"wc-block-components-loading-mask": i
				})
			}, i && a && (0, o.createElement)(c.Spinner, null), (0, o.createElement)("div", {
				className: r()({
					"wc-block-components-loading-mask__children": i
				}),
				"aria-hidden": i
			}, e), i && (0, o.createElement)("span", {
				className: "screen-reader-text"
			}, s || (0, n.__)("Loading…", "woocommerce")))
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
		1116: (e, t, s) => {
			"use strict";
			s.d(t, {
				z: () => C
			});
			var o = s(5736),
				n = s(4293),
				a = s(9307),
				r = s(7673),
				c = s(2454),
				i = s(4617),
				l = s(7180),
				m = s.n(l),
				p = s(6881),
				d = s(9818),
				u = s(4801),
				h = s(711),
				g = s(9659),
				y = s(9095),
				E = s(8027),
				v = s(1715),
				P = s(6410),
				S = s(5576),
				b = s(401),
				_ = s(3251);
			const C = () => {
				const {
					onCheckoutBeforeProcessing: e,
					onCheckoutValidationBeforeProcessing: t,
					onCheckoutAfterProcessingWithSuccess: s,
					onCheckoutAfterProcessingWithError: l,
					onSubmit: C,
					onCheckoutSuccess: k,
					onCheckoutFail: w,
					onCheckoutValidation: x
				} = (0, v.U)(), {
					isCalculating: M,
					isComplete: R,
					isIdle: f,
					isProcessing: A,
					customerId: I
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
					paymentStatus: T,
					activePaymentMethod: N,
					shouldSavePayment: O
				} = (0, d.useSelect)((e => {
					const t = e(u.PAYMENT_STORE_KEY);
					return {
						paymentStatus: {
							get isPristine() {
								return m()("isPristine", {
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
								return m()("isFinished", {
									since: "9.6.0",
									plugin: "WooCommerce Blocks",
									link: "https://github.com/woocommerce/woocommerce-blocks/pull/8110"
								}), t.hasPaymentError() || t.isPaymentReady()
							},
							hasError: t.hasPaymentError(),
							get hasFailed() {
								return m()("hasFailed", {
									since: "9.6.0",
									plugin: "WooCommerce Blocks",
									link: "https://github.com/woocommerce/woocommerce-blocks/pull/8110"
								}), t.hasPaymentError()
							},
							get isSuccessful() {
								return m()("isSuccessful", {
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
					onPaymentProcessing: z,
					onPaymentSetup: F
				} = (0, P.P)(), {
					shippingErrorStatus: L,
					shippingErrorTypes: Y,
					onShippingRateSuccess: V,
					onShippingRateFail: Z,
					onShippingRateSelectSuccess: K,
					onShippingRateSelectFail: B
				} = (0, S.d)(), {
					shippingRates: W,
					isLoadingRates: j,
					selectedRates: H,
					isSelectingRate: U,
					selectShippingRate: X,
					needsShipping: J
				} = (0, _.V)(), {
					billingAddress: G,
					shippingAddress: $
				} = (0, d.useSelect)((e => e(u.CART_STORE_KEY).getCustomerData())), {
					setShippingAddress: q
				} = (0, d.useDispatch)(u.CART_STORE_KEY), {
					cartItems: Q,
					cartFees: ee,
					cartTotals: te,
					extensions: se
				} = (0, g.b)(), {
					appliedCoupons: oe
				} = (0, y.K)(), ne = (0, a.useRef)((0, b.a)(te, J)), ae = (0, a.useRef)({
					label: (0, o.__)("Total", "woocommerce"),
					value: parseInt(te.total_price, 10)
				});
				(0, a.useEffect)((() => {
					ne.current = (0, b.a)(te, J), ae.current = {
						label: (0, o.__)("Total", "woocommerce"),
						value: parseInt(te.total_price, 10)
					}
				}), [te, J]);
				const re = (0, a.useCallback)(((e = "") => {
					m()("setExpressPaymentError should only be used by Express Payment Methods (using the provided onError handler).", {
						alternative: "",
						plugin: "woocommerce-gutenberg-products-block",
						link: "https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/4228"
					}), D(e)
				}), [D]);
				return {
					activePaymentMethod: N,
					billing: {
						appliedCoupons: oe,
						billingAddress: G,
						billingData: G,
						cartTotal: ae.current,
						cartTotalItems: ne.current,
						currency: (0, n.getCurrencyFromPriceResponse)(te),
						customerId: I,
						displayPricesIncludingTax: (0, i.getSetting)("displayCartPricesIncludingTax", !1)
					},
					cartData: {
						cartItems: Q,
						cartFees: ee,
						extensions: se
					},
					checkoutStatus: {
						isCalculating: M,
						isComplete: R,
						isIdle: f,
						isProcessing: A
					},
					components: {
						LoadingMask: p.Z,
						PaymentMethodIcons: c.Z,
						PaymentMethodLabel: r.Z,
						ValidationInputError: h.ValidationInputError
					},
					emitResponse: {
						noticeContexts: E.n7,
						responseTypes: E.dO
					},
					eventRegistration: {
						onCheckoutAfterProcessingWithError: l,
						onCheckoutAfterProcessingWithSuccess: s,
						onCheckoutBeforeProcessing: e,
						onCheckoutValidationBeforeProcessing: t,
						onCheckoutSuccess: k,
						onCheckoutFail: w,
						onCheckoutValidation: x,
						onPaymentProcessing: z,
						onPaymentSetup: F,
						onShippingRateFail: Z,
						onShippingRateSelectFail: B,
						onShippingRateSelectSuccess: K,
						onShippingRateSuccess: V
					},
					onSubmit: C,
					paymentStatus: T,
					setExpressPaymentError: re,
					shippingData: {
						isSelectingRate: U,
						needsShipping: J,
						selectedRates: H,
						setSelectedRates: X,
						setShippingAddress: q,
						shippingAddress: $,
						shippingRates: W,
						shippingRatesLoading: j
					},
					shippingStatus: {
						shippingErrorStatus: L,
						shippingErrorTypes: Y
					},
					shouldSavePayment: O
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
		401: (e, t, s) => {
			"use strict";
			s.d(t, {
				a: () => a
			});
			var o = s(5736),
				n = s(6946);
			const a = (e, t) => {
				const s = [],
					a = (t, s) => {
						const o = s + "_tax",
							a = (0, n.objectHasProp)(e, s) && (0, n.isString)(e[s]) ? parseInt(e[s], 10) : 0;
						return {
							key: s,
							label: t,
							value: a,
							valueWithTax: a + ((0, n.objectHasProp)(e, o) && (0, n.isString)(e[o]) ? parseInt(e[o], 10) : 0)
						}
					};
				return s.push(a((0, o.__)("Subtotal:", "woocommerce"), "total_items")), s.push(a((0, o.__)("Fees:", "woocommerce"), "total_fees")), s.push(a((0, o.__)("Discount:", "woocommerce"), "total_discount")), s.push({
					key: "total_tax",
					label: (0, o.__)("Taxes:", "woocommerce"),
					value: parseInt(e.total_tax, 10),
					valueWithTax: parseInt(e.total_tax, 10)
				}), t && s.push(a((0, o.__)("Shipping:", "woocommerce"), "total_shipping")), s
			}
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
		2444: (e, t, s) => {
			"use strict";
			s.d(t, {
				Z: () => p
			});
			var o = s(7708),
				n = s(9196),
				a = s(5736),
				r = s(9307),
				c = s(4617),
				i = s(711),
				l = s(8027);
			class m extends r.Component {
				constructor(...e) {
					super(...e), (0, o.Z)(this, "state", {
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
						let e = (0, a.__)("We are experiencing difficulties with this payment method. Please contact us for assistance.", "woocommerce");
						(s || c.CURRENT_USER_IS_ADMIN) && (e = t || (0, a.__)("There was an error with this payment method. Please verify it's configured correctly.", "woocommerce"));
						const o = [{
							id: "0",
							content: e,
							isDismissible: !1,
							status: "error"
						}];
						return (0, n.createElement)(i.StoreNoticesContainer, {
							additionalNotices: o,
							context: l.n7.PAYMENTS
						})
					}
					return this.props.children
				}
			}
			const p = m
		},
		2933: (e, t, s) => {
			"use strict";
			s.r(t), s.d(t, {
				default: () => _
			});
			var o = s(9196),
				n = s(9659),
				a = s(5736),
				r = s(8449),
				c = s(8027),
				i = s(711),
				l = s(6881),
				m = s(4617),
				p = s(4801),
				d = s(9818),
				u = s(4738),
				h = s(1116),
				g = s(9307),
				y = s(7180),
				E = s.n(y),
				v = s(2444),
				P = s(940);
			const S = () => {
				const {
					isEditor: e
				} = (0, r._)(), {
					activePaymentMethod: t,
					paymentMethodData: s
				} = (0, d.useSelect)((e => {
					const t = e(P.L);
					return {
						activePaymentMethod: t.getActivePaymentMethod(),
						paymentMethodData: t.getPaymentMethodData()
					}
				})), {
					__internalSetActivePaymentMethod: n,
					__internalSetExpressPaymentStarted: c,
					__internalSetPaymentIdle: i,
					__internalSetPaymentError: l,
					__internalSetPaymentMethodData: m,
					__internalSetExpressPaymentError: p
				} = (0, d.useDispatch)(P.L), {
					paymentMethods: y
				} = (0, u.X)(), S = (0, h.z)(), b = (0, g.useRef)(t), _ = (0, g.useRef)(s), C = (0, g.useCallback)((e => () => {
					b.current = t, _.current = s, c(), n(e)
				}), [t, s, n, c]), k = (0, g.useCallback)((() => {
					i(), n(b.current, _.current)
				}), [n, i]), w = (0, g.useCallback)((e => {
					l(), m(e), p(e), n(b.current, _.current)
				}), [n, l, m, p]), x = (0, g.useCallback)(((e = "") => {
					E()("Express Payment Methods should use the provided onError handler instead.", {
						alternative: "onError",
						plugin: "woocommerce-gutenberg-products-block",
						link: "https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/4228"
					}), e ? w(e) : p("")
				}), [p, w]), M = Object.entries(y), R = M.length > 0 ? M.map((([t, s]) => {
					const n = e ? s.edit : s.content;
					return (0, g.isValidElement)(n) ? (0, o.createElement)("li", {
						key: t,
						id: `express-payment-method-${t}`
					}, (0, g.cloneElement)(n, {
						...S,
						onClick: C(t),
						onClose: k,
						onError: w,
						setExpressPaymentError: x
					})) : null
				})) : (0, o.createElement)("li", {
					key: "noneRegistered"
				}, (0, a.__)("No registered Payment Methods", "woocommerce"));
				return (0, o.createElement)(v.Z, {
					isEditor: e
				}, (0, o.createElement)("ul", {
					className: "wc-block-components-express-payment__event-buttons"
				}, R))
			};
			s(9660);
			const b = () => {
					const {
						isCalculating: e,
						isProcessing: t,
						isAfterProcessing: s,
						isBeforeProcessing: n,
						isComplete: u,
						hasError: h
					} = (0, d.useSelect)((e => {
						const t = e(p.CHECKOUT_STORE_KEY);
						return {
							isCalculating: t.isCalculating(),
							isProcessing: t.isProcessing(),
							isAfterProcessing: t.isAfterProcessing(),
							isBeforeProcessing: t.isBeforeProcessing(),
							isComplete: t.isComplete(),
							hasError: t.hasError()
						}
					})), {
						availableExpressPaymentMethods: g,
						expressPaymentMethodsInitialized: y,
						isExpressPaymentMethodActive: E
					} = (0, d.useSelect)((e => {
						const t = e(p.PAYMENT_STORE_KEY);
						return {
							availableExpressPaymentMethods: t.getAvailableExpressPaymentMethods(),
							expressPaymentMethodsInitialized: t.expressPaymentMethodsInitialized(),
							isExpressPaymentMethodActive: t.isExpressPaymentMethodActive()
						}
					})), {
						isEditor: v
					} = (0, r._)();
					if (!y || y && 0 === Object.keys(g).length) return v || m.CURRENT_USER_IS_ADMIN ? (0, o.createElement)(i.StoreNoticesContainer, {
						context: c.n7.EXPRESS_PAYMENTS
					}) : null;
					const P = t || s || n || u && !h;
					return (0, o.createElement)(o.Fragment, null, (0, o.createElement)(l.Z, {
						isLoading: e || P || E
					}, (0, o.createElement)("div", {
						className: "wc-block-components-express-payment wc-block-components-express-payment--checkout"
					}, (0, o.createElement)("div", {
						className: "wc-block-components-express-payment__title-container"
					}, (0, o.createElement)(i.Title, {
						className: "wc-block-components-express-payment__title",
						headingLevel: "2"
					}, (0, a.__)("Express Checkout", "woocommerce"))), (0, o.createElement)("div", {
						className: "wc-block-components-express-payment__content"
					}, (0, o.createElement)(i.StoreNoticesContainer, {
						context: c.n7.EXPRESS_PAYMENTS
					}), (0, o.createElement)(S, null)))), (0, o.createElement)("div", {
						className: "wc-block-components-express-payment-continue-rule wc-block-components-express-payment-continue-rule--checkout"
					}, (0, a.__)("Or continue below", "woocommerce")))
				},
				_ = ({
					className: e
				}) => {
					const {
						cartNeedsPayment: t
					} = (0, n.b)();
					return t ? (0, o.createElement)("div", {
						className: e
					}, (0, o.createElement)(b, null)) : null
				}
		},
		940: (e, t, s) => {
			"use strict";
			s.d(t, {
				L: () => o
			});
			const o = "wc/store/payment"
		},
		6574: (e, t, s) => {
			"use strict";
			s.d(t, {
				Z: () => a
			});
			var o = s(9196),
				n = s(444);
			const a = (0, o.createElement)(n.SVG, {
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
			})))
		},
		6391: () => {},
		3169: () => {},
		991: () => {},
		9660: () => {}
	}
]);