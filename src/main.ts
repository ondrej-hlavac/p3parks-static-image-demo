import { encode } from "@googlemaps/polyline-codec";

import { coordinates10800, coordinates3600, coordinates7200 } from "./mockData";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
// const MAP_STYLE = "mapbox://styles/ondrejhlavac/cl4cdrah9001514ucxn051ikh";
const USER_NAME = "ondrejhlavac";
const STYLE_ID = "cl4cdrah9001514ucxn051ikh";
const POLYGON_STYLE = "0+10509b+10509b-0.1";

const parkData = {
  id: "a11220",
  name: "P3 Prague Horní Počernice",
  lat: 50.1210594177,
  lng: 14.6083402634,
  url: "/cs/nase-lokality/ceska-republika/p3-prague-horni-pocernice",
  contactUrl:
    "/cs/kontakt?name=Jan&surname=Andrus&email=jan.andrus@p3parks.com&phone=%2b420+602+630+236&job=Head+of+Leasing+Czech+Republic&park=P3+Prague+Horn%c3%ad+Po%c4%8dernice&parkAssetId=a11220&parkCountry=CZE",
  countryId: "a9546",
  totalSpace: 405596,
  totalSpaceFormatted: "405 596",
  availableSpace: 6749,
  availableSpaceFormatted: "6 749",
  availableWarehouseSpace: 1693,
  availableWarehouseSpaceFormatted: "1 693",
  availableOfficeSpace: 5056,
  availableOfficeSpaceFormatted: "5 056",
  parkSize: 0,
  parkSizeFormatted: 0,
  bts: 0,
  btsFormatted: 0,
  buildUp: 405596,
  buildUpFormatted: 0,
  markerOnly: false,
  liveCamera: false,
  perex:
    "P3 Prague Horní Počernice se nachází v okrese Praha-východ, 15 minut od centra Prahy, na exitu 3 rychlostní silnice D10 (Praha – Mladá Boleslav – Německo). Nákupní středisko Centrum Černý Most je odsud vzdáleno 1,5 km. Park je snadno dostupný...",
  pois: ["a17442", "a17444", "a17443", "a17445"],
  hasPort: true,
  hasAirport: true,
  coverPhoto: "/imgm/cs/YTE3MDc3fGE2ODc1MXxhMTcxNTZ8YTY5NzU4_epBqA/default.jpg",
};

const translateLngLat = (coordinates: number[][]) => {
  return coordinates.map((coordinate: number[]) => {
    return [coordinate[1], coordinate[0]];
  });
};

// const encodedPath = encode(translateLngLat(coordinates3600));
// console.log("encoded", encodeURIComponent(encodedPath));

const polygonsData: number[][][] = [
  coordinates3600,
  coordinates7200,
  coordinates10800,
];

const generatePolygonsToUrl = () => {
  return polygonsData
    .map((polygonCoordinates: number[][]) => {
      return `path-${POLYGON_STYLE}(${encodeURIComponent(
        encode(translateLngLat(polygonCoordinates))
      )})`;
    })
    .join(",");
};

/**
 * Path docs: https://docs.mapbox.com/api/maps/static-images/#path
 * path-{strokeWidth}+{strokeColor}-{strokeOpacity}+{fillColor}-{fillOpacity}({polyline})
 */

const buildStaticMapUrl = () => {
  return `https://api.mapbox.com/styles/v1/${USER_NAME}/${STYLE_ID}/static/${generatePolygonsToUrl()},pin-s+00ad85(${
    parkData.lng
  },${parkData.lat})/auto/1280x1280@2x/?access_token=${MAPBOX_TOKEN}`;
};

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <img src="${buildStaticMapUrl()}" width="100%"/>
  </div>
`;

// EXAMPLE CODE
// https://api.mapbox.com/styles/v1/{username}/{style_id}/static/{overlay}/{lon},{lat},{zoom},{bearing},{pitch}|{bbox}|{auto}/{width}x{height}{@2x}

// const mapboxPath =
//   "wirpHc`f`B??_~FTEB_yAl{BADbEf}AwiJlpKsyBxQo}H_}@ciHktCA?enD}~@}DsAILbtAxsAhbAdvAhbD~jJsHzlFaTh_BwXznADJ|IRxlHbwM_FpO?@aL`xA?@kDlwN_`BneACBo}AffF?BtUbsEwi@nbD_aBfyHauDfcDgQzIilNwlGip@it@ipCseDIA{YpG??c@PCBe|AlyFs`CbbDibMhfA_U}BA?mGd@C@g~DdzBysIf{A??MDA@IH??}fEtiEg_KxbGAB}Onc@??ob@xxA??ssBzjLkuC`gIajHxkJABa]rxO{a@xvF@D`xDx_ELGi@kFbgDqvKfnLxOrgFjsFppApyAdnFd|Isq@rdFeY|v@suAn~B??uk@juAy^zn@??qXhk@??]v@??_XbdA?BxUpyB??xYrvB@BxgK`zJ_eBb}FABnDx`A^|NaCvdFDF~xKvy@`{E|uHdWddMgdCxnHA?qbA|~Dg_DjcGA@eCf[?@gAh^qw@poNccCniN??AP??yDj}AcvB~tG}oFjzC{eLdyEuuA`SgCX??{B`@??k@NA?aBj@??UH??gBz@??eBbAA?aBlAAJr{Eh_Kbj@|xB?@trAvjB??pdDfaDf{AxlLDDduLluB`gBjaA@?xpHtrAB?d{G{dA@?fx@u_@jdCieABCbBkI?CuKghEfiBipFhgOniD_v@ddD?Fp_@to@J@viF}wD?Avd@{`@nfA{s@bjL`iAhr@hlF??f]lpB?@zmBhoFho@nuB@?vt@zwALAd_@enAnv@aoB??reCyzK??v`@seCx_CkaJxdB{xDfiOk|C`|E`tG??dsDf_E??`~J`wJhwEfsF?@xaJhrHbbAtnCNCLm`@??AkE??GoE??MiE??S}D?A]uE??a@kE??]qC??a@uC??[mBgRmlA?AynAk|CykBioGol@cwKxBejEjJceC?AqOioA}h@wcGaK{aEQeeE??kAyMxiBssIlyKrs@f}HzwJFB~_@eE@?r|FinCt|Aqo@@?xYaTBI_{@ikB?AinDw}Eo_CmkGifA{fKACopEetEu{E}}IogAsyD?Ao}DsjLj|C}yMp}FiwG?AdgGy{H~cGycC@A~m@ip@??biEefIAKqyAuy@ecGuyGk~AmrG??_}A{kGfsAstO~_AwaBboG{dJ?Ee}@g{It_DeqLzSaY@AbqAwxJrxBasE@CjDqnC?A{Qg{FMAmD~H??eB|D??_BxD??uArD??mAfD??u@|B??q@xB??s@dC??IV??}@jD?@w@pD??g@dC??c@jC??[nB??UlB??WvB}zF`sGwwH{iAE?}fE~jCgmDv{A??}|@hk@CDgt@fbFcsO{`C_p@glBA?w]su@ekB_iOom@clM??qgAqaPCCwuAscACAmvBkVgwEm~AakHwcJwu@yyMAAk_BgeHwpAqlJxhC_hMAEsD}GA?spFwpIheaI??rY_|H??@aA??k@q[??O{C??QqB?Aa@qC?Ak@iC??s@gC??oc@mzAGE";

// // console.log(
// //   "🚀 ~ file: main.ts ~ line 50 ~ encode(coordinates3600)",
// //   urlencode(mapboxPath)
// // );
