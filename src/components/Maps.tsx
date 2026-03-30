'use client';

import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useState } from 'react';
import { locations } from '@/data/locations';

function Maps() {
  const [currentLocation, setCurrentLocation] =
    useState('archangelsk');
  const currentLocationCoordinate = locations[currentLocation];
  return (
    <>
      <YMaps
        query={{
          lang: 'ru_RU',
          apikey: '1ac61b8a-843f-454f-abd8-a651a3c60f00',
          load: 'package.full',
        }}
      >
        <section>
          <div className="flex flex-col justify-center xl:max-w-302">
            <h2 className="mb-4 text-left text-2xl font-bold text-[#414141] md:mb-8 xl:mb-10 xl:text-4xl">
              Наши магазины
            </h2>
            <div className="mb-5 flex flex-wrap gap-x-2 gap-y-3">
              {Object.keys(locations).map((key) => {
                const isActive = currentLocation === key;
                return (
                  <button
                    key={key}
                    onClick={() => setCurrentLocation(key)}
                    className={`cursor-pointer items-center justify-center rounded border-none p-2 text-xs transition-colors duration-300 active:shadow-(--shadow-button-active) ${isActive ? 'bg-(--color-primary) text-white hover:shadow-(--shadow-button-default)' : 'bg-[#f3f2f1] hover:shadow-(--shadow-button-secondary)'}`}
                  >
                    {locations[key].name}
                  </button>
                );
              })}
            </div>
            <Map
              state={{
                center: currentLocationCoordinate.center,
                zoom: 12,
              }}
              options={{
                suppressMapOpenBlock: true,
                suppressObsoleteBrowserNotifier: true,
                yandexMapDisablePoiInteractivity: true,
              }}
              className="h-88.5 w-full"
            >
              {locations[currentLocation].shops.map((shop) => (
                <Placemark
                  key={shop.id}
                  geometry={shop.coordinates}
                  properties={{
                    hintContent: shop.name,
                  }}
                  options={{
                    iconLayout: 'default#image',
                    iconImageHref: '/icons-map/icon-location.svg',
                    iconImageSize: [32, 32],
                    iconOffset: [-16, -16],
                  }}
                />
              ))}
            </Map>
          </div>
        </section>
      </YMaps>
    </>
  );
}

export default Maps;
