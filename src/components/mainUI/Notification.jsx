import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import CloseIcon from "@material-ui/icons/Close";
import { red, green, amber, blue } from "@material-ui/core/colors";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const styles = {
  snackbar: {
    zIndex: 2147483647
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: red[700]
  },
  info: {
    backgroundColor: blue[700]
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: 8
  },
  closeIcon: {
    fontSize: 20,
    opacity: 0.9
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
};

const variantIcon = {
  success: <CheckCircleIcon style={styles.icon} />,
  warning: <WarningIcon style={styles.icon} />,
  error: <ErrorIcon style={styles.icon} />,
  info: <InfoIcon style={styles.icon} />
};

/**
 * 通知コンポーネント
 * エラー発生時や操作成功時のメッセージ表示を行うコンポーネント
 */
const Notification = props => {
  const { closeNotification, open, notificationData } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    closeNotification();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      key={notificationData.key}
      style={styles.snackbar}
    >
      <SnackbarContent
        style={styles[notificationData.variant]}
        message={
          <span style={styles.message}>
            {variantIcon[notificationData.variant]}
            {notificationData.message}
          </span>
        }
        action={[
          <IconButton key="close" color="inherit" onClick={closeNotification}>
            <CloseIcon style={styles.closeIcon} />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
};

export const NotificationType = {
  success: "success",
  warning: "warning",
  error: "error",
  info: "info"
};

export default Notification;
