import dynamic from "next/dynamic";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

export default function Map() {
  // Il codice che dipende da window può essere eseguito qui
  const Map = dynamic(
    () => import("../components/Map"),
    {
      loading: () => <p>Hello</p>,
      ssr: false,
    } // This line is important. It's what prevents server-side render
  );

  return <Map></Map>;
}
