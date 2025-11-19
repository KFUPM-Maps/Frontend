import { useEffect, useState } from 'react';
import Map from './Map';
import SearchBar from './SearchBar';
import RouteList from './RouteList';

export default function Home() {
    const [firstBuilding, setFirstBuilding] = useState("")
    const [secondBuilding, setSecondBuilding] = useState("")

    useEffect(()=>{
      document.querySelectorAll("path").forEach(p => {
        if(p.id !== secondBuilding)
          p.classList.remove("fill-gray-500", "stroke-primary", "stroke-2")
      });
      document.querySelectorAll("text").forEach(t => {t.classList.remove("fill-primary", "stroke-primary")});
      
      const buildingPath = document.getElementById(firstBuilding);
      const buildingText = Array.from(document.querySelectorAll("text")).find(
        t => t.textContent.trim() === firstBuilding
      );
      buildingPath?.classList.add("fill-gray-500", "stroke-primary", "stroke-2");
      buildingText?.classList.add("fill-primary", "stroke-primary");      

    }, [firstBuilding, secondBuilding])

    useEffect(()=>{
      document.querySelectorAll("path").forEach(p => {
        if(p.id !== firstBuilding)
          p.classList.remove("fill-gray-500", "stroke-secondary", "stroke-2")
      });
      document.querySelectorAll("text").forEach(t => {t.classList.remove("fill-secondary", "stroke-secondary")});

      const buildingPath = document.getElementById(secondBuilding);
      const buildingText = Array.from(document.querySelectorAll("text")).find(
        t => t.textContent.trim() === secondBuilding
      );
      buildingPath?.classList.add("fill-gray-500", "stroke-secondary", "stroke-2");
      buildingText?.classList.add("fill-secondary", "stroke-secondary");      

    }, [secondBuilding, secondBuilding])



    const handelBuildingSelection = (e) => {
      let buildingId;

      if (e.target.tagName === "path" && e.target.id) {
        buildingId = e.target.id;
      }

      if (e.target.tagName === "text") {
        buildingId = e.target.textContent.trim();
      }



      if (!buildingId) return;

      const buildingPath = document.getElementById(buildingId);
      const buildingText = Array.from(document.querySelectorAll("text")).find(
        t => t.textContent.trim() === buildingId
      );

      if (!buildingPath || !buildingText) return;

      // Toggle first building
      if (buildingId === firstBuilding) {
        setFirstBuilding("");
        return;
      }

      // Toggle second building
      if (buildingId === secondBuilding) {
        setSecondBuilding("");
        return;
      }

      if (!firstBuilding) {
        setFirstBuilding(buildingId);
        return;
      }

      if (!secondBuilding) {
        setSecondBuilding(buildingId);
        return;
      }

      setSecondBuilding(buildingId);
    };


    return (
    <div className="w-full h-screen overflow-hidden touch-none relative">
      <SearchBar firstBuilding={firstBuilding} secondBuilding={secondBuilding} setFirstBuilding={setFirstBuilding} setSecondBuilding={setSecondBuilding}/>
      <Map
        className="w-full h-full bg-linear-to-t from-bg-dark to-bg"
        handelClick={handelBuildingSelection}
      />
      {
        (firstBuilding && secondBuilding) &&
        <RouteList firstBuilding={firstBuilding} secondBuilding={secondBuilding}/>
      }
    </div>
    );
  }