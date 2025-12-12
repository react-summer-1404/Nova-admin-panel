import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Input,
} from "reactstrap";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addNotifForUser } from "../../../../core/Services/api/notif";
import toast from "react-hot-toast";

const NotifUser = ({ isOpen, toggle, user }) => {
  const [message, setMessage] = useState("");
  console.log("user", user);
  const mutationAddNotif = useMutation({
    mutationFn: (data) => addNotifForUser(data),
    onSuccess: (data) => {
      const msg = data?.message;
      toast.success(msg);
    },
    onError: (error) => {
      console.log("error===>", error);
      const msg = error?.response?.data?.message;
      toast.error(msg);
    },
  });
  const sendNotif = () => {
    if (!user) return;
    mutationAddNotif.mutate({ userId: user.id, message: message });
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>ارسال نوتیف</ModalHeader>
      <ModalBody>
        <p>
          ارسال به: <strong style={{ color: "#7367f0" }}>{user?.fname}</strong>
        </p>
        <Input
          type="textarea"
          placeholder="متن پیام..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={sendNotif}>
          ارسال
        </Button>
        <Button color="secondary" onClick={toggle}>
          بستن
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NotifUser;
