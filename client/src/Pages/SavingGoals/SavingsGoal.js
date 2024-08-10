import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEdit, FiTrash2, FiPlusCircle } from "react-icons/fi";
import {
  deleteSavingsGoal,
  updateSavingsGoal,
  getSavingsGoal,
  addSavingsGoal,
} from "../../utils/ApiRequest";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SavingsGoal = ({ cUser, refresh, setRefresh }) => {
  const [goal, setGoal] = useState(null);
  const [totalSaving, setTotalSaving] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("new");
  const [currentGoal, setCurrentGoal] = useState({
    _id: "",
    title: "",
    targetAmount: 0,
    targetDate: "",
  });

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const { data } = await axios.get(getSavingsGoal, {
          params: { userId: cUser._id },
        });
        setGoal(data.savingsGoals);
        setTotalSaving(data.totalSaving);
        console.log("Goal fetched successfully:", data.savingsGoals);
      } catch (err) {
        console.error("Error fetching goal:", err.response?.data || err.message);
        toast.error("Error fetching goal");
      }
    };

    if (cUser) {
      fetchGoal();
    }
  }, [cUser, refresh]);

  const handleShowModal = (type) => {
    setModalType(type);
    setCurrentGoal(type === "edit" ? goal : {
      _id: "",
      title: "",
      targetAmount: 0,
      targetDate: "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentGoal({
      _id: "",
      title: "",
      targetAmount: 0,
      targetDate: "",
    });
  };

  const handleChange = (e) => {
    setCurrentGoal({ ...currentGoal, [e.target.name]: e.target.value });
  };

  const handleSaveGoal = async () => {
    try {
      if (modalType === "new") {
        const response = await axios.post(addSavingsGoal, {
          ...currentGoal,
          userId: cUser._id,
        });
        console.log("Savings goal created:", response.data);
        toast.success("Savings goal created!");
      } else {
        const response = await axios.put(`${updateSavingsGoal}/${currentGoal._id}`, {
          ...currentGoal,
          userId: cUser._id,
        });
        console.log("Savings goal updated:", response.data);
        toast.success("Savings goal updated!");
      }
      handleCloseModal();
      setRefresh(!refresh);
    } catch (err) {
      console.error("Error saving goal:", err.response?.data || err.message);
      toast.error("Error saving goal");
    }
  };

  const handleDeleteGoal = async () => {
    try {
      const response = await axios.delete(`${deleteSavingsGoal}/${goal._id}`, {
       userId: cUser._id,
      });
      console.log("Savings goal deleted:", response.data);
      toast.success("Savings goal deleted!");
      setGoal(null);
      setRefresh(!refresh);
    } catch (err) {
      console.error("Error deleting goal:", err.response?.data || err.message);
      toast.error("Error deleting goal");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="col-lg-3 col-md-6 mb-4 text-center">
        <div className="card h-100 w-100">
          <div className="card-header bg-black text-white d-flex justify-content-between">
            <div>
              <span className="text-left">{goal?.targetDate ? formatDate(goal.targetDate) : 'No date available'}</span>
            </div>
            <div className="d-flex">
              {goal ? (
                <>
                  <FiEdit
                    className="mx-2 cursor-pointer"
                    onClick={() => handleShowModal("edit")}
                  />
                  <FiTrash2
                    className="mx-2 cursor-pointer"
                    onClick={handleDeleteGoal}
                  />
                </>
              ) : (
                <FiPlusCircle
                  className="mx-2 cursor-pointer"
                  onClick={() => handleShowModal("new")}
                />
              )}
            </div>
          </div>
          <div>
            <h3 style={{ fontWeight: "bold" }}>Saving Goal</h3>
            <h2>
              {/* {goal?.targetAmount
                ? `${((totalSaving / goal.targetAmount) * 100).toFixed(2)}%`
                : '0%'} */}
                0%
            </h2>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "new" ? "Set New Goal" : "Edit Goal"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="goalTitle">
              <Form.Label>Goal Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={currentGoal.title}
                onChange={handleChange}
                placeholder="Enter goal title"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="goalAmount">
              <Form.Label>Target Amount</Form.Label>
              <Form.Control
                type="number"
                name="targetAmount"
                value={currentGoal.targetAmount}
                onChange={handleChange}
                placeholder="Enter target amount"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="goalDate">
              <Form.Label>Target Date</Form.Label>
              <Form.Control
                type="date"
                name="targetDate"
                value={currentGoal.targetDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveGoal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SavingsGoal;