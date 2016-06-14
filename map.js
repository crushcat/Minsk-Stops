
ymaps.ready()
    .done(function(ym) {
    var myMap = new ymaps.Map('map', {
         center:[53.9021412,27.5606492], //Minsk
        zoom: 12
    }, {
        searchControlProvider: 'yandex#search'
    });

    jQuery.getJSON('http://localhost:8888/stops.json', function (json) {
        /** Сохраним ссылку на геообъекты на случай, если понадобится какая-либо постобработка.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoQueryResult.xml
         */
        var geoObjects = ym.geoQuery(json)
            .addToMap(myMap)
            .applyBoundsToMap(myMap, {
                checkZoomRange: true
            });
    });

        ymaps.route([
            { type: 'wayPoint', point: [53.932963, 27.698408] },
            { type: 'wayPoint', point: [53.9287676, 27.6998493] },
            { type: 'wayPoint', point: [53.9255491, 27.6943836] },
            { type: 'wayPoint', point: [53.9337122, 27.6902396] },
            { type: 'wayPoint', point: [53.936719, 27.687718] },
            { type: 'wayPoint', point: [53.9392151, 27.6873554] },
            { type: 'wayPoint', point: [53.9424886, 27.6852923] }/*,
            { type: 'wayPoint', point: [] },
            { type: 'wayPoint', point: [] },
            { type: 'wayPoint', point: [] },
            { type: 'wayPoint', point: [] },
            { type: 'wayPoint', point: [] },
            { type: 'wayPoint', point: [] },
            { type: 'wayPoint', point: [] },
            { type: 'wayPoint', point: [] },
            { type: 'wayPoint', point: [] },
            { type: 'wayPoint', point: [] },*/
        ], {
            mapStateAutoApply: true
        }).then(function (route) {
            route.getPaths().options.set({
                // в балуне выводим только информацию о времени движения с учетом пробок
                balloonContentLayout: ymaps.templateLayoutFactory.createClass('{{ properties.humanJamsTime }}'),
                // можно выставить настройки графики маршруту
                strokeColor: '0000ffff',
                opacity: 0.9
            });
            // добавляем маршрут на карту
            myMap.geoObjects.add(route);
        });
});

