import React, { useState } from 'react'
import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useAppSelector } from '../../store/hooks';
import { Location } from '../../types';
import moment from 'moment-timezone';
import { delLocation } from '../../store/slice/locations.slice';
import { useAppDispatch } from '../../store/hooks';

const columns: ColumnsType<Location> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Time Zone',
        dataIndex: 'timezone',
        key: 'timezone',
    },
    {
        title: 'lat',
        dataIndex: 'lat',
        key: 'lat',
    },
    {
        title: 'lng',
        dataIndex: 'lng',
        key: 'lng',
    },
    {
        title: 'Local Time',
        key: 'localtime',
        render: (_, record) => {
            const date = moment()
            return (
                <Space size="middle">
                    {date.tz(record.timezone).format('h:ma z')}
                </Space>
            )
        },
    },
];

function LocationTable() {
    const dispatch = useAppDispatch();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const locations = useAppSelector((state) => { return state.locations.locations })
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const onDelete = () => {
        if (selectedRowKeys.length > 0) {
            dispatch(delLocation(selectedRowKeys as string[]))
        }
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };


    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button danger onClick={onDelete}> Delete  </Button>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={[...locations.values()]} />
        </div>
    );
}

export default LocationTable