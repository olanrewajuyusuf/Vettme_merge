import images from "@/assets/Images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import moment from "moment"

interface Message {
  id: string;
  conversationId: string;
  sender: string;
  text: string;
  createdAt: string;
}

interface ArrivalMessage {
  conversationId: string;
  sender: string;
  text: string;
  createdAt: string;
}

const Support = () => {
  const [conversationId, setConversationId] = useState();
  const companyId = localStorage.getItem("companyId");
  const adminId = "5386a5a7-17d5-49c4-8e84-fe751d007a14";
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [text, setText] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState<ArrivalMessage | null>(
    null
  );

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(
          `https://vettme-api-2h3d.onrender.com/conversation/find/${companyId}/${adminId}`
        );
        setConversationId(res.data.data.id);
        // console.log(res.data.data.id);
      } catch (err) {
        console.error(err);
      }
    };
    getConversation();
  }, [companyId]);

  useEffect(() => {
    const newSocket = io("https://vettme-api-2h3d.onrender.com");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleGetMessage = (data: ArrivalMessage) => {
      setArrivalMessage(data);
    };

    socket.on("getMessage", handleGetMessage);
    return () => {
      socket.off("getMessage", handleGetMessage);
    };
  }, [socket]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, { ...arrivalMessage, id: uuidv4() }]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    if (socket) {
      socket.emit("addUser", companyId);
      socket.on("getUsers", (users: any[]) => {
        console.log(users);
      });
    }
  }, [socket, companyId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `https://vettme-api-2h3d.onrender.com/message/${conversationId}`
        );
        setMessages(res.data.data);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };

    if (conversationId) {
      getMessages();
    }
  }, [conversationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (socket) {
      socket.emit("SendMessage", {
        senderId: companyId,
        receiverId: adminId,
        text,
      });
    }

    try {
      const { data } = await axios.post(
        "https://vettme-api-2h3d.onrender.com/message",
        {
          conversationId: conversationId,
          sender: companyId,
          text,
        }
      );
      setMessages((prev) => [
        ...prev,
        { ...data.data, sender: companyId, id: uuidv4() },
      ]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  const scrollToLastMessage = () => {
    const messagesBox = document.getElementById("messages-box");
    if (messagesBox) {
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToLastMessage();
  }, [messages]);

  return (
    <>
      <div className="mb-[30px]">
        <h2>Support</h2>
        <p className="text-sm">Get help, contact us, or report a problem</p>
      </div>

      <div className="w-full flex gap-6">
        <div className="basis-2/3 bg-white rounded-xl border-[1px] border-stroke-clr overflow-hidden">
          <div className="w-full p-4 flex items-center gap-3 border-b-[1px] border-stroke-clr">
            <div className="w-10 h-10 rounded-full aspect-square p-2 border-[1px] border-green-600 relative">
              <img
                src={images.favicon}
                alt="Vettme Support"
                className="w-full h-full object-contain"
              />
              <div className="w-3 h-3 rounded-full bg-green-600 absolute left-0 top-0"></div>
            </div>
            <div className="flex flex-col">
              <p className="font-medium">Vettme Customer Support</p>
              <small className="text-[10px]">
                Typically responds within four hours
              </small>
            </div>
          </div>
          <div
            id="messages-box"
            className="w-full flex flex-col gap-3 p-3 h-[400px] overflow-y-scroll scroll-smooth"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-2 max-w-[45%] rounded-lg relative ${
                  message.sender !== companyId
                    ? "bg-yellow-100 self-start sent-mssg"
                    : "bg-purple-100 self-end received-mssg"
                }`}
              >
                <p className="text-xs">{message.text}</p>
                <hr className="my-1 bg-white border-white" />
                <p className="text-[8px] text-right font-medium opacity-50">
                {moment(message.createdAt).format("MMMM Do YYYY, h:mm A")}
                </p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <label className="w-full flex gap-3 bg-gray-200 p-3">
              <Input
                type="text"
                className="w-full font-normal"
                placeholder="Type your message here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button
                type="submit"
                className="w-10 h-10 aspect-square rounded-full flex items-center justify-center p-1 bg-yellow-500 hover:bg-yellow-600"
              >
                <PaperPlaneIcon className="-rotate-[30deg] text-base-clr" />
              </Button>
            </label>
          </form>
        </div>

        <div className="basis-1/3 flex flex-col gap-6">
          <div className="w-full bg-white p-4 border-[1px] border-stroke-clr rounded-xl">
            <h3 className="font-semibold">Call for Help</h3>
            <p className="my-4">
              Need assistance? Contact our support team for quick 
              help with any issues or questions. We're here to assist you!
            </p>
            <div className="flex items-center gap-3 text-green-600">
              <img src={images.phone} alt="Phone" className="w-5" />
              <Link to="tel:+2348131235467" className="font-semibold">
                +234 813 123 5467
              </Link>
            </div>
          </div>
          <div className="w-full bg-white p-4 border-[1px] border-stroke-clr rounded-xl">
            <h3 className="font-semibold">Send a Mail</h3>
            <p className="my-4">
              Need assistance? Send us an email at for quick support. We're here to help!
            </p>
            <div className="flex items-center gap-3 text-green-600">
              <img src={images.email} alt="Mail" className="w-5" />
              <Link to="mailto:support@vettme.ng" className="font-semibold">
                support@vettme.ng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
