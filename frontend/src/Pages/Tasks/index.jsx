import { Container, Table } from "react-bootstrap";
import { AddTask } from "./modleF";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Boutton from "./bouttonPr";
import Alert from "react-bootstrap/Alert";
import { useApi } from "../../helper/useApi.js";
import { useState } from "react";

function Task() {
  const [showAddTask, setshowAddTask] = useState(false);
  const handleShow = () => setshowAddTask(true);

  const Img = ({ url }) => {
    return (
      <img
        src={
          !url || url === ""
            ? "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Product_sample_icon_picture.png/512px-Product_sample_icon_picture.png"
            : url
        }
        className="img-fluid "
        width={100}
        height={100}
        alt=""
      />
    );
  };
  const accessToken = localStorage.getItem("accessToken");

  const { error, isLoading, data } = useApi({
    endpoint: "http://localhost:5000/tasks",
    method: "GET",
    config: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
  if (isLoading) {
    return <></>;
  }
  const { tasks } = data;

  return (
    <Container>
      <Row>
        <Col
          style={{
            paddingBottom: "4%",
          }}
        >
          <h1>Liste des utilisateurs</h1>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <Button variant="outline-info" onClick={handleShow}>
            {showAddTask && <AddTask />}
          </Button>
   
        </Col>
      </Row>
      <Row>
        <Table style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>title</th>
              <th>description</th>
              <th>completed</th>
              <th>createdAt</th>
              <th>updatedAt</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((element) => (
              <tr>
                <td style={{ color: "#0000FF" }}>{element.title}</td>
                <td>{element.description}</td>
                <td>{JSON.stringify(element.completed)}</td>
                <td>{element.createdAt}</td>

                <td>{element.updatedAt || null}</td>

                <td>
                  <Boutton value={element} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default Task;
