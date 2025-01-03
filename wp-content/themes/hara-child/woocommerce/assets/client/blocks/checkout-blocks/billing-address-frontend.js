(self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || []).push([
	[9662], {
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
				g = s(4801);
			s(2750);
			const h = ({
				id: e,
				className: t,
				label: s,
				onChange: n,
				options: l,
				value: c,
				required: h = !1,
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
						clearValidationError: A
					} = (0, m.useDispatch)(g.VALIDATION_STORE_KEY),
					{
						error: S,
						validationErrorId: w
					} = (0, m.useSelect)((e => {
						const t = e(g.VALIDATION_STORE_KEY);
						return {
							error: t.getValidationError(v),
							validationErrorId: t.getValidationErrorId(v)
						}
					}));
				return (0, a.useEffect)((() => (!h || c ? A(v) : k({
					[v]: {
						message: b,
						hidden: !0
					}
				}), () => {
					A(v)
				})), [A, c, v, b, h, k]), (0, r.createElement)("div", {
					id: C,
					className: d()("wc-block-components-combobox", t, {
						"is-active": c,
						"has-error": (null == S ? void 0 : S.message) && !(null != S && S.hidden)
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
					"aria-invalid": (null == S ? void 0 : S.message) && !(null != S && S.hidden),
					"aria-errormessage": w
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
				errorMessage: g = (0, i.__)("Please select a country", "woocommerce")
			}) => {
				const E = (0, a.useMemo)((() => Object.entries(t).map((([e, t]) => ({
					value: e,
					label: (0, l.decodeEntities)(t)
				})))), [t]);
				return (0, r.createElement)("div", {
					className: d()(e, "wc-block-components-country-input")
				}, (0, r.createElement)(h, {
					id: s,
					label: n,
					onChange: o,
					options: E,
					value: c,
					errorId: m,
					errorMessage: g,
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
					required: g = !1,
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
					}), [b, y]), b.length > 0 ? (0, r.createElement)(h, {
						className: d()(e, "wc-block-components-state-input"),
						id: t,
						label: c,
						onChange: y,
						options: b,
						value: m,
						errorMessage: (0, i.__)("Please select a state.", "woocommerce"),
						errorId: E,
						required: g,
						autoComplete: p
					}) : (0, r.createElement)(o.ValidatedTextInput, {
						className: e,
						id: t,
						label: c,
						onChange: y,
						autoComplete: p,
						value: m,
						required: g
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
			var A = s(4333),
				S = s(9530),
				w = s(9127),
				T = s.n(w),
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
					const f = (0, A.useInstanceId)(O),
						_ = (0, S.s)(t),
						C = (0, S.s)(s),
						w = (0, S.s)((0, p.objectHasProp)(u, "country") ? u.country : ""),
						F = (0, a.useMemo)((() => {
							const e = (0, N.Z)(_, C, w);
							return {
								fields: e,
								addressType: c,
								required: e.filter((e => e.required)),
								hidden: e.filter((e => e.hidden))
							}
						}), [_, C, w, c]),
						B = (0, a.useRef)({});
					return (0, a.useEffect)((() => {
						const e = {
							...u,
							...Object.fromEntries(F.hidden.map((e => [e.key, ""])))
						};
						T()(u, e) || l(e)
					}), [l, F, u]), (0, a.useEffect)((() => {
						"shipping" === c && (0, p.objectHasProp)(u, "country") && (e => {
							const t = "shipping_country",
								s = (0, m.select)(g.VALIDATION_STORE_KEY).getValidationError(t);
							!e.country && (e.city || e.state || e.postcode) && (s ? (0, m.dispatch)(g.VALIDATION_STORE_KEY).showValidationError(t) : (0, m.dispatch)(g.VALIDATION_STORE_KEY).setValidationErrors({
								[t]: {
									message: (0, i.__)("Please select your country", "woocommerce"),
									hidden: !1
								}
							})), s && e.country && (0, m.dispatch)(g.VALIDATION_STORE_KEY).clearValidationError(t)
						})(u)
					}), [u, c]), (0, a.useEffect)((() => {
						var e, t;
						null === (e = B.current) || void 0 === e || null === (t = e.postcode) || void 0 === t || t.revalidate()
					}), [w]), e = e || `${f}`, (0, r.createElement)("div", {
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
						return "select" === t.type ? void 0 === t.options ? null : (0, r.createElement)(h, {
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
							ref: e => B.current[t.key] = e,
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
				} = (0, i.L)(), g = (0, n.useCallback)((e => {
					u({
						email: e
					})
				}), [u]), h = (0, r.getSetting)("forcedBillingAddress", !1);
				return {
					shippingAddress: p,
					billingAddress: d,
					setShippingAddress: m,
					setBillingAddress: u,
					setEmail: g,
					defaultFields: r.defaultFields,
					useShippingAsBilling: t,
					setUseShippingAsBilling: c,
					needsShipping: e,
					showShippingFields: !h && e && !s,
					showShippingMethods: e && !s,
					showBillingFields: !e || !t || !!s,
					forcedBillingAddress: h,
					useBillingAsShipping: h || !!s
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
		1607: (e, t, s) => {
			"use strict";
			s.r(t), s.d(t, {
				default: () => R
			});
			var r = s(9196),
				n = s(7608),
				o = s.n(n),
				a = s(721),
				i = s(711),
				l = s(2723),
				c = s(9818),
				d = s(4801),
				u = s(9307),
				p = s(1638),
				m = s(8449),
				g = s(8027),
				h = s(5078),
				E = s(9127),
				f = s.n(E),
				b = s(9366),
				y = s(8360),
				_ = s(8752),
				C = s(9481),
				v = s(2617);
			const k = ({
					addressFieldsConfig: e,
					defaultEditing: t = !1
				}) => {
					const {
						billingAddress: s,
						setShippingAddress: n,
						setBillingAddress: o,
						useBillingAsShipping: a
					} = (0, l.B)(), {
						dispatchCheckoutEvent: i
					} = (0, y.n)(), [p, m] = (0, u.useState)(t), {
						hasValidationErrors: g,
						invalidProps: h
					} = (0, c.useSelect)((e => {
						const t = e(d.VALIDATION_STORE_KEY);
						return {
							hasValidationErrors: t.hasValidationErrors(),
							invalidProps: Object.keys(s).filter((e => "email" !== e && void 0 !== t.getValidationError("billing_" + e))).filter(Boolean)
						}
					}));
					(0, u.useEffect)((() => {
						h.length > 0 && !1 === p && m(!0)
					}), [p, g, h.length]);
					const E = (0, u.useCallback)((e => {
							o(e), a && (n(e), i("set-shipping-address")), i("set-billing-address")
						}), [i, o, n, a]),
						f = (0, u.useCallback)((() => (0, r.createElement)(v.Z, {
							address: s,
							target: "billing",
							onEdit: () => {
								m(!0)
							},
							fieldConfig: e
						})), [s, e]),
						k = (0, u.useCallback)((() => (0, r.createElement)(r.Fragment, null, (0, r.createElement)(b.l, {
							id: "billing",
							addressType: "billing",
							onChange: E,
							values: s,
							fields: _.Ju,
							fieldConfig: e
						}))), [e, s, E]);
					return (0, r.createElement)(C.Z, {
						isEditing: p,
						addressCard: f,
						addressForm: k
					})
				},
				A = ({
					showCompanyField: e = !1,
					showApartmentField: t = !1,
					showPhoneField: s = !1,
					requireCompanyField: n = !1,
					requirePhoneField: o = !1
				}) => {
					const {
						shippingAddress: a,
						billingAddress: E,
						setShippingAddress: b,
						useBillingAsShipping: y
					} = (0, l.B)(), {
						isEditor: _
					} = (0, m._)();
					(0, p.qR)((() => {
						if (y) {
							const {
								email: t,
								...r
							} = E, n = {
								...r
							};
							s || delete n.phone, e && delete n.company, b(n)
						}
					}));
					const C = (0, u.useMemo)((() => ({
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
						v = _ ? h.Z : u.Fragment,
						A = y ? [g.n7.BILLING_ADDRESS, g.n7.SHIPPING_ADDRESS] : [g.n7.BILLING_ADDRESS],
						{
							cartDataLoaded: S
						} = (0, c.useSelect)((e => ({
							cartDataLoaded: e(d.CART_STORE_KEY).hasFinishedResolution("getCartData")
						}))),
						w = !(!E.address_1 || !E.first_name && !E.last_name),
						{
							email: T,
							...N
						} = E,
						I = f()(N, a),
						O = _ || !w || I;
					return (0, r.createElement)(u.Fragment, null, (0, r.createElement)(i.StoreNoticesContainer, {
						context: A
					}), (0, r.createElement)(v, null, S ? (0, r.createElement)(k, {
						addressFieldsConfig: C,
						defaultEditing: O
					}) : null))
				};
			var S = s(1070),
				w = s(5736);
			const T = (0, w.__)(" عنوان وصول الفواتير  ", "woocommerce"),
				N = (0, w.__)(" أدخل عنوان إرسال الفواتير الذي يتوافق مع طريقة الدفع الخاصة بك . ", "woocommerce"),
				I = (0, w.__)("عنوان الشحن البحري و دائرة الفواتير   ", "woocommerce"),
				O = (0, w.__)(" أدخل عنوان إرسال الفواتير والشحن الذي يتوافق مع طريقة الدفع الخاصة بك.  ", "woocommerce"),
				F = {
					...(0, S.Z)({
						defaultTitle: T,
						defaultDescription: N
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
			var B = s(7151);
			const R = (0, a.withFilteredAttributes)(F)((({
				title: e,
				description: t,
				showStepNumber: s,
				children: n,
				className: a
			}) => {
				const u = (0, c.useSelect)((e => e(d.CHECKOUT_STORE_KEY).isProcessing())),
					{
						requireCompanyField: p,
						requirePhoneField: m,
						showApartmentField: g,
						showCompanyField: h,
						showPhoneField: E
					} = (0, B.s4)(),
					{
						showBillingFields: f,
						forcedBillingAddress: b,
						useBillingAsShipping: y
					} = (0, l.B)();
				return f || y ? (e = ((e, t) => t ? e === T ? I : e : e === I ? T : e)(e, b), t = ((e, t) => t ? e === N ? O : e : e === O ? N : e)(t, b), (0, r.createElement)(i.FormStep, {
					id: "billing-fields",
					disabled: u,
					className: o()("wc-block-checkout__billing-fields", a),
					title: e,
					description: t,
					showStepNumber: s
				}, (0, r.createElement)(A, {
					requireCompanyField: p,
					showApartmentField: g,
					showCompanyField: h,
					showPhoneField: E,
					requirePhoneField: m
				}), n)) : null
			}))
		},
		2750: () => {},
		7368: () => {},
		6115: () => {},
		3658: () => {},
		2262: () => {}
	}
]);