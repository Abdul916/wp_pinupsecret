(self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || []).push([
	[7162], {
		2904: (e, t, s) => {
			"use strict";
			s.d(t, {
				Z: () => c
			});
			var n = s(9196),
				o = s(9770),
				a = s(7608),
				i = s.n(a),
				r = (s(1029), s(2595));
			const c = ({
				className: e,
				showSpinner: t = !1,
				children: s,
				variant: a = "contained",
				...c
			}) => {
				const l = i()("wc-block-components-button", "wp-element-button", e, a, {
					"wc-block-components-button--loading": t
				});
				return (0, n.createElement)(o.Z, {
					className: l,
					...c
				}, t && (0, n.createElement)(r.Z, null), (0, n.createElement)("span", {
					className: "wc-block-components-button__text"
				}, s))
			}
		},
		4570: (e, t, s) => {
			"use strict";
			s.d(t, {
				C: () => a
			});
			var n = s(8752);
			const o = [{
					id: "alipay",
					alt: "Alipay",
					src: n.td + "payment-methods/alipay.svg"
				}, {
					id: "amex",
					alt: "American Express",
					src: n.td + "payment-methods/amex.svg"
				}, {
					id: "bancontact",
					alt: "Bancontact",
					src: n.td + "payment-methods/bancontact.svg"
				}, {
					id: "diners",
					alt: "Diners Club",
					src: n.td + "payment-methods/diners.svg"
				}, {
					id: "discover",
					alt: "Discover",
					src: n.td + "payment-methods/discover.svg"
				}, {
					id: "eps",
					alt: "EPS",
					src: n.td + "payment-methods/eps.svg"
				}, {
					id: "giropay",
					alt: "Giropay",
					src: n.td + "payment-methods/giropay.svg"
				}, {
					id: "ideal",
					alt: "iDeal",
					src: n.td + "payment-methods/ideal.svg"
				}, {
					id: "jcb",
					alt: "JCB",
					src: n.td + "payment-methods/jcb.svg"
				}, {
					id: "laser",
					alt: "Laser",
					src: n.td + "payment-methods/laser.svg"
				}, {
					id: "maestro",
					alt: "Maestro",
					src: n.td + "payment-methods/maestro.svg"
				}, {
					id: "mastercard",
					alt: "Mastercard",
					src: n.td + "payment-methods/mastercard.svg"
				}, {
					id: "multibanco",
					alt: "Multibanco",
					src: n.td + "payment-methods/multibanco.svg"
				}, {
					id: "p24",
					alt: "Przelewy24",
					src: n.td + "payment-methods/p24.svg"
				}, {
					id: "sepa",
					alt: "Sepa",
					src: n.td + "payment-methods/sepa.svg"
				}, {
					id: "sofort",
					alt: "Sofort",
					src: n.td + "payment-methods/sofort.svg"
				}, {
					id: "unionpay",
					alt: "Union Pay",
					src: n.td + "payment-methods/unionpay.svg"
				}, {
					id: "visa",
					alt: "Visa",
					src: n.td + "payment-methods/visa.svg"
				}, {
					id: "wechat",
					alt: "WeChat",
					src: n.td + "payment-methods/wechat.svg"
				}],
				a = e => o.find((t => t.id === e)) || {}
		},
		2454: (e, t, s) => {
			"use strict";
			s.d(t, {
				Z: () => l
			});
			var n = s(9196),
				o = s(7608),
				a = s.n(o),
				i = s(1368),
				r = s(4570),
				c = s(8999);
			s(6391);
			const l = ({
				icons: e = [],
				align: t = "center",
				className: s
			}) => {
				const o = (0, c.L)(e);
				if (0 === o.length) return null;
				const l = a()("wc-block-components-payment-method-icons", {
					"wc-block-components-payment-method-icons--align-left": "left" === t,
					"wc-block-components-payment-method-icons--align-right": "right" === t
				}, s);
				return (0, n.createElement)("div", {
					className: l
				}, o.map((e => {
					const t = {
						...e,
						...(0, r.C)(e.id)
					};
					return (0, n.createElement)(i.Z, {
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
			var n = s(9196);
			const o = e => `wc-block-components-payment-method-icon wc-block-components-payment-method-icon--${e}`,
				a = ({
					id: e,
					src: t = null,
					alt: s = ""
				}) => t ? (0, n.createElement)("img", {
					className: o(e),
					src: t,
					alt: s
				}) : null
		},
		8999: (e, t, s) => {
			"use strict";
			s.d(t, {
				L: () => o
			});
			var n = s(6946);
			const o = e => {
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
					}), s.id && (0, n.isString)(s.id) && !t[s.id] && (t[s.id] = s)
				})), Object.values(t)
			}
		},
		7673: (e, t, s) => {
			"use strict";
			s.d(t, {
				Z: () => h
			});
			var n = s(9196),
				o = s(7608),
				a = s.n(o),
				i = s(6574),
				r = s(214),
				c = s(1231),
				l = s(3326),
				d = s(2911),
				m = s(6946),
				p = s(9307);
			s(3169);
			const u = {
					bank: r.Z,
					bill: c.Z,
					card: l.Z,
					checkPayment: i.Z
				},
				h = ({
					icon: e = "",
					text: t = ""
				}) => {
					const s = !!e,
						o = (0, p.useCallback)((e => s && (0, m.isString)(e) && (0, m.objectHasProp)(u, e)), [s]),
						i = a()("wc-block-components-payment-method-label", {
							"wc-block-components-payment-method-label--with-icon": s
						});
					return (0, n.createElement)("span", {
						className: i
					}, o(e) ? (0, n.createElement)(d.Z, {
						icon: u[e]
					}) : e, t)
				}
		},
		6881: (e, t, s) => {
			"use strict";
			s.d(t, {
				Z: () => c
			});
			var n = s(9196),
				o = s(5736),
				a = s(7608),
				i = s.n(a),
				r = s(711);
			s(991);
			const c = ({
				children: e,
				className: t,
				screenReaderLabel: s,
				showSpinner: a = !1,
				isLoading: c = !0
			}) => (0, n.createElement)("div", {
				className: i()(t, {
					"wc-block-components-loading-mask": c
				})
			}, c && a && (0, n.createElement)(r.Spinner, null), (0, n.createElement)("div", {
				className: i()({
					"wc-block-components-loading-mask__children": c
				}),
				"aria-hidden": c
			}, e), c && (0, n.createElement)("span", {
				className: "screen-reader-text"
			}, s || (0, o.__)("Loading…", "woocommerce")))
		},
		4787: (e, t, s) => {
			"use strict";
			s.d(t, {
				Z: () => p
			});
			var n = s(9196),
				o = s(7608),
				a = s.n(o),
				i = s(5736),
				r = s(2911),
				c = s(9140),
				l = (s(946), s(9114)),
				d = s(2904),
				m = s(2010);
			const p = ({
				className: e,
				status: t = "default",
				children: s,
				spokenMessage: o = s,
				onRemove: p = (() => {}),
				isDismissible: u = !0,
				politeness: h = (0, l.x)(t),
				summary: g
			}) => ((0, m.o)(o, h), (0, n.createElement)("div", {
				className: a()(e, "wc-block-components-notice-banner", "is-" + t, {
					"is-dismissible": u
				})
			}, (0, n.createElement)(r.Z, {
				icon: (0, l.X)(t)
			}), (0, n.createElement)("div", {
				className: "wc-block-components-notice-banner__content"
			}, g && (0, n.createElement)("p", {
				className: "wc-block-components-notice-banner__summary"
			}, g), s), !!u && (0, n.createElement)(d.Z, {
				className: "wc-block-components-notice-banner__dismiss",
				icon: c.Z,
				label: (0, i.__)("Dismiss this notice", "woocommerce"),
				onClick: e => {
					"function" == typeof(null == e ? void 0 : e.preventDefault) && e.preventDefault && e.preventDefault(), p()
				},
				showTooltip: !1
			})))
		},
		9114: (e, t, s) => {
			"use strict";
			s.d(t, {
				X: () => r,
				x: () => i
			});
			var n = s(202),
				o = s(2720),
				a = s(1242);
			const i = e => {
					switch (e) {
						case "success":
						case "warning":
						case "info":
						case "default":
							return "polite";
						default:
							return "assertive"
					}
				},
				r = e => {
					switch (e) {
						case "success":
							return n.Z;
						case "warning":
						case "info":
						case "error":
							return o.Z;
						default:
							return a.Z
					}
				}
		},
		9095: (e, t, s) => {
			"use strict";
			s.d(t, {
				K: () => l
			});
			var n = s(5736),
				o = s(9818),
				a = s(4801),
				i = s(2629),
				r = s(3554),
				c = s(9659);
			const l = (e = "") => {
				const {
					cartCoupons: t,
					cartIsLoading: s
				} = (0, c.b)(), {
					createErrorNotice: l
				} = (0, o.useDispatch)("core/notices"), {
					createNotice: d
				} = (0, o.useDispatch)("core/notices"), {
					setValidationErrors: m
				} = (0, o.useDispatch)(a.VALIDATION_STORE_KEY), {
					isApplyingCoupon: p,
					isRemovingCoupon: u
				} = (0, o.useSelect)((e => {
					const t = e(a.CART_STORE_KEY);
					return {
						isApplyingCoupon: t.isApplyingCoupon(),
						isRemovingCoupon: t.isRemovingCoupon()
					}
				}), [l, d]), {
					applyCoupon: h,
					removeCoupon: g
				} = (0, o.useDispatch)(a.CART_STORE_KEY), y = (0, o.useSelect)((e => e(a.CHECKOUT_STORE_KEY).getOrderId()));
				return {
					appliedCoupons: t,
					isLoading: s,
					applyCoupon: t => h(t).then((() => ((0, r.applyCheckoutFilter)({
						filterName: "showApplyCouponNotice",
						defaultValue: !0,
						arg: {
							couponCode: t,
							context: e
						}
					}) && d("info", (0, n.sprintf)( /* translators: %s coupon code. */ /* translators: %s coupon code. */
						(0, n.__)('Coupon code "%s" has been applied to your cart.', "woocommerce"), t), {
						id: "coupon-form",
						type: "snackbar",
						context: e
					}), Promise.resolve(!0)))).catch((e => {
						const t = (e => {
							var t, s, n, o;
							return y && y > 0 && null != e && null !== (t = e.data) && void 0 !== t && null !== (s = t.details) && void 0 !== s && s.checkout ? e.data.details.checkout : null != e && null !== (n = e.data) && void 0 !== n && null !== (o = n.details) && void 0 !== o && o.cart ? e.data.details.cart : e.message
						})(e);
						return m({
							coupon: {
								message: (0, i.decodeEntities)(t),
								hidden: !1
							}
						}), Promise.resolve(!1)
					})),
					removeCoupon: t => g(t).then((() => ((0, r.applyCheckoutFilter)({
						filterName: "showRemoveCouponNotice",
						defaultValue: !0,
						arg: {
							couponCode: t,
							context: e
						}
					}) && d("info", (0, n.sprintf)( /* translators: %s coupon code. */ /* translators: %s coupon code. */
						(0, n.__)('Coupon code "%s" has been removed from your cart.', "woocommerce"), t), {
						id: "coupon-form",
						type: "snackbar",
						context: e
					}), Promise.resolve(!0)))).catch((t => (l(t.message, {
						id: "coupon-form",
						context: e
					}), Promise.resolve(!1)))),
					isApplyingCoupon: p,
					isRemovingCoupon: u
				}
			}
		},
		1116: (e, t, s) => {
			"use strict";
			s.d(t, {
				z: () => k
			});
			var n = s(5736),
				o = s(4293),
				a = s(9307),
				i = s(7673),
				r = s(2454),
				c = s(4617),
				l = s(7180),
				d = s.n(l),
				m = s(6881),
				p = s(9818),
				u = s(4801),
				h = s(711),
				g = s(9659),
				y = s(9095),
				v = s(8027),
				_ = s(1715),
				S = s(6410),
				b = s(5576),
				E = s(401),
				P = s(3251);
			const k = () => {
				const {
					onCheckoutBeforeProcessing: e,
					onCheckoutValidationBeforeProcessing: t,
					onCheckoutAfterProcessingWithSuccess: s,
					onCheckoutAfterProcessingWithError: l,
					onSubmit: k,
					onCheckoutSuccess: C,
					onCheckoutFail: w,
					onCheckoutValidation: f
				} = (0, _.U)(), {
					isCalculating: M,
					isComplete: R,
					isIdle: A,
					isProcessing: T,
					customerId: N
				} = (0, p.useSelect)((e => {
					const t = e(u.CHECKOUT_STORE_KEY);
					return {
						isComplete: t.isComplete(),
						isIdle: t.isIdle(),
						isProcessing: t.isProcessing(),
						customerId: t.getCustomerId(),
						isCalculating: t.isCalculating()
					}
				})), {
					paymentStatus: x,
					activePaymentMethod: I,
					shouldSavePayment: D
				} = (0, p.useSelect)((e => {
					const t = e(u.PAYMENT_STORE_KEY);
					return {
						paymentStatus: {
							get isPristine() {
								return d()("isPristine", {
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
								return d()("isFinished", {
									since: "9.6.0",
									plugin: "WooCommerce Blocks",
									link: "https://github.com/woocommerce/woocommerce-blocks/pull/8110"
								}), t.hasPaymentError() || t.isPaymentReady()
							},
							hasError: t.hasPaymentError(),
							get hasFailed() {
								return d()("hasFailed", {
									since: "9.6.0",
									plugin: "WooCommerce Blocks",
									link: "https://github.com/woocommerce/woocommerce-blocks/pull/8110"
								}), t.hasPaymentError()
							},
							get isSuccessful() {
								return d()("isSuccessful", {
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
					__internalSetExpressPaymentError: O
				} = (0, p.useDispatch)(u.PAYMENT_STORE_KEY), {
					onPaymentProcessing: Z,
					onPaymentSetup: F
				} = (0, S.P)(), {
					shippingErrorStatus: Y,
					shippingErrorTypes: L,
					onShippingRateSuccess: K,
					onShippingRateFail: W,
					onShippingRateSelectSuccess: V,
					onShippingRateSelectFail: j
				} = (0, b.d)(), {
					shippingRates: H,
					isLoadingRates: z,
					selectedRates: B,
					isSelectingRate: U,
					selectShippingRate: q,
					needsShipping: $
				} = (0, P.V)(), {
					billingAddress: Q,
					shippingAddress: J
				} = (0, p.useSelect)((e => e(u.CART_STORE_KEY).getCustomerData())), {
					setShippingAddress: G
				} = (0, p.useDispatch)(u.CART_STORE_KEY), {
					cartItems: X,
					cartFees: ee,
					cartTotals: te,
					extensions: se
				} = (0, g.b)(), {
					appliedCoupons: ne
				} = (0, y.K)(), oe = (0, a.useRef)((0, E.a)(te, $)), ae = (0, a.useRef)({
					label: (0, n.__)("Total", "woocommerce"),
					value: parseInt(te.total_price, 10)
				});
				(0, a.useEffect)((() => {
					oe.current = (0, E.a)(te, $), ae.current = {
						label: (0, n.__)("Total", "woocommerce"),
						value: parseInt(te.total_price, 10)
					}
				}), [te, $]);
				const ie = (0, a.useCallback)(((e = "") => {
					d()("setExpressPaymentError should only be used by Express Payment Methods (using the provided onError handler).", {
						alternative: "",
						plugin: "woocommerce-gutenberg-products-block",
						link: "https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/4228"
					}), O(e)
				}), [O]);
				return {
					activePaymentMethod: I,
					billing: {
						appliedCoupons: ne,
						billingAddress: Q,
						billingData: Q,
						cartTotal: ae.current,
						cartTotalItems: oe.current,
						currency: (0, o.getCurrencyFromPriceResponse)(te),
						customerId: N,
						displayPricesIncludingTax: (0, c.getSetting)("displayCartPricesIncludingTax", !1)
					},
					cartData: {
						cartItems: X,
						cartFees: ee,
						extensions: se
					},
					checkoutStatus: {
						isCalculating: M,
						isComplete: R,
						isIdle: A,
						isProcessing: T
					},
					components: {
						LoadingMask: m.Z,
						PaymentMethodIcons: r.Z,
						PaymentMethodLabel: i.Z,
						ValidationInputError: h.ValidationInputError
					},
					emitResponse: {
						noticeContexts: v.n7,
						responseTypes: v.dO
					},
					eventRegistration: {
						onCheckoutAfterProcessingWithError: l,
						onCheckoutAfterProcessingWithSuccess: s,
						onCheckoutBeforeProcessing: e,
						onCheckoutValidationBeforeProcessing: t,
						onCheckoutSuccess: C,
						onCheckoutFail: w,
						onCheckoutValidation: f,
						onPaymentProcessing: Z,
						onPaymentSetup: F,
						onShippingRateFail: W,
						onShippingRateSelectFail: j,
						onShippingRateSelectSuccess: V,
						onShippingRateSuccess: K
					},
					onSubmit: k,
					paymentStatus: x,
					setExpressPaymentError: ie,
					shippingData: {
						isSelectingRate: U,
						needsShipping: $,
						selectedRates: B,
						setSelectedRates: q,
						setShippingAddress: G,
						shippingAddress: J,
						shippingRates: H,
						shippingRatesLoading: z
					},
					shippingStatus: {
						shippingErrorStatus: Y,
						shippingErrorTypes: L
					},
					shouldSavePayment: D
				}
			}
		},
		401: (e, t, s) => {
			"use strict";
			s.d(t, {
				a: () => a
			});
			var n = s(5736),
				o = s(6946);
			const a = (e, t) => {
				const s = [],
					a = (t, s) => {
						const n = s + "_tax",
							a = (0, o.objectHasProp)(e, s) && (0, o.isString)(e[s]) ? parseInt(e[s], 10) : 0;
						return {
							key: s,
							label: t,
							value: a,
							valueWithTax: a + ((0, o.objectHasProp)(e, n) && (0, o.isString)(e[n]) ? parseInt(e[n], 10) : 0)
						}
					};
				return s.push(a((0, n.__)("Subtotal:", "woocommerce"), "total_items")), s.push(a((0, n.__)("Fees:", "woocommerce"), "total_fees")), s.push(a((0, n.__)("Discount:", "woocommerce"), "total_discount")), s.push({
					key: "total_tax",
					label: (0, n.__)("Taxes:", "woocommerce"),
					value: parseInt(e.total_tax, 10),
					valueWithTax: parseInt(e.total_tax, 10)
				}), t && s.push(a((0, n.__)("Shipping:", "woocommerce"), "total_shipping")), s
			}
		},
		2010: (e, t, s) => {
			"use strict";
			s.d(t, {
				o: () => a
			});
			var n = s(9307),
				o = s(5158);
			const a = (e, t) => {
				const s = "string" == typeof e ? e : (0, n.renderToString)(e);
				(0, n.useEffect)((() => {
					s && (0, o.speak)(s, t)
				}), [s, t])
			}
		},
		2444: (e, t, s) => {
			"use strict";
			s.d(t, {
				Z: () => m
			});
			var n = s(7708),
				o = s(9196),
				a = s(5736),
				i = s(9307),
				r = s(4617),
				c = s(711),
				l = s(8027);
			class d extends i.Component {
				constructor(...e) {
					super(...e), (0, n.Z)(this, "state", {
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
						(s || r.CURRENT_USER_IS_ADMIN) && (e = t || (0, a.__)("There was an error with this payment method. Please verify it's configured correctly.", "woocommerce"));
						const n = [{
							id: "0",
							content: e,
							isDismissible: !1,
							status: "error"
						}];
						return (0, o.createElement)(c.StoreNoticesContainer, {
							additionalNotices: n,
							context: l.n7.PAYMENTS
						})
					}
					return this.props.children
				}
			}
			const m = d
		},
		1070: (e, t, s) => {
			"use strict";
			s.d(t, {
				Z: () => o
			});
			var n = s(5736);
			const o = ({
				defaultTitle: e = (0, n.__)("Step", "woocommerce"),
				defaultDescription: t = (0, n.__)("Step description text.", "woocommerce"),
				defaultShowStepNumber: s = !0
			}) => ({
				title: {
					type: "string",
					default: e
				},
				description: {
					type: "string",
					default: t
				},
				showStepNumber: {
					type: "boolean",
					default: s
				}
			})
		},
		9298: (e, t, s) => {
			"use strict";
			s.r(t), s.d(t, {
				default: () => V
			});
			var n = s(9196),
				o = s(7608),
				a = s.n(o),
				i = s(9659),
				r = s(721),
				c = s(711),
				l = s(9818),
				d = s(4801),
				m = s(8027),
				p = s(5736),
				u = s(4787);
			s(7277);
			const h = () => (0, n.createElement)(u.Z, {
				isDismissible: !1,
				className: "wc-block-checkout__no-payment-methods-notice",
				status: "error"
			}, (0, p.__)("There are no payment methods available. This may be an error on our side. Please contact us if you need any help placing your order.", "woocommerce"));
			var g = s(1116),
				y = s(8360),
				v = s(9307),
				_ = s(8449),
				S = s(4613),
				b = s(2444);
			const E = ({
				children: e,
				showSaveOption: t
			}) => {
				const {
					isEditor: s
				} = (0, _._)(), {
					shouldSavePaymentMethod: o,
					customerId: a
				} = (0, l.useSelect)((e => {
					const t = e(d.PAYMENT_STORE_KEY),
						s = e(d.CHECKOUT_STORE_KEY);
					return {
						shouldSavePaymentMethod: t.getShouldSavePaymentMethod(),
						customerId: s.getCustomerId()
					}
				})), {
					__internalSetShouldSavePaymentMethod: i
				} = (0, l.useDispatch)(d.PAYMENT_STORE_KEY);
				return (0, n.createElement)(b.Z, {
					isEditor: s
				}, e, a > 0 && t && (0, n.createElement)(c.CheckboxControl, {
					className: "wc-block-components-payment-methods__save-card-info",
					label: (0, p.__)("Save payment information to my account for future purchases.", "woocommerce"),
					checked: o,
					onChange: () => i(!o)
				}))
			};
			var P = s(940);
			const k = () => {
				const {
					activeSavedToken: e,
					activePaymentMethod: t,
					isExpressPaymentMethodActive: s,
					savedPaymentMethods: o,
					availablePaymentMethods: i
				} = (0, l.useSelect)((e => {
					const t = e(P.L);
					return {
						activeSavedToken: t.getActiveSavedToken(),
						activePaymentMethod: t.getActivePaymentMethod(),
						isExpressPaymentMethodActive: t.isExpressPaymentMethodActive(),
						savedPaymentMethods: t.getSavedPaymentMethods(),
						availablePaymentMethods: t.getAvailablePaymentMethods()
					}
				})), {
					__internalSetActivePaymentMethod: r
				} = (0, l.useDispatch)(P.L), d = (0, S.getPaymentMethods)(), {
					...p
				} = (0, g.z)(), {
					removeNotice: u
				} = (0, l.useDispatch)("core/notices"), {
					dispatchCheckoutEvent: h
				} = (0, y.n)(), {
					isEditor: b
				} = (0, _._)(), k = Object.keys(i).map((e => {
					const {
						edit: t,
						content: s,
						label: o,
						supports: a
					} = d[e], i = b ? t : s;
					return {
						value: e,
						label: "string" == typeof o ? o : (0, v.cloneElement)(o, {
							components: p.components
						}),
						name: `wc-saved-payment-method-token-${e}`,
						content: (0, n.createElement)(E, {
							showSaveOption: a.showSaveOption
						}, (0, v.cloneElement)(i, {
							__internalSetActivePaymentMethod: r,
							...p
						}))
					}
				})), C = (0, v.useCallback)((e => {
					r(e), u("wc-payment-error", m.n7.PAYMENTS), h("set-active-payment-method", {
						value: e
					})
				}), [h, u, r]), w = 0 === Object.keys(o).length && 1 === Object.keys(d).length, f = a()({
					"disable-radio-control": w
				});
				return s ? null : (0, n.createElement)(c.RadioControlAccordion, {
					highlightChecked: !0,
					id: "wc-payment-method-options",
					className: f,
					selected: e ? null : t,
					onChange: C,
					options: k
				})
			};
			var C = s(6946),
				w = s(4617),
				f = s(7618),
				M = s(9040),
				R = s(5585);
			const A = "wc/store/cart",
				T = ((0, p.__)("Unable to get cart data from the API.", "woocommerce"), []),
				N = [],
				x = {},
				I = {};
			Object.keys(w.defaultFields).forEach((e => {
				I[e] = ""
			})), delete I.email;
			const D = {};
			Object.keys(w.defaultFields).forEach((e => {
				D[e] = ""
			}));
			const O = {
					cartItemsPendingQuantity: [],
					cartItemsPendingDelete: [],
					cartData: {
						coupons: [],
						shippingRates: [],
						shippingAddress: I,
						billingAddress: D,
						items: [],
						itemsCount: 0,
						itemsWeight: 0,
						crossSells: [],
						needsShipping: !0,
						needsPayment: !1,
						hasCalculatedShipping: !0,
						fees: [],
						totals: {
							currency_code: "",
							currency_symbol: "",
							currency_minor_unit: 2,
							currency_decimal_separator: ".",
							currency_thousand_separator: ",",
							currency_prefix: "",
							currency_suffix: "",
							total_items: "0",
							total_items_tax: "0",
							total_fees: "0",
							total_fees_tax: "0",
							total_discount: "0",
							total_discount_tax: "0",
							total_shipping: "0",
							total_shipping_tax: "0",
							total_price: "0",
							total_tax: "0",
							tax_lines: []
						},
						errors: T,
						paymentMethods: [],
						paymentRequirements: [],
						extensions: x
					},
					metaData: {
						updatingCustomerData: !1,
						updatingSelectedRate: !1,
						applyingCoupon: "",
						removingCoupon: "",
						isCartDataStale: !1
					},
					errors: N
				},
				Z = ({
					method: e,
					expires: t
				}) => {
					var s, n, o;
					return (0, p.sprintf)( /* translators: %1$s is referring to the payment method brand, %2$s is referring to the last 4 digits of the payment card, %3$s is referring to the expiry date.  */ /* translators: %1$s is referring to the payment method brand, %2$s is referring to the last 4 digits of the payment card, %3$s is referring to the expiry date.  */
						(0, p.__)("%1$s ending in %2$s (expires %3$s)", "woocommerce"), null !== (s = null !== (n = null == e ? void 0 : e.display_brand) && void 0 !== n ? n : null == e || null === (o = e.networks) || void 0 === o ? void 0 : o.preferred) && void 0 !== s ? s : e.brand, e.last4, t)
				},
				F = ({
					method: e
				}) => e.brand && e.last4 ? (0, p.sprintf)( /* translators: %1$s is referring to the payment method brand, %2$s is referring to the last 4 digits of the payment card. */ /* translators: %1$s is referring to the payment method brand, %2$s is referring to the last 4 digits of the payment card. */
					(0, p.__)("%1$s ending in %2$s", "woocommerce"), e.brand, e.last4) : (0, p.sprintf)( /* translators: %s is the name of the payment method gateway. */ /* translators: %s is the name of the payment method gateway. */
					(0, p.__)("Saved token for %s", "woocommerce"), e.gateway),
				Y = () => {
					var e;
					const {
						activeSavedToken: t,
						activePaymentMethod: s,
						savedPaymentMethods: o
					} = (0, l.useSelect)((e => {
						const t = e(d.PAYMENT_STORE_KEY);
						return {
							activeSavedToken: t.getActiveSavedToken(),
							activePaymentMethod: t.getActivePaymentMethod(),
							savedPaymentMethods: t.getSavedPaymentMethods()
						}
					})), {
						__internalSetActivePaymentMethod: a
					} = (0, l.useDispatch)(d.PAYMENT_STORE_KEY), i = (() => {
						let e;
						if ((0, l.select)("core/editor")) {
							const t = {
								cartCoupons: R.s.coupons,
								cartItems: R.s.items,
								crossSellsProducts: R.s.cross_sells,
								cartFees: R.s.fees,
								cartItemsCount: R.s.items_count,
								cartItemsWeight: R.s.items_weight,
								cartNeedsPayment: R.s.needs_payment,
								cartNeedsShipping: R.s.needs_shipping,
								cartItemErrors: T,
								cartTotals: R.s.totals,
								cartIsLoading: !1,
								cartErrors: N,
								billingData: O.cartData.billingAddress,
								billingAddress: O.cartData.billingAddress,
								shippingAddress: O.cartData.shippingAddress,
								extensions: x,
								shippingRates: R.s.shipping_rates,
								isLoadingRates: !1,
								cartHasCalculatedShipping: R.s.has_calculated_shipping,
								paymentRequirements: R.s.payment_requirements,
								receiveCart: () => {}
							};
							e = {
								cart: t,
								cartTotals: t.cartTotals,
								cartNeedsShipping: t.cartNeedsShipping,
								billingData: t.billingAddress,
								billingAddress: t.billingAddress,
								shippingAddress: t.shippingAddress,
								selectedShippingMethods: (0, f.l)(t.shippingRates),
								paymentMethods: R.s.payment_methods,
								paymentRequirements: t.paymentRequirements
							}
						} else {
							const t = (0, l.select)(A),
								s = t.getCartData(),
								n = t.getCartErrors(),
								o = t.getCartTotals(),
								a = !t.hasFinishedResolution("getCartData"),
								i = t.isCustomerDataUpdating(),
								r = (0, f.l)(s.shippingRates);
							e = {
								cart: {
									cartCoupons: s.coupons,
									cartItems: s.items,
									crossSellsProducts: s.crossSells,
									cartFees: s.fees,
									cartItemsCount: s.itemsCount,
									cartItemsWeight: s.itemsWeight,
									cartNeedsPayment: s.needsPayment,
									cartNeedsShipping: s.needsShipping,
									cartItemErrors: s.errors,
									cartTotals: o,
									cartIsLoading: a,
									cartErrors: n,
									billingData: (0, M.QI)(s.billingAddress),
									billingAddress: (0, M.QI)(s.billingAddress),
									shippingAddress: (0, M.QI)(s.shippingAddress),
									extensions: s.extensions,
									shippingRates: s.shippingRates,
									isLoadingRates: i,
									cartHasCalculatedShipping: s.hasCalculatedShipping,
									paymentRequirements: s.paymentRequirements,
									receiveCart: (0, l.dispatch)(A).receiveCart
								},
								cartTotals: s.totals,
								cartNeedsShipping: s.needsShipping,
								billingData: s.billingAddress,
								billingAddress: s.billingAddress,
								shippingAddress: s.shippingAddress,
								selectedShippingMethods: r,
								paymentMethods: s.paymentMethods,
								paymentRequirements: s.paymentRequirements
							}
						}
						return e
					})(), r = (0, S.getPaymentMethods)(), p = (0, g.z)(), {
						removeNotice: u
					} = (0, l.useDispatch)("core/notices"), {
						dispatchCheckoutEvent: h
					} = (0, y.n)(), _ = (0, v.useMemo)((() => {
						const e = Object.keys(o),
							t = new Set(e.flatMap((e => o[e].map((e => e.method.gateway))))),
							s = Array.from(t).filter((e => {
								var t;
								return null === (t = r[e]) || void 0 === t ? void 0 : t.canMakePayment(i)
							}));
						return e.flatMap((e => o[e].map((t => {
							if (!s.includes(t.method.gateway)) return;
							const n = "cc" === e || "echeck" === e,
								o = t.method.gateway;
							return {
								name: `wc-saved-payment-method-token-${o}`,
								label: n ? Z(t) : F(t),
								value: t.tokenId.toString(),
								onChange: e => {
									a(o, {
										token: e,
										payment_method: o,
										[`wc-${o}-payment-token`]: e.toString(),
										isSavedToken: !0
									}), u("wc-payment-error", m.n7.PAYMENTS), h("set-active-payment-method", {
										paymentMethodSlug: o
									})
								}
							}
						})))).filter((e => void 0 !== e))
					}), [o, r, a, u, h, i]), b = t && r[s] && void 0 !== (null === (e = r[s]) || void 0 === e ? void 0 : e.savedTokenComponent) && !(0, C.isNull)(r[s].savedTokenComponent) ? (0, v.cloneElement)(r[s].savedTokenComponent, {
						token: t,
						...p
					}) : null;
					return _.length > 0 ? (0, n.createElement)(n.Fragment, null, (0, n.createElement)(c.RadioControl, {
						highlightChecked: !0,
						id: "wc-payment-method-saved-tokens",
						selected: t,
						options: _,
						onChange: () => {}
					}), b) : null
				};
			s(7586);
			const L = () => {
					const {
						paymentMethodsInitialized: e,
						availablePaymentMethods: t,
						savedPaymentMethods: s
					} = (0, l.useSelect)((e => {
						const t = e(d.PAYMENT_STORE_KEY);
						return {
							paymentMethodsInitialized: t.paymentMethodsInitialized(),
							availablePaymentMethods: t.getAvailablePaymentMethods(),
							savedPaymentMethods: t.getSavedPaymentMethods()
						}
					}));
					return e && 0 === Object.keys(t).length ? (0, n.createElement)(h, null) : (0, n.createElement)(n.Fragment, null, (0, n.createElement)(Y, null), Object.keys(s).length > 0 && (0, n.createElement)(c.Label, {
						label: (0, p.__)("Use another payment method.", "woocommerce"),
						screenReaderLabel: (0, p.__)("Other available payment methods", "woocommerce"),
						wrapperElement: "p",
						wrapperProps: {
							className: ["wc-block-components-checkout-step__description wc-block-components-checkout-step__description-payments-aligned"]
						}
					}), (0, n.createElement)(k, null))
				},
				K = () => (0, n.createElement)(L, null),
				W = {
					...(0, s(1070).Z)({
						defaultTitle: (0, p.__)("Payment options", "woocommerce"),
						defaultDescription: ""
					}),
					className: {
						type: "string",
						default: ""
					},
					lock: {
						type: "object",
						default: {
							move: !0,
							remove: !0
						}
					}
				},
				V = (0, r.withFilteredAttributes)(W)((({
					title: e,
					description: t,
					showStepNumber: s,
					children: o,
					className: r
				}) => {
					const p = (0, l.useSelect)((e => e(d.CHECKOUT_STORE_KEY).isProcessing())),
						{
							cartNeedsPayment: u
						} = (0, i.b)();
					return u ? (0, n.createElement)(c.FormStep, {
						id: "payment-method",
						disabled: p,
						className: a()("wc-block-checkout__payment-method", r),
						title: e,
						description: t,
						showStepNumber: s
					}, (0, n.createElement)(c.StoreNoticesContainer, {
						context: m.n7.PAYMENTS
					}), (0, n.createElement)(K, null), o) : null
				}))
		},
		940: (e, t, s) => {
			"use strict";
			s.d(t, {
				L: () => n
			});
			const n = "wc/store/payment"
		},
		6574: (e, t, s) => {
			"use strict";
			s.d(t, {
				Z: () => a
			});
			var n = s(9196),
				o = s(444);
			const a = (0, n.createElement)(o.SVG, {
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 24 24"
			}, (0, n.createElement)("g", {
				fill: "none",
				fillRule: "evenodd"
			}, (0, n.createElement)("path", {
				d: "M0 0h24v24H0z"
			}), (0, n.createElement)("path", {
				fill: "#000",
				fillRule: "nonzero",
				d: "M17.3 8v1c1 .2 1.4.9 1.4 1.7h-1c0-.6-.3-1-1-1-.8 0-1.3.4-1.3.9 0 .4.3.6 1.4 1 1 .2 2 .6 2 1.9 0 .9-.6 1.4-1.5 1.5v1H16v-1c-.9-.1-1.6-.7-1.7-1.7h1c0 .6.4 1 1.3 1 1 0 1.2-.5 1.2-.8 0-.4-.2-.8-1.3-1.1-1.3-.3-2.1-.8-2.1-1.8 0-.9.7-1.5 1.6-1.6V8h1.3zM12 10v1H6v-1h6zm2-2v1H6V8h8zM2 4v16h20V4H2zm2 14V6h16v12H4z"
			}), (0, n.createElement)("path", {
				stroke: "#000",
				strokeLinecap: "round",
				d: "M6 16c2.6 0 3.9-3 1.7-3-2 0-1 3 1.5 3 1 0 1-.8 2.8-.8"
			})))
		},
		2595: (e, t, s) => {
			"use strict";
			s.d(t, {
				Z: () => o
			});
			var n = s(9196);
			s(7440);
			const o = () => (0, n.createElement)("span", {
				className: "wc-block-components-spinner",
				"aria-hidden": "true"
			})
		},
		1029: () => {},
		6391: () => {},
		3169: () => {},
		991: () => {},
		946: () => {},
		7277: () => {},
		7586: () => {},
		7440: () => {}
	}
]);