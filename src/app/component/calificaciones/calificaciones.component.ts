import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';


class excelOne {
  Nombres: string;
  ['Apellido Paterno']: string;
  ['Apellido Materno']: string;
  Calificacion: string;
  ['Fecha de Nacimiento']: string;
  Grado: string;
  Grupo: string;
  Password: string;
  } 
@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent implements OnInit {

 public nombre: string;
 ocultar: number;
 arreglo: any;
 arrayBuffer: any;
 file: File;
 WorkSheet: any;
 promedio: number;
 peorCalficiacion: excelOne[];
 mayorCalificacion: excelOne[];
 readExcel: excelOne[];

 public barChartOptions: ChartOptions = {
  responsive: true,
  // We use these empty structures as placeholders for dynamic theming.
  scales: { xAxes: [{}], yAxes: [{}] },
  plugins: {
    datalabels: {
      anchor: 'end',
      align: 'end',
    }
  }
};
public barChartLabels: Label[] ;
public barChartType: ChartType = 'bar';
public barChartLegend = true;

public barChartData: ChartDataSets[];
 /* = [
  { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
];  */

  constructor() {

  }

  ngOnInit() {

  }

  incomingfile(event){
   this.file = event.target.files[0];

   const fileReader = new FileReader();
   fileReader.onload = (e) => {
          this.arrayBuffer = fileReader.result;
          let data = new Uint8Array(this.arrayBuffer);
          let arr = new Array();
          for (let i = 0; i !== data.length; ++i) {
            arr[i] = String.fromCharCode(data[i]);
          }

          let bstr = arr.join('');
          let workbook = XLSX.read(bstr, {type: 'binary'});
          let first_sheet_name = workbook.SheetNames[0];
          let worksheet = workbook.Sheets[first_sheet_name];

          this.readExcel = XLSX.utils.sheet_to_json(worksheet, { raw: false});
          let menorCalificacion  = 0;
          let mayorCarlificacion = 0;
          let Promedio = 0;
          this.readExcel.forEach(element => {
            let fechaNAc = element["Fecha de Nacimiento"];
            let ff =  this.parseDate(fechaNAc);
            let ApellidoMaterno = element["Apellido Materno"].length;
            let Nom = element.Nombres.substring(0, 2);
            let ApM = element["Apellido Materno"].substring(ApellidoMaterno - 2, ApellidoMaterno);
            let ed = this.ageCalculator(ff);
            element.Password = Nom + ApM + ed;
            element['Fecha de Nacimiento'] = ff.toString();
            if (parseFloat(element.Calificacion) < menorCalificacion || menorCalificacion === 0 )
              {
                menorCalificacion = parseFloat(element.Calificacion);
              }
            if (parseFloat(element.Calificacion) > mayorCarlificacion)
              {
                mayorCarlificacion = parseFloat(element.Calificacion);
              }
            Promedio = Promedio + parseFloat(element.Calificacion);
         });
          let Cali = this.readExcel.map(x => parseFloat( x.Calificacion));

          this.promedio = Promedio / this.readExcel.length;
          this.getPeorCalificacion(menorCalificacion.toString());
          this.getMayorCalificacion(mayorCarlificacion.toString());
          this.barChartLabels = this.readExcel.map(x => x.Nombres + ' ' + x["Apellido Paterno"]);
          this.barChartData = [
            { data: Cali , label: 'Calificaciones',
            backgroundColor: [
              'rgba(0, 99, 132, 0.6)',
              'rgba(30, 99, 132, 0.6)',
              'rgba(60, 99, 132, 0.6)',
              'rgba(90, 99, 132, 0.6)',
              'rgba(120, 99, 132, 0.6)',
              'rgba(150, 99, 132, 0.6)',
              'rgba(180, 99, 132, 0.6)',
              'rgba(210, 99, 132, 0.6)',
              'rgba(240, 99, 132, 0.6)'
            ],
            borderColor: [
              'rgba(0, 99, 132, 1)',
              'rgba(30, 99, 132, 1)',
              'rgba(60, 99, 132, 1)',
              'rgba(90, 99, 132, 1)',
              'rgba(120, 99, 132, 1)',
              'rgba(150, 99, 132, 1)',
              'rgba(180, 99, 132, 1)',
              'rgba(210, 99, 132, 1)',
              'rgba(240, 99, 132, 1)'
            ],
            }
          ];

    };
   fileReader.readAsArrayBuffer(this.file);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  ageCalculator(fecha: any): any {
  if (fecha) {
    const convertAge = new Date(fecha);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    return Math.floor((timeDiff / (1000 * 3600 * 24))/365);
  } else {
      return 0;
    }
  }

  parseDate(value: any): Date | null {
  if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
    const str = value.split('/');

    const year = Number(str[2]);
    const month = Number(str[1]) - 1;
    const date = Number(str[0]);

    return new Date(year, month, date);
  } else if((typeof value === 'string') && value === '') {
    return new Date();
  }
  const timestamp = typeof value === 'number' ? value : Date.parse(value);
  return isNaN(timestamp) ? null : new Date(timestamp);
  }

  getPeorCalificacion(cal: any) {
    this.peorCalficiacion =  this.readExcel.filter(x => x.Calificacion === cal);
    //this.peorCalficiacion = (excelOne)A;
    console.log(this.peorCalficiacion);
  }

  getMayorCalificacion(cal: any) {
    this.mayorCalificacion = this.readExcel.filter(x => x.Calificacion === cal);
    console.log(this.mayorCalificacion);
  }
}
