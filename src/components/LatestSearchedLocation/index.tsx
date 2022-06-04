import { Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks';
import moment from 'moment-timezone';

function LatestSearchedLocation() {
    const [time, setTime] = useState("")
    const locations = useAppSelector((state) => { return state.locations.locations })
    useEffect(() => {
        // Set a timer after each value change
        if (locations.length > 0) {
            const timeout = setInterval(() => setTime(moment.utc().utcOffset(-(locations[locations.length - 1].timezone)).format('YYYY-MM-DD HH:mm:ss a')), 1000);
            return () => clearTimeout(timeout);
        }
        // Execute each time after the last useEffect has been processed
    }, [time, locations])
    return (
        <Row>{locations.length !== 0 &&
            <Space>
                <p>{"GMT/UTC " + (-locations[locations.length - 1].timezone / 60) + "  localtime: " + time}</p>
            </Space>}
        </Row>
    )
}

export default LatestSearchedLocation