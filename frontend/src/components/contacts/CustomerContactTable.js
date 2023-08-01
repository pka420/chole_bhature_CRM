import { useState } from 'react';
import { createStyles, Table, ScrollArea, rem } from '@mantine/core';
import { useGetContactsQuery } from "./customerContactsSlice.js";

const customStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

const CustomerContactTable = () => {
    const { classes, cx } = customStyles();
    const [scrolled, setScrolled] = useState(false);

    const {
        data: CustomerContacts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetContactsQuery()
    
    let rows = []; 
    rows = CustomerContacts?.map((row) => (
        <tr key={row.employeeId}>
            <td>{row.firstName + ' ' + row.lastName} </td>
            <td>{row.email}</td>
            <td>{row.number}</td>
            <td>{row.num_orders}</td>
        </tr>
    ));

    return (
        <>
            <h1>Customer Contacts List</h1>
            { isLoading === true ? 
                <p> loading....</p>
                : isSuccess === true ? 
                    <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                    <Table miw={700}>
                        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Number of Orders</th>
                            </tr>
                        </thead>
                    <tbody>{rows}</tbody>
                    </Table>
                    </ScrollArea>
                    : isError === true ?
                        <p> error </p>
                        : 
                        <></>
            }
        </>
    )
}

export default CustomerContactTable;
