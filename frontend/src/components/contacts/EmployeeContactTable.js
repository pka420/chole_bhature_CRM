import { useState } from 'react';
import { createStyles, Table, ScrollArea, rem } from '@mantine/core';
import { useGetContactsQuery } from "./employeeContactsSlice.js";

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

const EmployeeContactTable = () => {
    const { classes, cx } = customStyles();
    const [scrolled, setScrolled] = useState(false);

    const {
        data: EmployeeContacts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetContactsQuery();
    
    let rows = [];
    rows = EmployeeContacts?.map((row) => (
        <tr key={row.employeeId}>
            <td>{row.firstName + ' ' + row.lastName} </td>
            <td>{row.email}</td>
            <td>{row.number}</td>
            <td>{row.address}</td>
            <td>{row.position}</td>
            <td>{row.age}</td>
            <td>{row.salary}</td>
        </tr>
    ));

    return (
        <>
            <h1>Employee Contacts List</h1>
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
                                <th>Address</th>
                                <th>Position</th>
                                <th>Age</th>
                                <th>Salary</th>
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

export default EmployeeContactTable;
