(self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || []).push([
	[1084], {
		2904: (e, t, n) => {
			"use strict";
			n.d(t, {
				Z: () => l
			});
			var o = n(9196),
				c = n(9770),
				a = n(7608),
				r = n.n(a),
				s = (n(1029), n(2595));
			const l = ({
				className: e,
				showSpinner: t = !1,
				children: n,
				variant: a = "contained",
				...l
			}) => {
				const u = r()("wc-block-components-button", "wp-element-button", e, a, {
					"wc-block-components-button--loading": t
				});
				return (0, o.createElement)(c.Z, {
					className: u,
					...l
				}, t && (0, o.createElement)(s.Z, null), (0, o.createElement)("span", {
					className: "wc-block-components-button__text"
				}, n))
			}
		},
		936: (e, t, n) => {
			"use strict";
			n.r(t), n.d(t, {
				default: () => g
			});
			var o = n(721),
				c = n(9196),
				a = n(7608),
				r = n.n(a),
				s = n(9307),
				l = n(2904),
				u = n(8752);
			const i = {
				bottom: 0,
				left: 0,
				opacity: 0,
				pointerEvents: "none",
				position: "absolute",
				right: 0,
				top: 0,
				zIndex: -1
			};
			var b = n(4617),
				d = n(9818),
				m = n(4801),
				p = n(3554),
				k = n(8027),
				f = n(4648);
			const h = (0, n(5736).__)(" تابع  ", "woocommerce"),
				v = {
					checkoutPageId: {
						type: "number",
						default: 0
					},
					lock: {
						type: "object",
						default: {
							move: !0,
							remove: !0
						}
					},
					buttonLabel: {
						type: "string",
						default: h
					}
				},
				g = (0, o.withFilteredAttributes)(v)((({
					checkoutPageId: e,
					className: t,
					buttonLabel: o
				}) => {
					const a = (0, b.getSetting)("page-" + e, !1),
						v = (0, d.useSelect)((e => e(m.CHECKOUT_STORE_KEY).isCalculating())),
						[g, w] = (() => {
							const [e, t] = (0, s.useState)(""), n = (0, s.useRef)(null), o = (0, s.useRef)(new IntersectionObserver((e => {
								e[0].isIntersecting ? t("visible") : t(e[0].boundingClientRect.top > 0 ? "below" : "above")
							}), {
								threshold: 1
							}));
							return (0, s.useLayoutEffect)((() => {
								const e = n.current,
									t = o.current;
								return e && t.observe(e), () => {
									t.unobserve(e)
								}
							}), []), [(0, c.createElement)("div", {
								"aria-hidden": !0,
								ref: n,
								style: i
							}), e]
						})(),
						[E, C] = (0, s.useState)(!1);
					(0, s.useEffect)((() => {
						if ("function" != typeof n.g.addEventListener || "function" != typeof n.g.removeEventListener) return;
						const e = () => {
							C(!1)
						};
						return n.g.addEventListener("pageshow", e), () => {
							n.g.removeEventListener("pageshow", e)
						}
					}), []);
					const _ = (0, d.useSelect)((e => e(m.CART_STORE_KEY).getCartData())),
						y = (0, p.applyCheckoutFilter)({
							filterName: "proceedToCheckoutButtonLabel",
							defaultValue: o || h,
							arg: {
								cart: _
							}
						}),
						N = (0, p.applyCheckoutFilter)({
							filterName: "proceedToCheckoutButtonLink",
							defaultValue: a || u.sE,
							arg: {
								cart: _
							}
						}),
						{
							dispatchOnProceedToCheckout: S
						} = (0, f.b)(),
						L = (0, c.createElement)(l.Z, {
							className: "wc-block-cart__submit-button",
							href: N,
							disabled: v,
							onClick: e => {
								S().then((t => {
									t.some(k.qm) ? e.preventDefault() : C(!0)
								}))
							},
							showSpinner: E
						}, y),
						T = (0, s.useMemo)((() => getComputedStyle(document.body).backgroundColor), []);
					return (0, c.createElement)("div", {
						className: r()("wc-block-cart__submit", t)
					}, g, (0, c.createElement)("div", {
						className: "wc-block-cart__submit-container"
					}, L), "below" === w && (0, c.createElement)("div", {
						className: "wc-block-cart__submit-container wc-block-cart__submit-container--sticky",
						style: {
							backgroundColor: T
						}
					}, L))
				}))
		},
		2595: (e, t, n) => {
			"use strict";
			n.d(t, {
				Z: () => c
			});
			var o = n(9196);
			n(7440);
			const c = () => (0, o.createElement)("span", {
				className: "wc-block-components-spinner",
				"aria-hidden": "true"
			})
		},
		1029: () => {},
		7440: () => {}
	}
]);