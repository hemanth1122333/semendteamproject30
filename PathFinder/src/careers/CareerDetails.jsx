import { useParams } from "react-router-dom";

function CareerDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2 className="form-title">Career Details</h2>
      <p>You selected career with ID: {id}</p>
      <p>More detailed career information will appear here.</p>
    </div>
  );
}

export default CareerDetails;
