var globe = {}

globe.getDate = function () {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    curr_month++;
    if (curr_month < 10) {
        curr_month = "0" + curr_month;
    }
    var curr_year = d.getFullYear();
    curr_date = curr_date + "/" + curr_month + "/" + curr_year;
    return curr_date;
}

globe.getExpertiseWithComma = function (items) {
    var text = "";
    angular.forEach(items, function (item) {
        text = text + item + ",";
    });
    var index = text.lastIndexOf(',');
    var text = text.substring(0, index);
    return text;
}


globe.shortText = function (text, index) {
    text = text.substring(0, index);
    text = text + "...";
    return text;
}

globe.getExtension = function (fileType) {
    var extension = fileType
    var extensions = ["image/jpeg", "image/png", ]
    var result = "fail"
    for (var i = 0; i < extensions.length; i++) {
        if (extension == extensions[i]) {
            result = "success"
            break;
        }
    }
    return result;
}

globe.getExtensionForCertificate = function (fileType) {

    var extension = fileType;
    var extensions = ["text/html", "image/jpeg", "image/png", "application/pdf", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
    for (var i = 0; i < extensions.length; i++) {

        if (extension == extensions[i]) {
            if (extension == "image/jpeg" || extension == "image/png") {
                return "jpg"
            } else if (extension == "image/png") {
                return "jpg";
            } else if (extension == "application/pdf") {
                return "pdf";
            } else if (extension == "text/plain") {
                return "txt";
            } else if (extension == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                return "doc";
            } else if (extension == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                return "xls";
            } else if (extension == "text/html") {
                return "html";
            }

        }
    }
}

globe.convertSeoPath = function (item) {

    item = item.split('İ').join('i');
    item = item.split('Ö').join('ö');
    item = item.split('Ü').join('ü');
    item = item.split(' ').join('-');
    item = item.split(',').join('');
    item = item.split("'").join('');
    item = item.split(':').join('');
    item = item.split(';').join('');
    item = item.split('?').join('-');
    item = item.split('ç').join('c');
    item = item.split('ğ').join('g');
    item = item.split('ı').join('i');
    item = item.split('ö').join('o');
    item = item.split('ü').join('u');
    item = item.split('ş').join('s');
    item = item.split('#').join('-');
    item = item.split('!').join('');
    item = item.toLowerCase();
    return item;

}

globe.convertToTelFormat = function (item) {

    item = item.split(' ').join('-');
    return item;

}

globe.GetValueById = function (id) {
    var value = $('#' + id).val();
    return value;

}
globe.SetValueById = function (id, item) {
    $('#' + id).val(item);
}

globe.GetValueByNameForSelect = function (name) {
    var value = $("select[name=" + name + "]").val();
    return value;
}

globe.SetValueByNameForSelect = function (name, value) {
    $("select[name=" + name + "]").val(value);
}

globe.GetCityStateCountryAndCode = function (results) {

    var country = null,
        countryCode = null,
        city = null,
        cityAlt = null;
    var c, lc, component;


    for (var r = 0, rl = results.length; r < rl; r += 1) {
        var result = results[r];
        if (!city && result.types[0] === 'administrative_area_level_1') {
            for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                component = result.address_components[c];
                if (component.types[0] === 'administrative_area_level_1') {
                    city = component.long_name;
                    break;
                }
            }
        } else if (!cityAlt && result.types[0] === 'administrative_area_level_2') {
            for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                component = result.address_components[c];

                if (component.types[0] === 'administrative_area_level_2') {
                    cityAlt = component.long_name;
                    break;
                }
            }
        } else if (!country && result.types[0] === 'country') {
            country = result.address_components[0].long_name;
            countryCode = result.address_components[0].short_name;
        }
        if (city && country) {
            break;
        }
    }

    var item = {
        City: city,
        State: cityAlt,
        Country: country,
        CountryCode: countryCode,
        SearchCity: globe.convertSeoPath(city),
        SearchState: globe.convertSeoPath(cityAlt)
    }
    return item;
}