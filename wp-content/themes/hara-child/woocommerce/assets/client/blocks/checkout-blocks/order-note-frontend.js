"use strict";
(self.webpackChunkwebpackWcBlocksFrontendJsonp = self.webpackChunkwebpackWcBlocksFrontendJsonp || []).push([
	[1758], {
		8464: (e, o, r) => {
			r.r(o), r.d(o, {
				default: () => b
			});
			var t = r(9196),
				s = r(7608),
				c = r.n(s),
				a = r(5736),
				n = r(711),
				l = r(3251),
				d = r(9818),
				u = r(4801),
				i = r(9307);
			const h = ({
					disabled: e,
					onChange: o,
					placeholder: r,
					value: s
				}) => {
					const [c, l] = (0, i.useState)(!1), [d, u] = (0, i.useState)("");
					return (0, t.createElement)("div", {
						className: "wc-block-checkout__add-note"
					}, (0, t.createElement)(n.CheckboxControl, {
						disabled: e,
						label: (0, a.__)(" أضف ملاحظة إلى طلبك  ", "woocommerce"),
						checked: c,
						onChange: e => {
							l(e), e ? s !== d && o(d) : (o(""), u(s))
						}
					}), c && (0, t.createElement)(n.Textarea, {
						disabled: e,
						onTextChange: o,
						placeholder: r,
						value: s
					}))
				},
				b = ({
					className: e
				}) => {
					const {
						needsShipping: o
					} = (0, l.V)(), {
						isProcessing: r,
						orderNotes: s
					} = (0, d.useSelect)((e => {
						const o = e(u.CHECKOUT_STORE_KEY);
						return {
							isProcessing: o.isProcessing(),
							orderNotes: o.getOrderNotes()
						}
					})), {
						__internalSetOrderNotes: i
					} = (0, d.useDispatch)(u.CHECKOUT_STORE_KEY);
					return (0, t.createElement)(n.FormStep, {
						id: "order-notes",
						showStepNumber: !1,
						className: c()("wc-block-checkout__order-notes", e),
						disabled: r
					}, (0, t.createElement)(h, {
						disabled: r,
						onChange: i,
						placeholder: o ? (0, a.__)(" ملاحظات حول طلبك، على سبيل المثال. ملاحظات خاصة للتسليم .", "woocommerce") : (0, a.__)(" ملاحظات حول طلبك  .", "woocommerce"),
						value: s
					}))
				}
		}
	}
]);