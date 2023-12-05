import React, { useRef, useEffect, useState, createElement, useCallback } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import StatsBar from './components/StatsBar';
import EnergyGraph from './components/EnergyGraph';
import { EnergyData } from './EnergyData'; 


mapboxgl.accessToken = 'pk.eyJ1IjoiZHlsYW4tcmIiLCJhIjoiY2xuNWRidnUxMDZjZTJscGg3bjl0YjkydCJ9.cuBg17Dnnyd1uC0ak9TIcQ';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  const onSelectCity = useCallback(({longitude, latitude}) => {
    map.current?.flyTo({center: [longitude, latitude], duration: 3000});
  }, []);

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-77.032, 38.913]
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.414, 37.776]
        },
        properties: {
          title: 'Mapbox',
          description: 'San Francisco, California'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-71.097560, 42.362545]
        },
        properties: {
          title: 'SEVT HQ',
          description: 'hell yeah'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-94.41210259647566, 39.09358078384889]
        },
        properties: {
          title: '1: Independece, MO',
          description: 'nasty place'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-95.67524568097107, 39.04719713117554]
        },
        properties: {
          title: '2: Topeka, KS',
          description: 'nasty place'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-98.34472828966797, 40.92543115724182]
        },
        properties: {
          title: '3: Grand Island, NE',
          description: 'nasty place'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-103.65786893756275, 41.82648536786615]
        },
        properties: {
          title: '4: Gering, NE',
          description: 'nasty place'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-106.2972955901228, 42.84809308870818]
        },
        properties: {
          title: '5: Casper, WY',
          description: 'nasty place'
        }
      },
    ]
  };

  const start = [-71.097560, 42.362545];

///////////////////////////////////////////////////////////

    // create a function to make a directions request
  async function getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
    );
    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;
    const routejson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route
      }
    };
    // if the route already exists on the map, we'll reset it using setData
    if (map.current.getSource('route')) {
      map.current.getSource('route').setData(routejson);
    }
    // otherwise, we'll make a new request
    else {
      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
    }
    // add turn instructions here at the end
  }

  

  //////////////////////////////////////////////////////

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/dylan-rb/cln5di4v7070901qie0cfhylt",
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on('load', () => {
      // make an initial directions request that
      // starts and ends at the same location
      getRoute(start);
  
      // Add starting point to the map
      map.current.addLayer({
        id: 'point',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: start
                }
              }
            ]
          }
        },
        paint: {
          'circle-radius': 10,
          'circle-color': '#3887be'
        }
      });

      map.current.addLayer({
        id: 'five',
        type: 'line',
        source: {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              'coordinates': [
                [
                  -106.2972955901228, 42.84809308870818
                ],
                [
                  -103.65786893756275, 41.82648536786615
                ],
              ],
            },
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#fcba03',
          'line-width': 8
        }
      })
      
      map.current.addLayer({
        id: 'four',
        type: 'line',
        source: {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              'coordinates': [
                [
                  -98.34472828966797, 40.92543115724182
                ],
                [
                  -103.65786893756275, 41.82648536786615
                ],
              ],
            },
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#8300cf',
          'line-width': 8
        }
      })
      
      map.current.addLayer({
        id: 'three',
        type: 'line',
        source: {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              'coordinates': [
                [
                  -98.34472828966797, 40.92543115724182
                ],
                [
                  -95.67524568097107, 39.04719713117554
                ],
              ],
            },
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#00cf83',
          'line-width': 8
        }
      })
      
      map.current.addLayer({
        id: 'two',
        type: 'line',
        source: {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              'coordinates': [
                [
                  -95.67524568097107, 39.04719713117554
                ],
                [
                  -94.41210259647566, 39.09358078384889
                ],
              ],
            },
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#d90065',
          'line-width': 8
        }
      })



    });

    

    map.current.on('click', (event) => {
      const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
      const end = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: coords
            }
          }
        ]
      };
      if (map.current.getLayer('end')) {
        map.current.getSource('end').setData(end);
      } else {
        map.current.addLayer({
          id: 'end',
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: coords
                  }
                }
              ]
            }
          },
          paint: {
            'circle-radius': 10,
            'circle-color': '#f30'
          }
        });
      }
      getRoute(coords);
    });

    for (const feature of geojson.features) {
      // create a HTML element for each feature
      const el = createElement('div', { className: 'marker' }, "ELEMENT");
      
    
      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(
        `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
        )
        ).addTo(map.current);
    }

  });


  

  return (
    <div className='font-Avenir overflow-x-hidden'>
      <div className='blurry-red-gradient z-0'></div>
      <div className='blurry-map-gradient'></div>
      <div className='blurry-route-gradient z-40'></div>
      <div className='g1 z-0'></div>
      <div className='background-gradient'></div>
      <h1 className='strategy-header [text-shadow:_0_0_6px_rgb(255_255_255_/_60%)]'>
          Strategy
      </h1>
      <div className='text-white p-4 top-bar relative'>
          <h1 className='map-header z-50'>
              Map
          </h1>
          <h1 className='route-select-header'>
              Route
          </h1>
      </div>
      <div className='main-container'>

        <div className='row-1'>
            <div className='overflow-hidden map-window z-10'>
              <div ref={mapContainer} className="map-container">
                <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
              </div>
            </div>

            <div className='pr-5 pl-4 z-20'>
              <StatsBar onSelectCity={onSelectCity}/>
            </div>
        </div>

        <div className='row-2'>
            <div className='energy-graph frosted-glass mt-5 bg-[#151515] text-white p-5 z-20 h-full relative'>
              <div className='g3'></div>
              <div className='g2'></div>
              <h1 className='energy-header [text-shadow:_0_0_8px_rgb(255_255_255_/_60%)]'>
                Energy
              </h1>
              <div className='w-2/3 h-2/3'>
                <p>nothing</p>
              </div>
            </div>

            <div className='misc-box frosted-glass rounded-xl bg-[#151515] text-white p-5 m-5 relative'>
              <h1 className='misc-header [text-shadow:_0_0_8px_rgb(255_255_255_/_60%)]'>
                Header
              </h1>
              {/* <button className='
              bg-zinc-800 
              rounded-lg 
              p-4' 
              type="button" 
              onClick={addDataPoint}>
                Add Data Point
              </button> */}
            </div>
        </div>


      </div>


      
      
      
    </div>
  );
}

export default App;
