import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {CircularProgress} from "@mui/material";
import {Ind} from "../interface/Indicadores";
import {useNavigate, useParams} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";
import {Line} from "react-chartjs-2";
import 'chart.js/auto';
import Swal from 'sweetalert2';

export const IndicadorScreen = () => {

	const [indicadorState, setIndicadorState] = useState<Ind>();
	const [loading, setLoading] = useState(true);
	const [dataChart, setDataChart] = useState<any>();
	const {id} = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		getIndicadores();
	}, []);

	useEffect(() => {
		getChart();
	}, [indicadorState]);

	const getIndicadores = async () => {
		setLoading(true);
		try {
			const resp = await fetch(`https://economics-nestjs.onrender.com/api/v1/economics/${id}`);
			const data = await resp.json();
			if (data.serie) {
				setIndicadorState(data);
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'No se encontró el indicador',
					confirmButtonText: 'Volver',
					confirmButtonColor: '#3f51b5',
					allowOutsideClick: false,
				}).then(() => {
					navigate('/');
				})
			}
			setLoading(false);
		} catch (e) {
			console.log(e);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Algo salió mal!',
				confirmButtonText: 'Volver',
				confirmButtonColor: '#3f51b5',
				allowOutsideClick: false,
			}).then(() => {
				navigate('/');
			})
		}
	}

	const getChart = () => {
		const data = {
			labels: [] as String[],
			datasets: [
				{
					label: 'Valor',
					data: [] as number[],
					fill: false,
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgba(255, 99, 132, 0.2)',
				},
			],
		};
		if (indicadorState?.serie) {
			const serie = indicadorState?.serie.filter(item => item.fecha && item.valor).sort((a, b) => {
				if (a.fecha && b.fecha) {
					return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
				}
				return 0;
			})
			serie.forEach(item => {
				if (item.fecha && item.valor) {
					data.labels.push(formatDate(item.fecha));
					data.datasets[0].data.push(item.valor);
				}
			})
		}
		setDataChart(data);
	}
	const formatDate = (date: Date) => {
		const newDate = new Date(date);
		const day = newDate.getDate();
		const month = newDate.getMonth() + 1;
		const year = newDate.getFullYear();
		return `${day}/${month}/${year}`;
	}

	if (loading) {
		return (
			<Container>
				<CircularProgress/>
				<P>Cargando...</P>
			</Container>
		);
	}

	return (
		<Container>
			<Boton onClick={() => navigate("/")}>
				<ArrowBack
					style={{color: 'white', fontSize: 40}}
				/>
			</Boton>
			<H1>{indicadorState?.nombre}</H1>

			<ContainerChart>
				{dataChart && <Line data={dataChart}/>}

			</ContainerChart>
		</Container>
	)
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 310px;
  margin: 10px;
`;

const ContainerChart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 310px;
  max-width: 1000px;
  margin: 10px;
  width: 90%;
  height: 90%;

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

const Boton = styled.button`
  font-size: 1.2rem;
  margin: 4px 2px;
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  border-radius: 12px;
  position: absolute;
  top: 0;
  left: 0;
`;
