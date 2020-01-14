import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpStatus'
})
export class StatusPipe implements PipeTransform {

  transform(value: string): any {
    switch (value) {
      case 'under_review': return 'Em análise';
      case 'approved': return 'Aprovado';
      case 'rejected': return 'Recusado';
      default: return ''
    }
  }

}
