
export interface Indicadores {
	version?: string;
	autor?: string;
	fecha?: Date;
	uf?: Data;
	ivp?: Data;
	dolar?: Data;
	dolar_intercambio?: Data;
	euro?: Data;
	ipc?: Data;
	utm?: Data;
	imacec?: Data;
	tpm?: Data;
	libra_cobre?: Data;
	tasa_desempleo?: Data;
	bitcoin?: Data;
}

export interface Data {
	codigo?: string;
	nombre?: string;
	unidad_medida?: UnidadMedida;
	fecha?: Date;
	valor?: number;
}

export enum UnidadMedida {
	Dolar = "Dólar",
	Pesos = "Pesos",
	Porcentaje = "Porcentaje",
}



export interface Ind {
	version?: string;
	autor?: string;
	codigo?: string;
	nombre?: string;
	unidad_medida?: string;
	serie?: Serie[];
}

export interface Serie {
	fecha?: Date;
	valor?: number;
}
