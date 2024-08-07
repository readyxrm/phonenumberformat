//Format Phone Number
//ND - June 28, 2024
//Script to format phone number into specific format
//Last update: August 7, 2024

//JavaScript function to set the default value
function set_default(executionContext, phoneNumberField) {
  
    //Write to console log for troubleshooting
    console.log("Phone - set default v0.3");
    console.log(phoneNumberField);

    //get phone number attribute
    var formContext = executionContext.getFormContext();
    
    //get form type
    var formType = formContext.ui.getFormType();
    
    //get field to set
    var phoneNumber = formContext.getAttribute(phoneNumberField); 

    if(formType === 1) {
        try {    
            //set the default value of "+47"
            phoneNumber.setValue("+47 ");
        }
        catch(error) {
            console.log(error.message);
        }
    }

}

//Get phone number from form
function format_phonenumber(executionContext) {

    //Write to console log for troubleshooting
    console.log("Phone - format phone number v1.2");
    
    //get phone number attribute
    var formContext = executionContext.getFormContext();

    // Get attribute the event args
    //var eventArgs = executionContext.getEventArgs();
    // Get the name of the attribute that triggered the change event
    
    //debug
    //console.log(formContext.getEventSource().getName());
    var phoneNumberField = executionContext.getEventSource().getName();
    
    console.log(phoneNumberField);

    //get phone number field value
    var phoneNumber = formContext.getAttribute(phoneNumberField); 
    var phoneControl = formContext.getControl(phoneNumberField);
    
    phoneControl.clearNotification();
    
    var formattedPhoneNumber = formatPhoneNumber(phoneNumber.getValue(),phoneControl);

    
    switch (formattedPhoneNumber) {
        case 'cc':
            phoneControl.setNotification("Invalid country code");
            break;
        case 'ln':
            phoneControl.setNotification("Wrong number of digits for specific country code.");
            break;
        default:
            phoneNumber.setValue(formattedPhoneNumber);
            break;
        }
    
}


//Generic phone formatting function based on country codes


function formatPhoneNumber(phoneNumber, phoneControl) {

    //Write to console log for troubleshooting
    console.log("generic phone formatting function v0.6");

    // Remove any non-numeric characters from the phone number
    phoneNumber = phoneNumber.replace(/\D/g, '');

    // Define country codes and expected local number lengths

    const countryCodes = {
        "+1": { country: "North America", length: 10 }, // North America (Canada, USA, Bermuda)
        "+20": { country: "Egypt", length: 10 }, // Egypt
        "+27": { country: "South Africa", length: 9 },  // South Africa
        "+30": { country: "Greece", length: 10 }, // Greece
        "+31": { country: "Netherlands", length: 9 },  // Netherlands
        "+32": { country: "Belgium", length: 9 },  // Belgium
        "+33": { country: "France", length: 9 },  // France
        "+34": { country: "Spain", length: 9 },  // Spain
        "+36": { country: "Hungary", length: 9 },  // Hungary
        "+39": { country: "Italy", length: 10 }, // Italy
        "+40": { country: "Romania", length: 9 },  // Romania
        "+41": { country: "Switzerland", length: 9 },  // Switzerland
        "+44": { country: "United Kingdom", length: 10 }, // United Kingdom
        "+45": { country: "Denmark", length: 8 },  // Denmark
        "+46": { country: "Sweden", length: 9 },  // Sweden
        "+47": { country: "Norway", length: 8 },  // Norway
        "+48": { country: "Poland", length: 9 },  // Poland
        "+49": { country: "Germany", length: 10 }, // Germany
        "+51": { country: "Peru", length: 9 },  // Peru
        "+52": { country: "Mexico", length: 10 }, // Mexico
        "+54": { country: "Argentina", length: 10 }, // Argentina
        "+55": { country: "Brazil", length: 11 }, // Brazil
        "+56": { country: "Chile", length: 9 },  // Chile
        "+57": { country: "Colombia", length: 10 }, // Colombia
        "+58": { country: "Venezuela", length: 10 }, // Venezuela
        "+60": { country: "Malaysia", length: 9 },  // Malaysia
        "+61": { country: "Australia", length: 9 },  // Australia
        "+62": { country: "Indonesia", length: 10 }, // Indonesia
        "+63": { country: "Philippines", length: 10 }, // Philippines
        "+64": { country: "New Zealand", length: 9 },  // New Zealand
        "+65": { country: "Singapore", length: 8 },  // Singapore
        "+66": { country: "Thailand", length: 9 },  // Thailand
        "+81": { country: "Japan", length: 10 }, // Japan
        "+82": { country: "South Korea", length: 10 }, // South Korea
        "+84": { country: "Vietnam", length: 10 }, // Vietnam
        "+86": { country: "China", length: 11 }, // China
        "+90": { country: "Turkey", length: 10 }, // Turkey
        "+91": { country: "India", length: 10 }, // India
        "+92": { country: "Pakistan", length: 10 }, // Pakistan
        "+93": { country: "Afghanistan", length: 9 },  // Afghanistan
        "+94": { country: "Sri Lanka", length: 9 },  // Sri Lanka
        "+95": { country: "Myanmar", length: 9 },  // Myanmar
        "+98": { country: "Iran", length: 10 }, // Iran
        "+211": { country: "South Sudan", length: 9 }, // South Sudan
        "+212": { country: "Morocco", length: 9 }, // Morocco
        "+213": { country: "Algeria", length: 9 }, // Algeria
        "+216": { country: "Tunisia", length: 8 }, // Tunisia
        "+218": { country: "Libya", length: 9 }, // Libya
        "+220": { country: "Gambia", length: 7 }, // Gambia
        "+221": { country: "Senegal", length: 9 }, // Senegal
        "+222": { country: "Mauritania", length: 8 }, // Mauritania
        "+223": { country: "Mali", length: 8 }, // Mali
        "+224": { country: "Guinea", length: 9 }, // Guinea
        "+225": { country: "Ivory Coast", length: 8 }, // Ivory Coast
        "+226": { country: "Burkina Faso", length: 8 }, // Burkina Faso
        "+227": { country: "Niger", length: 8 }, // Niger
        "+228": { country: "Togo", length: 8 }, // Togo
        "+229": { country: "Benin", length: 8 }, // Benin
        "+230": { country: "Mauritius", length: 8 }, // Mauritius
        "+231": { country: "Liberia", length: 7 }, // Liberia
        "+232": { country: "Sierra Leone", length: 8 }, // Sierra Leone
        "+233": { country: "Ghana", length: 9 }, // Ghana
        "+234": { country: "Nigeria", length: 10 }, // Nigeria
        "+235": { country: "Chad", length: 8 }, // Chad
        "+236": { country: "Central African Republic", length: 8 }, // Central African Republic
        "+237": { country: "Cameroon", length: 9 }, // Cameroon
        "+238": { country: "Cape Verde", length: 7 }, // Cape Verde
        "+239": { country: "São Tomé and Príncipe", length: 7 }, // São Tomé and Príncipe
        "+240": { country: "Equatorial Guinea", length: 9 }, // Equatorial Guinea
        "+241": { country: "Gabon", length: 9 }, // Gabon
        "+242": { country: "Republic of the Congo", length: 9 }, // Republic of the Congo
        "+243": { country: "Democratic Republic of the Congo", length: 9 }, // Democratic Republic of the Congo
        "+244": { country: "Angola", length: 9 }, // Angola
        "+245": { country: "Guinea-Bissau", length: 7 }, // Guinea-Bissau
        "+246": { country: "British Indian Ocean Territory", length: 7 }, // British Indian Ocean Territory
        "+247": { country: "Ascension Island", length: 4 }, // Ascension Island
        "+248": { country: "Seychelles", length: 7 }, // Seychelles
        "+249": { country: "Sudan", length: 9 }, // Sudan
        "+250": { country: "Rwanda", length: 9 }, // Rwanda
        "+251": { country: "Ethiopia", length: 9 }, // Ethiopia
        "+252": { country: "Somalia", length: 7 }, // Somalia
        "+253": { country: "Djibouti", length: 6 }, // Djibouti
        "+254": { country: "Kenya", length: 9 }, // Kenya
        "+255": { country: "Tanzania", length: 9 }, // Tanzania
        "+256": { country: "Uganda", length: 9 }, // Uganda
        "+257": { country: "Burundi", length: 8 }, // Burundi
        "+258": { country: "Mozambique", length: 9 }, // Mozambique
        "+260": { country: "Zambia", length: 9 }, // Zambia
        "+261": { country: "Madagascar", length: 9 }, // Madagascar
        "+262": { country: "Réunion", length: 9 }, // Réunion
        "+263": { country: "Zimbabwe", length: 9 }, // Zimbabwe
        "+264": { country: "Namibia", length: 9 }, // Namibia
        "+265": { country: "Malawi", length: 9 }, // Malawi
        "+266": { country: "Lesotho", length: 8 }, // Lesotho
        "+267": { country: "Botswana", length: 8 }, // Botswana
        "+268": { country: "Eswatini", length: 8 }, // Eswatini
        "+269": { country: "Comoros", length: 7 }, // Comoros
        "+290": { country: "Saint Helena", length: 4 }, // Saint Helena
        "+291": { country: "Eritrea", length: 7 }, // Eritrea
        "+297": { country: "Aruba", length: 7 }, // Aruba
        "+298": { country: "Faroe Islands", length: 6 }, // Faroe Islands
        "+299": { country: "Greenland", length: 6 }, // Greenland
        "+350": { country: "Gibraltar", length: 8 }, // Gibraltar
        "+351": { country: "Portugal", length: 9 }, // Portugal
        "+352": { country: "Luxembourg", length: 9 }, // Luxembourg
        "+353": { country: "Ireland", length: 9 }, // Ireland
        "+354": { country: "Iceland", length: 7 }, // Iceland
        "+355": { country: "Albania", length: 9 }, // Albania
        "+356": { country: "Malta", length: 8 }, // Malta
        "+357": { country: "Cyprus", length: 8 }, // Cyprus
        "+358": { country: "Finland", length: 10 }, // Finland
        "+359": { country: "Bulgaria", length: 9 }, // Bulgaria
        "+370": { country: "Lithuania", length: 8 }, // Lithuania
        "+371": { country: "Latvia", length: 8 }, // Latvia
        "+372": { country: "Estonia", length: 8 }, // Estonia
        "+373": { country: "Moldova", length: 8 }, // Moldova
        "+374": { country: "Armenia", length: 8 }, // Armenia
        "+375": { country: "Belarus", length: 9 }, // Belarus
        "+376": { country: "Andorra", length: 6 }, // Andorra
        "+377": { country: "Monaco", length: 8 }, // Monaco
        "+378": { country: "San Marino", length: 9 }, // San Marino
        "+380": { country: "Ukraine", length: 9 }, // Ukraine
        "+381": { country: "Serbia", length: 9 }, // Serbia
        "+382": { country: "Montenegro", length: 8 }, // Montenegro
        "+383": { country: "Kosovo", length: 8 }, // Kosovo
        "+385": { country: "Croatia", length: 9 }, // Croatia
        "+386": { country: "Slovenia", length: 8 }, // Slovenia
        "+387": { country: "Bosnia and Herzegovina", length: 8 }, // Bosnia and Herzegovina
        "+389": { country: "North Macedonia", length: 8 }, // North Macedonia
        "+420": { country: "Czech Republic", length: 9 }, // Czech Republic
        "+421": { country: "Slovakia", length: 9 }, // Slovakia
        "+423": { country: "Liechtenstein", length: 7 }, // Liechtenstein
        "+500": { country: "Falkland Islands", length: 5 }, // Falkland Islands
        "+501": { country: "Belize", length: 7 }, // Belize
        "+502": { country: "Guatemala", length: 8 }, // Guatemala
        "+503": { country: "El Salvador", length: 8 }, // El Salvador
        "+504": { country: "Honduras", length: 8 }, // Honduras
        "+505": { country: "Nicaragua", length: 8 }, // Nicaragua
        "+506": { country: "Costa Rica", length: 8 }, // Costa Rica
        "+507": { country: "Panama", length: 8 }, // Panama
        "+508": { country: "Saint Pierre and Miquelon", length: 6 }, // Saint Pierre and Miquelon
        "+509": { country: "Haiti", length: 8 }, // Haiti
        "+590": { country: "Guadeloupe", length: 9 }, // Guadeloupe
        "+591": { country: "Bolivia", length: 8 }, // Bolivia
        "+592": { country: "Guyana", length: 7 }, // Guyana
        "+593": { country: "Ecuador", length: 9 }, // Ecuador
        "+594": { country: "French Guiana", length: 9 }, // French Guiana
        "+595": { country: "Paraguay", length: 9 }, // Paraguay
        "+596": { country: "Martinique", length: 9 }, // Martinique
        "+597": { country: "Suriname", length: 7 }, // Suriname
        "+598": { country: "Uruguay", length: 8 }, // Uruguay
        "+599": { country: "Curaçao", length: 7 }, // Curaçao
        "+670": { country: "East Timor", length: 7 }, // East Timor
        "+672": { country: "Norfolk Island", length: 6 }, // Norfolk Island
        "+673": { country: "Brunei", length: 7 }, // Brunei
        "+674": { country: "Nauru", length: 7 }, // Nauru
        "+675": { country: "Papua New Guinea", length: 8 }, // Papua New Guinea
        "+676": { country: "Tonga", length: 5 }, // Tonga
        "+677": { country: "Solomon Islands", length: 7 }, // Solomon Islands
        "+678": { country: "Vanuatu", length: 7 }, // Vanuatu
        "+679": { country: "Fiji", length: 7 }, // Fiji
        "+680": { country: "Palau", length: 7 }, // Palau
        "+681": { country: "Wallis and Futuna", length: 6 }, // Wallis and Futuna
        "+682": { country: "Cook Islands", length: 5 }, // Cook Islands
        "+683": { country: "Niue", length: 4 }, // Niue
        "+685": { country: "Samoa", length: 7 }, // Samoa
        "+686": { country: "Kiribati", length: 8 }, // Kiribati
        "+687": { country: "New Caledonia", length: 6 }, // New Caledonia
        "+688": { country: "Tuvalu", length: 5 }, // Tuvalu
        "+689": { country: "French Polynesia", length: 6 }, // French Polynesia
        "+690": { country: "Tokelau", length: 4 }, // Tokelau
        "+691": { country: "Micronesia", length: 7 }, // Micronesia
        "+692": { country: "Marshall Islands", length: 7 }, // Marshall Islands
        "+850": { country: "North Korea", length: 10 }, // North Korea
        "+852": { country: "Hong Kong", length: 8 }, // Hong Kong
        "+853": { country: "Macau", length: 8 }, // Macau
        "+855": { country: "Cambodia", length: 9 }, // Cambodia
        "+856": { country: "Laos", length: 9 }, // Laos
        "+880": { country: "Bangladesh", length: 10 }, // Bangladesh
        "+886": { country: "Taiwan", length: 9 }, // Taiwan
        "+960": { country: "Maldives", length: 7 }, // Maldives
        "+961": { country: "Lebanon", length: 8 }, // Lebanon
        "+962": { country: "Jordan", length: 9 }, // Jordan
        "+963": { country: "Syria", length: 9 }, // Syria
        "+964": { country: "Iraq", length: 10 }, // Iraq
        "+965": { country: "Kuwait", length: 8 }, // Kuwait
        "+966": { country: "Saudi Arabia", length: 9 }, // Saudi Arabia
        "+967": { country: "Yemen", length: 9 }, // Yemen
        "+968": { country: "Oman", length: 8 }, // Oman
        "+970": { country: "Palestine", length: 9 }, // Palestine
        "+971": { country: "United Arab Emirates", length: 9 }, // United Arab Emirates
        "+972": { country: "Israel", length: 9 }, // Israel
        "+973": { country: "Bahrain", length: 8 }, // Bahrain
        "+974": { country: "Qatar", length: 8 }, // Qatar
        "+975": { country: "Bhutan", length: 8 }, // Bhutan
        "+976": { country: "Mongolia", length: 8 }, // Mongolia
        "+977": { country: "Nepal", length: 10 }, // Nepal
        "+992": { country: "Tajikistan", length: 9 }, // Tajikistan
        "+993": { country: "Turkmenistan", length: 8 }, // Turkmenistan
        "+994": { country: "Azerbaijan", length: 9 }, // Azerbaijan
        "+995": { country: "Georgia", length: 9 }, // Georgia
        "+996": { country: "Kyrgyzstan", length: 9 }, // Kyrgyzstan
        "+998": { country: "Uzbekistan", length: 9 }  // Uzbekistan
    };


    // Determine the country code and format
    let prefix = null;
    let localNumber = null;
    let localNumberLength = null;

    for (let code in countryCodes) {
        if (phoneNumber.startsWith(code.replace('+', ''))) {
            prefix = code;
            localNumberLength = countryCodes[code].length;
            localNumber = phoneNumber.slice(code.length - 1); // Remove country code from number
            country = countryCodes[code].country;
            break;
        }
    }

    // If the country code is not found, return an error message
    if (!prefix) {
        return "cc"; //country code issue
    }

    // If the length of the local number does not match the expected length, return an error message
    if (localNumber.length !== localNumberLength) {
        return "ln"; //length
    }

    // Format the phone number
    let formattedPhoneNumber = prefix + " " + localNumber;
    
    //provide the user with information as to which country code has been set    
    phoneControl.addNotification({
        messages: [''+ country +''], 
        notificationLevel: 'RECOMMENDATION',
        uniqueID: 'phone_nofitication',
        actions: null
        });
  
    return formattedPhoneNumber;
}
