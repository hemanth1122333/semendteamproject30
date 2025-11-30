import { useNavigate } from "react-router-dom";

function CareerList() {
  const navigate = useNavigate();

  const careers = [
    { id: 1, name: "Software Engineer" },
    { id: 2, name: "Data Scientist" },
    { id: 3, name: "Graphic Designer" },
  ];

  return (
    <div>
      <h2 className="form-title">Career Options</h2>

      <ul>
        {careers.map((career) => (
          <li
            key={career.id}
            className="link"
            onClick={() => navigate(`/career/${career.id}`)}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            {career.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CareerList;
