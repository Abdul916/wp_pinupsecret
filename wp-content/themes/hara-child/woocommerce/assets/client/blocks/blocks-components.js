var wc;
(() => {
	var e, t = {
			451: (e, t, n) => {
				"use strict";
				n.r(t), n.d(t, {
					Button: () => i,
					CheckboxControl: () => u,
					CheckboxList: () => h,
					Chip: () => w,
					FormStep: () => f,
					FormattedMonetaryAmount: () => x,
					Label: () => C,
					Panel: () => T,
					RadioControl: () => M,
					RadioControlAccordion: () => A,
					RadioControlOption: () => O,
					RadioControlOptionLayout: () => R,
					RemovableChip: () => v,
					SortSelect: () => D,
					Spinner: () => l,
					StoreNotice: () => K,
					StoreNoticesContainer: () => ie,
					Subtotal: () => fe,
					TextInput: () => de,
					Textarea: () => me,
					Title: () => _,
					TotalsFees: () => ye,
					TotalsItem: () => _e,
					TotalsTaxes: () => Ne,
					TotalsWrapper: () => xe,
					ValidatedTextInput: () => Ee,
					ValidationInputError: () => pe
				});
				var o = n(9196),
					c = n(9770),
					a = n(7608),
					s = n.n(a);
				n(1029), n(7440);
				const l = () => (0, o.createElement)("span", {
						className: "wc-block-components-spinner",
						"aria-hidden": "true"
					}),
					r = ({
						className: e,
						showSpinner: t = !1,
						children: n,
						variant: a = "contained",
						...r
					}) => {
						const i = s()("wc-block-components-button", "wp-element-button", e, a, {
							"wc-block-components-button--loading": t
						});
						return (0, o.createElement)(c.Z, {
							className: i,
							...r
						}, t && (0, o.createElement)(l, null), (0, o.createElement)("span", {
							className: "wc-block-components-button__text"
						}, n))
					},
					i = r;
				var m = n(4333);
				n(5866);
				const d = ({
						className: e,
						label: t,
						id: n,
						onChange: c,
						children: a,
						hasError: l = !1,
						checked: r = !1,
						disabled: i = !1,
						...u
					}) => {
						const p = (0, m.useInstanceId)(d),
							b = n || `checkbox-control-${p}`;
						return (0, o.createElement)("div", {
							className: s()("wc-block-components-checkbox", {
								"has-error": l
							}, e)
						}, (0, o.createElement)("label", {
							htmlFor: b
						}, (0, o.createElement)("input", {
							id: b,
							className: "wc-block-components-checkbox__input",
							type: "checkbox",
							onChange: e => c(e.target.checked),
							"aria-invalid": !0 === l,
							checked: r,
							disabled: !!i,
							...u
						}), (0, o.createElement)("svg", {
							className: "wc-block-components-checkbox__mark",
							"aria-hidden": "true",
							xmlns: "http://www.w3.org/2000/svg",
							viewBox: "0 0 24 20"
						}, (0, o.createElement)("path", {
							d: "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
						})), t && (0, o.createElement)("span", {
							className: "wc-block-components-checkbox__label"
						}, t), a))
					},
					u = d;
				var p = n(5736),
					b = n(9307);
				n(1150);
				const h = ({
					className: e,
					onChange: t,
					options: n = [],
					checked: c = [],
					isLoading: a = !1,
					isDisabled: l = !1,
					limit: r = 10
				}) => {
					const [i, m] = (0, b.useState)(!1), u = (0, b.useMemo)((() => [...Array(5)].map(((e, t) => (0, o.createElement)("li", {
						key: t,
						style: {
							width: Math.floor(75 * Math.random()) + 25 + "%"
						}
					}, " ")))), []), h = (0, b.useMemo)((() => {
						const e = n.length - r;
						return !i && (0, o.createElement)("li", {
							key: "show-more",
							className: "show-more"
						}, (0, o.createElement)("button", {
							onClick: () => {
								m(!0)
							},
							"aria-expanded": !1,
							"aria-label": (0, p.sprintf)( /* translators: %s is referring the remaining count of options */ /* translators: %s is referring the remaining count of options */
								(0, p._n)("Show %s more option", "Show %s more options", e, "woocommerce"), e)
						}, (0, p.sprintf)( /* translators: %s number of options to reveal. */ /* translators: %s number of options to reveal. */
							(0, p._n)("Show %s more", "Show %s more", e, "woocommerce"), e)))
					}), [n, r, i]), w = (0, b.useMemo)((() => i && (0, o.createElement)("li", {
						key: "show-less",
						className: "show-less"
					}, (0, o.createElement)("button", {
						onClick: () => {
							m(!1)
						},
						"aria-expanded": !0,
						"aria-label": (0, p.__)("Show less options", "woocommerce")
					}, (0, p.__)("Show less", "woocommerce")))), [i]), k = (0, b.useMemo)((() => {
						const e = n.length > r + 5;
						return (0, o.createElement)(b.Fragment, null, n.map(((n, a) => (0, o.createElement)(b.Fragment, {
							key: n.value
						}, (0, o.createElement)("li", {
							...e && !i && a >= r && {
								hidden: !0
							}
						}, (0, o.createElement)(d, {
							id: n.value,
							className: "wc-block-checkbox-list__checkbox",
							label: n.label,
							checked: c.includes(n.value),
							onChange: () => {
								t(n.value)
							},
							disabled: l
						})), e && a === r - 1 && h))), e && w)
					}), [n, t, c, i, r, w, h, l]), E = s()("wc-block-checkbox-list", "wc-block-components-checkbox-list", {
						"is-loading": a
					}, e);
					return (0, o.createElement)("ul", {
						className: E
					}, a ? u : k)
				};
				n(562);
				const w = ({
					text: e,
					screenReaderText: t = "",
					element: n = "li",
					className: c = "",
					radius: a = "small",
					children: l = null,
					...r
				}) => {
					const i = n,
						m = s()(c, "wc-block-components-chip", "wc-block-components-chip--radius-" + a),
						d = Boolean(t && t !== e);
					return (0, o.createElement)(i, {
						className: m,
						...r
					}, (0, o.createElement)("span", {
						"aria-hidden": d,
						className: "wc-block-components-chip__text"
					}, e), d && (0, o.createElement)("span", {
						className: "screen-reader-text"
					}, t), l)
				};
				var k = n(2911),
					E = n(6860);
				const v = ({
					ariaLabel: e = "",
					className: t = "",
					disabled: n = !1,
					onRemove: c = (() => {}),
					removeOnAnyClick: a = !1,
					text: l,
					screenReaderText: r = "",
					...i
				}) => {
					const m = a ? "span" : "button";
					if (!e) {
						const t = r && "string" == typeof r ? r : l;
						e = "string" != typeof t ? /* translators: Remove chip. */ /* translators: Remove chip. */
							(0, p.__)("Remove", "woocommerce") : (0, p.sprintf)( /* translators: %s text of the chip to remove. */ /* translators: %s text of the chip to remove. */
								(0, p.__)('Remove "%s"', "woocommerce"), t)
					}
					const d = {
							"aria-label": e,
							disabled: n,
							onClick: c,
							onKeyDown: e => {
								"Backspace" !== e.key && "Delete" !== e.key || c()
							}
						},
						u = a ? d : {},
						b = a ? {
							"aria-hidden": !0
						} : d;
					return (0, o.createElement)(w, {
						...i,
						...u,
						className: s()(t, "is-removable"),
						element: a ? "button" : i.element,
						screenReaderText: r,
						text: l
					}, (0, o.createElement)(m, {
						className: "wc-block-components-chip__remove",
						...b
					}, (0, o.createElement)(k.Z, {
						className: "wc-block-components-chip__remove-icon",
						icon: E.Z,
						size: 16,
						role: "img"
					})))
				};
				n(4729), n(406);
				const _ = ({
						children: e,
						className: t = "",
						headingLevel: n,
						...c
					}) => {
						const a = s()("wc-block-components-title", t),
							l = `h${n}`;
						return (0, o.createElement)(l, {
							className: a,
							...c
						}, e)
					},
					g = ({
						title: e,
						stepHeadingContent: t
					}) => (0, o.createElement)("div", {
						className: "wc-block-components-checkout-step__heading"
					}, (0, o.createElement)(_, {
						"aria-hidden": "true",
						className: "wc-block-components-checkout-step__title",
						headingLevel: "2"
					}, e), !!t && (0, o.createElement)("span", {
						className: "wc-block-components-checkout-step__heading-content"
					}, t)),
					f = ({
						id: e,
						className: t,
						title: n,
						legend: c,
						description: a,
						children: l,
						disabled: r = !1,
						showStepNumber: i = !0,
						stepHeadingContent: m = (() => {})
					}) => {
						const d = c || n ? "fieldset" : "div";
						return (0, o.createElement)(d, {
							className: s()(t, "wc-block-components-checkout-step", {
								"wc-block-components-checkout-step--with-step-number": i,
								"wc-block-components-checkout-step--disabled": r
							}),
							id: e,
							disabled: r
						}, !(!c && !n) && (0, o.createElement)("legend", {
							className: "screen-reader-text"
						}, c || n), !!n && (0, o.createElement)(g, {
							title: n,
							stepHeadingContent: m()
						}), (0, o.createElement)("div", {
							className: "wc-block-components-checkout-step__container"
						}, !!a && (0, o.createElement)("p", {
							className: "wc-block-components-checkout-step__description"
						}, a), (0, o.createElement)("div", {
							className: "wc-block-components-checkout-step__content"
						}, l)))
					};
				var N = n(2425);
				n(283);
				const y = e => {
						const t = (null == e ? void 0 : e.thousandSeparator) === (null == e ? void 0 : e.decimalSeparator);
						return t && console.warn("Thousand separator and decimal separator are the same. This may cause formatting issues."), {
							thousandSeparator: t ? "" : null == e ? void 0 : e.thousandSeparator,
							decimalSeparator: null == e ? void 0 : e.decimalSeparator,
							fixedDecimalScale: !0,
							prefix: null == e ? void 0 : e.prefix,
							suffix: null == e ? void 0 : e.suffix,
							isNumericString: !0
						}
					},
					x = ({
						className: e,
						value: t,
						currency: n,
						onValueChange: c,
						displayType: a = "text",
						...l
					}) => {
						var r;
						const i = "string" == typeof t ? parseInt(t, 10) : t;
						if (!Number.isFinite(i)) return null;
						const m = i / 10 ** n.minorUnit;
						if (!Number.isFinite(m)) return null;
						const d = s()("wc-block-formatted-money-amount", "wc-block-components-formatted-money-amount", e),
							u = null !== (r = l.decimalScale) && void 0 !== r ? r : null == n ? void 0 : n.minorUnit,
							p = {
								...l,
								...y(n),
								decimalScale: u,
								value: void 0,
								currency: void 0,
								onValueChange: void 0
							},
							b = c ? e => {
								const t = +e.value * 10 ** n.minorUnit;
								c(t)
							} : () => {};
						return (0, o.createElement)(N.Z, {
							className: d,
							displayType: a,
							...p,
							value: m,
							onValueChange: b
						})
					},
					C = ({
						label: e,
						screenReaderLabel: t,
						wrapperElement: n,
						wrapperProps: c = {}
					}) => {
						let a;
						const l = null != e,
							r = null != t;
						return !l && r ? (a = n || "span", c = {
							...c,
							className: s()(c.className, "screen-reader-text")
						}, (0, o.createElement)(a, {
							...c
						}, t)) : (a = n || b.Fragment, l && r && e !== t ? (0, o.createElement)(a, {
							...c
						}, (0, o.createElement)("span", {
							"aria-hidden": "true"
						}, e), (0, o.createElement)("span", {
							className: "screen-reader-text"
						}, t)) : (0, o.createElement)(a, {
							...c
						}, e))
					};
				var S = n(7796),
					I = n(7642);
				n(3847);
				const T = ({
						children: e,
						className: t,
						initialOpen: n = !1,
						hasBorder: c = !1,
						title: a,
						titleTag: l = "div"
					}) => {
						const [r, i] = (0, b.useState)(n);
						return (0, o.createElement)("div", {
							className: s()(t, "wc-block-components-panel", {
								"has-border": c
							})
						}, (0, o.createElement)(l, null, (0, o.createElement)("button", {
							"aria-expanded": r,
							className: "wc-block-components-panel__button",
							onClick: () => i(!r)
						}, (0, o.createElement)(k.Z, {
							"aria-hidden": "true",
							className: "wc-block-components-panel__button-icon",
							icon: r ? S.Z : I.Z
						}), a)), r && (0, o.createElement)("div", {
							className: "wc-block-components-panel__content"
						}, e))
					},
					R = ({
						label: e,
						secondaryLabel: t,
						description: n,
						secondaryDescription: c,
						id: a
					}) => (0, o.createElement)("div", {
						className: "wc-block-components-radio-control__option-layout"
					}, (0, o.createElement)("div", {
						className: "wc-block-components-radio-control__label-group"
					}, e && (0, o.createElement)("span", {
						id: a && `${a}__label`,
						className: "wc-block-components-radio-control__label"
					}, e), t && (0, o.createElement)("span", {
						id: a && `${a}__secondary-label`,
						className: "wc-block-components-radio-control__secondary-label"
					}, t)), (n || c) && (0, o.createElement)("div", {
						className: "wc-block-components-radio-control__description-group"
					}, n && (0, o.createElement)("span", {
						id: a && `${a}__description`,
						className: "wc-block-components-radio-control__description"
					}, n), c && (0, o.createElement)("span", {
						id: a && `${a}__secondary-description`,
						className: "wc-block-components-radio-control__secondary-description"
					}, c))),
					O = ({
						checked: e,
						name: t,
						onChange: n,
						option: c,
						disabled: a = !1,
						highlightChecked: l = !1
					}) => {
						const {
							value: r,
							label: i,
							description: m,
							secondaryLabel: d,
							secondaryDescription: u
						} = c;
						return (0, o.createElement)("label", {
							className: s()("wc-block-components-radio-control__option", {
								"wc-block-components-radio-control__option-checked": e,
								"wc-block-components-radio-control__option--checked-option-highlighted": e && l
							}),
							htmlFor: `${t}-${r}`
						}, (0, o.createElement)("input", {
							id: `${t}-${r}`,
							className: "wc-block-components-radio-control__input",
							type: "radio",
							name: t,
							value: r,
							onChange: e => n(e.target.value),
							checked: e,
							"aria-describedby": s()({
								[`${t}-${r}__label`]: i,
								[`${t}-${r}__secondary-label`]: d,
								[`${t}-${r}__description`]: m,
								[`${t}-${r}__secondary-description`]: u
							}),
							disabled: a
						}), (0, o.createElement)(R, {
							id: `${t}-${r}`,
							label: i,
							secondaryLabel: d,
							description: m,
							secondaryDescription: u
						}))
					};
				n(9803);
				const $ = ({
						className: e = "",
						id: t,
						selected: n = "",
						onChange: c,
						options: a = [],
						disabled: l = !1,
						highlightChecked: r = !1
					}) => {
						const i = (0, m.useInstanceId)($),
							d = t || i,
							u = (0, b.useMemo)((() => a.findIndex((e => e.value === n))), [a, n]);
						return a.length ? (0, o.createElement)("div", {
							className: s()("wc-block-components-radio-control", {
								"wc-block-components-radio-control--highlight-checked--first-selected": r && 0 === u,
								"wc-block-components-radio-control--highlight-checked--last-selected": r && u === a.length - 1,
								"wc-block-components-radio-control--highlight-checked": r
							}, e)
						}, a.map((e => (0, o.createElement)(O, {
							highlightChecked: r,
							key: `${d}-${e.value}`,
							name: `radio-control-${d}`,
							checked: e.value === n,
							option: e,
							onChange: t => {
								c(t), "function" == typeof e.onChange && e.onChange(t)
							},
							disabled: l
						})))) : null
					},
					M = $,
					A = (0, m.withInstanceId)((({
						className: e,
						instanceId: t,
						id: n,
						selected: c,
						onChange: a,
						options: l = [],
						highlightChecked: r = !1
					}) => {
						const i = n || t,
							m = (0, b.useMemo)((() => l.findIndex((e => e.value === c))), [l, c]);
						return l.length ? (0, o.createElement)("div", {
							className: s()("wc-block-components-radio-control", {
								"wc-block-components-radio-control--highlight-checked": r,
								"wc-block-components-radio-control--highlight-checked--first-selected": r && 0 === m,
								"wc-block-components-radio-control--highlight-checked--last-selected": r && m === l.length - 1
							}, e)
						}, l.map((e => {
							const t = "object" == typeof e && "content" in e,
								n = e.value === c;
							return (0, o.createElement)("div", {
								className: s()("wc-block-components-radio-control-accordion-option", {
									"wc-block-components-radio-control-accordion-option--checked-option-highlighted": n && r
								}),
								key: e.value
							}, (0, o.createElement)(O, {
								name: `radio-control-${i}`,
								checked: n,
								option: e,
								onChange: t => {
									a(t), "function" == typeof e.onChange && e.onChange(t)
								}
							}), t && n && (0, o.createElement)("div", {
								className: s()("wc-block-components-radio-control-accordion-content", {
									"wc-block-components-radio-control-accordion-content-hide": !n
								})
							}, e.content))
						}))) : null
					}));
				n(9043);
				const D = (0, m.withInstanceId)((({
					className: e,
					instanceId: t,
					label: n = "",
					onChange: c,
					options: a,
					screenReaderLabel: l,
					value: r = "",
					readOnly: i = !1
				}) => {
					const m = `wc-block-components-sort-select__select-${t}`;
					return (0, o.createElement)("div", {
						className: s()("wc-block-sort-select", "wc-block-components-sort-select", e)
					}, (0, o.createElement)(C, {
						label: n,
						screenReaderLabel: l,
						wrapperElement: "label",
						wrapperProps: {
							className: "wc-block-sort-select__label wc-block-components-sort-select__label",
							htmlFor: m
						}
					}), (0, o.createElement)("select", {
						disabled: !!i,
						id: m,
						className: "wc-block-sort-select__select wc-block-components-sort-select__select",
						onChange: c,
						value: r
					}, a && a.map((e => (0, o.createElement)("option", {
						key: e.key,
						value: e.key
					}, e.label)))))
				}));
				var L = n(9140),
					F = (n(946), n(202)),
					P = n(2720),
					Z = n(1242);
				const V = e => {
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
					B = e => {
						switch (e) {
							case "success":
								return F.Z;
							case "warning":
							case "info":
							case "error":
								return P.Z;
							default:
								return Z.Z
						}
					};
				var H = n(5158);
				const j = ({
						className: e,
						status: t = "default",
						children: n,
						spokenMessage: c = n,
						onRemove: a = (() => {}),
						isDismissible: l = !0,
						politeness: i = V(t),
						summary: m
					}) => (((e, t) => {
						const n = "string" == typeof e ? e : (0, b.renderToString)(e);
						(0, b.useEffect)((() => {
							n && (0, H.speak)(n, t)
						}), [n, t])
					})(c, i), (0, o.createElement)("div", {
						className: s()(e, "wc-block-components-notice-banner", "is-" + t, {
							"is-dismissible": l
						})
					}, (0, o.createElement)(k.Z, {
						icon: B(t)
					}), (0, o.createElement)("div", {
						className: "wc-block-components-notice-banner__content"
					}, m && (0, o.createElement)("p", {
						className: "wc-block-components-notice-banner__summary"
					}, m), n), !!l && (0, o.createElement)(r, {
						className: "wc-block-components-notice-banner__dismiss",
						icon: L.Z,
						label: (0, p.__)("Dismiss this notice", "woocommerce"),
						onClick: e => {
							"function" == typeof(null == e ? void 0 : e.preventDefault) && e.preventDefault && e.preventDefault(), a()
						},
						showTooltip: !1
					}))),
					K = ({
						className: e,
						children: t,
						status: n,
						...c
					}) => (0, o.createElement)(j, {
						className: s()("wc-block-store-notice", e),
						status: n,
						...c
					}, t),
					Y = window.wp.data,
					z = window.wc.wcBlocksData,
					W = window.wc.wcTypes;
				let G = function(e) {
					return e.CART = "wc/cart", e.CHECKOUT = "wc/checkout", e.PAYMENTS = "wc/checkout/payments", e.EXPRESS_PAYMENTS = "wc/checkout/express-payments", e.CONTACT_INFORMATION = "wc/checkout/contact-information", e.SHIPPING_ADDRESS = "wc/checkout/shipping-address", e.BILLING_ADDRESS = "wc/checkout/billing-address", e.SHIPPING_METHODS = "wc/checkout/shipping-methods", e.CHECKOUT_ACTIONS = "wc/checkout/checkout-actions", e.ORDER_INFORMATION = "wc/checkout/additional-information", e
				}({});
				(0, p.__)("Something went wrong. Please contact us to get assistance.", "woocommerce"), n(5942);
				var U = n(3561),
					J = n.n(U);
				const q = ["a", "b", "em", "i", "strong", "p", "br"],
					X = ["target", "href", "rel", "name", "download"],
					Q = (e, t) => {
						const n = (null == t ? void 0 : t.tags) || q,
							o = (null == t ? void 0 : t.attr) || X;
						return J().sanitize(e, {
							ALLOWED_TAGS: n,
							ALLOWED_ATTR: o
						})
					};

				function ee(e, t) {
					const n = (0, b.useRef)();
					return (0, b.useEffect)((() => {
						n.current === e || t && !t(e, n.current) || (n.current = e)
					}), [e, t]), n.current
				}
				const te = window.wp.htmlEntities,
					ne = ({
						className: e,
						notices: t
					}) => {
						const n = (0, b.useRef)(null),
							{
								removeNotice: c
							} = (0, Y.useDispatch)("core/notices"),
							a = t.map((e => e.id)),
							l = ee(a);
						(0, b.useEffect)((() => {
							const e = n.current;
							if (!e) return;
							const t = e.ownerDocument.activeElement;
							t && -1 !== ["input", "select", "button", "textarea"].indexOf(t.tagName.toLowerCase()) && "radio" !== t.getAttribute("type") || a.filter((e => !l || !l.includes(e))).length && null != e && e.scrollIntoView && e.scrollIntoView({
								behavior: "smooth"
							})
						}), [a, l, n]);
						const r = t.filter((({
								isDismissible: e
							}) => !!e)),
							i = t.filter((({
								isDismissible: e
							}) => !e)),
							m = {
								error: r.filter((({
									status: e
								}) => "error" === e)),
								success: r.filter((({
									status: e
								}) => "success" === e)),
								warning: r.filter((({
									status: e
								}) => "warning" === e)),
								info: r.filter((({
									status: e
								}) => "info" === e)),
								default: r.filter((({
									status: e
								}) => "default" === e))
							};
						return (0, o.createElement)("div", {
							ref: n,
							className: s()(e, "wc-block-components-notices")
						}, i.map((e => (0, o.createElement)(K, {
							key: e.id + "-" + e.context,
							...e
						}, (0, o.createElement)(b.RawHTML, null, Q((0, te.decodeEntities)(e.content)))))), Object.entries(m).map((([e, t]) => {
							if (!t.length) return null;
							const n = t.filter(((e, t, n) => n.findIndex((t => t.content === e.content)) === t)).map((e => ({
									...e,
									content: Q((0, te.decodeEntities)(e.content))
								}))),
								a = {
									key: `store-notice-${e}`,
									status: e,
									onRemove: () => {
										t.forEach((e => {
											c(e.id, e.context)
										}))
									}
								};
							return 1 === n.length ? (0, o.createElement)(K, {
								...a
							}, (0, o.createElement)(b.RawHTML, null, t[0].content)) : (0, o.createElement)(K, {
								...a,
								summary: "error" === e ? (0, p.__)("Please fix the following errors before continuing", "woocommerce") : ""
							}, (0, o.createElement)("ul", null, n.map((e => (0, o.createElement)("li", {
								key: e.id + "-" + e.context
							}, (0, o.createElement)(b.RawHTML, null, e.content))))))
						})))
					};
				var oe = n(9677),
					ce = n(9921);
				n(2194);
				const ae = ({
						onRemove: e = (() => {}),
						children: t,
						listRef: n,
						className: c,
						...a
					}) => ((0, b.useEffect)((() => {
						const t = setTimeout((() => {
							e()
						}), 1e4);
						return () => clearTimeout(t)
					}), [e]), (0, o.createElement)(j, {
						className: s()(c, "wc-block-components-notice-snackbar"),
						...a,
						onRemove: () => {
							n && n.current && n.current.focus(), e()
						}
					}, t)),
					se = ({
						notices: e,
						className: t,
						onRemove: n = (() => {})
					}) => {
						const c = (0, b.useRef)(null),
							a = (0, m.useReducedMotion)(),
							l = e => () => n((null == e ? void 0 : e.id) || "");
						return (0, o.createElement)("div", {
							className: s()(t, "wc-block-components-notice-snackbar-list"),
							tabIndex: -1,
							ref: c
						}, a ? e.map((e => {
							const {
								content: t,
								...n
							} = e;
							return (0, o.createElement)(ae, {
								...n,
								onRemove: l(e),
								listRef: c,
								key: e.id
							}, e.content)
						})) : (0, o.createElement)(oe.Z, null, e.map((e => {
							const {
								content: t,
								...n
							} = e;
							return (0, o.createElement)(ce.Z, {
								key: "snackbar-" + e.id,
								timeout: 500,
								classNames: "notice-transition"
							}, (0, o.createElement)(ae, {
								...n,
								onRemove: l(e),
								listRef: c
							}, t))
						}))))
					},
					le = ({
						className: e,
						notices: t
					}) => {
						const {
							removeNotice: n
						} = (0, Y.useDispatch)("core/notices");
						return (0, o.createElement)(se, {
							className: s()(e, "wc-block-components-notices__snackbar"),
							notices: t,
							onRemove: e => {
								t.forEach((t => {
									t.explicitDismiss && t.id === e ? n(t.id, t.context) : t.explicitDismiss || n(t.id, t.context)
								}))
							}
						})
					},
					re = (e, t) => e.map((e => ({
						...e,
						context: t
					}))),
					ie = ({
						className: e = "",
						context: t = "",
						additionalNotices: n = []
					}) => {
						const {
							registerContainer: c,
							unregisterContainer: a
						} = (0, Y.useDispatch)(z.STORE_NOTICES_STORE_KEY), {
							suppressNotices: s,
							registeredContainers: l
						} = (0, Y.useSelect)((e => ({
							suppressNotices: e(z.PAYMENT_STORE_KEY).isExpressPaymentMethodActive(),
							registeredContainers: e(z.STORE_NOTICES_STORE_KEY).getRegisteredContainers()
						}))), r = (0, b.useMemo)((() => Array.isArray(t) ? t : [t]), [t]), i = Object.values(G).filter((e => r.some((t => e.includes(t + "/"))) && !l.includes(e))), m = (0, Y.useSelect)((e => {
							const {
								getNotices: t
							} = e("core/notices");
							return [...i.flatMap((e => re(t(e), e))), ...r.flatMap((e => re(t(e).concat(n), e)))].filter(Boolean)
						}));
						return (0, b.useEffect)((() => (r.map((e => c(e))), () => {
							r.map((e => a(e)))
						})), [r, c, a]), s ? null : (0, o.createElement)(o.Fragment, null, (0, o.createElement)(ne, {
							className: e,
							notices: m.filter((e => "default" === e.type))
						}), (0, o.createElement)(le, {
							className: e,
							notices: m.filter((e => "snackbar" === e.type))
						}))
					};
				n(1203);
				const me = ({
					className: e = "",
					disabled: t = !1,
					onTextChange: n,
					placeholder: c,
					value: a = ""
				}) => (0, o.createElement)("textarea", {
					className: s()("wc-block-components-textarea", e),
					disabled: t,
					onChange: e => {
						n(e.target.value)
					},
					placeholder: c,
					rows: 2,
					value: a
				});
				n(4693);
				const de = (0, b.forwardRef)((({
					className: e,
					id: t,
					type: n = "text",
					ariaLabel: c,
					ariaDescribedBy: a,
					label: l,
					screenReaderLabel: r,
					disabled: i,
					help: m,
					autoCapitalize: d = "off",
					autoComplete: u = "off",
					value: p = "",
					onChange: h,
					required: w = !1,
					onBlur: k = (() => {}),
					feedback: E,
					...v
				}, _) => {
					const [g, f] = (0, b.useState)(!1);
					return (0, o.createElement)("div", {
						className: s()("wc-block-components-text-input", e, {
							"is-active": g || p
						})
					}, (0, o.createElement)("input", {
						type: n,
						id: t,
						value: (0, te.decodeEntities)(p),
						ref: _,
						autoCapitalize: d,
						autoComplete: u,
						onChange: e => {
							h(e.target.value)
						},
						onFocus: () => f(!0),
						onBlur: e => {
							k(e.target.value), f(!1)
						},
						"aria-label": c || l,
						disabled: i,
						"aria-describedby": m && !a ? t + "__help" : a,
						required: w,
						...v
					}), (0, o.createElement)(C, {
						label: l,
						screenReaderLabel: r || l,
						wrapperElement: "label",
						wrapperProps: {
							htmlFor: t
						},
						htmlFor: t
					}), !!m && (0, o.createElement)("p", {
						id: t + "__help",
						className: "wc-block-components-text-input__help"
					}, m), E)
				}));
				n(5785);
				const ue = ({
						errorMessage: e = "",
						propertyName: t = "",
						elementId: n = ""
					}) => {
						const {
							validationError: c,
							validationErrorId: a
						} = (0, Y.useSelect)((e => {
							const o = e(z.VALIDATION_STORE_KEY);
							return {
								validationError: o.getValidationError(t),
								validationErrorId: o.getValidationErrorId(n)
							}
						}));
						if (!e || "string" != typeof e) {
							if (null == c || !c.message || null != c && c.hidden) return null;
							e = c.message
						}
						return (0, o.createElement)("div", {
							className: "wc-block-components-validation-error",
							role: "alert"
						}, (0, o.createElement)("p", {
							id: a
						}, e))
					},
					pe = ue,
					be = (e, t) => {
						const {
							valid: n,
							customError: o,
							valueMissing: c,
							badInput: a,
							typeMismatch: s
						} = t.validity;
						if (n || o) return t.validationMessage;
						const l = (0, p.sprintf)( /* translators: %s field label */ /* translators: %s field label */
							(0, p.__)(" Please enter valid %s", "woocommerce"), e.toLowerCase());
						return c || a || s ? l : t.validationMessage || l
					};
				var he = n(6100);
				const we = new Map([
						["BA", /^([7-8]{1})([0-9]{4})$/],
						["GB", /^([A-Z]){1}([0-9]{1,2}|[A-Z][0-9][A-Z]|[A-Z][0-9]{2}|[A-Z][0-9]|[0-9][A-Z]){1}([ ])?([0-9][A-Z]{2}){1}|BFPO(?:\s)?([0-9]{1,4})$|BFPO(c\/o[0-9]{1,3})$/i],
						["IN", /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/],
						["JP", /^([0-9]{3})([-]?)([0-9]{4})$/],
						["KH", /^[0-9]{6}$/],
						["LI", /^(94[8-9][0-9])$/],
						["NI", /^[1-9]{1}[0-9]{4}$/],
						["NL", /^([1-9][0-9]{3})(\s?)(?!SA|SD|SS)[A-Z]{2}$/i],
						["SI", /^([1-9][0-9]{3})$/]
					]),
					ke = (new Map([...he.O, ...we]), (0, b.forwardRef)((({
						className: e,
						id: t,
						type: n = "text",
						ariaDescribedBy: c,
						errorId: a,
						focusOnMount: l = !1,
						onChange: r,
						showError: i = !0,
						errorMessage: d = "",
						value: u = "",
						customValidation: p = (() => !0),
						customFormatter: h = (e => e),
						label: w,
						validateOnMount: k = !0,
						instanceId: E = "",
						...v
					}, _) => {
						const [g, f] = (0, b.useState)(!0), N = ee(u), y = (0, b.useRef)(null), x = (0, m.useInstanceId)(ke, "", E), C = void 0 !== t ? t : "textinput-" + x, S = void 0 !== a ? a : C, {
							setValidationErrors: I,
							hideValidationError: T,
							clearValidationError: R
						} = (0, Y.useDispatch)(z.VALIDATION_STORE_KEY), O = (0, b.useRef)(p);
						(0, b.useEffect)((() => {
							O.current = p
						}), [p]);
						const {
							validationError: $,
							validationErrorId: M
						} = (0, Y.useSelect)((e => {
							const t = e(z.VALIDATION_STORE_KEY);
							return {
								validationError: t.getValidationError(S),
								validationErrorId: t.getValidationErrorId(S)
							}
						})), A = (0, b.useCallback)(((e = !0) => {
							const t = y.current || null;
							null !== t && (t.value = t.value.trim(), t.setCustomValidity(""), t.checkValidity() && O.current(t) ? R(S) : I({
								[S]: {
									message: w ? be(w, t) : t.validationMessage,
									hidden: e
								}
							}))
						}), [R, S, I, w]);
						(0, b.useImperativeHandle)(_, (function() {
							return {
								revalidate() {
									A(!u)
								}
							}
						}), [A, u]), (0, b.useEffect)((() => {
							var e, t;
							if (u !== N && (u || N) && y && null !== y.current && (null === (e = y.current) || void 0 === e || null === (t = e.ownerDocument) || void 0 === t ? void 0 : t.activeElement) !== y.current) {
								const e = h(y.current.value);
								e !== u ? r(e) : A(!0)
							}
						}), [A, h, u, N, r]), (0, b.useEffect)((() => {
							var e;
							g && (f(!1), l && (null === (e = y.current) || void 0 === e || e.focus()), !k && l || A(!0))
						}), [k, l, g, f, A]), (0, b.useEffect)((() => () => {
							R(S)
						}), [R, S]), "" !== d && (0, W.isObject)($) && ($.message = d);
						const D = (null == $ ? void 0 : $.message) && !(null != $ && $.hidden),
							L = i && D && M ? M : c;
						return (0, o.createElement)(de, {
							className: s()(e, {
								"has-error": D
							}),
							"aria-invalid": !0 === D,
							id: C,
							type: n,
							feedback: i ? (0, o.createElement)(ue, {
								errorMessage: d,
								propertyName: S
							}) : null,
							ref: y,
							onChange: e => {
								T(S), A(!0);
								const t = h(e);
								t !== u && r(t)
							},
							onBlur: () => A(!1),
							ariaDescribedBy: L,
							value: u,
							title: "",
							label: w,
							...v
						})
					}))),
					Ee = ke;
				n(7658);
				const ve = ({
						value: e,
						currency: t
					}) => (0, b.isValidElement)(e) ? (0, o.createElement)("div", {
						className: "wc-block-components-totals-item__value"
					}, e) : Number.isFinite(e) ? (0, o.createElement)(x, {
						className: "wc-block-components-totals-item__value",
						currency: t || {},
						value: e
					}) : null,
					_e = ({
						className: e,
						currency: t,
						label: n,
						value: c,
						description: a
					}) => (0, o.createElement)("div", {
						className: s()("wc-block-components-totals-item", e)
					}, (0, o.createElement)("span", {
						className: "wc-block-components-totals-item__label"
					}, n), (0, o.createElement)(ve, {
						value: c,
						currency: t
					}), (0, o.createElement)("div", {
						className: "wc-block-components-totals-item__description"
					}, a)),
					ge = window.wc.wcSettings,
					fe = ({
						currency: e,
						values: t,
						className: n
					}) => {
						const {
							total_items: c,
							total_items_tax: a
						} = t, s = parseInt(c, 10), l = parseInt(a, 10);
						return (0, o.createElement)(_e, {
							className: n,
							currency: e,
							label: (0, p.__)("Subtotal", "woocommerce"),
							value: (0, ge.getSetting)("displayCartPricesIncludingTax", !1) ? s + l : s
						})
					},
					Ne = ({
						currency: e,
						values: t,
						className: n,
						showRateAfterTaxName: c
					}) => {
						const {
							total_tax: a,
							tax_lines: l
						} = t;
						if (!(0, ge.getSetting)("taxesEnabled", !0) && parseInt(a, 10) <= 0) return null;
						const r = (0, ge.getSetting)("displayItemizedTaxes", !1),
							i = r && l.length > 0 ? (0, o.createElement)(o.Fragment, null, l.map((({
								name: t,
								rate: a,
								price: l
							}, r) => {
								const i = `${t}${c?` ${a}`:""}`;
								return (0, o.createElement)(_e, {
									key: `tax-line-${r}`,
									className: s()("wc-block-components-totals-taxes", n),
									currency: e,
									label: i,
									value: parseInt(l, 10)
								})
							})), " ") : null;
						return r ? i : (0, o.createElement)(o.Fragment, null, (0, o.createElement)(_e, {
							className: s()("wc-block-components-totals-taxes", n),
							currency: e,
							label: (0, p.__)("Taxes", "woocommerce"),
							value: parseInt(a, 10),
							description: null
						}))
					},
					ye = ({
						currency: e,
						cartFees: t,
						className: n
					}) => (0, o.createElement)(o.Fragment, null, t.map((({
						id: t,
						key: c,
						name: a,
						totals: l
					}, r) => {
						const i = parseInt(l.total, 10);
						if (!i) return null;
						const m = parseInt(l.total_tax, 10);
						return (0, o.createElement)(_e, {
							key: t || `${r}-${a}`,
							className: s()("wc-block-components-totals-fees", "wc-block-components-totals-fees__" + c, n),
							currency: e,
							label: a || (0, p.__)("Fee", "woocommerce"),
							value: (0, ge.getSetting)("displayCartPricesIncludingTax", !1) ? i + m : i
						})
					})));
				n(6878);
				const xe = ({
					children: e,
					slotWrapper: t = !1,
					className: n
				}) => b.Children.count(e) ? (0, o.createElement)("div", {
					className: s()(n, "wc-block-components-totals-wrapper", {
						"slot-wrapper": t
					})
				}, e) : null
			},
			1029: () => {},
			946: () => {},
			2194: () => {},
			5866: () => {},
			1150: () => {},
			562: () => {},
			4729: () => {},
			283: () => {},
			3847: () => {},
			9803: () => {},
			9043: () => {},
			7440: () => {},
			5942: () => {},
			4693: () => {},
			1203: () => {},
			406: () => {},
			6878: () => {},
			7658: () => {},
			5785: () => {},
			9196: e => {
				"use strict";
				e.exports = window.React
			},
			1850: e => {
				"use strict";
				e.exports = window.ReactDOM
			},
			2819: e => {
				"use strict";
				e.exports = window.lodash
			},
			5158: e => {
				"use strict";
				e.exports = window.wp.a11y
			},
			4333: e => {
				"use strict";
				e.exports = window.wp.compose
			},
			7180: e => {
				"use strict";
				e.exports = window.wp.deprecated
			},
			5904: e => {
				"use strict";
				e.exports = window.wp.dom
			},
			9307: e => {
				"use strict";
				e.exports = window.wp.element
			},
			5736: e => {
				"use strict";
				e.exports = window.wp.i18n
			},
			444: e => {
				"use strict";
				e.exports = window.wp.primitives
			},
			2560: e => {
				"use strict";
				e.exports = window.wp.warning
			}
		},
		n = {};

	function o(e) {
		var c = n[e];
		if (void 0 !== c) return c.exports;
		var a = n[e] = {
			exports: {}
		};
		return t[e].call(a.exports, a, a.exports, o), a.exports
	}
	o.m = t, e = [], o.O = (t, n, c, a) => {
		if (!n) {
			var s = 1 / 0;
			for (m = 0; m < e.length; m++) {
				for (var [n, c, a] = e[m], l = !0, r = 0; r < n.length; r++)(!1 & a || s >= a) && Object.keys(o.O).every((e => o.O[e](n[r]))) ? n.splice(r--, 1) : (l = !1, a < s && (s = a));
				if (l) {
					e.splice(m--, 1);
					var i = c();
					void 0 !== i && (t = i)
				}
			}
			return t
		}
		a = a || 0;
		for (var m = e.length; m > 0 && e[m - 1][2] > a; m--) e[m] = e[m - 1];
		e[m] = [n, c, a]
	}, o.n = e => {
		var t = e && e.__esModule ? () => e.default : () => e;
		return o.d(t, {
			a: t
		}), t
	}, o.d = (e, t) => {
		for (var n in t) o.o(t, n) && !o.o(e, n) && Object.defineProperty(e, n, {
			enumerable: !0,
			get: t[n]
		})
	}, o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), o.r = e => {
		"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
			value: "Module"
		}), Object.defineProperty(e, "__esModule", {
			value: !0
		})
	}, o.j = 6118, (() => {
		var e = {
			6118: 0
		};
		o.O.j = t => 0 === e[t];
		var t = (t, n) => {
				var c, a, [s, l, r] = n,
					i = 0;
				if (s.some((t => 0 !== e[t]))) {
					for (c in l) o.o(l, c) && (o.m[c] = l[c]);
					if (r) var m = r(o)
				}
				for (t && t(n); i < s.length; i++) a = s[i], o.o(e, a) && e[a] && e[a][0](), e[a] = 0;
				return o.O(m)
			},
			n = self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || [];
		n.forEach(t.bind(null, 0)), n.push = t.bind(null, n.push.bind(n))
	})();
	var c = o.O(void 0, [2869], (() => o(451)));
	c = o.O(c), (wc = void 0 === wc ? {} : wc).blocksComponents = c
})();