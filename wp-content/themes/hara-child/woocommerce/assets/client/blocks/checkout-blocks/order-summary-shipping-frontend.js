(self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || []).push([
	[4063], {
		2904: (e, t, o) => {
			"use strict";
			o.d(t, {
				Z: () => l
			});
			var n = o(9196),
				a = o(9770),
				s = o(7608),
				c = o.n(s),
				r = (o(1029), o(2595));
			const l = ({
				className: e,
				showSpinner: t = !1,
				children: o,
				variant: s = "contained",
				...l
			}) => {
				const i = c()("wc-block-components-button", "wp-element-button", e, s, {
					"wc-block-components-button--loading": t
				});
				return (0, n.createElement)(a.Z, {
					className: i,
					...l
				}, t && (0, n.createElement)(r.Z, null), (0, n.createElement)("span", {
					className: "wc-block-components-button__text"
				}, o))
			}
		},
		9366: (e, t, o) => {
			"use strict";
			o.d(t, {
				l: () => A
			});
			var n = o(9196),
				a = o(3554),
				s = o(711),
				c = o(9307),
				r = o(5736),
				l = o(2629),
				i = o(7608),
				p = o.n(i),
				m = o(3133),
				d = o(6946),
				u = o(9818),
				g = o(4801);
			o(2750);
			const h = ({
				id: e,
				className: t,
				label: o,
				onChange: a,
				options: l,
				value: i,
				required: h = !1,
				errorId: _,
				autoComplete: E = "off",
				errorMessage: b = (0, r.__)("Please select a valid option", "woocommerce")
			}) => {
				const k = (0, c.useRef)(null),
					v = (0, c.useId)(),
					w = e || "control-" + v,
					f = _ || w,
					{
						setValidationErrors: C,
						clearValidationError: y
					} = (0, u.useDispatch)(g.VALIDATION_STORE_KEY),
					{
						error: N,
						validationErrorId: S
					} = (0, u.useSelect)((e => {
						const t = e(g.VALIDATION_STORE_KEY);
						return {
							error: t.getValidationError(f),
							validationErrorId: t.getValidationErrorId(f)
						}
					}));
				return (0, c.useEffect)((() => (!h || i ? y(f) : C({
					[f]: {
						message: b,
						hidden: !0
					}
				}), () => {
					y(f)
				})), [y, i, f, b, h, C]), (0, n.createElement)("div", {
					id: w,
					className: p()("wc-block-components-combobox", t, {
						"is-active": i,
						"has-error": (null == N ? void 0 : N.message) && !(null != N && N.hidden)
					}),
					ref: k
				}, (0, n.createElement)(m.Z, {
					className: "wc-block-components-combobox-control",
					label: o,
					onChange: a,
					onFilterValueChange: e => {
						if (e.length) {
							const t = (0, d.isObject)(k.current) ? k.current.ownerDocument.activeElement : void 0;
							if (t && (0, d.isObject)(k.current) && k.current.contains(t)) return;
							const o = e.toLocaleUpperCase(),
								n = l.find((e => e.value.toLocaleUpperCase() === o));
							if (n) return void a(n.value);
							const s = l.find((e => e.label.toLocaleUpperCase().startsWith(o)));
							s && a(s.value)
						}
					},
					options: l,
					value: i || "",
					allowReset: !1,
					autoComplete: E,
					"aria-invalid": (null == N ? void 0 : N.message) && !(null != N && N.hidden),
					"aria-errormessage": S
				}), (0, n.createElement)(s.ValidationInputError, {
					propertyName: f
				}))
			};
			o(7368);
			const _ = ({
				className: e,
				countries: t,
				id: o,
				label: a,
				onChange: s,
				value: i = "",
				autoComplete: m = "off",
				required: d = !1,
				errorId: u,
				errorMessage: g = (0, r.__)("Please select a country", "woocommerce")
			}) => {
				const _ = (0, c.useMemo)((() => Object.entries(t).map((([e, t]) => ({
					value: e,
					label: (0, l.decodeEntities)(t)
				})))), [t]);
				return (0, n.createElement)("div", {
					className: p()(e, "wc-block-components-country-input")
				}, (0, n.createElement)(h, {
					id: o,
					label: a,
					onChange: s,
					options: _,
					value: i,
					errorId: u,
					errorMessage: g,
					required: d,
					autoComplete: m
				}))
			};
			var E = o(8752);
			const b = e => (0, n.createElement)(_, {
					countries: E.DK,
					...e
				}),
				k = e => (0, n.createElement)(_, {
					countries: E.mO,
					...e
				});
			o(6115);
			const v = (e, t) => {
					const o = t.find((t => t.label.toLocaleUpperCase() === e.toLocaleUpperCase() || t.value.toLocaleUpperCase() === e.toLocaleUpperCase()));
					return o ? o.value : ""
				},
				w = ({
					className: e,
					id: t,
					states: o,
					country: a,
					label: i,
					onChange: m,
					autoComplete: d = "off",
					value: u = "",
					required: g = !1,
					errorId: _ = ""
				}) => {
					const E = o[a],
						b = (0, c.useMemo)((() => E ? Object.keys(E).map((e => ({
							value: e,
							label: (0, l.decodeEntities)(E[e])
						}))) : []), [E]),
						k = (0, c.useCallback)((e => {
							const t = b.length > 0 ? v(e, b) : e;
							t !== u && m(t)
						}), [m, b, u]),
						w = (0, c.useRef)(u);
					return (0, c.useEffect)((() => {
						w.current !== u && (w.current = u)
					}), [u]), (0, c.useEffect)((() => {
						if (b.length > 0 && w.current) {
							const e = v(w.current, b);
							e !== w.current && k(e)
						}
					}), [b, k]), b.length > 0 ? (0, n.createElement)(h, {
						className: p()(e, "wc-block-components-state-input"),
						id: t,
						label: i,
						onChange: k,
						options: b,
						value: u,
						errorMessage: (0, r.__)("Please select a state.", "woocommerce"),
						errorId: _,
						required: g,
						autoComplete: d
					}) : (0, n.createElement)(s.ValidatedTextInput, {
						className: e,
						id: t,
						label: i,
						onChange: k,
						autoComplete: d,
						value: u,
						required: g
					})
				},
				f = e => (0, n.createElement)(w, {
					states: E.JJ,
					...e
				}),
				C = e => (0, n.createElement)(w, {
					states: E.nm,
					...e
				});
			var y = o(4333),
				N = o(9530),
				S = o(9127),
				R = o.n(S),
				I = o(5969);
			var O = o(6483);
			const T = ({
					id: e = "",
					fields: t,
					fieldConfig: o = {},
					onChange: l,
					addressType: i = "shipping",
					values: m,
					children: _
				}) => {
					const E = (0, y.useInstanceId)(T),
						v = (0, N.s)(t),
						w = (0, N.s)(o),
						S = (0, N.s)((0, d.objectHasProp)(m, "country") ? m.country : ""),
						A = (0, c.useMemo)((() => {
							const e = (0, I.Z)(v, w, S);
							return {
								fields: e,
								addressType: i,
								required: e.filter((e => e.required)),
								hidden: e.filter((e => e.hidden))
							}
						}), [v, w, S, i]),
						L = (0, c.useRef)({});
					return (0, c.useEffect)((() => {
						const e = {
							...m,
							...Object.fromEntries(A.hidden.map((e => [e.key, ""])))
						};
						R()(m, e) || l(e)
					}), [l, A, m]), (0, c.useEffect)((() => {
						"shipping" === i && (0, d.objectHasProp)(m, "country") && (e => {
							const t = "shipping_country",
								o = (0, u.select)(g.VALIDATION_STORE_KEY).getValidationError(t);
							!e.country && (e.city || e.state || e.postcode) && (o ? (0, u.dispatch)(g.VALIDATION_STORE_KEY).showValidationError(t) : (0, u.dispatch)(g.VALIDATION_STORE_KEY).setValidationErrors({
								[t]: {
									message: (0, r.__)("Please select your country", "woocommerce"),
									hidden: !1
								}
							})), o && e.country && (0, u.dispatch)(g.VALIDATION_STORE_KEY).clearValidationError(t)
						})(m)
					}), [m, i]), (0, c.useEffect)((() => {
						var e, t;
						null === (e = L.current) || void 0 === e || null === (t = e.postcode) || void 0 === t || t.revalidate()
					}), [S]), e = e || `${E}`, (0, n.createElement)("div", {
						id: e,
						className: "wc-block-components-address-form"
					}, A.fields.map((t => {
						if (t.hidden) return null;
						const o = {
							id: `${e}-${t.key}`,
							errorId: `${i}_${t.key}`,
							label: t.required ? t.label : t.optionalLabel,
							autoCapitalize: t.autocapitalize,
							autoComplete: t.autocomplete,
							errorMessage: t.errorMessage,
							required: t.required,
							className: `wc-block-components-address-form__${t.key}`,
							...t.attributes
						};
						if ("email" === t.key && (o.id = "email", o.errorId = "billing_email"), "checkbox" === t.type) return (0, n.createElement)(s.CheckboxControl, {
							className: `wc-block-components-address-form__${t.key}`,
							label: t.label,
							key: t.key,
							checked: Boolean(m[t.key]),
							onChange: e => {
								l({
									...m,
									[t.key]: e
								})
							},
							...o
						});
						if ("country" === t.key && (0, d.objectHasProp)(m, "country")) {
							const e = "shipping" === i ? k : b;
							return (0, n.createElement)(e, {
								key: t.key,
								...o,
								value: m.country,
								onChange: e => {
									const t = {
										...m,
										country: e,
										state: ""
									};
									m.postcode && !(0, a.isPostcode)({
										postcode: m.postcode,
										country: e
									}) && (t.postcode = ""), l(t)
								}
							})
						}
						if ("state" === t.key && (0, d.objectHasProp)(m, "state")) {
							const e = "shipping" === i ? C : f;
							return (0, n.createElement)(e, {
								key: t.key,
								...o,
								country: m.country,
								value: m.state,
								onChange: e => l({
									...m,
									state: e
								})
							})
						}
						return "select" === t.type ? void 0 === t.options ? null : (0, n.createElement)(h, {
							key: t.key,
							...o,
							className: p()("wc-block-components-select-input", `wc-block-components-select-input-${t.key}`),
							value: m[t.key],
							onChange: e => {
								l({
									...m,
									[t.key]: e
								})
							},
							options: t.options
						}) : (0, n.createElement)(s.ValidatedTextInput, {
							key: t.key,
							ref: e => L.current[t.key] = e,
							...o,
							type: t.type,
							value: m[t.key],
							onChange: e => l({
								...m,
								[t.key]: e
							}),
							customFormatter: e => "postcode" === t.key ? e.trimStart().toUpperCase() : e,
							customValidation: e => ((e, t, o) => !((e.required || e.value) && ("postcode" === t && o && !(0, a.isPostcode)({
								postcode: e.value,
								country: o
							}) ? (e.setCustomValidity((0, r.__)("Please enter a valid postcode", "woocommerce")), 1) : "email" === t && !(0, O.isEmail)(e.value) && (e.setCustomValidity((0, r.__)("Please enter a valid email address", "woocommerce")), 1))))(e, t.key, (0, d.objectHasProp)(m, "country") ? m.country : "")
						})
					})), _)
				},
				A = T
		},
		8810: (e, t, o) => {
			"use strict";
			o.d(t, {
				Z: () => C
			});
			var n = o(9196),
				a = o(7608),
				s = o.n(a),
				c = o(5736),
				r = o(2629),
				l = o(711),
				i = o(9307),
				p = o(3251),
				m = o(3561),
				d = o.n(m);
			const u = ["a", "b", "em", "i", "strong", "p", "br"],
				g = ["target", "href", "rel", "name", "download"],
				h = (e, t) => {
					const o = (null == t ? void 0 : t.tags) || u,
						n = (null == t ? void 0 : t.attr) || g;
					return d().sanitize(e, {
						ALLOWED_TAGS: o,
						ALLOWED_ATTR: n
					})
				};
			var _ = o(9818),
				E = o(4801),
				b = o(8161),
				k = o(4293),
				v = o(4617);
			const w = e => {
					const t = (0, v.getSetting)("displayCartPricesIncludingTax", !1) ? parseInt(e.price, 10) + parseInt(e.taxes, 10) : parseInt(e.price, 10);
					let o = (0, n.createElement)(n.Fragment, null, Number.isFinite(t) && (0, n.createElement)(l.FormattedMonetaryAmount, {
						currency: (0, k.getCurrencyFromPriceResponse)(e),
						value: t
					}), Number.isFinite(t) && e.delivery_time ? " — " : null, (0, r.decodeEntities)(e.delivery_time));
					return 0 === t && (o = (0, n.createElement)("span", {
						className: "wc-block-components-shipping-rates-control__package__description--free"
					}, (0, c.__)("Free", "woocommerce"))), {
						label: (0, r.decodeEntities)(e.name),
						value: e.rate_id,
						description: o
					}
				},
				f = ({
					className: e = "",
					noResultsMessage: t,
					onSelectRate: o,
					rates: a,
					renderOption: s = w,
					selectedRate: c,
					disabled: r = !1,
					highlightChecked: p = !1
				}) => {
					const m = (null == c ? void 0 : c.rate_id) || "",
						d = (0, b.D)(m),
						[u, g] = (0, i.useState)((() => {
							var e;
							return m || (null === (e = a[0]) || void 0 === e ? void 0 : e.rate_id)
						}));
					return (0, i.useEffect)((() => {
						m && m !== d && m !== u && g(m)
					}), [m, u, d]), (0, i.useEffect)((() => {
						u && o(u)
					}), [o, u]), 0 === a.length ? t : (0, n.createElement)(l.RadioControl, {
						className: e,
						onChange: e => {
							g(e), o(e)
						},
						highlightChecked: p,
						disabled: r,
						selected: u,
						options: a.map(s)
					})
				};
			o(7099);
			const C = ({
				packageId: e,
				className: t = "",
				noResultsMessage: o,
				renderOption: a,
				packageData: m,
				collapsible: d,
				showItems: u,
				highlightChecked: g = !1
			}) => {
				var b;
				const {
					selectShippingRate: k,
					isSelectingRate: v
				} = (0, p.V)(), w = (0, _.useSelect)((e => {
					var t, o, n;
					return null === (t = e(E.CART_STORE_KEY)) || void 0 === t || null === (o = t.getCartData()) || void 0 === o || null === (n = o.shippingRates) || void 0 === n ? void 0 : n.length
				})) > 1 || document.querySelectorAll(".wc-block-components-shipping-rates-control__package").length > 1, C = null != u ? u : w, y = null != d ? d : w, N = (0, n.createElement)(n.Fragment, null, (y || C) && (0, n.createElement)("div", {
					className: "wc-block-components-shipping-rates-control__package-title",
					dangerouslySetInnerHTML: {
						__html: h(m.name)
					}
				}), C && (0, n.createElement)("ul", {
					className: "wc-block-components-shipping-rates-control__package-items"
				}, Object.values(m.items).map((e => {
					const t = (0, r.decodeEntities)(e.name),
						o = e.quantity;
					return (0, n.createElement)("li", {
						key: e.key,
						className: "wc-block-components-shipping-rates-control__package-item"
					}, (0, n.createElement)(l.Label, {
						label: o > 1 ? `${t} × ${o}` : `${t}`,
						screenReaderLabel: (0, c.sprintf)( /* translators: %1$s name of the product (ie: Sunglasses), %2$d number of units in the current cart package */ /* translators: %1$s name of the product (ie: Sunglasses), %2$d number of units in the current cart package */
							(0, c._n)("%1$s (%2$d unit)", "%1$s (%2$d units)", o, "woocommerce"), t, o)
					}))
				})))), S = (0, i.useCallback)((t => {
					k(t, e)
				}), [e, k]), R = {
					className: t,
					noResultsMessage: o,
					rates: m.shipping_rates,
					onSelectRate: S,
					selectedRate: m.shipping_rates.find((e => e.selected)),
					renderOption: a,
					disabled: v,
					highlightChecked: g
				}, I = (0, i.useMemo)((() => {
					var e;
					return null == m || null === (e = m.shipping_rates) || void 0 === e ? void 0 : e.findIndex((e => null == e ? void 0 : e.selected))
				}), [null == m ? void 0 : m.shipping_rates]);
				return y ? (0, n.createElement)(l.Panel, {
					className: s()("wc-block-components-shipping-rates-control__package", t, {
						"wc-block-components-shipping-rates-control__package--disabled": v
					}),
					initialOpen: !1,
					title: N
				}, (0, n.createElement)(f, {
					...R
				})) : (0, n.createElement)("div", {
					className: s()("wc-block-components-shipping-rates-control__package", t, {
						"wc-block-components-shipping-rates-control__package--disabled": v,
						"wc-block-components-shipping-rates-control__package--first-selected": !v && 0 === I,
						"wc-block-components-shipping-rates-control__package--last-selected": !v && I === (null == m || null === (b = m.shipping_rates) || void 0 === b ? void 0 : b.length) - 1
					})
				}, N, (0, n.createElement)(f, {
					...R
				}))
			}
		},
		5091: (e, t, o) => {
			"use strict";
			o.d(t, {
				Z: () => E
			});
			var n = o(9196),
				a = o(5736),
				s = o(9307),
				c = o(6881),
				r = o(3554),
				l = o(7865),
				i = o(9659),
				p = o(8449),
				m = o(3251),
				d = o(4787),
				u = o(6946),
				g = o(8810),
				h = o(5158);
			const _ = ({
					packages: e,
					showItems: t,
					collapsible: o,
					noResultsMessage: a,
					renderOption: s,
					context: c = ""
				}) => e.length ? (0, n.createElement)(n.Fragment, null, e.map((({
					package_id: e,
					...r
				}) => (0, n.createElement)(g.Z, {
					highlightChecked: "woocommerce/cart" !== c,
					key: e,
					packageId: e,
					packageData: r,
					collapsible: o,
					showItems: t,
					noResultsMessage: a,
					renderOption: s
				})))) : null,
				E = ({
					shippingRates: e,
					isLoadingRates: t,
					className: o,
					collapsible: E,
					showItems: b,
					noResultsMessage: k,
					renderOption: v,
					context: w
				}) => {
					(0, s.useEffect)((() => {
						var o, n;
						t || (o = (0, l.wH)(e), n = (0, l.Q_)(e), 1 === o ? (0, h.speak)((0, a.sprintf)( /* translators: %d number of shipping options found. */ /* translators: %d number of shipping options found. */
							(0, a._n)("%d shipping option was found.", "%d shipping options were found.", n, "woocommerce"), n)) : (0, h.speak)((0, a.sprintf)( /* translators: %d number of shipping packages packages. */ /* translators: %d number of shipping packages packages. */
							(0, a._n)("Shipping option searched for %d package.", "Shipping options searched for %d packages.", o, "woocommerce"), o) + " " + (0, a.sprintf)( /* translators: %d number of shipping options available. */ /* translators: %d number of shipping options available. */
							(0, a._n)("%d shipping option was found", "%d shipping options were found", n, "woocommerce"), n)))
					}), [t, e]);
					const {
						extensions: f,
						receiveCart: C,
						...y
					} = (0, i.b)(), N = {
						className: o,
						collapsible: E,
						showItems: b,
						noResultsMessage: k,
						renderOption: v,
						extensions: f,
						cart: y,
						components: {
							ShippingRatesControlPackage: g.Z
						},
						context: w
					}, {
						isEditor: S
					} = (0, p._)(), {
						hasSelectedLocalPickup: R,
						selectedRates: I
					} = (0, m.V)(), O = (0, u.isObject)(I) ? Object.values(I) : [], T = O.every((e => e === O[0]));
					return (0, n.createElement)(c.Z, {
						isLoading: t,
						screenReaderLabel: (0, a.__)("Loading shipping rates…", "woocommerce"),
						showSpinner: !0
					}, R && "woocommerce/cart" === w && e.length > 1 && !T && !S && (0, n.createElement)(d.Z, {
						className: "wc-block-components-notice",
						isDismissible: !1,
						status: "warning"
					}, (0, a.__)("Multiple shipments must have the same pickup location", "woocommerce")), (0, n.createElement)(r.ExperimentalOrderShippingPackages.Slot, {
						...N
					}), (0, n.createElement)(r.ExperimentalOrderShippingPackages, null, (0, n.createElement)(_, {
						packages: e,
						noResultsMessage: k,
						renderOption: v
					})))
				}
		},
		7184: (e, t, o) => {
			"use strict";
			o.d(t, {
				RK: () => g,
				X$: () => b,
				Br: () => w,
				Tm: () => Y
			});
			var n = o(9196),
				a = o(5736),
				s = o(9307),
				c = o(2904),
				r = o(6881),
				l = o(4333),
				i = o(711),
				p = o(9818),
				m = o(4801),
				d = o(7608),
				u = o.n(d);
			o(1691);
			const g = (0, l.withInstanceId)((({
				instanceId: e,
				isLoading: t = !1,
				onSubmit: o,
				displayCouponForm: l = !1
			}) => {
				const [d, g] = (0, s.useState)(""), [h, _] = (0, s.useState)(!l), E = `wc-block-components-totals-coupon__input-${e}`, b = u()("wc-block-components-totals-coupon__content", {
					"screen-reader-text": h
				}), {
					validationErrorId: k
				} = (0, p.useSelect)((e => ({
					validationErrorId: e(m.VALIDATION_STORE_KEY).getValidationErrorId(E)
				})));
				return (0, n.createElement)("div", {
					className: "wc-block-components-totals-coupon"
				}, h ? (0, n.createElement)("a", {
					role: "button",
					href: "#wc-block-components-totals-coupon__form",
					className: "wc-block-components-totals-coupon-link",
					"aria-label": (0, a.__)("Add a coupon 777", "woocommerce"),
					onClick: e => {
						e.preventDefault(), _(!1)
					}
				}, (0, a.__)("Add a coupon 88", "woocommerce")) : (0, n.createElement)(r.Z, {
					screenReaderLabel: (0, a.__)("Applying coupon…", "woocommerce"),
					isLoading: t,
					showSpinner: !1
				}, (0, n.createElement)("div", {
					className: b
				}, (0, n.createElement)("form", {
					className: "wc-block-components-totals-coupon__form",
					id: "wc-block-components-totals-coupon__form"
				}, (0, n.createElement)(i.ValidatedTextInput, {
					id: E,
					errorId: "coupon",
					className: "wc-block-components-totals-coupon__input",
					label: (0, a.__)("Enter code", "woocommerce"),
					value: d,
					ariaDescribedBy: k,
					onChange: e => {
						g(e)
					},
					focusOnMount: !0,
					validateOnMount: !1,
					showError: !1
				}), (0, n.createElement)(c.Z, {
					className: "wc-block-components-totals-coupon__button",
					disabled: t || !d,
					showSpinner: t,
					onClick: e => {
						var t;
						e.preventDefault(), void 0 !== o ? null === (t = o(d)) || void 0 === t || t.then((e => {
							e && (g(""), _(!0))
						})) : (g(""), _(!0))
					},
					type: "submit"
				}, (0, a.__)("Apply", "woocommerce"))), (0, n.createElement)(i.ValidationInputError, {
					propertyName: "coupon",
					elementId: E
				}))))
			}));
			var h = o(3554),
				_ = o(4617);
			o(4970);
			const E = {
					context: "summary"
				},
				b = ({
					cartCoupons: e = [],
					currency: t,
					isRemovingCoupon: o,
					removeCoupon: s,
					values: c
				}) => {
					const {
						total_discount: l,
						total_discount_tax: p
					} = c, m = parseInt(l, 10);
					if (!m && 0 === e.length) return null;
					const d = parseInt(p, 10),
						u = (0, _.getSetting)("displayCartPricesIncludingTax", !1) ? m + d : m,
						g = (0, h.applyCheckoutFilter)({
							arg: E,
							filterName: "coupons",
							defaultValue: e
						});
					return (0, n.createElement)(i.TotalsItem, {
						className: "wc-block-components-totals-discount",
						currency: t,
						description: 0 !== g.length && (0, n.createElement)(r.Z, {
							screenReaderLabel: (0, a.__)("Removing coupon…", "woocommerce"),
							isLoading: o,
							showSpinner: !1
						}, (0, n.createElement)("ul", {
							className: "wc-block-components-totals-discount__coupon-list"
						}, g.map((e => (0, n.createElement)(i.RemovableChip, {
							key: "coupon-" + e.code,
							className: "wc-block-components-totals-discount__coupon-list-item",
							text: e.label,
							screenReaderText: (0, a.sprintf)( /* translators: %s Coupon code. */ /* translators: %s Coupon code. */
								(0, a.__)("Coupon: %s", "woocommerce"), e.label),
							disabled: o,
							onRemove: () => {
								s(e.code)
							},
							radius: "large",
							ariaLabel: (0, a.sprintf)( /* translators: %s is a coupon code. */ /* translators: %s is a coupon code. */
								(0, a.__)('Remove coupon "%s"', "woocommerce"), e.label)
						}))))),
						label: u ? (0, a.__)("Discount", "woocommerce") : (0, a.__)("Coupons", "woocommerce"),
						value: u ? -1 * u : "-"
					})
				};
			var k = o(9659),
				v = o(4293);
			o(4554);
			const w = ({
				currency: e,
				values: t,
				className: o
			}) => {
				const c = (0, _.getSetting)("taxesEnabled", !0) && (0, _.getSetting)("displayCartPricesIncludingTax", !1),
					{
						total_price: r,
						total_tax: l,
						tax_lines: p
					} = t,
					{
						receiveCart: m,
						...d
					} = (0, k.b)(),
					g = (0, h.applyCheckoutFilter)({
						filterName: "totalLabel",
						defaultValue: (0, a.__)("Total", "woocommerce"),
						extensions: d.extensions,
						arg: {
							cart: d
						}
					}),
					E = (0, h.applyCheckoutFilter)({
						filterName: "totalValue",
						defaultValue: "<price/>",
						extensions: d.extensions,
						arg: {
							cart: d
						},
						validation: h.productPriceValidation
					}),
					b = (0, n.createElement)(i.FormattedMonetaryAmount, {
						className: "wc-block-components-totals-footer-item-tax-value",
						currency: e,
						value: parseInt(r, 10)
					}),
					w = (0, s.createInterpolateElement)(E, {
						price: b
					}),
					f = parseInt(l, 10),
					C = p && p.length > 0 ? (0, a.sprintf)( /* translators: %s is a list of tax rates */ /* translators: %s is a list of tax rates */
						(0, a.__)("Including %s", "woocommerce"), p.map((({
							name: t,
							price: o
						}) => `${(0,v.formatPrice)(o,e)} ${t}`)).join(", ")) : (0, a.__)("Including <TaxAmount/> in taxes", "woocommerce");
				return (0, n.createElement)(i.TotalsItem, {
					className: u()("wc-block-components-totals-footer-item", o),
					currency: e,
					label: g,
					value: w,
					description: c && 0 !== f && (0, n.createElement)("p", {
						className: "wc-block-components-totals-footer-item-tax"
					}, (0, s.createInterpolateElement)(C, {
						TaxAmount: (0, n.createElement)(i.FormattedMonetaryAmount, {
							className: "wc-block-components-totals-footer-item-tax-value",
							currency: e,
							value: f
						})
					}))
				})
			};
			var f = o(2629);
			const C = ({
				selectedShippingRates: e
			}) => (0, n.createElement)("div", {
				className: "wc-block-components-totals-item__description wc-block-components-totals-shipping__via"
			}, (0, f.decodeEntities)(e.filter(((t, o) => e.indexOf(t) === o)).join(", ")));
			var y = o(7865),
				N = o(9040),
				S = o(8540),
				R = o(1621),
				I = o(9127),
				O = o.n(I),
				T = (o(313), o(9366));
			const A = ({
					address: e,
					onUpdate: t,
					onCancel: o,
					addressFields: r
				}) => {
					const [l, i] = (0, s.useState)(e), {
						showAllValidationErrors: d
					} = (0, p.useDispatch)(m.VALIDATION_STORE_KEY), {
						hasValidationErrors: u,
						isCustomerDataUpdating: g
					} = (0, p.useSelect)((e => ({
						hasValidationErrors: e(m.VALIDATION_STORE_KEY).hasValidationErrors,
						isCustomerDataUpdating: e(m.CART_STORE_KEY).isCustomerDataUpdating()
					})));
					return (0, n.createElement)("form", {
						className: "wc-block-components-shipping-calculator-address"
					}, (0, n.createElement)(T.l, {
						fields: r,
						onChange: i,
						values: l
					}), (0, n.createElement)(c.Z, {
						className: "wc-block-components-shipping-calculator-address__button",
						disabled: g,
						onClick: n => (n.preventDefault(), O()(l, e) ? o() : (d(), u() ? void 0 : t(l))),
						type: "submit"
					}, (0, a.__)("Update", "woocommerce")))
				},
				L = ({
					onUpdate: e = (() => {}),
					onCancel: t = (() => {}),
					addressFields: o = ["country", "state", "city", "postcode"]
				}) => {
					const {
						shippingAddress: a
					} = (0, S.L)(), s = "wc/cart/shipping-calculator";
					return (0, n.createElement)("div", {
						className: "wc-block-components-shipping-calculator"
					}, (0, n.createElement)(i.StoreNoticesContainer, {
						context: s
					}), (0, n.createElement)(A, {
						address: a,
						addressFields: o,
						onCancel: t,
						onUpdate: t => {
							(0, p.dispatch)(m.CART_STORE_KEY).updateCustomerData({
								shipping_address: t
							}, !1).then((() => {
								(0, R.Zt)(s), e(t)
							})).catch((e => {
								(0, m.processErrorResponse)(e, s)
							}))
						}
					}))
				};
			var x = o(7731);
			const D = ({
					label: e = (0, a.__)("Calculate", "woocommerce"),
					isShippingCalculatorOpen: t,
					setIsShippingCalculatorOpen: o
				}) => (0, n.createElement)("a", {
					role: "button",
					href: "#wc-block-components-shipping-calculator-address__link",
					className: "wc-block-components-totals-shipping__change-address__link",
					id: "wc-block-components-totals-shipping__change-address__link",
					onClick: e => {
						e.preventDefault(), o(!t)
					},
					"aria-label": e,
					"aria-expanded": t
				}, e),
				V = ({
					showCalculator: e,
					isShippingCalculatorOpen: t,
					setIsShippingCalculatorOpen: o,
					isCheckout: s = !1
				}) => e ? (0, n.createElement)(D, {
					label: (0, a.__)("Add an address for shipping options", "woocommerce"),
					isShippingCalculatorOpen: t,
					setIsShippingCalculatorOpen: o
				}) : (0, n.createElement)("em", null, s ? (0, a.__)("No shipping options available", "woocommerce") : (0, a.__)("Calculated during checkout", "woocommerce"));
			var M = o(8449),
				P = o(6946);
			const Z = () => {
					const {
						pickupAddress: e
					} = (0, p.useSelect)((e => {
						const t = e("wc/store/cart").getShippingRates().flatMap((e => e.shipping_rates)).find((e => e.selected && (0, y.J3)(e)));
						if ((0, P.isObject)(t) && (0, P.objectHasProp)(t, "meta_data")) {
							const e = t.meta_data.find((e => "pickup_address" === e.key));
							if ((0, P.isObject)(e) && (0, P.objectHasProp)(e, "value") && e.value) return {
								pickupAddress: e.value
							}
						}
						return (0, P.isObject)(t), {
							pickupAddress: void 0
						}
					}));
					return void 0 === e ? null : (0, n.createElement)("span", {
						className: "wc-block-components-shipping-address"
					}, (0, a.sprintf)( /* translators: %s: shipping method name, e.g. "Amazon Locker" */ /* translators: %s: shipping method name, e.g. "Amazon Locker" */
						(0, a.__)("Collection from %s", "woocommerce"), e) + " ")
				},
				F = ({
					formattedLocation: e
				}) => e ? (0, n.createElement)("span", {
					className: "wc-block-components-shipping-address"
				}, (0, a.sprintf)( /* translators: %s location. */ /* translators: %s location. */
					(0, a.__)("Shipping to %s", "woocommerce"), e) + " ") : null,
				K = ({
					showCalculator: e,
					isShippingCalculatorOpen: t,
					setIsShippingCalculatorOpen: o,
					shippingAddress: s
				}) => {
					const {
						isEditor: c
					} = (0, M._)(), r = (0, p.useSelect)((e => e(m.CHECKOUT_STORE_KEY).prefersCollection())), l = (0, _.getSetting)("activeShippingZones"), i = l.length > 1 && l.some((e => "Everywhere" === e.description || "Locations outside all other zones" === e.description)), d = !!(0, N.ET)(s);
					if (!d && !c && !i) return null;
					const u = d ? (0, a.__)("Change address", "woocommerce") : (0, a.__)("Calculate shipping for your location", "woocommerce"),
						g = (0, N.ET)(s);
					return (0, n.createElement)(n.Fragment, null, r ? (0, n.createElement)(Z, null) : (0, n.createElement)(F, {
						formattedLocation: g
					}), e && (0, n.createElement)(D, {
						label: u,
						isShippingCalculatorOpen: t,
						setIsShippingCalculatorOpen: o
					}))
				};
			var j = o(4787),
				$ = o(5091);
			const U = ({
				hasRates: e,
				shippingRates: t,
				isLoadingRates: o,
				isAddressComplete: s
			}) => {
				const c = e ? (0, a.__)("Shipping options", "woocommerce") : (0, a.__)("Choose a shipping option", "woocommerce");
				return (0, n.createElement)("fieldset", {
					className: "wc-block-components-totals-shipping__fieldset"
				}, (0, n.createElement)("legend", {
					className: "screen-reader-text"
				}, c), (0, n.createElement)($.Z, {
					className: "wc-block-components-totals-shipping__options",
					noResultsMessage: (0, n.createElement)(n.Fragment, null, s && (0, n.createElement)(j.Z, {
						isDismissible: !1,
						className: "wc-block-components-shipping-rates-control__no-results-notice",
						status: "warning"
					}, (0, a.__)("There are no shipping options available. Please check your shipping address.", "woocommerce"))),
					shippingRates: t,
					isLoadingRates: o,
					context: "woocommerce/cart"
				}))
			};
			o(6968);
			const Y = ({
				currency: e,
				values: t,
				showCalculator: o = !0,
				showRateSelector: c = !0,
				isCheckout: r = !1,
				className: l
			}) => {
				const [d, g] = (0, s.useState)(!1), {
					shippingAddress: h,
					cartHasCalculatedShipping: _,
					shippingRates: E,
					isLoadingRates: b
				} = (0, k.b)(), v = (0, x.KR)(t), w = (0, x.CN)(E) || v > 0, f = o && d, S = (0, p.useSelect)((e => e(m.CHECKOUT_STORE_KEY).prefersCollection())), R = E.flatMap((e => e.shipping_rates.filter((e => S && (0, y.J3)(e) && e.selected || !S && e.selected)).flatMap((e => e.name)))), I = (0, N.K5)(h), O = (0, x.iG)(w, S, E);
				return (0, n.createElement)("div", {
					className: u()("wc-block-components-totals-shipping", l)
				}, (0, n.createElement)(i.TotalsItem, {
					label: (0, a.__)("Shipping", "woocommerce"),
					value: !O && _ ? v : (!I || r) && (0, n.createElement)(V, {
						showCalculator: o,
						isCheckout: r,
						isShippingCalculatorOpen: d,
						setIsShippingCalculatorOpen: g
					}),
					description: !O && _ || I && !r ? (0, n.createElement)(n.Fragment, null, (0, n.createElement)(C, {
						selectedShippingRates: R
					}), (0, n.createElement)(K, {
						shippingAddress: h,
						showCalculator: o,
						isShippingCalculatorOpen: d,
						setIsShippingCalculatorOpen: g
					})) : null,
					currency: e
				}), f && (0, n.createElement)(L, {
					onUpdate: () => {
						g(!1)
					},
					onCancel: () => {
						g(!1)
					}
				}), c && _ && !f && (0, n.createElement)(U, {
					hasRates: w,
					shippingRates: E,
					isLoadingRates: b,
					isAddressComplete: I
				}))
			}
		},
		6881: (e, t, o) => {
			"use strict";
			o.d(t, {
				Z: () => l
			});
			var n = o(9196),
				a = o(5736),
				s = o(7608),
				c = o.n(s),
				r = o(711);
			o(991);
			const l = ({
				children: e,
				className: t,
				screenReaderLabel: o,
				showSpinner: s = !1,
				isLoading: l = !0
			}) => (0, n.createElement)("div", {
				className: c()(t, {
					"wc-block-components-loading-mask": l
				})
			}, l && s && (0, n.createElement)(r.Spinner, null), (0, n.createElement)("div", {
				className: c()({
					"wc-block-components-loading-mask__children": l
				}),
				"aria-hidden": l
			}, e), l && (0, n.createElement)("span", {
				className: "screen-reader-text"
			}, o || (0, a.__)("Loading…", "woocommerce")))
		},
		4787: (e, t, o) => {
			"use strict";
			o.d(t, {
				Z: () => d
			});
			var n = o(9196),
				a = o(7608),
				s = o.n(a),
				c = o(5736),
				r = o(2911),
				l = o(9140),
				i = (o(946), o(9114)),
				p = o(2904),
				m = o(2010);
			const d = ({
				className: e,
				status: t = "default",
				children: o,
				spokenMessage: a = o,
				onRemove: d = (() => {}),
				isDismissible: u = !0,
				politeness: g = (0, i.x)(t),
				summary: h
			}) => ((0, m.o)(a, g), (0, n.createElement)("div", {
				className: s()(e, "wc-block-components-notice-banner", "is-" + t, {
					"is-dismissible": u
				})
			}, (0, n.createElement)(r.Z, {
				icon: (0, i.X)(t)
			}), (0, n.createElement)("div", {
				className: "wc-block-components-notice-banner__content"
			}, h && (0, n.createElement)("p", {
				className: "wc-block-components-notice-banner__summary"
			}, h), o), !!u && (0, n.createElement)(p.Z, {
				className: "wc-block-components-notice-banner__dismiss",
				icon: l.Z,
				label: (0, c.__)("Dismiss this notice", "woocommerce"),
				onClick: e => {
					"function" == typeof(null == e ? void 0 : e.preventDefault) && e.preventDefault && e.preventDefault(), d()
				},
				showTooltip: !1
			})))
		},
		9114: (e, t, o) => {
			"use strict";
			o.d(t, {
				X: () => r,
				x: () => c
			});
			var n = o(202),
				a = o(2720),
				s = o(1242);
			const c = e => {
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
							return a.Z;
						default:
							return s.Z
					}
				}
		},
		8540: (e, t, o) => {
			"use strict";
			o.d(t, {
				L: () => s
			});
			var n = o(9818),
				a = o(4801);
			const s = () => {
				const {
					customerData: e,
					isInitialized: t
				} = (0, n.useSelect)((e => {
					const t = e(a.CART_STORE_KEY);
					return {
						customerData: t.getCustomerData(),
						isInitialized: t.hasFinishedResolution("getCartData")
					}
				})), {
					setShippingAddress: o,
					setBillingAddress: s
				} = (0, n.useDispatch)(a.CART_STORE_KEY);
				return {
					isInitialized: t,
					billingAddress: e.billingAddress,
					shippingAddress: e.shippingAddress,
					setBillingAddress: s,
					setShippingAddress: o
				}
			}
		},
		9530: (e, t, o) => {
			"use strict";
			o.d(t, {
				s: () => c
			});
			var n = o(9307),
				a = o(9127),
				s = o.n(a);

			function c(e) {
				const t = (0, n.useRef)(e);
				return s()(e, t.current) || (t.current = e), t.current
			}
		},
		2010: (e, t, o) => {
			"use strict";
			o.d(t, {
				o: () => s
			});
			var n = o(9307),
				a = o(5158);
			const s = (e, t) => {
				const o = "string" == typeof e ? e : (0, n.renderToString)(e);
				(0, n.useEffect)((() => {
					o && (0, a.speak)(o, t)
				}), [o, t])
			}
		},
		1233: (e, t, o) => {
			"use strict";
			o.r(t), o.d(t, {
				default: () => l
			});
			var n = o(9196),
				a = o(7184),
				s = o(4293),
				c = o(9659),
				r = o(3554);
			const l = ({
				className: e = ""
			}) => {
				const {
					cartTotals: t,
					cartNeedsShipping: o
				} = (0, c.b)();
				if (!o) return null;
				const l = (0, s.getCurrencyFromPriceResponse)(t);
				return (0, n.createElement)(r.TotalsWrapper, {
					className: e
				}, (0, n.createElement)(a.Tm, {
					showCalculator: !1,
					showRateSelector: !1,
					values: t,
					currency: l,
					isCheckout: !0
				}))
			}
		},
		2595: (e, t, o) => {
			"use strict";
			o.d(t, {
				Z: () => a
			});
			var n = o(9196);
			o(7440);
			const a = () => (0, n.createElement)("span", {
				className: "wc-block-components-spinner",
				"aria-hidden": "true"
			})
		},
		1029: () => {},
		313: () => {},
		7099: () => {},
		1691: () => {},
		4970: () => {},
		4554: () => {},
		6968: () => {},
		2750: () => {},
		7368: () => {},
		991: () => {},
		946: () => {},
		6115: () => {},
		7440: () => {}
	}
]);