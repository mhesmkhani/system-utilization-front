import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContentLayout from "./components/ContentLayout";
import  axios from "axios";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logicalDiskState: []
        }
    }


    componentDidMount() {

    }

    render() {
       // if (this.state.data.length !== 0){
       //
       //     console.log(cpu)
       //
       // }
         console.log(this.state.logicalDiskState)
        return (
          <React.Fragment>
             <ContentLayout/>
          </React.Fragment>

        );

    }

}


export default App;
