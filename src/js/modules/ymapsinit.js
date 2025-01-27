export const yMapsInit = () => {
    async function mapinit(scripturl, collback) {
        const script = document.createElement("script");
        script.src = scripturl;
        script.async = true;
        document.head.appendChild(script);
        //

        script.onload = () => {
            collback();
        };
        script.onerror = () => {
            console.error("Ошибка загрузки API.");
        };
    }
    mapinit("https://api-maps.yandex.ru/v3/?apikey=d800673c-277d-43d7-a0c5-74797e3df2a7&lang=ru_RU", initMap);
    async function initMap() {
        // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
        await ymaps3.ready;

        const { YMap, YMapDefaultSchemeLayer, YMapMarker, YMapDefaultFeaturesLayer, YMapControls } = ymaps3;
        const { YMapZoomControl, YMapGeolocationControl } = await import("@yandex/ymaps3-default-ui-theme");
        // Иницилиазируем карту
        const map = new YMap(
            // Передаём ссылку на HTMLElement контейнера
            document.getElementById("map"),

            // Передаём параметры инициализации карты
            {
                location: {
                    // Координаты центра карты
                    center: [43.46277718229649,56.24091325213029],

                    // Уровень масштабирования
                    zoom: 15,
                },
            }
        );

        // Добавьте слой с дорогами и зданиями
        map.addChild(new YMapDefaultSchemeLayer());

        // Добавьте слой для маркеров
        map.addChild(new YMapDefaultFeaturesLayer());

        const markersData = [{ coordinates: [43.46277718229649,56.24091325213029] }];
        markersData.forEach(({ coordinates }) => {
            const markerElement = document.createElement("div");
            markerElement.className = "target";
            markerElement.innerHTML = `<svg width="682.667" height="682.667" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="xMinYMin">
	                                       <use xlink:href="#img-laptop--1-"></use>
                                       </svg>`;
            const marker = new YMapMarker({ coordinates, draggable: false }, markerElement);
            map.addChild(marker);
        });
        const controls = new YMapControls({ position: "top right" });
        controls.addChild(new YMapGeolocationControl());
        controls.addChild(
            new YMapZoomControl({
                easing: "linear",
            })
        );
        map.addChild(controls);
    }
};
