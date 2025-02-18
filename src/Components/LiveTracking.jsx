import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: 37.7749,
    lng: -122.4194,
};

const LiveTracking = () => {
    return (
        <>
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API}>
                
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                    {/* Add a marker */}
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>

        </>

    );
};

export default LiveTracking;
