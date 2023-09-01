// Imports
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import ReplyIcon from "@mui/icons-material/Reply";

const Comment = ({
  isReply,
  userAvatar,
  userName,
  comment,
  onClick,
  logged,
}) => {
  return (
    <Paper
      sx={{
        display: "flex",
        marginBottom: "1rem",
        padding: 1,
      }}
    >
      {/* Avatar of the user who posted the comment */}
      <Avatar
        src={userAvatar}
        alt={userName}
        sx={{ border: (theme) => `1px solid ${theme.palette.primary.main}` }}
      />
      <Box sx={{ ml: 1, width: "100%" }}>
        {/* Displays user's name and reply button (if not a reply and user is logged in) */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2">{userName}</Typography>
          {!isReply && logged && (
            <IconButton sx={{ padding: 0, ml: 0.2 }} onClick={onClick}>
              <ReplyIcon />
            </IconButton>
          )}
        </Box>
        {/* Displays the comment text */}
        <Typography variant="body2">{comment}</Typography>
      </Box>
    </Paper>
  );
};

// Define PropTypes to specify expected props and their types
Comment.propTypes = {
  isReply: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  logged: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default Comment;
