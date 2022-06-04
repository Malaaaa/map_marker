import { Row, Space } from 'antd'
import React, { useState } from 'react'
import { useAppSelector } from '../../store/hooks';
import moment from 'moment-timezone';


function LatestSearchedLocation() {
    const [time, setTime] = useState("")
    const locations = useAppSelector((state) => { return state.locations.locations })
    if (locations.length !== 0) {
        setInterval(() => {
            setTime(moment().tz(locations[locations.length - 1].timezone).format('h:mm:ssa z'));
        }, 1000)
    }
    return (
        <Row>{locations.length !== 0 &&
            <Space><p>{locations[locations.length - 1].name}</p>
                <p>{time}</p>
            </Space>}
        </Row>
    )
}

export default LatestSearchedLocation