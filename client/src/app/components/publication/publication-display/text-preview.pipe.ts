import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textPreview'
})
export class TextPreviewPipe implements PipeTransform {

  transform(value: any, limit: number=10, trail:string ='...'): string {
    if(value==null){
      return "";
    }
    return value.length > limit ? value.substring(0,limit) + trail: value;
  }
}
