(self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || []).push([
	[834], {
		2050: (e, t, r) => {
			"use strict";
			r.r(t), r.d(t, {
				default: () => R
			});
			var c = r(9196),
				a = r(5736),
				n = r(9136),
				s = r(711),
				l = r(7608),
				o = r.n(l),
				i = r(4293),
				m = r(9307);
			r(5437);
			const p = ({
					currency: e,
					maxPrice: t,
					minPrice: r,
					priceClassName: n,
					priceStyle: l = {}
				}) => (0, c.createElement)(c.Fragment, null, (0, c.createElement)("span", {
					className: "screen-reader-text"
				}, (0, a.sprintf)( /* translators: %1$s min price, %2$s max price */ /* translators: %1$s min price, %2$s max price */
					(0, a.__)("Price between %1$s and %2$s", "woocommerce"), (0, i.formatPrice)(r), (0, i.formatPrice)(t))), (0, c.createElement)("span", {
					"aria-hidden": !0
				}, (0, c.createElement)(s.FormattedMonetaryAmount, {
					className: o()("wc-block-components-product-price__value", n),
					currency: e,
					value: r,
					style: l
				}), " — ", (0, c.createElement)(s.FormattedMonetaryAmount, {
					className: o()("wc-block-components-product-price__value", n),
					currency: e,
					value: t,
					style: l
				}))),
				u = ({
					currency: e,
					regularPriceClassName: t,
					regularPriceStyle: r,
					regularPrice: n,
					priceClassName: l,
					priceStyle: i,
					price: m
				}) => (0, c.createElement)(c.Fragment, null, (0, c.createElement)("span", {
					className: "screen-reader-text"
				}, (0, a.__)("Previous price:", "woocommerce")), (0, c.createElement)(s.FormattedMonetaryAmount, {
					currency: e,
					renderText: e => (0, c.createElement)("del", {
						className: o()("wc-block-components-product-price__regular", t),
						style: r
					}, e),
					value: n
				}), (0, c.createElement)("span", {
					className: "screen-reader-text"
				}, (0, a.__)("Discounted price:", "woocommerce")), (0, c.createElement)(s.FormattedMonetaryAmount, {
					currency: e,
					renderText: e => (0, c.createElement)("ins", {
						className: o()("wc-block-components-product-price__value", "is-discounted", l),
						style: i
					}, e),
					value: m
				})),
				d = ({
					align: e,
					className: t,
					currency: r,
					format: a = "<price/>",
					maxPrice: n,
					minPrice: l,
					price: i,
					priceClassName: d,
					priceStyle: _,
					regularPrice: y,
					regularPriceClassName: E,
					regularPriceStyle: g,
					style: w
				}) => {
					const k = o()(t, "price", "wc-block-components-product-price", {
						[`wc-block-components-product-price--align-${e}`]: e
					});
					a.includes("<price/>") || (a = "<price/>", console.error("Price formats need to include the `<price/>` tag."));
					const b = y && i && i < y;
					let N = (0, c.createElement)("span", {
						className: o()("wc-block-components-product-price__value", d)
					});
					return b ? N = (0, c.createElement)(u, {
						currency: r,
						price: i,
						priceClassName: d,
						priceStyle: _,
						regularPrice: y,
						regularPriceClassName: E,
						regularPriceStyle: g
					}) : void 0 !== l && void 0 !== n ? N = (0, c.createElement)(p, {
						currency: r,
						maxPrice: n,
						minPrice: l,
						priceClassName: d,
						priceStyle: _
					}) : i && (N = (0, c.createElement)(s.FormattedMonetaryAmount, {
						className: o()("wc-block-components-product-price__value", d),
						currency: r,
						value: i,
						style: _
					})), (0, c.createElement)("span", {
						className: k,
						style: w
					}, (0, m.createInterpolateElement)(a, {
						price: N
					}))
				};
			var _ = r(2629);
			r(333);
			const y = ({
				className: e = "",
				disabled: t = !1,
				name: r,
				permalink: a = "",
				target: n,
				rel: s,
				style: l,
				onClick: i,
				...m
			}) => {
				const p = o()("wc-block-components-product-name", e);
				if (t) {
					const e = m;
					return (0, c.createElement)("span", {
						className: p,
						...e,
						dangerouslySetInnerHTML: {
							__html: (0, _.decodeEntities)(r)
						}
					})
				}
				return (0, c.createElement)("a", {
					className: p,
					href: a,
					target: n,
					...m,
					dangerouslySetInnerHTML: {
						__html: (0, _.decodeEntities)(r)
					},
					style: l
				})
			};
			var E = r(3554),
				g = r(1064),
				w = r(4617),
				k = r(9659),
				b = r(6946);
			r(2930);
			const N = ({
					children: e,
					className: t
				}) => (0, c.createElement)("div", {
					className: o()("wc-block-components-product-badge", t)
				}, e),
				v = () => (0, c.createElement)(N, {
					className: "wc-block-components-product-backorder-badge"
				}, (0, a.__)("Available on backorder", "woocommerce")),
				f = ({
					image: e = {},
					fallbackAlt: t = ""
				}) => {
					const r = e.thumbnail ? {
						src: e.thumbnail,
						alt: (0, _.decodeEntities)(e.alt) || t || "Product Image"
					} : {
						src: w.PLACEHOLDER_IMG_SRC,
						alt: ""
					};
					return (0, c.createElement)("img", {
						...r,
						alt: r.alt
					})
				},
				h = ({
					lowStockRemaining: e
				}) => e ? (0, c.createElement)(N, {
					className: "wc-block-components-product-low-stock-badge"
				}, (0, a.sprintf)( /* translators: %d stock amount (number of items in stock for product) */ /* translators: %d stock amount (number of items in stock for product) */
					(0, a.__)("%d left in stock", "woocommerce"), e)) : null;
			var P = r(7427);
			r(3804);
			const C = ({
				details: e = []
			}) => Array.isArray(e) ? 0 === (e = e.filter((e => !e.hidden))).length ? null : (0, c.createElement)("ul", {
				className: "wc-block-components-product-details"
			}, e.map((e => {
				const t = (null == e ? void 0 : e.key) || e.name || "",
					r = (null == e ? void 0 : e.className) || (t ? `wc-block-components-product-details__${(0,P.o)(t)}` : "");
				return (0, c.createElement)("li", {
					key: t + (e.display || e.value),
					className: r
				}, t && (0, c.createElement)(c.Fragment, null, (0, c.createElement)("span", {
					className: "wc-block-components-product-details__name"
				}, (0, _.decodeEntities)(t), ":"), " "), (0, c.createElement)("span", {
					className: "wc-block-components-product-details__value"
				}, (0, _.decodeEntities)(e.display || e.value)))
			}))) : null;
			var x = r(987);
			const I = e => e.replace(/<\/?[a-z][^>]*?>/gi, ""),
				F = (e, t) => e.replace(/[\s|\.\,]+$/i, "") + t;
			var S = r(5266);
			const A = ({
				source: e,
				maxLength: t = 15,
				countType: r = "words",
				className: a = "",
				style: n = {}
			}) => {
				const s = (0, m.useMemo)((() => ((e, t = 15, r = "words") => {
					const c = (0, x.autop)(e);
					if ((0, S.count)(c, r) <= t) return c;
					const a = (e => {
						const t = e.indexOf("</p>");
						return -1 === t ? e : e.substr(0, t + 4)
					})(c);
					return (0, S.count)(a, r) <= t ? a : "words" === r ? ((e, t, r = "&hellip;", c = !0) => {
						const a = I(e),
							n = a.split(" ").splice(0, t).join(" ");
						return n === a ? c ? (0, x.autop)(a) : a : c ? (0, x.autop)(F(n, r)) : F(n, r)
					})(a, t) : ((e, t, r = !0, c = "&hellip;", a = !0) => {
						const n = I(e),
							s = n.slice(0, t);
						if (s === n) return a ? (0, x.autop)(n) : n;
						if (r) return (0, x.autop)(F(s, c));
						const l = s.match(/([\s]+)/g),
							o = l ? l.length : 0,
							i = n.slice(0, t + o);
						return a ? (0, x.autop)(F(i, c)) : F(i, c)
					})(a, t, "characters_including_spaces" === r)
				})(e, t, r)), [e, t, r]);
				return (0, c.createElement)(m.RawHTML, {
					style: n,
					className: a
				}, s)
			};
			var D = r(8752);
			const T = ({
				className: e,
				shortDescription: t = "",
				fullDescription: r = ""
			}) => {
				const a = t || r;
				return a ? (0, c.createElement)(A, {
					className: e,
					source: a,
					maxLength: 15,
					countType: D.Cm.wordCountType || "words"
				}) : null
			};
			r(6021);
			const M = ({
					shortDescription: e = "",
					fullDescription: t = "",
					itemData: r = [],
					variation: a = []
				}) => (0, c.createElement)("div", {
					className: "wc-block-components-product-metadata"
				}, (0, c.createElement)(T, {
					className: "wc-block-components-product-metadata__description",
					shortDescription: e,
					fullDescription: t
				}), (0, c.createElement)(C, {
					details: r
				}), (0, c.createElement)(C, {
					details: a.map((({
						attribute: e = "",
						value: t
					}) => ({
						key: e,
						value: t
					})))
				})),
				$ = ({
					cartItem: e
				}) => {
					const {
						images: t,
						low_stock_remaining: r,
						show_backorder_badge: n,
						name: l,
						permalink: p,
						prices: u,
						quantity: _,
						short_description: N,
						description: P,
						item_data: C,
						variation: x,
						totals: I,
						extensions: F
					} = e, {
						receiveCart: S,
						...A
					} = (0, k.b)(), D = (0, m.useMemo)((() => ({
						context: "summary",
						cartItem: e,
						cart: A
					})), [e, A]), T = (0, i.getCurrencyFromPriceResponse)(u), $ = (0, E.applyCheckoutFilter)({
						filterName: "itemName",
						defaultValue: l,
						extensions: F,
						arg: D
					}), L = (0, g.Z)({
						amount: parseInt(u.raw_prices.regular_price, 10),
						precision: (0, b.isString)(u.raw_prices.precision) ? parseInt(u.raw_prices.precision, 10) : u.raw_prices.precision
					}).convertPrecision(T.minorUnit).getAmount(), R = (0, g.Z)({
						amount: parseInt(u.raw_prices.price, 10),
						precision: (0, b.isString)(u.raw_prices.precision) ? parseInt(u.raw_prices.precision, 10) : u.raw_prices.precision
					}).convertPrecision(T.minorUnit).getAmount(), V = (0, i.getCurrencyFromPriceResponse)(I);
					let H = parseInt(I.line_subtotal, 10);
					(0, w.getSetting)("displayCartPricesIncludingTax", !1) && (H += parseInt(I.line_subtotal_tax, 10));
					const O = (0, g.Z)({
							amount: H,
							precision: V.minorUnit
						}).getAmount(),
						W = (0, E.applyCheckoutFilter)({
							filterName: "subtotalPriceFormat",
							defaultValue: "<price/>",
							extensions: F,
							arg: D,
							validation: E.productPriceValidation
						}),
						B = (0, E.applyCheckoutFilter)({
							filterName: "cartItemPrice",
							defaultValue: "<price/>",
							extensions: F,
							arg: D,
							validation: E.productPriceValidation
						}),
						U = (0, E.applyCheckoutFilter)({
							filterName: "cartItemClass",
							defaultValue: "",
							extensions: F,
							arg: D
						});
					return (0, c.createElement)("div", {
						className: o()("wc-block-components-order-summary-item", U)
					}, (0, c.createElement)("div", {
						className: "wc-block-components-order-summary-item__image"
					}, (0, c.createElement)("div", {
						className: "wc-block-components-order-summary-item__quantity"
					}, (0, c.createElement)(s.Label, {
						label: _.toString(),
						screenReaderLabel: (0, a.sprintf)( /* translators: %d number of products of the same type in the cart */ /* translators: %d number of products of the same type in the cart */
							(0, a._n)("%d item", "%d items", _, "woocommerce"), _)
					})), (0, c.createElement)(f, {
						image: t.length ? t[0] : {},
						fallbackAlt: $
					})), (0, c.createElement)("div", {
						className: "wc-block-components-order-summary-item__description"
					}, (0, c.createElement)(y, {
						disabled: !0,
						name: $,
						permalink: p
					}), (0, c.createElement)(d, {
						currency: T,
						price: R,
						regularPrice: L,
						className: "wc-block-components-order-summary-item__individual-prices",
						priceClassName: "wc-block-components-order-summary-item__individual-price",
						regularPriceClassName: "wc-block-components-order-summary-item__regular-individual-price",
						format: W
					}), n ? (0, c.createElement)(v, null) : !!r && (0, c.createElement)(h, {
						lowStockRemaining: r
					}), (0, c.createElement)(M, {
						shortDescription: N,
						fullDescription: P,
						itemData: C,
						variation: x
					})), (0, c.createElement)("span", {
						className: "screen-reader-text"
					}, (0, a.sprintf)( /* translators: %1$d is the number of items, %2$s is the item name and %3$s is the total price including the currency symbol. */ /* translators: %1$d is the number of items, %2$s is the item name and %3$s is the total price including the currency symbol. */
						(0, a._n)("Total price for %1$d %2$s item: %3$s", "Total price for %1$d %2$s items: %3$s", _, "woocommerce"), _, $, (0, i.formatPrice)(O, V))), (0, c.createElement)("div", {
						className: "wc-block-components-order-summary-item__total-price",
						"aria-hidden": "true"
					}, (0, c.createElement)(d, {
						currency: V,
						format: B,
						price: O
					})))
				};
			r(3086);
			const L = ({
					cartItems: e = []
				}) => {
					const {
						isLarge: t,
						hasContainerWidth: r
					} = (0, n.N)();
					return r ? (0, c.createElement)(s.Panel, {
						className: "wc-block-components-order-summary",
						initialOpen: t,
						hasBorder: !1,
						title: (0, c.createElement)("span", {
							className: "wc-block-components-order-summary__button-text"
						}, (0, a.__)(" ملخص الطلب  ", "woocommerce"))
					}, (0, c.createElement)("div", {
						className: "wc-block-components-order-summary__content"
					}, e.map((e => (0, c.createElement)($, {
						key: e.key,
						cartItem: e
					}))))) : null
				},
				R = ({
					className: e = ""
				}) => {
					const {
						cartItems: t
					} = (0, k.b)();
					return (0, c.createElement)(s.TotalsWrapper, {
						className: e
					}, (0, c.createElement)(L, {
						cartItems: t
					}))
				}
		},
		3086: () => {},
		2930: () => {},
		3804: () => {},
		6021: () => {},
		333: () => {},
		5437: () => {}
	}
]);