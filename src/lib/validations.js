export function isCedula(num) {
    if (num.length == 10) {
        let sum = 0;
        let cedula = num.split("");
        for (let i = 0; i < cedula.length; i++) {
            let temp = parseInt(cedula[i]);
            if (i % 2 == 0) {
                if (temp * 2 > 9) {
                    sum += temp * 2 - 9;
                } else {
                    sum += temp * 2;
                }
            } else {
                sum += temp;
            }
        }
        if (sum % 10 == 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export function isEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}

export function isUrl(url) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
}

export function isOtherUrl(url) {
    const urlRegex = /^(tel|mailto):[^ "]+$/;
    return urlRegex.test(url);
}

export function ObjectToFormdata(object) {
    var formData = new FormData();
    for (let key in object) {
        formData.append(key, object[key]);
    }
    return formData;
}

export function formdataToObject(formData) {
    var object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    return object;
}

export function setValuesForm(values, $form, interval = 0) {
    setTimeout(() => {
        for (let key in values) {
            if ($form[key]) {
                // if file not set value
                if ($form[key].type == "file") continue;
                $form[key].value = values[key];
            }
        }
    }, interval);
}

export function getValuesForm($form) {
    let values = {};
    for (let key in $form) {
        if ($form[key]) {
            // if file not set value
            if ($form[key].type == "file") continue;
            values[key] = $form[key].value;
        }
    }
    return values;
}

export function getValuesFormdata($form) {
    let values = {};
    for (let key in $form) {
        if ($form[key]) {
            // include files
            if ($form[key].type == "file") {
                values[key] = $form[key].files[0];
                continue;
            }
            values[key] = $form[key].value;
        }
    }
    return values;
}

export function isValidateRequired($form, notRequired = []) {
    const fails = [];
    let isValidate = true;
    const inputs = $form.querySelectorAll("input,select,textarea");
    inputs.forEach((input) => {
        if (input.required && !notRequired.includes(input.name)) {
            if (!input.value) {
                isValidate = false;
                fails.push(input.name);
                // set class error
            }
        }
    });
    return { isValidate, fails };
}

export function resetForm($form) {
    $form.reset();
}

export function getFormDataFieldsNotVoid($form) {
    const formData = new FormData($form);
    const formDataFieldsNotVoid = new FormData();
    for (let [key, value] of formData.entries()) {
        if (value) {
            formDataFieldsNotVoid.append(key, value);
        }
    }
    return formDataFieldsNotVoid;
}
