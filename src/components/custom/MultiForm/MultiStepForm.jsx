// Imports
import { useState } from "react";
import { Formik, Form } from "formik";
import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import FormNavigation from "./FormNavigation";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

// Functional component to encapsulate a single step within the multi-step form
export const FormStep = ({ children }) => children;

// Main component for the multi-step form
const MultiStepForm = ({ children, initialValues, onSubmit, loading }) => {
  // State to manage the current step number and form data snapshot
  const [stepNumber, setStepNumber] = useState(0);
  const [snapshot, setSnapshot] = useState(initialValues);

  // Convert 'children' to an array of steps
  const steps = React.Children.toArray(children);
  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  // Function to move to the next step and update the form data snapshot
  const next = (values) => {
    setSnapshot(values);
    setStepNumber((prev) => prev + 1);
  };

  // Function to move to the next step and update the form data snapshot
  const previous = (values) => {
    setSnapshot(values);
    setStepNumber((prev) => prev - 1);
  };

  // Handle form submission logic
  const handleSubmit = async (values, actions) => {
    // Check if the current step has an 'onSubmit' prop and call the 'onSubmit' function from the current step's props with 'values'
    if (step.props.onSubmit) await step.props.onSubmit(values);

    // Check if it is the last step of the form
    if (isLastStep) {
      // If it's the last step, call the 'onSubmit' function provided to the form with 'values' and 'actions'
      return onSubmit(values, actions);
    } else {
      // If not the last step, reset the touched state and move to the next step
      actions.setTouched({});
      next(values);
    }
  };

  return (
    <Box>
      <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={step.props.validationSchema}
      >
        {(formik) => (
          <Form>
            <Stepper activeStep={stepNumber} alternativeLabel>
              {steps.map((currentStep) => {
                const label = currentStep.props.stepName;
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {step}
            <FormNavigation
              isLastStep={isLastStep}
              loading={loading}
              hasPrevious={stepNumber > 0}
              onBackClick={() => previous(formik.values)}
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

// Define PropTypes to specify expected props and their types
FormStep.propTypes = {
  stepName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

// Define PropTypes to specify expected props and their types
MultiStepForm.propTypes = {
  children: PropTypes.node.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MultiStepForm;
