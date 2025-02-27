import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const defaultLocation = { lat: 24.9224, lng: 67.1171 }; // Fallback location (Karachi)

const LiveTracking = ({ pickup, destination }) => {
    const [pickupPosition, setPickupPosition] = useState(null);
    const [destinationPosition, setDestinationPosition] = useState(null);

    const fetchCoordinates = async (address, setPosition) => {
        if (!address) return;
        const apiKey = import.meta.env.VITE_GOOGLE_MAP_API;
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

        try {
            const response = await fetch(geocodeUrl);
            const data = await response.json();
            if (data.results.length > 0) {
                const location = data.results[0].geometry.location;
                setPosition({ lat: location.lat, lng: location.lng });
            } else {
                console.error("Location not found!");
            }
        } catch (error) {
            console.error("Error fetching geocode data:", error);
        }
    };


    useEffect(() => {
        if (pickup) fetchCoordinates(pickup, setPickupPosition);
        if (destination) fetchCoordinates(destination, setDestinationPosition);
    }, [pickup, destination]);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={pickupPosition || defaultLocation}
                zoom={15}
            >
                {/* Pickup Marker */}
                {pickupPosition && <Marker position={pickupPosition} label="P" />}

                {/* Destination Marker */}
                {destinationPosition && <Marker position={destinationPosition} label="D" />}

                {/* Polyline for Route */}
                {pickupPosition && destinationPosition && (
                    <Polyline
                        path={[pickupPosition, destinationPosition]}  // 👈 Only these two points
                        options={{
                            strokeColor: "#FF0000",
                            strokeWeight: 3,
                            geodesic: true // Smooth curve if needed
                        }}
                    />
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default LiveTracking;



