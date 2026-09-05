import { useParams, Navigate } from "react-router-dom";
import { getServiceBySlug } from "../../data/services";
import ServiceDetail from "../../sections/ServiceDetail/ServiceDetail";

export default function ServiceSingle() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) return <Navigate to="/services" replace />;

  return <ServiceDetail service={service} />;
}
