import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



export default function Category() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);

    const handleDelete = (data) => {
        console.log('626', data.id);
        const removeEL = JSON.parse(localStorage.getItem('category'));
        const newElm = removeEL.filter((v) => v.id !== data.id);

        localStorage.setItem('category', JSON.stringify(newElm));
        getData()


    }

    const handleEdit = (data) => {
        handleClickOpen()
        const editEL = JSON.parse(localStorage.getItem('category'));
        const newElm = editEL.filter((v) => v.id !== data.id);
        console.log(newElm);
        setData(newElm)
        //    console.log(TextField.name); 

    }
    const columns = [
        { field: "category_name", headerName: "Name", width: 130 },
        { field: "category_description", headerName: "Description", width: 130 },
        {
            field: "Action", headerName: "Action",
            renderCell: ({ row }) => (
                <>
                    <Button
                        onClick={(event) => handleEdit(row)}
                        variant="contained"
                    >
                        <EditIcon />
                    </Button>
                    <Button
                        onClick={(event) => handleDelete(row)}
                        variant="contained"
                    >
                        <DeleteIcon />
                    </Button>
                </>
            )
        }


    ];

    const getData = () => {
        const localdata = JSON.parse(localStorage.getItem('category'))
        if (localdata) {
            setData(localdata)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    let categorySchema = object({
        category_name: string().required(),
        category_description: string().required(),

    });

    const handleAdd = (data) => {
        const rId = Math.floor(Math.random() * 10000)
        console.log(data);
        const localdata = JSON.parse(localStorage.getItem('category'))

        if (localdata) {
            localdata.push({ ...data, id: rId })
            localStorage.setItem('category', JSON.stringify(localdata))
        } else {
            localStorage.setItem('category', JSON.stringify([{ ...data, id: 'rId' }]))
        }
        getData()

    }

    const formik = useFormik({
        initialValues: {
            category_name: '',
            category_description: '',
        },
        validationSchema: categorySchema,
        onSubmit: (values, { resetForm }) => {
            handleAdd(values);
            resetForm();
            handleClose();
        },

    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Category
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Category</DialogTitle>
                    <DialogContent>

                        <TextField
                            margin="dense"
                            id="category_name"
                            name="category_name"
                            label="Enter category name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.category_name}
                            error={touched.category_name && errors.category_name ? true : false}
                            helperText={touched.category_name && errors.category_name ? errors.category_name : ''}
                        />
                        <TextField
                            error={touched.category_description && errors.category_description ? true : false}
                            margin="dense"
                            id="description"
                            name="category_description"
                            label="category_description"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.category_description}
                            helperText={touched.category_description && errors.category_description ? errors.category_description : ''}

                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Add</Button>
                        </DialogActions>

                    </DialogContent>
                </form>
            </Dialog>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </React.Fragment>
    );
}