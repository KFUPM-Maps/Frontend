import { useEffect, useState } from "react";
import { getAllRoutes } from "../../../api/routes";
import { usePopup } from "../../../components/Popup/PopupContext";
import { useNavigate, useOutletContext } from "react-router";
import RouteItem from "../../../components/Routes/RouteItem";
import Stars from "../../../components/Routes/Stars";
import Loading from "../../../components/Loading.jsx";
import { deleteRouteRequest } from "../../../api/routes";

export default function ManageRoutes() {
  const [routes, setRoutes] = useState([]);
  const { type } = useOutletContext();
  const navigate = useNavigate();
  const popup = usePopup();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let res = await getAllRoutes(type);
      if (res.success) {
        setRoutes(res.data);
      } else {
        popup.showError("Request failed: " + res.error);
      }
      setLoading(false);
    };
    fetchData();
  }, [type]);

  const handelManage = (e) => {
    let id = e.target.closest('[id*="route"]').id.replace("route", "");
    navigate(`/manageroute/${id}`);
  };

  const handelDelete = (e) => {
    const deleteRequest = async () => {
      let confirm = await popup.showConfirm(
        "Are you sure you want to delete this route?",
      );
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

  return (
    <>
      {loading ? (
        <Loading />
      ) : routes.length === 0 ? (
        <span className="text-text-muted text-xl text-center mt-8">
          No routes available.
        </span>
      ) : (
        routes.map((r) => {
          return (
            <RouteItem key={r.id} route={r} handelClick={handelManage}>
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
        })
      )}
    </>
  );
}
