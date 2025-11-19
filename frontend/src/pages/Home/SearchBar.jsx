export default function SearchBar({firstBuilding, setFirstBuilding, secondBuilding, setSecondBuilding}){
    const selectStyle = "bg-bg rounded border-border p-1 text-center flex-1 min-w-0"
    const buildingNames = [
        "B58",
        "B57",
        "B59",
        "B40",
        "B79",
        "B21",
        "B9",
        "B19",
        "B10",
        "B20",
        "B11",
        "B39",
        "B17",
        "B78",
        "B76",
        "B22",
        "B24",
        "B8",
        "B14",
        "B6",
        "B26",
        "B68",
        "B63",
        "B5",
        "B15",
        "B4",
        "B2",
        "B75",
        "B3",
        "B1",
        "B55",
        "B16",
        "B7",
        "Mall",
        ""
    ];

    return(
        <div className="flex gap-2 border-border border-t-highlight border-1 items-center w-10/12 md:w-1/2 absolute left-1/2 -translate-x-1/2 mt-5 bg-bg-light rounded-2xl p-2 px-4">
            <button className="flex justify-center items-center">
                <span className="material-icons">search</span>
            </button>

            <div className="flex flex-1 gap-2 items-center min-w-0">
                <span>From</span>
                <input
                    name="firstBuilding"
                    list="firstBuildings"
                    className={selectStyle}
                    value={firstBuilding}
                    onChange={(e) => setFirstBuilding(e.target.value)}
                    placeholder="Select a building..."
                />
                <datalist id="firstBuildings">
                    {buildingNames.map((b) => <option key={b} value={b} />)}
                </datalist>

                <span>To</span>
                <input
                    name="secondBuilding"
                    list="secondBuildings"
                    className={selectStyle}
                    value={secondBuilding}
                    onChange={(e) => setSecondBuilding(e.target.value)}
                    placeholder="Select a building..."
                />
                <datalist id="secondBuildings">
                    {buildingNames.map((b) => <option key={b} value={b} />)}
                </datalist>
            </div>

        </div>
    )
}