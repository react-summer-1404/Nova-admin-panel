import React from 'react'
import { useBuildingDetail } from '../../../core/Hook/useQUserApi'
import { Button, Col, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

const DetailModal = ({toggle, isOpen, buildingId}) => {
    const {data} = useBuildingDetail(buildingId);
    return (
        <Modal
            isOpen={isOpen}
            toggle={toggle}
            className="modal-dialog-centered modal-md"
        >
            <ModalHeader className="bg-transparent"
                toggle={toggle}
            >
            </ModalHeader>
            <ModalBody className="px-sm-5 pt-50 pb-5">
                <div className="text-center mb-2">
                    <h1 className="mb-1">جزئیات ساختمان </h1>
                </div>
                {data && (
                <div className='d-flex flex-column gap-2'>
                    <div>
                        <span className='fw-semibold text-secondary'>نام ساختمان:</span>
                        <span className='ms-2'>{data.buildingName}</span>
                    </div>
                    <div>
                        <span className='fw-semibold text-secondary'>طبقه :</span>
                        <span className='ms-2'>{data.floor}</span>
                    </div>
                    <div>
                        <span className='fw-semibold text-secondary'>وضعیت :</span>
                        <span className={`ms-2 fw-bold ${data.active ? 'text-success ' : 'text-danger'}`}>{data.active ? 'غیر فعال' : 'فعال'}</span>
                    </div>
                    <div>
                    <span className='fw-semibold text-secondary'> موقعیت جغرافیایی :</span>
                    <ul className='list-unstyled ms-3 mt-1'>
                        <li>عرض جغرافیایی : {data.latitude}</li>
                        <li>طول جغرافیایی : {data.longitude}</li>
                    </ul>
                    </div>
                </div>
                )}
            </ModalBody>
            <ModalFooter>
                <Button color='secondary' onClick={toggle}>بستن</Button>
            </ModalFooter>
        </Modal>
    )
}

export default DetailModal