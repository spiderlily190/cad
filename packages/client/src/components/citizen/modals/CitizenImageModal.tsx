import type { Citizen } from "@snailycad/types";
import { Modal } from "components/modal/Modal";
import { useModal } from "context/ModalContext";
import { useImageUrl } from "hooks/useImageUrl";
import { ModalIds } from "types/ModalIds";

interface Props {
  citizen: Citizen;
}

export function CitizenImageModal({ citizen }: Props) {
  const { isOpen, closeModal } = useModal();
  const { makeImageUrl } = useImageUrl();

  return (
    <Modal
      title={`${citizen.name} ${citizen.surname}`}
      onClose={() => closeModal(ModalIds.CitizenImage)}
      isOpen={isOpen(ModalIds.CitizenImage)}
    >
      <div className="flex items-center justify-center mt-10">
        <img
          draggable={false}
          className="rounded-md w-[40em] h-[40em] object-cover"
          src={makeImageUrl("citizens", citizen.imageId!)}
        />
      </div>
    </Modal>
  );
}
