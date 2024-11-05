const createRoomName = () => {
  return Math.random().toString(36).substring(7);
};

export default createRoomName;
