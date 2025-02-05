import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const LocationSearchPanel = ({suggestions = [], onSelectSuggestion }) => {
  return (
    <div className="relative">
      <div className="flex flex-col gap-4 justify-start w-full">
        {Array.isArray(suggestions) && suggestions.length > 0 ? (
          suggestions.map((location, index) => (
            <div
              key={index}
              onClick={() => {
                onSelectSuggestion(location.description); 
              }}
              className="p-3 border-2 border-gray-50 active:border-black rounded-xl flex items-center gap-3 cursor-pointer"
            >
              <span className="bg-[#ddd] flex items-center justify-center h-[44px] w-[44px] min-w-[44px] rounded-full text-xl text-black">
                <FaLocationDot />
              </span>
              <h2 className="font-medium flex-1 break-words">{location.description}</h2>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-10">No suggestions found</p>
        )}
      </div>
    </div>
  );
};

export default LocationSearchPanel;
