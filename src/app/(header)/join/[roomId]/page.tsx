"use client";

import EnterTemplate from "@/components/templates/enter";
import { useParams } from "next/navigation";

const Join = () => {
  const { roomId } = useParams<{ roomId: string }>();

  return <EnterTemplate roomId={roomId} type={"join"} />;
};

export default Join;
