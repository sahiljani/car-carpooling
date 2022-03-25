import {React, useEffect, useState } from 'react';
import * as GrIcons from 'react-icons/gr'
import sourceImg from '../../start-location.svg';
import destinationImg from '../../pin-location.svg';
import './TripHistory.css';
import Cookies from 'js-cookie'
import configData from "../../config.json";

export default function TripHistory() {
    // const tripDetails = [
    //     {
    //         source: "Home",
    //         destination: "University of Waterloo",
    //         tripDate: "01-03-2022",
    //         riderCount: 2,
            
    //     },
    //     {
    //         source: "University of Waterloo",
    //         destination: "Phillip Street",
    //         tripDate: "01-03-2022",
    //         riderCount: 3,
    //     },
    //     {
    //         source: "Phillip Street",
    //         destination: "University of Waterloo",
    //         tripDate: "01-03-2022",
    //         riderCount: 1,
            
    //     },
    //     {
    //         source: "lester ",
    //         destination: "University of Waterloo",
    //         tripDate: "01-03-2022",
    //         riderCount: 1,
    //         time:"2 pm"
            
    //     }
    // ]
   

    
    const [tripDetails, setTripDetails] = useState([])
    const fetchData = async () => {
        const response = await fetch(configData.END_POINT + '/trip/history',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Coookie': Cookies.get('tokken')
            }
        })
        const data = await response.json() 

        // Parse Data
        let tempArray = []
        for(let i =0; i< data.length; i++){
            let thisTrip = data[i]
            let newTrip = {}
            // newTrip["source"] = thisTrip["source"]
            newTrip["source"] = "Source"
            // newTrip["destination"] = thisTrip["destination"]
            newTrip["destination"] = "destination"
            newTrip["tripDate"] = thisTrip["dateTime"]
            newTrip["riderCount"] = thisTrip["riders"].length

            tempArray.push(newTrip)
        }
        setTripDetails(tempArray)
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
                    {/* <div className="col-md-3 offset-md-3">
                        <div className="well">{time}</div>
                    </div> */}
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
        return(
            <>
            {tripDetails.length ===0? <h1>No trips found</h1>:
                tripDetails.map((data,index) => {
                    return(
                    <CardView key={index} {...data} />
                    )
                })
            }
            </>
        )
} 

