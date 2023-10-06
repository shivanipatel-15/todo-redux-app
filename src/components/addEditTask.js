import React, { useState } from "react";
import {
  Dialog,
  Typography,
  DialogTitle,
  IconButton,
  DialogContent,
  Snackbar,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Slider,
  Button,
  Alert,
  InputLabel,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../redux/action";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";

const AddEditTask = ({ isOpen, onClose, defaultData }) => {
  const dispatch = useDispatch();
  const [snackMsg, setSnackMsg] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      date: moment(defaultData?.date).toDate() ?? new Date(),
      username: defaultData?.username ?? "",
    },
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = (data) => {
    // Handle form submission here with validated data
		if(defaultData){
			dispatch(editTask({id:defaultData.id,...data}));
		}else {
			dispatch(addTask(data));
		}
    onClose();
  };

  const handleCloseSnackbar = () => {
    setSnackMsg("");
  };

  return (
    <Dialog
      maxWidth={"xl"}
      open={isOpen}
      className="primary-dialog"
      onClose={onClose}
    >
      <Snackbar
        open={snackMsg ? true : false}
        onClose={handleCloseSnackbar}
        autoHideDuration={4000}
      >
        <Alert severity={"error"}>{snackMsg}</Alert>
      </Snackbar>
      <DialogTitle>
        <div className="dialog-header">
          <Typography variant="h5" className="dialog-title">
            {`${defaultData?"Edit":"Add"} todo task`}
          </Typography>
          <IconButton
            className="close-btn"
            size="small"
            color="primary"
            onClick={handleClose}
          >
            X
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          {/* User name */}
          <div className="form-row">
            <InputLabel className="label">User name:</InputLabel>
            <Controller
              name="username"
              control={control}
              defaultValue={defaultData?.username || ""}
              rules={{
                required: "Username is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Only alphabets and white spaces are allowed",
                },
                maxLength: {
                  value: 15,
                  message: "Username must not exceed 15 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />
          </div>

          {/* Gender */}
          <div className="form-row">
            <InputLabel className="label">Gender:</InputLabel>
            <div className="input">
              <Controller
                name="gender"
                control={control}
                defaultValue={defaultData?.gender || "Male"}
                render={({ field }) => (
                  <RadioGroup {...field} className="gender-todo">
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                )}
              />
            </div>
          </div>

          {/* Hobby */}
          <div className="form-row">
            <InputLabel className="label">Hobby:</InputLabel>
            <div className="input">
              <FormControlLabel
                control={
                  <Controller
                    name="hobbies.Sports"
                    control={control}
                    defaultValue={
                      defaultData?.hobbies?.Sports ? true : false || false
                    }
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value} />
                    )}
                  />
                }
                label="Sports"
              />
              <FormControlLabel
                control={
                  <Controller
                    name="hobbies.Reading"
                    control={control}
                    defaultValue={
                      defaultData?.hobbies?.Reading ? true : false || false
                    }
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value} />
                    )}
                  />
                }
                label="Reading"
              />
              <FormControlLabel
                control={
                  <Controller
                    name="hobbies.Music"
                    control={control}
                    defaultValue={
                      defaultData?.hobbies?.Music ? true : false || false
                    }
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value} />
                    )}
                  />
                }
                label="Music"
              />
            </div>
          </div>

          {/* Age */}
          <div className="form-row">
            <div className="age-range">
              <InputLabel className="label">Age:</InputLabel>
            </div>
            <Controller
              name="age"
              control={control}
              defaultValue={defaultData?.age || [18, 55]}
              render={({ field }) => (
                <Slider {...field} min={18} max={55} valueLabelDisplay="auto" />
              )}
            />
          </div>

          {/* Date */}
          <div className="form-row">
            <InputLabel className="label label-date">Date:</InputLabel>
            <div className="input date-picker-container">
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <div className="position-relative">
                    <DatePicker
                      {...field}
                      dateFormat="dd/MM/yyyy"
                      selected={field.value}
                      onChange={(date) => {
                        field.onChange(date);
                        setValue("date", date);
                      }}
                      className="date-picker-input"
                    />
                    <i className="bi bi-calendar date-picker-icon"></i>
                  </div>
                )}
              />
            </div>
          </div>

          {/* Task name */}
          <div className="form-row">
            <InputLabel className="label">Task name:</InputLabel>
            <Controller
              name="taskName"
              control={control}
              defaultValue={defaultData?.taskName || ""}
              render={({ field }) => (
                <TextField {...field} variant="outlined" fullWidth />
              )}
            />
          </div>

          {/* Status */}
          <div className="form-row">
            <InputLabel className="label">Status:</InputLabel>
            <div className="input">
              <Controller
                name="status"
                control={control}
                defaultValue={defaultData?.status || "Active"}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Active", label: "Active" },
                      { value: "Inactive", label: "Inactive" },
                    ]}
                    className="select-input"
                  />
                )}
              />
            </div>
          </div>

          {/* Submit button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="submit-button"
          >
            {defaultData ? "Edit" : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditTask;
