import Swal from 'sweetalert2';


export const successToast = (text: string) => Swal.fire({
    title: 'Success!',
    text: text,
    icon: 'success',
});

export const errorToast = (text: string) => Swal.fire({
    title: 'Error!',
    text: text,
    icon: 'error',
});