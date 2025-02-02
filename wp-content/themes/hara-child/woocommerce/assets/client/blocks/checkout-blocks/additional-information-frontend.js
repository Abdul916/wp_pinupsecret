(self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || []).push([
	[8819], {
		9366: (e, t, o) => {
			"use strict";
			o.d(t, {
				l: () => A
			});
			var r = o(9196),
				a = o(3554),
				n = o(711),
				s = o(9307),
				l = o(5736),
				c = o(2629),
				i = o(7608),
				d = o.n(i),
				u = o(3133),
				m = o(6946),
				p = o(9818),
				f = o(4801);
			o(2750);
			const y = ({
				id: e,
				className: t,
				label: o,
				onChange: a,
				options: c,
				value: i,
				required: y = !1,
				errorId: E,
				autoComplete: b = "off",
				errorMessage: h = (0, l.__)("Please select a valid option", "woocommerce")
			}) => {
				const k = (0, s.useRef)(null),
					v = (0, s.useId)(),
					g = e || "control-" + v,
					C = E || g,
					{
						setValidationErrors: _,
						clearValidationError: w
					} = (0, p.useDispatch)(f.VALIDATION_STORE_KEY),
					{
						error: I,
						validationErrorId: N
					} = (0, p.useSelect)((e => {
						const t = e(f.VALIDATION_STORE_KEY);
						return {
							error: t.getValidationError(C),
							validationErrorId: t.getValidationErrorId(C)
						}
					}));
				return (0, s.useEffect)((() => (!y || i ? w(C) : _({
					[C]: {
						message: h,
						hidden: !0
					}
				}), () => {
					w(C)
				})), [w, i, C, h, y, _]), (0, r.createElement)("div", {
					id: g,
					className: d()("wc-block-components-combobox", t, {
						"is-active": i,
						"has-error": (null == I ? void 0 : I.message) && !(null != I && I.hidden)
					}),
					ref: k
				}, (0, r.createElement)(u.Z, {
					className: "wc-block-components-combobox-control",
					label: o,
					onChange: a,
					onFilterValueChange: e => {
						if (e.length) {
							const t = (0, m.isObject)(k.current) ? k.current.ownerDocument.activeElement : void 0;
							if (t && (0, m.isObject)(k.current) && k.current.contains(t)) return;
							const o = e.toLocaleUpperCase(),
								r = c.find((e => e.value.toLocaleUpperCase() === o));
							if (r) return void a(r.value);
							const n = c.find((e => e.label.toLocaleUpperCase().startsWith(o)));
							n && a(n.value)
						}
					},
					options: c,
					value: i || "",
					allowReset: !1,
					autoComplete: b,
					"aria-invalid": (null == I ? void 0 : I.message) && !(null != I && I.hidden),
					"aria-errormessage": N
				}), (0, r.createElement)(n.ValidationInputError, {
					propertyName: C
				}))
			};
			o(7368);
			const E = ({
				className: e,
				countries: t,
				id: o,
				label: a,
				onChange: n,
				value: i = "",
				autoComplete: u = "off",
				required: m = !1,
				errorId: p,
				errorMessage: f = (0, l.__)("Please select a country", "woocommerce")
			}) => {
				const E = (0, s.useMemo)((() => Object.entries(t).map((([e, t]) => ({
					value: e,
					label: (0, c.decodeEntities)(t)
				})))), [t]);
				return (0, r.createElement)("div", {
					className: d()(e, "wc-block-components-country-input")
				}, (0, r.createElement)(y, {
					id: o,
					label: a,
					onChange: n,
					options: E,
					value: i,
					errorId: p,
					errorMessage: f,
					required: m,
					autoComplete: u
				}))
			};
			var b = o(8752);
			const h = e => (0, r.createElement)(E, {
					countries: b.DK,
					...e
				}),
				k = e => (0, r.createElement)(E, {
					countries: b.mO,
					...e
				});
			o(6115);
			const v = (e, t) => {
					const o = t.find((t => t.label.toLocaleUpperCase() === e.toLocaleUpperCase() || t.value.toLocaleUpperCase() === e.toLocaleUpperCase()));
					return o ? o.value : ""
				},
				g = ({
					className: e,
					id: t,
					states: o,
					country: a,
					label: i,
					onChange: u,
					autoComplete: m = "off",
					value: p = "",
					required: f = !1,
					errorId: E = ""
				}) => {
					const b = o[a],
						h = (0, s.useMemo)((() => b ? Object.keys(b).map((e => ({
							value: e,
							label: (0, c.decodeEntities)(b[e])
						}))) : []), [b]),
						k = (0, s.useCallback)((e => {
							const t = h.length > 0 ? v(e, h) : e;
							t !== p && u(t)
						}), [u, h, p]),
						g = (0, s.useRef)(p);
					return (0, s.useEffect)((() => {
						g.current !== p && (g.current = p)
					}), [p]), (0, s.useEffect)((() => {
						if (h.length > 0 && g.current) {
							const e = v(g.current, h);
							e !== g.current && k(e)
						}
					}), [h, k]), h.length > 0 ? (0, r.createElement)(y, {
						className: d()(e, "wc-block-components-state-input"),
						id: t,
						label: i,
						onChange: k,
						options: h,
						value: p,
						errorMessage: (0, l.__)("Please select a state.", "woocommerce"),
						errorId: E,
						required: f,
						autoComplete: m
					}) : (0, r.createElement)(n.ValidatedTextInput, {
						className: e,
						id: t,
						label: i,
						onChange: k,
						autoComplete: m,
						value: p,
						required: f
					})
				},
				C = e => (0, r.createElement)(g, {
					states: b.JJ,
					...e
				}),
				_ = e => (0, r.createElement)(g, {
					states: b.nm,
					...e
				});
			var w = o(4333),
				I = o(9530),
				N = o(9127),
				O = o.n(N),
				T = o(5969);
			var S = o(6483);
			const V = ({
					id: e = "",
					fields: t,
					fieldConfig: o = {},
					onChange: c,
					addressType: i = "shipping",
					values: u,
					children: E
				}) => {
					const b = (0, w.useInstanceId)(V),
						v = (0, I.s)(t),
						g = (0, I.s)(o),
						N = (0, I.s)((0, m.objectHasProp)(u, "country") ? u.country : ""),
						A = (0, s.useMemo)((() => {
							const e = (0, T.Z)(v, g, N);
							return {
								fields: e,
								addressType: i,
								required: e.filter((e => e.required)),
								hidden: e.filter((e => e.hidden))
							}
						}), [v, g, N, i]),
						R = (0, s.useRef)({});
					return (0, s.useEffect)((() => {
						const e = {
							...u,
							...Object.fromEntries(A.hidden.map((e => [e.key, ""])))
						};
						O()(u, e) || c(e)
					}), [c, A, u]), (0, s.useEffect)((() => {
						"shipping" === i && (0, m.objectHasProp)(u, "country") && (e => {
							const t = "shipping_country",
								o = (0, p.select)(f.VALIDATION_STORE_KEY).getValidationError(t);
							!e.country && (e.city || e.state || e.postcode) && (o ? (0, p.dispatch)(f.VALIDATION_STORE_KEY).showValidationError(t) : (0, p.dispatch)(f.VALIDATION_STORE_KEY).setValidationErrors({
								[t]: {
									message: (0, l.__)("Please select your country", "woocommerce"),
									hidden: !1
								}
							})), o && e.country && (0, p.dispatch)(f.VALIDATION_STORE_KEY).clearValidationError(t)
						})(u)
					}), [u, i]), (0, s.useEffect)((() => {
						var e, t;
						null === (e = R.current) || void 0 === e || null === (t = e.postcode) || void 0 === t || t.revalidate()
					}), [N]), e = e || `${b}`, (0, r.createElement)("div", {
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
						if ("email" === t.key && (o.id = "email", o.errorId = "billing_email"), "checkbox" === t.type) return (0, r.createElement)(n.CheckboxControl, {
							className: `wc-block-components-address-form__${t.key}`,
							label: t.label,
							key: t.key,
							checked: Boolean(u[t.key]),
							onChange: e => {
								c({
									...u,
									[t.key]: e
								})
							},
							...o
						});
						if ("country" === t.key && (0, m.objectHasProp)(u, "country")) {
							const e = "shipping" === i ? k : h;
							return (0, r.createElement)(e, {
								key: t.key,
								...o,
								value: u.country,
								onChange: e => {
									const t = {
										...u,
										country: e,
										state: ""
									};
									u.postcode && !(0, a.isPostcode)({
										postcode: u.postcode,
										country: e
									}) && (t.postcode = ""), c(t)
								}
							})
						}
						if ("state" === t.key && (0, m.objectHasProp)(u, "state")) {
							const e = "shipping" === i ? _ : C;
							return (0, r.createElement)(e, {
								key: t.key,
								...o,
								country: u.country,
								value: u.state,
								onChange: e => c({
									...u,
									state: e
								})
							})
						}
						return "select" === t.type ? void 0 === t.options ? null : (0, r.createElement)(y, {
							key: t.key,
							...o,
							className: d()("wc-block-components-select-input", `wc-block-components-select-input-${t.key}`),
							value: u[t.key],
							onChange: e => {
								c({
									...u,
									[t.key]: e
								})
							},
							options: t.options
						}) : (0, r.createElement)(n.ValidatedTextInput, {
							key: t.key,
							ref: e => R.current[t.key] = e,
							...o,
							type: t.type,
							value: u[t.key],
							onChange: e => c({
								...u,
								[t.key]: e
							}),
							customFormatter: e => "postcode" === t.key ? e.trimStart().toUpperCase() : e,
							customValidation: e => ((e, t, o) => !((e.required || e.value) && ("postcode" === t && o && !(0, a.isPostcode)({
								postcode: e.value,
								country: o
							}) ? (e.setCustomValidity((0, l.__)("Please enter a valid postcode", "woocommerce")), 1) : "email" === t && !(0, S.isEmail)(e.value) && (e.setCustomValidity((0, l.__)("Please enter a valid email address", "woocommerce")), 1))))(e, t.key, (0, m.objectHasProp)(u, "country") ? u.country : "")
						})
					})), E)
				},
				A = V
		},
		9530: (e, t, o) => {
			"use strict";
			o.d(t, {
				s: () => s
			});
			var r = o(9307),
				a = o(9127),
				n = o.n(a);

			function s(e) {
				const t = (0, r.useRef)(e);
				return n()(e, t.current) || (t.current = e), t.current
			}
		},
		1070: (e, t, o) => {
			"use strict";
			o.d(t, {
				Z: () => a
			});
			var r = o(5736);
			const a = ({
				defaultTitle: e = (0, r.__)("Step", "woocommerce"),
				defaultDescription: t = (0, r.__)("Step description text.", "woocommerce"),
				defaultShowStepNumber: o = !0
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
					default: o
				}
			})
		},
		8603: (e, t, o) => {
			"use strict";
			o.r(t), o.d(t, {
				default: () => E
			});
			var r = o(9196),
				a = o(7608),
				n = o.n(a),
				s = o(711),
				l = o(8752),
				c = o(9818),
				i = o(4801),
				d = o(721),
				u = o(8027),
				m = o(9366);
			const p = () => {
				const {
					additionalFields: e
				} = (0, c.useSelect)((e => ({
					additionalFields: e(i.CHECKOUT_STORE_KEY).getAdditionalFields()
				}))), {
					setAdditionalFields: t
				} = (0, c.useDispatch)(i.CHECKOUT_STORE_KEY), o = {
					...e
				};
				return 0 === l.bh.length ? null : (0, r.createElement)(r.Fragment, null, (0, r.createElement)(s.StoreNoticesContainer, {
					context: u.n7.ORDER_INFORMATION
				}), (0, r.createElement)(m.l, {
					id: "additional-information",
					addressType: "additional-information",
					onChange: e => {
						t(e)
					},
					values: o,
					fields: l.bh
				}))
			};
			var f = o(5736);
			const y = {
					...(0, o(1070).Z)({
						defaultTitle: (0, f.__)("Additional order information", "woocommerce"),
						defaultDescription: ""
					}),
					className: {
						type: "string",
						default: ""
					},
					lock: {
						type: "object",
						default: {
							move: !1,
							remove: !0
						}
					}
				},
				E = (0, d.withFilteredAttributes)(y)((({
					title: e,
					description: t,
					showStepNumber: o,
					children: a,
					className: d
				}) => {
					const u = (0, c.useSelect)((e => e(i.CHECKOUT_STORE_KEY).isProcessing()));
					return 0 === l.bh.length ? null : (0, r.createElement)(s.FormStep, {
						id: "additional-information-fields",
						disabled: u,
						className: n()("wc-block-checkout__additional-information-fields", d),
						title: e,
						description: t,
						showStepNumber: o
					}, (0, r.createElement)(p, null), a)
				}))
		},
		2750: () => {},
		7368: () => {},
		6115: () => {}
	}
]);