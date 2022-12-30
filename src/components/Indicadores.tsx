import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {CircularProgress} from "@mui/material";
import {Data, Indicadores, UnidadMedida} from "../interface/Indicadores";
import {useNavigate} from "react-router-dom";


export const IndicadoresScreen = () => {

	const [indicadoresState, setIndicadoresState] = useState<Indicadores>();
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		getIndicadores();
	}, []);

	const getIndicadores = async () => {
		setLoading(true);
		const response = await fetch('https://economics-nestjs.onrender.com/api/v1/economics');
		const {version, autor, fecha, ...data} = await response.json();
		setIndicadoresState(data);
		setLoading(false);
	}

	const formatDate = (date: Date) => {
		const newDate = new Date(date);
		const day = newDate.getDate();
		const month = newDate.getMonth() + 1;
		const year = newDate.getFullYear();
		return `${day}/${month}/${year}`;
	}

	const formatValue = (item: Data | undefined) => {
		if (!item?.valor) {
			return '-';
		}
		if (item?.unidad_medida === UnidadMedida.Porcentaje) {
			return `${item?.valor}%`;
		}
		if (item?.unidad_medida === UnidadMedida.Pesos) {
			return `$${item?.valor}`;
		}
		if (item?.unidad_medida === UnidadMedida.Dolar) {
			return `U$S${item?.valor}`;
		}
		return item?.valor;
	}

	if (loading) {
		return (
			<Container>
				<CircularProgress/>
				<P>Cargando...</P>
			</Container>
		);
	}

	return <Container>
		<H1>Indicadores Económicos</H1>
		<Table>
			<thead>
			<Tr>
				<Th>Nombre</Th>
				<Th>Valor</Th>
				<Th>Fecha</Th>
			</Tr>
			</thead>
			<tbody>
			{indicadoresState &&
				Object.keys(indicadoresState).map((key) =>
					<Tr key={key}
							onClick={() => {
								navigate(`/${key}`);
							}}>
						<Td><Span>{key}</Span></Td>
						<Td>{formatValue((indicadoresState as any)[key])}</Td>
						<Td>{formatDate((indicadoresState as any)[key].fecha)}</Td>
					</Tr>)}
			</tbody>
		</Table>
	</Container>
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 310px;
`;

const Table = styled.table`
  border-collapse: collapse;
  max-width: 1000px;
  background: #fff;
  width: 95%;
`;

const Td = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const Th = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const Tr = styled.tr`
  &:nth-of-type(even) {
    background-color: rgba(221, 221, 221, 0.46);
  }

  &:hover {
    background-color: rgba(139, 229, 255, 0.17);
    cursor: pointer;
    transition: all 0.1s ease-in;
  }
`;

const H1 = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const P = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;
const Span = styled.span`
  font-weight: bold;
`;


