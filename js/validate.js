/*! jQuery Validation Plugin - v1.11.0 - 2/4/2013
 * https://github.com/jzaefferer/jquery-validation
 * Copyright (c) 2013 JÃ¶rn Zaefferer; Licensed MIT */
(function(e) {
    e.extend(e.fn, {
        validate: function(t) {
            if (!this.length) {
                t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.");
                return
            }
            var n = e.data(this[0], "validator");
            return n || (this.attr("novalidate", "novalidate"), n = new e.validator(t, this[0]), e.data(this[0], "validator", n), n.settings.onsubmit && (this.validateDelegate(":submit", "click", function(t) {
                n.settings.submitHandler && (n.submitButton = t.target), e(t.target).hasClass("cancel") && (n.cancelSubmit = !0)
            }), this.submit(function(t) {
                function s() {
                    var s;
                    return !n.settings.submitHandler || (n.submitButton && (s = e("<input type='hidden'/>").attr("name", n.submitButton.name).val(n.submitButton.value).appendTo(n.currentForm)), n.settings.submitHandler.call(n, n.currentForm, t), n.submitButton && s.remove(), !1)
                }
                return n.settings.debug && t.preventDefault(), n.cancelSubmit ? (n.cancelSubmit = !1, s()) : n.form() ? n.pendingRequest ? (n.formSubmitted = !0, !1) : s() : (n.focusInvalid(), !1)
            })), n)
        },
        valid: function() {
            if (e(this[0]).is("form")) return this.validate().form();
            var t = !0,
                n = e(this[0].form).validate();
            return this.each(function() {
                t &= n.element(this)
            }), t
        },
        removeAttrs: function(t) {
            var n = {},
                s = this;
            return e.each(t.split(/\s/), function(e, t) {
                n[t] = s.attr(t), s.removeAttr(t)
            }), n
        },
        rules: function(t, n) {
            if (s = this[0], t) {
                var s, o, r, l, a = e.data(s.form, "validator").settings,
                    c = a.rules,
                    i = e.validator.staticRules(s);
                switch (t) {
                    case "add":
                        e.extend(i, e.validator.normalizeRule(n)), c[s.name] = i, n.messages && (a.messages[s.name] = e.extend(a.messages[s.name], n.messages));
                        break;
                    case "remove":
                        return n ? (r = {}, e.each(n.split(/\s/), function(e, t) {
                            r[t] = i[t], delete i[t]
                        }), r) : (delete c[s.name], i)
                }
            }
            return o = e.validator.normalizeRules(e.extend({}, e.validator.classRules(s), e.validator.attributeRules(s), e.validator.dataRules(s), e.validator.staticRules(s)), s), o.required && (l = o.required, delete o.required, o = e.extend({
                required: l
            }, o)), o
        }
    }), e.extend(e.expr[":"], {
        blank: function(t) {
            return !e.trim("" + t.value)
        },
        filled: function(t) {
            return !!e.trim("" + t.value)
        },
        unchecked: function(e) {
            return !e.checked
        }
    }), e.validator = function(t, n) {
        this.settings = e.extend(!0, {}, e.validator.defaults, t), this.currentForm = n, this.init()
    }, e.validator.format = function(t, n) {
        return arguments.length === 1 ? function() {
            var n = e.makeArray(arguments);
            return n.unshift(t), e.validator.format.apply(this, n)
        } : (arguments.length > 2 && n.constructor !== Array && (n = e.makeArray(arguments).slice(1)), n.constructor !== Array && (n = [n]), e.each(n, function(e, n) {
            t = t.replace(new RegExp("\\{" + e + "\\}", "g"), function() {
                return n
            })
        }), t)
    }, e.extend(e.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: !0,
            errorContainer: e([]),
            errorLabelContainer: e([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(e) {
                this.lastActive = e, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(e)).hide())
            },
            onfocusout: function(e) {
                !this.checkable(e) && (e.name in this.submitted || !this.optional(e)) && this.element(e)
            },
            onkeyup: function(e, t) {
                if (t.which === 9 && this.elementValue(e) === "") return;
                (e.name in this.submitted || e === this.lastElement) && this.element(e)
            },
            onclick: function(e) {
                e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode)
            },
            highlight: function(t, n, s) {
                t.type === "radio" ? this.findByName(t.name).addClass(n).removeClass(s) : e(t).addClass(n).removeClass(s)
            },
            unhighlight: function(t, n, s) {
                t.type === "radio" ? this.findByName(t.name).removeClass(n).addClass(s) : e(t).removeClass(n).addClass(s)
            }
        },
        setDefaults: function(t) {
            e.extend(e.validator.defaults, t)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: e.validator.format("Please enter no more than {0} characters."),
            minlength: e.validator.format("Please enter at least {0} characters."),
            rangelength: e.validator.format("Please enter a value between {0} and {1} characters long."),
            range: e.validator.format("Please enter a value between {0} and {1}."),
            max: e.validator.format("Please enter a value less than or equal to {0}."),
            min: e.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function n(t) {
                    var n = e.data(this[0].form, "validator"),
                        s = "on" + t.type.replace(/^validate/, "");
                    n.settings[s] && n.settings[s].call(n, this[0], t)
                }
                this.labelContainer = e(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || e(this.currentForm), this.containers = e(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var t, s = this.groups = {};
                e.each(this.settings.groups, function(t, n) {
                    typeof n == "string" && (n = n.split(/\s/)), e.each(n, function(e, n) {
                        s[n] = t
                    })
                }), t = this.settings.rules, e.each(t, function(n, s) {
                    t[n] = e.validator.normalizeRule(s)
                }), e(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", n).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", n), this.settings.invalidHandler && e(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function() {
                return this.checkForm(), e.extend(this.submitted, this.errorMap), this.invalid = e.extend({}, this.errorMap), this.valid() || e(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var e = 0, t = this.currentElements = this.elements(); t[e]; e++) this.check(t[e]);
                return this.valid()
            },
            element: function(t) {
                t = this.validationTargetFor(this.clean(t)), this.lastElement = t, this.prepareElement(t), this.currentElements = e(t);
                var n = this.check(t) !== !1;
                return n ? delete this.invalid[t.name] : this.invalid[t.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), n
            },
            showErrors: function(t) {
                if (t) {
                    e.extend(this.errorMap, t), this.errorList = [];
                    for (var n in t) this.errorList.push({
                        message: t[n],
                        element: this.findByName(n)[0]
                    });
                    this.successList = e.grep(this.successList, function(e) {
                        return !(e.name in t)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                e.fn.resetForm && e(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(e) {
                var n, t = 0;
                for (n in e) t++;
                return t
            },
            hideErrors: function() {
                this.addWrapper(this.toHide).hide()
            },
            valid: function() {
                return this.size() === 0
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    e(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch {}
            },
            findLastActive: function() {
                var t = this.lastActive;
                return t && e.grep(this.errorList, function(e) {
                    return e.element.name === t.name
                }).length === 1 && t
            },
            elements: function() {
                var t = this,
                    n = {};
                return e(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    return !this.name && t.settings.debug && window.console && console.error("%o has no name assigned", this), !(this.name in n || !t.objectLength(e(this).rules())) && (n[this.name] = !0, !0)
                })
            },
            clean: function(t) {
                return e(t)[0]
            },
            errors: function() {
                var t = this.settings.errorClass.replace(" ", ".");
                return e(this.settings.errorElement + "." + t, this.errorContext)
            },
            reset: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = e([]), this.toHide = e([]), this.currentElements = e([])
            },
            prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(e) {
                this.reset(), this.toHide = this.errorsFor(e)
            },
            elementValue: function(t) {
                var s = e(t).attr("type"),
                    n = e(t).val();
                return s === "radio" || s === "checkbox" ? e("input[name='" + e(t).attr("name") + "']:checked").val() : typeof n == "string" ? n.replace(/\r/g, "") : n
            },
            check: function(t) {
                t = this.validationTargetFor(this.clean(t));
                var n, s, a, o = e(t).rules(),
                    i = !1,
                    r = this.elementValue(t);
                for (a in o) {
                    s = {
                        method: a,
                        parameters: o[a]
                    };
                    try {
                        if (n = e.validator.methods[a].call(this, r, t, s.parameters), n === "dependency-mismatch") {
                            i = !0;
                            continue
                        }
                        if (i = !1, n === "pending") {
                            this.toHide = this.toHide.not(this.errorsFor(t));
                            return
                        }
                        if (!n) return this.formatAndAdd(t, s), !1
                    } catch (e) {
                        throw this.settings.debug && window.console && console.log("Exception occured when checking element " + t.id + ", check the '" + s.method + "' method.", e), e
                    }
                }
                if (i) return;
                return this.objectLength(o) && this.successList.push(t), !0
            },
            customDataMessage: function(t, n) {
                return e(t).data("msg-" + n.toLowerCase()) || t.attributes && e(t).attr("data-msg-" + n.toLowerCase())
            },
            customMessage: function(e, t) {
                var n = this.settings.messages[e];
                return n && (n.constructor === String ? n : n[t])
            },
            findDefined: function() {
                for (var e = 0; e < arguments.length; e++)
                    if (arguments[e] !== void 0) return arguments[e]
            },
            defaultMessage: function(t, n) {
                return this.findDefined(this.customMessage(t.name, n), this.customDataMessage(t, n), !this.settings.ignoreTitle && t.title || void 0, e.validator.messages[n], "<strong>Warning: No message defined for " + t.name + "</strong>")
            },
            formatAndAdd: function(t, n) {
                var s = this.defaultMessage(t, n.method),
                    o = /\$?\{(\d+)\}/g;
                typeof s == "function" ? s = s.call(this, n.parameters, t) : o.test(s) && (s = e.validator.format(s.replace(o, "{$1}"), n.parameters)), this.errorList.push({
                    message: s,
                    element: t
                }), this.errorMap[t.name] = s, this.submitted[t.name] = s
            },
            addWrapper: function(e) {
                return this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper))), e
            },
            defaultShowErrors: function() {
                for (e = 0; this.errorList[e]; e++) {
                    var e, t, n = this.errorList[e];
                    this.settings.highlight && this.settings.highlight.call(this, n.element, this.settings.errorClass, this.settings.validClass), this.showLabel(n.element, n.message)
                }
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (e = 0; this.successList[e]; e++) this.showLabel(this.successList[e]);
                if (this.settings.unhighlight)
                    for (e = 0, t = this.validElements(); t[e]; e++) this.settings.unhighlight.call(this, t[e], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return e(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(t, n) {
                var s = this.errorsFor(t);
                s.length ? (s.removeClass(this.settings.validClass).addClass(this.settings.errorClass), s.html(n)) : (s = e("<" + this.settings.errorElement + ">").attr("for", this.idOrName(t)).addClass(this.settings.errorClass).html(n || ""), this.settings.wrapper && (s = s.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(s).length || (this.settings.errorPlacement ? this.settings.errorPlacement(s, e(t)) : s.insertAfter(t))), !n && this.settings.success && (s.text(""), typeof this.settings.success == "string" ? s.addClass(this.settings.success) : this.settings.success(s, t)), this.toShow = this.toShow.add(s)
            },
            errorsFor: function(t) {
                var n = this.idOrName(t);
                return this.errors().filter(function() {
                    return e(this).attr("for") === n
                })
            },
            idOrName: function(e) {
                return this.groups[e.name] || (this.checkable(e) ? e.name : e.id || e.name)
            },
            validationTargetFor: function(e) {
                return this.checkable(e) && (e = this.findByName(e.name).not(this.settings.ignore)[0]), e
            },
            checkable: function(e) {
                return /radio|checkbox/i.test(e.type)
            },
            findByName: function(t) {
                return e(this.currentForm).find("[name='" + t + "']")
            },
            getLength: function(t, n) {
                switch (n.nodeName.toLowerCase()) {
                    case "select":
                        return e("option:selected", n).length;
                    case "input":
                        if (this.checkable(n)) return this.findByName(n.name).filter(":checked").length
                }
                return t.length
            },
            depend: function(e, t) {
                return !this.dependTypes[typeof e] || this.dependTypes[typeof e](e, t)
            },
            dependTypes: {
                boolean: function(e) {
                    return e
                },
                string: function(t, n) {
                    return !!e(t, n.form).length
                },
                function: function(e, t) {
                    return e(t)
                }
            },
            optional: function(t) {
                var n = this.elementValue(t);
                return !e.validator.methods.required.call(this, n, t) && "dependency-mismatch"
            },
            startRequest: function(e) {
                this.pending[e.name] || (this.pendingRequest++, this.pending[e.name] = !0)
            },
            stopRequest: function(t, n) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[t.name], n && this.pendingRequest === 0 && this.formSubmitted && this.form() ? (e(this.currentForm).submit(), this.formSubmitted = !1) : !n && this.pendingRequest === 0 && this.formSubmitted && (e(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(t) {
                return e.data(t, "previousValue") || e.data(t, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(t, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(t, n) {
            t.constructor === String ? this.classRuleSettings[t] = n : e.extend(this.classRuleSettings, t)
        },
        classRules: function(t) {
            var n = {},
                s = e(t).attr("class");
            return s && e.each(s.split(" "), function() {
                this in e.validator.classRuleSettings && e.extend(n, e.validator.classRuleSettings[this])
            }), n
        },
        attributeRules: function(t) {
            var n, o, s = {},
                i = e(t);
            for (o in e.validator.methods) o === "required" ? (n = i.get(0).getAttribute(o), n === "" && (n = !0), n = !!n) : n = i.attr(o), n ? s[o] = n : i[0].getAttribute("type") === o && (s[o] = !0);
            return s.maxlength && /-1|2147483647|524288/.test(s.maxlength) && delete s.maxlength, s
        },
        dataRules: function(t) {
            var n, s, o = {},
                i = e(t);
            for (n in e.validator.methods) s = i.data("rule-" + n.toLowerCase()), s !== void 0 && (o[n] = s);
            return o
        },
        staticRules: function(t) {
            var n = {},
                s = e.data(t.form, "validator");
            return s.settings.rules && (n = e.validator.normalizeRule(s.settings.rules[t.name]) || {}), n
        },
        normalizeRules: function(t, n) {
            return e.each(t, function(s, o) {
                if (o === !1) {
                    delete t[s];
                    return
                }
                if (o.param || o.depends) {
                    var i = !0;
                    switch (typeof o.depends) {
                        case "string":
                            i = !!e(o.depends, n.form).length;
                            break;
                        case "function":
                            i = o.depends.call(n, n)
                    }
                    i ? t[s] = o.param === void 0 || o.param : delete t[s]
                }
            }), e.each(t, function(s, o) {
                t[s] = e.isFunction(o) ? o(n) : o
            }), e.each(["minlength", "maxlength"], function() {
                t[this] && (t[this] = Number(t[this]))
            }), e.each(["rangelength"], function() {
                var n;
                t[this] && (e.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : typeof t[this] == "string" && (n = t[this].split(/[\s,]+/), t[this] = [Number(n[0]), Number(n[1])]))
            }), e.validator.autoCreateRanges && (t.min && t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), t.minlength && t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t
        },
        normalizeRule: function(t) {
            if (typeof t == "string") {
                var n = {};
                e.each(t.split(/\s/), function() {
                    n[this] = !0
                }), t = n
            }
            return t
        },
        addMethod: function(t, n, s) {
            e.validator.methods[t] = n, e.validator.messages[t] = s !== void 0 ? s : e.validator.messages[t], n.length < 3 && e.validator.addClassRules(t, e.validator.normalizeRule(t))
        },
        methods: {
            required: function(t, n, s) {
                if (!this.depend(s, n)) return "dependency-mismatch";
                if (n.nodeName.toLowerCase() === "select") {
                    var o = e(n).val();
                    return o && o.length > 0
                }
                return this.checkable(n) ? this.getLength(t, n) > 0 : e.trim(t).length > 0
            },
            remote: function(t, n, s) {
                if (this.optional(n)) return "dependency-mismatch";
                var o, a, i = this.previousValue(n);
                return this.settings.messages[n.name] || (this.settings.messages[n.name] = {}), i.originalMessage = this.settings.messages[n.name].remote, this.settings.messages[n.name].remote = i.message, s = typeof s == "string" && {
                    url: s
                } || s, i.old === t ? i.valid : (i.old = t, o = this, this.startRequest(n), a = {}, a[n.name] = t, e.ajax(e.extend(!0, {
                    url: s,
                    mode: "abort",
                    port: "validate" + n.name,
                    dataType: "json",
                    data: a,
                    success: function(s) {
                        if (o.settings.messages[n.name].remote = i.originalMessage, a = s === !0 || s === "true", a) c = o.formSubmitted, o.prepareElement(n), o.formSubmitted = c, o.successList.push(n), delete o.invalid[n.name], o.showErrors();
                        else {
                            var a, c, l = {},
                                r = s || o.defaultMessage(n, "remote");
                            l[n.name] = i.message = e.isFunction(r) ? r(t) : r, o.invalid[n.name] = !0, o.showErrors(l)
                        }
                        i.valid = a, o.stopRequest(n, a)
                    }
                }, s)), "pending")
            },
            minlength: function(t, n, s) {
                var o = e.isArray(t) ? t.length : this.getLength(e.trim(t), n);
                return this.optional(n) || o >= s
            },
            maxlength: function(t, n, s) {
                var o = e.isArray(t) ? t.length : this.getLength(e.trim(t), n);
                return this.optional(n) || o <= s
            },
            rangelength: function(t, n, s) {
                var o = e.isArray(t) ? t.length : this.getLength(e.trim(t), n);
                return this.optional(n) || o >= s[0] && o <= s[1]
            },
            min: function(e, t, n) {
                return this.optional(t) || e >= n
            },
            max: function(e, t, n) {
                return this.optional(t) || e <= n
            },
            range: function(e, t, n) {
                return this.optional(t) || e >= n[0] && e <= n[1]
            },
            email: function(e, t) {
                return this.optional(t) || /^((([a-z]|\d|[!#$%&'*+\-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#$%&'*+\-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(e)
            },
            url: function(e, t) {
                return this.optional(t) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|\/|\?)*)?$/i.test(e)
            },
            date: function(e, t) {
                return this.optional(t) || !/Invalid|NaN/.test(new Date(e).toString())
            },
            dateISO: function(e, t) {
                return this.optional(t) || /^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/.test(e)
            },
            number: function(e, t) {
                return this.optional(t) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
            },
            digits: function(e, t) {
                return this.optional(t) || /^\d+$/.test(e)
            },
            creditcard: function(e, t) {
                if (this.optional(t)) return "dependency-mismatch";
                if (/[^0-9 -]+/.test(e)) return !1;
                var s, a, i = 0,
                    n = 0,
                    o = !1;
                e = e.replace(/\D/g, "");
                for (s = e.length - 1; s >= 0; s--) a = e.charAt(s), n = parseInt(a, 10), o && (n *= 2) > 9 && (n -= 9), i += n, o = !o;
                return i % 10 === 0
            },
            equalTo: function(t, n, s) {
                var o = e(s);
                return this.settings.onfocusout && o.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    e(n).valid()
                }), t === o.val()
            }
        }
    }), e.format = e.validator.format
})(jQuery),
function(e) {
    var n, t = {};
    e.ajaxPrefilter ? e.ajaxPrefilter(function(e, n, s) {
        var o = e.port;
        e.mode === "abort" && (t[o] && t[o].abort(), t[o] = s)
    }) : (n = e.ajax, e.ajax = function(s) {
        var i = ("mode" in s ? s : e.ajaxSettings).mode,
            o = ("port" in s ? s : e.ajaxSettings).port;
        return i === "abort" ? (t[o] && t[o].abort(), t[o] = n.apply(this, arguments)) : n.apply(this, arguments)
    })
}(jQuery),
function(e) {
    e.extend(e.fn, {
        validateDelegate: function(t, n, s) {
            return this.bind(n, function(n) {
                var o = e(n.target);
                if (o.is(t)) return s.apply(o, arguments)
            })
        }
    })
}(jQuery)