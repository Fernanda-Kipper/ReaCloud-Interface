import React from "react";
import { GrStatusWarning } from 'react-icons/gr';

import License from "../Interfaces/license";
import { Resource } from "../Interfaces/resource";
import { RESOURCE_FIELDS } from '../Constants/resource-fields';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { StyledTableCell } from "./styled-table-cell";
import When from "./when";

import '../Styles/components/resource-data.css';
import { ResourceDataLoading } from "./resource-data-loading";


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
    <When expr={!!resource?.description_of_technical_requirements}>
      <TableRow>
        <StyledTableCell>Descrição dos pré-requisitos técnicos</StyledTableCell>
        <StyledTableCell>{resource?.description_of_technical_requirements}</StyledTableCell>
        <StyledTableCell>description_of_technical_requirements</StyledTableCell>
      </TableRow>  
    </When>
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
                  <ResourceDataLoading/>
              </When>
              <When expr={!isLoading}>
                {resource && <TableContent resource={resource} license={license}/>}
              </When>
          </Table>
      </TableContainer>
    </section>
  )
}