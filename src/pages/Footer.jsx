import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import image1 from "/src/assets/Screenshot 2026-03-25 103230.png";
import image2 from "/src/assets/Screenshot 2026-03-25 103252.png";
import L from "leaflet";
import { renderToString } from "react-dom/server";
import { MapPin } from "lucide-react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const customIcon = L.divIcon({
  html: renderToString(<MapPin color="blue" size={28} /> ),
  className: "",
});
const position = [11.215682399229676, 76.29675234071459]; 

// 🔹 Controls
const MapControls = () => {
  const map = useMap();

  const goToVenue = () => {
    map.setView(position, 16, { animate: true });
  };

  return (
    <div className="absolute z-[1000] sm:top-4 bottom-16 right-4 flex flex-col items-end gap-1">
      <button
        onClick={goToVenue}
        className="bg-blue-500 text-white px-3 py-1 rounded shadow-md"
      >
        📍 Venue
      </button>
      <div className="flex flex-col gap-1">
        <img
          src={image1}
          alt="Image 1"
          className="w-[130px] sm:w-[220px] rounded-md"
        />
        <img
          src={image2}
          alt="Image 2"
          className="w-[130px] sm:w-[220px] rounded-md"
        />
      </div>
    </div>
  );
};

const WeddingMap = () => {
  const markerRef = useRef(null);

  const handleMapClick = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`;
    window.open(url, "_blank");
  };

  // ✅ Open popup safely ONCE
  useEffect(() => {
    const timer = setTimeout(() => {
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    }, 300); // wait for map render

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className=" px-4 py-2 flex flex-col gap-1"
      style={{
        background:
          "linear-gradient(90deg, #000000, #0d0d0d, #1a1a1a, #463c1e, #1a1a1a, #0d0d0d, #000000)",
      }}
    >
      <div className="bg-[#0a0a0a]/80 backdrop-blur-md text-[#e6d3a3] px-4 py-2 rounded-md w-fit border border-[#2a2a2a] shadow-lg text-[12px] sm:text-[14px]">
        Use the location map for directions • Click the marker to open Google
        Maps
      </div>

      <div style={{ height: "400px", position: "relative" }}>
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: "100%", borderRadius: "12px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MapControls />

          <Marker
            position={position}
            ref={markerRef}
            icon={customIcon}
            eventHandlers={{ click: handleMapClick }}
          >
            <Popup autoClose={false} closeOnClick={false} closeButton={false}>
              <div onClick={handleMapClick} style={{ cursor: "pointer" }}>
                <span className="text-[10px] sm:text-[14px]">
                  Wedding Venue (HILL VIEW CONVENTION CENTER) 💍
                </span>
                <br />
                <small>Click for directions</small>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default WeddingMap;
