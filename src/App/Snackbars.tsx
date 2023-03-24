import { forwardRef, useState, SyntheticEvent, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { AlertTitle } from '@material-ui/core'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function CustomizedSnackbars() {
  const [open, setOpen] = useState(false)

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    setOpen(false)
  }

  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>

      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={7500}
        sx={{ bottom: { xs: 90, sm: 0 } }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
        >
          <AlertTitle>報告が完了しました。</AlertTitle>
          運営者の承認後に公開されます。
        </Alert>
      </Snackbar>
    </Stack >
  )
}
