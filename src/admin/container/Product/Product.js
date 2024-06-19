import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, createTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { mixed, number, object, string } from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { addProducts, editProducts, getProducts, removeProducts } from '../../../redux/Action/product.action';
// import { getProduct } from '../../../redux/Action/product.action';
import { ClimbingBoxLoader } from 'react-spinners';
import { getData } from '../../../redux/Action/category.action';
import { BASE_URL } from '../../../utils/utilis';
import { getsubData, getsubcategoryData } from '../../../redux/Slice/subcategory.slice';



function Product(props) {
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = useState(false)
    const [getcategory, setCategory] = useState([])
    const [data, setData] = useState([]);
    const categories = useSelector(state => state.categories)
    console.log(categories.categories);
    const subcategories = useSelector(state => state.subcategories.subcategories)
    console.log(subcategories)
    console.log(getcategory);
    const products = useSelector(state => state.products.products)
    console.log(products);

    const dispatch = useDispatch()
    // const getProducts = async () => {
    //     const response = await axios.get(BASE_URL + "products/list-products")

    //     const data = response.data.data

    //     console.log(data);
    //     setData(data)
    // }

    useEffect(() => {
        dispatch(getData())
        dispatch(getsubData())
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
        setEdit(data._id)
        setOpen(true);
    }

    const handleDelete = (id) => {
        dispatch(removeProducts(id))
    }

    const columns = [
        {
            field: "category_id",
            headerName: "Category Name",
            width: 130,
            renderCell: ({ row }) => {
                console.log(row);
                const category = categories.categories.find((v) => v._id == row.category_id);
                console.log(category);
                return category ? category.name : '';
            }
        },
        {
            field: "subcategory_id",
            headerName: "Subcategory Name",
            width: 130,
            renderCell: ({ row }) => {
                const subcategory = subcategories.find(cat => cat._id === row.subcategory_id);
                return subcategory ? subcategory.name : '';
            }
        },
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
            field: 'product_img',
            headerName: 'Image ',
            width: 150,
            renderCell: ({ row }) => (
                // console.log(row.name)
                <img src={row.product_img.url} width="50" height="50" />
            )
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
                        onClick={() => handleDelete(row._id)}
                        variant="contained"
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }
    ];

    let productSchema = object({
        category_id: string().required(),
        subcategory_id: string().required(),
        name: string().required(),
        description: string().required(),
        product_img: mixed()
            .required("Please select an image")
            .test("fileSize", "The file is too large", (value) => {
                console.log(value);
                if (value?.size) {
                    return value && value.size <= 2 * 1024 * 1024; // 2MB
                }
                return true
            })
            .test("fileType", "Unsupported File Format", (value) => {
                if (value?.type) {
                    return (
                        value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
                    );
                }
                return true
            }),
    });


    const formik = useFormik({
        initialValues: {
            category_id: '',
            subcategory_id: '',
            product_img: '',
            name: '',
            description: ''
        },
        validationSchema: productSchema,
        onSubmit: (values, { resetForm }) => {
            if (edit) {
                console.log("yes", values);
                dispatch(editProducts(values))
            } else {
                console.log(values);
                dispatch(addProducts(values))
            }
            resetForm()
            handleClose();
        },
    });


    const { handleBlur, handleChange, handleSubmit, values, touched, errors, setFieldValue } = formik
    const changeSelect = (id) => {
        console.log(id);
        setFieldValue("category_id", id)
        setCategory(id)
    }

    const changeSubcategory = (id) => {
        console.log(id);
        setFieldValue("subcategory_id", id)
    }

    console.log(values);
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
                                    rows={products}
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
                                    getRowId={row => row._id}

                                />
                            </Box>
                            <Dialog
                                // dir='rtl'
                                open={open}
                                onClose={handleClose}
                            >
                                <form onSubmit={handleSubmit}>
                                    <DialogTitle>Add Fruites</DialogTitle>
                                    <FormControl fullWidth>
                                        <InputLabel id="category-label">Category</InputLabel>
                                        <Select
                                            labelId="category-label"
                                            id="category_id"
                                            name="category"
                                            value={values.category_id}
                                            onChange={(event) => changeSelect(event.target.value)}
                                            onBlur={handleBlur}
                                            error={touched.category_id && errors.category_id ? true : false}
                                        >
                                            {categories.categories.map((category) => (
                                                <MenuItem value={category._id}>
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {touched.category_id && errors.category_id ? (
                                            <div style={{ color: 'red', fontSize: '12px' }}>{errors.category_id}</div>
                                        ) : null}
                                    </FormControl>
                                    <br /><br />
                                    <FormControl fullWidth>
                                        <InputLabel id="subcategory-label">Subcategory</InputLabel>
                                        <Select
                                            labelId="subcategory-label"
                                            id="subcategory_id"
                                            name="subcategory"
                                            value={values.subcategory_id}
                                            onChange={(e) => changeSubcategory(e.target.value)}
                                            onBlur={handleBlur}
                                            error={touched.subcategory_id && errors.subcategory_id ? true : false}
                                        >
                                            {subcategories.map((v) => {
                                                if (v.category_id == getcategory) {
                                                    console.log(v)
                                                    return <MenuItem value={v._id}>
                                                        {v.name}
                                                    </MenuItem>
                                                }

                                            })}
                                   +
                                        </Select>
                                        {touched.subcategory_id && errors.subcategory_id ? (
                                            <div style={{ color: 'red', fontSize: '12px' }}>{errors.subcategory_id}</div>
                                        ) : null}
                                    </FormControl>
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
                                            id="product_img"
                                            name="product_img"
                                            label="Image"
                                            type="file"
                                            fullWidth
                                            variant="standard"
                                            onChange={(event) => {
                                                setFieldValue("product_img", event.currentTarget.files[0]);
                                            }}
                                            onBlur={handleBlur}
                                            error={touched.product_img && Boolean(errors.product_img)}
                                            helperText={touched.product_img && errors.product_img}
                                            sx={{ marginBottom: 2 }}
                                        />
                                        {
                                            values.product_img && <img src={values.product_img?.url ? values.product_img?.url : URL.createObjectURL(values?.product_img)} width="50" height="50" />
                                        }
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

