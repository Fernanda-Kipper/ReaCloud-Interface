import React from "react";
import { withStyles } from '@material-ui/core/styles';

import License from "../Interfaces/license";
import { Resource } from "../Interfaces/resource";
import { RESOURCE_FIELDS } from '../Constants/resource-fields';
import '../Styles/components/resource-data.css';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';
import { GrStatusWarning } from 'react-icons/gr';

import When from "./when";

const StyledTableCell = withStyles((theme) => ({
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


interface Content {
  resource: Resource
  license?: License
}

interface Props {
  isLoading: boolean
  resource?: Resource
  license?: License
}

const TableContent = ({ resource, license }: Content) => (
  <TableBody>
    <TableRow>
      <StyledTableCell>Licença</StyledTableCell>
      <StyledTableCell>{license?.title}</StyledTableCell>
      <StyledTableCell>dc.license</StyledTableCell>
    </TableRow>
    {RESOURCE_FIELDS.map(field => (
      <TableRow>
          <StyledTableCell>{field.name}</StyledTableCell>
          <StyledTableCell>{field.field(resource)}</StyledTableCell>
          <StyledTableCell>{field.property}</StyledTableCell>
      </TableRow>
    ))}
    {resource?.description_of_technical_requirements && (
    <TableRow>
      <StyledTableCell>Descrição dos pré-requisitos técnicos</StyledTableCell>
      <StyledTableCell>{resource?.description_of_technical_requirements}</StyledTableCell>
      <StyledTableCell>não possui</StyledTableCell>
    </TableRow>                                
    )}
  </TableBody>
)

export function ResourceData({ isLoading, resource, license }: Props){
  if(!isLoading && !resource) return <></>

  return(
    <section className="resource-data">
      <div className="resource-license">
          <GrStatusWarning/>
          <p>Esse recurso você pode: {license?.message}</p>
      </div>

      <TableContainer component={Paper}>
          <Table aria-label="customized table">
              <TableHead>
                  <TableRow>
                      <StyledTableCell>Propriedade</StyledTableCell>
                      <StyledTableCell>Valor</StyledTableCell>
                      <StyledTableCell>Nome do metadado Dublin Core</StyledTableCell>
                  </TableRow>
              </TableHead>
              <When expr={isLoading}>
                  <TableBody>
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                  </TableBody>
              </When>
              <When expr={!isLoading}>
                {resource && <TableContent resource={resource} license={license}/>}
              </When>
          </Table>
      </TableContainer>
    </section>
  )
}