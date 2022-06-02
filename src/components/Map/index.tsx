import React, { useCallback, useRef } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"
import { Card, Row } from 'antd'
import { useGoogleMap } from "@react-google-maps/api";

type MapType = ReturnType<typeof useGoogleMap>;
export interface Props {
    markers: google.maps.LatLngLiteral[] | null;
    showPolys?: boolean;
    markerInfo?: React.FC;
}

function Map() {
    const coordinates = { lat: 43.651893615722656, lng: -79.3817138671875 }
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    })
    const mapRef = useRef<MapType>(null);
    const onLoad = useCallback((map: MapType) => {
        mapRef.current = map;
    }, []);
    return (
        <Row>
            <Card>
                {isLoaded && (<GoogleMap mapContainerStyle={{
                    width: '100%',
                    height: '100%'
                }}
                    center={coordinates}
                    options={{ zoomControl: false, streetViewControl: false, mapTypeControl: false }}
                    streetView={undefined}
                    zoom={12}
                    onLoad={onLoad}
                >
                    <Marker key={1}
                        position={coordinates}
                    />
                </GoogleMap>)}
            </Card>

        </Row>
    )
}
export default Map