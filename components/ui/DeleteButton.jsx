"use client";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const MySwal = withReactContent(Swal);

const DeleteButton = ({ onDelete, isLoading }) => {
    const handleDelete = () => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete();

                MySwal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            }
        });
    };

    return (
        <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => handleDelete()}>
            {isLoading ? <ArrowPathIcon className="h-4 w-4 text-red-500 animate-spin" /> : <TrashIcon className="h-4 w-4 text-red-500" />}
        </div>
    );
};

export default DeleteButton;