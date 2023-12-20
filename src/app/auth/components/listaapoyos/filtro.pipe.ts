import { Pipe, PipeTransform } from '@angular/core';
import { candidatos, visita } from 'src/app/interfaces/candidatos';
@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: candidatos[], args: string): candidatos[] {

    let filter: string = args? args.toLocaleLowerCase():'';
    
    return filter? value.filter((v:candidatos)=>
    v.nombre.toLocaleLowerCase().indexOf(filter)!=-1):value;
  }

}