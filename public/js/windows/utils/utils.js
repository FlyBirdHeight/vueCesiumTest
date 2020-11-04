/**
 * 判断是否存在对应的session数据
 * @param {string} key 
 */
function sessionIsExist(data) {
    if (data == null) {
        return false;
    }
    return true;
}

function getSessionData(key) {
    let returnData = sessionStorage.getItem(key);
    if (!sessionIsExist(returnData)) {
        return undefined;
    }
    return JSON.parse(returnData);
}

function sessionDataSetPlotting() {
    let saveData = {
        "point_label": [{
            "type": "label",
            "image_url": "http://img.xslease.com/label.jpg"
        }, {
            "type": "point",
            "image_url": "http://img.xslease.com/pointlbl.jpg"
        }, {
            "type": "billboard",
            "image_url": "http://img.xslease.com/marklbl.jpg"
        }, {
            "type": "div-point",
            "image_url": "http://img.xslease.com/tf.gif"
        }, {
            "type": "div-point",
            "image_url": "http://img.xslease.com/divpoint.jpg"
        }, {
            "type": "billboard",
            "image_url": "http://img.xslease.com/mark1.png"
        }, {
            "type": "billboard",
            "image_url": "http://img.xslease.com/mark2.png"
        }, {
            "type": "billboard",
            "image_url": "http://img.xslease.com/mark3.png"
        }, {
            "type": "point",
            "image_url": "http://img.xslease.com/point.jpg"
        }],
        "icon_list": [{
                "class": "icon-way",
                "image_url": "http://img.xslease.com/way.png"
            },
            {
                "class": "icon-ambulance",
                "image_url": "http://img.xslease.com/ambulance.png"
            }, {
                "class": "icon-street-view",
                "image_url": "http://img.xslease.com/street-view.png"
            }, {
                "class": "icon-flask",
                "image_url": "http://img.xslease.com/flask.png"
            }, {
                "class": "icon-phonesquare",
                "image_url": "http://img.xslease.com/phone-square.png"
            }, {
                "class": "icon-search",
                "image_url": "http://img.xslease.com/search.png"
            }, {
                "class": "icon-qizhi",
                "image_url": "http://img.xslease.com/flag.png"
            }, {
                "class": "icon-group",
                "image_url": "http://img.xslease.com/group.png"
            }, {
                "class": "icon-phone",
                "image_url": "http://img.xslease.com/phone.png"
            }, {
                "class": "icon-anchor",
                "image_url": "http://img.xslease.com/anchor.png"
            }, {
                "class": "icon-magnet",
                "image_url": "icon-magnet"
            }, {
                "class": "icon-pluscircle",
                "image_url": "http://img.xslease.com/plus-circle.png"
            }, {
                "class": "icon-cab",
                "image_url": "http://img.xslease.com/cab.png"
            }, {
                "class": "icon-bicycle",
                "image_url": "http://img.xslease.com/bicycle.png"
            }, {
                "class": "icon-hourglass",
                "image_url": "http://img.xslease.com/hourglass.png"
            }, {
                "class": "icon-mapo",
                "image_url": "http://img.xslease.com/map-o.png"
            }, {
                "class": "icon-mappin",
                "image_url": "http://img.xslease.com/map-pin.png"
            }, {
                "class": "icon-plussquareo",
                "image_url": "http://img.xslease.com/plus-square-o.png"
            }, {
                "class": "icon-searchplus",
                "image_url": "http://img.xslease.com/search-plus.png"
            }, {
                "class": "icon-ship",
                "image_url": "http://img.xslease.com/ship.png"
            }, {
                "class": "icon-signin",
                "image_url": "http://img.xslease.com/sign-in.png"
            }, {
                "class": "icon-truck",
                "image_url": "http://img.xslease.com/truck.png"
            }, {
                "class": "icon-signal",
                "image_url": "http://img.xslease.com/signal.png"
            }, {
                "class": "icon-automobile",
                "image_url": "http://img.xslease.com/automobile.png"
            }, {
                "class": "icon-gear",
                "image_url": "http://img.xslease.com/gear.png"
            }, {
                "class": "icon-hourglasshalf",
                "image_url": "http://img.xslease.com/hourglass-half.png"
            }, {
                "class": "icon-tuichu",
                "image_url": "http://img.xslease.com/Sign%20out.png"
            }, {
                "class": "icon-hourglassend",
                "image_url": "http://img.xslease.com/hourglass-end.png"
            }, {
                "class": "icon-hourglassstart",
                "image_url": "http://img.xslease.com/hourglass-start.png"
            }, {
                "class": "icon-share",
                "image_url": "http://img.xslease.com/share.png"
            }, {
                "class": "icon-fax",
                "image_url": "http://img.xslease.com/fax.png"
            }, {
                "class": "icon-film",
                "image_url": "http://img.xslease.com/film.png"
            }, {
                "class": "icon-gavel",
                "image_url": "http://img.xslease.com/gavel.png"
            }, {
                "class": "icon-hashtag",
                "image_url": "http://img.xslease.com/hashtag.png"
            }, {
                "class": "icon-hotel",
                "image_url": "http://img.xslease.com/hotel.png"
            }, {
                "class": "icon-plane",
                "image_url": "http://img.xslease.com/plane.png"
            }, {
                "class": "icon-s15",
                "image_url": "http://img.xslease.com/s15.png"
            }, {
                "class": "icon-share-square",
                "image_url": "http://img.xslease.com/share-square.png"
            }, {
                "class": "icon-bus",
                "image_url": "http://img.xslease.com/bus.png"
            }, {
                "class": "icon-flash",
                "image_url": "http://img.xslease.com/flash.png"
            }, {
                "class": "icon-plug",
                "image_url": "http://img.xslease.com/plug.png"
            }, {
                "class": "icon-female",
                "image_url": "http://img.xslease.com/female.png"
            }, {
                "class": "icon-globe",
                "image_url": "http://img.xslease.com/globe.png"
            }, {
                "class": "icon-hourglass-o",
                "image_url": "http://img.xslease.com/hourglass-o.png"
            }, {
                "class": "icon-male",
                "image_url": "http://img.xslease.com/male.png"
            }, {
                "class": "icon-map",
                "image_url": "http://img.xslease.com/map.png"
            }, {
                "class": "icon-paper-plane",
                "image_url": "http://img.xslease.com/paper-plane.png"
            }, {
                "class": "icon-server",
                "image_url": "http://img.xslease.com/server.png"
            }, {
                "class": "icon-shower",
                "image_url": "http://img.xslease.com/shower.png"
            }, {
                "class": "icon-space-shuttle",
                "image_url": "http://img.xslease.com/space-shuttle.png"
            }, {
                "class": "icon-tree",
                "image_url": "http://img.xslease.com/tree.png"
            }, {
                "class": "icon-poweroff",
                "image_url": "http://img.xslease.com/power%20off.png"
            }, {
                "class": "icon-plus",
                "image_url": "http://img.xslease.com/plus.png"
            }, {
                "class": "icon-podcast",
                "image_url": "http://img.xslease.com/podcast.png"
            }, {
                "class": "icon-Map-Pin",
                "image_url": "http://img.xslease.com/map-pin.png"
            }, {
                "class": "icon-Fire-Extinguisher",
                "image_url": "http://img.xslease.com/Fire-Extinguisher.png"
            }, {
                "class": "icon-car",
                "image_url": "http://img.xslease.com/car.png"
            }, {
                "class": "icon-subway",
                "image_url": "http://img.xslease.com/subway.png"
            }, {
                "class": "icon-train",
                "image_url": "http://img.xslease.com/train.png"
            }, {
                "class": "icon-filter",
                "image_url": "http://img.xslease.com/filter.png"
            }, {
                "class": "icon-asterisk",
                "image_url": "http://img.xslease.com/asterisk.png"
            }, {
                "class": "icon-balance-scale",
                "image_url": "http://img.xslease.com/balance-scale.png"
            }, {
                "class": "icon-gears",
                "image_url": "http://img.xslease.com/gears.png"
            }, {
                "class": "icon-hdd-o",
                "image_url": "http://img.xslease.com/hdd-o.png"
            }, {
                "class": "icon-search-minus",
                "image_url": "icon-search-minus"
            }, {
                "class": "icon-shield",
                "image_url": "http://img.xslease.com/shield.png"
            }, {
                "class": "icon-qizhi1",
                "image_url": "http://img.xslease.com/flag01.png"
            }, {
                "class": "icon-lock1",
                "image_url": "http://img.xslease.com/lock.png"
            }, {
                "class": "icon-Shoppingcart",
                "image_url": "http://img.xslease.com/Shopping%20cart.png"
            }, {
                "class": "icon-history",
                "image_url": "http://img.xslease.com/history.png"
            }, {
                "class": "icon-share-alt-square",
                "image_url": "http://img.xslease.com/share-alt-square.png"
            }, {
                "class": "icon-motocycle",
                "image_url": "http://img.xslease.com/motocycle.png"
            }, {
                "class": "icon-taxi",
                "image_url": "http://img.xslease.com/taxi.png"
            }, {
                "class": "icon-handshake",
                "image_url": "http://img.xslease.com/handshake.png"
            }, {
                "class": "icon-gift",
                "image_url": "http://img.xslease.com/gift.png"
            }, {
                "class": "icon-snow",
                "image_url": "http://img.xslease.com/snow.png"
            }, {
                "class": "icon-feed",
                "image_url": "http://img.xslease.com/feed.png"
            }, {
                "class": "icon-message_5",
                "image_url": "http://img.xslease.com/flag02.png"
            }, {
                "class": "icon-mubiao",
                "image_url": "icon-mubiao"
            }
        ],
        "gltf_list": [{
            "type": "gltf",
            "image_url": "http://img.xslease.com/wajueji.jpg",
            "gltf_url": ""
        }, {
            "type": "gltf",
            "image_url": "http://img.xslease.com/qzcar.jpg",
            "gltf_url": ""
        }, {
            "type": "gltf",
            "image_url": "http://img.xslease.com/qzcar.jpg",
            "gltf_url": ""
        }, {
            "type": "gltf",
            "image_url": "http://img.xslease.com/ship-05.jpg",
            "gltf_url": ""
        }, {
            "type": "gltf",
            "image_url": "http://img.xslease.com/railway-jiazi.jpg",
            "gltf_url": ""
        }, {
            "type": "gltf",
            "image_url": "http://img.xslease.com/tower.jpg",
            "gltf_url": ""
        }, {
            "type": "gltf",
            "image_url": "http://img.xslease.com/xiaofangche.jpg",
            "gltf_url": ""
        }, {
            "type": "gltf",
            "image_url": "http://img.xslease.com/xiaofangche.jpg",
            "gltf_url": ""
        }, {
            "type": "gltf",
            "image_url": "http://img.xslease.com/ship-09.jpg",
            "gltf_url": ""
        }, {
            "type": "gltf",
            "image_url": "http://img.xslease.com/ship-04.jpg",
            "gltf_url": ""
        }, {
            "type": "gltf",
            "image_url": "http://img.xslease.com/zhanji.jpg",
            "gltf_url": ""
        }, {
            "type": "gltf",
            "image_url": "http://img.xslease.com/ship-01.jpg",
            "gltf_url": ""
        }, {
            "type": "gltf",
            "image_url": "http://img.xslease.com/ship-03.jpg",
            "gltf_url": ""
        }, {
            "type": "gltf",
            "image_url": "http://img.xslease.com/ship-08.jpg",
            "gltf_url": ""
        }, {
            "type": "gltf",
            "image_url": "http://img.xslease.com/qiche.jpg",
            "gltf_url": ""
        }, {
            "type": "gltf",
            "image_url": "http://img.xslease.com/xiaofangyuan.jpg",
            "gltf_url": ""
        }, {
            "type": "gltf",
            "image_url": "http://img.xslease.com/gongren.jpg",
            "gltf_url": ""
        }, {
            "type": "gltf",
            "image_url": "http://img.xslease.com/gongren.jpg",
            "gltf_url": ""
        }, {
            "type": "gltf",
            "image_url": "http://img.xslease.com/feiji.jpg",
            "gltf_url": ""
        }, {
            "type": "gltf",
            "image_url": "http://img.xslease.com/jingche.jpg",
            "gltf_url": ""
        }, {
            "type": "gltf",
            "image_url": "http://img.xslease.com/fengche.jpg",
            "gltf_url": ""
        }],
        "two": [{
                "type": "polyline",
                "image_url": "http://img.xslease.com/polyline.jpg",
                "features": "normal",
                "des": "折线段"
            }, {
                "type": "polyline",
                "image_url": "http://img.xslease.com/polyline.jpg",
                "features": "closed",
                "des": "闭合折线段"
            }, {
                "type": "polyline",
                "image_url": "http://img.xslease.com/polyline_clampToGround.jpg",
                "features": "clamp_polyline",
                "des": "贴地折线段"
            },
            {
                "type": "polyline",
                "image_url": "http://img.xslease.com/polyline_flow.jpg",
                "features": "flow",
                "des": "流动折线段"
            },
            {
                "type": "polyline",
                "image_url": "http://img.xslease.com/polyline_flow2.jpg",
                "features": "dynamic",
                "des": "动态折线段"
            },
            {
                "type": "polyline",
                "image_url": "http://img.xslease.com/curve.jpg",
                "features": "curve",
                "des": "曲线段"
            },
            {
                "type": "polyline",
                "image_url": "http://img.xslease.com/curve_clampToGround.jpg",
                "features": "clamp_curve",
                "des": "贴地曲线段"
            },
            {
                "type": "corridor",
                "image_url": "http://img.xslease.com/corridor.jpg",
                "features": "normal",
                "des": "走廊"
            },
            {
                "type": "corridor",
                "image_url": "http://img.xslease.com/corridor_clampToGround.jpg",
                "features": "clamp",
                "des": "贴地走廊"
            },
            {
                "type": "polygon",
                "image_url": "http://img.xslease.com/polygon.jpg",
                "features": "normal",
                "des": "面"
            },
            {
                "type": "polygon",
                "image_url": "http://img.xslease.com/polygon_clampToGround.jpg",
                "features": "clamp",
                "des": "贴地面"
            },
            {
                "type": "rectangle",
                "image_url": "http://img.xslease.com/rectangle.jpg",
                "features": "normal",
                "des": "矩形"
            },
            {
                "type": "rectangle",
                "image_url": "http://img.xslease.com/rectangle_clampToGround.jpg",
                "features": "clamp",
                "des": "贴地矩形"
            },
            {
                "type": "polygon",
                "image_url": "http://img.xslease.com/plane.jpg",
                "features": "plane",
                "des": "平面"
            },
            {
                "type": "polygon",
                "image_url": "http://img.xslease.com/regular3.jpg",
                "features": "triangle",
                "des": "三角形"
            },
            {
                "type": "polygon",
                "image_url": "http://img.xslease.com/regular4.jpg",
                "features": "square",
                "des": "正方形"
            },
            {
                "type": "polygon",
                "image_url": "http://img.xslease.com/regular5.jpg",
                "features": "pentagon",
                "des": "正五边形"
            },
            {
                "type": "circle",
                "image_url": "http://img.xslease.com/circle.jpg",
                "features": "normal",
                "des": "圆"
            },
            {
                "type": "circle",
                "image_url": "http://img.xslease.com/circle_clampToGround.jpg",
                "features": "clamp",
                "des": "贴地圆"
            },
            {
                "type": "circle",
                "image_url": "http://img.xslease.com/circle_animation.jpg",
                "features": "dynamic",
                "des": "动态圆"
            },
            {
                "type": "circle",
                "image_url": "http://img.xslease.com/ellipse.jpg",
                "features": "ellipse",
                "des": "椭圆"
            },
            {
                "type": "circle",
                "image_url": "http://img.xslease.com/ellipse_clampToGround.jpg",
                "features": "clamp_ellipse",
                "des": "贴地椭圆"
            },
            {
                "type": "circle",
                "image_url": "http://img.xslease.com/sector.jpg",
                "features": "sector",
                "des": "扇形"
            },
            {
                "type": "circle",
                "image_url": "http://img.xslease.com/lune.jpg",
                "features": "lune",
                "des": "弓形"
            }
        ],
        "three": [{
            "type": "",
            "image_url": "",
            "features": "",
            "des": ""
        }, {
            "type": "",
            "image_url": "",
            "features": "",
            "des": ""
        }, {
            "type": "",
            "image_url": "",
            "features": "",
            "des": ""
        }, {
            "type": "",
            "image_url": "",
            "features": "",
            "des": ""
        }, {
            "type": "",
            "image_url": "",
            "features": "",
            "des": ""
        }, {
            "type": "",
            "image_url": "",
            "features": "",
            "des": ""
        }, {
            "type": "",
            "image_url": "",
            "features": "",
            "des": ""
        }, {
            "type": "",
            "image_url": "",
            "features": "",
            "des": ""
        }, {
            "type": "",
            "image_url": "",
            "features": "",
            "des": ""
        }, {
            "type": "",
            "image_url": "",
            "features": "",
            "des": ""
        }, {
            "type": "",
            "image_url": "",
            "features": "",
            "des": ""
        }, {
            "type": "",
            "image_url": "",
            "features": "",
            "des": ""
        }, {
            "type": "",
            "image_url": "",
            "features": "",
            "des": ""
        }, {
            "type": "",
            "image_url": "",
            "features": "",
            "des": ""
        }, {
            "type": "",
            "image_url": "",
            "features": "",
            "des": ""
        }, {
            "type": "",
            "image_url": "",
            "features": "",
            "des": ""
        }, {
            "type": "",
            "image_url": "",
            "features": "",
            "des": ""
        }],
        "military": [{
            "type": "military",
            "image_url": "http://img.xslease.com/closeVurve.jpg",
            "des": ""
        }, {
            "type": "military",
            "image_url": "http://img.xslease.com/fineArrowYW.jpg",
            "des": ""
        }, {
            "type": "military",
            "image_url": "http://img.xslease.com/fineArrow.jpg",
            "des": ""
        }, {
            "type": "military",
            "image_url": "http://img.xslease.com/attackArrowPW.jpg",
            "des": ""
        }, {
            "type": "military",
            "image_url": "http://img.xslease.com/doubleArrow.jpg",
            "des": ""
        }, {
            "type": "military",
            "image_url": "http://img.xslease.com/attackArrow.jpg",
            "des": ""
        }, {
            "type": "military",
            "image_url": "http://img.xslease.com/straightArrow.jpg",
            "des": ""
        }, {
            "type": "military",
            "image_url": "http://img.xslease.com/gatheringPlace.jpg",
            "des": ""
        }, {
            "type": "military",
            "image_url": "http://img.xslease.com/attackArrowYW.jpg",
            "des": ""
        }]
    }
    sessionStorage.setItem('plotting', JSON.stringify(saveData));
}
/**
 * 清空标绘页的展示卡
 */
function clearPlottingMainList() {
    //清空展示列表中的所有子元素
    $('#select-draw-list').empty();
}