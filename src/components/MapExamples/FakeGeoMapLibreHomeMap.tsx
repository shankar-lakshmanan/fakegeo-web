import React, { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const containerStyle = {
  position: "relative", // To position spinner within the map container
  margin: "auto",
  width: "100%",
  height: "300px",
  borderRadius: "10px",
};

const spinnerContainerStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: "black",
  fontSize: "16px",
  fontWeight: "bold",
};

const spinnerStyle = `
@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.spinner {
  width: 30px;
  height: 30px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #0078d7; /* Customize color */
  border-radius: 50%;
  animation: spinner 1s linear infinite;
}
`;

const FakeGeoMapLibreHomeMap: React.FC = () => {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [loading, setLoading] = useState(true); // State to manage loading spinner
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const fetchGeoJson = async (endpoint: string, body: object) => {
    try {
      const response = await fetch(`${customFields.fakegeoApiUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return await response.json();
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      return null;
    }
  };

  useEffect(() => {
    if (!mapDivRef.current) return;

    // Initialize the MapLibre map
    const map = new maplibregl.Map({
      container: mapDivRef.current,
      style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json", // Default style
      center: [0, 0], // [longitude, latitude]
      zoom: 1,
    });

    mapRef.current = map;

    return () => {
      map.remove(); // Clean up the map on unmount
    };
  }, []);

  useEffect(() => {
    const fetchGeoJsonAndAddToMap = async () => {
      try {
        setLoading(true); // Show the spinner before fetching data
        const body = {
          limit: 10,
          bbox: [-56.25, -22.593726, 43.769531, 37.996163],
        };

        const [linesGeoJson, pointsGeoJson, polygonsGeoJson] = await Promise.all([
          fetchGeoJson("/featureCollection/lines/properties", body),
          fetchGeoJson("/featureCollection/points/properties", body),
          fetchGeoJson("/featureCollection/polygons/properties", body),
        ]);

        if (mapRef.current) {
          const map = mapRef.current;

          // Add layers and sources as before...
          if (linesGeoJson) {
            map.addSource("lines-source", { type: "geojson", data: linesGeoJson });
            map.addLayer({
              id: "lines-layer",
              type: "line",
              source: "lines-source",
              paint: { "line-color": "blue", "line-width": 3 },
            });
          }

          if (pointsGeoJson) {
            map.addSource("points-source", { type: "geojson", data: pointsGeoJson });
            map.addLayer({
              id: "points-layer",
              type: "circle",
              source: "points-source",
              paint: { "circle-color": "red", "circle-radius": 5 },
            });
          }

          if (polygonsGeoJson) {
            map.addSource("polygons-source", { type: "geojson", data: polygonsGeoJson });
            map.addLayer({
              id: "polygons-layer",
              type: "fill",
              source: "polygons-source",
              paint: { "fill-color": "green", "fill-opacity": 0.4 },
            });
          }
        }

        setLoading(false); // Hide the spinner after data loads
      } catch (error) {
        console.error("Error fetching or adding GeoJSON data to the map:", error);
        setLoading(false); // Hide spinner even if an error occurs
      }
    };

    fetchGeoJsonAndAddToMap();
  }, [customFields]);

  return (
    <div style={containerStyle}>
      {loading && (
        <div style={spinnerContainerStyle}>
          <style>{spinnerStyle}</style>
          <div className="spinner"></div>
          <span>Loading FakeGeo API data...</span>
        </div>
      )}
      <div ref={mapDivRef} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};

export default FakeGeoMapLibreHomeMap;
