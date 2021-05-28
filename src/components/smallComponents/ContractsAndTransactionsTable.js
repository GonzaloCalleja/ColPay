import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#1F1F29',
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

function Row(props) {
  const { row, allStatusValues } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <StyledTableRow className={classes.root}>
          <StyledTableCell>
          {
            (allStatusValues[0].NotReviewed !== row.statusName && allStatusValues[0].Rejected !== row.statusName )
            &&
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
          </StyledTableCell>
        <StyledTableCell align="right">
        {row.id.toString()}
        </StyledTableCell>
        <StyledTableCell align="left">{row.name}</StyledTableCell>
        <StyledTableCell align="left">{row.totalEther} Eth</StyledTableCell>
        <StyledTableCell align="left">{row.paidEther} Eth</StyledTableCell>
        <StyledTableCell align="left">{row.recipientName}</StyledTableCell>
        <StyledTableCell align="left">{row.startDateFormat}</StyledTableCell>
        <StyledTableCell align="left">{row.expiryDateFormat}</StyledTableCell>
        <StyledTableCell align="center">{row.speed}</StyledTableCell>
        <StyledTableCell align="left">{row.statusName.toString()}</StyledTableCell>
        <StyledTableCell align="center">{row.daysToOpen}</StyledTableCell>
        
      </StyledTableRow>
      {
        (allStatusValues[0].NotReviewed !== row.statusName && allStatusValues[0].Rejected !== row.statusName )
         &&
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {
                row.transactions.length > 0
                ?
                <div>
                  <Typography variant="h6" gutterBottom component="div">
                    Transactions
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Successful</TableCell>
                        <TableCell>Transaction Value</TableCell>
                        <TableCell>Percentage of Full Value</TableCell>
                      </TableRow>
                    </TableHead>
                  <TableBody>
                      {row.transactions.map((transaction, key) => (
                          <StyledTableRow key={key}>
                          <StyledTableCell component="th" scope="row">
                            {transaction.dateFormat}
                          </StyledTableCell>
                          <StyledTableCell align="left">{transaction.successful ? <Typography variant='inherit' color='primary'>YES</Typography> : <Typography variant='inherit' color='error'>NO</Typography>}</StyledTableCell>
                          <StyledTableCell align="left">{transaction.valueEther} Eth</StyledTableCell>
                          <StyledTableCell align="left">
                            {Math.round(transaction.valueEther * row.totalEther * 100) / 100} %
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                :
                <Typography variant="h6" gutterBottom component="div">
                  No Transactions for this Contract
                </Typography>

              }
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
            }
    </React.Fragment>
  );
}

const ContractsAndTransactionsTable =({ contracts, statusValues, allStatusValues }) => {

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell />
            <StyledTableCell align="right">ID</StyledTableCell>
            <StyledTableCell align="left">NAME</StyledTableCell>
            <StyledTableCell align="left">TOTAL VALUE</StyledTableCell>
            <StyledTableCell align="left">PAID VALUE</StyledTableCell>
            <StyledTableCell align="left">RECIPIENT</StyledTableCell>
            <StyledTableCell align="left">START</StyledTableCell>
            <StyledTableCell align="left">EXPIRATION</StyledTableCell>
            <StyledTableCell align="center">SPEED</StyledTableCell>
            <StyledTableCell align="left">STATUS</StyledTableCell>
            <StyledTableCell align="left">DAYS LOCKED</StyledTableCell>

          </StyledTableRow>
        </TableHead>
        <TableBody>
          {contracts.map((contract) => {
            if( statusValues.includes(contract.statusName)){
              return <Row key={contract.id.toString()} row={contract} allStatusValues={allStatusValues} />
            }
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ContractsAndTransactionsTable