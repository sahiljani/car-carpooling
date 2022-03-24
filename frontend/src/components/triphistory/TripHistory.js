import React from 'react';
import * as GrIcons from 'react-icons/gr'
import sourceImg from '../../start-location.svg';
import destinationImg from '../../pin-location.svg';
import './TripHistory.css';
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import configData from "../../config.json";
export default function TripHistory() {

    // ngOninit(){
    //     this.tripDetails = getTripHistory()
    // }
    
    // let tripDetails: any
    const tripDetails = [
        {
            source: "Home",
            destination: "University of Waterloo",
            tripDate: "01-03-2022",
            riderCount: 2,
            
        },
        {
            source: "University of Waterloo",
            destination: "Phillip Street",
            tripDate: "01-03-2022",
            riderCount: 3,
        },
        {
            source: "Phillip Street",
            destination: "University of Waterloo",
            tripDate: "01-03-2022",
            riderCount: 1,
            
        },
        {
            source: "lester ",
            destination: "University of Waterloo",
            tripDate: "01-03-2022",
            riderCount: 1,
            time:"2 pm"
            
        }
    ]
    
   
    // function getTripHistory() {
    //     return fetch(configData.END_POINT + '/trip/history', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     }).then(data => data.json());
    // }

    const [users, setUsers] = useState([])
    
    const fetchData = async () => {
        const response = await fetch(configData.END_POINT + '/trip/history',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Coookie': Cookies.get('tokken')
            }
        })
        const data = await response.json() 
        // setUsers(data)
        console.log(data)
    }
    
    useEffect(() => {
        fetchData()
    }, [])


    const CardView = ({
        source = "Default Title",
        destination = "Default Text",
        imgsrc = "default_holder.js/100px180",
        tripDate = "defaultDate",
        riderCount = "defaultRider",
        time = "2 pm"
        
    }) => (
        
            <div className="card-body mb-4 mt-4 mx-4 text-black">
                <div className="row">
                    <div className="col-md-3">
                        <img className= 'tripImage'src={sourceImg}></img>
                        <span className="well">{source}</span>
                    </div>
                    <div className="col-md-3 offset-md-3">
                        <div className="well">{tripDate}</div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3">
                    <img className = 'tripImage' src={destinationImg}></img>
                        <span className="well">{destination}</span>
                    </div>
                    <div className="col-md-3 offset-md-3">
                        <div className="well">{time}</div>
                    </div>
                </div>

                <hr></hr>

                <div className="row">
                    <div className="col-md-6">
                    <GrIcons.GrGroup className= "groupIcon" style={{ marginRight: '0.3rem' , stroke: 'white'}}/>
                        <span className="well">{riderCount}</span> 
                    </div>
                </div>
            </div>
        
    );
        //return tripDetails.map((data, index) => <CardView key={index} {...data} />);
    return users.map((data, index) => <CardView key={index} {...data} />);
    
} 

