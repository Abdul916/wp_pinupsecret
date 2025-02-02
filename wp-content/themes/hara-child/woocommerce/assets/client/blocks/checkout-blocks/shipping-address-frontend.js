(self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || []).push([
	[826], {
		9366: (e, t, s) => {
			"use strict";
			s.d(t, {
				l: () => F
			});
			var r = s(9196),
				n = s(3554),
				o = s(711),
				a = s(9307),
				i = s(5736),
				l = s(2629),
				c = s(7608),
				d = s.n(c),
				u = s(3133),
				p = s(6946),
				m = s(9818),
				h = s(4801);
			s(2750);
			const g = ({
				id: e,
				className: t,
				label: s,
				onChange: n,
				options: l,
				value: c,
				required: g = !1,
				errorId: E,
				autoComplete: f = "off",
				errorMessage: b = (0, i.__)("Please select a valid option", "woocommerce")
			}) => {
				const y = (0, a.useRef)(null),
					_ = (0, a.useId)(),
					C = e || "control-" + _,
					v = E || C,
					{
						setValidationErrors: k,
						clearValidationError: S
					} = (0, m.useDispatch)(h.VALIDATION_STORE_KEY),
					{
						error: w,
						validationErrorId: A
					} = (0, m.useSelect)((e => {
						const t = e(h.VALIDATION_STORE_KEY);
						return {
							error: t.getValidationError(v),
							validationErrorId: t.getValidationErrorId(v)
						}
					}));
				return (0, a.useEffect)((() => (!g || c ? S(v) : k({
					[v]: {
						message: b,
						hidden: !0
					}
				}), () => {
					S(v)
				})), [S, c, v, b, g, k]), (0, r.createElement)("div", {
					id: C,
					className: d()("wc-block-components-combobox", t, {
						"is-active": c,
						"has-error": (null == w ? void 0 : w.message) && !(null != w && w.hidden)
					}),
					ref: y
				}, (0, r.createElement)(u.Z, {
					className: "wc-block-components-combobox-control",
					label: s,
					onChange: n,
					onFilterValueChange: e => {
						if (e.length) {
							const t = (0, p.isObject)(y.current) ? y.current.ownerDocument.activeElement : void 0;
							if (t && (0, p.isObject)(y.current) && y.current.contains(t)) return;
							const s = e.toLocaleUpperCase(),
								r = l.find((e => e.value.toLocaleUpperCase() === s));
							if (r) return void n(r.value);
							const o = l.find((e => e.label.toLocaleUpperCase().startsWith(s)));
							o && n(o.value)
						}
					},
					options: l,
					value: c || "",
					allowReset: !1,
					autoComplete: f,
					"aria-invalid": (null == w ? void 0 : w.message) && !(null != w && w.hidden),
					"aria-errormessage": A
				}), (0, r.createElement)(o.ValidationInputError, {
					propertyName: v
				}))
			};
			s(7368);
			const E = ({
				className: e,
				countries: t,
				id: s,
				label: n,
				onChange: o,
				value: c = "",
				autoComplete: u = "off",
				required: p = !1,
				errorId: m,
				errorMessage: h = (0, i.__)("Please select a country", "woocommerce")
			}) => {
				const E = (0, a.useMemo)((() => Object.entries(t).map((([e, t]) => ({
					value: e,
					label: (0, l.decodeEntities)(t)
				})))), [t]);
				return (0, r.createElement)("div", {
					className: d()(e, "wc-block-components-country-input")
				}, (0, r.createElement)(g, {
					id: s,
					label: n,
					onChange: o,
					options: E,
					value: c,
					errorId: m,
					errorMessage: h,
					required: p,
					autoComplete: u
				}))
			};
			var f = s(8752);
			const b = e => (0, r.createElement)(E, {
					countries: f.DK,
					...e
				}),
				y = e => (0, r.createElement)(E, {
					countries: f.mO,
					...e
				});
			s(6115);
			const _ = (e, t) => {
					const s = t.find((t => t.label.toLocaleUpperCase() === e.toLocaleUpperCase() || t.value.toLocaleUpperCase() === e.toLocaleUpperCase()));
					return s ? s.value : ""
				},
				C = ({
					className: e,
					id: t,
					states: s,
					country: n,
					label: c,
					onChange: u,
					autoComplete: p = "off",
					value: m = "",
					required: h = !1,
					errorId: E = ""
				}) => {
					const f = s[n],
						b = (0, a.useMemo)((() => f ? Object.keys(f).map((e => ({
							value: e,
							label: (0, l.decodeEntities)(f[e])
						}))) : []), [f]),
						y = (0, a.useCallback)((e => {
							const t = b.length > 0 ? _(e, b) : e;
							t !== m && u(t)
						}), [u, b, m]),
						C = (0, a.useRef)(m);
					return (0, a.useEffect)((() => {
						C.current !== m && (C.current = m)
					}), [m]), (0, a.useEffect)((() => {
						if (b.length > 0 && C.current) {
							const e = _(C.current, b);
							e !== C.current && y(e)
						}
					}), [b, y]), b.length > 0 ? (0, r.createElement)(g, {
						className: d()(e, "wc-block-components-state-input"),
						id: t,
						label: c,
						onChange: y,
						options: b,
						value: m,
						errorMessage: (0, i.__)("Please select a state.", "woocommerce"),
						errorId: E,
						required: h,
						autoComplete: p
					}) : (0, r.createElement)(o.ValidatedTextInput, {
						className: e,
						id: t,
						label: c,
						onChange: y,
						autoComplete: p,
						value: m,
						required: h
					})
				},
				v = e => (0, r.createElement)(C, {
					states: f.JJ,
					...e
				}),
				k = e => (0, r.createElement)(C, {
					states: f.nm,
					...e
				});
			var S = s(4333),
				w = s(9530),
				A = s(9127),
				T = s.n(A),
				N = s(5969);
			var I = s(6483);
			const O = ({
					id: e = "",
					fields: t,
					fieldConfig: s = {},
					onChange: l,
					addressType: c = "shipping",
					values: u,
					children: E
				}) => {
					const f = (0, S.useInstanceId)(O),
						_ = (0, w.s)(t),
						C = (0, w.s)(s),
						A = (0, w.s)((0, p.objectHasProp)(u, "country") ? u.country : ""),
						F = (0, a.useMemo)((() => {
							const e = (0, N.Z)(_, C, A);
							return {
								fields: e,
								addressType: c,
								required: e.filter((e => e.required)),
								hidden: e.filter((e => e.hidden))
							}
						}), [_, C, A, c]),
						P = (0, a.useRef)({});
					return (0, a.useEffect)((() => {
						const e = {
							...u,
							...Object.fromEntries(F.hidden.map((e => [e.key, ""])))
						};
						T()(u, e) || l(e)
					}), [l, F, u]), (0, a.useEffect)((() => {
						"shipping" === c && (0, p.objectHasProp)(u, "country") && (e => {
							const t = "shipping_country",
								s = (0, m.select)(h.VALIDATION_STORE_KEY).getValidationError(t);
							!e.country && (e.city || e.state || e.postcode) && (s ? (0, m.dispatch)(h.VALIDATION_STORE_KEY).showValidationError(t) : (0, m.dispatch)(h.VALIDATION_STORE_KEY).setValidationErrors({
								[t]: {
									message: (0, i.__)("Please select your country", "woocommerce"),
									hidden: !1
								}
							})), s && e.country && (0, m.dispatch)(h.VALIDATION_STORE_KEY).clearValidationError(t)
						})(u)
					}), [u, c]), (0, a.useEffect)((() => {
						var e, t;
						null === (e = P.current) || void 0 === e || null === (t = e.postcode) || void 0 === t || t.revalidate()
					}), [A]), e = e || `${f}`, (0, r.createElement)("div", {
						id: e,
						className: "wc-block-components-address-form"
					}, F.fields.map((t => {
						if (t.hidden) return null;
						const s = {
							id: `${e}-${t.key}`,
							errorId: `${c}_${t.key}`,
							label: t.required ? t.label : t.optionalLabel,
							autoCapitalize: t.autocapitalize,
							autoComplete: t.autocomplete,
							errorMessage: t.errorMessage,
							required: t.required,
							className: `wc-block-components-address-form__${t.key}`,
							...t.attributes
						};
						if ("email" === t.key && (s.id = "email", s.errorId = "billing_email"), "checkbox" === t.type) return (0, r.createElement)(o.CheckboxControl, {
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
							...s
						});
						if ("country" === t.key && (0, p.objectHasProp)(u, "country")) {
							const e = "shipping" === c ? y : b;
							return (0, r.createElement)(e, {
								key: t.key,
								...s,
								value: u.country,
								onChange: e => {
									const t = {
										...u,
										country: e,
										state: ""
									};
									u.postcode && !(0, n.isPostcode)({
										postcode: u.postcode,
										country: e
									}) && (t.postcode = ""), l(t)
								}
							})
						}
						if ("state" === t.key && (0, p.objectHasProp)(u, "state")) {
							const e = "shipping" === c ? k : v;
							return (0, r.createElement)(e, {
								key: t.key,
								...s,
								country: u.country,
								value: u.state,
								onChange: e => l({
									...u,
									state: e
								})
							})
						}
						return "select" === t.type ? void 0 === t.options ? null : (0, r.createElement)(g, {
							key: t.key,
							...s,
							className: d()("wc-block-components-select-input", `wc-block-components-select-input-${t.key}`),
							value: u[t.key],
							onChange: e => {
								l({
									...u,
									[t.key]: e
								})
							},
							options: t.options
						}) : (0, r.createElement)(o.ValidatedTextInput, {
							key: t.key,
							ref: e => P.current[t.key] = e,
							...s,
							type: t.type,
							value: u[t.key],
							onChange: e => l({
								...u,
								[t.key]: e
							}),
							customFormatter: e => "postcode" === t.key ? e.trimStart().toUpperCase() : e,
							customValidation: e => ((e, t, s) => !((e.required || e.value) && ("postcode" === t && s && !(0, n.isPostcode)({
								postcode: e.value,
								country: s
							}) ? (e.setCustomValidity((0, i.__)("Please enter a valid postcode", "woocommerce")), 1) : "email" === t && !(0, I.isEmail)(e.value) && (e.setCustomValidity((0, i.__)("Please enter a valid email address", "woocommerce")), 1))))(e, t.key, (0, p.objectHasProp)(u, "country") ? u.country : "")
						})
					})), E)
				},
				F = O
		},
		5078: (e, t, s) => {
			"use strict";
			s.d(t, {
				Z: () => l
			});
			var r = s(9196),
				n = s(9307),
				o = s(5904),
				a = s(2600);
			const i = ["BUTTON", "FIELDSET", "INPUT", "OPTGROUP", "OPTION", "SELECT", "TEXTAREA", "A"],
				l = ({
					children: e,
					style: t = {},
					...s
				}) => {
					const l = (0, n.useRef)(null),
						c = () => {
							l.current && o.focus.focusable.find(l.current).forEach((e => {
								i.includes(e.nodeName) && e.setAttribute("tabindex", "-1"), e.hasAttribute("contenteditable") && e.setAttribute("contenteditable", "false")
							}))
						},
						d = (0, a.y1)(c, 0, {
							leading: !0
						});
					return (0, n.useLayoutEffect)((() => {
						let e;
						return c(), l.current && (e = new window.MutationObserver(d), e.observe(l.current, {
							childList: !0,
							attributes: !0,
							subtree: !0
						})), () => {
							e && e.disconnect(), d.cancel()
						}
					}), [d]), (0, r.createElement)("div", {
						ref: l,
						"aria-disabled": "true",
						style: {
							userSelect: "none",
							pointerEvents: "none",
							cursor: "normal",
							...t
						},
						...s
					}, e)
				}
		},
		2723: (e, t, s) => {
			"use strict";
			s.d(t, {
				B: () => c
			});
			var r = s(4617),
				n = s(9307),
				o = s(9818),
				a = s(4801),
				i = s(8540),
				l = s(3251);
			const c = () => {
				const {
					needsShipping: e
				} = (0, l.V)(), {
					useShippingAsBilling: t,
					prefersCollection: s
				} = (0, o.useSelect)((e => ({
					useShippingAsBilling: e(a.CHECKOUT_STORE_KEY).getUseShippingAsBilling(),
					prefersCollection: e(a.CHECKOUT_STORE_KEY).prefersCollection()
				}))), {
					__internalSetUseShippingAsBilling: c
				} = (0, o.useDispatch)(a.CHECKOUT_STORE_KEY), {
					billingAddress: d,
					setBillingAddress: u,
					shippingAddress: p,
					setShippingAddress: m
				} = (0, i.L)(), h = (0, n.useCallback)((e => {
					u({
						email: e
					})
				}), [u]), g = (0, r.getSetting)("forcedBillingAddress", !1);
				return {
					shippingAddress: p,
					billingAddress: d,
					setShippingAddress: m,
					setBillingAddress: u,
					setEmail: h,
					defaultFields: r.defaultFields,
					useShippingAsBilling: t,
					setUseShippingAsBilling: c,
					needsShipping: e,
					showShippingFields: !g && e && !s,
					showShippingMethods: e && !s,
					showBillingFields: !e || !t || !!s,
					forcedBillingAddress: g,
					useBillingAsShipping: g || !!s
				}
			}
		},
		8540: (e, t, s) => {
			"use strict";
			s.d(t, {
				L: () => o
			});
			var r = s(9818),
				n = s(4801);
			const o = () => {
				const {
					customerData: e,
					isInitialized: t
				} = (0, r.useSelect)((e => {
					const t = e(n.CART_STORE_KEY);
					return {
						customerData: t.getCustomerData(),
						isInitialized: t.hasFinishedResolution("getCartData")
					}
				})), {
					setShippingAddress: s,
					setBillingAddress: o
				} = (0, r.useDispatch)(n.CART_STORE_KEY);
				return {
					isInitialized: t,
					billingAddress: e.billingAddress,
					shippingAddress: e.shippingAddress,
					setBillingAddress: o,
					setShippingAddress: s
				}
			}
		},
		9530: (e, t, s) => {
			"use strict";
			s.d(t, {
				s: () => a
			});
			var r = s(9307),
				n = s(9127),
				o = s.n(n);

			function a(e) {
				const t = (0, r.useRef)(e);
				return o()(e, t.current) || (t.current = e), t.current
			}
		},
		2617: (e, t, s) => {
			"use strict";
			s.d(t, {
				Z: () => l
			});
			var r = s(9196),
				n = s(5736),
				o = s(6946),
				a = s(4617),
				i = s(2104);
			s(3658);
			const l = ({
				address: e,
				onEdit: t,
				target: s,
				fieldConfig: l
			}) => {
				const c = (0, a.getSetting)("countryData", {});
				let d = (0, a.getSetting)("defaultAddressFormat", "{name}\n{company}\n{address_1}\n{address_2}\n{city}\n{state}\n{postcode}\n{country}");
				(0, o.objectHasProp)(c, null == e ? void 0 : e.country) && (0, o.objectHasProp)(c[e.country], "format") && (0, o.isString)(c[e.country].format) && (d = c[e.country].format);
				const {
					name: u,
					address: p
				} = (0, i.Tg)(e, d);
				return (0, r.createElement)("div", {
					className: "wc-block-components-address-card"
				}, (0, r.createElement)("address", null, (0, r.createElement)("span", {
					className: "wc-block-components-address-card__address-section"
				}, u), (0, r.createElement)("div", {
					className: "wc-block-components-address-card__address-section"
				}, p.filter((e => !!e)).map(((e, t) => (0, r.createElement)("span", {
					key: "address-" + t
				}, e)))), e.phone && !l.phone.hidden ? (0, r.createElement)("div", {
					key: "address-phone",
					className: "wc-block-components-address-card__address-section"
				}, e.phone) : ""), t && (0, r.createElement)("a", {
					role: "button",
					href: "#" + s,
					className: "wc-block-components-address-card__edit",
					"aria-label": (0, n.__)("Edit address", "woocommerce"),
					onClick: e => {
						t(), e.preventDefault()
					}
				}, (0, n.__)("Edit", "woocommerce")))
			}
		},
		9481: (e, t, s) => {
			"use strict";
			s.d(t, {
				Z: () => a
			});
			var r = s(9196),
				n = s(7608),
				o = s.n(n);
			s(2262);
			const a = ({
				isEditing: e = !1,
				addressCard: t,
				addressForm: s
			}) => {
				const n = o()("wc-block-components-address-address-wrapper", {
					"is-editing": e
				});
				return (0, r.createElement)("div", {
					className: n
				}, (0, r.createElement)("div", {
					className: "wc-block-components-address-card-wrapper"
				}, t()), (0, r.createElement)("div", {
					className: "wc-block-components-address-form-wrapper"
				}, s()))
			}
		},
		1070: (e, t, s) => {
			"use strict";
			s.d(t, {
				Z: () => n
			});
			var r = s(5736);
			const n = ({
				defaultTitle: e = (0, r.__)("Step", "woocommerce"),
				defaultDescription: t = (0, r.__)("Step description text.", "woocommerce"),
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
		2415: (e, t, s) => {
			"use strict";
			s.r(t), s.d(t, {
				default: () => N
			});
			var r = s(9196),
				n = s(7608),
				o = s.n(n),
				a = s(721),
				i = s(711),
				l = s(2723),
				c = s(9818),
				d = s(4801),
				u = s(5736),
				p = s(9307),
				m = s(1638),
				h = s(8449),
				g = s(8027),
				E = s(5078),
				f = s(4617),
				b = s(9040),
				y = s(9366),
				_ = s(8360),
				C = s(8752),
				v = s(9481),
				k = s(2617);
			const S = ({
					addressFieldsConfig: e,
					defaultEditing: t = !1
				}) => {
					const {
						shippingAddress: s,
						setShippingAddress: n,
						setBillingAddress: o,
						useShippingAsBilling: a
					} = (0, l.B)(), {
						dispatchCheckoutEvent: i
					} = (0, _.n)(), [u, m] = (0, p.useState)(t), {
						hasValidationErrors: h,
						invalidProps: g
					} = (0, c.useSelect)((e => {
						const t = e(d.VALIDATION_STORE_KEY);
						return {
							hasValidationErrors: t.hasValidationErrors(),
							invalidProps: Object.keys(s).filter((e => void 0 !== t.getValidationError("shipping_" + e))).filter(Boolean)
						}
					}));
					(0, p.useEffect)((() => {
						g.length > 0 && !1 === u && m(!0)
					}), [u, h, g.length]);
					const E = (0, p.useCallback)((e => {
							n(e), a && (o(e), i("set-billing-address")), i("set-shipping-address")
						}), [i, o, n, a]),
						f = (0, p.useCallback)((() => (0, r.createElement)(k.Z, {
							address: s,
							target: "shipping",
							onEdit: () => {
								m(!0)
							},
							fieldConfig: e
						})), [s, e]),
						b = (0, p.useCallback)((() => (0, r.createElement)(y.l, {
							id: "shipping",
							addressType: "shipping",
							onChange: E,
							values: s,
							fields: C.Ju,
							fieldConfig: e
						})), [e, E, s]);
					return (0, r.createElement)(v.Z, {
						isEditing: u,
						addressCard: f,
						addressForm: b
					})
				},
				w = ({
					showCompanyField: e = !1,
					showApartmentField: t = !1,
					showPhoneField: s = !1,
					requireCompanyField: n = !1,
					requirePhoneField: o = !1
				}) => {
					const {
						setBillingAddress: a,
						shippingAddress: y,
						billingAddress: _,
						useShippingAsBilling: C,
						setUseShippingAsBilling: v
					} = (0, l.B)(), {
						isEditor: k
					} = (0, h._)(), w = 0 === (0, f.getSetting)("currentUserId"), A = () => {
						const t = {
							...y
						};
						s || delete t.phone, e && delete t.company, a(t)
					};
					(0, m.qR)((() => {
						C && A()
					}));
					const T = (0, p.useMemo)((() => ({
							company: {
								hidden: !e,
								required: n
							},
							address_2: {
								hidden: !t
							},
							phone: {
								hidden: !s,
								required: o
							}
						})), [e, n, t, s, o]),
						N = k ? E.Z : p.Fragment,
						I = C ? [g.n7.SHIPPING_ADDRESS, g.n7.BILLING_ADDRESS] : [g.n7.SHIPPING_ADDRESS],
						O = !(!y.address_1 || !y.first_name && !y.last_name),
						{
							cartDataLoaded: F
						} = (0, c.useSelect)((e => ({
							cartDataLoaded: e(d.CART_STORE_KEY).hasFinishedResolution("getCartData")
						}))),
						P = k || !O;
					return (0, r.createElement)(p.Fragment, null, (0, r.createElement)(i.StoreNoticesContainer, {
						context: I
					}), (0, r.createElement)(N, null, F ? (0, r.createElement)(S, {
						addressFieldsConfig: T,
						defaultEditing: P
					}) : null), (0, r.createElement)(i.CheckboxControl, {
						className: "wc-block-checkout__use-address-for-billing",
						label: (0, u.__)("Use same address for billing", "woocommerce"),
						checked: C,
						onChange: e => {
							v(e), e ? A() : (e => {
								if (!e || !w) return;
								const t = (0, b.RD)(e);
								a(t)
							})(_)
						}
					}))
				},
				A = {
					...(0, s(1070).Z)({
						defaultTitle: (0, u.__)("Shipping address", "woocommerce"),
						defaultDescription: (0, u.__)("Enter the address where you want your order delivered.", "woocommerce")
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
				};
			var T = s(7151);
			const N = (0, a.withFilteredAttributes)(A)((({
				title: e,
				description: t,
				showStepNumber: s,
				children: n,
				className: a
			}) => {
				const u = (0, c.useSelect)((e => e(d.CHECKOUT_STORE_KEY).isProcessing())),
					{
						showShippingFields: p
					} = (0, l.B)(),
					{
						requireCompanyField: m,
						requirePhoneField: h,
						showApartmentField: g,
						showCompanyField: E,
						showPhoneField: f
					} = (0, T.s4)();
				return p ? (0, r.createElement)(i.FormStep, {
					id: "shipping-fields",
					disabled: u,
					className: o()("wc-block-checkout__shipping-fields", a),
					title: e,
					description: t,
					showStepNumber: s
				}, (0, r.createElement)(w, {
					requireCompanyField: m,
					requirePhoneField: h,
					showApartmentField: g,
					showCompanyField: E,
					showPhoneField: f
				}), n) : null
			}))
		},
		2750: () => {},
		7368: () => {},
		6115: () => {},
		3658: () => {},
		2262: () => {}
	}
]);