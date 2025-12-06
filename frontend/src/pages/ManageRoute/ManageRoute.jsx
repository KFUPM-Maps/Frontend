import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { usePopup } from "../../components/Popup/PopupContext";
import { getRouteRequest } from "../../api/routes";
import { AuthContext } from "../../AuthLogic/AuthContext";
import Steps from "./Steps";

export default function ManageRoute({
  updateRoute = false,
  manageRoute = false,
}) {
  const { id, firstBuilding, secondBuilding } = useParams();
  const user = useContext(AuthContext);
  const popup = usePopup();
  const navigate = useNavigate();

  const [route, setRoute] = useState({
    id: -1,
    title: "default title",
    firstBuilding,
    secondBuilding,
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.picture,
    },
    steps: [
      {
        index: 1,
        caption: "first step",
        file: null,
        photo: null,
      },
    ],
    islikedByUser: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      let res = await getRouteRequest(id);
      if (res.success) {
        const stepsWithFiles = res.data.steps.map((s) => ({
          ...s,
          file: null,
          photo: s.photo || null,
        }));

        setRoute({ ...res.data, steps: stepsWithFiles });
      } else {
        popup.showError("Request failed: " + res.error);
      }
    };

    if (updateRoute || manageRoute) fetchData();
  }, [id, updateRoute]);

  const headerText = () =>
    updateRoute ? "Update" : manageRoute ? "Manage" : "Add";

  const handleTitleChange = (e) => {
    setRoute({ ...route, title: e.target.value });
  };

  const handleAddStep = () => {
    const newStep = {
      index: route.steps.length + 1,
      caption: "",
      file: null,
      photo: null,
    };

    const newSteps = [...route.steps, newStep].map((s, i) => ({
      ...s,
      index: i + 1,
    }));

    setRoute((prev) => ({ ...prev, steps: newSteps }));
  };

  const handleViewClick = () => {
    navigate("/previewroute", { state: route });
  };

  return (
    <div className="flex justify-center items-center py-4 h-full">
      <div className="flex flex-col w-3/4 md:w-1/2 h-3/4 items-center p-10 gap-6 bg-linear-to-t from-bg to-bg-light border border-t-highlight border-border rounded-lg">
        <h1 className="text-3xl">{headerText()} Route</h1>

        <div className="flex gap-2 w-full">
          <span>Route title:</span>
          <input
            className="bg-bg border border-border flex-1 max-w-full"
            type="text"
            value={route.title}
            onChange={handleTitleChange}
          />
        </div>

        <Steps route={route} setRoute={setRoute} />

        <div className="flex flex-col w-3/4 md:w-1/2 gap-2 items-center">
          <div className="flex justify-between gap-2 w-full">
            <button className="bg-primary hover:bg-secondary rounded flex-1 py-2 px-4" onClick={handleAddStep}>
              Add step
            </button>

            <button
              className="bg-primary hover:bg-secondary flex-1 rounded py-2 px-4"
              onClick={handleViewClick}
            >
              Preview
            </button>
          </div>

          <div className="flex justify-between gap-2 w-full">
            {!manageRoute ? (
              <button
                className="bg-success hover:bg-secondary rounded py-2 px-4 w-full"
                onClick={() => navigate("/")}
              >
                Submit for approval
              </button>
            ) : (
              <>
                <button className="bg-success hover:bg-secondary rounded py-2 px-4 flex-1">
                  Approve
                </button>
                <button className="bg-warning hover:bg-secondary rounded py-2 px-4 flex-1">
                  Reject
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
