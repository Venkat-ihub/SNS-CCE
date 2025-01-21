 import React from "react";
 import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   TextField,
   Button,
   Box,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
 } from "@mui/material";
 import { useFormik } from "formik";
 import * as Yup from "yup";

 const validationSchema = Yup.object({
   title: Yup.string().required("Required"),
   department: Yup.string().required("Required"),
   location: Yup.string().required("Required"),
   description: Yup.string().required("Required"),
   eligibility: Yup.string().required("Required"),
   selection_process: Yup.string().required("Required"),
   pay_scale: Yup.string().required("Required"),
   end_date: Yup.date()
     .min(new Date(), "End date must be in the future")
     .required("Required"),
 });

 const JobForm = ({ open, onClose, job, onSuccess }) => {
   const formik = useFormik({
     initialValues: {
       title: job?.title || "",
       department: job?.department || "",
       location: job?.location || "",
       description: job?.description || "",
       eligibility: job?.eligibility || "",
       selection_process: job?.selection_process || "",
       pay_scale: job?.pay_scale || "",
       end_date: job?.end_date
         ? new Date(job.end_date).toISOString().split("T")[0]
         : "",
       notification_pdf: job?.notification_pdf || "",
       application_link: job?.application_link || "",
     },
     validationSchema,
     onSubmit: async (values) => {
       try {
         if (job) {
           await onSuccess({ ...values, _id: job._id });
         } else {
           await onSuccess(values);
         }
         onClose();
       } catch (error) {
         console.error("Error submitting job:", error);
       }
     },
   });

   return (
     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
       <form onSubmit={formik.handleSubmit}>
         <DialogTitle>{job ? "Edit Job" : "Add New Job"}</DialogTitle>
         <DialogContent>
           <Box
             sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
           >
             <TextField
               name="title"
               label="Job Title"
               fullWidth
               value={formik.values.title}
               onChange={formik.handleChange}
               error={formik.touched.title && Boolean(formik.errors.title)}
               helperText={formik.touched.title && formik.errors.title}
             />
             <TextField
               name="department"
               label="Department"
               fullWidth
               value={formik.values.department}
               onChange={formik.handleChange}
               error={
                 formik.touched.department && Boolean(formik.errors.department)
               }
               helperText={
                 formik.touched.department && formik.errors.department
               }
             />
             <TextField
               name="location"
               label="Location"
               fullWidth
               value={formik.values.location}
               onChange={formik.handleChange}
               error={
                 formik.touched.location && Boolean(formik.errors.location)
               }
               helperText={formik.touched.location && formik.errors.location}
             />
             <TextField
               name="description"
               label="Description"
               fullWidth
               multiline
               rows={4}
               value={formik.values.description}
               onChange={formik.handleChange}
               error={
                 formik.touched.description &&
                 Boolean(formik.errors.description)
               }
               helperText={
                 formik.touched.description && formik.errors.description
               }
             />
             <TextField
               name="eligibility"
               label="Eligibility"
               fullWidth
               multiline
               rows={3}
               value={formik.values.eligibility}
               onChange={formik.handleChange}
               error={
                 formik.touched.eligibility &&
                 Boolean(formik.errors.eligibility)
               }
               helperText={
                 formik.touched.eligibility && formik.errors.eligibility
               }
             />
             <TextField
               name="selection_process"
               label="Selection Process"
               fullWidth
               multiline
               rows={3}
               value={formik.values.selection_process}
               onChange={formik.handleChange}
               error={
                 formik.touched.selection_process &&
                 Boolean(formik.errors.selection_process)
               }
               helperText={
                 formik.touched.selection_process &&
                 formik.errors.selection_process
               }
             />
             <TextField
               name="pay_scale"
               label="Pay Scale"
               fullWidth
               value={formik.values.pay_scale}
               onChange={formik.handleChange}
               error={
                 formik.touched.pay_scale && Boolean(formik.errors.pay_scale)
               }
               helperText={formik.touched.pay_scale && formik.errors.pay_scale}
             />
             <TextField
               name="end_date"
               label="End Date"
               type="date"
               fullWidth
               value={formik.values.end_date}
               onChange={formik.handleChange}
               error={
                 formik.touched.end_date && Boolean(formik.errors.end_date)
               }
               helperText={formik.touched.end_date && formik.errors.end_date}
               InputLabelProps={{
                 shrink: true,
               }}
             />
             <TextField
               name="notification_pdf"
               label="Notification PDF Link"
               fullWidth
               value={formik.values.notification_pdf}
               onChange={formik.handleChange}
             />
             <TextField
               name="application_link"
               label="Application Link"
               fullWidth
               value={formik.values.application_link}
               onChange={formik.handleChange}
             />
           </Box>
         </DialogContent>
         <DialogActions>
           <Button onClick={onClose}>Cancel</Button>
           <Button type="submit" variant="contained">
             {job ? "Update" : "Create"}
           </Button>
         </DialogActions>
       </form>
     </Dialog>
   );
 };

 export default JobForm;