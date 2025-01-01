import React, { useEffect, useRef, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "leaflet/dist/leaflet.css";

const useResponsiveStyle = () => {
  const [style, setStyle] = useState({ width: "92vw", height: "300px" });

  useEffect(() => {
    const updateStyle = () => {
      if (window.innerWidth < 768) {
        // Adjust for phones
        setStyle({ width: "92vw", height: "300px" });
      } else {
        // Default for larger screens
        setStyle({ width: "55vw", height: "300px" });
      }
    };

    updateStyle();
    window.addEventListener("resize", updateStyle);

    return () => window.removeEventListener("resize", updateStyle);
  }, []);

  return style;
};


const FakeGeoLeafletMap: React.FC = () =>  {
  const containerStyle = useResponsiveStyle();
  return <BrowserOnly fallback={<div>Loading map...</div>}>
  {() => {
    const LeafletMap = () => {
      const mapRef = useRef<any>(null);
      const [geoJsonData, setGeoJsonData] = useState<any>(null);
      const [isLeafletLoaded, setIsLeafletLoaded] = useState(false); // Track if Leaflet has been loaded
      const {
        siteConfig: { customFields },
      } = useDocusaurusContext();

      useEffect(() => {
        const fetchGeoJson = async () => {
          try {
            const response = await fetch(
              `${customFields.fakegeoApiUrl}/feature/polygon/random/properties`,
              { headers: { "Content-Type": "application/json" } }
            );
            const data = await response.json();
            setGeoJsonData(data);
          } catch (error) {
            console.error("Error fetching GeoJSON data:", error);
          }
        };

        fetchGeoJson();
      }, []);

      useEffect(() => {
        let L: any; // Declare Leaflet as a local variable
        const initializeMap = async () => {
          if (!mapRef.current) {
            // Dynamically import Leaflet
            L = (await import("leaflet")).default;

            setIsLeafletLoaded(true)
            mapRef.current = L.map("leaflet-map2", {
              center: [40.816337, -101.278818],
              zoom: 5,
            });

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution: "&copy; OpenStreetMap contributors",
            }).addTo(mapRef.current);
          }

          if (geoJsonData) {
            const map = mapRef.current;

            // Clear existing layers
            map.eachLayer((layer: any) => {
              if (layer.feature) map.removeLayer(layer);
            });

            // Add GeoJSON data
            const geoJsonLayer = L.geoJSON(geoJsonData, {
              style: {
                color: "#007cbf",
                weight: 2,
                fillColor: "#007cbf",
                fillOpacity: 0.5,
              },
              onEachFeature: (feature, layer) => {
                const popupContent = feature.properties
                  ? `<b>Name</b>: ${feature.properties.name}<br/><b>Description</b>: ${feature.properties.detailedDescription}`
                  : "No additional information";
                layer.bindPopup(popupContent);
              },
            }).addTo(map);

            geoJsonLayer.eachLayer((layer) => {
              layer.openPopup();
            });

            map.fitBounds(geoJsonLayer.getBounds(), { padding: [20, 20] });
          }
        };

        initializeMap();

        // Cleanup on component unmount
        return () => {
          if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
          }
        };
      }, [geoJsonData]);

      return <div id="leaflet-map2" style={containerStyle}></div>;
    };

    return <LeafletMap />;
  }}
</BrowserOnly>
}

export default FakeGeoLeafletMap;
