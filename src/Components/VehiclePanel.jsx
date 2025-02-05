import React, { useContext } from 'react';
import uberCar from '../assets/uber-car1.png';
import uberAuto from '../assets/Uber_Auto.webp';
import uberBike from '../assets/Uber_Moto.webp';
import { RiUserFill, RiArrowDownWideLine } from 'react-icons/ri';
import { AnimatePanelProvider } from '../context/AnimatePanelContext';

const VehiclePanel = React.forwardRef(({ createride, distance, duration, setConfirmedRidePanel, fare = {}, setSelectedVehicle }, ref) => {
const {setActivePanel} = useContext(AnimatePanelProvider)
    const vehicleItems = [
        { ride: uberCar, fare: fare.car, passengers: '4', name: "car" },
        { ride: uberAuto, fare: fare.auto, passengers: '3', name: "auto" },
        { ride: uberBike, fare: fare.moto, passengers: '1', name: "moto" },
    ];

    //formated fare
    const formatFare = (amount) => {
        if (amount === "N/A") return "N/A"; // Handle missing fares
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "PKR",
            minimumFractionDigits: 2,
        }).format(amount);
    };
    return (
        <div
            ref={ref}
            className="translate-y-full fixed left-0 bottom-0 z-10 bg-white px-3 py-8 w-full flex flex-col gap-4"
        >
            <h2 className="flex justify-between items-center text-2xl font-semibold mb-5">
                Choose a Vehicle
                <span className='absolute left-[47%] top-1 text-gray-400'>
                    <RiArrowDownWideLine onClick={() => setActivePanel(false)} className='text-2xl' />
                </span>
            </h2>

            {vehicleItems.map((vehicleItem, index) => (
                <div
                    className="border-2 rounded-xl border-gray-200 flex items-center justify-start w-full active:border-black"
                    key={index}
                    onClick={() => { setConfirmedRidePanel(true); setSelectedVehicle(vehicleItem);createride(vehicleItem.name) }}
                >
                    <img src={vehicleItem.ride} alt="" className="w-[50px] object-cover" />
                    <div className="flex-1 flex justify-between items-center gap-2 rounded-xl w-full p-3">
                        <div className="flex flex-1 flex-col">
                            <div className="flex w-full items-center gap-2">
                                <h4 className="font-medium text-xl flex gap-2 flex-1">
                                    UberGo
                                    <span className="flex items-center">
                                        <RiUserFill /> {vehicleItem.passengers}
                                    </span>
                                </h4>
                                <h2 className="text-xl font-semibold">
                                    {formatFare(vehicleItem.fare)}
                                </h2>
                            </div>
                            {/* Display dynamic distance and duration */}
                            {distance && duration && (
                                <h5 className="font-medium text-base">
                                    {duration} ({distance})
                                </h5>
                            )}
                            <p className="font-normal text-sm text-gray-600 w-full overflow-hidden">
                                Affordable rides
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
});

export default VehiclePanel;
