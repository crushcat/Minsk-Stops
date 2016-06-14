
ymaps.ready()
    .done(function(ym) {
    var myMap = new ymaps.Map('map', {
         center:[53.9021412,27.5606492], //Minsk
        zoom: 12
    }, {
        searchControlProvider: 'yandex#search'
    });

    jQuery.getJSON('https://drive.google.com/file/d/0B_6SZ_uMRnw3cVVLcnZJLXlnVFE/view?usp=sharing', function (json) {
        /** Сохраним ссылку на геообъекты на случай, если понадобится какая-либо постобработка.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoQueryResult.xml
         */
        var geoObjects = ym.geoQuery(json)
            .addToMap(myMap)
            .applyBoundsToMap(myMap, {
                checkZoomRange: true
            });
    });
});
