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
import Button from '@material-ui/core/Button';
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
  reject: {
    backgroundColor: '#ff6961',
    marginTop: 5,
    '&:hover': {
      background: '#993F3A',
    },
  },
  columntile: {
    display: 'flex',
    flexDirection: 'column'
  }
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
  const { row, allStatusValues, reviewTable, onAccept, onReject, account } = props;
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
        <StyledTableCell align="left">{ row.partnerName}</StyledTableCell>
        <StyledTableCell align="left">{row.startDateFormat}</StyledTableCell>
        <StyledTableCell align="left">{row.expiryDateFormat}</StyledTableCell>
        <StyledTableCell align="center">{row.speed} %</StyledTableCell>
        <StyledTableCell align="left">{row.statusName.toString()}</StyledTableCell>
        <StyledTableCell align="center">{row.daysToOpen}</StyledTableCell>
        {(reviewTable && account === row.recipient)
        ?
          <StyledTableCell align="center">
            <div className={classes.columntile}>
              <Button 
                variant="contained" 
                color="primary" 
                size='small'
                id = {row.id.toString()}
                onClick={() => { onAccept(row.id.toString())  } }
                >
                Accept
              </Button>
              <Button 
                className={classes.reject}
                variant="contained" 
                color="primary" 
                id = {row.id.toString()}
                size='small'
                onClick={() => { onReject(row.id.toString()) } }
                >
                Reject
              </Button>
            </div>
          </StyledTableCell>
          : [
            reviewTable
            ? <StyledTableCell align="center"><Typography variant='overline' noWrap>To Review by:</Typography> <Typography variant='subtitle2' noWrap>{row.recipientName}</Typography></StyledTableCell>
            : null
          ]
        }
        
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
                            {Math.round(transaction.valueEther / row.totalEther * 10000) / 100} %
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

const ContractsAndTransactionsTable =({ contracts, statusValues, allStatusValues, reviewTable, onAccept, onReject, account }) => {

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
            <StyledTableCell align="left">PARTNER</StyledTableCell>
            <StyledTableCell align="left">START</StyledTableCell>
            <StyledTableCell align="left">EXPIRATION</StyledTableCell>
            <StyledTableCell align="center">SPEED</StyledTableCell>
            <StyledTableCell align="left">STATUS</StyledTableCell>
            <StyledTableCell align="left">DAYS LOCKED</StyledTableCell>
            {reviewTable && <StyledTableCell align="center">ACTION</StyledTableCell>}

          </StyledTableRow>
        </TableHead>
        <TableBody>
          {contracts.map((contract) => {
            if( statusValues.includes(contract.statusName)){
              return <Row key={contract.id.toString()} row={contract} allStatusValues={allStatusValues} reviewTable={reviewTable} onReject={onReject} onAccept={onAccept} account={account}/>
            } else return null
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ContractsAndTransactionsTable
