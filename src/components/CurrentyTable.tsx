import React, { useCallback, useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { CurrencyDetail } from '../services/types';
import Money from './cells/Money';
import Percentage from './cells/Percentage';
import { getTickers } from '../services/api';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  styled,
  TableSortLabel,
} from '@mui/material';
import CatgirlExplainer from './CatgirlExplainer';
import { useCatgirlExplainer } from '../services/catgirl';
import Coin from './cells/Coin';
import { useAsync } from '@react-hookz/web';

const columnHelper = createColumnHelper<CurrencyDetail>();

const HeaderCellText = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
`;

const columns = [
  columnHelper.accessor('symbol', {
    cell: (info) => <Coin>{info.getValue()}</Coin>,
    header: () => <HeaderCellText>Symbol</HeaderCellText>,
  }),
  columnHelper.accessor('bid', {
    cell: (info) => <Money>{info.getValue()}</Money>,
    header: () => <HeaderCellText align={'right'}>Bid</HeaderCellText>,
  }),
  columnHelper.accessor('ask', {
    cell: (info) => <Money>{info.getValue()}</Money>,
    header: () => <HeaderCellText align={'right'}>Ask</HeaderCellText>,
  }),
  columnHelper.accessor('last', {
    cell: (info) => <Money>{info.getValue()}</Money>,
    header: () => <HeaderCellText align={'right'}>Last</HeaderCellText>,
  }),
  columnHelper.accessor('dailyHigh', {
    cell: (info) => <Money>{info.getValue()}</Money>,
    header: () => <HeaderCellText align={'right'}>Daily High</HeaderCellText>,
  }),
  columnHelper.accessor('dailyChangePercent', {
    cell: (info) => <Percentage>{info.getValue()}</Percentage>,
    header: () => <HeaderCellText align={'right'}>Change, %</HeaderCellText>,
  }),
  columnHelper.accessor('dailyLow', {
    cell: (info) => <Money>{info.getValue()}</Money>,
    header: () => <HeaderCellText align={'right'}>Daily Low</HeaderCellText>,
  }),
  columnHelper.accessor('dailyVolume', {
    cell: (info) => <Money>{info.getValue()}</Money>,
    header: () => <HeaderCellText align={'right'}>Volume</HeaderCellText>,
  }),
];

const CurrencyTable: React.FC = () => {
  const [{ result, status }, { execute }] = useAsync<CurrencyDetail[]>(() =>
    getTickers(['BTC', 'ETH', 'XRP', 'LTC']),
  );
  type Order = 'asc' | 'desc';
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState('');
  const [tableData, setTableData] = useState<CurrencyDetail[] | undefined>([]);

  useEffect(() => {
    execute();
  }, []);

  useEffect(() => {
    if (result) {
      setTableData(result);
    }
  }, [result]);

  const reloadTable = useCallback(() => {
    //alert('I do nothing');
    execute();
    setOrder('asc');
    setOrderBy('');
  }, []);

  const handleSort = (event: React.MouseEvent<unknown>, property: string) => {
    let newOrder: Order = 'asc';
    if (orderBy === property) {
      newOrder = order === 'asc' ? 'desc' : 'asc';
    } else {
      newOrder = 'asc';
    }
    setOrder(newOrder);
    setOrderBy(property);
    const array = [...(result as CurrencyDetail[])];
    const sortedData = array?.sort(getComparator(newOrder, property));
    setTableData(property === '' ? result : sortedData);
  };

  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      handleSort(event, property);
    };

  function descendingComparator<T>(a: T, b: T, sortBy: keyof T) {
    if (b[sortBy] < a[sortBy]) {
      return -1;
    }
    if (b[sortBy] > a[sortBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator<Key extends keyof any>(
    sort: Order,
    sortedBy: Key,
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
    return sort === 'desc'
      ? (a, b) => descendingComparator(a, b, sortedBy)
      : (a, b) => -descendingComparator(a, b, sortedBy);
  }

  const { isShown: isExplainerShown, toggle: toggleShowExplainer } =
    useCatgirlExplainer();

  const table = useReactTable({
    data: tableData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (status === 'loading')
    return (
      <Box textAlign={'center'}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Button onClick={reloadTable} variant={'contained'}>
          Reload data
        </Button>{' '}
        <Button onClick={toggleShowExplainer}>
          {isExplainerShown ? 'Hide' : 'Show'} Explainer
        </Button>
      </Box>
      {isExplainerShown && (
        <Box mb={3}>
          <CatgirlExplainer />
        </Box>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    <TableSortLabel
                      active={orderBy === header.id}
                      direction={orderBy === header.id ? order : 'asc'}
                      onClick={createSortHandler(header.id)}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CurrencyTable;
