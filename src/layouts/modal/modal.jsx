import React from 'react'
import { Modal, Button } from 'rsuite';

const ModalLayout = (props) => {
    return (
        <>
            <div>
                <Modal overflow={true} open={props.open} onClose={props.handleClose}>
                    <Modal.Header className='modal-header'>
                        <Modal.Title>{props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {props.children}
                    </Modal.Body>
                    <Modal.Footer>
                    <div className='line-division' style={{marginBottom:10}}/>
                        <Button onClick={props.handleClose} appearance="default">
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </>
    )
}

export default ModalLayout