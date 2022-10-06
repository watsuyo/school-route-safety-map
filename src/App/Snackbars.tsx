import { forwardRef, useState, SyntheticEvent, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

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
        sx={{ bottom: '250px' }}
        autoHideDuration={3500}
      >
        <Alert
          onClose={handleClose}
          severity="success"
        >
          投稿完了しました。<br />
          担当が確認後反映されます。
        </Alert>
      </Snackbar>
    </Stack >
  )
}
