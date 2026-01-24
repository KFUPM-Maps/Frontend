import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { usePopup } from "../../../components/Popup/PopupContext";
import { getUserRoutes } from "../../../api/routes";
import RouteItem from "../../../components/Routes/RouteItem";
import Stars from "../../../components/Routes/Stars";
import { deleteRouteRequest } from "../../../api/routes";
import Loading from "../../../components/Loading.jsx";

export default function MyRoutes() {
  const [routes, setRoutes] = useState([]);
  const { type } = useOutletContext();
  const popup = usePopup();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let res = await getUserRoutes(type);
      if (res.success) {
        setRoutes(res.data);
      } else {
        popup.showError("Request failed: " + res.error);
      }
      setLoading(false);
    };
    fetchData();
  }, [type]);

  const handelDelete = (e) => {
    const deleteRequest = async () => {
      let confirm = await popup.showConfirm("Are you sure you want to delete this route?");
      if (!confirm) return;

      let id = e.target.closest('[id*="route"]').id.replace("route", "");
      setLoading(true);
      let res = await deleteRouteRequest(id);
      if (res.success) {
        let newRoutes = routes.filter((r) => r.id !== id);
        popup.showSuccess("Route deleted successfully.");
        setRoutes(newRoutes);
      } else {
        popup.showError("Delete request failed: " + res.error);
      }
      setLoading(false);
    };
    deleteRequest();
  };

  const handelUpdate = (e) => {
    let id = e.target.closest('[id*="route"]').id.replace("route", "");
    navigate(`/updateroute/${id}`);
  };

  return (
    <>
      {loading ? <Loading/> :
      routes.length === 0 ? <span className="text-text-muted text-xl text-center mt-8">No routes available.</span> :
      routes.map((r) => {
        return (
          <RouteItem key={r.id} route={r} handelClick={handelUpdate}>
            <button
              className="flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                handelDelete(e);
              }}
            >
              <span className="material-symbols-rounded w-12  bg-danger rounded-2xl">
                close
              </span>
            </button>
            <Stars route={r} />
          </RouteItem>
        );
      })}
    </>
  );
}
