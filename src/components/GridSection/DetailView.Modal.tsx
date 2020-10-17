import React, {forwardRef, useImperativeHandle} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: '8px',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      maxWidth: '60vw',
    },
  })
);

const DetailViewModal = forwardRef((props: any, ref) => {
  useImperativeHandle(ref, () => ({
    toggleDetailView() {
      open ? handleClose() : handleOpen();
    },
  }));
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    console.log(props.detailViewParams);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">
              {props.detailViewParams && props.detailViewParams.username}
            </h2>
            <p id="transition-modal-description">
              {props.detailViewParams && props.detailViewParams.age}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              aliquam tincidunt orci. Vivamus mattis vel libero consequat
              eleifend. Nullam tincidunt libero felis, nec luctus turpis auctor
              id. Integer tortor nibh, mattis sed feugiat sed, luctus id mi. Sed
              in sem pretium, dignissim nisi vitae, rhoncus est. Duis nibh orci,
              rutrum sed massa ac, malesuada hendrerit lectus. Sed dictum turpis
              ipsum, sit amet congue lorem varius eu.{' '}
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
});

export default DetailViewModal;
