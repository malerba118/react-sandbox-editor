import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const CustomTableCell = withStyles(theme => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white,
    color: '#62bcfa',
    fontSize: 13,
  },
  body: {
    fontSize: 13,
    color: 'rgba(0,0,0,.6)'
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 4,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'white',
    },
    '&:nth-of-type(even)': {
      backgroundColor: 'white',
    },
  },
  tableTitle: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '24px',
    padding: 12,
    paddingLeft: 8,
    borderBottom: '1px solid rgba(255,255,255,.2)',
    // backgroundColor: '#f2f2f2',
    color: 'rgba(0,0,0,.65)',
    minWidth: 776
  }
});

function HocDocumentation(props) {
  const { classes } = props;
  const hoc = props.hoc
  return (
    <Paper elevation={0} className={classes.root}>
      <div className={classes.tableTitle}>{hoc.name}</div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow style={{height: 52}}>
              <CustomTableCell>Method</CustomTableCell>
              <CustomTableCell>Params</CustomTableCell>
              <CustomTableCell>Return Value</CustomTableCell>
              <CustomTableCell>Description</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className={classes.row}>
              <CustomTableCell component="th" scope="row">
                {hoc.name}
              </CustomTableCell>
              <CustomTableCell>{hoc.params.join(', ')}</CustomTableCell>
              <CustomTableCell>{hoc.returnValue}</CustomTableCell>
              <CustomTableCell>{hoc.description}</CustomTableCell>
            </TableRow>
          </TableBody>
        </Table>
    </Paper>
  );
}

HocDocumentation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HocDocumentation);
