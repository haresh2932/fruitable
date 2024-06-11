import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, createTheme } from '@mui/material';
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
import { getData } from '../../../redux/Action/category.action';
import { BASE_URL } from '../../../utils/utilis';
import { getsubData, getsubcategoryData } from '../../../redux/Slice/subcategory.slice';



function Product(props) {
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = useState(false)
    const [getcategory,setCategory]=useState('')
    const [data, setData] = useState([]);
    const categories = useSelector(state => state.categories)
    console.log(categories.categories);
    const subcategories = useSelector(state => state.subcategories)
    console.log(subcategories.subcategories);
    console.log(getcategory);
    const categorydata=subcategories.subcategories.filter((v)=>v.category_id==getcategory)
    console.log(categorydata);
    const products= useSelector(state => state.products)
    console.log(products.products.data);






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

    const handleDelete = async (data) => {


    }
    // const addProducts = async (data) => {
    //     console.log(data);
    //     const response=await axios.post(BASE_URL + 'products/add-product',data)
    //     console.log(response);


    // }


    const editProducts = (data) => {


    }



    const columns = [
        {
            field: "category_id",
            headerName: "Category Name",
            width: 130,
            renderCell: ({ row }) => {
                const category = categories.categories.find(cat => cat._id === row.category_id);
                return category ? category.name : '';
            }
        },
        {
            field: "subcategory_id",
            headerName: "Subcategory Name",
            width: 130,
            renderCell: ({ row }) => {
                const subcategory = subcategories.subcategories.find(cat => cat._id === row.subcategory_id);
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
                        onClick={() => handleDelete(row)}
                        variant="contained"
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }
    ];

    let productSchema = object({
        subcategory_id: string().required(),
        name: string().required(),
        description: string().required(),

    });


    const formik = useFormik({
        initialValues: {
            category_id:'',
            subcategory_id: '',
            name: '',
            description: ''
        },
        validationSchema: productSchema,
        onSubmit: (values, { resetForm }) => {
            if (edit) {
                console.log("yes", values);
                // editProducts(values)
            } else {
                console.log(values); 
                dispatch(addProducts(values))
            }

            resetForm()
            handleClose();
        },
    });


    const { handleBlur, handleChange, handleSubmit, values, touched, errors, setFieldValue } = formik
    const changeSelect = (event) => {
        setFieldValue("category_id", setCategory(event.target.value))
    }
    const changeSubcategory = (event) => {
        setFieldValue("subcategory_id", (event.target.value))
    }

    return (
        <>
            {
                // products.isLoading ?
                //     <ClimbingBoxLoader color="#36d7b7" /> :
                //     products.error ? <p>{products.error}</p> :
                <>
                    <Button variant="outlined" onClick={handleClickOpen} dir='rtl'>
                        Add Product
                    </Button>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={products.products.data}
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
                            <FormControl fullWidth variant="standard" margin="dense">
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category_id"
                                    name="category"
                                    value={values.category_id}
                                    onChange={changeSelect}
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
                            <FormControl fullWidth variant="standard" margin="dense">
                                <InputLabel id="category-label">Subcategory</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="subcategory_id"
                                    name="Subcategory"
                                    value={values.subcategory_id}
                                    onChange={changeSubcategory}
                                    onBlur={handleBlur}
                                    error={touched.subcategory_id && errors.subcategory_id ? true : false}
                                >
                                    {categorydata.map((subcategory) => (
                        
                                        <MenuItem value={subcategory._id}>
                                            {subcategory.name}
                                        </MenuItem>
                                    ))}
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

