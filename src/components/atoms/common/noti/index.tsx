"use client";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";
import NotiStyle from "./noti.style";

export type Type = "error" | "info";

interface NotiType {
  message: string;
  type: Type;
  id: number;
}

interface NotiContextType {
  addNoti: (message: string, type: Type) => void;
}

const NotiContext = createContext<NotiContextType | null>(null);

const Noti = (props: NotiType) => {
  const { message, type } = props;

  return <NotiStyle.Box $type={type}>{message}</NotiStyle.Box>;
};

const NotiList = (props: { notiList: NotiType[] }) => {
  const { notiList } = props;
  const [notiPortal, setNotiPortal] = useState<HTMLDivElement | null>(null);

  const renderList = notiList.slice(-4);

  useEffect(() => {
    const portal = document.querySelector("#noti");

    if (portal) {
      setNotiPortal(portal as HTMLDivElement);
    }
  }, []);

  if (!notiPortal) return null;

  return ReactDOM.createPortal(
    <NotiStyle.Container>
      {renderList.map((noti) => (
        <Noti {...noti} key={noti.id} />
      ))}
    </NotiStyle.Container>,
    notiPortal
  );
};

export const NotiProvoder = ({ children }: PropsWithChildren) => {
  const [notiList, setNotiList] = useState<NotiType[]>([]);

  const removeMessage = useCallback((id: number) => {
    setNotiList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addNoti = useCallback(
    (message: string, type: Type) => {
      const id = Date.now();

      setNotiList((prev) => [...prev, { message, type, id }]);

      setTimeout(() => {
        removeMessage(id);
      }, 30000);
    },
    [removeMessage]
  );

  return (
    <NotiContext.Provider value={{ addNoti }}>
      <NotiList notiList={notiList} />
      {children}
    </NotiContext.Provider>
  );
};

export const useNoti = () => {
  const context = useContext(NotiContext);

  if (!context) {
    throw new Error("useNoti must be used within a NotiProvider");
  }

  return context;
};

export default Noti;
