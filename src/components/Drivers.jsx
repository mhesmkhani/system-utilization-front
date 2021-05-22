import React, {Component} from 'react';
import { connect } from 'react-redux'

import { Table } from "antd";
const { Column } = Table;
var data = [
    {
        key: '1',
        DriveName:"",
        Space: 0,
        Freesize: 0,
    },

];

class Drivers extends Component {
     formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    render() {
        if(this.props.disk.length > 0){
            console.log()

            data = [
                {
                    key: '1',
                    DriveName: this.props.disk[0].driveInfo.DiskName,
                    Space: this.props.disk[0].driveInfo.Space,
                    Freesize: this.formatBytes(this.props.disk[0].driveInfo.Freesize.replace("FreeSpace    :", '')),

                },

            ];
        }

        return (
            <React.Fragment>
                <div className={"w-100"}>
                    Drive Info
                    <Table dataSource={data}>
                        <Column title="Drive Name" dataIndex="DriveName" key="DriveName" />
                        <Column title="Freesize" dataIndex="Freesize" key="Freesize" />
                        <Column title="Space" dataIndex="Space" key="Space" />

                    </Table>,
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        disk: state.set_Drive_ID,
    }
}
export default connect(mapStateToProps)(Drivers);
