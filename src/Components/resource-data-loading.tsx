import React from "react";

import { TableBody, TableRow } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { StyledTableCell } from "./styled-table-cell";

export function ResourceDataLoading(){
    return(
        <TableBody>
            <TableRow>
            <StyledTableCell><Skeleton animation="wave" /></StyledTableCell>
            <StyledTableCell><Skeleton animation="wave" /></StyledTableCell>
            <StyledTableCell><Skeleton animation="wave" /></StyledTableCell>
            </TableRow>
            <TableRow>
            <StyledTableCell><Skeleton animation="wave" /></StyledTableCell>
            <StyledTableCell><Skeleton animation="wave" /></StyledTableCell>
            <StyledTableCell><Skeleton animation="wave" /></StyledTableCell>
            </TableRow>  
            <TableRow>
            <StyledTableCell><Skeleton animation="wave" /></StyledTableCell>
            <StyledTableCell><Skeleton animation="wave" /></StyledTableCell>
            <StyledTableCell><Skeleton animation="wave" /></StyledTableCell>
            </TableRow>
            <TableRow>
            <StyledTableCell><Skeleton animation="wave" /></StyledTableCell>
            <StyledTableCell><Skeleton animation="wave" /></StyledTableCell>
            <StyledTableCell><Skeleton animation="wave" /></StyledTableCell>
            </TableRow>  
       </TableBody>
    )
}