import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'project'
})
export class ProjectPipe implements PipeTransform {

  transform(value: any[], name:string): any {
    if (!value   
      || !name) {
           return value;
         }
     
         name = name.toLowerCase();
         return value.filter(project => project.nom.toLowerCase().includes(name));   
     
  }

}
