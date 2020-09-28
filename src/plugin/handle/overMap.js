/**
 * 鹰眼图组件
 */
class OverMap {
    constructor(arg) {
        this.Cesium = require('cesium/Cesium')
        this.viewer = arg.viewer
        this.L = arg.L
        this.optionsData = arg.options
        this.tileLayer = arg.layer
        this._container = null;
        this._miniMap = null;
        this._viewerMoving = false;
        this._miniMapMoving = false;
        this._userToggledDisplay = false;
        this._minimized = false;
        this.options = {
            position: 'bottomleft',
            toggleDisplay: true,
            zoomLevelOffset: -5,
            zoomLevelFixed: false,
            centerFixed: false,
            zoomControl: false,
            zoomAnimation: false,
            autoToggleDisplay: false,
            minimized: false,
            width: 150,
            height: 150,
            collapsedWidth: 19,
            collapsedHeight: 19,
            aimingRectOptions: {
                color: '#ff7800',
                weight: 1,
                interactive: false
            },
            shadowRectOptions: {
                color: '#000000',
                weight: 1,
                interactive: false,
                opacity: 0,
                fillOpacity: 0
            },
            strings: {
                hideText: '隐藏鹰眼',
                showText: '显示鹰眼'
            },
            mapOptions: {
                toggleDisplay: true,
                aimingRectOptions: {
                    color: "#ff1100",
                    weight: 3
                },
                shadowRectOptions: {
                    color: "#0000AA",
                    weight: 1,
                    opacity: 0,
                    fillOpacity: 0
                }
            }
        };
    }

    init() {
        this._container = this.optionsData.container;
        this.L.Util.setOptions(this, this.optionsData);

        this.options.aimingRectOptions.interactive = false;
        this.options.shadowRectOptions.interactive = false;

        this._initMap();
        this._showInitView();
    }

    updateAimingRect() {
        var _this = this;
        var rect = _this._getViewRange();
        _this._aimingRect.setBounds(rect);
    }

    _initMap() {
        var _this = this;

        this._container.style.width = this.options.width + 'px';
        this._container.style.height = this.options.height + 'px';

        _this.L.DomEvent.disableClickPropagation(_this._container);
        _this.L.DomEvent.on(_this._container, 'mousewheel', _this.L.DomEvent.stopPropagation);

        var mapOptions = {
            attributionControl: false,
            dragging: !_this.options.centerFixed,
            zoomControl: _this.options.zoomControl,
            zoomAnimation: _this.options.zoomAnimation,
            autoToggleDisplay: _this.options.autoToggleDisplay,
            touchZoom: _this.options.centerFixed ? 'center' : !_this._isZoomLevelFixed(),
            scrollWheelZoom: _this.options.centerFixed ? 'center' : !_this._isZoomLevelFixed(),
            doubleClickZoom: _this.options.centerFixed ? 'center' : !_this._isZoomLevelFixed(),
            boxZoom: !_this._isZoomLevelFixed(),
            crs: _this.L.CRS.EPSG3857,
            center: [30, 120],
            zoom: 1
        };
        mapOptions = _this.L.Util.extend(_this.options.mapOptions, mapOptions);

        _this._miniMap = new _this.L.Map(_this._container, mapOptions);

        var layer = this.tileLayer;
        _this._miniMap.addLayer(layer);

        _this._viewerMoving = true;
        _this._miniMapMoving = false;

        _this._userToggledDisplay = false;
        _this._minimized = false;

        if (this.options.toggleDisplay) {
            this._addToggleButton();
        }

        _this._miniMap.whenReady(_this.L.Util.bind(function () {
            var bounds = _this._getViewRange();
            _this._aimingRect = _this.L.rectangle(bounds, _this.options.aimingRectOptions).addTo(_this._miniMap);
            _this._shadowRect = _this.L.rectangle(bounds, _this.options.shadowRectOptions).addTo(_this._miniMap);

            var camera = _this.viewer.scene.camera;
            camera.moveEnd.addEventListener(function (e) {
                var rect = _this._getViewRange();
                if (!_this._miniMapMoving) {
                    _this._viewerMoving = true;
                    var zrect = _this._getZoomOutRange(rect);
                    if (zrect) {
                        _this._miniMap.fitBounds(zrect);
                        _this._setDisplay(_this._decideMinimized());
                    }
                } else {
                    _this._miniMapMoving = false;
                }
                if (rect)
                    _this._aimingRect.setBounds(rect);
            });
            camera.moveStart.addEventListener(function (e) {
                var rect = _this._getViewRange();
                if (rect)
                    _this._aimingRect.setBounds(rect);
            });

            _this._miniMap.on('movestart', _this._onMiniMapMoveStarted, _this);
            _this._miniMap.on('move', _this._onMiniMapMoving, _this);
            _this._miniMap.on('moveend', _this._onMiniMapMoved, _this);
        }, _this));

        return _this._container;
    }

    _addToggleButton() {
        this._toggleDisplayButton = this.options.toggleDisplay ? this._createButton(
            '', this._toggleButtonInitialTitleText(), ('leaflet-control-minimap-toggle-display leaflet-control-minimap-toggle-display-' +
                this.options.position), this._container, this._toggleDisplayButtonClicked, this) : undefined;
        this._toggleDisplayButton.style.width = this.options.collapsedWidth + 'px';
        this._toggleDisplayButton.style.height = this.options.collapsedHeight + 'px';
    }

    _toggleButtonInitialTitleText() {
        if (this.options.minimized) {
            return this.options.strings.showText;
        } else {
            return this.options.strings.hideText;
        }
    }

    _createButton(body, title, className, container, fn, context) {
        var link = this.L.DomUtil.create('a', className, container);
        link.innerHtml = body;
        link.href = '#';
        link.title = title;

        var stop = this.L.DomEvent.stopPropagation;

        this.L.DomEvent
            .on(link, 'click', stop)
            .on(link, 'mousedown', stop)
            .on(link, 'dblclick', stop)
            .on(link, 'click', this.L.DomEvent.preventDefault)
            .on(link, 'click', fn, context);

        return link;
    }

    _toggleDisplayButtonClicked() {
        this._userToggledDisplay = true;
        if (!this._minimized) {
            this._minimize();
        } else {
            this._restore();
        }
    }

    _showInitView() {
        var rect = this._getViewRange();
        var zrect = this._getZoomOutRange(rect);
        if (zrect)
            this._miniMap.fitBounds(zrect);
    }

    _setDisplay(minimize) {
        if (minimize !== this._minimized) {
            if (!this._minimized) {
                this._minimize();
            } else {
                this._restore();
            }
        }
    }

    _minimize() {
        // hide the minimap
        if (this.options.toggleDisplay) {
            this._container.style.width = this.options.collapsedWidth + 'px';
            this._container.style.height = this.options.collapsedHeight + 'px';
            this._toggleDisplayButton.className += (' minimized-' + this.options.position);
            this._toggleDisplayButton.title = this.options.strings.showText;
        } else {
            this._container.style.display = 'none';
        }
        this._minimized = true;
        this._onToggle();
    }

    _restore() {
        if (this.options.toggleDisplay) {
            this._container.style.width = this.options.width + 'px';
            this._container.style.height = this.options.height + 'px';
            this._toggleDisplayButton.className = this._toggleDisplayButton.className
                .replace('minimized-' + this.options.position, '');
            this._toggleDisplayButton.title = this.options.strings.hideText;
        } else {
            this._container.style.display = 'block';
        }
        this._minimized = false;
        this._onToggle();
    }

    _onMiniMapMoveStarted(e) {
        if (!this.options.centerFixed) {
            var lastAimingRect = this._aimingRect.getBounds();
            var sw = this._miniMap.latLngToContainerPoint(lastAimingRect.getSouthWest());
            var ne = this._miniMap.latLngToContainerPoint(lastAimingRect.getNorthEast());
            this._lastAimingRectPosition = {
                sw: sw,
                ne: ne
            };
        }
    }

    _onMiniMapMoving(e) {
        if (!this.options.centerFixed) {
            if (!this._viewerMoving && this._lastAimingRectPosition) {
                this._shadowRect.setBounds(new this.L.LatLngBounds(this._miniMap.containerPointToLatLng(this._lastAimingRectPosition.sw), this._miniMap.containerPointToLatLng(this._lastAimingRectPosition.ne)));
                this._shadowRect.setStyle({
                    opacity: 1,
                    fillOpacity: 0.3
                });
            }
        }
    }

    _onMiniMapMoved(e) {
        if (!this._viewerMoving) {
            this._miniMapMoving = true;

            var rect = this._shadowRect.getBounds();
            var west = rect.getWest();
            var east = rect.getEast();
            var north = rect.getNorth();
            var south = rect.getSouth();
            var destination = this.Cesium.Rectangle.fromDegrees(west, south, east, north);
            var orientation = {
                heading: this.Cesium.Math.toRadians(0),
                pitch: this.Cesium.Math.toRadians(-90),
                roll: 0.0
            };
            this.viewer.scene.camera.setView({
                destination: destination,
                orientation: orientation
            });
            this._shadowRect.setStyle({
                opacity: 0,
                fillOpacity: 0
            });
        } else {
            this._viewerMoving = false;
        }
    }
    _isZoomLevelFixed() {
        var zoomLevelFixed = this.options.zoomLevelFixed;
        return this._isDefined(zoomLevelFixed) && this._isInteger(zoomLevelFixed);
    }
    _decideMinimized() {
        if (this._userToggledDisplay) {
            return this._minimized;
        }

        if (this.options.autoToggleDisplay) {
            var bounds = this._getViewRange();
            if (bounds.contains(this._miniMap.getBounds())) {
                return true;
            }
            return false;
        }

        return this._minimized;
    }
    _isInteger(value) {
        return typeof value === 'number';
    }
    _isDefined(value) {
        return typeof value !== 'undefined';
    }
    _onToggle() {
        this.L.Util.requestAnimFrame(function () {
            this.L.DomEvent.on(this._container, 'transitionend', this._fireToggleEvents, this);
            if (!this.L.Browser.any3d) {
                this.L.Util.requestAnimFrame(this._fireToggleEvents, this);
            }
        }, this);
    }
    _fireToggleEvents() {
        this.L.DomEvent.off(this._container, 'transitionend', this._fireToggleEvents, this);
    }
    _getViewRange() {
        var bounds = null;
        var viewer = this.viewer;
        var camera = viewer.scene.camera;
        var range = camera.computeViewRectangle();
        if (range) {
            var west = range.west / Math.PI * 180;
            var east = range.east / Math.PI * 180;
            var north = range.north / Math.PI * 180;
            var south = range.south / Math.PI * 180;
            bounds = new this.L.LatLngBounds(
                new this.L.LatLng(north, west),
                new this.L.LatLng(south, east)
            );
        }
        return bounds;
    }
    _getZoomOutRange(rect) {
        var bounds = null;
        if (rect) {
            var west = rect.getWest();
            var east = rect.getEast();
            var north = rect.getNorth();
            var south = rect.getSouth();
            var factor = 3.0;
            var xdis = Math.abs(east - west);
            var ydis = Math.abs(north - south);
            var xoff = xdis * (factor - 1) / 2.0;
            var yoff = ydis * (factor - 1) / 2.0;
            west -= xoff;
            east += xoff;
            north += yoff;
            south -= yoff;
            if (west < -180) {
                west = -180;
            }
            if (east > 180) {
                east = 180;
            }
            if (north > 90) {
                north = 90;
            }
            if (south < -90) {
                south = -90;
            }
            bounds = new this.L.LatLngBounds(
                new this.L.LatLng(north, west),
                new this.L.LatLng(south, east)
            );
        }
        return bounds;
    }
}
export default OverMap;