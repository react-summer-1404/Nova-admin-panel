// ** React Imports
import { useState } from 'react'

// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const ModalConfig = [
  {
    id: 1,
    title: '+',
    modalColor: 'modal-primary',
    btnColor: 'primary'
  },
  
]

const ModalTheme = ({children}) => {
  // ** State
  const [modal, setModal] = useState(null)

  const toggleModal = id => {
    if (modal !== id) {
      setModal(id)
    } else {
      setModal(null)
    }
  }

  const renderModal = ModalConfig.map(item => {
    return (
      <div className={`theme-${item.modalColor}`} key={item.id}>
        <Button color={item.btnColor} onClick={() => toggleModal(item.id)} key={item.title} outline>
          {item.title}
        </Button>
        <Modal
          isOpen={modal === item.id}
          toggle={() => toggleModal(item.id)}
          className='modal-dialog-centered'
          modalClassName={item.modalColor}
          key={item.id}
        >
          <ModalHeader toggle={() => toggleModal(item.id)}>{item.title}</ModalHeader>
          <ModalBody>
          {children}
          </ModalBody>
          <ModalFooter>
            <Button color={item.btnColor} onClick={() => toggleModal(item.id)}>
              Accept
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  })

  return <div className='demo-inline-spacing'>{renderModal}</div>
}
export default ModalTheme
