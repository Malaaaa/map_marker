import React from 'react'
import { Button, Input, Layout } from 'antd'
import styles from './index.module.less';
import { fetchLocation } from '../../store/slice/locations.slice';
import { useAppDispatch } from '../../store/hooks';

type Props = {}

function LocationSearchPanel(props: Props) {
    const dispatch = useAppDispatch();
    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            dispatch(fetchLocation({ method: { lat: position.coords.latitude, lng: position.coords.longitude } }))
        });
    };
    const onSearch = (value: string) => console.log(value);

    return (
        <>
            <Layout.Header className={styles.header}>
                <Button className={styles.button} onClick={getCurrentLocation}>Get Current Location</Button>
            </Layout.Header>
            <div className='searchBar'>
                <Input.Search
                    maxLength={50}
                    placeholder="Location name"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />
            </div>

        </>

    )
}

export default LocationSearchPanel