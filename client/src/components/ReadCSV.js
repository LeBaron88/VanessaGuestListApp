import React, {Component} from 'react';
import * as d3 from 'd3';
import data from '../data/guest_list_csv.csv';

class ReadCSV extends Component {

    componentDidMount() {

        d3.csv(data).then(function(data) {
            console.log(data[0])
        }).catch(function(err) {
            console.log(err);
        })
    }

    render() {
        return ( 
                <div className = "App" >
                <div> Data Visualization </div> 
                </div>
            );
        }
}

export default ReadCSV;