import Button from "react-bootstrap/Button";
import { EditTask, DeleteTask } from "./modleF";
function button(element) {
  return (
    <>
      <Button variant="outline-info">{EditTask(element.value)}</Button>{" "}
      <Button variant="outline-danger">{DeleteTask(element.value)}</Button>{" "}
    </>
  );
}

export default button;
