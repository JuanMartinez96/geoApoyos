import { Pipe, PipeTransform } from '@angular/core';
import { visita } from 'src/app/interfaces/candidatos';
@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: visita[], args: string): visita[] {

    let filter: string = args? args.toLocaleLowerCase():'';
    
    return filter? value.filter((v:visita)=>
    v.nombre.toLocaleLowerCase().indexOf(filter)!=-1):value;
  }

}