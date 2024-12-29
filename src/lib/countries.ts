export const REGIONS = ["africa", "america", "asia", "europe", "oceania"] as const;

export const SUBREGIONS = [
	"north-america",
	"south-america",
	"central-america",
	"carribean",
	"eu",
	"ex-ussr",
	"ex-yugos",
	"baltic",
	"middle-east",
	"north-africa",
] as const;

export type Region = (typeof REGIONS)[number];
export type Subregion = (typeof SUBREGIONS)[number];
export type CountryName = string;
export type CountryCode = string;
export type DialCode = string;
export type Format = string | undefined;
export type Priority = number | undefined;
export type AreaCodes = string[] | undefined;

export type Country = {
	name: CountryName;
	regions: [Region, ...(Subregion | Region)[]];
	code: CountryCode;
	dialCode: DialCode;
	format?: Format;
	priority?: Priority;
	areaCodes?: AreaCodes;
};

export const COUNTRIES = [
	{
		name: "Afghanistan",
		regions: ["asia"],
		code: "af",
		dialCode: "93",
	},
	{
		name: "Albania",
		regions: ["europe"],
		code: "al",
		dialCode: "355",
	},
	{
		name: "Algeria",
		regions: ["africa", "north-africa"],
		code: "dz",
		dialCode: "213",
	},
	{
		name: "Andorra",
		regions: ["europe"],
		code: "ad",
		dialCode: "376",
	},
	{
		name: "Angola",
		regions: ["africa"],
		code: "ao",
		dialCode: "244",
	},
	{
		name: "Anguilla",
		regions: ["america", "carribean"],
		code: "ai",
		dialCode: "1264",
	},
	{
		name: "Antigua and Barbuda",
		regions: ["america", "carribean"],
		code: "ag",
		dialCode: "1268",
	},
	{
		name: "Argentina",
		regions: ["america", "south-america"],
		code: "ar",
		dialCode: "54",
		format: "(00) 00000000",
		priority: 0,
		areaCodes: [
			"11",
			"221",
			"223",
			"261",
			"264",
			"2652",
			"280",
			"2905",
			"291",
			"2920",
			"2966",
			"299",
			"341",
			"342",
			"343",
			"351",
			"376",
			"379",
			"381",
			"3833",
			"385",
			"387",
			"388",
		],
	},
	{
		name: "Armenia",
		regions: ["asia", "ex-ussr"],
		code: "am",
		dialCode: "374",
		format: "00 000000",
	},
	{
		name: "Aruba",
		regions: ["america", "carribean"],
		code: "aw",
		dialCode: "297",
	},
	{
		name: "Australia",
		regions: ["oceania"],
		code: "au",
		dialCode: "61",
		format: "(00) 0000 0000",
		priority: 0,
		areaCodes: ["2", "3", "4", "7", "8", "02", "03", "04", "07", "08"],
	},
	{
		name: "Austria",
		regions: ["europe"],
		code: "at",
		dialCode: "43",
	},
	{
		name: "Azerbaijan",
		regions: ["asia", "ex-ussr"],
		code: "az",
		dialCode: "994",
		format: "(00) 000 00 00",
	},
	{
		name: "Bahamas",
		regions: ["america", "carribean"],
		code: "bs",
		dialCode: "1242",
	},
	{
		name: "Bahrain",
		regions: ["asia", "middle-east"],
		code: "bh",
		dialCode: "973",
	},
	{
		name: "Bangladesh",
		regions: ["asia"],
		code: "bd",
		dialCode: "880",
	},
	{
		name: "Barbados",
		regions: ["america", "carribean"],
		code: "bb",
		dialCode: "1246",
	},
	{
		name: "Belarus",
		regions: ["europe", "ex-ussr"],
		code: "by",
		dialCode: "375",
		format: "(00) 000 00 00",
	},
	{
		name: "Belgium",
		regions: ["europe"],
		code: "be",
		dialCode: "32",
		format: "000 00 00 00",
	},
	{
		name: "Belize",
		regions: ["america", "central-america"],
		code: "bz",
		dialCode: "501",
	},
	{
		name: "Benin",
		regions: ["africa"],
		code: "bj",
		dialCode: "229",
	},
	{
		name: "Bhutan",
		regions: ["asia"],
		code: "bt",
		dialCode: "975",
	},
	{
		name: "Bolivia",
		regions: ["america", "south-america"],
		code: "bo",
		dialCode: "591",
	},
	{
		name: "Bosnia and Herzegovina",
		regions: ["europe", "ex-yugos"],
		code: "ba",
		dialCode: "387",
	},
	{
		name: "Botswana",
		regions: ["africa"],
		code: "bw",
		dialCode: "267",
	},
	{
		name: "Brazil",
		regions: ["america", "south-america"],
		code: "br",
		dialCode: "55",
		format: "(00) 000000000",
	},
	{
		name: "Brunei",
		regions: ["asia"],
		code: "bn",
		dialCode: "673",
	},
	{
		name: "Bulgaria",
		regions: ["europe"],
		code: "bg",
		dialCode: "359",
	},
	{
		name: "Burkina Faso",
		regions: ["africa"],
		code: "bf",
		dialCode: "226",
	},
	{
		name: "Burundi",
		regions: ["africa"],
		code: "bi",
		dialCode: "257",
	},
	{
		name: "Cambodia",
		regions: ["asia"],
		code: "kh",
		dialCode: "855",
	},
	{
		name: "Cameroon",
		regions: ["africa"],
		code: "cm",
		dialCode: "237",
	},
	{
		name: "Canada",
		regions: ["america", "north-america"],
		code: "ca",
		dialCode: "1",
		format: "(000) 000-0000",
		priority: 1,
		areaCodes: [
			"204",
			"226",
			"236",
			"249",
			"250",
			"289",
			"306",
			"343",
			"365",
			"387",
			"403",
			"416",
			"418",
			"431",
			"437",
			"438",
			"450",
			"506",
			"514",
			"519",
			"548",
			"579",
			"581",
			"587",
			"604",
			"613",
			"639",
			"647",
			"672",
			"705",
			"709",
			"742",
			"778",
			"780",
			"782",
			"807",
			"819",
			"825",
			"867",
			"873",
			"902",
			"905",
		],
	},
	{
		name: "Cape Verde",
		regions: ["africa"],
		code: "cv",
		dialCode: "238",
	},
	{
		name: "Central African Republic",
		regions: ["africa"],
		code: "cf",
		dialCode: "236",
	},
	{
		name: "Chad",
		regions: ["africa"],
		code: "td",
		dialCode: "235",
	},
	{
		name: "Chile",
		regions: ["america", "south-america"],
		code: "cl",
		dialCode: "56",
	},
	{
		name: "China",
		regions: ["asia"],
		code: "cn",
		dialCode: "86",
		format: "00-000000000",
	},
	{
		name: "Colombia",
		regions: ["america", "south-america"],
		code: "co",
		dialCode: "57",
		format: "000 000 0000",
	},
	{
		name: "Comoros",
		regions: ["africa"],
		code: "km",
		dialCode: "269",
	},
	{
		name: "Costa Rica",
		regions: ["america", "central-america"],
		code: "cr",
		dialCode: "506",
		format: "0000-0000",
	},
	{
		name: "Croatia",
		regions: ["europe", "ex-yugos"],
		code: "hr",
		dialCode: "385",
	},
	{
		name: "Cuba",
		regions: ["america", "carribean"],
		code: "cu",
		dialCode: "53",
	},
	{
		name: "Curaçao",
		regions: ["america", "carribean"],
		code: "cw",
		dialCode: "599",
		priority: 0,
	},
	{
		name: "Cyprus",
		regions: ["europe"],
		code: "cy",
		dialCode: "357",
		format: "00 000000",
	},
	{
		name: "Czech Republic",
		regions: ["europe"],
		code: "cz",
		dialCode: "420",
		format: "000 000 000",
	},
	{
		name: "Democratic Republic of the Congo",
		regions: ["africa"],
		code: "cd",
		dialCode: "243",
	},
	{
		name: "Denmark",
		regions: ["europe", "baltic"],
		code: "dk",
		dialCode: "45",
		format: "00 00 00 00",
	},
	{
		name: "Djibouti",
		regions: ["africa"],
		code: "dj",
		dialCode: "253",
	},
	{
		name: "Dominica",
		regions: ["america", "carribean"],
		code: "dm",
		dialCode: "1767",
	},
	{
		name: "Dominican Republic",
		regions: ["america", "carribean"],
		code: "do",
		dialCode: "1",
		priority: 2,
		areaCodes: ["809", "829", "849"],
	},
	{
		name: "Ecuador",
		regions: ["america", "south-america"],
		code: "ec",
		dialCode: "593",
	},
	{
		name: "Egypt",
		regions: ["africa", "north-africa"],
		code: "eg",
		dialCode: "20",
	},
	{
		name: "El Salvador",
		regions: ["america", "central-america"],
		code: "sv",
		dialCode: "503",
		format: "0000-0000",
	},
	{
		name: "Equatorial Guinea",
		regions: ["africa"],
		code: "gq",
		dialCode: "240",
	},
	{
		name: "Eritrea",
		regions: ["africa"],
		code: "er",
		dialCode: "291",
	},
	{
		name: "Estonia",
		regions: ["europe", "baltic"],
		code: "ee",
		dialCode: "372",
		format: "0000 000000",
	},
	{
		name: "Ethiopia",
		regions: ["africa"],
		code: "et",
		dialCode: "251",
	},
	{
		name: "Fiji",
		regions: ["oceania"],
		code: "fj",
		dialCode: "679",
	},
	{
		name: "Finland",
		regions: ["europe", "baltic"],
		code: "fi",
		dialCode: "358",
		format: "00 000 00 00",
	},
	{
		name: "France",
		regions: ["europe"],
		code: "fr",
		dialCode: "33",
		format: "0 00 00 00 00",
	},
	{
		name: "French Guiana",
		regions: ["america", "south-america"],
		code: "gf",
		dialCode: "594",
	},
	{
		name: "French Polynesia",
		regions: ["oceania"],
		code: "pf",
		dialCode: "689",
	},
	{
		name: "Gabon",
		regions: ["africa"],
		code: "ga",
		dialCode: "241",
	},
	{
		name: "Gambia",
		regions: ["africa"],
		code: "gm",
		dialCode: "220",
	},
	{
		name: "Georgia",
		regions: ["asia", "ex-ussr"],
		code: "ge",
		dialCode: "995",
	},
	{
		name: "Germany",
		regions: ["europe"],
		code: "de",
		dialCode: "49",
		format: "0000 00000000",
	},
	{
		name: "Ghana",
		regions: ["africa"],
		code: "gh",
		dialCode: "233",
	},
	{
		name: "Greece",
		regions: ["europe"],
		code: "gr",
		dialCode: "30",
	},
	{
		name: "Grenada",
		regions: ["america", "carribean"],
		code: "gd",
		dialCode: "1473",
	},
	{
		name: "Guadeloupe",
		regions: ["america", "carribean"],
		code: "gp",
		dialCode: "590",
		priority: 0,
	},
	{
		name: "Guam",
		regions: ["oceania"],
		code: "gu",
		dialCode: "1671",
	},
	{
		name: "Guatemala",
		regions: ["america", "central-america"],
		code: "gt",
		dialCode: "502",
		format: "0000-0000",
	},
	{
		name: "Guinea",
		regions: ["africa"],
		code: "gn",
		dialCode: "224",
	},
	{
		name: "Guinea-Bissau",
		regions: ["africa"],
		code: "gw",
		dialCode: "245",
	},
	{
		name: "Guyana",
		regions: ["america", "south-america"],
		code: "gy",
		dialCode: "592",
	},
	{
		name: "Haiti",
		regions: ["america", "carribean"],
		code: "ht",
		dialCode: "509",
		format: "0000-0000",
	},
	{
		name: "Honduras",
		regions: ["america", "central-america"],
		code: "hn",
		dialCode: "504",
	},
	{
		name: "Hong Kong",
		regions: ["asia"],
		code: "hk",
		dialCode: "852",
		format: "0000 0000",
	},
	{
		name: "Hungary",
		regions: ["europe"],
		code: "hu",
		dialCode: "36",
	},
	{
		name: "Iceland",
		regions: ["europe"],
		code: "is",
		dialCode: "354",
		format: "000 0000",
	},
	{
		name: "India",
		regions: ["asia"],
		code: "in",
		dialCode: "91",
		format: "00000-00000",
	},
	{
		name: "Indonesia",
		regions: ["asia"],
		code: "id",
		dialCode: "62",
	},
	{
		name: "Iran",
		regions: ["asia", "middle-east"],
		code: "ir",
		dialCode: "98",
		format: "000 000 0000",
	},
	{
		name: "Iraq",
		regions: ["asia", "middle-east"],
		code: "iq",
		dialCode: "964",
	},
	{
		name: "Ireland",
		regions: ["europe"],
		code: "ie",
		dialCode: "353",
		format: "00 000 0000",
	},
	{
		name: "Israel",
		regions: ["asia", "middle-east"],
		code: "il",
		dialCode: "972",
		format: "000 000 0000",
	},
	{
		name: "Italy",
		regions: ["europe"],
		code: "it",
		dialCode: "39",
		format: "000 0000000",
		priority: 0,
	},
	{
		name: "Ivory Coast",
		regions: ["africa"],
		code: "ci",
		dialCode: "225",
		format: "00 00 00 00",
	},
	{
		name: "Jamaica",
		regions: ["america", "carribean"],
		code: "jm",
		dialCode: "1876",
	},
	{
		name: "Japan",
		regions: ["asia"],
		code: "jp",
		dialCode: "81",
		format: "00 0000 0000",
	},
	{
		name: "Jordan",
		regions: ["asia", "middle-east"],
		code: "jo",
		dialCode: "962",
	},
	{
		name: "Kazakhstan",
		regions: ["asia", "ex-ussr"],
		code: "kz",
		dialCode: "7",
		format: "000 000-00-00",
		priority: 1,
		areaCodes: [
			"310",
			"311",
			"312",
			"313",
			"315",
			"318",
			"321",
			"324",
			"325",
			"326",
			"327",
			"336",
			"7172",
			"73622",
		],
	},
	{
		name: "Kenya",
		regions: ["africa"],
		code: "ke",
		dialCode: "254",
	},
	{
		name: "Kiribati",
		regions: ["oceania"],
		code: "ki",
		dialCode: "686",
	},
	{
		name: "Kosovo",
		regions: ["europe", "ex-yugos"],
		code: "xk",
		dialCode: "383",
	},
	{
		name: "Kuwait",
		regions: ["asia", "middle-east"],
		code: "kw",
		dialCode: "965",
	},
	{
		name: "Kyrgyzstan",
		regions: ["asia", "ex-ussr"],
		code: "kg",
		dialCode: "996",
		format: "000 000 000",
	},
	{
		name: "Laos",
		regions: ["asia"],
		code: "la",
		dialCode: "856",
	},
	{
		name: "Latvia",
		regions: ["europe", "baltic"],
		code: "lv",
		dialCode: "371",
		format: "00 000 000",
	},
	{
		name: "Lebanon",
		regions: ["asia", "middle-east"],
		code: "lb",
		dialCode: "961",
	},
	{
		name: "Lesotho",
		regions: ["africa"],
		code: "ls",
		dialCode: "266",
	},
	{
		name: "Liberia",
		regions: ["africa"],
		code: "lr",
		dialCode: "231",
	},
	{
		name: "Libya",
		regions: ["africa", "north-africa"],
		code: "ly",
		dialCode: "218",
	},
	{
		name: "Liechtenstein",
		regions: ["europe"],
		code: "li",
		dialCode: "423",
	},
	{
		name: "Lithuania",
		regions: ["europe", "baltic"],
		code: "lt",
		dialCode: "370",
	},
	{
		name: "Luxembourg",
		regions: ["europe"],
		code: "lu",
		dialCode: "352",
	},
	{
		name: "Macau",
		regions: ["asia"],
		code: "mo",
		dialCode: "853",
	},
	{
		name: "Macedonia",
		regions: ["europe", "ex-yugos"],
		code: "mk",
		dialCode: "389",
	},
	{
		name: "Madagascar",
		regions: ["africa"],
		code: "mg",
		dialCode: "261",
	},
	{
		name: "Malawi",
		regions: ["africa"],
		code: "mw",
		dialCode: "265",
	},
	{
		name: "Malaysia",
		regions: ["asia"],
		code: "my",
		dialCode: "60",
		format: "00-0000-0000",
	},
	{
		name: "Maldives",
		regions: ["asia"],
		code: "mv",
		dialCode: "960",
	},
	{
		name: "Mali",
		regions: ["africa"],
		code: "ml",
		dialCode: "223",
	},
	{
		name: "Malta",
		regions: ["europe"],
		code: "mt",
		dialCode: "356",
	},
	{
		name: "Marshall Islands",
		regions: ["oceania"],
		code: "mh",
		dialCode: "692",
	},
	{
		name: "Martinique",
		regions: ["america", "carribean"],
		code: "mq",
		dialCode: "596",
	},
	{
		name: "Mauritania",
		regions: ["africa"],
		code: "mr",
		dialCode: "222",
	},
	{
		name: "Mauritius",
		regions: ["africa"],
		code: "mu",
		dialCode: "230",
	},
	{
		name: "Mexico",
		regions: ["america", "central-america"],
		code: "mx",
		dialCode: "52",
		format: "000 000 0000",
		priority: 0,
		areaCodes: ["55", "81", "33", "656", "664", "998", "774", "229"],
	},
	{
		name: "Micronesia",
		regions: ["oceania"],
		code: "fm",
		dialCode: "691",
	},
	{
		name: "Moldova",
		regions: ["europe"],
		code: "md",
		dialCode: "373",
		format: "(00) 00-00-00",
	},
	{
		name: "Monaco",
		regions: ["europe"],
		code: "mc",
		dialCode: "377",
	},
	{
		name: "Mongolia",
		regions: ["asia"],
		code: "mn",
		dialCode: "976",
	},
	{
		name: "Montenegro",
		regions: ["europe", "ex-yugos"],
		code: "me",
		dialCode: "382",
	},
	{
		name: "Morocco",
		regions: ["africa", "north-africa"],
		code: "ma",
		dialCode: "212",
	},
	{
		name: "Mozambique",
		regions: ["africa"],
		code: "mz",
		dialCode: "258",
	},
	{
		name: "Myanmar",
		regions: ["asia"],
		code: "mm",
		dialCode: "95",
	},
	{
		name: "Namibia",
		regions: ["africa"],
		code: "na",
		dialCode: "264",
	},
	{
		name: "Nauru",
		regions: ["oceania"],
		code: "nr",
		dialCode: "674",
	},
	{
		name: "Nepal",
		regions: ["asia"],
		code: "np",
		dialCode: "977",
	},
	{
		name: "Netherlands",
		regions: ["europe"],
		code: "nl",
		dialCode: "31",
		format: "00 00000000",
	},
	{
		name: "Netherlands Antilles",
		regions: ["america", "carribean"],
		code: "bq",
		dialCode: "599",
		priority: 1,
	},
	{
		name: "New Caledonia",
		regions: ["oceania"],
		code: "nc",
		dialCode: "687",
	},
	{
		name: "New Zealand",
		regions: ["oceania"],
		code: "nz",
		dialCode: "64",
		format: "000-000-0000",
	},
	{
		name: "Nicaragua",
		regions: ["america", "central-america"],
		code: "ni",
		dialCode: "505",
	},
	{
		name: "Niger",
		regions: ["africa"],
		code: "ne",
		dialCode: "227",
	},
	{
		name: "Nigeria",
		regions: ["africa"],
		code: "ng",
		dialCode: "234",
	},
	{
		name: "North Korea",
		regions: ["asia"],
		code: "kp",
		dialCode: "850",
	},
	{
		name: "Norway",
		regions: ["europe", "baltic"],
		code: "no",
		dialCode: "47",
		format: "000 00 000",
	},
	{
		name: "Oman",
		regions: ["asia", "middle-east"],
		code: "om",
		dialCode: "968",
	},
	{
		name: "Pakistan",
		regions: ["asia"],
		code: "pk",
		dialCode: "92",
		format: "000-0000000",
	},
	{
		name: "Palau",
		regions: ["oceania"],
		code: "pw",
		dialCode: "680",
	},
	{
		name: "Palestine",
		regions: ["asia", "middle-east"],
		code: "ps",
		dialCode: "970",
	},
	{
		name: "Panama",
		regions: ["america", "central-america"],
		code: "pa",
		dialCode: "507",
	},
	{
		name: "Papua New Guinea",
		regions: ["oceania"],
		code: "pg",
		dialCode: "675",
	},
	{
		name: "Paraguay",
		regions: ["america", "south-america"],
		code: "py",
		dialCode: "595",
	},
	{
		name: "Peru",
		regions: ["america", "south-america"],
		code: "pe",
		dialCode: "51",
	},
	{
		name: "Philippines",
		regions: ["asia"],
		code: "ph",
		dialCode: "63",
		format: "0000 0000000",
	},
	{
		name: "Poland",
		regions: ["europe", "baltic"],
		code: "pl",
		dialCode: "48",
		format: "000-000-000",
	},
	{
		name: "Portugal",
		regions: ["europe"],
		code: "pt",
		dialCode: "351",
	},
	{
		name: "Puerto Rico",
		regions: ["america", "carribean"],
		code: "pr",
		dialCode: "1",
		priority: 3,
		areaCodes: ["787", "939"],
	},
	{
		name: "Qatar",
		regions: ["asia", "middle-east"],
		code: "qa",
		dialCode: "974",
	},
	{
		name: "Republic of the Congo",
		regions: ["africa"],
		code: "cg",
		dialCode: "242",
	},
	{
		name: "Réunion",
		regions: ["africa"],
		code: "re",
		dialCode: "262",
	},
	{
		name: "Romania",
		regions: ["europe"],
		code: "ro",
		dialCode: "40",
	},
	{
		name: "Russia",
		regions: ["europe", "asia", "ex-ussr", "baltic"],
		code: "ru",
		dialCode: "7",
		format: "(000) 000-00-00",
		priority: 0,
	},
	{
		name: "Rwanda",
		regions: ["africa"],
		code: "rw",
		dialCode: "250",
	},
	{
		name: "Saint Kitts and Nevis",
		regions: ["america", "carribean"],
		code: "kn",
		dialCode: "1869",
	},
	{
		name: "Saint Lucia",
		regions: ["america", "carribean"],
		code: "lc",
		dialCode: "1758",
	},
	{
		name: "Saint Vincent and the Grenadines",
		regions: ["america", "carribean"],
		code: "vc",
		dialCode: "1784",
	},
	{
		name: "Samoa",
		regions: ["oceania"],
		code: "ws",
		dialCode: "685",
	},
	{
		name: "San Marino",
		regions: ["europe"],
		code: "sm",
		dialCode: "378",
	},
	{
		name: "São Tomé and Príncipe",
		regions: ["africa"],
		code: "st",
		dialCode: "239",
	},
	{
		name: "Saudi Arabia",
		regions: ["asia", "middle-east"],
		code: "sa",
		dialCode: "966",
	},
	{
		name: "Senegal",
		regions: ["africa"],
		code: "sn",
		dialCode: "221",
	},
	{
		name: "Serbia",
		regions: ["europe", "ex-yugos"],
		code: "rs",
		dialCode: "381",
	},
	{
		name: "Seychelles",
		regions: ["africa"],
		code: "sc",
		dialCode: "248",
	},
	{
		name: "Sierra Leone",
		regions: ["africa"],
		code: "sl",
		dialCode: "232",
	},
	{
		name: "Singapore",
		regions: ["asia"],
		code: "sg",
		dialCode: "65",
		format: "0000-0000",
	},
	{
		name: "Slovakia",
		regions: ["europe"],
		code: "sk",
		dialCode: "421",
	},
	{
		name: "Slovenia",
		regions: ["europe", "ex-yugos"],
		code: "si",
		dialCode: "386",
	},
	{
		name: "Solomon Islands",
		regions: ["oceania"],
		code: "sb",
		dialCode: "677",
	},
	{
		name: "Somalia",
		regions: ["africa"],
		code: "so",
		dialCode: "252",
	},
	{
		name: "South Africa",
		regions: ["africa"],
		code: "za",
		dialCode: "27",
	},
	{
		name: "South Korea",
		regions: ["asia"],
		code: "kr",
		dialCode: "82",
		format: "000 0000 0000",
	},
	{
		name: "South Sudan",
		regions: ["africa", "north-africa"],
		code: "ss",
		dialCode: "211",
	},
	{
		name: "Spain",
		regions: ["europe"],
		code: "es",
		dialCode: "34",
		format: "000 000 000",
	},
	{
		name: "Sri Lanka",
		regions: ["asia"],
		code: "lk",
		dialCode: "94",
	},
	{
		name: "Sudan",
		regions: ["africa"],
		code: "sd",
		dialCode: "249",
	},
	{
		name: "Suriname",
		regions: ["america", "south-america"],
		code: "sr",
		dialCode: "597",
	},
	{
		name: "Swaziland",
		regions: ["africa"],
		code: "sz",
		dialCode: "268",
	},
	{
		name: "Sweden",
		regions: ["europe", "baltic"],
		code: "se",
		dialCode: "46",
		format: "(000) 000-000",
	},
	{
		name: "Switzerland",
		regions: ["europe"],
		code: "ch",
		dialCode: "41",
		format: "00 000 00 00",
	},
	{
		name: "Syria",
		regions: ["asia", "middle-east"],
		code: "sy",
		dialCode: "963",
	},
	{
		name: "Taiwan",
		regions: ["asia"],
		code: "tw",
		dialCode: "886",
	},
	{
		name: "Tajikistan",
		regions: ["asia", "ex-ussr"],
		code: "tj",
		dialCode: "992",
	},
	{
		name: "Tanzania",
		regions: ["africa"],
		code: "tz",
		dialCode: "255",
	},
	{
		name: "Thailand",
		regions: ["asia"],
		code: "th",
		dialCode: "66",
	},
	{
		name: "Timor-Leste",
		regions: ["asia"],
		code: "tl",
		dialCode: "670",
	},
	{
		name: "Togo",
		regions: ["africa"],
		code: "tg",
		dialCode: "228",
	},
	{
		name: "Tonga",
		regions: ["oceania"],
		code: "to",
		dialCode: "676",
	},
	{
		name: "Trinidad and Tobago",
		regions: ["america", "carribean"],
		code: "tt",
		dialCode: "1868",
	},
	{
		name: "Tunisia",
		regions: ["africa", "north-africa"],
		code: "tn",
		dialCode: "216",
	},
	{
		name: "Turkey",
		regions: ["europe"],
		code: "tr",
		dialCode: "90",
		format: "000 000 00 00",
	},
	{
		name: "Turkmenistan",
		regions: ["asia", "ex-ussr"],
		code: "tm",
		dialCode: "993",
	},
	{
		name: "Tuvalu",
		regions: ["oceania"],
		code: "tv",
		dialCode: "688",
	},
	{
		name: "Uganda",
		regions: ["africa"],
		code: "ug",
		dialCode: "256",
	},
	{
		name: "Ukraine",
		regions: ["europe", "ex-ussr"],
		code: "ua",
		dialCode: "380",
		format: "(00) 000 00 00",
	},
	{
		name: "United Arab Emirates",
		regions: ["asia", "middle-east"],
		code: "ae",
		dialCode: "971",
	},
	{
		name: "United Kingdom",
		regions: ["europe"],
		code: "gb",
		dialCode: "44",
		format: "0000 000000",
		priority: 1,
	},
	{
		name: "United States",
		regions: ["america", "north-america"],
		code: "us",
		dialCode: "1",
		format: "(000) 000-0000",
		priority: 0,
	},
	{
		name: "Uruguay",
		regions: ["america", "south-america"],
		code: "uy",
		dialCode: "598",
	},
	{
		name: "Uzbekistan",
		regions: ["asia", "ex-ussr"],
		code: "uz",
		dialCode: "998",
		format: "00 000 00 00",
	},
	{
		name: "Vanuatu",
		regions: ["oceania"],
		code: "vu",
		dialCode: "678",
	},
	{
		name: "Vatican City",
		regions: ["europe"],
		code: "va",
		dialCode: "39",
		format: "00 0000 0000",
		priority: 1,
	},
	{
		name: "Venezuela",
		regions: ["america", "south-america"],
		code: "ve",
		dialCode: "58",
	},
	{
		name: "Vietnam",
		regions: ["asia"],
		code: "vn",
		dialCode: "84",
	},
	{
		name: "Yemen",
		regions: ["asia", "middle-east"],
		code: "ye",
		dialCode: "967",
	},
	{
		name: "Zambia",
		regions: ["africa"],
		code: "zm",
		dialCode: "260",
	},
	{
		name: "Zimbabwe",
		regions: ["africa"],
		code: "zw",
		dialCode: "263",
	},
] satisfies Country[];

export const TERRITORIES = [
	{
		name: "American Samoa",
		regions: ["oceania"],
		code: "as",
		dialCode: "1684",
	},
	{
		name: "Anguilla",
		regions: ["america", "carribean"],
		code: "ai",
		dialCode: "1264",
	},
	{
		name: "Bermuda",
		regions: ["america", "north-america"],
		code: "bm",
		dialCode: "1441",
	},
	{
		name: "British Indian Ocean Territory",
		regions: ["asia"],
		code: "io",
		dialCode: "246",
	},
	{
		name: "British Virgin Islands",
		regions: ["america", "carribean"],
		code: "vg",
		dialCode: "1284",
	},
	{
		name: "Cayman Islands",
		regions: ["america", "carribean"],
		code: "ky",
		dialCode: "1345",
	},
	{
		name: "Cook Islands",
		regions: ["oceania"],
		code: "ck",
		dialCode: "682",
	},
	{
		name: "Falkland Islands",
		regions: ["america", "south-america"],
		code: "fk",
		dialCode: "500",
	},
	{
		name: "Faroe Islands",
		regions: ["europe"],
		code: "fo",
		dialCode: "298",
	},
	{
		name: "Gibraltar",
		regions: ["europe"],
		code: "gi",
		dialCode: "350",
	},
	{
		name: "Greenland",
		regions: ["america"],
		code: "gl",
		dialCode: "299",
	},
	{
		name: "Jersey",
		regions: ["europe"],
		code: "je",
		dialCode: "44",
		format: "0000 000000",
	},
	{
		name: "Montserrat",
		regions: ["america", "carribean"],
		code: "ms",
		dialCode: "1664",
	},
	{
		name: "Niue",
		regions: ["asia"],
		code: "nu",
		dialCode: "683",
	},
	{
		name: "Norfolk Island",
		regions: ["oceania"],
		code: "nf",
		dialCode: "672",
	},
	{
		name: "Northern Mariana Islands",
		regions: ["oceania"],
		code: "mp",
		dialCode: "1670",
	},
	{
		name: "Saint Barthélemy",
		regions: ["america", "carribean"],
		code: "bl",
		dialCode: "590",
		priority: 1,
	},
	{
		name: "Saint Helena",
		regions: ["africa"],
		code: "sh",
		dialCode: "290",
	},
	{
		name: "Saint Martin",
		regions: ["america", "carribean"],
		code: "mf",
		dialCode: "590",
		priority: 2,
	},
	{
		name: "Saint Pierre and Miquelon",
		regions: ["america", "north-america"],
		code: "pm",
		dialCode: "508",
	},
	{
		name: "Sint Maarten",
		regions: ["america", "carribean"],
		code: "sx",
		dialCode: "1721",
	},
	{
		name: "Tokelau",
		regions: ["oceania"],
		code: "tk",
		dialCode: "690",
	},
	{
		name: "Turks and Caicos Islands",
		regions: ["america", "carribean"],
		code: "tc",
		dialCode: "1649",
	},
	{
		name: "U.S. Virgin Islands",
		regions: ["america", "carribean"],
		code: "vi",
		dialCode: "1340",
	},
	{
		name: "Wallis and Futuna",
		regions: ["oceania"],
		code: "wf",
		dialCode: "681",
	},
] satisfies Country[];
