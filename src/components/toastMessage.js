import { toast } from 'vue3-toastify'

const notify = (option, message) => {
    if (option === 'SUCCESS') {
        toast(message, {
          limit: 1,
          autoClose: 1200,
          clearOnUrlChange: false,
          position: toast.POSITION.BOTTOM_LEFT,
          hideProgressBar: true,
          pauseOnHover: false,
          theme: 'colored',
          type: 'success',
          toastStyle: {
            fontSize: '14px',
            backgroundColor: '#19c9ff'
          }
        })
    }

    if (option === 'FAIL') {
        toast(message, {
          limit: 1,
          autoClose: 1200,
          clearOnUrlChange: false,
          position: toast.POSITION.BOTTOM_LEFT,
          hideProgressBar: true,
          pauseOnHover: false,
          theme: 'colored',
          type: 'error',
          toastStyle: {
            fontSize: '14px',
            backgroundColor: '#e51258'
          }
        })
    }

    if (option === 'WARNING') {
        toast(message, {
          limit: 1,
          autoClose: 1200,
          clearOnUrlChange: false,
          position: toast.POSITION.BOTTOM_LEFT,
          hideProgressBar: true,
          pauseOnHover: false,
          theme: 'colored',
          type: 'warning',
          toastStyle: {
            fontSize: '14px',
            backgroundColor: '#ffcd01'
          }
        })
    }
}

export { notify }