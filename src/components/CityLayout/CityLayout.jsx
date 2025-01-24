import { useParams } from "react-router-dom";

export default function CityLayout() {
  const { city } = useParams();

  return (
    <div>
      <div>{city}</div>
    </div>
  );
}
