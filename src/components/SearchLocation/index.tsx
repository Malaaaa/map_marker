import { Button, Layout } from 'antd'
import styles from './index.module.less';
import { addLocation } from '../../store/slice/locations.slice';
import { useAppDispatch } from '../../store/hooks';
import React, { useCallback, useRef, useState } from 'react'
import { StandaloneSearchBox } from "@react-google-maps/api"
import { Input, Row } from 'antd'
import { Location } from '../../types';
import { v4 as uuidv4 } from 'uuid';

function LocationSearchPanel({ isLoaded }: { isLoaded: boolean }) {
    const [searchvalue, setSearchvalue] = useState("")
    const [getCurrent, setGetCurrent] = useState(true)
    const dispatch = useAppDispatch();
    const getCurrentLocation = () => {
        if (getCurrent) {
            setGetCurrent(false)
            navigator.geolocation.getCurrentPosition(function (position) {
                const location: Location = {
                    key: uuidv4(),
                    name: "Current Place",
                    lat: position.coords.latitude.toString(),
                    lng: position.coords.longitude.toString(),
                    toggle: false,
                    timezone: new Date().getTimezoneOffset(),
                }
                dispatch(addLocation(location))
                setGetCurrent(true)
            });
        }
    };
    const standaloneSearchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

    const standaloneSearchOnload = useCallback((searchBox: google.maps.places.SearchBox) => {
        standaloneSearchBoxRef.current = searchBox;
    }, []);
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchvalue(e.target.value)
    };
    const onSearch = () => {
        //Place the event in the macro task to ensure that the location has been checked
        setTimeout(() => { console.log("") })
        if (standaloneSearchBoxRef.current !== null) {
            const postions = standaloneSearchBoxRef.current.getPlaces()
            // dispatch(fetchLocation({ method: { lat: position, lng: position } }))
            if (postions?.[0].geometry?.location && postions?.[0].formatted_address && postions[0].utc_offset_minutes) {
                const location: Location = {
                    key: uuidv4(),
                    name: postions[0].formatted_address.toString(),
                    lat: postions[0].geometry.location.lat().toString(),
                    lng: postions[0].geometry.location.lng().toString(),
                    toggle: false,
                    timezone: postions[0].utc_offset_minutes,
                }

                dispatch(addLocation(location))
                setSearchvalue("")
            } else {
                console.log('not input anything yet!')
            }
        } else {
            console.log('not input anything yet!')
        }

    }
    return (
        <>
            <Layout.Header className={styles.header}>
                <Button className={styles.button} onClick={getCurrentLocation}>Get Current Location</Button>
            </Layout.Header>
            {isLoaded &&
                <Row className='searchBar'>
                    <StandaloneSearchBox
                        onLoad={standaloneSearchOnload}
                    >
                        <Input.Search
                            maxLength={50}
                            placeholder="Location name"
                            allowClear
                            enterButton="Search"
                            size="large"
                            onChange={onChange}
                            onSearch={onSearch}
                            value={searchvalue}
                        />
                    </StandaloneSearchBox>
                </Row>}
        </>
    )
}

export default LocationSearchPanel