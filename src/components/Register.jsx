import React, { useState, useRef, useEffect } from "react";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { CiCircleInfo } from "react-icons/ci";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from '/home/atakan/Desktop/Takvimim/takvimim/src/api/axios.js';

const FULLNAME_REGEX = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
const USERNAME_REGEX = /^[a-zA-Z0-9]{3,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONENUMBER_REGEX = /^\d{10}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/api/v1/auth/register';

const Register = () => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const provinces = [
    "Adana",
    "Adıyaman",
    "Afyon",
    "Ağrı",
    "Amasya",
    "Ankara",
    "Antalya",
    "Artvin",
    "Aydın",
    "Balıkesir",
    "Bilecik",
    "Bingöl",
    "Bitlis",
    "Bolu",
    "Burdur",
    "Bursa",
    "Çanakkale",
    "Çankırı",
    "Çorum",
    "Denizli",
    "Diyarbakır",
    "Edirne",
    "Elazığ",
    "Erzincan",
    "Erzurum",
    "Eskişehir",
    "Gaziantep",
    "Giresun",
    "Gümüşhane",
    "Hakkari",
    "Hatay",
    "Isparta",
    "İçel (Mersin)",
    "İstanbul",
    "İzmir",
    "Kars",
    "Kastamonu",
    "Kayseri",
    "Kırklareli",
    "Kırşehir",
    "Kocaeli",
    "Konya",
    "Kütahya",
    "Malatya",
    "Manisa",
    "Kahramanmaraş",
    "Mardin",
    "Muğla",
    "Muş",
    "Nevşehir",
    "Niğde",
    "Ordu",
    "Rize",
    "Sakarya",
    "Samsun",
    "Siirt",
    "Sinop",
    "Sivas",
    "Tekirdağ",
    "Tokat",
    "Trabzon",
    "Tunceli",
    "Şanlıurfa",
    "Uşak",
    "Van",
    "Yozgat",
    "Zonguldak",
    "Aksaray",
    "Bayburt",
    "Karaman",
    "Kırıkkale",
    "Batman",
    "Şırnak",
    "Bartın",
    "Ardahan",
    "Iğdır",
    "Yalova",
    "Karabük",
    "Kilis",
    "Osmaniye",
    "Düzce",
  ];
  const districts = {
    Adana: [
      "Aladağ",
      "Ceyhan",
      "Çukurova",
      "Feke",
      "İmamoğlu",
      "Karaisalı",
      "Karataş",
      "Kozan",
      "Pozantı",
      "Saimbeyli",
      "Sarıçam",
      "Seyhan",
      "Tufanbeyli",
      "Yumurtalık",
      "Yüreğir",
    ],
    Adıyaman: [
      "Besni",
      "Çelikhan",
      "Gerger",
      "Gölbaşı",
      "Kahta",
      "Merkez",
      "Samsat",
      "Sincik",
      "Tut",
    ],
    Afyon: [
      "Başmakçı",
      "Bayat",
      "Bolvadin",
      "Çay",
      "Çobanlar",
      "Dazkırı",
      "Dinar",
      "Emirdağ",
      "Evciler",
      "Hocalar",
      "İhsaniye",
      "İscehisar",
      "Kızılören",
      "Merkez",
      "Sandıklı",
      "Sinanpaşa",
      "Sultandağı",
      "Şuhut",
    ],
    Ağrı: [
      "Diyadin",
      "Doğubayazıt",
      "Eleşkirt",
      "Hamur",
      "Merkez",
      "Patnos",
      "Taşlıçay",
      "Tutak",
    ],
    Amasya: [
      "Göynücek",
      "Gümüşhacıköy",
      "Hamamözü",
      "Merkez",
      "Merzifon",
      "Suluova",
      "Taşova",
    ],
    Ankara: [
      "Altındağ",
      "Ayaş",
      "Bala",
      "Beypazarı",
      "Çamlıdere",
      "Çankaya",
      "Çubuk",
      "Elmadağ",
      "Güdül",
      "Haymana",
      "Kalecik",
      "Kızılcahamam",
      "Nallıhan",
      "Polatlı",
      "Şereflikoçhisar",
      "Yenimahalle",
      "Gölbaşı",
      "Keçiören",
      "Mamak",
      "Sincan",
      "Kazan",
      "Akyurt",
      "Etimesgut",
      "Evren",
      "Pursaklar",
    ],
    Antalya: [
      "Akseki",
      "Alanya",
      "Elmalı",
      "Finike",
      "Gazipaşa",
      "Gündoğmuş",
      "Kaş",
      "Korkuteli",
      "Kumluca",
      "Manavgat",
      "Serik",
      "Demre",
      "İbradı",
      "Kemer",
      "Aksu",
      "Döşemealtı",
      "Kepez",
      "Konyaaltı",
      "Muratpaşa",
    ],
    Artvin: [
      "Ardanuç",
      "Arhavi",
      "Merkez",
      "Borçka",
      "Hopa",
      "Şavşat",
      "Yusufeli",
      "Murgul",
    ],
    Aydın: [
      "Merkez",
      "Bozdoğan",
      "Efeler",
      "Çine",
      "Germencik",
      "Karacasu",
      "Koçarlı",
      "Kuşadası",
      "Kuyucak",
      "Nazilli",
      "Söke",
      "Sultanhisar",
      "Yenipazar",
      "Buharkent",
      "İncirliova",
      "Karpuzlu",
      "Köşk",
      "Didim",
    ],
    Balıkesir: [
      "Altıeylül",
      "Ayvalık",
      "Merkez",
      "Balya",
      "Bandırma",
      "Bigadiç",
      "Burhaniye",
      "Dursunbey",
      "Edremit",
      "Erdek",
      "Gönen",
      "Havran",
      "İvrindi",
      "Karesi",
      "Kepsut",
      "Manyas",
      "Savaştepe",
      "Sındırgı",
      "Gömeç",
      "Susurluk",
      "Marmara",
    ],
    Bilecik: [
      "Merkez",
      "Bozüyük",
      "Gölpazarı",
      "Osmaneli",
      "Pazaryeri",
      "Söğüt",
      "Yenipazar",
      "İnhisar",
    ],
    Bingöl: [
      "Merkez",
      "Genç",
      "Karlıova",
      "Kiğı",
      "Solhan",
      "Adaklı",
      "Yayladere",
      "Yedisu",
    ],
    Bitlis: [
      "Adilcevaz",
      "Ahlat",
      "Merkez",
      "Hizan",
      "Mutki",
      "Tatvan",
      "Güroymak",
    ],
    Bolu: [
      "Merkez",
      "Gerede",
      "Göynük",
      "Kıbrıscık",
      "Mengen",
      "Mudurnu",
      "Seben",
      "Dörtdivan",
      "Yeniçağa",
    ],
    Burdur: [
      "Ağlasun",
      "Bucak",
      "Merkez",
      "Gölhisar",
      "Tefenni",
      "Yeşilova",
      "Karamanlı",
      "Kemer",
      "Altınyayla",
      "Çavdır",
      "Çeltikçi",
    ],
    Bursa: [
      "Gemlik",
      "İnegöl",
      "İznik",
      "Karacabey",
      "Keles",
      "Mudanya",
      "Mustafakemalpaşa",
      "Orhaneli",
      "Orhangazi",
      "Yenişehir",
      "Büyükorhan",
      "Harmancık",
      "Nilüfer",
      "Osmangazi",
      "Yıldırım",
      "Gürsu",
      "Kestel",
    ],
    Çanakkale: [
      "Ayvacık",
      "Bayramiç",
      "Biga",
      "Bozcaada",
      "Çan",
      "Merkez",
      "Eceabat",
      "Ezine",
      "Gelibolu",
      "Gökçeada",
      "Lapseki",
      "Yenice",
    ],
    Çankırı: [
      "Merkez",
      "Çerkeş",
      "Eldivan",
      "Ilgaz",
      "Kurşunlu",
      "Orta",
      "Şabanözü",
      "Yapraklı",
      "Atkaracalar",
      "Kızılırmak",
      "Bayramören",
      "Korgun",
    ],
    Çorum: [
      "Alaca",
      "Bayat",
      "Merkez",
      "İskilip",
      "Kargı",
      "Mecitözü",
      "Ortaköy",
      "Osmancık",
      "Sungurlu",
      "Boğazkale",
      "Uğurludağ",
      "Dodurga",
      "Laçin",
      "Oğuzlar",
    ],
    Denizli: [
      "Acıpayam",
      "Buldan",
      "Çal",
      "Çameli",
      "Çardak",
      "Çivril",
      "Merkez",
      "Merkezefendi",
      "Pamukkale",
      "Güney",
      "Kale",
      "Sarayköy",
      "Tavas",
      "Babadağ",
      "Bekilli",
      "Honaz",
      "Serinhisar",
      "Baklan",
      "Beyağaç",
      "Bozkurt",
    ],
    Diyarbakır: [
      "Kocaköy",
      "Çermik",
      "Çınar",
      "Çüngüş",
      "Dicle",
      "Ergani",
      "Hani",
      "Hazro",
      "Kulp",
      "Lice",
      "Silvan",
      "Eğil",
      "Bağlar",
      "Kayapınar",
      "Sur",
      "Yenişehir",
      "Bismil",
    ],
    Edirne: [
      "Merkez",
      "Enez",
      "Havsa",
      "İpsala",
      "Keşan",
      "Lalapaşa",
      "Meriç",
      "Uzunköprü",
      "Süloğlu",
    ],
    Elazığ: [
      "Ağın",
      "Baskil",
      "Merkez",
      "Karakoçan",
      "Keban",
      "Maden",
      "Palu",
      "Sivrice",
      "Arıcak",
      "Kovancılar",
      "Alacakaya",
    ],
    Erzincan: [
      "Çayırlı",
      "Merkez",
      "İliç",
      "Kemah",
      "Kemaliye",
      "Refahiye",
      "Tercan",
      "Üzümlü",
      "Otlukbeli",
    ],
    Erzurum: [
      "Aşkale",
      "Çat",
      "Hınıs",
      "Horasan",
      "İspir",
      "Karayazı",
      "Narman",
      "Oltu",
      "Olur",
      "Pasinler",
      "Şenkaya",
      "Tekman",
      "Tortum",
      "Karaçoban",
      "Uzundere",
      "Pazaryolu",
      "Köprüköy",
      "Palandöken",
      "Yakutiye",
      "Aziziye",
    ],
    Eskişehir: [
      "Çifteler",
      "Mahmudiye",
      "Mihalıççık",
      "Sarıcakaya",
      "Seyitgazi",
      "Sivrihisar",
      "Alpu",
      "Beylikova",
      "İnönü",
      "Günyüzü",
      "Han",
      "Mihalgazi",
      "Odunpazarı",
      "Tepebaşı",
    ],
    Gaziantep: [
      "Araban",
      "İslahiye",
      "Nizip",
      "Oğuzeli",
      "Yavuzeli",
      "Şahinbey",
      "Şehitkamil",
      "Karkamış",
      "Nurdağı",
    ],
    Giresun: [
      "Alucra",
      "Bulancak",
      "Dereli",
      "Espiye",
      "Eynesil",
      "Merkez",
      "Görele",
      "Keşap",
      "Şebinkarahisar",
      "Tirebolu",
      "Piraziz",
      "Yağlıdere",
      "Çamoluk",
      "Çanakçı",
      "Doğankent",
      "Güce",
    ],
    Gümüşhane: ["Merkez", "Kelkit", "Şiran", "Torul", "Köse", "Kürtün"],
    Hakkari: ["Çukurca", "Merkez", "Şemdinli", "Yüksekova"],
    Hatay: [
      "Altınözü",
      "Arsuz",
      "Defne",
      "Dörtyol",
      "Hassa",
      "Antakya",
      "İskenderun",
      "Kırıkhan",
      "Payas",
      "Reyhanlı",
      "Samandağ",
      "Yayladağı",
      "Erzin",
      "Belen",
      "Kumlu",
    ],
    Isparta: [
      "Atabey",
      "Eğirdir",
      "Gelendost",
      "Merkez",
      "Keçiborlu",
      "Senirkent",
      "Sütçüler",
      "Şarkikaraağaç",
      "Uluborlu",
      "Yalvaç",
      "Aksu",
      "Gönen",
      "Yenişarbademli",
    ],
    Mersin: [
      "Anamur",
      "Erdemli",
      "Gülnar",
      "Mut",
      "Silifke",
      "Tarsus",
      "Aydıncık",
      "Bozyazı",
      "Çamlıyayla",
      "Akdeniz",
      "Mezitli",
      "Toroslar",
      "Yenişehir",
    ],
    İstanbul: [
      "Adalar",
      "Bakırköy",
      "Beşiktaş",
      "Beykoz",
      "Beyoğlu",
      "Çatalca",
      "Eyüp",
      "Fatih",
      "Gaziosmanpaşa",
      "Kadıköy",
      "Kartal",
      "Sarıyer",
      "Silivri",
      "Şile",
      "Şişli",
      "Üsküdar",
      "Zeytinburnu",
      "Büyükçekmece",
      "Kağıthane",
      "Küçükçekmece",
      "Pendik",
      "Ümraniye",
      "Bayrampaşa",
      "Avcılar",
      "Bağcılar",
      "Bahçelievler",
      "Güngören",
      "Maltepe",
      "Sultanbeyli",
      "Tuzla",
      "Esenler",
      "Arnavutköy",
      "Ataşehir",
      "Başakşehir",
      "Beylikdüzü",
      "Çekmeköy",
      "Esenyurt",
      "Sancaktepe",
      "Sultangazi",
    ],
    İzmir: [
      "Aliağa",
      "Bayındır",
      "Bergama",
      "Bornova",
      "Çeşme",
      "Dikili",
      "Foça",
      "Karaburun",
      "Karşıyaka",
      "Kemalpaşa",
      "Kınık",
      "Kiraz",
      "Menemen",
      "Ödemiş",
      "Seferihisar",
      "Selçuk",
      "Tire",
      "Torbalı",
      "Urla",
      "Beydağ",
      "Buca",
      "Konak",
      "Menderes",
      "Balçova",
      "Çiğli",
      "Gaziemir",
      "Narlıdere",
      "Güzelbahçe",
      "Bayraklı",
      "Karabağlar",
    ],
    Kars: [
      "Arpaçay",
      "Digor",
      "Kağızman",
      "Merkez",
      "Sarıkamış",
      "Selim",
      "Susuz",
      "Akyaka",
    ],
    Kastamonu: [
      "Abana",
      "Araç",
      "Azdavay",
      "Bozkurt",
      "Cide",
      "Çatalzeytin",
      "Daday",
      "Devrekani",
      "İnebolu",
      "Merkez",
      "Küre",
      "Taşköprü",
      "Tosya",
      "İhsangazi",
      "Pınarbaşı",
      "Şenpazar",
      "Ağlı",
      "Doğanyurt",
      "Hanönü",
      "Seydiler",
    ],
    Kayseri: [
      "Bünyan",
      "Develi",
      "Felahiye",
      "İncesu",
      "Pınarbaşı",
      "Sarıoğlan",
      "Sarız",
      "Tomarza",
      "Yahyalı",
      "Yeşilhisar",
      "Akkışla",
      "Talas",
      "Kocasinan",
      "Melikgazi",
      "Hacılar",
      "Özvatan",
    ],
    Kırklareli: [
      "Babaeski",
      "Demirköy",
      "Merkez",
      "Kofçaz",
      "Lüleburgaz",
      "Pehlivanköy",
      "Pınarhisar",
      "Vize",
    ],
    Kırşehir: [
      "Çiçekdağı",
      "Kaman",
      "Merkez",
      "Mucur",
      "Akpınar",
      "Akçakent",
      "Boztepe",
    ],
    Kocaeli: [
      "Gebze",
      "Gölcük",
      "Kandıra",
      "Karamürsel",
      "Körfez",
      "Derince",
      "Başiskele",
      "Çayırova",
      "Darıca",
      "Dilovası",
      "İzmit",
      "Kartepe",
    ],
    Konya: [
      "Akşehir",
      "Beyşehir",
      "Bozkır",
      "Cihanbeyli",
      "Çumra",
      "Doğanhisar",
      "Ereğli",
      "Hadim",
      "Ilgın",
      "Kadınhanı",
      "Karapınar",
      "Kulu",
      "Sarayönü",
      "Seydişehir",
      "Yunak",
      "Akören",
      "Altınekin",
      "Derebucak",
      "Hüyük",
      "Karatay",
      "Meram",
      "Selçuklu",
      "Taşkent",
      "Ahırlı",
      "Çeltik",
      "Derbent",
      "Emirgazi",
      "Güneysınır",
      "Halkapınar",
      "Tuzlukçu",
      "Yalıhüyük",
    ],
    Kütahya: [
      "Altıntaş",
      "Domaniç",
      "Emet",
      "Gediz",
      "Merkez",
      "Simav",
      "Tavşanlı",
      "Aslanapa",
      "Dumlupınar",
      "Hisarcık",
      "Şaphane",
      "Çavdarhisar",
      "Pazarlar",
    ],
    Malatya: [
      "Akçadağ",
      "Arapgir",
      "Arguvan",
      "Darende",
      "Doğanşehir",
      "Hekimhan",
      "Merkez",
      "Pütürge",
      "Yeşilyurt",
      "Battalgazi",
      "Doğanyol",
      "Kale",
      "Kuluncak",
      "Yazıhan",
    ],
    Manisa: [
      "Akhisar",
      "Alaşehir",
      "Demirci",
      "Gördes",
      "Kırkağaç",
      "Kula",
      "Merkez",
      "Salihli",
      "Sarıgöl",
      "Saruhanlı",
      "Selendi",
      "Soma",
      "Şehzadeler",
      "Yunusemre",
      "Turgutlu",
      "Ahmetli",
      "Gölmarmara",
      "Köprübaşı",
    ],
    Kahramanmaraş: [
      "Afşin",
      "Andırın",
      "Dulkadiroğlu",
      "Onikişubat",
      "Elbistan",
      "Göksun",
      "Merkez",
      "Pazarcık",
      "Türkoğlu",
      "Çağlayancerit",
      "Ekinözü",
      "Nurhak",
    ],
    Mardin: [
      "Derik",
      "Kızıltepe",
      "Artuklu",
      "Merkez",
      "Mazıdağı",
      "Midyat",
      "Nusaybin",
      "Ömerli",
      "Savur",
      "Dargeçit",
      "Yeşilli",
    ],
    Muğla: [
      "Bodrum",
      "Datça",
      "Fethiye",
      "Köyceğiz",
      "Marmaris",
      "Menteşe",
      "Milas",
      "Ula",
      "Yatağan",
      "Dalaman",
      "Seydikemer",
      "Ortaca",
      "Kavaklıdere",
    ],
    Muş: ["Bulanık", "Malazgirt", "Merkez", "Varto", "Hasköy", "Korkut"],
    Nevşehir: [
      "Avanos",
      "Derinkuyu",
      "Gülşehir",
      "Hacıbektaş",
      "Kozaklı",
      "Merkez",
      "Ürgüp",
      "Acıgöl",
    ],
    Niğde: ["Bor", "Çamardı", "Merkez", "Ulukışla", "Altunhisar", "Çiftlik"],
    Ordu: [
      "Akkuş",
      "Altınordu",
      "Aybastı",
      "Fatsa",
      "Gölköy",
      "Korgan",
      "Kumru",
      "Mesudiye",
      "Perşembe",
      "Ulubey",
      "Ünye",
      "Gülyalı",
      "Gürgentepe",
      "Çamaş",
      "Çatalpınar",
      "Çaybaşı",
      "İkizce",
      "Kabadüz",
      "Kabataş",
    ],
    Rize: [
      "Ardeşen",
      "Çamlıhemşin",
      "Çayeli",
      "Fındıklı",
      "İkizdere",
      "Kalkandere",
      "Pazar",
      "Merkez",
      "Güneysu",
      "Derepazarı",
      "Hemşin",
      "İyidere",
    ],
    Sakarya: [
      "Akyazı",
      "Geyve",
      "Hendek",
      "Karasu",
      "Kaynarca",
      "Sapanca",
      "Kocaali",
      "Pamukova",
      "Taraklı",
      "Ferizli",
      "Karapürçek",
      "Söğütlü",
      "Adapazarı",
      "Arifiye",
      "Erenler",
      "Serdivan",
    ],
    Samsun: [
      "Alaçam",
      "Bafra",
      "Çarşamba",
      "Havza",
      "Kavak",
      "Ladik",
      "Terme",
      "Vezirköprü",
      "Asarcık",
      "Ondokuzmayıs",
      "Salıpazarı",
      "Tekkeköy",
      "Ayvacık",
      "Yakakent",
      "Atakum",
      "Canik",
      "İlkadım",
    ],
    Siirt: [
      "Baykan",
      "Eruh",
      "Kurtalan",
      "Pervari",
      "Merkez",
      "Şirvan",
      "Tillo",
    ],
    Sinop: [
      "Ayancık",
      "Boyabat",
      "Durağan",
      "Erfelek",
      "Gerze",
      "Merkez",
      "Türkeli",
      "Dikmen",
      "Saraydüzü",
    ],
    Sivas: [
      "Divriği",
      "Gemerek",
      "Gürün",
      "Hafik",
      "İmranlı",
      "Kangal",
      "Koyulhisar",
      "Merkez",
      "Suşehri",
      "Şarkışla",
      "Yıldızeli",
      "Zara",
      "Akıncılar",
      "Altınyayla",
      "Doğanşar",
      "Gölova",
      "Ulaş",
    ],
    Tekirdağ: [
      "Çerkezköy",
      "Çorlu",
      "Ergene",
      "Hayrabolu",
      "Malkara",
      "Muratlı",
      "Saray",
      "Süleymanpaşa",
      "Kapaklı",
      "Şarköy",
      "Marmaraereğlisi",
    ],
    Tokat: [
      "Almus",
      "Artova",
      "Erbaa",
      "Niksar",
      "Reşadiye",
      "Merkez",
      "Turhal",
      "Zile",
      "Pazar",
      "Yeşilyurt",
      "Başçiftlik",
      "Sulusaray",
    ],
    Trabzon: [
      "Akçaabat",
      "Araklı",
      "Arsin",
      "Çaykara",
      "Maçka",
      "Of",
      "Ortahisar",
      "Sürmene",
      "Tonya",
      "Vakfıkebir",
      "Yomra",
      "Beşikdüzü",
      "Şalpazarı",
      "Çarşıbaşı",
      "Dernekpazarı",
      "Düzköy",
      "Hayrat",
      "Köprübaşı",
    ],
    Tunceli: [
      "Çemişgezek",
      "Hozat",
      "Mazgirt",
      "Nazımiye",
      "Ovacık",
      "Pertek",
      "Pülümür",
      "Merkez",
    ],
    Şanlıurfa: [
      "Akçakale",
      "Birecik",
      "Bozova",
      "Ceylanpınar",
      "Eyyübiye",
      "Halfeti",
      "Haliliye",
      "Hilvan",
      "Karaköprü",
      "Siverek",
      "Suruç",
      "Viranşehir",
      "Harran",
    ],
    Uşak: ["Banaz", "Eşme", "Karahallı", "Sivaslı", "Ulubey", "Merkez"],
    Van: [
      "Başkale",
      "Çatak",
      "Erciş",
      "Gevaş",
      "Gürpınar",
      "İpekyolu",
      "Muradiye",
      "Özalp",
      "Tuşba",
      "Bahçesaray",
      "Çaldıran",
      "Edremit",
      "Saray",
    ],
    Yozgat: [
      "Akdağmadeni",
      "Boğazlıyan",
      "Çayıralan",
      "Çekerek",
      "Sarıkaya",
      "Sorgun",
      "Şefaatli",
      "Yerköy",
      "Merkez",
      "Aydıncık",
      "Çandır",
      "Kadışehri",
      "Saraykent",
      "Yenifakılı",
    ],
    Zonguldak: ["Çaycuma", "Devrek", "Ereğli", "Merkez", "Alaplı", "Gökçebey"],
    Aksaray: [
      "Ağaçören",
      "Eskil",
      "Gülağaç",
      "Güzelyurt",
      "Merkez",
      "Ortaköy",
      "Sarıyahşi",
    ],
    Bayburt: ["Merkez", "Aydıntepe", "Demirözü"],
    Karaman: [
      "Ermenek",
      "Merkez",
      "Ayrancı",
      "Kazımkarabekir",
      "Başyayla",
      "Sarıveliler",
    ],
    Kırıkkale: [
      "Delice",
      "Keskin",
      "Merkez",
      "Sulakyurt",
      "Bahşili",
      "Balışeyh",
      "Çelebi",
      "Karakeçili",
      "Yahşihan",
    ],
    Batman: ["Merkez", "Beşiri", "Gercüş", "Kozluk", "Sason", "Hasankeyf"],
    Şırnak: [
      "Beytüşşebap",
      "Cizre",
      "İdil",
      "Silopi",
      "Merkez",
      "Uludere",
      "Güçlükonak",
    ],
    Bartın: ["Merkez", "Kurucaşile", "Ulus", "Amasra"],
    Ardahan: ["Merkez", "Çıldır", "Göle", "Hanak", "Posof", "Damal"],
    Iğdır: ["Aralık", "Merkez", "Tuzluca", "Karakoyunlu"],
    Yalova: [
      "Merkez",
      "Altınova",
      "Armutlu",
      "Çınarcık",
      "Çiftlikköy",
      "Termal",
    ],
    Karabük: [
      "Eflani",
      "Eskipazar",
      "Merkez",
      "Ovacık",
      "Safranbolu",
      "Yenice",
    ],
    Kilis: ["Merkez", "Elbeyli", "Musabeyli", "Polateli"],
    Osmaniye: [
      "Bahçe",
      "Kadirli",
      "Merkez",
      "Düziçi",
      "Hasanbeyli",
      "Sumbas",
      "Toprakkale",
    ],
    Düzce: [
      "Akçakoca",
      "Merkez",
      "Yığılca",
      "Cumayeri",
      "Gölyaka",
      "Çilimli",
      "Gümüşova",
      "Kaynaşlı",
    ],
  };

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const fullNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const pwdRef = useRef();
  const matchRef = useRef();
  const errRef = useRef();

  const [fullName, setFullName] = useState("");
  const [validFullName, setValidFullName] = useState(false);
  const [fullNameFocus, setFullNameFocus] = useState(false);

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked);
  }

  useEffect(() => {
    const result = FULLNAME_REGEX.test(fullName);
    setValidFullName(result);
  }, [fullName]);

  useEffect(() => {
    const result = USERNAME_REGEX.test(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PHONENUMBER_REGEX.test(phoneNumber);
    setValidPhoneNumber(result);
  }, [phoneNumber]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [fullName, username, email, phoneNumber, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const v0 = FULLNAME_REGEX.test(fullName);
    const v1 = USERNAME_REGEX.test(username);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PHONENUMBER_REGEX.test(phoneNumber);
    const v4 = PWD_REGEX.test(pwd);

    if (!v0 || !v1 || !v2 || !v3 || !v4) {
      setErrMsg("Invalid Entry");
      return;
    }
    
    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({fullName: fullName, nickname: username, email: email, phoneNumber: phoneNumber, state: selectedDistrict, province: selectedProvince, password: pwd}),
        {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: true
        }
      );
      
      setSuccess(true);

      window.location = "/main";
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  }

  return (
    
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <div className="flex items-center justify-center mx-auto sm:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg max-w-2xl xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-blue-500 md:text-3xl text-center mt-12 sm:-mt-20">
              Kayıt Ol
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div className="mb-4">
                  <label htmlFor="fullName" className="flex flex-row items-center">
                    Ad Soyad
                    <span className={validFullName ? "valid" : "hide"}>
                      <FaCheck size={16} />
                    </span>
                    <span
                      className={
                        validFullName || !fullName ? "hide" : "invalid"
                      }
                    >
                      <FaTimes size={16} />
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="fullName"
                    ref={fullNameRef}
                    autoComplete="off"
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    aria-invalid={validFullName ? "false" : "true"}
                    aria-describedby="uidnoteFullName"
                    onFocus={() => setFullNameFocus(true)}
                    onBlur={() => setFullNameFocus(false)}
                    className="text-[#374754] sm:w-72 w-full bg-white border-[#8EC2F2] border-2 sm:text-sm rounded-sm focus:outline-none focus:border-[#2091F9] block p-2.5 h-12"
                    placeholder="Atakan Kurt"
                  />
                  <p
                    id="uidnoteFullName"
                    className={
                      fullNameFocus && fullName && !validFullName
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <CiCircleInfo size={26} />
                    Sadece harfler kullanılabilir.
                  </p>
                </div>
                <div>
                  <label htmlFor="username" className="flex flex-row items-center">
                    Kullanıcı Adı
                    <span className={validUsername ? "valid" : "hide"}>
                      <FaCheck size={16} />
                    </span>
                    <span
                      className={
                        validUsername || !username ? "hide" : "invalid"
                      }
                    >
                      <FaTimes size={16} />
                    </span>
                  </label>

                  <input
                    type="text"
                    name="username"
                    id="username"
                    ref={usernameRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    aria-invalid={validUsername ? "false" : "true"}
                    aria-describedby="uidnoteUsername"
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                    className="text-[#374754] sm:w-72 w-full bg-white border-[#8EC2F2] border-2 sm:text-sm rounded-sm focus:outline-none focus:border-[#2091F9] block p-2.5 h-12"
                    placeholder="Terzi Atakan"
                  />
                  <p
                    id="uidnoteUsername"
                    className={
                      usernameFocus && username && !validUsername
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <CiCircleInfo size={26} />
                    3 - 23 karakter sınırı. <br />
                    Harfler, numaralar, tireler, alt çizgiler kullanılabilir.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div className="mb-4">
                  <label htmlFor="email" className="flex flex-row items-center">
                    E-Posta
                    <span className={validEmail ? "valid" : "hide"}>
                      <FaCheck size={16} />
                    </span>
                    <span className={validEmail || !email ? "hide" : "invalid"}>
                      <FaTimes size={16} />
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="uidnoteEmail"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    className="text-[#374754] sm:w-72 w-full bg-white border-[#8EC2F2] border-2 sm:text-sm rounded-sm focus:outline-none focus:border-[#2091F9] block p-2.5 h-12"
                    placeholder="örnek@örnek.com"
                  />
                  <p
                    id="uidnoteEmail"
                    className={
                      emailFocus && email && !validEmail
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <CiCircleInfo size={26} />
                    Mail formatında olmalıdır. <br />
                    örnek@örnek.com
                  </p>
                </div>
                <div>
                  <label htmlFor="phone" className="flex flex-row items-center">
                    Telefon Numarası
                    <span className={validPhoneNumber ? "valid" : "hide"}>
                      <FaCheck size={16} />
                    </span>
                    <span
                      className={
                        validPhoneNumber || !phoneNumber ? "hide" : "invalid"
                      }
                    >
                      <FaTimes size={16} />
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    ref={phoneNumberRef}
                    autoComplete="off"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    aria-invalid={validPhoneNumber ? "false" : "true"}
                    aria-describedby="uidnotePhoneNumber"
                    onFocus={() => setPhoneNumberFocus(true)}
                    onBlur={() => setPhoneNumberFocus(false)}
                    pattern="[0-9]{10}"
                    className="text-[#374754] sm:w-72 w-full bg-white border-[#8EC2F2] border-2 sm:text-sm rounded-sm focus:outline-none focus:border-[#2091F9] block p-2.5 h-12"
                    placeholder="5555555555"
                  />
                  <p
                    id="uidnotePhoneNumber"
                    className={
                      phoneNumberFocus && phoneNumber && !validPhoneNumber
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <CiCircleInfo size={26} />
                    Başında 0 olmadan <br />
                    10 karakter uzunluğunda <br />
                    Sadece sayı kabul edilir.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div className="mb-4">
                  <label htmlFor="province">İl</label>
                  <select
                    id="province"
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    className="text-[#374754] sm:w-72 w-full bg-white border-[#8EC2F2] border-2 sm:text-sm rounded-sm focus:outline-none focus:border-[#2091F9] block p-2.5 h-12"
                  >
                    <option disabled value="">
                      İl Seç
                    </option>
                    {provinces.map((province, index) => (
                      <option key={index} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="district">İlçe</label>
                  <select
                    id="district"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    className="text-[#374754] sm:w-72 w-full bg-white border-[#8EC2F2] border-2 sm:text-sm rounded-sm focus:outline-none focus:border-[#2091F9] block p-2.5 h-12"
                  >
                    <option disabled value="">
                      İlçe Seç
                    </option>
                    {selectedProvince &&
                      districts[selectedProvince].map((district, index) => (
                        <option key={index} value={district}>
                          {district}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div className="mb-4">
                  <label htmlFor="password" className="flex flex-row items-center">
                    Şifre
                    <span className={validPwd ? "valid" : "hide"}>
                      <FaCheck size={16} />
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                      <FaTimes size={16} />
                    </span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdNote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    placeholder="••••••••"
                    className="text-[#374754] sm:w-72 w-full bg-white border-[#8EC2F2] border-2 sm:text-sm rounded-sm focus:outline-none focus:border-[#2091F9] block p-2.5 h-12"
                  />
                  <p
                    id="pwdNote"
                    className={
                      pwdFocus && !validPwd ? "instructions" : "offscreen"
                    }
                  >
                    <CiCircleInfo size={26} />
                    8 ve 24 karakter sayısı aralığında. <br />
                    Büyük karakter, küçük karakter, en az bir sayı ve özel
                    karakter bulunmalıdır. <br />
                    İzin verilen özel karakterler:{" "}
                    <span aria-label="exclamation mark">!</span>{" "}
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent">%</span>
                  </p>
                </div>
                <div>
                  <label htmlFor="confirm_pwd" className="flex flex-row items-center">
                    Şifre Tekrar
                    <span className={validMatch ? "valid" : "hide"}>
                      <FaCheck size={16} />
                    </span>
                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                      <FaTimes size={16} />
                    </span>
                  </label>
                  <input
                    type="password"
                    name="confirm_pwd"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    placeholder="••••••••"
                    className="text-[#374754] sm:w-72 w-full bg-white border-[#8EC2F2] border-2 sm:text-sm rounded-sm focus:outline-none focus:border-[#2091F9] block p-2.5 h-12"
                  />
                  <p
                    id="confirmnote"
                    className={
                      matchFocus && !validMatch ? "instructions" : "offscreen"
                    }
                  >
                    <CiCircleInfo size={26} />
                    Girilen şifre ile aynı olmalıdır.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="user-agreement"
                      aria-describedby="user-agreement"
                      type="checkbox"
                      className="w-4 h-4 border border-[#B0B0B0] rounded bg-gray-50 accent-blue-500"
                      required
                      checked={isChecked}
                      onChange={handleCheckBoxChange}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="user-agreement"
                      className="text-[#374754] text-xs"
                    >
                      <Link
                        to="/terms"
                        className="text-blue-500 hover:underline"
                      >
                        Kullanıcı Sözleşmesini
                      </Link>{" "}
                      okudum, kabul ediyorum.
                    </label>
                  </div>
                </div>
              </div>
              <div class="flex justify-between">
                <Link to="/">
                  <button
                    class="border-2 border-blue-500 flex items-center text-blue-500 bg-white hover:text-white hover:bg-blue-600 focus:outline-none font-medium rounded-sm text-sm px-3 py-3 text-center"
                  >
                    <BiChevronLeft size={26} class="" />
                    <span class="mr-2">Geri Dön</span>
                  </button>
                </Link>
                
                  <button
                    disabled={!validFullName || !validUsername || !validEmail || !validPhoneNumber || !validPwd || !validMatch || !isChecked ? true : false}
                    type="submit"
                    class="border-2 border-blue-500 flex items-center text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded-sm text-sm px-3 py-3 text-center"
                  >
                    <span class="ml-2">Devam Et</span>
                    <BiChevronRight size={26} class="" />
                  </button>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;