import { TableCell, withStyles } from "@material-ui/core";

export const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#ccc',
      color: theme.palette.common.white,
      fontWeight: 'bold',
      fontSize: 18,
      overflowX: 'auto'
    },
    body: {
      fontSize: 16,
      overflowX: 'auto'
    },
}))(TableCell);