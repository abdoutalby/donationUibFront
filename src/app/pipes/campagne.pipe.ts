import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'campagne'
})
export class CampagnePipe implements PipeTransform {

  transform(value: any, name: any): any {

    if (!value   
      || !name) {
           return value;
         }
     
         name = name.toLowerCase();
         return value.filter((camp  : any )=> camp.nom.toLowerCase().includes(name));   
   
  }

}
