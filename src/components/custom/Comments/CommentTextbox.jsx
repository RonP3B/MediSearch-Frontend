// Imports
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

const CommentTextbox = ({
  label,
  sx,
  show,
  onClick,
  sendingComment,
  parentCommentId,
}) => {
  // State to hold the text input value
  const [value, setValue] = useState("");

  // Reference to the text input field
  const textFieldRef = useRef(null);

  // Focus on the text input field when show becomes true and there's a parentCommentId
  useEffect(() => {
    // Check if 'show' is true, 'textFieldRef' exists, and 'parentCommentId' is present
    if (show && textFieldRef.current && parentCommentId) {
      // If all conditions are met, focus on the text input field
      textFieldRef.current.focus();
    }
  }, [show, parentCommentId]);

  return (
    <Box display={show ? "block" : "none"}>
      {/* Text field for entering comments */}
      <TextField
        inputRef={textFieldRef} // Ref for accessing the input element
        multiline
        fullWidth
        disabled={sendingComment} // Disable the field while sending a comment
        label={label}
        sx={sx} // Additional styling using  MUI 'sx' prop
        maxRows={6}
        value={value} // Current value of the input
        onChange={(e) => setValue(e.target.value)} // Updates 'value' on input change
        InputProps={{
          sx: { borderRadius: "25px" },
          endAdornment: (
            <InputAdornment position="end">
              {
                // Shows a loading indicator or send button
                sendingComment ? (
                  // Shows CircularProgress while sending a comment
                  <CircularProgress size={25} />
                ) : (
                  // Shows IconButton to send a comment when not sending
                  <IconButton
                    onClick={
                      // Determines the click action based on 'parentCommentId'
                      parentCommentId
                        ? () => onClick(value, setValue, parentCommentId)
                        : () => onClick(value, setValue)
                    }
                    onMouseDown={(e) => e.preventDefault()}
                    color="primary"
                    disabled={!value} // Disables button if there's no input value
                  >
                    <SendIcon />
                  </IconButton>
                )
              }
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

// Define PropTypes to specify expected props and their types
CommentTextbox.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  sendingComment: PropTypes.bool.isRequired,
  sx: PropTypes.object,
  parentCommentId: PropTypes.string,
};

export default CommentTextbox;
