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

        const { YMap, YMapDefaultSchemeLayer, YMapMarker, YMapDefaultFeaturesLayer, YMapControls,YMapZoomControl } = ymaps3;
        //const { YMapDefaultMarker } = await import("@yandex/ymaps3-default-ui-theme");
        // Иницилиазируем карту
        const map = new YMap(
            // Передаём ссылку на HTMLElement контейнера
            document.getElementById("map"),

            // Передаём параметры инициализации карты
            {
                location: {
                    // Координаты центра карты
                    center: [43.462389, 56.240643],

                    // Уровень масштабирования
                    zoom: 15,
                },
            }
        );

        // Добавьте слой с дорогами и зданиями
        map.addChild(new YMapDefaultSchemeLayer());

        // Добавьте слой для маркеров
        map.addChild(new YMapDefaultFeaturesLayer());

        /*  const markersData = [
            { coordinates: [37.588144, 55.733842] },
            { coordinates: [44.579885253511264, 48.50070028427699] },
            { coordinates: [38.982983348682154, 45.04095308652142] },
            { coordinates: [45.96716545127952, 51.58999822864551] },
            { coordinates: [39.203627820917944, 51.674969632719595] },
            { coordinates: [44.563925, 40.208926] },
            { coordinates: [82.9742528817798, 55.02716234040702] },
        ];
        markersData.forEach(({ coordinates }) => {
            const markerElement = document.createElement("div");
            markerElement.className = "target";
            const marker = new YMapMarker({ coordinates, draggable: true }, markerElement);
            map.addChild(marker);
        }); */
        /* const controls =   new YMapControls();
        controls.addChild(
            new YMapZoomControl({
                easing: "linear",
            })
        );

        map.addChild(controls); */
    }
};
