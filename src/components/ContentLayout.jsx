import React, {Component} from 'react';
import { connect } from 'react-redux'

import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import axios from "axios";
import Charts from "./Charts";
import {setDriveID} from "../redux/actions";
const { Header, Content, Footer, Sider } = Layout;
let diskInfo = {}
class ContentLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logicalDiskState: [],
            driveID:'',
            CurrentAccount:'',
        }
    }

    componentDidMount() {
        // Pusher.logToConsole = true;
        axios.get('http://localhost:8000/diskinfo')
            .then((response) => {
                let logicalDisk = new Array();
                let result = response.data
                let DeviceID = result.filter(el => el.includes("DeviceID"));
                let FreeSpace = result.filter(el => el.includes("FreeSpace"));
                let Size = result.filter(el => el.includes("Size"));
                logicalDisk.push(
                    DeviceID,
                    FreeSpace,
                    Size
                )
                this.setState({
                    logicalDiskState: logicalDisk
                })
            })
        axios.get('http://localhost:8000/account')
            .then((response) => {
                let GetAccountName = response.data
                 this.setState({
                    CurrentAccount : GetAccountName.name
                })

            })


    }
    handleShowMoreInformation = (data) => {
        this.props.dispatch(setDriveID(data))
    }
    render() {

        let LogicalDiskItems = []
        if (this.state.logicalDiskState.length > 0){
            this.state.logicalDiskState[0].map((Disk, indexDisk) => {
                this.state.logicalDiskState[1].map((Freesize,indexFree) => {
                    switch (indexDisk) {
                        case indexFree:
                           const data = {
                                DiskName: Disk,
                                Freesize: Freesize,
                            }
                            LogicalDiskItems.push(<Menu.Item onClick={() => this.handleShowMoreInformation(data)} key={indexFree}>{Disk}</Menu.Item>)

                            break;
                    }
                })


            })

        }
        return (
            <React.Fragment>
                <Layout>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={broken => {
                            console.log(broken);
                        }}
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                        }}
                    >
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                            <Menu.Item>
                                <UserOutlined /> {this.state.CurrentAccount[0]}
                            </Menu.Item>
                            {
                                this.state.logicalDiskState.length > 0 ?
                                    LogicalDiskItems
                                    :
                                    null
                            }
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                        <Content style={{ margin: '24px 16px 0' }}>
                            <div className="site-layout-background" style={{height: '100%' }}>
                                 <Charts />
                            </div>
                        </Content>
                    </Layout>
                </Layout>,
            </React.Fragment>
        );
    }
}


export default connect()(ContentLayout);
