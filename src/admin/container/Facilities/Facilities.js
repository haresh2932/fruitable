import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { object, string, number, date, InferType } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addfacilities } from '../../../redux/Action/facilities.action';


function Facilities(props) {
    const [open, setOpen] = React.useState(false);
    const dispatch=useDispatch()
    const facilities=useSelector(state=>state.facilities)


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let facilitiesSchema = object({
        name: string().required(),
        discription: string().required(),
    });


    const formik = useFormik({
        initialValues: {
            name: '',
            discription: '',
        },
        validationSchema: facilitiesSchema,
        onSubmit: values => {
            dispatch(addfacilities(values))
        },
    });

    const { handleBlur, handleChange, handleSubmit, values, touched, errors } = formik


    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Facilities
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Facilities</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Facilities Name"
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
                            id="discription"
                            name="discription"
                            label="Facilities discription"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.discription}
                            error={touched.discription && errors.discription ? true : false}
                            helperText={touched.discription && errors.discription ? errors.discription : ''}
                       
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Add</Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>

        </>
    );
}

export default Facilities;