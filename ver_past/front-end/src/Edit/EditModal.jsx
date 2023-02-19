import {React, useState} from 'react';
import Modal from 'react-modal';

//Modal.setAppElement('#app')

const EditModal =({isOpen, onClose}) =>{

    return(
        <Modal style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.75)'
            },
            content: {
              position: 'absolute',
              top: '40px',
              left: '40px',
              right: '40px',
              bottom: '40px',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px'
            }
          }}
        
        isOpen={isOpen}
        
        >
            <h1>Im Modal</h1>
            {/* <button >Modal Close</button> */}
        </Modal>
    );
};

export default EditModal;