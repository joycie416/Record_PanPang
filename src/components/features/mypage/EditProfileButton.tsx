"use client";

import { useState } from "react";
import EditProfileModal from "./editProfileModal";
import { User } from "@supabase/supabase-js";

const EditProfileButton = ({user}: {user: User | null}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => {
        setShowModal(prev => !prev);
      }}>프로필 편집하기</button>
      {showModal && <EditProfileModal user={user} setShowModal={setShowModal} />}
    </>
  );
};

export default EditProfileButton;
