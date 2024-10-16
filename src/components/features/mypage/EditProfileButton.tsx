"use client";

import { useState } from "react";
import { User } from "@supabase/supabase-js";
import EditProfileModal from "./EditProfileModal";
import { Button } from "@/components/ui/button";

const EditProfileButton = ({ user }: { user: User | undefined }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => {
          setShowModal((prev) => !prev);
        }}
      >
        프로필 편집하기
      </Button>
      {showModal && <EditProfileModal user={user} setShowModal={setShowModal} />}
    </>
  );
};

export default EditProfileButton;
