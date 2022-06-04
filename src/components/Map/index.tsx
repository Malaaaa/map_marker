import React, { useCallback, useRef } from 'react'
import { GoogleMap, Marker } from "@react-google-maps/api"
import { Card, Row } from 'antd'
import { useGoogleMap } from "@react-google-maps/api";
import { useAppSelector } from '../../store/hooks';

type MapType = ReturnType<typeof useGoogleMap>;

function Map({ isLoaded }: { isLoaded: boolean }) {
    const locations = useAppSelector((state) => { return state.locations.locations })
    const mapRef = useRef<MapType>(null);
    const mapOnLoad = useCallback((map: MapType) => {
        mapRef.current = map;
    }, []);

    return (
        <Row>
            {isLoaded && (
                <>
                    <Card>
                        <GoogleMap mapContainerStyle={{
                            width: '100%',
                            height: '100%'
                        }}
                            center={locations.length !== 0 ?
                                { lat: parseFloat(locations?.[locations.length - 1].lat), lng: parseFloat(locations?.[0].lng) } :
                                { lat: 43.651893615722656, lng: -79.3817138671875 }}
                            options={{ zoomControl: false, streetViewControl: false, mapTypeControl: false }}
                            streetView={undefined}
                            zoom={12}
                            onLoad={mapOnLoad}
                        >
                            {locations.length !== 0 && locations.map((location) => {
                                return <Marker key={location.key}
                                    position={{ lat: parseFloat(location.lat), lng: parseFloat(location.lng) }}
                                />
                            })
                            }
                            <></>
                        </GoogleMap>
                    </Card>
                </>)}

        </Row>
    )
}
export default Map