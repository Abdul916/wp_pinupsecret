(self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || []).push([
	[6762], {
		2904: (e, t, o) => {
			"use strict";
			o.d(t, {
				Z: () => l
			});
			var n = o(9196),
				s = o(9770),
				a = o(7608),
				c = o.n(a),
				r = (o(1029), o(2595));
			const l = ({
				className: e,
				showSpinner: t = !1,
				children: o,
				variant: a = "contained",
				...l
			}) => {
				const i = c()("wc-block-components-button", "wp-element-button", e, a, {
					"wc-block-components-button--loading": t
				});
				return (0, n.createElement)(s.Z, {
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
				s = o(3554),
				a = o(711),
				c = o(9307),
				r = o(5736),
				l = o(2629),
				i = o(7608),
				p = o.n(i),
				u = o(3133),
				d = o(6946),
				m = o(9818),
				g = o(4801);
			o(2750);
			const h = ({
				id: e,
				className: t,
				label: o,
				onChange: s,
				options: l,
				value: i,
				required: h = !1,
				errorId: _,
				autoComplete: E = "off",
				errorMessage: b = (0, r.__)("Please select a valid option", "woocommerce")
			}) => {
				const v = (0, c.useRef)(null),
					k = (0, c.useId)(),
					C = e || "control-" + k,
					w = _ || C,
					{
						setValidationErrors: f,
						clearValidationError: y
					} = (0, m.useDispatch)(g.VALIDATION_STORE_KEY),
					{
						error: R,
						validationErrorId: S
					} = (0, m.useSelect)((e => {
						const t = e(g.VALIDATION_STORE_KEY);
						return {
							error: t.getValidationError(w),
							validationErrorId: t.getValidationErrorId(w)
						}
					}));
				return (0, c.useEffect)((() => (!h || i ? y(w) : f({
					[w]: {
						message: b,
						hidden: !0
					}
				}), () => {
					y(w)
				})), [y, i, w, b, h, f]), (0, n.createElement)("div", {
					id: C,
					className: p()("wc-block-components-combobox", t, {
						"is-active": i,
						"has-error": (null == R ? void 0 : R.message) && !(null != R && R.hidden)
					}),
					ref: v
				}, (0, n.createElement)(u.Z, {
					className: "wc-block-components-combobox-control",
					label: o,
					onChange: s,
					onFilterValueChange: e => {
						if (e.length) {
							const t = (0, d.isObject)(v.current) ? v.current.ownerDocument.activeElement : void 0;
							if (t && (0, d.isObject)(v.current) && v.current.contains(t)) return;
							const o = e.toLocaleUpperCase(),
								n = l.find((e => e.value.toLocaleUpperCase() === o));
							if (n) return void s(n.value);
							const a = l.find((e => e.label.toLocaleUpperCase().startsWith(o)));
							a && s(a.value)
						}
					},
					options: l,
					value: i || "",
					allowReset: !1,
					autoComplete: E,
					"aria-invalid": (null == R ? void 0 : R.message) && !(null != R && R.hidden),
					"aria-errormessage": S
				}), (0, n.createElement)(a.ValidationInputError, {
					propertyName: w
				}))
			};
			o(7368);
			const _ = ({
				className: e,
				countries: t,
				id: o,
				label: s,
				onChange: a,
				value: i = "",
				autoComplete: u = "off",
				required: d = !1,
				errorId: m,
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
					label: s,
					onChange: a,
					options: _,
					value: i,
					errorId: m,
					errorMessage: g,
					required: d,
					autoComplete: u
				}))
			};
			var E = o(8752);
			const b = e => (0, n.createElement)(_, {
					countries: E.DK,
					...e
				}),
				v = e => (0, n.createElement)(_, {
					countries: E.mO,
					...e
				});
			o(6115);
			const k = (e, t) => {
					const o = t.find((t => t.label.toLocaleUpperCase() === e.toLocaleUpperCase() || t.value.toLocaleUpperCase() === e.toLocaleUpperCase()));
					return o ? o.value : ""
				},
				C = ({
					className: e,
					id: t,
					states: o,
					country: s,
					label: i,
					onChange: u,
					autoComplete: d = "off",
					value: m = "",
					required: g = !1,
					errorId: _ = ""
				}) => {
					const E = o[s],
						b = (0, c.useMemo)((() => E ? Object.keys(E).map((e => ({
							value: e,
							label: (0, l.decodeEntities)(E[e])
						}))) : []), [E]),
						v = (0, c.useCallback)((e => {
							const t = b.length > 0 ? k(e, b) : e;
							t !== m && u(t)
						}), [u, b, m]),
						C = (0, c.useRef)(m);
					return (0, c.useEffect)((() => {
						C.current !== m && (C.current = m)
					}), [m]), (0, c.useEffect)((() => {
						if (b.length > 0 && C.current) {
							const e = k(C.current, b);
							e !== C.current && v(e)
						}
					}), [b, v]), b.length > 0 ? (0, n.createElement)(h, {
						className: p()(e, "wc-block-components-state-input"),
						id: t,
						label: i,
						onChange: v,
						options: b,
						value: m,
						errorMessage: (0, r.__)("Please select a state.", "woocommerce"),
						errorId: _,
						required: g,
						autoComplete: d
					}) : (0, n.createElement)(a.ValidatedTextInput, {
						className: e,
						id: t,
						label: i,
						onChange: v,
						autoComplete: d,
						value: m,
						required: g
					})
				},
				w = e => (0, n.createElement)(C, {
					states: E.JJ,
					...e
				}),
				f = e => (0, n.createElement)(C, {
					states: E.nm,
					...e
				});
			var y = o(4333),
				R = o(9530),
				S = o(9127),
				N = o.n(S),
				I = o(5969);
			var O = o(6483);
			const T = ({
					id: e = "",
					fields: t,
					fieldConfig: o = {},
					onChange: l,
					addressType: i = "shipping",
					values: u,
					children: _
				}) => {
					const E = (0, y.useInstanceId)(T),
						k = (0, R.s)(t),
						C = (0, R.s)(o),
						S = (0, R.s)((0, d.objectHasProp)(u, "country") ? u.country : ""),
						A = (0, c.useMemo)((() => {
							const e = (0, I.Z)(k, C, S);
							return {
								fields: e,
								addressType: i,
								required: e.filter((e => e.required)),
								hidden: e.filter((e => e.hidden))
							}
						}), [k, C, S, i]),
						x = (0, c.useRef)({});
					return (0, c.useEffect)((() => {
						const e = {
							...u,
							...Object.fromEntries(A.hidden.map((e => [e.key, ""])))
						};
						N()(u, e) || l(e)
					}), [l, A, u]), (0, c.useEffect)((() => {
						"shipping" === i && (0, d.objectHasProp)(u, "country") && (e => {
							const t = "shipping_country",
								o = (0, m.select)(g.VALIDATION_STORE_KEY).getValidationError(t);
							!e.country && (e.city || e.state || e.postcode) && (o ? (0, m.dispatch)(g.VALIDATION_STORE_KEY).showValidationError(t) : (0, m.dispatch)(g.VALIDATION_STORE_KEY).setValidationErrors({
								[t]: {
									message: (0, r.__)("Please select your country", "woocommerce"),
									hidden: !1
								}
							})), o && e.country && (0, m.dispatch)(g.VALIDATION_STORE_KEY).clearValidationError(t)
						})(u)
					}), [u, i]), (0, c.useEffect)((() => {
						var e, t;
						null === (e = x.current) || void 0 === e || null === (t = e.postcode) || void 0 === t || t.revalidate()
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
						if ("email" === t.key && (o.id = "email", o.errorId = "billing_email"), "checkbox" === t.type) return (0, n.createElement)(a.CheckboxControl, {
							className: `wc-block-components-address-form__${t.key}`,
							label: t.label,
							key: t.key,
							checked: Boolean(u[t.key]),
							onChange: e => {
								l({
									...u,
									[t.key]: e
								})
							},
							...o
						});
						if ("country" === t.key && (0, d.objectHasProp)(u, "country")) {
							const e = "shipping" === i ? v : b;
							return (0, n.createElement)(e, {
								key: t.key,
								...o,
								value: u.country,
								onChange: e => {
									const t = {
										...u,
										country: e,
										state: ""
									};
									u.postcode && !(0, s.isPostcode)({
										postcode: u.postcode,
										country: e
									}) && (t.postcode = ""), l(t)
								}
							})
						}
						if ("state" === t.key && (0, d.objectHasProp)(u, "state")) {
							const e = "shipping" === i ? f : w;
							return (0, n.createElement)(e, {
								key: t.key,
								...o,
								country: u.country,
								value: u.state,
								onChange: e => l({
									...u,
									state: e
								})
							})
						}
						return "select" === t.type ? void 0 === t.options ? null : (0, n.createElement)(h, {
							key: t.key,
							...o,
							className: p()("wc-block-components-select-input", `wc-block-components-select-input-${t.key}`),
							value: u[t.key],
							onChange: e => {
								l({
									...u,
									[t.key]: e
								})
							},
							options: t.options
						}) : (0, n.createElement)(a.ValidatedTextInput, {
							key: t.key,
							ref: e => x.current[t.key] = e,
							...o,
							type: t.type,
							value: u[t.key],
							onChange: e => l({
								...u,
								[t.key]: e
							}),
							customFormatter: e => "postcode" === t.key ? e.trimStart().toUpperCase() : e,
							customValidation: e => ((e, t, o) => !((e.required || e.value) && ("postcode" === t && o && !(0, s.isPostcode)({
								postcode: e.value,
								country: o
							}) ? (e.setCustomValidity((0, r.__)("Please enter a valid postcode", "woocommerce")), 1) : "email" === t && !(0, O.isEmail)(e.value) && (e.setCustomValidity((0, r.__)("Please enter a valid email address", "woocommerce")), 1))))(e, t.key, (0, d.objectHasProp)(u, "country") ? u.country : "")
						})
					})), _)
				},
				A = T
		},
		8810: (e, t, o) => {
			"use strict";
			o.d(t, {
				Z: () => f
			});
			var n = o(9196),
				s = o(7608),
				a = o.n(s),
				c = o(5736),
				r = o(2629),
				l = o(711),
				i = o(9307),
				p = o(3251),
				u = o(3561),
				d = o.n(u);
			const m = ["a", "b", "em", "i", "strong", "p", "br"],
				g = ["target", "href", "rel", "name", "download"],
				h = (e, t) => {
					const o = (null == t ? void 0 : t.tags) || m,
						n = (null == t ? void 0 : t.attr) || g;
					return d().sanitize(e, {
						ALLOWED_TAGS: o,
						ALLOWED_ATTR: n
					})
				};
			var _ = o(9818),
				E = o(4801),
				b = o(8161),
				v = o(4293),
				k = o(4617);
			const C = e => {
					const t = (0, k.getSetting)("displayCartPricesIncludingTax", !1) ? parseInt(e.price, 10) + parseInt(e.taxes, 10) : parseInt(e.price, 10);
					let o = (0, n.createElement)(n.Fragment, null, Number.isFinite(t) && (0, n.createElement)(l.FormattedMonetaryAmount, {
						currency: (0, v.getCurrencyFromPriceResponse)(e),
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
				w = ({
					className: e = "",
					noResultsMessage: t,
					onSelectRate: o,
					rates: s,
					renderOption: a = C,
					selectedRate: c,
					disabled: r = !1,
					highlightChecked: p = !1
				}) => {
					const u = (null == c ? void 0 : c.rate_id) || "",
						d = (0, b.D)(u),
						[m, g] = (0, i.useState)((() => {
							var e;
							return u || (null === (e = s[0]) || void 0 === e ? void 0 : e.rate_id)
						}));
					return (0, i.useEffect)((() => {
						u && u !== d && u !== m && g(u)
					}), [u, m, d]), (0, i.useEffect)((() => {
						m && o(m)
					}), [o, m]), 0 === s.length ? t : (0, n.createElement)(l.RadioControl, {
						className: e,
						onChange: e => {
							g(e), o(e)
						},
						highlightChecked: p,
						disabled: r,
						selected: m,
						options: s.map(a)
					})
				};
			o(7099);
			const f = ({
				packageId: e,
				className: t = "",
				noResultsMessage: o,
				renderOption: s,
				packageData: u,
				collapsible: d,
				showItems: m,
				highlightChecked: g = !1
			}) => {
				var b;
				const {
					selectShippingRate: v,
					isSelectingRate: k
				} = (0, p.V)(), C = (0, _.useSelect)((e => {
					var t, o, n;
					return null === (t = e(E.CART_STORE_KEY)) || void 0 === t || null === (o = t.getCartData()) || void 0 === o || null === (n = o.shippingRates) || void 0 === n ? void 0 : n.length
				})) > 1 || document.querySelectorAll(".wc-block-components-shipping-rates-control__package").length > 1, f = null != m ? m : C, y = null != d ? d : C, R = (0, n.createElement)(n.Fragment, null, (y || f) && (0, n.createElement)("div", {
					className: "wc-block-components-shipping-rates-control__package-title",
					dangerouslySetInnerHTML: {
						__html: h(u.name)
					}
				}), f && (0, n.createElement)("ul", {
					className: "wc-block-components-shipping-rates-control__package-items"
				}, Object.values(u.items).map((e => {
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
					v(t, e)
				}), [e, v]), N = {
					className: t,
					noResultsMessage: o,
					rates: u.shipping_rates,
					onSelectRate: S,
					selectedRate: u.shipping_rates.find((e => e.selected)),
					renderOption: s,
					disabled: k,
					highlightChecked: g
				}, I = (0, i.useMemo)((() => {
					var e;
					return null == u || null === (e = u.shipping_rates) || void 0 === e ? void 0 : e.findIndex((e => null == e ? void 0 : e.selected))
				}), [null == u ? void 0 : u.shipping_rates]);
				return y ? (0, n.createElement)(l.Panel, {
					className: a()("wc-block-components-shipping-rates-control__package", t, {
						"wc-block-components-shipping-rates-control__package--disabled": k
					}),
					initialOpen: !1,
					title: R
				}, (0, n.createElement)(w, {
					...N
				})) : (0, n.createElement)("div", {
					className: a()("wc-block-components-shipping-rates-control__package", t, {
						"wc-block-components-shipping-rates-control__package--disabled": k,
						"wc-block-components-shipping-rates-control__package--first-selected": !k && 0 === I,
						"wc-block-components-shipping-rates-control__package--last-selected": !k && I === (null == u || null === (b = u.shipping_rates) || void 0 === b ? void 0 : b.length) - 1
					})
				}, R, (0, n.createElement)(w, {
					...N
				}))
			}
		},
		5091: (e, t, o) => {
			"use strict";
			o.d(t, {
				Z: () => E
			});
			var n = o(9196),
				s = o(5736),
				a = o(9307),
				c = o(6881),
				r = o(3554),
				l = o(7865),
				i = o(9659),
				p = o(8449),
				u = o(3251),
				d = o(4787),
				m = o(6946),
				g = o(8810),
				h = o(5158);
			const _ = ({
					packages: e,
					showItems: t,
					collapsible: o,
					noResultsMessage: s,
					renderOption: a,
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
					noResultsMessage: s,
					renderOption: a
				})))) : null,
				E = ({
					shippingRates: e,
					isLoadingRates: t,
					className: o,
					collapsible: E,
					showItems: b,
					noResultsMessage: v,
					renderOption: k,
					context: C
				}) => {
					(0, a.useEffect)((() => {
						var o, n;
						t || (o = (0, l.wH)(e), n = (0, l.Q_)(e), 1 === o ? (0, h.speak)((0, s.sprintf)( /* translators: %d number of shipping options found. */ /* translators: %d number of shipping options found. */
							(0, s._n)("%d shipping option was found.", "%d shipping options were found.", n, "woocommerce"), n)) : (0, h.speak)((0, s.sprintf)( /* translators: %d number of shipping packages packages. */ /* translators: %d number of shipping packages packages. */
							(0, s._n)("Shipping option searched for %d package.", "Shipping options searched for %d packages.", o, "woocommerce"), o) + " " + (0, s.sprintf)( /* translators: %d number of shipping options available. */ /* translators: %d number of shipping options available. */
							(0, s._n)("%d shipping option was found", "%d shipping options were found", n, "woocommerce"), n)))
					}), [t, e]);
					const {
						extensions: w,
						receiveCart: f,
						...y
					} = (0, i.b)(), R = {
						className: o,
						collapsible: E,
						showItems: b,
						noResultsMessage: v,
						renderOption: k,
						extensions: w,
						cart: y,
						components: {
							ShippingRatesControlPackage: g.Z
						},
						context: C
					}, {
						isEditor: S
					} = (0, p._)(), {
						hasSelectedLocalPickup: N,
						selectedRates: I
					} = (0, u.V)(), O = (0, m.isObject)(I) ? Object.values(I) : [], T = O.every((e => e === O[0]));
					return (0, n.createElement)(c.Z, {
						isLoading: t,
						screenReaderLabel: (0, s.__)("Loading shipping rates…", "woocommerce"),
						showSpinner: !0
					}, N && "woocommerce/cart" === C && e.length > 1 && !T && !S && (0, n.createElement)(d.Z, {
						className: "wc-block-components-notice",
						isDismissible: !1,
						status: "warning"
					}, (0, s.__)("Multiple shipments must have the same pickup location", "woocommerce")), (0, n.createElement)(r.ExperimentalOrderShippingPackages.Slot, {
						...R
					}), (0, n.createElement)(r.ExperimentalOrderShippingPackages, null, (0, n.createElement)(_, {
						packages: e,
						noResultsMessage: v,
						renderOption: k
					})))
				}
		},
		7184: (e, t, o) => {
			"use strict";
			o.d(t, {
				RK: () => g,
				X$: () => b,
				Br: () => C,
				Tm: () => $
			});
			var n = o(9196),
				s = o(5736),
				a = o(9307),
				c = o(2904),
				r = o(6881),
				l = o(4333),
				i = o(711),
				p = o(9818),
				u = o(4801),
				d = o(7608),
				m = o.n(d);
			o(1691);
			const g = (0, l.withInstanceId)((({
				instanceId: e,
				isLoading: t = !1,
				onSubmit: o,
				displayCouponForm: l = !1
			}) => {
				const [d, g] = (0, a.useState)(""), [h, _] = (0, a.useState)(!l), E = `wc-block-components-totals-coupon__input-${e}`, b = m()("wc-block-components-totals-coupon__content", {
					"screen-reader-text": h
				}), {
					validationErrorId: v
				} = (0, p.useSelect)((e => ({
					validationErrorId: e(u.VALIDATION_STORE_KEY).getValidationErrorId(E)
				})));
				return (0, n.createElement)("div", {
					className: "wc-block-components-totals-coupon"
				}, h ? (0, n.createElement)("a", {
					role: "button",
					href: "#wc-block-components-totals-coupon__form",
					className: "wc-block-components-totals-coupon-link",
					"aria-label": (0, s.__)("Add a coupon", "woocommerce"),
					onClick: e => {
						e.preventDefault(), _(!1)
					}
				}, (0, s.__)("Add a coupon", "woocommerce")) : (0, n.createElement)(r.Z, {
					screenReaderLabel: (0, s.__)("Applying coupon…", "woocommerce"),
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
					label: (0, s.__)("Enter code", "woocommerce"),
					value: d,
					ariaDescribedBy: v,
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
				}, (0, s.__)("Apply", "woocommerce"))), (0, n.createElement)(i.ValidationInputError, {
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
					removeCoupon: a,
					values: c
				}) => {
					const {
						total_discount: l,
						total_discount_tax: p
					} = c, u = parseInt(l, 10);
					if (!u && 0 === e.length) return null;
					const d = parseInt(p, 10),
						m = (0, _.getSetting)("displayCartPricesIncludingTax", !1) ? u + d : u,
						g = (0, h.applyCheckoutFilter)({
							arg: E,
							filterName: "coupons",
							defaultValue: e
						});
					return (0, n.createElement)(i.TotalsItem, {
						className: "wc-block-components-totals-discount",
						currency: t,
						description: 0 !== g.length && (0, n.createElement)(r.Z, {
							screenReaderLabel: (0, s.__)("Removing coupon…", "woocommerce"),
							isLoading: o,
							showSpinner: !1
						}, (0, n.createElement)("ul", {
							className: "wc-block-components-totals-discount__coupon-list"
						}, g.map((e => (0, n.createElement)(i.RemovableChip, {
							key: "coupon-" + e.code,
							className: "wc-block-components-totals-discount__coupon-list-item",
							text: e.label,
							screenReaderText: (0, s.sprintf)( /* translators: %s Coupon code. */ /* translators: %s Coupon code. */
								(0, s.__)("Coupon: %s", "woocommerce"), e.label),
							disabled: o,
							onRemove: () => {
								a(e.code)
							},
							radius: "large",
							ariaLabel: (0, s.sprintf)( /* translators: %s is a coupon code. */ /* translators: %s is a coupon code. */
								(0, s.__)('Remove coupon "%s"', "woocommerce"), e.label)
						}))))),
						label: m ? (0, s.__)("Discount", "woocommerce") : (0, s.__)("Coupons", "woocommerce"),
						value: m ? -1 * m : "-"
					})
				};
			var v = o(9659),
				k = o(4293);
			o(4554);
			const C = ({
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
						receiveCart: u,
						...d
					} = (0, v.b)(),
					g = (0, h.applyCheckoutFilter)({
						filterName: "totalLabel",
						defaultValue: (0, s.__)("Total Edit by Xl 4", "woocommerce"),
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
					C = (0, a.createInterpolateElement)(E, {
						price: b
					}),
					w = parseInt(l, 10),
					f = p && p.length > 0 ? (0, s.sprintf)( /* translators: %s is a list of tax rates */ /* translators: %s is a list of tax rates */
						(0, s.__)("Including %s", "woocommerce"), p.map((({
							name: t,
							price: o
						}) => `${(0,k.formatPrice)(o,e)} ${t}`)).join(", ")) : (0, s.__)("Including <TaxAmount/> in taxes", "woocommerce");
				return (0, n.createElement)(i.TotalsItem, {
					className: m()("wc-block-components-totals-footer-item", o),
					currency: e,
					label: g,
					value: C,
					description: c && 0 !== w && (0, n.createElement)("p", {
						className: "wc-block-components-totals-footer-item-tax"
					}, (0, a.createInterpolateElement)(f, {
						TaxAmount: (0, n.createElement)(i.FormattedMonetaryAmount, {
							className: "wc-block-components-totals-footer-item-tax-value",
							currency: e,
							value: w
						})
					}))
				})
			};
			var w = o(2629);
			const f = ({
				selectedShippingRates: e
			}) => (0, n.createElement)("div", {
				className: "wc-block-components-totals-item__description wc-block-components-totals-shipping__via"
			}, (0, w.decodeEntities)(e.filter(((t, o) => e.indexOf(t) === o)).join(", ")));
			var y = o(7865),
				R = o(9040),
				S = o(8540),
				N = o(1621),
				I = o(9127),
				O = o.n(I),
				T = (o(313), o(9366));
			const A = ({
					address: e,
					onUpdate: t,
					onCancel: o,
					addressFields: r
				}) => {
					const [l, i] = (0, a.useState)(e), {
						showAllValidationErrors: d
					} = (0, p.useDispatch)(u.VALIDATION_STORE_KEY), {
						hasValidationErrors: m,
						isCustomerDataUpdating: g
					} = (0, p.useSelect)((e => ({
						hasValidationErrors: e(u.VALIDATION_STORE_KEY).hasValidationErrors,
						isCustomerDataUpdating: e(u.CART_STORE_KEY).isCustomerDataUpdating()
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
						onClick: n => (n.preventDefault(), O()(l, e) ? o() : (d(), m() ? void 0 : t(l))),
						type: "submit"
					}, (0, s.__)("Update", "woocommerce")))
				},
				x = ({
					onUpdate: e = (() => {}),
					onCancel: t = (() => {}),
					addressFields: o = ["country", "state", "city", "postcode"]
				}) => {
					const {
						shippingAddress: s
					} = (0, S.L)(), a = "wc/cart/shipping-calculator";
					return (0, n.createElement)("div", {
						className: "wc-block-components-shipping-calculator"
					}, (0, n.createElement)(i.StoreNoticesContainer, {
						context: a
					}), (0, n.createElement)(A, {
						address: s,
						addressFields: o,
						onCancel: t,
						onUpdate: t => {
							(0, p.dispatch)(u.CART_STORE_KEY).updateCustomerData({
								shipping_address: t
							}, !1).then((() => {
								(0, N.Zt)(a), e(t)
							})).catch((e => {
								(0, u.processErrorResponse)(e, a)
							}))
						}
					}))
				};
			var L = o(7731);
			const D = ({
					label: e = (0, s.__)("Calculate", "woocommerce"),
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
					isCheckout: a = !1
				}) => e ? (0, n.createElement)(D, {
					label: (0, s.__)("Add an address for shipping options", "woocommerce"),
					isShippingCalculatorOpen: t,
					setIsShippingCalculatorOpen: o
				}) : (0, n.createElement)("em", null, a ? (0, s.__)("No shipping options available", "woocommerce") : (0, s.__)("Calculated during checkout", "woocommerce"));
			var P = o(8449),
				K = o(6946);
			const M = () => {
					const {
						pickupAddress: e
					} = (0, p.useSelect)((e => {
						const t = e("wc/store/cart").getShippingRates().flatMap((e => e.shipping_rates)).find((e => e.selected && (0, y.J3)(e)));
						if ((0, K.isObject)(t) && (0, K.objectHasProp)(t, "meta_data")) {
							const e = t.meta_data.find((e => "pickup_address" === e.key));
							if ((0, K.isObject)(e) && (0, K.objectHasProp)(e, "value") && e.value) return {
								pickupAddress: e.value
							}
						}
						return (0, K.isObject)(t), {
							pickupAddress: void 0
						}
					}));
					return void 0 === e ? null : (0, n.createElement)("span", {
						className: "wc-block-components-shipping-address"
					}, (0, s.sprintf)( /* translators: %s: shipping method name, e.g. "Amazon Locker" */ /* translators: %s: shipping method name, e.g. "Amazon Locker" */
						(0, s.__)("Collection from %s", "woocommerce"), e) + " ")
				},
				F = ({
					formattedLocation: e
				}) => e ? (0, n.createElement)("span", {
					className: "wc-block-components-shipping-address"
				}, (0, s.sprintf)( /* translators: %s location. */ /* translators: %s location. */
					(0, s.__)("Shipping to %s", "woocommerce"), e) + " ") : null,
				Z = ({
					showCalculator: e,
					isShippingCalculatorOpen: t,
					setIsShippingCalculatorOpen: o,
					shippingAddress: a
				}) => {
					const {
						isEditor: c
					} = (0, P._)(), r = (0, p.useSelect)((e => e(u.CHECKOUT_STORE_KEY).prefersCollection())), l = (0, _.getSetting)("activeShippingZones"), i = l.length > 1 && l.some((e => "Everywhere" === e.description || "Locations outside all other zones" === e.description)), d = !!(0, R.ET)(a);
					if (!d && !c && !i) return null;
					const m = d ? (0, s.__)("Change address", "woocommerce") : (0, s.__)("Calculate shipping for your location", "woocommerce"),
						g = (0, R.ET)(a);
					return (0, n.createElement)(n.Fragment, null, r ? (0, n.createElement)(M, null) : (0, n.createElement)(F, {
						formattedLocation: g
					}), e && (0, n.createElement)(D, {
						label: m,
						isShippingCalculatorOpen: t,
						setIsShippingCalculatorOpen: o
					}))
				};
			var j = o(4787),
				Y = o(5091);
			const U = ({
				hasRates: e,
				shippingRates: t,
				isLoadingRates: o,
				isAddressComplete: a
			}) => {
				const c = e ? (0, s.__)("Shipping options", "woocommerce") : (0, s.__)("Choose a shipping option", "woocommerce");
				return (0, n.createElement)("fieldset", {
					className: "wc-block-components-totals-shipping__fieldset"
				}, (0, n.createElement)("legend", {
					className: "screen-reader-text"
				}, c), (0, n.createElement)(Y.Z, {
					className: "wc-block-components-totals-shipping__options",
					noResultsMessage: (0, n.createElement)(n.Fragment, null, a && (0, n.createElement)(j.Z, {
						isDismissible: !1,
						className: "wc-block-components-shipping-rates-control__no-results-notice",
						status: "warning"
					}, (0, s.__)("There are no shipping options available. Please check your shipping address.", "woocommerce"))),
					shippingRates: t,
					isLoadingRates: o,
					context: "woocommerce/cart"
				}))
			};
			o(6968);
			const $ = ({
				currency: e,
				values: t,
				showCalculator: o = !0,
				showRateSelector: c = !0,
				isCheckout: r = !1,
				className: l
			}) => {
				const [d, g] = (0, a.useState)(!1), {
					shippingAddress: h,
					cartHasCalculatedShipping: _,
					shippingRates: E,
					isLoadingRates: b
				} = (0, v.b)(), k = (0, L.KR)(t), C = (0, L.CN)(E) || k > 0, w = o && d, S = (0, p.useSelect)((e => e(u.CHECKOUT_STORE_KEY).prefersCollection())), N = E.flatMap((e => e.shipping_rates.filter((e => S && (0, y.J3)(e) && e.selected || !S && e.selected)).flatMap((e => e.name)))), I = (0, R.K5)(h), O = (0, L.iG)(C, S, E);
				return (0, n.createElement)("div", {
					className: m()("wc-block-components-totals-shipping", l)
				}, (0, n.createElement)(i.TotalsItem, {
					label: (0, s.__)("Shipping", "woocommerce"),
					value: !O && _ ? k : (!I || r) && (0, n.createElement)(V, {
						showCalculator: o,
						isCheckout: r,
						isShippingCalculatorOpen: d,
						setIsShippingCalculatorOpen: g
					}),
					description: !O && _ || I && !r ? (0, n.createElement)(n.Fragment, null, (0, n.createElement)(f, {
						selectedShippingRates: N
					}), (0, n.createElement)(Z, {
						shippingAddress: h,
						showCalculator: o,
						isShippingCalculatorOpen: d,
						setIsShippingCalculatorOpen: g
					})) : null,
					currency: e
				}), w && (0, n.createElement)(x, {
					onUpdate: () => {
						g(!1)
					},
					onCancel: () => {
						g(!1)
					}
				}), c && _ && !w && (0, n.createElement)(U, {
					hasRates: C,
					shippingRates: E,
					isLoadingRates: b,
					isAddressComplete: I
				}))
			}
		},
		7731: (e, t, o) => {
			"use strict";
			o.d(t, {
				CN: () => a,
				KR: () => c,
				iG: () => r
			});
			var n = o(4617),
				s = o(7865);
			const a = e => e.some((e => e.shipping_rates.length)),
				c = e => (0, n.getSetting)("displayCartPricesIncludingTax", !1) ? parseInt(e.total_shipping, 10) + parseInt(e.total_shipping_tax, 10) : parseInt(e.total_shipping, 10),
				r = (e, t, o) => !e || !t && o.some((e => !e.shipping_rates.some((e => !(0, s.Ep)(e.method_id)))))
		},
		4787: (e, t, o) => {
			"use strict";
			o.d(t, {
				Z: () => d
			});
			var n = o(9196),
				s = o(7608),
				a = o.n(s),
				c = o(5736),
				r = o(2911),
				l = o(9140),
				i = (o(946), o(9114)),
				p = o(2904),
				u = o(2010);
			const d = ({
				className: e,
				status: t = "default",
				children: o,
				spokenMessage: s = o,
				onRemove: d = (() => {}),
				isDismissible: m = !0,
				politeness: g = (0, i.x)(t),
				summary: h
			}) => ((0, u.o)(s, g), (0, n.createElement)("div", {
				className: a()(e, "wc-block-components-notice-banner", "is-" + t, {
					"is-dismissible": m
				})
			}, (0, n.createElement)(r.Z, {
				icon: (0, i.X)(t)
			}), (0, n.createElement)("div", {
				className: "wc-block-components-notice-banner__content"
			}, h && (0, n.createElement)("p", {
				className: "wc-block-components-notice-banner__summary"
			}, h), o), !!m && (0, n.createElement)(p.Z, {
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
				s = o(2720),
				a = o(1242);
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
							return s.Z;
						default:
							return a.Z
					}
				}
		},
		9095: (e, t, o) => {
			"use strict";
			o.d(t, {
				K: () => i
			});
			var n = o(5736),
				s = o(9818),
				a = o(4801),
				c = o(2629),
				r = o(3554),
				l = o(9659);
			const i = (e = "") => {
				const {
					cartCoupons: t,
					cartIsLoading: o
				} = (0, l.b)(), {
					createErrorNotice: i
				} = (0, s.useDispatch)("core/notices"), {
					createNotice: p
				} = (0, s.useDispatch)("core/notices"), {
					setValidationErrors: u
				} = (0, s.useDispatch)(a.VALIDATION_STORE_KEY), {
					isApplyingCoupon: d,
					isRemovingCoupon: m
				} = (0, s.useSelect)((e => {
					const t = e(a.CART_STORE_KEY);
					return {
						isApplyingCoupon: t.isApplyingCoupon(),
						isRemovingCoupon: t.isRemovingCoupon()
					}
				}), [i, p]), {
					applyCoupon: g,
					removeCoupon: h
				} = (0, s.useDispatch)(a.CART_STORE_KEY), _ = (0, s.useSelect)((e => e(a.CHECKOUT_STORE_KEY).getOrderId()));
				return {
					appliedCoupons: t,
					isLoading: o,
					applyCoupon: t => g(t).then((() => ((0, r.applyCheckoutFilter)({
						filterName: "showApplyCouponNotice",
						defaultValue: !0,
						arg: {
							couponCode: t,
							context: e
						}
					}) && p("info", (0, n.sprintf)( /* translators: %s coupon code. */ /* translators: %s coupon code. */
						(0, n.__)('Coupon code "%s" has been applied to your cart.', "woocommerce"), t), {
						id: "coupon-form",
						type: "snackbar",
						context: e
					}), Promise.resolve(!0)))).catch((e => {
						const t = (e => {
							var t, o, n, s;
							return _ && _ > 0 && null != e && null !== (t = e.data) && void 0 !== t && null !== (o = t.details) && void 0 !== o && o.checkout ? e.data.details.checkout : null != e && null !== (n = e.data) && void 0 !== n && null !== (s = n.details) && void 0 !== s && s.cart ? e.data.details.cart : e.message
						})(e);
						return u({
							coupon: {
								message: (0, c.decodeEntities)(t),
								hidden: !1
							}
						}), Promise.resolve(!1)
					})),
					removeCoupon: t => h(t).then((() => ((0, r.applyCheckoutFilter)({
						filterName: "showRemoveCouponNotice",
						defaultValue: !0,
						arg: {
							couponCode: t,
							context: e
						}
					}) && p("info", (0, n.sprintf)( /* translators: %s coupon code. */ /* translators: %s coupon code. */
						(0, n.__)('Coupon code "%s" has been removed from your cart.', "woocommerce"), t), {
						id: "coupon-form",
						type: "snackbar",
						context: e
					}), Promise.resolve(!0)))).catch((t => (i(t.message, {
						id: "coupon-form",
						context: e
					}), Promise.resolve(!1)))),
					isApplyingCoupon: d,
					isRemovingCoupon: m
				}
			}
		},
		8540: (e, t, o) => {
			"use strict";
			o.d(t, {
				L: () => a
			});
			var n = o(9818),
				s = o(4801);
			const a = () => {
				const {
					customerData: e,
					isInitialized: t
				} = (0, n.useSelect)((e => {
					const t = e(s.CART_STORE_KEY);
					return {
						customerData: t.getCustomerData(),
						isInitialized: t.hasFinishedResolution("getCartData")
					}
				})), {
					setShippingAddress: o,
					setBillingAddress: a
				} = (0, n.useDispatch)(s.CART_STORE_KEY);
				return {
					isInitialized: t,
					billingAddress: e.billingAddress,
					shippingAddress: e.shippingAddress,
					setBillingAddress: a,
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
				s = o(9127),
				a = o.n(s);

			function c(e) {
				const t = (0, n.useRef)(e);
				return a()(e, t.current) || (t.current = e), t.current
			}
		},
		2010: (e, t, o) => {
			"use strict";
			o.d(t, {
				o: () => a
			});
			var n = o(9307),
				s = o(5158);
			const a = (e, t) => {
				const o = "string" == typeof e ? e : (0, n.renderToString)(e);
				(0, n.useEffect)((() => {
					o && (0, s.speak)(o, t)
				}), [o, t])
			}
		},
		6594: (e, t, o) => {
			"use strict";
			o.r(t), o.d(t, {
				default: () => l
			});
			var n = o(9196),
				s = o(7184),
				a = o(9095),
				c = o(4617),
				r = o(711);
			const l = ({
				className: e
			}) => {
				const t = (0, c.getSetting)("couponsEnabled", !0),
					{
						applyCoupon: o,
						isApplyingCoupon: l
					} = (0, a.K)("wc/cart");
				return t ? (0, n.createElement)(r.TotalsWrapper, {
					className: e
				}, (0, n.createElement)(s.RK, {
					onSubmit: o,
					isLoading: l
				})) : null
			}
		},
		2595: (e, t, o) => {
			"use strict";
			o.d(t, {
				Z: () => s
			});
			var n = o(9196);
			o(7440);
			const s = () => (0, n.createElement)("span", {
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
		946: () => {},
		6115: () => {},
		7440: () => {}
	}
]);