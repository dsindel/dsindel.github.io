
/****************************************************************************

    GeoLocator - geotagging tool

    v 1.35, 20180408

    2008-2018 Teslaton [http://en.wikipedia.org/wiki/User:Teslaton]

    http://en.wikipedia.org/wiki/User:Teslaton/Tools/GeoLocator

    license: GNU LGPL

 ****************************************************************************/


/* class OEUtil */

function OEUtilClass()
{
  function dumpScalarValue(AObject)
  {
    var result = '';
    var propertyValue = AObject;
    if (typeof(AObject) == 'string')
      propertyValue = '\'' + propertyValue + '\'';
    result += (AObject === null ? '' : '(' + typeof(AObject) + ') ') + propertyValue;
    return result;
  }
  this.dumpScalarValue = dumpScalarValue;

  function dumpProperties(AObject, AObjectName, ASeparator)
  {
    if (!ASeparator)
      ASeparator = ";\n";
    var result = '';

    if (typeof(AObject) != 'string')
      for (propertyName in AObject)
        result += (AObjectName ? AObjectName + '.' : '.') + propertyName + ' = ' + this.dumpScalarValue(AObject[propertyName]) + ASeparator;

    result += (AObjectName ? AObjectName + ' = ' : '') + this.dumpScalarValue(AObject) + ASeparator;

    return result;
  }
  this.dumpProperties = dumpProperties;

  function vd(AObject, AObjectName)
  {
    alert(this.dumpProperties(AObject, AObjectName));
    return AObject;
  }
  this.vd = vd;

  function getAbsPos(el)
  {
    if (!el)
      return null;

    var pp = (el.offsetParent ? getAbsPos(el.offsetParent) : null);
    var x = el.offsetLeft + (pp ? pp[0] : 0);
    var y = el.offsetTop  + (pp ? pp[1] : 0);

    return [x, y];
  }
  this.getAbsPos = getAbsPos;

  function getElementsByClassName(className, tagName, rootElement)
  {
    if (!rootElement)
      rootElement = document.documentElement;
    if (!tagName)
      tagName = '*';
    var elements = rootElement.getElementsByTagName(tagName);
    var re = new RegExp('\\b' + className + '\\b');
    var result = [];
    var j = 0;
    for (var i = 0; i < elements.length; i++) {
      if (re.test(elements[i].className))
        result[j++] = elements[i]; // JS5 compatible array.push();
    }
    return result;
  }
  this.getElementsByClassName = getElementsByClassName;

  function hasClass(el, className)
  {
    var l = el.className.toString().split(/\s+/);
    for (var i = 0; i < l.length; i++)
      if (l[i] == className)
        return true;
    return false;
  }
  this.hasClass = hasClass;

  function addClass(el, className)
  {
    if (!this.hasClass(el, className))
      el.className += (el.className ? " " : "") + className;
  }
  this.addClass = addClass;

  function removeClass(el, className)
  {
    var l = el.className.toString().split(/\s+/);
    var cn = "";
    for (var i = 0; i < l.length; i++)
      if (l[i] != className)
        cn += (cn ? " " : "") + l[i];
    el.className = cn;
  }
  this.removeClass = removeClass;

  function setClass(el, className, present)
  {
    if (present)
      this.addClass(el, className);
    else
      this.removeClass(el, className);
  }
  this.setClass = setClass;

  function decodeUrlQuery(q)
  {
    if (!q && q !== "")
      // use current browser location as default
      q = window.location.search;
    q = q + ''; // force string
    if (q.length > 1 && q.charAt(0) == '?')
      q = q.substring(1, q.length); // remove '?'
    var ql = q.split('&');
    var data = {};
    for (var i = 0; i < ql.length; i++) {
      var qi = ql[i].split('=');
      data[unescape(qi[0])] = (qi.length > 1 ? unescape(qi[1]) : true);
    }
    return data;
  }
  this.decodeUrlQuery = decodeUrlQuery;

  function encodeUrlQuery(params, nonEmptyPrefix)
  {
    var q = '';
    for (var name in params) {
      if (params[name] !== false && params[name] !== null)
        q += (q ? '&' : '') + escape(name) + (params[name] === true ? '' : '=' + escape(params[name]));
    }
    if (q && nonEmptyPrefix)
      q = nonEmptyPrefix + q;
    return q;
  }
  this.encodeUrlQuery = encodeUrlQuery;

  function initTrace()
  {
    if (!this.eTrace) {
      this.eTrace = document.getElementById("eTrace");
      if (this.eTrace) {
        this.eTrace.style.display = "";
        if (this.traceMarkup)
          this.eTrace.innerHTML = this.traceMarkup;
      } else {
        this.eTrace = false;
      }
    }
  }
  this.initTrace = initTrace;

  function trace(text, title)
  {
    this.initTrace();

    var markup = text + "";
    markup = markup.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    if (!this.traceMarkup)
      this.traceMarkup = "";
    this.traceMarkup += markup + "<br />";

    if (this.eTrace)
      this.eTrace.innerHTML = this.traceMarkup;

    return text;
  }
  this.trace = trace;

  var _this = this;
  setTimeout(function() { _this.initTrace(); }, 1000);

  function setCookie(name, value, expires, path, domain, secure)
  {
    var curCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");

    alert("setCookie: '" + curCookie + "'");

    document.cookie = curCookie;
  }
  this.setCookie = setCookie;

  function getCookie(name)
  {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);

    if (begin < 0) {
      begin = dc.indexOf(prefix);
      if (begin != 0)
        return null;
    } else
      begin += 2;

    var end = document.cookie.indexOf(";", begin);

    if (end == -1)
      end = dc.length;

    return unescape(dc.substring(begin + prefix.length, end));
  }
  this.getCookie = getCookie;
}

OEUtil = new OEUtilClass();

if (typeof(trace) == "undefined")
  trace = function(text, title) { return OEUtil.trace(text, title); };
if (typeof(vd) == "undefined")
  vd = function(value, title) { return OEUtil.vd(value, title); };



/* class ShowHide */

function ShowHideHelper()
{
  this.mapLinkIdToBoxId = {};
  this.strings = {
    'sh/show': 'show \u25BC',
    'sh/hide': 'hide \u25B2'
    // 'sh/show': '\u00A0\u25BC\u00A0',
    // 'sh/hide': '\u00A0\u25B2\u00A0'
  };

  function show(el)
  {
    this.showHide(el, null, true);
  }
  this.show = show;

  function hide(el)
  {
    this.showHide(el, null, false);
  }
  this.hide = hide;

  function flip(el)
  {
    this.showHide(el, null, null);
  }
  this.flip = flip;

  function showHide(elBox, elLink, show)
  {
    if (elBox == "*")
      for (var i in this.mapLinkIdToBoxId)
        this.showHide(this.mapLinkIdToBoxId[i], null, show);
    else {
      var elBox = (typeof(elBox) == "string" ? document.getElementById(elBox) : elBox);
      var elLink = (elLink ? (typeof(elLink) == "string" ? document.getElementById(elLink) : elLink) : document.getElementById(elBox.id + "Link"));
      var visible = (elBox.style.display != "none");
      visible = (show ? true : (show === false ? false : !visible));
      elBox.style.display = (visible ? "" : "none");
      if (elLink)
        elLink.innerHTML = this.strings[(visible ? "sh/hide" : "sh/show")];
    }
  }
  this.showHide = showHide;

  function bindElements()
  {
    var elements = OEUtil.getElementsByClassName("showHide");
    this.mapLinkIdToBoxId = {};
    var _this = this;
    for (var i = 0; i < elements.length; i++) {
      var elBox = elements[i];
      var idBox = elBox.id;
      var idLink = idBox + "Link";
      var elLink = document.getElementById(idLink);
      if (elLink) {
        this.mapLinkIdToBoxId[idLink] = idBox;
        elLink.onclick = function(e0) {
          var e = (e0 ? e0 : event);
          var boxId = _this.mapLinkIdToBoxId[this.id];
          if (e.ctrlKey) {
             // Show/hide all
             var visible = document.getElementById(boxId).style.display != "none";
            _this.showHide('*', null, !visible);
          } else
             // Show/hide current
            _this.flip(boxId);
          return false;
        };
      }
      var visible = !elBox.className.match(/\bhidden\b/) && !(elBox.style.display == "none");
      this.showHide(elBox, elLink, visible); // initial visibility
    }
  }
  this.bindElements = bindElements;
}

showHide = new ShowHideHelper();


/* class GeoLocator */

function GeoLocator()
{
  this.templateElements = {};
  this.templateTexts = {};
  this.map = null;
  this.marker = null
  this.coordData = null;
  this.geoHackParams = {};
  // this.geoHackRegionMode = "auto";
  this.geoHackRegionMode = "";
  this.extraParams = {};
  this.secPrecision = 2;
  this.minPrecision = 4;
  this.degPrecision = 6;
  this.headingPoints = 16;
  this.dimPrecision = 2;
  this.geocodingThreshold = 50; // duplicit rev.geocoding requests within 100 m will be dispatched from cache
  this.knownElements = [
    'fQuery', 'iQuery', 'eQueryErrors',
    'bApply', 'bClear',
    'iGeoHackType', 'iGeoHackDim', 'iGeoHackScale', 'iGeoHackRegionMode', 'iGeoHackRegion', 'iHeadingPoints', 'iDimPrecision', 'iSecPrecision', 'iDegPrecision',
    'iPrecRectDeg', 'iPrecRectSec', 'iPrecRectMin', 'iPrecRect1Deg',
    'lPrecRectDeg', 'lPrecRectSec', 'lPrecRectMin', 'lPrecRect1Deg',
    'eDisplayScale',
    'aTypeClear', 'aDimClear', 'aScaleClear', 'aRegionClear',
    'aCfgSave', 'aCfgLoad', 'aCfgReset',
    'trHeading', 'trJtsk', 'aHeadingClear',
    'eMap', 'eMapCoords', 'eMapPixelScale', 'eMapElevation', 'eMapDistance', 'eMapHeading', 'eMapRegion',
    'iSearch',
    'fCustomTemplate', 'iCustomTemplate', 'eCustomTemplate', 'iCustomTemplateDefault', 'pCustomTemplate',
    'iLanguage'
  ];
  this.headings = [
    'N', 'NbE', 'NNE', 'NEbN', 'NE', 'NEbE', 'ENE', 'EbN',
    'E', 'EbS', 'ESE', 'SEbE', 'SE', 'SEbS', 'SSE', 'SbE',
    'S', 'SbW', 'SSW', 'SWbS', 'SW', 'SWbW', 'WSW', 'WbS',
    'W', 'WbN', 'WNW', 'NWbW', 'NW', 'NWbN', 'NNW', 'NbW'
  ];
  this.mapTypeToScale = {
    'country': 10000000,
    'satellite': 10000000,
    'adm1st': 1000000,
    'adm2nd': 300000,
    'adm3rd': 100000,
    'state': 3000000,
    // 'city(pop)': 30000 ... 300000,
    'city': 100000,
    'airport': 30000,
    'mountain': 100000,
    'isle': 100000,
    'waterbody': 100000,
    'forest': 50000,
    'river': 100000,
    'glacier': 50000,
    'event': 50000,
    'edu': 10000,
    'pass': 10000,
    'railwaystation': 10000,
    'landmark': 10000
  };
  this.mapTypeToAbbr = {
    'railwaystation': 'railwayst.'
  };
  this.loc = {
    "gl/queryParseError": "Unable to parse coordinates text",
    "gl/markupPrompt":    "Geotag to copy to clipboard [Ctrl+C]:",
    "gl/elevation":       "elevation",
    "gl/region":          "region"
  };
  this.languages = {
    'en': "English",
    'pl': "English (pl)",
    'sk': "Sloven\u010Dina"
  };
  this.selectedLangId = 'en';
  this.mapMapTypeUrlArgToMapType = {
    'm': google.maps.MapTypeId.ROADMAP,
    'k': google.maps.MapTypeId.SATELLITE,
    'h': google.maps.MapTypeId.HYBRID,
    'p': google.maps.MapTypeId.TERRAIN
  }
  this.mapTypeToCopyrightMarkup = {
  };

  this.diameterCircleRadius = null;
  this.diameterCircleUpdating = false;
  this.diameterCircle = null;

  this.eventTickCounter = 0;

  function precisionsChanged()
  {
    this.setCoordDec(this.coordData['lat'], this.coordData['lon']);
    this.setDiameter((this.diameterCircleRadius ? this.diameterCircleRadius * 2 : null), true, false);

    if (this.lPrecRectDeg)
      this.lPrecRectDeg.innerHTML = Math.pow(10, -this.degPrecision) + '°';
    if (this.lPrecRectSec)
      this.lPrecRectSec.innerHTML = Math.pow(10, -this.secPrecision) + '"';

    this.refreshErrorRects();
  }
  this.precisionsChanged = precisionsChanged;

  /* Assigns list of elements, initially containing coord templates */
  function bindTemplateElements(elements)
  {
    this.templateElements = [];
    this.templateTexts = [];
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (typeof(el) == "string")
        el = document.getElementById(el);
      this.templateElements["t" + i] = el;
      this.templateTexts["t" + i] = el.innerHTML;
    }
  }
  this.bindTemplateElements = bindTemplateElements;

  /* Assigns custom element and it's coord template */
  function addTemplateElement(name, element, templateMarkup)
  {
    this.templateElements[name] = ((typeof(element) == "string") ? document.getElementById(element) : element);
    this.templateTexts[name] = templateMarkup;

    this.templateElements[name].innerHTML = this.expandTemplate(this.templateTexts[name]);
  }
  this.addTemplateElement = addTemplateElement;

  /* Fills template elements with given data (coord macro values) */
  function fillTemplateElements(data)
  {
    if (this.trHeading)
      this.trHeading.style.display = (data["heading"] ? "" : "none");
    if (this.trJtsk)
      this.trJtsk.style.display = (data["latjtsk"] ? "" : "none");

    for (var key in this.templateElements) {
      // vd(this.templateTexts[key]);
      this.templateElements[key].innerHTML = this.expandTemplate(this.templateTexts[key], data);
    }
  }
  this.fillTemplateElements = fillTemplateElements;

  /* Fills template markup with given data (coord macro values) */
  function expandTemplate(template, data)
  {
    if (!data)
      data = this.coordData;

    // alert(template);

    var markup = template;

    // Evaluate embedded javascript code tag, e.g.: {% (lonEW == 'E' ? 'v.d.' : 'z.d.') %}
    markup = markup.replace(/(\{%u?|%7B%)\s*(.*?)\s*(%\}|%%7D)/g, function(match, ldelim, code) {
      try {
        // alert(ldelim);
        if (ldelim.length > 2) {
          code = unescape(code);
          // vd(code);
        }
        // trace(match);
        with (data) {
          return eval(code);
        }
      } catch (e) {
        return '"' + match + '": exception: "' + e + '"';
      }
    });

    markup = markup.replace(/(?:\{|%7B)([a-zA-Z0-9_-]*?)(?:\:([0-9]+))?(?:\}|%7D)/g, function(match, varName, width) {
      if (typeof(data[varName]) == "undefined") {
        // trace(match)
        return match;
      }
      var markup = data[varName];

      // Pad with '0's from the left to the width
      if (width) {
        markup = markup + ""; // force string
        var match = markup.match(/([0-9]+)/);
        if (match) {
          var padWidth = width - match[1].length;
          if (padWidth > 0)
            markup = markup.replace(/([0-9]+)/, "00000000000000000000".substr(0, padWidth) + '$1');
        }
      }

      return markup;
    });

    markup = markup.replace(/\\\{(?:\\(%))?/g, "{$1").replace(/(?:\\(%))?\\\}/g, "$1}")

    var re = new RegExp("(<(code|pre)>((?:.|\n|\r)*?)</\\2>)", "gi"); // Opera requires explicit \r
    markup = markup.replace(re, '<a class="code $2" href="#" onclick="return geoLocator.codeOnClick(this);">$1</a>');
    // markup = markup.replace(re, '<a class="code" href="#" onclick="return geoLocator.codeOnClick(this);" onmouseover="return geoLocator.codeOnMouseOver(this);" onmouseout="return geoLocator.codeOnMouseOut(this);">$1</a>');

    return markup;
  }
  this.expandTemplate = expandTemplate;

  function codeOnClick(el)
  {
    var markup = (el.innerText ? el.innerText : el.textContent);

    markup = (markup + '');
    markup = markup.replace(/(?:\s|\n)*\n(?:\s|\n)*/g, ' '); // [whitespace]?[newline][whitespace]? -> [single space]
    markup = markup.replace(/^\s+|\s+$/g, '');               // trim

    prompt(this.loc['gl/markupPrompt'], markup);

    return false; // for onclick event
  }
  this.codeOnClick = codeOnClick;

  /**
  * Returns the zoom level at which the given rectangular region fits in the map view.
  * The zoom level is computed for the currently selected map type.
  * @param {google.maps.Map} map
  * @param {google.maps.LatLngBounds} bounds
  * @return {Number} zoom level
  **/
  // http://stackoverflow.com/questions/9837017/equivalent-of-getboundszoomlevel-in-gmaps-api-3
  function getZoomByBounds(map, bounds) {
    // var MAX_ZOOM = map.mapTypes.get(map.getMapTypeId()).maxZoom || 21;
    // var MIN_ZOOM = map.mapTypes.get(map.getMapTypeId()).minZoom || 0;
    // !!!
    var MAX_ZOOM = 21;
    var MIN_ZOOM = 0;

    // !!!
    return 0;

    var ne= map.getProjection().fromLatLngToPoint(bounds.getNorthEast());
    var sw= map.getProjection().fromLatLngToPoint(bounds.getSouthWest());

    var worldCoordWidth = Math.abs(ne.x-sw.x);
    var worldCoordHeight = Math.abs(ne.y-sw.y);

    //Fit padding in pixels
    var FIT_PAD = 40;

    for (var zoom = MAX_ZOOM; zoom >= MIN_ZOOM; --zoom) {
      if (worldCoordWidth*(1<<zoom)+2*FIT_PAD < $(map.getDiv()).width() && worldCoordHeight*(1<<zoom)+2*FIT_PAD < $(map.getDiv()).height())
        return zoom;
    }
    return 0;
  }
  this.getZoomByBounds = getZoomByBounds;

  function getCopyrightMarkupForMapTypeId(mapTypeId)
  {
    // var markup =
    //   '<a href="http://www.openstreetmap.org/">&copy; OSM contributors</a>, ' +
    //   '<a href="http://www.freemap.sk/">Freemap.sk</a>';
    var markup = (this.mapTypeToCopyrightMarkup[mapTypeId] ? this.mapTypeToCopyrightMarkup[mapTypeId] : '');
    markup = markup.replace(/(<a .*?)(>)/g, '$1 target="_blank" style="text-decoration: none; cursor: pointer; color: rgb(68, 68, 68);" $2').replace(/!!!/g, "&lt;");
    // markup = mapTypeId + ': ' + markup;
    return markup;
  }
  this.getCopyrightMarkupForMapTypeId = getCopyrightMarkupForMapTypeId;

  function showCopyrightForMapTypeId(mapTypeId)
  {
    mapTypeId = (mapTypeId ? mapTypeId : this.map.getMapTypeId());
    var el = document.getElementById('eCopyrightText');
    var markup = this.getCopyrightMarkupForMapTypeId(mapTypeId);
    if (el)
      el.innerHTML = (markup ? markup : '');
  }
  this.showCopyrightForMapTypeId = showCopyrightForMapTypeId;

  // Creates search box control via Google Places API (requires "places" library in API URL)
  function initSearchBox()
  {
    var _this = this;

    if (!this.iSearch)
      return;

    // Create search box control using #iSearch input
    this.map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(this.iSearch);
    this.searchBox = new google.maps.places.SearchBox(this.iSearch);
    this.iSearch.style.display = "";

    // Force search box to stay above license blocks
    // this.iSearch.style.zIndex = 1999999;
    setInterval(function() {
      _this.iSearch.style.zIndex = 1999999;
      }, 500);

    // Attach handler to clear current markers on submit of empty query
    this.iSearch.onkeydown = function(e0) {
      var e = (e0 ? e0 : event);
      if (e.keyCode == 13 && _this.iSearch.value === '' && _this.searchBoxMarkers) {
        for (var i = 0, marker; marker = _this.searchBoxMarkers[i]; i++)
          marker.setMap(null);
        _this.searchBoxMarkers = [];
      }
    }

    // Attach handler to show results
    google.maps.event.addListener(this.searchBox, 'places_changed', function() {
      var places = _this.searchBox.getPlaces();

      if (_this.searchBoxMarkers) {
        for (var i = 0, marker; marker = _this.searchBoxMarkers[i]; i++)
          marker.setMap(null);
      }
      _this.searchBoxMarkers = [];

      if (!places.length)
        return;

      // For each place, get the icon, place name, and location.
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0, place; place = places[i]; i++) {
        var image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          // anchor: new google.maps.Point(17, 34),
          anchor: new google.maps.Point(10, 20),
          scaledSize: new google.maps.Size(20, 20)
        };

        // Create a marker for each place.
        var marker = new google.maps.Marker({
          map: _this.map,
          icon: image,
          title: place.name,
          position: place.geometry.location
        });

        _this.searchBoxMarkers.push(marker);

        if (place.geometry.viewport)
          bounds.union(place.geometry.viewport);
        else
          bounds.extend(place.geometry.location);
      }

      _this.map.fitBounds(bounds);
    });

    // Attach handler to bias results towards places that are within/near the bounds of the current map's viewport.
    google.maps.event.addListener(this.map, 'bounds_changed', function() {
      var bounds = _this.map.getBounds();
      _this.searchBox.setBounds(bounds);
    });
  }
  this.initSearchBox = initSearchBox;


  /* Sets-up embedded Google Map */
  function initGoogleMap()
  {
    var _this = this;

    var elMap = this.eMap;

    // alert(G_API_VERSION);

    // if (elMap && GBrowserIsCompatible()) {
    if (elMap) {

      // var options = new GMapOptions();
      var options = {};
      // options['googleBarOptions'] = {};
      // options['googleBarOptions']['resultList'] = G_GOOGLEBAR_RESULT_LIST_SUPPRESS;
      // options['googleBarOptions']['showOnLoad'] = true;

      var mapTypeIds = [];
      for (var type in google.maps.MapTypeId)
        mapTypeIds.push(google.maps.MapTypeId[type]);
      mapTypeIds.push("osm");
      mapTypeIds.push("ocm");
      mapTypeIds.push("mtb");
      if (this.selectedLangId == 'sk') {
        mapTypeIds.push("fm");
      }

      // var initialMapType = (this.initialMapType ? this.initialMapType : google.maps.MapTypeId.HYBRID);
      var initialMapType = google.maps.MapTypeId.HYBRID;
      for (var i in mapTypeIds)
        if (mapTypeIds[i] == this.initialMapType)
          initialMapType = this.initialMapType;

      // options.center = new google.maps.LatLng(-25.363882, 131.044922);
      options.zoom = 1;
      options.mapTypeId = initialMapType;
      options.mapTypeControlOptions = {
        mapTypeIds: mapTypeIds
      };
      options.scaleControl = true;
      options.tilt = 0;  // no 45 deg tilt at z18+ by default
      options.gestureHandling = 'greedy';  // do not require Ctrl+scroll to zoom a map

      // Create map instance
      var map = new google.maps.Map(elMap, options);
      this.map = map;

      // Add search box
      this.initSearchBox();

      // Add custom map types
      map.mapTypes.set("osm", new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
            return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        name: "OSM",
        alt: "OpenStreetMap",
        maxZoom: 19
      }));
      this.mapTypeToCopyrightMarkup['osm'] = '<a href="http://www.openstreetmap.org/">&copy; OSM contributors</a>';

      map.mapTypes.set("ocm", new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
            // return "http://tile.opencyclemap.org/cycle/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
            return "https://tile.thunderforest.com/cycle/" + zoom + "/" + coord.x + "/" + coord.y + ".png?apikey=db98f3462dbe42f7b38edf491897e138";
        },
        tileSize: new google.maps.Size(256, 256),
        name: "OCM",
        alt: "OpenCycleMap",
        maxZoom: 18
      }));
      this.mapTypeToCopyrightMarkup['ocm'] = this.mapTypeToCopyrightMarkup['osm'];

      // http://tile.mtbmap.cz/mtbmap_tiles/13/4537/2806.png
      map.mapTypes.set("mtb", new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
            return "http://tile.mtbmap.cz/mtbmap_tiles/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        name: "MTB",
        alt: "MTBmap.cz" + (this.selectedLangId == 'sk' ? " (pokrytie: EUR)" : " (Europe only)"),
        minZoom: 0,
        maxZoom: 18
      }));
      this.mapTypeToCopyrightMarkup['mtb'] = this.mapTypeToCopyrightMarkup['osm'] + ', <a href="http://www.mtbmap.cz/">MTBmap.cz</a>';

      if (this.selectedLangId == 'sk') {
        map.mapTypes.set("fm", new google.maps.ImageMapType({
          getTileUrl: function(coord, zoom) {
              // return "http://www.freemap.sk/T/" + zoom + "/" + coord.x + "/" + coord.y + ".jpeg";
              return "https://c.freemap.sk/T/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
          },
          tileSize: new google.maps.Size(256, 256),
          name: "Freemap",
          alt: "Freemap.sk (pokrytie: SK)",
          minZoom: 5,
          maxZoom: 16
        }));
        this.mapTypeToCopyrightMarkup['fm'] = this.mapTypeToCopyrightMarkup['osm'] + ', <a href="http://www.freemap.sk/">Freemap.sk</a>';
      }

      copyrightDiv = document.createElement("div");
      copyrightDiv.innerHTML =
        '<div id="eCopyright" class="gmnoprint gm-style-cc" style=""><div style="opacity: 0.7; width: 100%; height: 100%; position: absolute;"><div style="background-color: rgb(245, 245, 245); width: auto; height: 100%; margin-left: 1px;"></div></div><div id="eCopyrightText" style="position: relative; padding-right: 6px; padding-left: 6px; font-family: Roboto, Arial, sans-serif; font-size: 10px; color: rgb(68, 68, 68); white-space: nowrap; direction: ltr; text-align: right;">' +
        this.getCopyrightMarkupForMapTypeId(options.mapTypeId) +
        '</div></div>';
      // copyrightDiv.innerHTML = '<div style="background: yellow; color: black">test</div>';
      copyrightDiv = copyrightDiv.childNodes[0];
      map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(copyrightDiv);
      // this.showCopyrightForMapTypeId();

      // Map location & zoom
      if (this.coordData['latdegdec'] || this.coordData['londegdec']) {
        // this.centerMap(this.coordData['latdegdec'], this.coordData['londegdec']);
        var markCenter = new google.maps.LatLng(this.coordData['latdegdec'] - 0.0, this.coordData['londegdec'] - 0.0);
        var mapCenter = markCenter;
        var spand = this.getMapSpan();
        var spanll = new google.maps.LatLng(spand, spand);
      } else {
        var markCenter = new google.maps.LatLng(0, 0);
        var mapCenter = markCenter;
        var spanll = null;
      }

      if (this.initialMapCenter)
        mapCenter = new google.maps.LatLng(this.initialMapCenter[0], this.initialMapCenter[1]);
      if (this.initialMapSpan)
        spanll = new google.maps.LatLng(this.initialMapSpan[0], this.initialMapSpan[1]);

      if (spanll) {
        var b = new google.maps.LatLngBounds(
          new google.maps.LatLng(mapCenter.lat() - spanll.lat() / 2, mapCenter.lng() - spanll.lng() / 2),
          new google.maps.LatLng(mapCenter.lat() + spanll.lat() / 2, mapCenter.lng() + spanll.lng() / 2) );
        this.map.fitBounds(b);
        // !!!
        // var mapType = map.getCurrentMapType();
        // var viewSize = new GSize(map.getContainer().offsetWidth, map.getContainer().offsetHeight);
        // var zoom = mapType.getSpanZoomLevel(mapCenter, spanll, viewSize);
      } else {
        // var zoom = 0;
        // Whole world
        var s = new google.maps.LatLng(0.9 * 180, 0.9 * 360);
        var b = new google.maps.LatLngBounds(
          new google.maps.LatLng(mapCenter.lat() - s.lat() / 2, mapCenter.lng() - s.lng() / 2),
          new google.maps.LatLng(mapCenter.lat() + s.lat() / 2, mapCenter.lng() + s.lng() / 2) );
        // var zoom = this.map.getBoundsZoomLevel(b);
        // var zoom = this.getZoomByBounds(this.map, b);
        // this.map.fitBounds(b);
      }

      map.setCenter(mapCenter);

      google.maps.event.addListener(map, 'maptypeid_changed', function() {
        _this.mapViewChanged();
        _this.showCopyrightForMapTypeId();
      });
      google.maps.event.addListener(map, 'center_changed', function() {
        _this.mapViewChanged();
      });
      google.maps.event.addListener(map, 'bounds_changed', function() {
        _this.mapViewChanged();
      });
      google.maps.event.addListener(map, 'zoom_changed', function() {
        // alert(_this.map.getZoom());
        // _this.mapViewChanged();
        // _this.refreshPixelScale();
        setTimeout(function() { _this.refreshPixelScale(); }, 250);
      });
      // this.refreshPixelScale();
      setTimeout(function() { _this.refreshPixelScale(); }, 250);  // @TODO hook after init

      // Instantiate marker and hook to its "onDragStart", "onDragEnd" API events
      // !!!
      // var marker = new GMarker(markCenter, {draggable: true});
      // this.marker = marker;
      var marker = new google.maps.Marker({
        position: markCenter,
        draggable: true,
        map: map
      });
      this.marker = marker;

      google.maps.event.addListener(marker, 'dragstart', function() {
        _this.markerDragStartPos = marker.getPosition();
        _this.refreshMarkerDistance(0);
        _this.setRegionGeocodingLabel("invalid");
        _this.setElevation(null);
      });
      google.maps.event.addListener(marker, 'drag', function() {
        var ll = marker.getPosition();
        _this.refreshMapCoordDec();
        _this.refreshMarkerDistance(google.maps.geometry.spherical.computeDistanceBetween(_this.markerDragStartPos, ll));
      });
      google.maps.event.addListener(marker, 'dragend', function() {
        var ll = marker.getPosition();
        _this.setCoordDec(ll.lat(), ll.lng(), {"SYNC_MAP": false});
        _this.scheduleRegionGeocodingRequest();
        _this.refreshMapCoordDec();
        _this.refreshMarkerDistance(false);
        // alert(marker.getPosition().toUrlValue());
        // marker.openInfoWindowHtml("...");
      });
      // map.addOverlay(marker);

      this.refreshMapCoordDec();

      this.polyline = null;
      this.polylineConfirmedAt = false;

      this.preciseCursorActive = false;
      // this.defaultCursor = GDraggableObject.getDraggableCursor();  // !!!
      this.defaultCursor = map.draggableCursor;

      window.onkeydown = function(e0) {
        var e = (e0 ? e0 : event);
        // trace(e.keyCode);
        if (e.keyCode == 88) {
          _this.extraDown = true;
        }
      };
      window.onkeyup = function(e0) {
        var e = (e0 ? e0 : event);
        if (e.keyCode == 88) {
          _this.extraDown = false;
        }
      };

      google.maps.event.addListener(map, "mousemove", function(e) {
        _this.lastMouseMoveLatLng = e.latLng;
        _this.lastMouseMoveTick = _this.eventTickCounter++;
      });

      google.maps.event.addDomListener(map.getDiv(), 'mousemove', function(e0) {
        var e = (e0 ? e0 : event);

        if (e.ctrlKey || e.altKey || e.shiftKey || _this.extraDown) {

          // Cross-browser container-relative pixel coordinates
          var xy = [];
          if (!e.pageX && typeof(e.x) != "undefined") {
            xy[0] = e.x; xy[1] = e.y;                // IE
          } else {
            // var cp = OEUtil.getAbsPos(map.getContainer());  // FF, Opera
            var cp = OEUtil.getAbsPos(map.getDiv());  // FF, Opera
            xy[0] = e.pageX - cp[0]; xy[1] = e.pageY - cp[1];
          }
          xy[0]--; xy[1]--; // 1px fix

          // var ll = map.fromContainerPixelToLatLng(new GPoint(xy[0], xy[1]));
          var ll = _this.lastMouseMoveLatLng;

          // !!!
          // if (!_this.preciseCursorActive) {
          //   GDraggableObject.setDraggableCursor("crosshair");
          //   map.getDragObject().setDraggableCursor("crosshair");
          //   _this.preciseCursorActive = true;
          // }
          if (!_this.preciseCursorActive) {
            // GDraggableObject.setDraggableCursor("crosshair");
            // map.getDragObject().setDraggableCursor("crosshair");
            map.setOptions({draggableCursor: "crosshair"});
            _this.preciseCursorActive = true;
          }
          // e.returnValue = false;
        } else {
          if (_this.preciseCursorActive) {
            // GDraggableObject.setDraggableCursor(_this.defaultCursor);
            // map.getDragObject().setDraggableCursor(_this.defaultCursor);  // !!!
            map.setOptions({draggableCursor: _this.defaultCursor});
            _this.preciseCursorActive = false;
          }
        }

        // if (e.shiftKey && !e.ctrlKey) {
        // if (e.shiftKey && !e.ctrlKey && !e.altKey && !_this.extraDown) {
        if (e.shiftKey && !e.ctrlKey && !e.altKey) {
          if (!_this.polylineConfirmedAt || _this.polylineConfirmedAt[0] != xy[0] || _this.polylineConfirmedAt[1] != xy[1]) {
            _this.refreshDirectionLine(ll);
          }
        } else {
          _this.refreshDirectionLine(null);
        }

        // if (e.shiftKey && e.ctrlKey && !e.altKey) {
        // if (e.shiftKey && (e.ctrlKey || e.altKey || _this.extraDown)) {
        if (e.shiftKey && (e.ctrlKey || e.altKey)) {
          if (!_this.confirmClickAt || _this.confirmClickAt[0] != xy[0] || _this.confirmClickAt[1] != xy[1]) {
            _this.confirmClickAt = null;
            _this.refreshDiameterCircle(ll);
          }
        } else if (_this.diameterCircleUpdating) {
          _this.refreshDiameterCircle(null);
        }

      });

      // onclick
      google.maps.event.addListener(map, "click", function(e) {
        _this.lastClickLatLng = e.latLng;
        _this.lastClickTick = _this.eventTickCounter++;
      });

      google.maps.event.addDomListener(map.getDiv(), 'click', function(e0) {
        var e = (e0 ? e0 : event);

        // alert(e.ctrlKey);

        if (e.ctrlKey && e.altKey && e.shiftKey) {
          var c = map.getCenter();
          var s = map.getBounds().toSpan();
          var text = c.lat().toFixed(6) + ", " + c.lng().toFixed(6) + ", " + s.lat().toPrecision(3) + ", " + s.lng().toPrecision(3);
          prompt("Preset:", text);
          return;
        }

        // alert(e.ctrlKey + '|' + e.altKey + '|' + e.shiftKey);

        if (e.ctrlKey || e.altKey || e.shiftKey || _this.extraDown) {
          // Ctrl+click: move marker to cursor position

          // Cross-browser container-relative pixel coordinates
          var xy = [];
          if (!e.pageX && typeof(e.x) != "undefined") {
            xy[0] = e.x; xy[1] = e.y;                // IE
          } else {
            // var cp = OEUtil.getAbsPos(map.getContainer());  // FF, Opera
            var cp = OEUtil.getAbsPos(map.getDiv());  // FF, Opera
            xy[0] = e.pageX - cp[0]; xy[1] = e.pageY - cp[1];
          }
          xy[0]--; xy[1]--; // 1px fix

          // var ll = map.fromContainerPixelToLatLng(new GPoint(xy[0], xy[1]));
          var ll = (_this.lastClickTick > _this.lastMouseMoveTick ? _this.lastClickLatLng : _this.lastMouseMoveLatLng);
            // fix: map.click does not get called when in Shift+mousemove mode, we have to use last mouseMoveLatLng

          // alert(_this.lastClickTick + ", " + _this.lastMouseMoveTick + "; " + _this.lastClickLatLng + ", " +  _this.lastMouseMoveLatLng);

          // _this.refreshDirectionLine(null);
          if (e.shiftKey && !e.ctrlKey && !e.altKey) {
            // _this.polyline.setMap(null);
            // _this.polyline = null;
            // _this.polylineShown = false;
            // _this.polylineConfirmedAt = xy;
            // _this.refreshDirectionLine(ll);

            _this.refreshDirectionLine(ll);
            // _this.polyline.strokeColor = "#00FF00";
            _this.polyline.setOptions({strokeColor: '#00FF00'});
            _this.polylineConfirmedAt = xy;

            _this.setGeoHackParam("heading", (_this.headingPoints <= 32 ? _this.headingAngleToAbbreviation(_this.mapHeadingAngle) : _this.mapHeadingAngle.toFixed(0)));
            _this.applyCoordData(null, {"SYNC_MAP": false});
            // var el = document.getElementById("trHeading"); if (el) el.style.display = "";
          }

          // if (e.shiftKey && e.ctrlKey && !e.altKey) {
          if (e.shiftKey && (e.ctrlKey || e.altKey)) {
            _this.confirmClickAt = xy;
            _this.refreshDiameterCircle(ll, true);
            // var el = document.getElementById("trHeading"); if (el) el.style.display = "";
          }

          if (((e.ctrlKey || e.altKey) && !e.shiftKey) || _this.extraDown) {
            marker.setPosition(ll);
            // var c = map.getCenter();
            // map.setCenter(ll);
            // map.savePosition();  // !!!
            // map.setCenter(c);
            _this.setCoordDec(ll.lat(), ll.lng(), {"SYNC_MAP": false});
            _this.refreshMapCoordDec();
            _this.scheduleRegionGeocodingRequest();
            // _this.refreshDiameterCircle(null);
          }

          e.returnValue = false;
        }
      });

      this.refreshErrorRects();

      this.scheduleRegionGeocodingRequest();
    }
  }
  this.initGoogleMap = initGoogleMap;

  function mapViewChanged(scheduled)
  {
    // Map view changed, we re-assign permalink URLs (we'll touch "links" templates only)
    if (!scheduled) {
      // Schedule actual action 500ms after last event occured
      if (this.mapViewChangedTimeoutId)
        clearTimeout(this.mapViewChangedTimeoutId);
      var _this = this;
      this.mapViewChangedTimeoutId = setTimeout(function() { _this.mapViewChanged(true); }, 500);
    } else {
      // Actual action
      this.mapViewChangedTimeoutId = null;

      if (this.coordData && this.templateElements) {
        this.coordData["selfurl"] = this.getSelfUrl(true);
        this.coordData["selfurlparams"] = this.getSelfUrlQuery(true);
        if (!this.geoHackParams['scale'] && !this.geoHackParams['dim'] && !this.geoHackParams['type'])
          this.coordData["osmzoom"] = Math.min(Math.max(this.map.getZoom(), 2), 18);

        for (var key in this.templateElements)
          if (this.templateElements[key].className.match(/\blinks\b/)) {
            this.templateElements[key].innerHTML = this.expandTemplate(this.templateTexts[key], this.coordData);
          }
      }
    }
  }
  this.mapViewChanged = mapViewChanged;

  // state: requested|obtained
  function setRegionGeocodingLabel(state, regionMarkup)
  {
    if (this.eMapRegion) {
      if (state == "requested")
        this.eMapRegion.innerHTML = "requesting...";
      else if (state == "obtained")
        this.eMapRegion.innerHTML = this.loc['gl/region'] + ": " + (regionMarkup ? regionMarkup : "??");
      else
        this.eMapRegion.innerHTML = "";
    }
  }
  this.setRegionGeocodingLabel = setRegionGeocodingLabel;

  function scheduleRegionGeocodingRequest(ll)
  {
    if (!ll && this.marker)
      ll = this.marker.getPosition();
    if (!ll || (Math.abs(ll.lat()) < 1E-6 && Math.abs(ll.lng()) < 1E-6)) {
      this.setRegionGeocodingLabel("invalid");
      return;
    }

    this.setElevation(null);
    var _this = this;
    this.getElevation(ll.lat(), ll.lng(), function(lat, lng, alt) {
      _this.getElevationCallback(lat, lng, alt);
    });

    // Use cached region info after minor marker position changes
    if (this.geocodingResponseLocation && this.geocodingResponseLocation.distanceFrom(ll) < this.geocodingThreshold) {
      // this.iGeoHackRegion.value = this.geocodingResponseRegion;
      this.setRegionGeocodingLabel("obtained", this.geocodingResponseRegionMarkup);
      if (this.geoHackRegionMode == "auto") {
        this.setGeoHackParam('region', this.geocodingResponseRegion);
        this.applyCoordData(null, {"SYNC_MAP": false});
      }
      return;
    }

    if (!this.geocoder)
      this.geocoder = new google.maps.Geocoder();
    // if (this.iGeoHackRegion)
    //   this.iGeoHackRegion.value = '?'; // @todo
    var _this = this;
    var _ll = ll;
    // this.geocoder.getLocations(ll, function(response) {
    //   _this.regionGeocodingRequestDone(response, ll);
    // });
    this.geocoder.geocode({'latLng': ll}, function(results, status) {
      _this.regionGeocodingRequestDone(results, status, ll);
    });
    this.setRegionGeocodingLabel("requested");
  }
  this.scheduleRegionGeocodingRequest = scheduleRegionGeocodingRequest;

  // Schedules an elevation reverse geocoding request. callback = function(lat, lng, alt);
  function getElevation(lat, lng, callback)
  {
    this.getElevation__geonames_org(lat, lng, callback);
    // this.getElevation__google_org(lat, lng, callback);
  }
  this.getElevation = getElevation;

  // Elevation service via geonames.org
  // see doc at http://www.geonames.org/export/web-services.html
  function getElevation__geonames_org(lat, lng, callback)
  {
    // var model = "gtopo30";    // GTOPO30, samples ~1x1 km
    // var model = "srtm3";      // Shuttle Radar Topography Mission elevation data, samples ~90x90 m, 60N..56S
    var model = "astergdem";  // Aster Global Digital Elevation Model, samples ~30x30 m, 83N..65S
    var user = "geolocator";

    var serviceUrl = "http://api.geonames.org/" + model + "JSON?lat=" + lat + "&lng=" + lng + "&username=" + user + "&callback=_setElevation";

    // Register global callback adapter method, for use as service JSON callback
    var _this = this;
    var _model = model;
    _setElevation = function(data) {
      callback(lat, lng, data[_model]);
    };

    // Create dynamic script element to call _setElevation() callback on data retrieve
    var script = document.getElementById("sElevation");
    if (script)
      script.parentNode.removeChild(script);
    script = document.createElement("script");
    script.id = "sElevation";
    document.body.appendChild(script);
    script.src = serviceUrl;
  }
  this.getElevation__geonames_org = getElevation__geonames_org;

  function getElevationCallback(lat, lng, alt)
  {
    this.setElevation(alt);
  }
  this.getElevationCallback = getElevationCallback;

  function setElevation(alt)
  {
    var altValid = (alt !== null && alt < 9000 && alt > -9000);
    alt = (altValid ? alt : null);

    this.extraParams['elevation'] = (altValid ? alt : '');
    this.extraParams['elevationint'] = (altValid ? Math.round(alt) : '');
    this.applyCoordData(null, {"SYNC_MAP": false});

    this.showElevation(alt);
  }
  this.setElevation = setElevation;

  function showElevation(alt)
  {
    var altValid = (alt || alt === 0 || alt === '0');
    this.eMapElevation.innerHTML = this.loc['gl/elevation'] + ": " + (altValid ? alt : '??') + " m";
  }
  this.showElevation = showElevation;

  function toSignificant(n, digits)
  {
    var c = Math.pow(10, Math.floor(Math.log(Math.abs(n)) / Math.LN10) - digits + 1);
    n = Math.round(n / c) * c;  // round to N significant digits
    return n;
  }
  this.toSignificant = toSignificant;

  function setDiameter(d, setGeoHackParam, updateView)
  {
    this.diameterCircleRadius = (d ? d / 2 : null);
    if (setGeoHackParam) {
      var n = (d >= 10000 ? d / 1000 : d);
      // n = (n <= 100 ? n.toFixed(0) : (n*0.1).toFixed(0)*10);
      n = Math.round(this.toSignificant(n, this.dimPrecision));
      this.setGeoHackParam("dim", (d ? (d >= 10000 ? n + 'km' : n) : ''), true, false);
      // this.setGeoHackParam("dim", (d >= 10000 ? (d*0.001).toPrecision(2) + 'km' : (d*1).toPrecision(2)), true, false);
    }
    // this.extraParams['dimm'] = (d ? d : '');
    // this.extraParams['dimmint'] = (d ? Math.round(d) : '');
    if (setGeoHackParam)
      this.applyCoordData(null, {"SYNC_MAP": false});
    if (updateView)
      this.refreshDiameterCircle(null);
  }
  this.setDiameter = setDiameter;

  function _dump(x, name)
  {
    name = (name ? name : '');
    result = "";
    result += name + " = " + x + "\n";
    if (x && typeof(x) != 'string')
      for (propertyName in x)
        result += this._dump(x[propertyName], name + '.' + propertyName);
    return result;
  }
  this._dump = _dump;

  function regionGeocodingRequestDone(results, status, ll)
  {
    // alert(response); if (response) alert(response.Status.code);
    if (status != google.maps.GeocoderStatus.OK || !results || !results[0]) {
      var region = "";
      var markup = "";

    } else {

      var region = '';
      var markup = '';

      for (i in results[0].address_components) {
        // vd(c);
        var c = results[0].address_components[i];
        for (j in c.types) {
          if (c.types[j] == 'country') {
            // c.long_name;
            region = c.short_name;
          }
        }
      }

      if (v = region)
        markup += (markup ? "<br />" : "") + v;
      if (v = (results[0].formatted_address ? results[0].formatted_address.replace(/\s*,\s*/g, "<br />") : ""))
        markup += (markup ? "<br />" : "") + v;

      this.setRegionGeocodingLabel("obtained", markup);
    }

    // !!!
    // // Cache response
    // this.geocodingResponseRegion = region;
    // this.geocodingResponseRegionMarkup = markup;
    // this.geocodingResponseLocation = ll;

    if (this.geoHackRegionMode == "auto") {
      if (region) {
        this.setGeoHackParam('region', region);
      } else
        this.setGeoHackParam('region', "");
      this.applyCoordData(null, {"SYNC_MAP": false});
    }

    // this.setRegionGeocodingLabel("obtained", region);
  }
  this.regionGeocodingRequestDone = regionGeocodingRequestDone;

  // Draw a circle on map around center (radius in miles)
  // Modified by Jeremy Schneider based on http://maps.huge.info/dragcircle2.htm
  function drawCircle(map, center, radius, numPoints, color, width, opacity)
  {
    poly = [] ;
    var lat = center.lat() ;
    var lng = center.lng() ;
    var d2r = Math.PI/180 ;                // degrees to radians
    var r2d = 180/Math.PI ;                // radians to degrees
    var Clat = (radius/6371000) * r2d ;    // using 6371 km as Earth's radius
    var Clng = Clat/Math.cos(lat*d2r);

    // Add each point in the circle
    for (var i = 0 ; i < numPoints ; i++) {
      var theta = Math.PI * (i / (numPoints / 2)) ;
      Cx = lng + (Clng * Math.cos(theta)) ;
      Cy = lat + (Clat * Math.sin(theta)) ;
      poly.push(new google.maps.LatLng(Cy,Cx)) ;
    }

    // Add the first point to complete the circle
    poly.push(poly[0]) ;

    // Create a line with teh points from poly, red, 3 pixels wide, 80% opaque
    // line = new GPolyline(poly, color, width, opacity);
    line = new google.maps.Polyline({
      path: poly,
      strokeColor: color,
      strokeWeight: width,
      strokeOpacity: opacity
    });

    // map.addOverlay(line);
    line.setMap(map);

    return line;
  }
  this.drawCircle = drawCircle;

  function drawErrorRect(ll, d, color)
  {
    var map = this.map;
    // var color = '#FF0000';
    var width = 2;
    var opacity = 0.8;

    var center = ll;
    // var d = 0.0001;
    var center = new google.maps.LatLng(Math.round(center.lat() / d) * d, Math.round(center.lng() / d) * d)
    var dLat = d * 0.5;
    var dLng = d * 0.5;

    poly = [] ;
    poly.push(new google.maps.LatLng(center.lat() - dLat, center.lng() - dLng));
    poly.push(new google.maps.LatLng(center.lat() - dLat, center.lng() + dLng));
    poly.push(new google.maps.LatLng(center.lat() + dLat, center.lng() + dLng));
    poly.push(new google.maps.LatLng(center.lat() + dLat, center.lng() - dLng));
    poly.push(new google.maps.LatLng(center.lat() - dLat, center.lng() - dLng));

    // poly.push(new google.maps.LatLng(center.lat() + dLat, center.lng() + dLng));
    // poly.push(new google.maps.LatLng(center.lat() - dLat, center.lng() + dLng));
    // poly.push(new google.maps.LatLng(center.lat() + dLat, center.lng() - dLng));

    // Create a line with teh points from poly, red, 3 pixels wide, 80% opaque
    // line = new GPolyline(poly, color, width, opacity);
    line = new google.maps.Polyline({
      path: poly,
      strokeColor: color,
      strokeWeight: width,
      strokeOpacity: opacity
    });

    // map.addOverlay(line);
    line.setMap(map);

    return line;
  }
  this.drawErrorRect = drawErrorRect;

  function refreshErrorRects()
  {
    if (this.errorRectDeg) {
      // this.map.removeOverlay(this.errorRectDeg);
      this.errorRectDeg.setMap(null);
      this.errorRectDeg = null;
    }
    if (this.iPrecRectDeg && this.iPrecRectDeg.checked && this.marker)
      this.errorRectDeg = this.drawErrorRect(this.marker.getPosition(), Math.pow(10, -this.degPrecision), "#9500C0");

    if (this.errorRectSec) {
      // this.map.removeOverlay(this.errorRectSec);
      this.errorRectSec.setMap(null);
      this.errorRectSec = null;
    }
    if (this.iPrecRectSec && this.iPrecRectSec.checked && this.marker)
      this.errorRectSec = this.drawErrorRect(this.marker.getPosition(), 1/3600 * Math.pow(10, -this.secPrecision), "#00C000");

    if (this.errorRectMin) {
      // this.map.removeOverlay(this.errorRectMin);
      this.errorRectMin.setMap(null);
      this.errorRectMin = null;
    }
    if (this.iPrecRectMin && this.iPrecRectMin.checked && this.marker)
      this.errorRectMin = this.drawErrorRect(this.marker.getPosition(), 1/60, "#E67700");

    if (this.errorRect1Deg) {
      // this.map.removeOverlay(this.errorRect1Deg);
      this.errorRect1Deg.setMap(null);
      this.errorRect1Deg = null;
    }
    if (this.iPrecRect1Deg && this.iPrecRect1Deg.checked && this.marker)
      this.errorRect1Deg = this.drawErrorRect(this.marker.getPosition(), 1, "#C00000");

    this.mapViewChanged();
  }
  this.refreshErrorRects = refreshErrorRects;

  function refreshDiameterCircle(ll, confirm)
  {
    if (!this.marker)
      return;

    var r = this.diameterCircleRadius;

    if (ll) {
      this.diameterCircleUpdating = !confirm;
      // r = this.marker.getPosition().distanceFrom(ll);
      r = google.maps.geometry.spherical.computeDistanceBetween(this.marker.getPosition(), ll);
      this.refreshRadius(r);
    } else {
      if (this.diameterCircleUpdating) {
        this.diameterCircleUpdating = false;
        this.refreshRadius(false);
      }

      this.refreshErrorRects();
    }

    if (this.diameterCircle) {
      // this.map.removeOverlay(this.diameterCircle);
      this.diameterCircle.setMap(null);
      this.diameterCircle = null;
    }
    if (r !== null) {
      var updating = this.diameterCircleUpdating;
      this.diameterCircle = this.drawCircle(this.map, this.marker.getPosition(), r, 36, (updating ? '#FF0000' : '#00FF00'), (updating ? 3 : 2), 0.8);
    }

    // _this.diameterCircle.setStrokeStyle({color: "#00FF00", weight: 1});
    // _this.diameterCircleConfirmedAt = xy;
    if (confirm) {
      // this.diameterCircleUpdating = false;
      // this.refreshRadius(false);
      this.diameterCircleUpdating = true; // next mouse move will cancel updating mode
      this.setDiameter(2*r, true, false);
    }
  }
  this.refreshDiameterCircle = refreshDiameterCircle;

  function refreshDirectionLine(ll)
  {
    // Little counter-intuitive code to show/hide/update a line real-time reliably
    if (ll) {
      if (!this.polyline) {
        // this.polyline = new GPolyline([this.marker.getPosition(), ll], "#FF0000", 4);
        this.polyline = new google.maps.Polyline({
          path: [this.marker.getPosition(), ll],
          // strokeColor: (this.polylineConfirmedAt ? "#00FF00" : "#FF0000"),
          strokeColor: "#FF0000",
          strokeWeight: 4

        });
        // this.map.addOverlay(this.polyline);
        this.polyline.setMap(this.map);
        this.polylineShown = true;
      }
      else if (this.polylineShown) {
        // Update end point only
        // this.polyline.insertVertex(1, ll);
        // this.polyline.deleteVertex(2);
        this.polyline.getPath().setAt(1, ll);
      } else {
        // Update both points
        // this.polyline.insertVertex(0, this.marker.getPosition());
        // this.polyline.deleteVertex(1);
        // this.polyline.insertVertex(1, ll);
        // this.polyline.deleteVertex(2);
        this.polyline.getPath().setAt(0, this.marker.getPosition());
        this.polyline.getPath().setAt(1, ll);
        // this.polyline.show();
        // this.polyline.visible = true;
        this.polyline.setVisible(true);
        this.polylineShown = true;
      }
      if (this.polylineConfirmedAt) {
        // this.polyline.setStrokeStyle({color: "#FF0000"});
        // this.polyline.strokeColor = "#FF0000";
        this.polyline.setOptions({strokeColor: '#FF0000'});
        this.polylineConfirmedAt = null;
      }
      // this.refreshMarkerDistance(this.polyline.getLength());
      this.refreshMarkerDistance(google.maps.geometry.spherical.computeDistanceBetween(this.polyline.getPath().getAt(0), this.polyline.getPath().getAt(1)));
      // this.refreshHeadingAngle(this.polyline.getVertex(0), this.polyline.getVertex(1));
      this.refreshHeadingAngle(this.polyline.getPath().getAt(0), this.polyline.getPath().getAt(1));
    } else {
      if (this.polylineShown) {
        // alert(ll);
        // this.polyline.hide();
        // this.polyline.visible = false;
        this.polyline.setVisible(false);
        this.polylineShown = false;
        this.refreshMarkerDistance(false);
        this.refreshHeadingAngle(false);
      }
    }
  }
  this.refreshDirectionLine = refreshDirectionLine;

  function refreshMapCoordDec(ll)
  {
    if (!ll && ll !== false && this.marker)
      ll = this.marker.getPosition();
    if (this.eMapCoords)
      if (ll)
        this.eMapCoords.innerHTML = ll.lat().toFixed(this.degPrecision) + "&deg;, " + ll.lng().toFixed(this.degPrecision) + "&deg;";
      else
        this.eMapCoords.innerHTML = '';
  }
  this.refreshMapCoordDec = refreshMapCoordDec;


  function refreshMarkerDistance(d)
  {
    if (this.eMapPixelScale) {
      if (d !== false) {
        var unit = "m";
        if (d >= 1000) {
          d = d / 1000;
          unit = "km";
        }
        this.eMapDistance.innerHTML = "d: " + d.toPrecision((d < 1000 ? 3 : (d < 10000 ? 4 : 5))) + " " + unit;
        // this.eMapDistance.style.display = "";
      } else {
        this.eMapDistance.innerHTML = '';
        // this.eMapDistance.style.display = "none"; // IE fix
      }
    }
  }
  this.refreshMarkerDistance = refreshMarkerDistance;

  function refreshRadius(r)
  {
    if (this.eMapPixelScale) {
      if (r !== false) {

        // // Circle area (euclidean aprox. only)
        // var ac = (Math.PI * r * r);
        // var acunit = "m\u00B2"
        // if (ac >= 1000000) {
        //   ac = ac / 1000000;
        //   acunit = "km\u00B2";
        // }
        //

        // // Spherical cap area
        // var R = 6371000;                        // Earth radius [m]
        // var theta = (2 * r) / R;                // Circular segment angle [rad]
        // var h = R * (1 - Math.cos(theta / 2));  // Spherical cap height [m]
        // var as = 2 * Math.PI * R * h;           // Spherical cap area [m^2]
        // var asunit = "m\u00B2"
        // if (as >= 1000000) {
        //   as = as / 1000000;
        //   asunit = "km\u00B2";
        // }

        // Radius, Diameter
        var unit = "m";
        if (r >= 1000) {
          r = r / 1000;
          unit = "km";
        }
        d = r * 2;

        this.eMapDistance.innerHTML =
          "&nbsp; r: " + r.toPrecision((r < 1000 ? 3 : (r < 10000 ? 4 : 5))) + " " + unit + "" +
          "&nbsp; D: " + d.toPrecision((d < 1000 ? 3 : (d < 10000 ? 4 : 5))) + " " + unit + "" +
          // "&nbsp; h: " + this.toSignificant(h, 3).toFixed(0) + " m" +
          // "&nbsp; A: " + this.toSignificant(ac, 3).toFixed((ac < 10 ? 2 : (ac < 100 ? 1 : 0))) + " " + acunit + "" +
          // "&nbsp; A: " + this.toSignificant(as, 3).toFixed((as < 10 ? 2 : (as < 100 ? 1 : 0))) + " " + asunit + "" +
          "";
        // this.eMapDistance.style.display = "";
      } else {
        this.eMapDistance.innerHTML = '';
        // this.eMapDistance.style.display = "none"; // IE fix
      }
    }
  }
  this.refreshRadius = refreshRadius;

  function refreshHeadingAngle(ll1, ll2)
  {
    if (!this.eMapHeading)
      return;

    if (ll1 && ll2) {
      // var x = (ll2.lng() < ll1.lng() ? -1 : +1) * ll1.distanceFrom(new google.maps.LatLng(ll1.lat(), ll2.lng()))
      // var y = (ll2.lat() < ll1.lat() ? -1 : +1) * ll1.distanceFrom(new google.maps.LatLng(ll2.lat(), ll1.lng()))
      var x = (ll2.lng() < ll1.lng() ? -1 : +1) * google.maps.geometry.spherical.computeDistanceBetween(ll1, new google.maps.LatLng(ll1.lat(), ll2.lng()));
      var y = (ll2.lat() < ll1.lat() ? -1 : +1) * google.maps.geometry.spherical.computeDistanceBetween(ll1, new google.maps.LatLng(ll2.lat(), ll1.lng()));
      var angle = 90 - 180 * (Math.atan2(y, x) / Math.PI);
      angle = (angle < 0 ? angle + 360 : angle);
      this.refreshHeadingLabel(angle);
    } else
      this.refreshHeadingLabel(false);
  }
  this.refreshHeadingAngle = refreshHeadingAngle;

  function headingAngleToAbbreviation(angle)
  {
    if (this.headingPoints && this.headingPoints <= 32) {
      var hcTotal  = 32;
      var hcSubset = this.headingPoints;
      var hi = Math.round(hcSubset * (angle / 360)) * hcTotal/hcSubset;  // assuming that hcTotal/hcSubset is an integer
      hi = (hi >= hcTotal ? 0 : hi);
      return this.headings[hi];
    } else
      return "";
  }
  this.headingAngleToAbbreviation = headingAngleToAbbreviation;

  function refreshHeadingLabel(angle)
  {
    if (typeof(angle) == "undefined")
      angle = this.mapHeadingAngle;

    if (angle !== false) {
      this.mapHeadingAngle = angle;
      var headingLabel = this.headingAngleToAbbreviation(angle);
      this.eMapHeading.innerHTML = "h = " + (headingLabel ? headingLabel + " " : "") + angle.toFixed(0) + "&deg;";
      // this.eMapHeading.style.display = "";
    } else {
      // this.eMapHeading.style.display = "none"; // IE fix
      this.eMapHeading.innerHTML = '';
    }
  }
  this.refreshHeadingLabel = refreshHeadingLabel;

  function clearHeading()
  {
    this.setGeoHackParam('heading', '');
    this.applyCoordData(null, {"SYNC_MAP": false});
  }
  this.clearHeading = clearHeading;

  function refreshPixelScale()
  {
    var bounds = this.map.getBounds();
    if (!bounds)
      return;  // @TODO call after init
    // var size = this.map.getSize();
    var size = {width : this.map.getDiv().offsetWidth, height: this.map.getDiv().offsetHeight};
    var c  = bounds.getCenter();
    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();
    // var widthMeters = c.distanceFrom(new google.maps.LatLng(c.lat(), ne.lng()))
    var widthMeters = google.maps.geometry.spherical.computeDistanceBetween(c, new google.maps.LatLng(c.lat(), ne.lng()));
    var scaleX = (widthMeters / size.width) * 2;
    // var heightMeters = c.distanceFrom(new google.maps.LatLng(ne.lat(), c.lng()))
    var heightMeters = google.maps.geometry.spherical.computeDistanceBetween(c, new google.maps.LatLng(ne.lat(), c.lng()))
    var scaleY = (heightMeters / size.height) * 2;

    var unit = "m";
    if (scaleX >= 1000 || scaleY >= 1000) {
      scaleX = scaleX / 1000;
      scaleY = scaleY / 1000;
      unit = "km";
    }

    var zoom = this.map.getZoom();

    if (this.eMapPixelScale)
      this.eMapPixelScale.innerHTML = "z" + zoom + " &middot; " + "1px = " + scaleX.toFixed(1) + "&times;" + scaleY.toFixed(1) + " " + unit;
  }
  this.refreshPixelScale = refreshPixelScale;

  function centerMap(lat, lon)
  {
    if (this.map) {
      var center = new google.maps.LatLng(lat, lon);
      var zoom = this.map.getZoom();
      if (Math.abs(lat - 0) < 1E-8 && Math.abs(lon - 0) < 1E-8)
        zoom = 0;
      else if (zoom == 0) {
        var scale = 10000;
        var spand = 1/1000000 * scale;
        var spanll = new google.maps.LatLng(spand, spand);
        var mapType = this.map.getCurrentMapType();
        var viewSize = new GSize(this.map.getContainer().offsetWidth, this.map.getContainer().offsetHeight);
        var zoom = mapType.getSpanZoomLevel(center, spanll, viewSize);
      }
      this.map.setCenter(center, zoom);
      if (this.marker) {
        this.marker.setPosition(center);
        this.refreshDiameterCircle(null);
      }
      this.refreshMapCoordDec(center);
      // this.map.savePosition(); // !!!
      this.scheduleRegionGeocodingRequest();
    }
  }
  this.centerMap = centerMap;

  /* Calculates scale according to scale/type GeoHack params */
  function getMapScale(geoHackParams)
  {
    if (!geoHackParams)
      geoHackParams = this.geoHackParams;
    var scale = geoHackParams['scale'];
    if (!scale && this.diameterCircleRadius)
      scale = Math.round(this.diameterCircleRadius * 2 * 10);
    if (!scale && this.geoHackParams['type'])
      scale = this.mapTypeToScale[this.geoHackParams['type']];
    if (!scale)
      scale = 10000;
    scale = scale - 0.0;
    return scale;
  }
  this.getMapScale = getMapScale;


  /* Calculates GoogleMap span parameter according to scale/type GeoHack params */
  function getMapSpan(geoHackParams)
  {
    var scale = this.getMapScale(geoHackParams)
    var span = 1/1000000 * scale;
    return span;
  }
  this.getMapSpan = getMapSpan;

  function d2dms(x, secPrecision)
  {
    var a = Math.abs(x);
    var d = Math.floor(a);
    var sa = (a - d) * 3600;
    var dms = {'d': (x < 0 ? - d : d), 'm': Math.floor(sa / 60), 's': sa % 60};

    return dms;
  }
  this.d2dms = d2dms;

  function roundDms(dms, secPrecision)
  {
    if (secPrecision || secPrecision === 0) {
      // Rounding
      dms['s'] = Math.round(dms['s'] * Math.pow(10, secPrecision)) / Math.pow(10, secPrecision);
      if (dms['s'] >= 60) {
        dms['m'] += 1;
        dms['s'] = 0;
        if (dms['m'] >= 60) {
          dms['d'] += 1;
          dms['m'] = 0;
        }
      }
    }

    return dms;
  }
  this.roundDms = roundDms;

  function applyCoordData(data, actions)
  {
    if (data)
      this.coordData = data;

    if (this.extraParams)
      for (var name in this.extraParams)
        this.coordData[name] = this.extraParams[name];

    // Fill-in geoHackParams
    if (this.geoHackParams)
      for (var name in this.geoHackParams)
        this.coordData[name] = this.geoHackParams[name];

    // Fill-in missing params
    var requiredParams = ["type", "dim", "scale", "region", "heading", "globe", "source"];
    for (var i = 0; i < requiredParams.length; i++)
      if (typeof(this.coordData[requiredParams[i]]) == "undefined")
        this.coordData[requiredParams[i]] = "";

    // Add calculated params
    this.coordData["ghparams"] = this.implodeGeoHackParams(this.geoHackParams);
    this.coordData["ghparamsp"] = (this.coordData["ghparams"] ? '|' : '') + this.coordData["ghparams"];
    this.coordData["ghparamsu"] = (this.coordData["ghparams"] ? '_' : '') + this.coordData["ghparams"];
    this.coordData["ghparamsnh"] = (this.implodeGeoHackParams(this.geoHackParams, {"heading": true}));
    this.coordData["ghparamsnhp"] = (this.coordData["ghparamsnh"] ? '|' : '') + this.coordData["ghparamsnh"];
    this.coordData["ghparamsnhu"] = (this.coordData["ghparamsnh"] ? '_' : '') + this.coordData["ghparamsnh"];
    this.coordData["ghparamsnt"] = (this.implodeGeoHackParams(this.geoHackParams, {"type": true}));
    this.coordData["ghparamsntp"] = (this.coordData["ghparamsnt"] ? '|' : '') + this.coordData["ghparamsnt"];
    this.coordData["ghparamsntu"] = (this.coordData["ghparamsnt"] ? '_' : '') + this.coordData["ghparamsnt"];
    this.coordData["scale"] = this.getMapScale().toFixed(0);
    this.coordData["span"] = this.getMapSpan().toPrecision(3).replace(/\.?0+$/, '');
    // this.coordData["osmzoom"] = Math.min(Math.max(18 - (Math.round(Math.log(this.coordData["scale"]) / Math.LN2 - 10.72536625789)), 2), 18);  // (18 - (round(log(scale,2) - log(1693,2))), [2, 18]), http://wiki.toolserver.org/view/GeoHack
    if (!this.map || this.geoHackParams['scale'] || this.geoHackParams['dim'] || this.geoHackParams['type'])
      this.coordData["osmzoom"] = Math.min(Math.max(18 - (Math.round(Math.log(this.coordData["scale"]) / Math.LN2 - 10.72536625789)), 2), 18);  // (18 - (round(log(scale,2) - log(1693,2))), [2, 18]), http://wiki.toolserver.org/view/GeoHack
    else
      this.coordData["osmzoom"] = Math.min(Math.max(this.map.getZoom(), 2), 18);

    this.coordData["selfurl"] = this.getSelfUrl(true);
    this.coordData["selfurlparams"] = this.getSelfUrlQuery(true);

    var r = this.diameterCircleRadius;
    this.coordData["dimm"] = (r ? (2 * r).toFixed(3) : '');
    this.coordData["dimmint"] = (r ? Math.round(2 * r) : '');

    var implicitScale = (this.coordData["scale"] && this.iGeoHackScale && (!this.iGeoHackScale.value || this.iGeoHackScale.value == "default"));
    if (this.eDisplayScale) {
      this.eDisplayScale.style.color = (implicitScale ? "#999999" : "");
    }

    if (el = this.aTypeClear)
      OEUtil.setClass(el, 'disabled', !this.coordData["type"]);
    if (el = this.aDimClear)
      OEUtil.setClass(el, 'disabled', !this.coordData["dim"]);
    if (el = this.aScaleClear)
      OEUtil.setClass(el, 'disabled', implicitScale);
    if (el = this.aRegionClear)
      OEUtil.setClass(el, 'disabled', !this.coordData["region"]);
    // 'aTypeClear', 'aDimClear', 'aScaleClear', 'aRegionClear',

    // Apply data
    if (!actions || typeof(actions["FILL_TEMPLATE"]) == "undefined" || actions["FILL_TEMPLATE"]) // default: true
      this.fillTemplateElements(this.coordData);
    if (!actions || actions["SYNC_MAP"]) {                                                       // default: false
      this.centerMap(this.coordData['latdegdec'], this.coordData['londegdec']);
    }

    // this.refreshDiameterCircle(null);
  }
  this.applyCoordData = applyCoordData;

  function setGeoHackParam(name, value, updateInput, updateView)
  {
    // alert(name + " = " + value);

    this.coordData[name] = value;

    if (value) {
      if (name == "region")
        value = (value + '').toUpperCase();
      this.geoHackParams[name] = value;
    } else
      delete this.geoHackParams[name];

    if (updateView || typeof(updateView) == "undefined") {
      if (name == "dim") {
        if (value) {
          var match = (value + '').match(/\s*([0-9]+(?:\.[0-9]+)?)\s*(k?m)?\s*/);
          if (match) {
            // alert(match[1] + '|' + match[2]);
            this.geoHackParams[name] = value = '' + Math.round(match[1]) + (match[2] == 'km' ? 'km' : '');
            var d = match[1] * (match[2] == 'km' ? 1000 : 1);
            this.diameterCircleRadius = d / 2;
          } else
            this.diameterCircleRadius = null;
        } else
          this.diameterCircleRadius = null;
      }
      this.refreshDiameterCircle(null);
    }

    if (updateInput || typeof(updateInput) == "undefined") {
      var elName = 'iGeoHack' + name.charAt(0).toUpperCase() + name.substring(1, name.length); // 'type' -> 'iGeoHackType';
      var el = this[elName];
      if (el) {
        el.value = value;
      }
    }
  }
  this.setGeoHackParam = setGeoHackParam;

  function implodeGeoHackParams(params, exclude)
  {
    if (!exclude)
       exclude = {};
    var text = "";
    if (params) {
      var done = {};
      var order = ['type', 'scale', 'region']; // these parameters in fixed order
      for (var i = 0; i < order.length; i++) {
        var name = order[i];
        if (params[name] && !exclude[name]) {
          text += (text ? '_' : '') + name + ':' + params[name];
          done[name] = true;
        }
      }
      for (var name in params)                 // rest in generic order
        if (!done[name] && !exclude[name])
          text += (text ? '_' : '') + name + ':' + params[name];
    }
    return text;
  }                                                            this.implodeGeoHackParams = implodeGeoHackParams;

  function setGeoHackRegionMode(mode, focus)
  {
    this.geoHackRegionMode = mode;
    if (mode == "") {
      this.iGeoHackRegionMode.value = "";
      this.iGeoHackRegion.style.display = "none";
      this.iGeoHackRegionMode.style.display = "";
      this.setGeoHackParam("region", '');
      this.applyCoordData(null, {"SYNC_MAP": false});
    }
    if (mode == "custom") {
      this.iGeoHackRegionMode.style.display = "none";
      this.iGeoHackRegion.style.display = "";
      this.iGeoHackRegion.value = "";
      if (typeof(focus) == "undefined" || focus)
        this.iGeoHackRegion.focus();
      this.setGeoHackParam("region", '');
      this.applyCoordData(null, {"SYNC_MAP": false});
    }
    if (mode == "auto") {
      this.iGeoHackRegionMode.value = "auto";
      this.iGeoHackRegion.style.display = "none";
      this.iGeoHackRegionMode.style.display = "";
      if (typeof(focus) == "undefined" || focus)
        this.iGeoHackRegionMode.focus();
      this.scheduleRegionGeocodingRequest();
    } // else
      // this.setRegionGeocodingLabel("invalid");
  }
  this.setGeoHackRegionMode = setGeoHackRegionMode;

  function setCoordDec(lat, lon, actions)
  {
    var data = {};

    lat = 1.0 * lat;
    lon = 1.0 * lon;

    data['lat'] = lat;
    data['latdegdec'] = Math.round(lat * Math.pow(10, this.degPrecision)) / Math.pow(10, this.degPrecision);
    var dms = roundDms(d2dms(data['lat']), this.secPrecision);
    data['latdegint'] = dms['d'];
    data['latminint'] = dms['m'];
    data['latsecdec'] = dms['s'];
    data['latdegabs'] = Math.abs(data['latdegint']);
    data['latdegdecabs'] = Math.abs(data['latdegdec']);
    data['latdeground'] = Math.round(data['latdegdec']);
    data['latmindec'] = data['latminint'] + data['latsecdec'] / 60; // recalculate from rounded seconds (otherwise would not match rounded degrees)
    data['latmindec'] = Math.round(data['latmindec'] * Math.pow(10, this.minPrecision)) / Math.pow(10, this.minPrecision);
    data['latminround'] = Math.round(data['latmindec']);
    data['latsecint'] = Math.floor(data['latsecdec']);
    data['latsecround'] = Math.round(data['latsecdec']);
    data['latNS']     = (data['latdegdec'] >= 0 ? 'N' : 'S');

    data['lon'] = lon;
    data['londegdec'] = Math.round(lon * Math.pow(10, this.degPrecision)) / Math.pow(10, this.degPrecision);
    var dms = roundDms(d2dms(data['lon']), this.secPrecision);
    data['londegint'] = dms['d'];
    data['lonminint'] = dms['m'];
    data['lonsecdec'] = dms['s'];
    data['londegabs'] = Math.abs(data['londegint']);
    data['londegdecabs'] = Math.abs(data['londegdec']);
    data['londeground'] = Math.round(data['londegdec']);
    data['lonmindec'] = data['lonminint'] + data['lonsecdec'] / 60;
    data['lonmindec'] = Math.round(data['lonmindec'] * Math.pow(10, this.minPrecision)) / Math.pow(10, this.minPrecision);
    data['lonminround'] = Math.round(data['lonmindec']);
    data['lonsecint'] = Math.floor(data['lonsecdec']);
    data['lonsecround'] = Math.round(data['lonsecdec']);
    data['lonEW']     = (data['londegdec'] >= 0 ? 'E' : 'W');

    if (this.jtskConverter) {
      if ((data['lat'] >= 47) && (data['lat'] <= 52) && (data['lon'] >= 10) && (data['lon'] <= 24.8))
        var jtsk = this.jtskConverter.wgs84ToJtsk(data['lat'], data['lon']);
      else
        var jtsk = false;
      data['latjtsk'] = (jtsk ? jtsk['x'].toFixed(2) : '');
      data['lonjtsk'] = (jtsk ? jtsk['y'].toFixed(2) : '');
    }

    if (this.iQuery)
      this.iQuery.style.color = "#777777";

    this.refreshDiameterCircle(null);

    this.applyCoordData(data, actions);
  }
  this.setCoordDec = setCoordDec;

  function setCoordDms(latNS, latD, latM, latS, lonEW, lonD, lonM, lonS, actions)
  {
    latNS = (latNS == -1 || latNS == "S" ? -1 : 1);
    lonEW = (lonEW == -1 || lonEW == "W" ? -1 : 1);

    this.setCoordDec(
        (Math.abs(latD) + (latM / 60 + latS / 3600)) * (latNS * (latD < 0 ? -1 : 1) < 0 ? -1 : 1),
        (Math.abs(lonD) + (lonM / 60 + lonS / 3600)) * (lonEW * (lonD < 0 ? -1 : 1) < 0 ? -1 : 1),
        actions);
  }
  this.setCoordDms = setCoordDms;

  /* Hemisphere signs parser (N/S, E/W) */
  function getNsewSigns(ns, ew)
  {
    // 2010-03-19: weaker condition to not fail a match when just one of NS/EW present
    if (!ns || !ew)
      return {'ns': +1, 'ew': +1}

    if (!ns && !ew)
      return {'ns': +1, 'ew': +1}

    // trace(ns + ", " + ew);

    var s = {'ns': 0, 'ew': 0};

    ns = (ns + '').toLowerCase();
    ew = (ew + '').toLowerCase();

    // English N/S, E/W
    if (ns == "n") s['ns'] = +1;
    if (ns == "s") s['ns'] = -1;
    if (ew == "e") s['ew'] = +1;
    if (ew == "w") s['ew'] = -1;

    // Slovak S/J, V/Z
    if (!s['ns'] || !s['ew']) {
      if (ns == "s") s['ns'] = +1;
      if (ns == "j") s['ns'] = -1;
      if (ew == "v") s['ew'] = +1;
      if (ew == "z") s['ew'] = -1;
    }

    // Slovak s.s./j.s., v.d./z.d.
    if (!s['ns'] || !s['ew']) {
      ns = ns.replace(/[\s\.]/g, "");
      ew = ew.replace(/[\s\.]/g, "");
      if (ns == "s\u0161") s['ns'] = +1;
      if (ns == "ss") s['ns'] = +1;
      if (ns == "j\u0161") s['ns'] = -1;
      if (ns == "js") s['ns'] = -1;
      if (ew == "vd") s['ew'] = +1;
      if (ew == "zd") s['ew'] = -1;
    }

    // Slovak s.z.s./j.z.s., v.z.d./z.z.d.
    if (!s['ns'] || !s['ew']) {
      if (ns == "sz\u0161") s['ns'] = +1;
      if (ns == "szs") s['ns'] = +1;
      if (ns == "jz\u0161") s['ns'] = -1;
      if (ns == "jzs") s['ns'] = -1;
      if (ew == "vzd") s['ew'] = +1;
      if (ew == "zzd") s['ew'] = -1;
    }

    // trace(s['ns'] + ", " + s['ew']);

    if (!s['ns'] || !s['ew'])
      return false;

    return s;
  }
  this.getNsewSigns = getNsewSigns;

  /* Query parser */
  function setQueryText(text, actions)
  {
    result = true;

    var match;
    var signs;
    var data = {};

    var reNS = "([NS]|[SJ]|s\\.?\\s*z?\\.?\\s*[s\u0161]\\.?\\s*|j\\.?\\s*z?\\.?\\s*[s\u0161]\\.?)";
    var reEW = "([EW]|[VZ]|v\\.?\\s*z?\\.?\\s*d\\.?|z\\.?\\s*z?\\.?\\s*d\\.?)";

    if (this.eQueryErrors) {
      this.eQueryErrors.innerHTML = '';
      this.eQueryErrors.style.display = 'none'; // IE keeps div height even for empty innerHTML
    }

    /* GeoHack params parser (type, region, scale, heading) */
    var re = /(?:^|\W|_|\|)(type|region|dim|scale|heading)[:=]([a-zA-Z][a-zA-Z0-9-]*|\d+(?:k?m)?)/g;
    var paramValues = {};
    while ((match = re.exec(text)) != null) {
      // vd(match[1]);
      paramValues[match[1]] = match[2];
      this.setGeoHackParam(match[1], match[2]);
    }
    if (!paramValues["heading"])
      this.setGeoHackParam("heading", "");

    /* Some specific "DD.DDDD DD.DDDD" patterns */

    if (
        (match = text.match(/(?:^|\W)q=([-\u2212]\s*)?(\d{1,2}[.,]\d+)[^\d.]+?([-\u2212]\s*)?([01]?\d{1,2}[.,]\d+)/)) ||
        (match = text.match(/(?:^|\W)ll=([-\u2212]\s*)?(\d{1,2}[.,]\d+)[^\d.]+?([-\u2212]\s*)?([01]?\d{1,2}[.,]\d+)/))
      )
    {

      var lat = (match[1] ? -1 : 1) * match[2].replace(/,/, '.');
      var lon = (match[3] ? -1 : 1) * match[4].replace(/,/, '.');

      this.setCoordDec(lat, lon);
    }

    /* "DD MM SS.SS DDD MM SS.SS" patterns */

    else if (
        /* GeoHack "DD_MM_SS.SS_DDD_MM_SS.SS" pattern */
        ( (match = text.match(new RegExp("(?:^|\\D)([-\\u2212]\\s*)?(\\d{1,2})_([0-5]?\\d)_([0-5]?\\d)(?:[.,](\\d+))?(?:_"+reNS+"_|_)([-\\u2212]\\s*)?([01]?\\d{1,2})_([0-5]?\\d)_([0-5]?\\d)(?:[.,](\\d+))?(?:_"+reEW+")?", "i"))) &&
          (signs = this.getNsewSigns(match[6], match[12]))
        ) ||
        /* GeoHack "DD|MM|SS.SS|DDD|MM|SS.SS" pattern */
        ( (match = text.match(new RegExp("(?:^|\\D)([-\\u2212]\\s*)?(\\d{1,2})\\|([0-5]?\\d)\\|([0-5]?\\d)(?:[.,](\\d+))?(?:\\|"+reNS+"\\||\\|)([-\\u2212]\\s*)?([01]?\\d{1,2})\\|([0-5]?\\d)\\|([0-5]?\\d)(?:[.,](\\d+))?(?:\\|"+reEW+")?", "i"))) &&
          (signs = this.getNsewSigns(match[6], match[12]))
        ) ||
        /* Generic "DD MM SS.SS DDD MM SS.SS" pattern */
        ( (match = text.match(new RegExp("(?:^|\\D)([-\\u2212]\\s*)?(\\d{1,2})[^\\d.]+([0-5]?\\d)[^\\d.]+([0-5]?\\d)(?:[.,](\\d+))?(?:\\W*"+reNS+"\\D*?|\\D+?)([-\\u2212]\\s*)?([01]?\\d{1,2})[^\\d.]+([0-5]?\\d)[^\\d.]+([0-5]?\\d)(?:[.,](\\d+))?[^\\w]*"+reEW+"?", "i"))) &&
          (signs = this.getNsewSigns(match[6], match[12]))
        )
      )
    {
      // match: lat: (1. +/-, 2. d, 3. m, 4. s, 5. sd, 6. N/S), lon: (7. +/-, 8. d, 9. m, 10. s, 11. sd, 12. E/W)

      // vd(match);

      // var signLat  = (match[1] ? -1 : 1) * ((match[6] && match[6].toUpperCase()) == 'S' ? -1 : 1);
      // var signLon  = (match[7] ? -1 : 1) * ((match[12] && match[12].toUpperCase() == 'W') ? -1 : 1);
      var signLat  = (match[1] ? -1 : 1) * signs['ns'];
      var signLon  = (match[7] ? -1 : 1) * signs['ew'];
      this.setCoordDms(
          signLat, match[2], match[3], (match[4]  + (match[5]  ? '.' + match[5]  : '')),
          signLon, match[8], match[9], (match[10] + (match[11] ? '.' + match[11] : '')),
          actions);

    }

    /* Comma [,] decimal separator version of "DD.DDDD DDD.DDDD" pattern */

    else if (
      (match = text.match(new RegExp("(?:^|\\D)([-\\u2212]\\s*)?(\\d{1,2}[,]\\d+)(?:\\W*"+reNS+"[^\\d.,]*?|[^\\d.,]+?)([-\\u2212]\\s*)?([01]?\\d{1,2}[,]\\d+)[^\\w]*"+reEW+"?", "i"))) &&
      (signs = this.getNsewSigns(match[3], match[6]))
    ) {

      // match: lat: (1. +/-, 2. d.d 3. N/S), lon: (4. +/-, 5. d.d 6. E/W)

      // vd(match);

      var lat = (match[1] ? -1 : 1) * signs['ns'] * match[2].replace(/,/, '.');
      var lon = (match[4] ? -1 : 1) * signs['ew'] * match[5].replace(/,/, '.');

      // alert(lat + ", " + lon);

      this.setCoordDec(lat, lon);
    }

    /*  S-JTSK pattern */

    else if (
      this.jtskConverter &&
      (match = text.match(new RegExp("(?:^|[^\\d\\.])(\\d{6,7}(?:\\.\\d+)?)\\D+(?:.*?[^\\d\\.]+)?(\\d{6,7}(?:\\.\\d+)?)(?:\\D|$)", "i"))) &&
      (ll = this.tryJtskToWgs(match[1], match[2]))
    ) {

      // vd(match);

      this.setCoordDec(ll['lat'], ll['lon']);
    }

    /* "DD MM.MM DDD MM.MM" patterns */

    else if (
        /* GeoHack "DD_MM.MM_DDD_MM.MM" pattern */
        ( (match = text.match(new RegExp("(?:^|\\D)([-\\u2212]\\s*)?(\\d{1,2})_([0-5]?\\d)(?:[.,](\\d+))?(?:_"+reNS+"_|_)([-\\u2212]\\s*)?([01]?\\d{1,2})_([0-5]?\\d)(?:[.,](\\d+))?(?:_"+reEW+")?", "i"))) &&
          (signs = this.getNsewSigns(match[5], match[10]))
        ) ||
        /* GeoHack "DD|MM.MM|DDD|MM.MM" pattern */
        ( (match = text.match(new RegExp("(?:^|\\D)([-\\u2212]\\s*)?(\\d{1,2})\\|([0-5]?\\d)(?:[.,](\\d+))?(?:\\|"+reNS+"\\||\\|)([-\\u2212]\\s*)?([01]?\\d{1,2})\\|([0-5]?\\d)(?:[.,](\\d+))?(?:\\|"+reEW+")?", "i"))) &&
          (signs = this.getNsewSigns(match[5], match[10]))
        ) ||
        /* Generic "DD MM.MM DDD MM.MM" pattern */
        ( (match = text.match(new RegExp("(?:^|\\D)([-\\u2212]\\s*)?(\\d{1,2})[^\\d.]+([0-5]?\\d)(?:[.,](\\d+))?(?:\\W*"+reNS+"\\D*?|\\D+?)([-\\u2212]\\s*)?([01]?\\d{1,2})[^\\d.]+([0-5]?\\d)(?:[.,](\\d+))?[^\\w]*"+reEW+"?", "i"))) &&
          (signs = this.getNsewSigns(match[5], match[10]))
        )
      )
    {
      // match: lat: (1. +/-, 2. d, 3. m, 4. md, 5. N/S), lon: (6. +/-, 7. d, 8. m, 9. md, 10. E/W)

      // vd(match);

      var signLat  = (match[1] ? -1 : 1) * signs['ns'];
      var signLon  = (match[6] ? -1 : 1) * signs['ew'];
      this.setCoordDms(
          signLat, match[2], (match[3] + (match[4] ? '.' + match[4] : '')), 0,
          signLon, match[7], (match[8] + (match[9] ? '.' + match[9] : '')), 0,
          actions);

    // } else if ((match = text.match(/(?:^|\D)([-\u2212]\s*)?(\d{1,2}[.,]\d+)[^\d.]+?([-\u2212]\s*)?([01]?\d{1,2}[.,]\d+)/))) {
    }

    /* Generic "DD.DDDD DDD.DDDD" pattern */

    else if (
      (match = text.match(new RegExp("(?:^|\\D)([-\\u2212]\\s*)?(\\d{1,2}[.,]\\d+)(?:\\W*"+reNS+"[^\\d.]*?|[^\\d.]+?)([-\\u2212]\\s*)?([01]?\\d{1,2}[.,]\\d+)[^\\w]*"+reEW+"?", "i"))) &&
      (signs = this.getNsewSigns(match[3], match[6]))
    ) {

      // match: lat: (1. +/-, 2. d.d 3. N/S), lon: (4. +/-, 5. d.d 6. E/W)

      // vd(match);

      var lat = (match[1] ? -1 : 1) * signs['ns'] * match[2].replace(/,/, '.');
      var lon = (match[4] ? -1 : 1) * signs['ew'] * match[5].replace(/,/, '.');

      // alert(lat + ", " + lon);

      this.setCoordDec(lat, lon);
    }

    /*  Generic "DD DDD" pattern */

    else if (
      (match = text.match(new RegExp("(?:^|\\D)([-\\u2212]\\s*)?(\\d{1,2}(?:[.,]\\d+)?)(?:\\W*"+reNS+"[^\\d.]*?|[^\\d.]+?)([-\\u2212]\\s*)?([01]?\\d{1,2}(?:[.,]\\d+)?)[^\\w]*"+reEW+"?", "i"))) &&
      (signs = this.getNsewSigns(match[3], match[6]))
    ) {

      // vd(match);

      var lat = (match[1] ? -1 : 1) * signs['ns'] * match[2].replace(/,/, '.');
      var lon = (match[4] ? -1 : 1) * signs['ew'] * match[5].replace(/,/, '.');

      // alert(lat + ", " + lon);

      this.setCoordDec(lat, lon);
    }

    /* Error - no match */

    else {
      result = false;
      this.setCoordDec(0, 0);

      if (this.eQueryErrors && text) {
        var markup = this.loc['gl/queryParseError'] + ": '" + text + "'";
        markup = markup.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        this.eQueryErrors.innerHTML = markup;
        this.eQueryErrors.style.display = '';
      }
    }

    if (this.iQuery)
      this.iQuery.style.color = "";

    if (result)
      this.queryTextSet = true;

    return result;
  }
  this.setQueryText = setQueryText;

  function tryJtskToWgs(x1, x2)
  {
    var ll = false;

    if (this.jtskConverter) {
      // alert("tryJtskToWgs in: " + x1 + ", " + x2);
      x1 = Math.abs(x1);
      x1 = Math.abs(x1);
      var c = 930000;
      var jtsk;
      if (x1 > c && x2 < c)
        ll = this.jtskConverter.jtskToWgs84(x2, x1);
      else if (x2 > c && x1 < c)
        ll = this.jtskConverter.jtskToWgs84(x1, x2);
      if (ll) {
        ll['lon'] = ll['lng']; // compatibility
        // alert("tryJtskToWgs out: " + ll['lat'] + ", " + ll['lng']);
      }
    }

    return ll;
  }
  this.tryJtskToWgs = tryJtskToWgs;

  function setMapPreset(text)
  {
    var data = text.split(/[\s,]+/);
    if (data.length >= 3) {
      // alert(data[0] + ", " + data[1]);
      var c = new google.maps.LatLng(data[0] * 1, data[1] * 1);
      this.map.setCenter(c);
      if (data.length >= 4) {
        var s = new google.maps.LatLng(data[2] * 0.9, data[3] * 0.9);
        // var s = new google.maps.LatLng(data[2] * 0.99, data[3] * 0.99);
        var b = new google.maps.LatLngBounds(
          new google.maps.LatLng(c.lat() - s.lat() / 2, c.lng() - s.lng() / 2),
          new google.maps.LatLng(c.lat() + s.lat() / 2, c.lng() + s.lng() / 2) );
        // var z = this.map.getBoundsZoomLevel(b)
        // var z=  this.getZoomByBounds(this.map, b);
        this.map.fitBounds(b);
        // this.map.setZoom(z);
        // alert("sw: " + b.getSouthWest().toUrlValue() + ", ne: " + b.getNorthEast().toUrlValue()); alert("s: " + s.toUrlValue() + ", " + "bs: " + b.toSpan().toUrlValue()); // alert(z);
      } else {
        var z = Math.min(Math.max(data[2], 0), 20);
        this.map.setZoom(z);
      }
    }
    return false;
  }
  this.setMapPreset = setMapPreset;

  function clear()
  {
    this.setQueryText('');
    this.iQuery.value = '';
    this.setGeoHackParam('type', '');
    this.setGeoHackParam('scale', '');
    this.setGeoHackParam('dim', '');
    this.setGeoHackParam('region', '');
    this.diameterCircleRadius = null;
    this.geoHackParams = {};
    // this.setGeoHackRegionMode("auto");
    this.setGeoHackRegionMode("");
    this.applyCoordData();
  }
  this.clear = clear;

  function loadSettings(initMap)
  {
    var cfg = OEUtil.getCookie("glCfg");
    if (cfg) {
      this.parseUrl(cfg, {'noQueryAsCoordText': true, 'noCenterAsCoordText': true});
      if (initMap)
        this.initGoogleMap();
    }
    return !!cfg;
  }
  this.loadSettings = loadSettings;

  function bindElements()
  {
    for (var i in this.knownElements) {
      var elName = this.knownElements[i];
      if (!this[elName]) {
        var el = document.getElementById(elName);
        this[elName] = el;
      }
    }

    var _this = this;
    var el;

    if ((el = this.aCfgSave) && !el.onclick) {
      el.onclick = function() { if (confirm("Save current view and settings as defaults?")) { var expires = new Date(); expires.setTime(expires.getTime()+(10*365*24*3600*1000)); OEUtil.setCookie("glCfg", _this.getSelfUrlQuery({'query': false, 'mapView': true, 'settings': true}), expires); } return false; };
    }
    if ((el = this.aCfgLoad) && !el.onclick) {
      // el.onclick = function() { window.location = (window.location + '').replace(/\?.*$/, ''); return false; };
      el.onclick = function() { _this.loadSettings(false); return false; };
    }
    if ((el = this.aCfgReset) && !el.onclick) {
      el.onclick = function() { if (confirm("Replace saved settings with default values?")) { var expires = new Date(); expires.setTime(expires.getTime()+(10*365*24*3600*1000)); OEUtil.setCookie("glCfg", '', expires); } return false; };
    }

    // 'aTypeClear', 'aDimClear', 'aScaleClear', 'aRegionClear',
    if ((el = this.aHeadingClear) && !el.onclick) {
      el.onclick = function() { _this.clearHeading(); return false; };
    }
    if ((el = this.aTypeClear) && !el.onclick) {
      el.onclick = function() { _this.setGeoHackParam('type', '', true, true); _this.applyCoordData(null, {"SYNC_MAP": false}); return false; };
    }
    if ((el = this.aDimClear) && !el.onclick) {
      el.onclick = function() { _this.setGeoHackParam('dim', '', true, true); _this.applyCoordData(null, {"SYNC_MAP": false}); return false; };
    }
    if ((el = this.aScaleClear) && !el.onclick) {
      el.onclick = function() { _this.setGeoHackParam('scale', '', true, true); _this.applyCoordData(null, {"SYNC_MAP": false}); return false; };
    }
    if ((el = this.aRegionClear) && !el.onclick) {
      el.onclick = function() { _this.setGeoHackRegionMode(''); return false; };
    }

    if ((el = this.bClear) && !el.onclick) {
      el.onclick = function() { _this.clear(); };
    }

    var els = [this.iPrecRectDeg, this.iPrecRectSec, this.iPrecRectMin, this.iPrecRect1Deg];
    for (var i in els)
      if ((el = els[i]))
        el.onclick = function() { _this.refreshErrorRects(); };

    if ((el = this.iLanguage) && !el.onchange) {
      if (el.options[0]) el.options[0] = null;

      for (var langId in this.languages)
        el.options.add(new Option(this.languages[langId], langId));

      var match = (window.location.pathname + "").match(/^(.*)\.([a-z]{2})\.(.*)$/);
      this.selectedLangId = (match ? match[2] : 'en');
      el.value = this.selectedLangId;

      el.onchange = function() {
        var isEmpty = (!_this.coordData || (!_this.coordData['lat'] && !_this.coordData['lon']));
        var q = _this.getSelfUrlQuery(true);
        window.location = "geolocator." + this.value + ".html" + (q && !isEmpty ? '?' + q : '');
      };
    }

    if ((el = this.iGeoHackType) && !el.onchange) {
      if (el.options[0]) el.options[0] = null;
      el.options.add(new Option("", ""));
      el.options.add(new Option("Country", "country"));
      el.options.add(new Option("City", "city"));
      el.options.add(new Option("Landmark", "landmark"));
      el.options.add(new Option("\u00A0 - - - - - - - - ", ""));
      for (var type in this.mapTypeToScale) {
        var label = (this.mapTypeToAbbr[type] ? this.mapTypeToAbbr[type] : type);
        el.options.add(new Option(label.charAt(0).toUpperCase() + label.substring(1, label.length), type));
      }
      el.onchange = function() { _this.setGeoHackParam('type', this.value, false); _this.applyCoordData(null, {"SYNC_MAP": false}); };
    }
    if ((el = this.iGeoHackDim) && !el.onchange) {
      el.onchange = function() { _this.setGeoHackParam('dim', this.value, false); _this.applyCoordData(null, {"SYNC_MAP": false}); };
      //this.iGeoHackDim.value = "";
      el.onkeydown = function(e0) {
        var e = (e0 ? e0 : event);
        if (e.keyCode == 27)
          _this.setDiameter(null, true, true);
      }
    }
    if ((el = this.iGeoHackScale) && !el.onchange) {
      el.onchange = function() { _this.setGeoHackParam('scale', this.value, false); _this.applyCoordData(null, {"SYNC_MAP": false}); };
      el.value = "";
    }
    if ((el = this.iGeoHackRegionMode) && !el.onchange) {
      // el.value = "auto";
      el.value = "";
      el.onchange = function() { _this.setGeoHackRegionMode(this.value); };
    }
    if ((el = this.iGeoHackRegion) && !el.onchange) {
      el.onchange = function() { _this.setGeoHackParam('region', this.value, false); _this.applyCoordData(null, {"SYNC_MAP": false}); };
      el.value = "";
      el.style.display = "none";
      el.onkeydown = function(e0) {
        var e = (e0 ? e0 : event);
        if (e.keyCode == 27)
          _this.setGeoHackRegionMode("auto");
      }
    }
    if ((el = this.iHeadingPoints) && !el.onchange) {
      el.onchange = function() { _this.headingPoints = this.value; _this.precisionsChanged(); };
      this.headingPoints = el.value; // sync to eventually persisted form data
    }
    if (this.iDimPrecision && !this.iDimPrecision.onchange) {
      this.iDimPrecision.onchange = function() { _this.dimPrecision = this.value; _this.precisionsChanged(); };
      this.dimPrecision = this.iDimPrecision.value; // sync to eventually persisted form data
    }
    if (this.iSecPrecision && !this.iSecPrecision.onchange) {
      this.iSecPrecision.onchange = function() { _this.secPrecision = this.value; _this.precisionsChanged(); };
      this.secPrecision = this.iSecPrecision.value; // sync to eventually persisted form data
    }
    if (this.iDegPrecision && !this.iDegPrecision.onchange) {
      this.iDegPrecision.onchange = function() { _this.degPrecision = this.value; _this.precisionsChanged(); };
      this.degPrecision = this.iDegPrecision.value; // sync to eventually persisted form data
    }
    this.precisionsChanged();
    if (this.fQuery && !this.fQuery.onsubmit)
      this.fQuery.onsubmit = function() { _this.setQueryText(_this.iQuery.value); return false; };

    // Make custom template clickable
    if (this.eCustomTemplate) {
      var re = new RegExp("(<(code|pre)>((?:.|\n|\r)*?)</\\2>)", "gi"); // Opera requires explicit \r
      this.eCustomTemplate.parentNode.parentNode.innerHTML =
        this.eCustomTemplate.parentNode.parentNode.innerHTML.replace(re, '<a class="code $2" href="#" onclick="return geoLocator.codeOnClick(this);">$1</a>');
      this.eCustomTemplate = document.getElementById('eCustomTemplate');
    }

    if (this.fCustomTemplate && !this.fCustomTemplate.onsubmit)
      this.fCustomTemplate.onsubmit = function() { _this.customTemplateApply; return false; };
    // if (this.iCustomTemplate)
    //   this.defaultCustomTemplate = this.iCustomTemplate.value;
    if ((el = this.iCustomTemplateDefault)) {
      this.defaultCustomTemplate = el.value;
      if (this.iCustomTemplate)
        this.iCustomTemplate.value = this.defaultCustomTemplate;
    }
    this.customTemplateApply();
  }
  this.bindElements = bindElements;

  function initOnLoad()
  {
    // fix: Set back temporary input data
    for (var inputName in this.reFillInputValues)
      this[inputName].value = this.reFillInputValues[inputName];

    this.initGoogleMap();
  }
  this.initOnLoad = initOnLoad;

  function init()
  {
    showHide.bindElements();

    // if (opener && opener.GeoLocatorClient)
    //   showHide.hide('*'); // hide all tag sections when in integration mode

    if (typeof(JtskConverter) != "undefined")
      this.jtskConverter = new JtskConverter();

    this.bindTemplateElements(OEUtil.getElementsByClassName("template"));
    this.bindElements();
    if (this.aCfgSave)
      this.loadSettings();
    this.parseUrl();

    if (!this.queryTextSet && this.iQuery.value)
      this.setQueryText(this.iQuery.value);

    // fix: Temporary save input data to re-fill them back "onload" (IE would overwrite them with eventually persisted form data otherwise)
    var reFillInputs = ['iQuery', 'iGeoHackRegion'];
    this.reFillInputValues = {};
    for (var i = 0; i < reFillInputs.length; i++)
      if (this[reFillInputs[i]])
        this.reFillInputValues[reFillInputs[i]] = this[reFillInputs[i]].value;

    var _this = this;
    setTimeout(function() { _this.initOnLoad(); }, 1);
    // window.onunload = function() { GUnload(); }
  }
  this.init = init;

  function parseUrl(queryString, options)
  {
    var q = OEUtil.decodeUrlQuery(queryString);
    options = (options ? options : {});

    // vd(q);
    // alert(queryString);

    if (q['ct'] && this.iCustomTemplate) {
      this.iCustomTemplate.value = q['ct'];
      this.customTemplateApply();
      showHide.show('tCustom');
    }
    if (q['dp'] && q['dp'].match(/^[4-6]$/) && this.iDegPrecision) {
      this.degPrecision = this.iDegPrecision.value = q['dp'];
      this.precisionsChanged();
    }
    if (q['sp'] && q['sp'].match(/^[0-2]$/) && this.iSecPrecision) {
      this.secPrecision = this.iSecPrecision.value = q['sp'];
      this.precisionsChanged();
    }
    if (q['hp'] && q['hp'].match(/^(4|8|16|32|360)$/) && this.iHeadingPoints) {
      this.headingPoints = this.iHeadingPoints.value = q['hp'];
      this.precisionsChanged();
    }
    if (q['mp'] && q['mp'].match(/^[1-4]$/) && this.iDimPrecision) {
      this.dimPrecision = this.iDimPrecision.value = q['mp'];
      this.precisionsChanged();
    }
    if ((q['rm'] || q['rm'] === '') && q['rm'] != this.geoHackRegionMode)
      this.setGeoHackRegionMode(q['rm'], false);

    if (this.iQuery) {
      var v = this.iQuery.value;

      // alert(q['ll']);
      if (q['ll'])
        this.initialMapCenter = this.parseCommaSeparatedPair(q['ll']);
      if (q['spn'])
        this.initialMapSpan = this.parseCommaSeparatedPair(q['spn']);
      if (q['t'])
        this.initialMapType = (this.mapMapTypeUrlArgToMapType[q['t']] ? this.mapMapTypeUrlArgToMapType[q['t']] : q['t']);
        // alert(this.initialMapType);
        // this.initialMapType = q['t'];

      if (q['params'] && this.setQueryText(q['params']))
        this.iQuery.value = q['params'];
      else if (q['q'] && this.setQueryText(q['q']))
        this.iQuery.value = q['q'];
      else if (!options.noCenterAsCoordText && q['ll'] && this.setQueryText(q['ll']))
        this.iQuery.value = q['ll'];
      else if (!options.noQueryAsCoordText && typeof(q['q']) == 'undefined') {
        // Try to use whole query string as input
        q = window.location.search + '';
        q = q.substring(1, q.length);
        // if (this.setQueryText(q))
        if (this.setQueryText(unescape(q)))
          this.iQuery.value = unescape(q);
      }
    }

    if (q['pr']) {
      if (q['pr'].indexOf('d') !== -1 && this.iPrecRect1Deg)
        this.iPrecRect1Deg.checked = true;
      if (q['pr'].indexOf('m') !== -1 && this.iPrecRectMin)
        this.iPrecRectMin.checked = true;
      if (q['pr'].indexOf('s') !== -1 && this.iPrecRectSec)
        this.iPrecRectSec.checked = true;
      if (q['pr'].indexOf('g') !== -1 && this.iPrecRectDeg)
        this.iPrecRectDeg.checked = true;
      this.refreshErrorRects();

      // var _this = this;
      // setTimeout(function() { _this.refreshErrorRects(); }, 1);
    }
  }
  this.parseUrl = parseUrl;

  function parseCommaSeparatedPair(text)
  {
    var m = (text ? (text + '').match(/^\s*(-?\d+(?:\.\d+)?)\s*,(-?\d+(?:\.\d+)?)\s*$/) : null)
    if (m) {
      return [m[1] - 0.0, m[2] - 0.0];
    } else
      return false;
  }
  this.parseCommaSeparatedPair = parseCommaSeparatedPair;

  function getSelfUrlParams(include)
  {
    var q = {};
    var d = this.coordData;

    if (!include || include === true)
      include = {'query': true, 'mapView': true, 'settings': true};

    if (include.query)
      q['params'] = (d['lat'] - 0.0).toFixed(6) + '_' + (d['lon'] - 0.0).toFixed(6) + (d['ghparams'] ? '_' : '') + d['ghparams'];

    if (include.mapView && this.map) {
      var c = this.map.getCenter();
      var s = (this.map.getBounds() ? this.map.getBounds().toSpan() : null);
      var llRequired = (Math.abs(d['lat'] - c.lat()) > 1E-08 || Math.abs(d['lon'] - c.lng()) > 1E-08);
      if (llRequired)
        q['ll'] = c.lat().toFixed(6) + "," + c.lng().toFixed(6);
      if (s)
        q['spn'] = s.lat().toPrecision(3) + "," + s.lng().toPrecision(3);

      var v;
      if (v = this.map.getMapTypeId()) {
        // vd(this.map.mapTypes.get(this.map.getMapTypeId()));
        q['t'] = v;
        for (var k in this.mapMapTypeUrlArgToMapType)
          if (this.mapMapTypeUrlArgToMapType[k] == v)
            q['t'] = k;
      }
    }

    if (include.settings) {
      q['ct'] = ((this.iCustomTemplate && this.iCustomTemplate.value != this.defaultCustomTemplate) ? this.iCustomTemplate.value : false);
      q['dp'] = this.degPrecision;
      q['sp'] = this.secPrecision;
      q['mp'] = this.dimPrecision;
      q['hp'] = this.headingPoints;
      q['rm'] = this.geoHackRegionMode;

      q['pr'] =
        ((this.iPrecRect1Deg && this.iPrecRect1Deg.checked) ? 'd' : '') +
        ((this.iPrecRectMin && this.iPrecRectMin.checked)   ? 'm' : '') +
        ((this.iPrecRectSec && this.iPrecRectSec.checked)   ? 's' : '') +
        ((this.iPrecRectDeg && this.iPrecRectDeg.checked)   ? 'g' : '') +
        '';
      q['pr'] = (q['pr'] ? q['pr'] : null);
    }

    return q;
  }
  this.getSelfUrlParams = getSelfUrlParams;

  function getSelfUrlQuery(withSettings)
  {
    return OEUtil.encodeUrlQuery(this.getSelfUrlParams(withSettings)).replace(/%3A/g, ':').replace(/%2C/g, ',');
  }
  this.getSelfUrlQuery = getSelfUrlQuery;

  function getSelfUrl(withSettings)
  {
    var q = this.getSelfUrlQuery(withSettings);
    var url = (window.location + '').replace(/\?.*$/, '') + (q ? '?' : '') + q;
    return url;
  }
  this.getSelfUrl = getSelfUrl;

  function customTemplateApply()
  {
    if (this.eCustomTemplate && this.iCustomTemplate) {
      this.addTemplateElement('eCustomTemplate', this.eCustomTemplate, this.iCustomTemplate.value);
      this.applyCoordData(null, {"SYNC_MAP": false});
    }
  }
  this.customTemplateApply = customTemplateApply;

  function customTemplateReset()
  {
    if (this.iCustomTemplate)
      this.iCustomTemplate.value = this.defaultCustomTemplate;
    this.customTemplateApply();
  }
  this.customTemplateReset = customTemplateReset;

  function construct()
  {
    if (typeof(JtskConverter) != "undefined")
      this.jtskConverter = new JtskConverter();

    this.setCoordDec(0, 0);
  }
  this.construct = construct;

  this.construct();
}
