import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsFillPencilFill } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import { BsTrash3 } from "react-icons/bs";
import { BsExclamationOctagon } from "react-icons/bs";
import { FcAddColumn } from "react-icons/fc";
import axios from "axios";

const EditTask = (element) => {
  const [validated, setValidated] = useState(false);

  const [form, setForm] = useState({
    title: element.title,
    description: element.description,
    completed: element.completed,
  });
  const handleChange = (e) => {
    console.table([e.target.name, e.target.value, form]);
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);
  const resetButton = () => {
    setForm({
      title: element.title,
      description: element.description,
      completed: element.completed,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios({
      url: `http://localhost:5000/tasks/${element.taskId}`,
      method: "patch",
      data: form,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((rs) => {
        if (rs?.status === 200 && rs?.data?.success) {
          alert(JSON.stringify(rs?.data?.message));
          window.location.reload(true);
        } else alert(JSON.stringify(rs?.data?.message || "Success"));
      })
      .catch((err) => {
        console.log(err);
        alert(
          JSON.stringify(err.response?.data?.message || err.response?.data)
        );
      });

    setShow(false);
    resetButton();
  };
  if (!element)
    return (
      <>
        <BsFillPencilFill onClick={handleShow} />
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="EditTaskLoad">
                <Form.Label>Title*</Form.Label>
                <Form.Control placeholder="Title" />
              </Form.Group>
              <Form.Group>
                <Form.Label>description*</Form.Label>
                <Form.Control placeholder="description" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success">Save</Button>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  return (
    <>
      <BsFillPencilFill onClick={handleShow} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="EditTask">
              <Form.Label>description*</Form.Label>
              <Form.Control
                name="description"
                defaultValue={element.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="EditTask">
              <Form.Label>title*</Form.Label>
              <Form.Control
                name="title"
                onChange={handleChange}
                placeholder="title"
                autoFocus
                required
                defaultValue={element.title}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>completed*</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={handleChange}
                name="completed"
                // required
                defaultValue={element.completed}
              >
                <option>select...</option>
                <option key={false} value={false}>
                  false
                </option>
                <option key={true} value={true}>
                  true
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="EditTask">
              <Form.Label>createdAt*</Form.Label>
              <Form.Control
                name="createdAt"
                defaultValue={element.createdAt}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="EditTask">
              <Form.Label>updatedAt*</Form.Label>
              <Form.Control
                name="updatedAt"
                defaultValue={element.updatedAt}
                disabled
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            type="submit"
            onClick={(data) => handleSubmit(data)}
          >
            Save
          </Button>
          <Button variant="danger" type="reset" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const DeleteTask = (element) => {
  const [show, setShow] = useState(false);
  console.log("firas => ", element);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios({
      url: `http://localhost:5000/tasks/${element.taskId}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((rs) => {
        if (rs?.status === 200 && rs?.data?.success) {
          alert(JSON.stringify(rs?.data?.message));
          window.location.reload(true);
        } else alert(JSON.stringify(rs?.data?.message || "Success"));
      })
      .catch((err) => {
        console.log(err);
        alert(
          JSON.stringify(err.response?.data?.message || err.response?.data)
        );
      });

    setShow(false);
  };
  return (
    <>
      <BsTrash3 onClick={handleShow} />

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            <BsExclamationOctagon /> Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete this task!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit}>
            Yes
          </Button>
          <Button variant="danger" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const AddTask = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const handleChange = (e) => {
    console.table([e.target.name, e.target.value]);
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log("form=====>", form);
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const resetButton = () => {
    setForm({
      title: "",
      description: "",
      completed: false,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios({
      url: "http://localhost:5000/tasks",
      method: "post",
      data: form,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((rs) => {
        if (rs?.status === 200 && rs?.data?.success) {
          alert(JSON.stringify(rs?.data?.message));
          window.location.reload(true);
        } else alert(JSON.stringify(rs?.data?.message || "Success"));
      })
      .catch((err) => {
        console.log(err);
        alert(
          JSON.stringify(err.response?.data?.message || err.response?.data)
        );
      });

    setShow(false);
    resetButton();
  };
  return (
    <>
      <FcAddColumn onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="addTask">
              <Form.Label>title*</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="title"
                placeholder="title"
                autoFocus
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>description *</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="description"
                placeholder="entrer un description"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>completed *</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={handleChange}
                name="completed"
                // required
                defaultValue={false}
              >
                <option>select...</option>
                <option key={false} value={false}>
                  false{" "}
                </option>
                <option key={true} value={true}>
                  true{" "}
                </option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={(data) => handleSubmit(data)}>
            Save
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { EditTask, DeleteTask, AddTask };
