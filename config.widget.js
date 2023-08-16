const scriptConfig = document.getElementById('script-config');

const urlDomain = scriptConfig.getAttribute('domain-konecta');

const moduleConfig = await import(urlDomain + 'js/const.widget.js')

const { intervalTimeControl, timeControl, validateCallbackTime,
    ShowIp, validateName, validateCellPhone, addDataToInputCustom,
    validatePolicies, validateDoc, validateCity, validateEmail, customValidate
} = await import(urlDomain + 'js/function.widget.js')

import {
    JsonParamValidate
} from 'http://127.0.0.1:5501/js/model/JsonParamValidate.min.js';

$(function () {
    if (!window._genesys) window._genesys = {};
    if (!window._gt) window._gt = [];

    /**
    * Arreglo para construccion del widget y las funcionalidades del chat
    * 
    * @date 12/12/2022
    * @author Carolina Arias
    */
    window._genesys.widgets = {
        main: {
            debug: false,
            theme: "light",
            i18n: urlDomain + "js/lang.json",
            lang: "es",
            actionsMenu: true,
            mobileMode: 'auto',
            mobileModeBreakpoint: 600
        },
        calendar: {
            showAvailability: true,
            numberOfDays: 5,
            hideUnavailableTimeSlots: false,
            calendarHours: {
                interval: 5
            }
        },
        callback: {
            apikey: '',
            dataURL: moduleConfig.config.urlSkill,
            userData: {},
            countryCodes: false,
            immediateCallback: true,
            scheduledCallback: false,
            sync: true,
            ewt: {
                display: true,
                queue: '',
                threshold: 2000,
                immediateCallback: {
                    thresholdMin: 1000,
                    thresholdMax: 3000
                }
            },
            form: {
                wrapper: `
                    <div>
                        <div class="shedule-konecta"></div>
                        <div class="mb-konecta-20 background-konecta">
                            Por favor ingresar la siguiente información:
                        </div>
                    </div>
                    `,
                inputs: [
                    {
                        id: "cx_form_callback_call_direction",
                        name: "_call_direction",
                        type: "hidden",
                        value: "USERTERMINATED"
                    },
                    {
                        id: "cx_form_callback_phone_number_upper",
                        name: "PhoneNumber",
                        type: "hidden",
                        value: "",
                        validate: true
                    },
                    {
                        id: "cx_form_callback_subject",
                        name: "Subject",
                        maxlength: "100",
                        type: "hidden",
                        value: "EbWebCallBackArgos"
                    },
                    {
                        id: "cx_form_callback_firstname",
                        maxlength: "50",
                        name: "FirstName",
                        placeholder: "Nombre completo: *",
                        label: "Nombre completo: *",
                        span: "cx-error",
                        validateWhileTyping: false,
                        wrapper: moduleConfig.config.inputWrapper,
                        validate: event => {
                            if (event != 0) {
                                return validateName("cx_form_callback_firstname", "alertnamedv");
                            }
                        }
                    },
                    {
                        id: "cx_form_callback_doc",
                        maxlength: "15",
                        name: "Identify",
                        placeholder: "Identificación: *",
                        label: "Identificación: *",
                        span: "cx-error",
                        validateWhileTyping: false,
                        wrapper: moduleConfig.config.inputWrapper,
                        validate: event => {
                            if (event != 0) {
                                return validateDoc();
                            }
                        }
                    },
                    {
                        id: "cx_form_callback_ciudad",
                        name: "City",
                        maxlength: "50",
                        placeholder: "Ciudad: *",
                        label: "Ciudad: *",
                        span: "cx-error",
                        validateWhileTyping: false,
                        wrapper: moduleConfig.config.inputWrapper,
                        validate: event => {
                            if (event != 0) {
                                return validateCity("cx_form_callback_ciudad", "alertcitydv");
                            }
                        }
                    },
                    {
                        id: "cx_form_callback_email",
                        name: "EmailAddress",
                        maxlength: "50",
                        placeholder: "Correo Electrónico: *",
                        label: "Correo Electrónico: *",
                        span: "cx-error",
                        validateWhileTyping: false,
                        wrapper: moduleConfig.config.inputWrapper,
                        validate: event => {
                            if (event != 0) {
                                return validateEmail('cx_form_callback_email');
                            }
                        }
                    },
                    {
                        id: "cx_form_callback_indicative",
                        maxlength: "100",
                        name: "indicative",
                        type: "select",
                        wrapper: `
                            <div class='row'>
                                <div class='col-konecta col-konecta-3'>
                                    {input}
                                </div>
                            </div>`,
                        options: moduleConfig.config.arrayIndicative,
                        span: "cx-error",
                        validate: function (event) {
                            if (event !== 0) {
                                return true;
                            }
                        }
                    },
                    {
                        id: "cx_form_callback_phone",
                        name: "phonenumber",
                        maxlength: "14",
                        placeholder: "Número Telefónico (con indicativo): *",
                        label: "Número Telefónico <br>(con indicativo): *",
                        span: "cx-error",
                        validateWhileTyping: false,
                        wrapper: `
                            <div class='row wrapper-phone-number'>
                                <div class='col-konecta col-konecta-6'>
                                    {input}
                                </div>
                            </div>`,
                        validate: event => {
                            if (event != 0) {
                                return validateCellPhone("cx_form_callback_phone");
                            }
                        },
                        onkeypress: function (event) {
                            return (event.charCode >= 48 && event.charCode <= 57)
                                || (event.charCode == 43);
                        }
                    },
                    {
                        id: "cx_form_callback_ext",
                        name: "ext",
                        maxlength: "4",
                        placeholder: "Ext",
                        label: "Número Telefónico <br>(con indicativo): *",
                        span: "cx-error",
                        validateWhileTyping: false,
                        wrapper: `
                            <div class='row'>
                                <div class='col-konecta col-konecta-3'>
                                    {input}
                                </div>
                            </div>`,
                        validate: event => {
                            if (event != 0) {
                                return true;
                            }
                        },
                        onkeypress: function (event) {
                            return (event.charCode >= 48 && event.charCode <= 57) ||
                                (event.charCode == 43);
                        }
                    },
                    {
                        id: "cx_form_callback_subject",
                        name: "Tema",
                        type: "textarea",
                        maxlength: "100",
                        placeholder: "Asunto: *",
                        label: "Asunto: *",
                        wrapper: moduleConfig.config.inputWrapper,
                        validate: event => {
                            if (event != 0) {
                                const jsonParamValidate = new JsonParamValidate();
                                jsonParamValidate.input = 'cx_form_callback_subject';
                                jsonParamValidate.name = 'alertnamedv';
                                jsonParamValidate.minLength = 1;
                                jsonParamValidate.maxLength = 50;
                                jsonParamValidate.message = `
                                    Introduce un asunto valido, recuerda que este campo debe 
                                    contener solo texto, mínimo 1 caracter y maximo 50 caracteres
                                `;
                                return customValidate(jsonParamValidate);
                            }
                        }
                    },
                    {
                        id: "cx_form_callback_callbackTime",
                        maxlength: "100",
                        name: "callbackTime",
                        type: "select",
                        wrapper: moduleConfig.config.inputWrapper,
                        options: moduleConfig.config.arrayCalbackTime,
                        span: "cx-error",
                        validate: function (event) {
                            if (event !== 0) {
                                return validateCallbackTime(
                                    "cx_form_callback_callbackTime",
                                    "alertnametime"
                                );

                            }
                        }
                    },
                    {
                        id: "cx_webchat_form_politicas",
                        name: "sitio",
                        type: "checkbox",
                        span: "cx-error",
                        value: "true",
                        label: `
                            He leído y autorizo el <a href='${moduleConfig.config.urlPolicies}' 
                            title='Términos y Condciones' target='_blank'>
                                tratamiento de datos personales</a>`,
                        validate: event => {
                            if (event != 0) { return validatePolicies(event); }
                        }
                    }
                ]
            }
        }
    };

    if (!window._genesys.widgets.extensions) {
        window._genesys.widgets.extensions = {};
    }

    /**
    * Funcion para la creacion de una extencion del widget para poder ejecutar comandos
    * y suscribirse a los eventos
    * 
    * @date 12/12/2022
    * @author Carolina Arias
    */
    window._genesys.widgets.extensions["MyPlugin"] = () => {

        let oMyPlugin = window._genesys.widgets.bus.registerPlugin('MyPlugin');

        oMyPlugin.subscribe('Callback.opened', function () {

            const titleBar = document.querySelector('.cx-titlebar .cx-icon');
            const divIcon = document.createElement('div');
            divIcon.className = 'wrapper-icon-konecta-argos';
            divIcon.innerHTML = '<div class="icon-konecta-argos"></div>';
            titleBar.before(divIcon);

            timeControl().then(scheduleValid => {
                if (!scheduleValid.booleanValid) {
                    $('.cx-callback .cx-body').html(moduleConfig.config.htmlTimeControl);
                    $('.cx-callback').addClass('controlHorario');
                } else {
                    $('#cx_form_callback_firstname').focus();
                    ShowIp();
                    intervalTimeControl(scheduleValid.intMiliseg);

                    const wrapperPhone = document.querySelector('.wrapper-phone-number');
                    const cx_form_callback_phone = document
                        .getElementById('cx_form_callback_phone').parentNode;
                    const cx_form_callback_ext = document
                        .getElementById('cx_form_callback_ext').parentNode;
                    const inputIndicative = document
                        .getElementById('cx_form_callback_indicative').parentNode;
                    cx_form_callback_phone.before(inputIndicative);
                    wrapperPhone.append(cx_form_callback_ext);
                    addDataToInputCustom();
                }
            });
        });

        $("body").on('change', '#cx_form_callback_phone_number', function () {
            $('#cx_form_callback_phone_number_upper')
                .val($('#cx_form_callback_phone_number')[0].value);
        });


        $("body").on("click", "#item-chat", () => {
            moduleConfig.config.subject = 'EbCallback';
            oMyPlugin.command('Callback.open');
            $('#menu').hide();
        });
    };

    /**
    * Ajax setup para agregar los encabezados a todas las peticiones
    * 
    * @date 07/12/2021
    * @author Maycol David Sánchez Mora
    */
    $.ajaxSetup({
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Cache-Control", "must-revalidate, no-cache, no-store, private");
            xhr.setRequestHeader("Pragma", "no-cache");
        }
    });

    /**
    * Eventos keyup, click y change jquery para validar los tipos de datos
    * (Si es numerico solo permitira ingresar numeros) y para realizar funciones y procedimientos
    * 
    * @date 03/02/2022
    * @author Maycol David Sánchez Mora
    */
    $("body").on('keyup', '#cx_sendmessage_form_phone', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    }).on('keyup', '#cx_sendmessage_form_doc', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    }).on('change', '#cx_sendmessage_form_type_doc', function () {
        if (this.value != 'Otro') {
            $('.div-typeDocu').removeClass("show");
        } else {
            $('.div-typeDocu').addClass("show");
        }
    }).on('keyup', '#cx_form_callback_doc', function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });

    $("body").on('change', '#cx_form_callback_desired_callback', function () {
        let now = new Date(Date.now());

        now.setUTCMinutes(
            now.getUTCMinutes() + parseInt($('#cx_form_callback_desired_callback')[0].value)
        );

        const updatedDate = new Date(now);
        const year = updatedDate.getUTCFullYear();
        const month = updatedDate.getUTCMonth() + 1;
        const day = updatedDate.getUTCDate();
        const hours = updatedDate.getUTCHours();
        const minutes = updatedDate.getUTCMinutes();
        const seconds = updatedDate.getUTCSeconds();
        const milliseconds = updatedDate.getUTCMilliseconds();
        const desiredTime =
            `${year}-${month.toString().padStart(2, '0')}
                -${day.toString().padStart(2, '0')}T
                ${hours.toString().padStart(2, '0')}:
                ${minutes.toString().padStart(2, '0')}:
                ${seconds.toString().padStart(2, '0')}.
                ${milliseconds.toString().padStart(3, '0')}Z`;

        $('#cx_form_callback_desired_time').val(desiredTime);
    });

    /**
    * Funcion para la creacion dinamica de los script y css necesarios para el chat
    * 
    * @date 07/12/2021
    * @author Maycol David Sánchez Mora
    */
    (function (o) {
        let f = function () {
            let d = o.location;
            o.aTags = o.aTags || [];
            o.aTags.forEach(oTag => {
                let fs = d.getElementsByTagName(oTag.type)[0], e;
                if (!d.getElementById(oTag.id)) {
                    e = d.createElement(oTag.type);
                    e.id = oTag.id;
                }
                if (oTag.type == "script") {
                    e.src = oTag.path;
                }
                else {
                    e.type = 'text/css'; e.rel = 'stylesheet'; e.href = oTag.path;
                }
                if (fs) {
                    fs.parentNode.insertBefore(e, fs);
                } else {
                    d.head.appendChild(e);
                }
            });
        }, ol = window.onload;
        if (o.onload) {
            typeof window.onload != "function" ?
                window.onload = f : window.onload = function () {
                    ol();
                    f();
                };
        }
        else f();
    })({
        location: document,
        onload: false,
        aTags: [
            {
                type: "script",
                id: "genesys-cx-widget-script",
                path: moduleConfig.config.urlDomainExt + "genesys/js/widgets.min.js"
            },
            {
                type: "link",
                id: "widget-chats-styles",
                path: urlDomain + "css/custom.form.min.css"
            },
            {
                type: "link",
                id: "genesys-cx-widget-styles",
                path: moduleConfig.config.urlDomainExt + "genesys/css/widgets.min.css"
            },
            {
                type: "link",
                id: "widget-rows-styles",
                path: urlDomain + "css/rows.min.css"
            },
            {
                type: "link",
                id: "widget-icons-styles",
                path: urlDomain + "css/icons.min.css"
            },
            {
                type: "link",
                id: "widget-webcallback-styles",
                path: urlDomain + "css/webcallback.min.css"
            }
        ]
    });

});