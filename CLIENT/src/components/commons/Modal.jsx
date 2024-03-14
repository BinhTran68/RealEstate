import React from 'react'
import { useAppStore } from '~/store/useAppStore'

const Modal = () => {

  const { contentModal, setModal } = useAppStore();
  console.log(contentModal);  // Lấy content Modal từ app  
  return (
    // hàm onclick khi nhấn vao Khoảng trắng thì ẩn nó đi
    <div onClick={() => setModal(false, null)}
      className='absolute flex items-center justify-center top-0 left-0 w-screen h-screen bg-overlay-30 z-[100]'>
      {contentModal}
    </div>
  )
}

export default Modal
