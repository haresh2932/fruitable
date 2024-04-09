import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, createTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { number, object, string } from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { addProducts, editProducts, getProducts, removeProducts } from '../../../redux/Action/product.action';
// import { getProduct } from '../../../redux/Action/product.action';
import { ClimbingBoxLoader } from 'react-spinners';



function Product(props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const products = useSelector(state => state.products)
    console.log(products.products);

    useEffect(() => {
        dispatch(getProducts())
    }, [])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setEdit(false)
    };

    const handleEdit = (data) => {
        console.log(data);
        formik.setValues(data)
        setEdit(true)
        setOpen(true);
    }

    const handleDelete = (id) => {
        console.log(id);
        dispatch(removeProducts(id));
    }

    const columns = [

        {
            field: 'name',
            headerName: ' Product Name',
            width: 150,
        },
        {
            field: 'description',
            headerName: 'Description ',
            width: 150,
        },
        {
            field: 'price',
            headerName: 'Price',
            // type: 'number',
            width: 150,
        },
        {
            field: "Action",
            headerName: "Action",
            width: 150,
            renderCell: ({ row }) => (
                <>
                    <IconButton
                        onClick={() => handleEdit(row)}
                        variant="contained"
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        onClick={() => handleDelete(row.id)}
                        variant="contained"
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }
    ];

    let productSchema = object({
        name: string().required(),
        description: string().required(),
        price: number().required()
    });


    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: ''
        },
        validationSchema: productSchema,
        onSubmit: (values, { resetForm }) => {
            if (edit) {
                console.log("yes", values);
                dispatch(editProducts(values))
            } else {
                dispatch(addProducts(values))
            }

            resetForm()
            handleClose();
        },
    });

    const { handleBlur, handleChange, handleSubmit, values, touched, errors } = formik
    return (
        <>
            {
                products.isLoading ?
                    <ClimbingBoxLoader color="#36d7b7" /> :
                    products.error ? <p>{products.error}</p> :
                    <>
                        <Button variant="outlined" onClick={handleClickOpen} dir='rtl'>
                            Add Product
                        </Button>
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={products.products}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5]}
                                checkboxSelection
                                disableRowSelectionOnClick
                            />
                        </Box>
                        <Dialog
                            // dir='rtl'
                            open={open}
                            onClose={handleClose}
                        >
                            <form onSubmit={handleSubmit}>
                                <DialogTitle>Add Fruites</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        label="Enter Fruite name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        error={touched.name && errors.name ? true : false}
                                        helperText={touched.name && errors.name ? errors.name : ''}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="description"
                                        name="description"
                                        label="Description"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        error={touched.description && errors.description ? true : false}
                                        helperText={touched.description && errors.description ? errors.description : ''}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="price"
                                        name="price"
                                        label="Price"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.price}
                                        error={touched.price && errors.price ? true : false}
                                        helperText={touched.price && errors.price ? errors.price : ''}
                                    />
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button type="submit">{edit ? 'Update' : 'Add'}</Button>
                                    </DialogActions>
                                </DialogContent>
                            </form>
                        </Dialog>

                    </>
            }
        </>
    );
}


export default Product;