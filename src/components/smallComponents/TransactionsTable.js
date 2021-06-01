import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function TransactionsTable({contracts, account}) {
  const classes = useStyles();

  let transactions = []

  for(let i=0; i < contracts.length; i++){
      const contractTransactions = contracts[i].transactions

      for(let j=0; j<contractTransactions.length; j++){
        contractTransactions[j].partnerName = contracts[i].partnerName
        contractTransactions[j].seller = contracts[i].seller
        contractTransactions[j].contractName = contracts[i].name

        transactions.push(contractTransactions[j])
      }
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Contract</StyledTableCell>
            <StyledTableCell align="left">Partner</StyledTableCell>
            <StyledTableCell align="left">Successful</StyledTableCell>
            <StyledTableCell align="left">Transaction Value</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, key) => (
                <StyledTableRow key={key}>
                <StyledTableCell component="th" scope="row">
                        {transaction.dateFormat}
                        </StyledTableCell>
                <StyledTableCell component="th" scope="row">{transaction.contractName}</StyledTableCell>
                <StyledTableCell component="th" scope="row">{transaction.partnerName}</StyledTableCell>
                <StyledTableCell align="left">{transaction.successful ? <Typography variant='inherit' color='primary'>YES</Typography> : <Typography variant='inherit' color='error'>NO</Typography>}</StyledTableCell>
                <StyledTableCell align="left">{transaction.seller === account ? <Typography variant='inherit'>+ {transaction.valueEther} Eth</Typography> : <Typography variant='inherit' >- {transaction.valueEther} Eth</Typography>}</StyledTableCell>
                </StyledTableRow>
              )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
