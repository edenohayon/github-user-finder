 import React from 'react';

// import './ErrorModal.css';

const ErrorModal = React.memo(props => {
  return (
    <React.Fragment>
      <div className="fixed top-0	left-0 w-full h-screen bg-gray-600 bg-opacity-60 z-50" onClick={props.onClose} />
      <div className="fixed min-w-max shadow-lg z-50 rounded-xl bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pb-4">
        <h2 className="m-0 p-4 bg-red-500 text-white rounded-xl rounded-b-none font-bold">An Error Occurred!</h2>
        <p className="p-4">{props.children}</p>
        <div className="flex justify-end p-2 py-0">
          <button type="button" className="bg-red-500 p-2 text-white font-bold rounded focus:outline-none" onClick={props.onClose}>
            Okay
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default ErrorModal;
