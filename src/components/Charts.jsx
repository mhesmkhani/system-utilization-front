import React, {Component} from 'react';
import { connect } from 'react-redux'

import {Line} from "react-chartjs-2";
import 'chartjs-adapter-luxon';
import 'chartjs-plugin-streaming';
import Pusher from "pusher-js";
import Drivers from "./Drivers";
import {Col, Row} from "antd";
import axios from "axios";
let cpu = 0;
let ram = 0;
class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        // Pusher.logToConsole = true;
        axios.get('http://localhost:8000/cpuinfo')
            .then((response => {
                let cpuInfo = response.data
                localStorage.setItem('cpu',cpuInfo.name)
            }))
        axios.get('http://localhost:8000/memoryinfo')
            .then((response => {
                let memoeyInfo = response.data
                localStorage.setItem('memoryName',memoeyInfo.name)
                localStorage.setItem('memorySpace',memoeyInfo.space)
            }))
        var pusher = new Pusher('baf5b8d4cf953b96f1e2', {
            cluster: 'us2'
        });

        var channel = pusher.subscribe('my-channel');
        channel.bind('scheduler-event', data => {
            this.updateData(data)
        });

    }
    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.data.text){
            cpu = nextState.data.text.cpu
            ram = nextState.data.text.ram
        }
        return false;
    }
    updateData(data){
        // console.log(data)
        this.setState({
            data:data
        })

    }

    render() {

        return (
            <React.Fragment>
                    <Row>
                        <Col span={12}>
                            <h6>Cpu: {localStorage.getItem('cpu')}</h6>
                            <Line
                                height={100}
                                style={{backgroundColor: "#1e2229"}}
                                data={{
                                    datasets: [
                                        {
                                            label: 'CPU USAGE',
                                            borderColor: '#0f98c4',
                                            backgroundColor: 'rgba(36, 42, 71, 0.67)',
                                            fill: true,
                                            cubicInterpolationMode: 'default',
                                            tension: 0.1,
                                        },

                                    ]
                                }}
                                options={{
                                    scales: {
                                        x: {
                                            type: 'realtime',
                                            realtime: {
                                                onRefresh: function (chart) {
                                                    chart.data.datasets.forEach(function (dataset) {
                                                        dataset.data.push({
                                                            x: Date.now(),
                                                            y: cpu
                                                        });
                                                    });
                                                },
                                                delay: 2000,
                                                duration: 60000,
                                            }
                                        },
                                        y: {
                                            beginAtZero: true,
                                            max:100,
                                            title: {
                                                display: true,
                                                text: 'utilization',
                                            }
                                        }

                                    }

                                }}
                            />
                        </Col>
                        <Col span={12}>
                            <h6>Memory: {localStorage.getItem('memoryName') + " " + localStorage.getItem('memorySpace') +" GB"}</h6>
                            <Line
                                height={100}
                                style={{backgroundColor: "#1e2229"}}
                                data={{
                                    datasets: [
                                        {
                                            label: 'MEMORY USAGE',
                                            borderColor: '#3fc40f',
                                            backgroundColor: 'rgb(56,98,60)',
                                            fill: true,
                                            cubicInterpolationMode: 'default',
                                            tension: 0.1,
                                        },

                                    ]
                                }}
                                options={{
                                    scales: {
                                        x: {
                                            type: 'realtime',
                                            realtime: {
                                                onRefresh: function (chart) {
                                                    chart.data.datasets.forEach(function (dataset) {
                                                        dataset.data.push({
                                                            x: Date.now(),
                                                            y: ram
                                                        });
                                                    });
                                                },
                                                delay: 2000,
                                                duration: 60000,
                                            }
                                        },
                                        y: {
                                            beginAtZero: true,
                                            max:100,
                                            title: {
                                                display: true,
                                                text: 'utilization',
                                            }
                                        }

                                    }

                                }}
                            />
                        </Col>
                        <br/>
                        <br/>
                         <hr/>
                         <div className={"w-100"} style={{backgroundColor:"rgb(30, 34, 41)",height: 100}}> </div>
                        <br/>
                        <hr/>
                        <Drivers/>

                    </Row>



            </React.Fragment>
        );
    }
}

export default Charts;
