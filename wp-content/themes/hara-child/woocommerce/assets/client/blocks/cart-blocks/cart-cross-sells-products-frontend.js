(self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || []).push([
	[6737], {
		7121: (e, t, r) => {
			"use strict";
			r.d(t, {
				Z: () => s
			});
			var c = r(9196),
				a = r(2629),
				n = r(7608),
				o = r.n(n);
			r(333);
			const s = ({
				className: e = "",
				disabled: t = !1,
				name: r,
				permalink: n = "",
				target: s,
				rel: l,
				style: i,
				onClick: u,
				...d
			}) => {
				const m = o()("wc-block-components-product-name", e);
				if (t) {
					const e = d;
					return (0, c.createElement)("span", {
						className: m,
						...e,
						dangerouslySetInnerHTML: {
							__html: (0, a.decodeEntities)(r)
						}
					})
				}
				return (0, c.createElement)("a", {
					className: m,
					href: n,
					target: s,
					...d,
					dangerouslySetInnerHTML: {
						__html: (0, a.decodeEntities)(r)
					},
					style: i
				})
			}
		},
		3088: (e, t, r) => {
			"use strict";
			r.d(t, {
				Z: () => m
			});
			var c = r(9196),
				a = r(5736),
				n = r(711),
				o = r(7608),
				s = r.n(o),
				l = r(4293),
				i = r(9307);
			r(5437);
			const u = ({
					currency: e,
					maxPrice: t,
					minPrice: r,
					priceClassName: o,
					priceStyle: i = {}
				}) => (0, c.createElement)(c.Fragment, null, (0, c.createElement)("span", {
					className: "screen-reader-text"
				}, (0, a.sprintf)( /* translators: %1$s min price, %2$s max price */ /* translators: %1$s min price, %2$s max price */
					(0, a.__)("Price between %1$s and %2$s", "woocommerce"), (0, l.formatPrice)(r), (0, l.formatPrice)(t))), (0, c.createElement)("span", {
					"aria-hidden": !0
				}, (0, c.createElement)(n.FormattedMonetaryAmount, {
					className: s()("wc-block-components-product-price__value", o),
					currency: e,
					value: r,
					style: i
				}), " — ", (0, c.createElement)(n.FormattedMonetaryAmount, {
					className: s()("wc-block-components-product-price__value", o),
					currency: e,
					value: t,
					style: i
				}))),
				d = ({
					currency: e,
					regularPriceClassName: t,
					regularPriceStyle: r,
					regularPrice: o,
					priceClassName: l,
					priceStyle: i,
					price: u
				}) => (0, c.createElement)(c.Fragment, null, (0, c.createElement)("span", {
					className: "screen-reader-text"
				}, (0, a.__)("Previous price:", "woocommerce")), (0, c.createElement)(n.FormattedMonetaryAmount, {
					currency: e,
					renderText: e => (0, c.createElement)("del", {
						className: s()("wc-block-components-product-price__regular", t),
						style: r
					}, e),
					value: o
				}), (0, c.createElement)("span", {
					className: "screen-reader-text"
				}, (0, a.__)("Discounted price:", "woocommerce")), (0, c.createElement)(n.FormattedMonetaryAmount, {
					currency: e,
					renderText: e => (0, c.createElement)("ins", {
						className: s()("wc-block-components-product-price__value", "is-discounted", l),
						style: i
					}, e),
					value: u
				})),
				m = ({
					align: e,
					className: t,
					currency: r,
					format: a = "<price/>",
					maxPrice: o,
					minPrice: l,
					price: m,
					priceClassName: p,
					priceStyle: g,
					regularPrice: y,
					regularPriceClassName: _,
					regularPriceStyle: N,
					style: v
				}) => {
					const b = s()(t, "price", "wc-block-components-product-price", {
						[`wc-block-components-product-price--align-${e}`]: e
					});
					a.includes("<price/>") || (a = "<price/>", console.error("Price formats need to include the `<price/>` tag."));
					const w = y && m && m < y;
					let k = (0, c.createElement)("span", {
						className: s()("wc-block-components-product-price__value", p)
					});
					return w ? k = (0, c.createElement)(d, {
						currency: r,
						price: m,
						priceClassName: p,
						priceStyle: g,
						regularPrice: y,
						regularPriceClassName: _,
						regularPriceStyle: N
					}) : void 0 !== l && void 0 !== o ? k = (0, c.createElement)(u, {
						currency: r,
						maxPrice: o,
						minPrice: l,
						priceClassName: p,
						priceStyle: g
					}) : m && (k = (0, c.createElement)(n.FormattedMonetaryAmount, {
						className: s()("wc-block-components-product-price__value", p),
						currency: r,
						value: m,
						style: g
					})), (0, c.createElement)("span", {
						className: b,
						style: v
					}, (0, i.createInterpolateElement)(a, {
						price: k
					}))
				}
		},
		5044: (e, t, r) => {
			"use strict";
			r.r(t), r.d(t, {
				default: () => G
			});
			var c = r(9196),
				a = r(9659),
				n = r(2864),
				o = r(9307),
				s = r(5736),
				l = r(7608),
				i = r.n(l),
				u = r(4617),
				d = r(6946),
				m = r(7427),
				p = r(2289);

			function g(e = {}) {
				const t = {};
				return (0, p.getCSSRules)(e, {
					selector: ""
				}).forEach((e => {
					t[e.key] = e.value
				})), t
			}

			function y(e, t) {
				return e && t ? `has-${(0,m.o)(t)}-${e}` : ""
			}
			const _ = e => {
				const t = (e => {
						const t = (0, d.isObject)(e) ? e : {
							style: {}
						};
						let r = t.style;
						return (0, d.isString)(r) && (r = JSON.parse(r) || {}), (0, d.isObject)(r) || (r = {}), {
							...t,
							style: r
						}
					})(e),
					r = function(e) {
						var t, r, c, a, n, o, s;
						const {
							backgroundColor: l,
							textColor: u,
							gradient: m,
							style: p
						} = e, _ = y("background-color", l), N = y("color", u), v = function(e) {
							if (e) return `has-${e}-gradient-background`
						}(m), b = v || (null == p || null === (t = p.color) || void 0 === t ? void 0 : t.gradient);
						return {
							className: i()(N, v, {
								[_]: !b && !!_,
								"has-text-color": u || (null == p || null === (r = p.color) || void 0 === r ? void 0 : r.text),
								"has-background": l || (null == p || null === (c = p.color) || void 0 === c ? void 0 : c.background) || m || (null == p || null === (a = p.color) || void 0 === a ? void 0 : a.gradient),
								"has-link-color": (0, d.isObject)(null == p || null === (n = p.elements) || void 0 === n ? void 0 : n.link) ? null == p || null === (o = p.elements) || void 0 === o || null === (s = o.link) || void 0 === s ? void 0 : s.color : void 0
							}),
							style: g({
								color: (null == p ? void 0 : p.color) || {}
							})
						}
					}(t),
					c = function(e) {
						var t;
						const r = (null === (t = e.style) || void 0 === t ? void 0 : t.border) || {};
						return {
							className: function(e) {
								var t;
								const {
									borderColor: r,
									style: c
								} = e, a = r ? y("border-color", r) : "";
								return i()({
									"has-border-color": !!r || !(null == c || null === (t = c.border) || void 0 === t || !t.color),
									[a]: !!a
								})
							}(e),
							style: g({
								border: r
							})
						}
					}(t),
					a = function(e) {
						var t;
						return {
							className: void 0,
							style: g({
								spacing: (null === (t = e.style) || void 0 === t ? void 0 : t.spacing) || {}
							})
						}
					}(t),
					n = (e => {
						const t = (0, d.isObject)(e.style.typography) ? e.style.typography : {},
							r = (0, d.isString)(t.fontFamily) ? t.fontFamily : "";
						return {
							className: e.fontFamily ? `has-${e.fontFamily}-font-family` : r,
							style: {
								fontSize: e.fontSize ? `var(--wp--preset--font-size--${e.fontSize})` : t.fontSize,
								fontStyle: t.fontStyle,
								fontWeight: t.fontWeight,
								letterSpacing: t.letterSpacing,
								lineHeight: t.lineHeight,
								textDecoration: t.textDecoration,
								textTransform: t.textTransform
							}
						}
					})(t);
				return {
					className: i()(n.className, r.className, c.className, a.className),
					style: {
						...n.style,
						...r.style,
						...c.style,
						...a.style
					}
				}
			};
			var N = r(721),
				v = r(8360),
				b = r(711);
			r(3902);
			const w = (0, N.withProductDataContext)((e => {
				const {
					className: t,
					align: r
				} = e, a = _(e), {
					parentClassName: o
				} = (0, n.useInnerBlockLayoutContext)(), {
					product: l
				} = (0, n.useProductDataContext)();
				if (!(l.id && l.on_sale || e.isDescendentOfSingleProductTemplate)) return null;
				const u = "string" == typeof r ? `wc-block-components-product-sale-badge--align-${r}` : "";
				return (0, c.createElement)("div", {
					className: i()("wc-block-components-product-sale-badge", t, u, {
						[`${o}__product-onsale`]: o
					}, a.className),
					style: a.style
				}, (0, c.createElement)(b.Label, {
					label: (0, s.__)("Sale", "woocommerce"),
					screenReaderLabel: (0, s.__)("Product on sale", "woocommerce")
				}))
			}));
			r(3030);
			let k = function(e) {
				return e.SINGLE = "single", e.THUMBNAIL = "thumbnail", e
			}({});
			const E = e => (0, c.createElement)("img", {
					...e,
					src: u.PLACEHOLDER_IMG_SRC,
					alt: "",
					width: void 0,
					height: void 0
				}),
				h = ({
					image: e,
					loaded: t,
					showFullSize: r,
					fallbackAlt: a,
					width: n,
					scale: s,
					height: l,
					aspectRatio: i
				}) => {
					const {
						thumbnail: u,
						src: d,
						srcset: m,
						sizes: p,
						alt: g
					} = e || {}, y = {
						alt: g || a,
						hidden: !t,
						src: u,
						...r && {
							src: d,
							srcSet: m,
							sizes: p
						}
					}, _ = {
						height: l,
						width: n,
						objectFit: s,
						aspectRatio: i
					};
					return (0, c.createElement)(o.Fragment, null, y.src && (0, c.createElement)("img", {
						style: _,
						"data-testid": "product-image",
						...y
					}), !e && (0, c.createElement)(E, {
						style: _
					}))
				},
				f = e => {
					const {
						className: t,
						imageSizing: r = k.SINGLE,
						showProductLink: a = !0,
						showSaleBadge: l,
						saleBadgeAlign: u = "right",
						height: d,
						width: m,
						scale: p,
						aspectRatio: g,
						...y
					} = e, N = _(e), {
						parentClassName: b
					} = (0, n.useInnerBlockLayoutContext)(), {
						product: f,
						isLoading: C
					} = (0, n.useProductDataContext)(), {
						dispatchStoreEvent: P
					} = (0, v.n)();
					if (!f.id) return (0, c.createElement)("div", {
						className: i()(t, "wc-block-components-product-image", {
							[`${b}__product-image`]: b
						}, N.className),
						style: N.style
					}, (0, c.createElement)(E, null));
					const S = !!f.images.length,
						x = S ? f.images[0] : null,
						L = a ? "a" : o.Fragment,
						$ = (0, s.sprintf)( /* translators: %s is referring to the product name */ /* translators: %s is referring to the product name */
							(0, s.__)("Link to %s", "woocommerce"), f.name),
						D = {
							href: f.permalink,
							...!S && {
								"aria-label": $
							},
							onClick: () => {
								P("product-view-link", {
									product: f
								})
							}
						};
					return delete y.style, (0, c.createElement)("div", {
						className: i()(t, "wc-block-components-product-image", {
							[`${b}__product-image`]: b
						}, N.className),
						style: N.style
					}, (0, c.createElement)(L, {
						...a && D
					}, !!l && (0, c.createElement)(w, {
						align: u,
						...y
					}), (0, c.createElement)(h, {
						fallbackAlt: f.name,
						image: x,
						loaded: !C,
						showFullSize: r !== k.THUMBNAIL,
						width: m,
						height: d,
						scale: p,
						aspectRatio: g
					})))
				};
			(0, N.withProductDataContext)(f);
			var C = r(8752),
				P = r(7121);
			r(9375);
			const S = ({
					children: e,
					headingLevel: t,
					elementType: r = `h${t}`,
					...a
				}) => (0, c.createElement)(r, {
					...a
				}, e),
				x = e => {
					const {
						className: t,
						headingLevel: r = 2,
						showProductLink: a = !0,
						linkTarget: o,
						align: s
					} = e, l = _(e), {
						parentClassName: u
					} = (0, n.useInnerBlockLayoutContext)(), {
						product: d
					} = (0, n.useProductDataContext)(), {
						dispatchStoreEvent: m
					} = (0, v.n)();
					return d.id ? (0, c.createElement)(S, {
						headingLevel: r,
						className: i()(t, l.className, "wc-block-components-product-title", {
							[`${u}__product-title`]: u,
							[`wc-block-components-product-title--align-${s}`]: s && (0, C.uq)()
						}),
						style: (0, C.uq)() ? l.style : {}
					}, (0, c.createElement)(P.Z, {
						disabled: !a,
						name: d.name,
						permalink: d.permalink,
						target: o,
						onClick: () => {
							m("product-view-link", {
								product: d
							})
						}
					})) : (0, c.createElement)(S, {
						headingLevel: r,
						className: i()(t, l.className, "wc-block-components-product-title", {
							[`${u}__product-title`]: u,
							[`wc-block-components-product-title--align-${s}`]: s && (0, C.uq)()
						}),
						style: (0, C.uq)() ? l.style : {}
					})
				};
			(0, N.withProductDataContext)(x), r(6006);
			const L = e => ({
					width: e / 5 * 100 + "%"
				}),
				$ = ({
					parentClassName: e
				}) => {
					const t = L(0);
					return (0, c.createElement)("div", {
						className: i()("wc-block-components-product-rating-stars__norating-container", `${e}-product-rating-stars__norating-container`)
					}, (0, c.createElement)("div", {
						className: "wc-block-components-product-rating-stars__norating",
						role: "img"
					}, (0, c.createElement)("span", {
						style: t
					})), (0, c.createElement)("span", null, (0, s.__)("No Reviews", "woocommerce")))
				},
				D = e => {
					const {
						rating: t,
						reviews: r,
						parentClassName: a
					} = e, n = L(t), o = (0, s.sprintf)( /* translators: %f is referring to the average rating value */ /* translators: %f is referring to the average rating value */
						(0, s.__)("Rated %f out of 5", "woocommerce"), t), l = {
						__html: (0, s.sprintf)( /* translators: %1$s is referring to the average rating value, %2$s is referring to the number of ratings */ /* translators: %1$s is referring to the average rating value, %2$s is referring to the number of ratings */
							(0, s._n)("Rated %1$s out of 5 based on %2$s customer rating", "Rated %1$s out of 5 based on %2$s customer ratings", r, "woocommerce"), (0, s.sprintf)('<strong class="rating">%f</strong>', t), (0, s.sprintf)('<span class="rating">%d</span>', r))
					};
					return (0, c.createElement)("div", {
						className: i()("wc-block-components-product-rating-stars__stars", `${a}__product-rating-stars__stars`),
						role: "img",
						"aria-label": o
					}, (0, c.createElement)("span", {
						style: n,
						dangerouslySetInnerHTML: l
					}))
				},
				F = e => {
					const {
						textAlign: t,
						shouldDisplayMockedReviewsWhenProductHasNoReviews: r
					} = e, a = _(e), {
						parentClassName: o
					} = (0, n.useInnerBlockLayoutContext)(), {
						product: s
					} = (0, n.useProductDataContext)(), l = (e => {
						const t = parseFloat(e.average_rating);
						return Number.isFinite(t) && t > 0 ? t : 0
					})(s), u = (e => {
						const t = (0, d.isNumber)(e.review_count) ? e.review_count : parseInt(e.review_count, 10);
						return Number.isFinite(t) && t > 0 ? t : 0
					})(s), m = i()(a.className, "wc-block-components-product-rating-stars", {
						[`${o}__product-rating`]: o,
						[`has-text-align-${t}`]: t
					}), p = r ? (0, c.createElement)($, {
						parentClassName: o
					}) : null, g = u ? (0, c.createElement)(D, {
						rating: l,
						reviews: u,
						parentClassName: o
					}) : p;
					return (0, c.createElement)("div", {
						className: m,
						style: a.style
					}, (0, c.createElement)("div", {
						className: "wc-block-components-product-rating-stars__container"
					}, g))
				};
			(0, N.withProductDataContext)(F);
			var I = r(3088),
				R = r(4293);
			const T = e => {
				var t, r;
				const {
					className: a,
					textAlign: o,
					isDescendentOfSingleProductTemplate: s
				} = e, l = _(e), {
					parentName: u,
					parentClassName: d
				} = (0, n.useInnerBlockLayoutContext)(), {
					product: m
				} = (0, n.useProductDataContext)(), p = "woocommerce/all-products" === u, g = i()("wc-block-components-product-price", a, l.className, {
					[`${d}__product-price`]: d
				});
				if (!m.id && !s) {
					const e = (0, c.createElement)(I.Z, {
						align: o,
						className: g
					});
					return p ? (0, c.createElement)("div", {
						className: "wp-block-woocommerce-product-price"
					}, e) : e
				}
				const y = m.prices,
					N = s ? (0, R.getCurrencyFromPriceResponse)() : (0, R.getCurrencyFromPriceResponse)(y),
					v = "5000",
					b = y.price !== y.regular_price,
					w = i()({
						[`${d}__product-price__value`]: d,
						[`${d}__product-price__value--on-sale`]: b
					}),
					k = (0, c.createElement)(I.Z, {
						align: o,
						className: g,
						style: l.style,
						regularPriceStyle: l.style,
						priceStyle: l.style,
						priceClassName: w,
						currency: N,
						price: s ? v : y.price,
						minPrice: null == y || null === (t = y.price_range) || void 0 === t ? void 0 : t.min_amount,
						maxPrice: null == y || null === (r = y.price_range) || void 0 === r ? void 0 : r.max_amount,
						regularPrice: s ? v : y.regular_price,
						regularPriceClassName: i()({
							[`${d}__product-price__regular`]: d
						})
					});
				return p ? (0, c.createElement)("div", {
					className: "wp-block-woocommerce-product-price"
				}, k) : k
			};
			var A = r(9818),
				B = r(4801),
				M = r(2629);
			const O = (e, t) => {
				const r = e.find((({
					id: e
				}) => e === t));
				return r ? r.quantity : 0
			};
			r(4466);
			const z = ({
					product: e,
					className: t,
					style: r
				}) => {
					const {
						id: n,
						permalink: l,
						add_to_cart: d,
						has_options: m,
						is_purchasable: p,
						is_in_stock: g
					} = e, {
						dispatchStoreEvent: y
					} = (0, v.n)(), {
						cartQuantity: _,
						addingToCart: N,
						addToCart: b
					} = (e => {
						const {
							addItemToCart: t
						} = (0, A.useDispatch)(B.CART_STORE_KEY), {
							cartItems: r,
							cartIsLoading: c
						} = (0, a.b)(), {
							createErrorNotice: n,
							removeNotice: s
						} = (0, A.useDispatch)("core/notices"), [l, i] = (0, o.useState)(!1), u = (0, o.useRef)(O(r, e));
						return (0, o.useEffect)((() => {
							const t = O(r, e);
							t !== u.current && (u.current = t)
						}), [r, e]), {
							cartQuantity: Number.isFinite(u.current) ? u.current : 0,
							addingToCart: l,
							cartIsLoading: c,
							addToCart: (r = 1) => (i(!0), t(e, r).then((() => {
								s("add-to-cart")
							})).catch((e => {
								n((0, M.decodeEntities)(e.message), {
									id: "add-to-cart",
									context: "wc/all-products",
									isDismissible: !0
								})
							})).finally((() => {
								i(!1)
							})))
						}
					})(n), w = Number.isFinite(_) && _ > 0, k = !m && p && g, E = (0, M.decodeEntities)((null == d ? void 0 : d.description) || ""), h = w ? (0, s.sprintf)( /* translators: %s number of products in cart. */ /* translators: %s number of products in cart. */
						(0, s._n)("%d in cart", "%d in cart", _, "woocommerce"), _) : (0, M.decodeEntities)((null == d ? void 0 : d.text) || (0, s.__)("Add to cart", "woocommerce")), f = k ? "button" : "a", P = {};
					return k ? P.onClick = async () => {
						await b(), y("cart-add-item", {
							product: e
						});
						const {
							cartRedirectAfterAdd: t
						} = (0, u.getSetting)("productsSettings");
						t && (window.location.href = C.fh)
					}: (P.href = l, P.rel = "nofollow", P.onClick = () => {
						y("product-view-link", {
							product: e
						})
					}), (0, c.createElement)(f, {
						...P,
						"aria-label": E,
						disabled: N,
						className: i()(t, "wp-block-button__link", "wp-element-button", "add_to_cart_button", "wc-block-components-product-button__button", {
							loading: N,
							added: w
						}),
						style: r
					}, h)
				},
				H = ({
					className: e,
					style: t
				}) => (0, c.createElement)("button", {
					className: i()("wp-block-button__link", "wp-element-button", "add_to_cart_button", "wc-block-components-product-button__button", "wc-block-components-product-button__button--placeholder", e),
					style: t,
					disabled: !0
				}),
				W = e => {
					const {
						className: t,
						textAlign: r
					} = e, a = _(e), {
						parentClassName: o
					} = (0, n.useInnerBlockLayoutContext)(), {
						product: s
					} = (0, n.useProductDataContext)();
					return (0, c.createElement)("div", {
						className: i()(t, "wp-block-button", "wc-block-components-product-button", {
							[`${o}__product-add-to-cart`]: o,
							[`align-${r}`]: r
						})
					}, s.id ? (0, c.createElement)(z, {
						product: s,
						style: a.style,
						className: a.className
					}) : (0, c.createElement)(H, {
						style: a.style,
						className: a.className
					}))
				},
				j = ((0, N.withProductDataContext)(W), ({
					product: e
				}) => (0, c.createElement)("div", {
					className: "cross-sells-product"
				}, (0, c.createElement)(n.InnerBlockLayoutContextProvider, {
					parentName: "woocommerce/cart-cross-sells-block",
					parentClassName: "wp-block-cart-cross-sells-product"
				}, (0, c.createElement)(n.ProductDataContextProvider, {
					isLoading: !1,
					product: e
				}, (0, c.createElement)("div", null, (0, c.createElement)(f, {
					className: "",
					showSaleBadge: !0,
					productId: e.id,
					showProductLink: !0,
					saleBadgeAlign: "left",
					imageSizing: k.SINGLE,
					isDescendentOfQueryLoop: !1,
					scale: "cover",
					aspectRatio: "1:1"
				}), (0, c.createElement)(x, {
					align: "",
					headingLevel: 3,
					showProductLink: !0
				}), (0, c.createElement)(F, {
					isDescendentOfQueryLoop: !1,
					isDescendentOfSingleProductBlock: !1,
					productId: e.id,
					postId: 0,
					shouldDisplayMockedReviewsWhenProductHasNoReviews: !1
				}), (0, c.createElement)(T, null)), (0, c.createElement)(W, null))))),
				q = ({
					products: e,
					columns: t
				}) => {
					const r = e.map(((e, r) => r >= t ? null : (0, c.createElement)(j, {
						isLoading: !1,
						product: e,
						key: e.id
					})));
					return (0, c.createElement)("div", null, r)
				};
			var Z = r(4398);
			const G = ({
				className: e,
				columns: t
			}) => {
				const {
					crossSellsProducts: r
				} = (0, a.b)();
				return void 0 === t && (t = Z.attributes.columns.default), (0, c.createElement)(q, {
					className: e,
					columns: t,
					products: r
				})
			}
		},
		4466: () => {},
		3030: () => {},
		6006: () => {},
		3902: () => {},
		9375: () => {},
		333: () => {},
		5437: () => {}
	}
]);