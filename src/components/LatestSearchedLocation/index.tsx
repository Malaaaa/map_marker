import { Row, Space } from 'antd'
import React, { useDebugValue, useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks';
import moment from 'moment-timezone';

function LatestSearchedLocation() {
    const [time, setTime] = useState("")
    const locations = useAppSelector((state) => { return state.locations.locations })
    useEffect(() => {
        // Set a timer after each value change
        if (locations.length > 0) {
            const timeout = setInterval(() => setTime(moment().utcOffset(-locations[locations.length - 1].timezone / 60).format('h:mm:ss a zz')), 1000);
            return () => clearTimeout(timeout);
        }
        // Execute each time after the last useEffect has been processed
    }, [time, locations])
    return (
        <Row>{locations.length !== 0 &&
            <Space>
                <p>{time}</p>
            </Space>}
        </Row>
    )
}

export default LatestSearchedLocation