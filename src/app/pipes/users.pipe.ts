import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'users'
})
export class UsersPipe implements PipeTransform {

  transform(value: any, name: any): any {
  
    if (!value   
      || !name) {
           return value;
         }
     
         name = name.toLowerCase();
         return value.filter((user : any)  => user.name.toLowerCase().includes(name));   
   
  }

}
