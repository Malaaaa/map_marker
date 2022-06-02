import React, { useState } from 'react'
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
interface DataType {
    key: React.Key;
    name: string;
    address: string;
    timeZone: string;
    localTime: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Time Zone',
        dataIndex: 'timeZone',
    },
    {
        title: 'Local Time',
        dataIndex: 'localTime',
    },
];
const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        address: `London, Park Lane no. ${i}`,
        timeZone: '32',
        localTime: '32',
    });
}
function LocationTable() {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
    );
}

export default LocationTable